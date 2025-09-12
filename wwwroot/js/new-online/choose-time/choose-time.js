// render container time-booking && select time// render calender
export async function renderCalendar(
  monthNames,
  dayNames,
  currentMonth,
  currentYear,
  daysOffNail, // dữ liệu ngày làm việc của thợ
  selectedDate, // ngày đã chọn nếu có
  dataBooking
) {
  const store = salonStore.getState();
  const daysEl = document.getElementById("days");
  const monthYearEl = document.getElementById("monthYear");

  if (!daysEl || !monthYearEl) return;
  daysEl.innerHTML = "";
  monthYearEl.textContent = `${monthNames[currentMonth]}, ${currentYear}`;

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const hasSelectedDate = !!selectedDate;

  // Render day names
  dayNames.forEach((day) => {
    const dayName = document.createElement("div");
    dayName.className = "day-name";
    dayName.textContent = day;
    daysEl.appendChild(dayName);
  });
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    daysEl.appendChild(empty);
  }

  let nearestWorkingDate = null;

  for (let date = 1; date <= daysInMonth; date++) {
    const day = document.createElement("div");
    day.className = "day";
    day.textContent = date;

    const isSelected =
      selectedDate &&
      date === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear();
    const nonWorking = daysOffNail[currentMonth + 1]?.includes(date);

    const isPast =
      currentYear < todayYear ||
      (currentYear === todayYear && currentMonth < todayMonth) ||
      (currentYear === todayYear &&
        currentMonth === todayMonth &&
        date < todayDate);

    if (nonWorking) {
      day.classList.add("inactive");
    } else if (isPast) {
      day.classList.add("past");
    } else {
      // Nếu chưa có selectedDate và chưa tìm nearestWorkingDate
      if (!hasSelectedDate && !nearestWorkingDate) {
        nearestWorkingDate = date;
      }

      if (isSelected) {
        day.classList.add("active");
      } else if (!hasSelectedDate && nearestWorkingDate === date) {
        day.classList.add("active");
      }
    }

    // Gán select
    if (!isPast && !nonWorking) {
      day.addEventListener("click", async () => {
        selectedDate = new Date(currentYear, currentMonth, date);

        document
          .querySelectorAll(".day")
          .forEach((d) => d.classList.remove("active", "today"));

        dataBooking.users.forEach((u) => {
          if (u.isChoosing) {
            u.selectedDate = selectedDate;
            return;
          }
        });
        salonStore.setState({ dataBooking });

        day.classList.add("active");
        document.getElementById("selectedDateTitle").textContent =
          selectedDate.toDateString();

        $("#timeSlotsContainer").empty();

        // khi chọn ngày khác kiểm tra đã chọn tech chưa, nếu chọn tech rồi lấy ra slot cho tech
        // danh sách ID thợ không trùng lặp
        const uniqueEmployeeID = new Set();
        dataBooking.users.forEach((user) => {
          user.services.forEach((service) => {
            service.itemService.forEach((item) => {
              if (item.selectedStaff && item.selectedStaff.employeeID) {
                uniqueEmployeeID.add(item.selectedStaff.employeeID);
              }
            });
          });
        });

        const listUniqueEmID = Array.from(uniqueEmployeeID);
        // lọc lại thời gian cho ngày mới
        for (const item of listUniqueEmID) {
          await buildSlotTimeMultiTechFromBooking({
            dataBooking,
            includeChooseStaffBefore: false,
            oldEmpID: null,
          });
        }
        const slotTimeForSelect = store.slotTimeForSelect;
        console.log("time: ", slotTimeForSelect);
        renderTimeSlotsForDate(dataBooking, slotTimeForSelect);
      });
    }
    daysEl.appendChild(day);
  }

  // Nếu chưa có selectedDate, set selectedDate = nearestWorkingDate
  if (!hasSelectedDate && nearestWorkingDate) {
    selectedDate = new Date(currentYear, currentMonth, nearestWorkingDate);
    const user = dataBooking.users.find((u) => u.isChoosing);
    if (user) {
      user.selectedDate = selectedDate;
    }
    document.getElementById("selectedDateTitle").textContent =
      selectedDate.toDateString();
  }
  renderTimeSlotsForDate(dataBooking);
}

/**
 * Build slotTimeMultiTech từ dataBooking (toàn bộ services đã gán cho từng tech)
 * và gọi API lấy time slots cho từng tech, rồi tính possibleTimeSlot bằng findMultiTechStarts
 *
 * options:
 *  - includeChooseStaffBefore: nếu true sẽ thêm các tech trong chooseStaffBefore (duration = 0 nếu chưa có service)
 *  - oldEmpID: nếu truyền vào (khi đổi tech), sẽ remove tech cũ khỏi slotTimeMultiTech trước khi update
 */
export async function buildSlotTimeMultiTechFromBooking({
  dataBooking,
  includeChooseStaffBefore = false,
  oldEmpID = null,
}) {
  try {
    const store = salonStore.getState(); // hoặc salonStore tùy bạn lưu ở đâu
    const RVCNo = store.RVCNo;
    if (!dataBooking) return null;

    const userChoosing = dataBooking.users.find((u) => u.isChoosing === true);
    if (!userChoosing) return null;

    // 1) Tính tổng duration per tech từ dataBooking
    const durationsMap = {}; // { [empId]: totalDuration }
    for (const cate of userChoosing.services || []) {
      for (const item of cate.itemService || []) {
        const emp = item.selectedStaff && item.selectedStaff.employeeID;
        if (!emp) continue;
        const base =
          Number(item.duration || 0) || Number(item.timetext || 0) || 0;
        let add = 0;
        if (Array.isArray(item.optionals) && item.optionals.length) {
          add = item.optionals.reduce(
            (s, o) => s + (Number(o.timedura || 0) || 0),
            0
          );
        }
        durationsMap[emp] = (durationsMap[emp] || 0) + base + add;
      }
    }

    // 2) (Optional) thêm tech đã chọn trước vào map (duration 0 nếu chưa có)
    if (includeChooseStaffBefore) {
      const chooseStaffBefore = store.chooseStaffBefore || [];
      chooseStaffBefore.forEach((empId) => {
        if (!durationsMap[empId]) durationsMap[empId] = 0;
      });
    }

    // Nếu không có tech nào => thông báo / trả về rỗng
    const techIds = Object.keys(durationsMap).map((k) => Number(k));
    if (!techIds.length) {
      console.warn("No techs with assigned duration found in dataBooking");
      // set empty slotTimeMultiTech nếu cần
      const empty = { techs: [], durations: [] };
      salonStore.setState({
        slotTimeMultiTech: empty,
        slotTimeForSelect: [],
      });
      return empty;
    }

    // 3) Nếu cần: remove oldEmpID khỏi kết quả hiện tại (khi đổi staff)
    let existingSlot = salonStore.getState().slotTimeMultiTech || {
      techs: [],
      durations: [],
    };
    let techsArr = [...existingSlot.techs];
    let durationsArr = [...existingSlot.durations];

    if (oldEmpID) {
      techsArr = techsArr.filter((t) => t.techID !== oldEmpID);
      durationsArr = durationsArr.filter((d) => d.techID !== oldEmpID);
    }

    // 4) Prepare API calls: gọi gettimebookonline cho từng tech (dùng duration tính được)
    // Sử dụng date của userChoosing
    const dateStr = formatDateMMDDYYYY(userChoosing.selectedDate || new Date());

    // gọi song song, nhưng nếu duration === 0 bạn có thể skip gọi (tuỳ API),
    // ở đây mình gọi luôn (API có thể trả full/day hoặc bạn muốn skip)
    const calls = techIds.map((techID) => {
      const duration = durationsMap[techID] || 0;
      // nếu duration === 0 và bạn muốn skip call, return Promise.resolve({ data: [] })
      // return duration === 0 ? Promise.resolve({ data: [] }) : fetchAPI.get(...)
      return fetchAPI
        .get(
          `/api/appointment/gettimebookonline?date=${dateStr}&duration=${duration}&rvcno=${RVCNo}&empID=${techID}`
        )
        .then((res) => ({ techID, data: res?.data || [] }));
    });

    const results = await Promise.all(calls);

    // 5) Merge kết quả vào techsArr và durationsArr (thay thế nếu tech tồn tại)
    for (const r of results) {
      const { techID, data } = r;
      // update techsArr
      const idxT = techsArr.findIndex((t) => t.techID === techID);
      if (idxT >= 0) techsArr[idxT] = { techID, timeSlotTech: data };
      else techsArr.push({ techID, timeSlotTech: data });

      // update durationsArr
      const idxD = durationsArr.findIndex((d) => d.techID === techID);
      if (idxD >= 0)
        durationsArr[idxD] = { techID, totalDuration: durationsMap[techID] };
      else durationsArr.push({ techID, totalDuration: durationsMap[techID] });
    }

    const slotTimeMultiTech = { techs: techsArr, durations: durationsArr };
    salonStore.setState({ slotTimeMultiTech });

    // 6) Tính possible starts multi-tech
    const possibleTimeSlot = findMultiTechStarts(slotTimeMultiTech);
    console.log("possibleTimeSlot: ", possibleTimeSlot);
    salonStore.setState({ slotTimeForSelect: possibleTimeSlot });

    return slotTimeMultiTech;
  } catch (err) {
    console.error("buildSlotTimeMultiTechFromBooking error:", err);
    return null;
  }
}

/*
  *log:
  beginDateTime: "2025-09-11T10:00:00"
  dateString: "09/11/2025"
  dayOfWeek: "Thursday"
  endDateTime: "2025-09-11T10:00:00"
  endTime: "09:00 PM"
  isOpen: true
  startTime: "10:00 AM"
*/
export function renderTimeSlotsForDate(dataBooking, slotTimeForSelect = []) {
  const store = salonStore.getState();

  const timeKeySlot = store.timeKeySlot; // interval phút
  const timeBeginCurDate = store.timeBeginCurDate; // dữ liệu từ API

  const container = $("#timeSlotsContainer");
  container.empty();

  let selectedDate =
    store.dataBooking.users.find((u) => u.isChoosing).selectedDate ||
    new Date();

  // nếu không có dữ liệu API thì default 08:00 - 22:00
  const start = timeBeginCurDate?.startTime
    ? convertTo24h(timeBeginCurDate.startTime)
    : "08:00";
  const end = timeBeginCurDate?.endTime
    ? convertTo24h(timeBeginCurDate.endTime)
    : "22:00";

  // generate toàn bộ slot theo khung giờ
  const slots = generateTimeSlotsDynamic(selectedDate, start, end, timeKeySlot);

  // slot active (thợ có)
  const activeSlots = new Set(
    (slotTimeForSelect || []).map((item) => removeAmPm(item.time))
  );

  // nhóm slot theo buổi
  const groups = { morning: [], afternoon: [], evening: [] };

  slots.forEach((slot) => {
    const cleanSlot = removeAmPm(slot);
    const [hour] = cleanSlot.split(":").map(Number);
    const isActive = activeSlots.has(cleanSlot);

    const div = `
      <div class="time-slot ${isActive ? "active" : ""}">
        <span>${cleanSlot}</span>
        <span>${getAMPM(slot)}</span>
        <div class="circle"><div class="dot"></div></div>
      </div>
    `;

    if (hour < 12) {
      groups.morning.push(div);
    } else if (hour < 17) {
      groups.afternoon.push(div);
    } else {
      groups.evening.push(div);
    }
  });

  // append UI
  if (groups.morning.length) {
    container.append(`<div class="slot-group-title">Sáng</div>`);
    container.append(groups.morning.join(""));
  }
  if (groups.afternoon.length) {
    container.append(`<div class="slot-group-title">Trưa</div>`);
    container.append(groups.afternoon.join(""));
  }
  if (groups.evening.length) {
    container.append(`<div class="slot-group-title">Tối</div>`);
    container.append(groups.evening.join(""));
  }

  // click handler
  container.off("click", ".time-slot");

  // mark selected slot nếu user đã chọn
  const user = dataBooking.users.find((u) => u.isChoosing);
  if (user && user.selectedTimeSlot) {
    const match = container.find(".time-slot").filter(function () {
      return (
        $(this).find("span").first().text().trim() ===
        removeAmPm(user.selectedTimeSlot)
      );
    });
    if (match.length) {
      container.find(".time-slot").removeClass("selected");
      match.first().addClass("selected");
    }
  }
}

export function renderFooterChooseTime() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);
  // đã chọn service mới được phép next
  const isNext = user.services.some((srv) => {
    return srv.itemService.length > 0;
  });

  const $wrapDirBtn = `
    <div class="wrap-dir-btn">
      <button id="btn-back-ser" class="dir-btn-back-ser text-uppercase">Back</button>
      <button id="btn-next-ser" class="dir-btn-next-ser text-uppercase ${
        isNext ? "allow-next" : ""
      }">Next</button>
    </div>
  `;
  // nếu DOM đã có footer-dir thì append khi hàm được gọi
  const $footerDir = $(".footer-dir");
  if ($footerDir.length) {
    $footerDir.empty(); // reset
    $footerDir.append($wrapDirBtn);
  }
  return $wrapDirBtn;
}
export function updateCalendarData(month, year, rvcNo, daysOffNail, callback) {
  fetchStoreOffDays(rvcNo, month, year).then((daysOff) => {
    daysOffNail[month + 1] = daysOff; // lưu lại theo key tháng
    // update store
    salonStore.setState({ daysOffNail: { ...daysOffNail } });
    if (typeof callback === "function") callback();
  });
}

export function generateTimeSlotsDynamic(
  selectedDate,
  start,
  end,
  interval = 15
) {
  const slots = [];

  let [startH, startM] = start.split(":").map(Number);
  let [endH, endM] = end.split(":").map(Number);

  let startTime = new Date(selectedDate);
  startTime.setHours(startH, startM, 0, 0);

  let endTime = new Date(selectedDate);
  endTime.setHours(endH, endM, 0, 0);

  let cur = new Date(startTime);
  while (cur <= endTime) {
    const formatted = cur.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    slots.push(formatted);
    cur.setMinutes(cur.getMinutes() + interval);
  }

  return slots;
}

export function roundUpToNearestInterval(date, interval = 20) {
  const d = new Date(date);
  const minutes = d.getMinutes();
  const mod = minutes % interval;
  if (mod !== 0) {
    d.setMinutes(minutes + (interval - mod));
  }
  d.setSeconds(0, 0);
  return d;
}

function convertTo24h(time12h) {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}
export function getAMPM(timeStr) {
  const [hourStr] = timeStr.split(":");
  const hour = parseInt(hourStr, 10);
  return hour >= 12 ? "PM" : "AM";
}

export function removeAmPm(timeStr = "") {
  if (typeof timeStr !== "string") return timeStr;
  return timeStr.replace(/\s?(AM|PM)$/i, "").trim();
}

export async function fetchStoreOffDays(rvcNo, month, year) {
  const beginDate = `${month + 1}/01/${year}`;

  // Lấy số ngày cuối tháng
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const endDate = `${month + 1}/${lastDayOfMonth}/${year}`;

  const url = `/api/store/getstoreoffday?rvcNo=${rvcNo}&beginDate=${encodeURIComponent(
    beginDate
  )}&endDate=${encodeURIComponent(endDate)}`;

  try {
    const res = await fetchAPI.get(url);
    if (res.status === 0 && Array.isArray(res.data)) {
      return res.data.map((item) => new Date(item.dateOff).getDate());
    }
    return [];
  } catch (e) {
    console.error("[fetchStoreOffDays]", {
      message: e.message,
      stack: e.stack,
      name: e.name,
    });
    return [];
  }
}

export async function renderChooseTime() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;

  await store.getTimeKeySlot();
  await buildSlotTimeMultiTechFromBooking({
    dataBooking,
    includeChooseStaffBefore: false,
  });

  const salonChoosing = store.salonChoosing;
  const slotTimeForSelect = store.slotTimeForSelect;

  const htmlHeaderSalon = HeaderSalon(salonChoosing);
  const $wrapDirBtn = renderFooterChooseTime();

  const htmlChooseTime = `
    <div id="section-date-time" class="wrap-calendar-timeslot">
      <div class="calendar-timeslot">
        <div class="wrap-calendar-time"
        >
          <div class="container-choose-time">
            <div class="calendar">
              <div class="calendar-header">
                <button id="prev">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.9998 19.9181L8.47984 13.3981C7.70984 12.6281 7.70984 11.3681 8.47984 10.5981L14.9998 4.07812" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div id="monthYear"></div>
                <button id="next">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8.91016 19.9181L15.4302 13.3981C16.2002 12.6281 16.2002 11.3681 15.4302 10.5981L8.91016 4.07812" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div class="calendar-grid" id="days">
              </div>
            </div>
            <div class="timeslot">
              <h2 id="selectedDateTitle">August 14, 2025</h2>
              <div id="timeSlotsContainer" class="time-slots"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  const htmlPageChooseTime = `
    <div class="wrap-content-salon bg-choose-time">
      <div class="header-sertech">
          ${htmlHeaderSalon}
      </div>
      <div class="text-choose-time">
        <div class="wrap-title">
            <h2 class="title">CHOOSE SERVICES</h2>
        </div>
        <p class="desc">
            Business Time: 9:00 AM - 9:00 PM
        </p>
      </div>
      <div class="content-choose-time">
        ${htmlChooseTime}
      </div>
      <div class="wrap-help-support">
        <h4 class="ques-see">
          Don’t See Your Time ?
        </h4>
        <p class="contact-to">
          <span class="icon-contact">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M9 19.2578H8.5C4.5 19.2578 2.5 18.2578 2.5 13.2578V8.25781C2.5 4.25781 4.5 2.25781 8.5 2.25781H16.5C20.5 2.25781 22.5 4.25781 22.5 8.25781V13.2578C22.5 17.2578 20.5 19.2578 16.5 19.2578H16C15.69 19.2578 15.39 19.4078 15.2 19.6578L13.7 21.6578C13.04 22.5378 11.96 22.5378 11.3 21.6578L9.8 19.6578C9.64 19.4378 9.27 19.2578 9 19.2578Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.4965 11.2578H16.5054" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.4955 11.2578H12.5045" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.49451 11.2578H8.50349" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="need-help">Need help?</span>
          <span class="call-us">Call Us: </span>
          <span class="phone-contact">(384) 334-2234</span>
        </p>
      </div>
      <div class="footer-dir footer-choose-time">
        ${$wrapDirBtn}
      </div>
    </div>
  `;
  const $wrapNewOnline = $(".wrap-newonline");
  $wrapNewOnline.empty();
  $wrapNewOnline.append(htmlPageChooseTime);

  return htmlPageChooseTime;
}

// import API
import { fetchAPI } from "../../site.js";
// import store
import { salonStore } from "../../store/new-online-store.js";
// import component
import { HeaderSalon } from "../header/header-salon.js";
import { formatDateMMDDYYYY } from "../../helper/format-day.js";
import { findMultiTechStarts } from "../../helper/free-time/slot-time-available.js";
// import constant
import { monthNames, dayNames } from "../../constants/days-weeks.js";
$(document).ready(async function () {
  const store = salonStore.getState();
  let currentMonth = store.currentMonth;
  const selectedDate = store.selectedDate;
  const currentYear = store.currentYear;
  const currentDate = new Date();
  console.log("currentDate: ", currentDate);
  const daysOffNail = store.daysOffNail;
  const RVCNo = store.RVCNo;
  // await store.getTimeKeySlot();
  await store.getTimeBeginCurDate(formatDateMMDDYYYY(currentDate));

  const dataBooking = store.dataBooking;

  const isMobile = $(window).width() <= 768;

  $(document).on("click", "#prev", function () {
    const dataBooking = store.dataBooking;
    const RVCNo = store.RVCNo;

    if (currentMonth > 0) {
      currentMonth--;
      selectedDate = new Date(currentYear, currentMonth, currentDate.getDate());

      updateCalendarData(currentMonth, currentYear, RVCNo, daysOffNail, () => {
        renderCalendar(
          monthNames,
          dayNames,
          currentMonth,
          currentYear,
          daysOffNail,
          selectedDate,
          dataBooking
        );
        // update store
        salonStore.setState({ dataBooking });
      });
    }
  });

  $(document).on("click", "#next", function () {
    const dataBooking = store.dataBooking;
    const RVCNo = store.RVCNo;

    if (currentMonth < 11) {
      currentMonth++;
      selectedDate = new Date(currentYear, currentMonth, currentDate.getDate());

      updateCalendarData(currentMonth, currentYear, RVCNo, daysOffNail, () => {
        renderCalendar(
          monthNames,
          dayNames,
          currentMonth,
          currentYear,
          daysOffNail,
          selectedDate,
          dataBooking
        );
        // update store
        salonStore.setState({ dataBooking });
      });
    }
  });
});
