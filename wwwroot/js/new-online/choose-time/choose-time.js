export function startResendTimer() {
  $(".resend-btn").addClass("disabled");

  resendInterval = setInterval(() => {
    resendCountdown--;
    $(".countdown").text(
      `00:${resendCountdown < 10 ? "0" + resendCountdown : resendCountdown}`
    );

    if (resendCountdown <= 0) {
      clearInterval(resendInterval);
      $(".resend-btn").removeClass("disabled").text("Send Again");
    }
  }, 1000);
}

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

  // if (!daysEl || !monthYearEl) return;
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
        salonStore.setState({ ...store, dataBooking, selectedDate });

        day.classList.add("active");
        // Cập nhật giờ start ngày mới
        await store.getTimeBeginCurDate(formatDateMMDDYYYY(selectedDate)); // khởi tạo lịch ở ngày hiện tại
        renderTimeSlotsForDate(dataBooking);
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
  }

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
  await buildSlotTimeMultiTechFromBooking({
    dataBooking,
    includeChooseStaffBefore: false,
    oldEmpID: null,
  });
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
      // set empty slotTimeMultiTech
      const empty = { techs: [], durations: [] };
      salonStore.setState({
        ...store,
        slotTimeMultiTech: empty,
        slotTimeForSelect: [],
      });
      return empty;
    }

    // 3) remove oldEmpID khỏi kết quả hiện tại (khi đổi staff)
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

    // gọi song song
    // API có thể trả full/day
    const calls = techIds.map(async (techID) => {
      const duration = durationsMap[techID] || 0;
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
    salonStore.setState({ ...store, slotTimeMultiTech });

    // 6) Tính possible starts multi-tech
    const possibleTimeSlot = findMultiTechStarts(slotTimeMultiTech);
    salonStore.setState({ ...store, slotTimeForSelect: possibleTimeSlot });

    return slotTimeMultiTech;
  } catch (err) {
    console.error("buildSlotTimeMultiTechFromBooking error:", err);
    return null;
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
      <button id="btn-back-choose-time" class="dir-btn-back-ser text-uppercase">Back</button>
      <button id="btn-next-choose-time" class="dir-btn-next-ser text-uppercase ${
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
  const store = salonStore.getState();
  fetchStoreOffDays(rvcNo, month, year).then((daysOff) => {
    daysOffNail[month + 1] = daysOff; // lưu lại theo key tháng
    // update store
    salonStore.setState({ ...store, daysOffNail: { ...daysOffNail } });
    if (typeof callback === "function") callback();
  });
}
function formatHHMM(date) {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

export function generateTimeSlotsDynamic(
  selectedDate,
  start,
  end,
  interval = 20
) {
  const slots = [];

  // ensure interval is a positive integer (minutes)
  interval = Number(interval);
  if (!Number.isFinite(interval) || interval <= 0) {
    console.warn("Invalid interval passed, falling back to 20");
    interval = 20;
  }

  // parse "HH:mm" -> numbers
  const [startH, startM] = start.split(":").map((n) => parseInt(n, 10));
  const [endH, endM] = end.split(":").map((n) => parseInt(n, 10));

  const startTime = new Date(selectedDate);
  startTime.setHours(startH, startM, 0, 0);

  const endTime = new Date(selectedDate);
  endTime.setHours(endH, endM, 0, 0);

  // If end <= start assume end is next day (optional, keep if you ever have overnight ranges)
  if (endTime.getTime() <= startTime.getTime()) {
    endTime.setDate(endTime.getDate() + 1);
  }

  // Use timestamps to increment — safer than mutating Date with setMinutes
  let curTime = startTime.getTime();
  const endTs = endTime.getTime();
  let iter = 0;
  const maxIter = 2000; // safety guard to avoid infinite loops

  while (curTime < endTs) {
    const curDate = new Date(curTime);

    // IMPORTANT: call formatting function that MUST NOT mutate the Date object we pass in
    slots.push(formatHHMM(curDate));

    // advance
    curTime += interval * 60 * 1000;
    iter++;
    if (iter > maxIter) {
      console.warn("Too many iterations, breaking to avoid infinite loop");
      break;
    }
  }

  return slots;
}

export function renderTimeSlotsForDate(dataBooking) {
  const store = salonStore.getState();
  const timeKeySlot = store.timeKeySlot;
  const timeBeginCurDate = store.timeBeginCurDate;
  const slotTimeForSelect = store.slotTimeForSelect || [];
  const container = $("#timeSlotsContainer");
  container.empty();

  let selectedDate =
    store.dataBooking.users.find((u) => u.isChoosing)?.selectedDate ||
    new Date();

  let start, end;

  if (!timeBeginCurDate) {
    start = "08:00";
    end = "22:00";
  } else {
    start = parseTimeTo24h(timeBeginCurDate.startTime); // "10:00"
    end = parseTimeTo24h(timeBeginCurDate.endTime); // "20:00"
  }

  // Tạo toàn bộ slots theo interval
  const slots = generateTimeSlotsDynamic(selectedDate, start, end, timeKeySlot);
  // Set slot nào active
  const activeSlots = new Set(
    (slotTimeForSelect || []).map((item) => removeAmPm(item.time))
  );

  // nhóm slot theo buổi
  const groups = { morning: [], afternoon: [], evening: [] };

  // flag để theo dõi best fit cho từng buổi
  const bestFitAssigned = { morning: false, afternoon: false, evening: false };

  slots.forEach((slot) => {
    const cleanSlot = removeAmPm(slot);
    const [hour] = cleanSlot.split(":").map(Number);
    const isActive = activeSlots.has(cleanSlot);

    let groupName;
    if (hour < 12) groupName = "morning";
    else if (hour < 17) groupName = "afternoon";
    else groupName = "evening";

    let div = `
    <div class="time-slot ${isActive ? "active" : ""}">
      <span id="time-val">${cleanSlot}</span>
      <span>${getAMPM(slot)}</span>
      <div class="circle">
        <div class="dot">
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
            <path d="M1.16699 3.98984L3.28236 6L7.83366 2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      ${
        isActive && !bestFitAssigned[groupName]
          ? `<div class="best-fit-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                <g clip-path="url(#clip0_4193_144126)">
                  <path d="M4.69587 6.74486C4.57525 6.66859 4.424 6.6686 4.30338 6.74489L2.45347 7.91488C2.16674 8.09622 1.81228 7.82791 1.88847 7.4872L2.37891 5.29404C2.41077 5.15156 2.36457 5.00238 2.25884 4.90629L0.630505 3.42661C0.378278 3.1974 0.513872 2.76448 0.847135 2.73495L2.99304 2.5448C3.13278 2.53242 3.25451 2.44046 3.30942 2.3058L4.15158 0.240419C4.28229 -0.0801398 4.71771 -0.0801394 4.84842 0.240419L5.69058 2.3058C5.74549 2.44046 5.86722 2.53242 6.00696 2.5448L8.15287 2.73495C8.48613 2.76448 8.62172 3.1974 8.3695 3.42661L6.74116 4.90629C6.63543 5.00238 6.58923 5.15156 6.62109 5.29404L7.11156 7.48735C7.18775 7.82804 6.83333 8.09635 6.5466 7.91505L4.69587 6.74486Z" fill="#FCC003"/>
                </g>
                <defs>
                  <clipPath id="clip0_4193_144126">
                    <rect width="8" height="8" fill="white" transform="translate(0.5)"/>
                  </clipPath>
                </defs>
              </svg>
              Best Fit
            </div>`
          : ""
      }
    </div>
  `;

    if (isActive && !bestFitAssigned[groupName]) {
      bestFitAssigned[groupName] = true; // gắn best fit cho slot active đầu tiên của buổi
    }

    groups[groupName].push(div);
  });

  // append UI (block riêng cho mỗi buổi)
  function renderGroup(name, label, arr) {
    if (!arr.length) return "";
    return `
    <div class="slot-group ${name}">
      <div class="slot-group-title">${label}</div>
      <div class="slot-group-content">${arr.join("")}</div>
    </div>
  `;
  }

  container.append(renderGroup("morning", "Morning", groups.morning));
  container.append(renderGroup("afternoon", "Afternoon", groups.afternoon));
  container.append(renderGroup("evening", "Evening", groups.evening));

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

function parseTimeTo24h(timeStr) {
  // timeStr: "10:00 AM" hoặc "08:00 PM"
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
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
function getUniqueStaff(dataBooking) {
  const staffMap = new Map();

  dataBooking.users.forEach((user) => {
    if (user.isChoosing) {
      (user.services || []).forEach((svc) => {
        (svc.itemService || []).forEach((item) => {
          if (item.selectedStaff) {
            staffMap.set(
              item.selectedStaff.employeeID,
              item.selectedStaff.nickName
            );
          }
        });
      });
    }
  });

  return Array.from(staffMap.values());
}

export async function renderChooseTime() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;

  const listStaff = getUniqueStaff(dataBooking);
  const htmlListStaff = listStaff.map((item) => item).join(", ");

  await store.getTimeKeySlot();

  const salonChoosing = store.salonChoosing;

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
            <div class="line-ca-ti"></div>
            <div class="timeslot">
              <div class="name-techs">
                Tech: <span class="techs text-uppercase">${htmlListStaff}</span>
              </div>
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
      <div class="content-choose-sertech">
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
    </div>
  `;
  const $wrapNewOnline = $(".wrap-newonline");
  $wrapNewOnline.empty();
  $wrapNewOnline.append(htmlPageChooseTime);
  Cart();

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
import { ChooseTechForServices } from "../screen-choose-sertech/choose-tech-for-service/choose-tech-for-service.js";
import { Cart } from "../cart/cart.js";
// help function
import { validateEmailPhoneInput } from "../../helper/input/valid-form.js";
import { buildLocktimePayload } from "../../helper/build-lock-time.js";
import { sendOTP } from "../helper/send-otp.js";
// import constant
import { PageCurrent } from "../../constants/new-online.js";
import { monthNames, dayNames } from "../../constants/days-weeks.js";
// import content popup
import { renderVerifyEmailPhoneContent } from "../popup/content/verify-email-phone.js";
import { renderBasePopup } from "../popup/base.js";
import { renderVerifyCodeContent } from "../popup/content/verify-code.js";
import { renderPaymentMethodsForm } from "../popup/content/choose-payment.js";
import { renderAddNewMethod } from "../popup/content/add-new-payment.js";
import { isValidPhoneNumber } from "../../helper/format-phone.js";
import { formatPhoneNumber } from "../../helper/format-phone.js";
import { shakeError } from "../../helper/shake-error.js";
import { isValidEmail } from "../../helper/input/valid-form.js";
import { renderSumary } from "../summary/summary.js";

$(document).ready(async function () {
  const store = salonStore.getState();
  let currentMonth = store.currentMonth;
  const selectedDate = store.selectedDate;
  const currentYear = store.currentYear;
  const currentDate = new Date();
  const daysOffNail = store.daysOffNail;
  const RVCNo = store.RVCNo;
  // await store.getTimeKeySlot();
  await store.getTimeBeginCurDate(formatDateMMDDYYYY(currentDate)); // khởi tạo lịch ở ngày hiện tại

  const isMobile = $(window).width() <= 768;

  const $wrapNewOnline = $(".wrap-newonline");

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
        salonStore.setState({ ...store, dataBooking });
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
        salonStore.setState({ ...store, dataBooking });
      });
    }
  });

  $(document).on("click", "#btn-back-choose-time", async function () {
    const store = salonStore.getState();
    // Chuyển tới page chọn duy nhất một thợ
    salonStore.setState({
      ...store,
      pageCurrent: PageCurrent.CHOOSE_ONLY_TECH,
    });
    await ChooseTechForServices();
  });

  $(document).on("click", ".time-slot", function () {
    const $this = $(this);
    const valTime = $this.find("#time-val").text().trim();
    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    const user = dataBooking.users.find((u) => u.isChoosing);

    user.selectedTimeSlot = valTime;
    salonStore.setState({ ...store, dataBooking });
  });

  // popup verify user

  $(document).on("click", "#btn-next-choose-time", async function () {
    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    // GUEST
    const userHavePhone = dataBooking.users.find(
      (u) => u.phoneNumber || u.email
    );
    const phoneEmailOrNull =
      userHavePhone?.phoneNumber || userHavePhone?.email || "";
    const htmlVerifyEmailPhone =
      renderVerifyEmailPhoneContent(phoneEmailOrNull);
    let height = 620;
    let width = 560;
    if (isMobile) {
      height = 620;
      width = "100%";
    }
    // const persistent = true;
    const html = renderBasePopup(htmlVerifyEmailPhone, false, height, width);
    $wrapNewOnline.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });

  // Xử lý onChange input appointment-input
  $(document).on("input", "#appointment-input", function () {
    const $this = $(this);
    let val = $this.val().trim();
    const $error = $this.siblings(".error-message");

    const digits = val.replace(/\D/g, "");

    let isPhone = false;
    let isEmail = false;

    // Check nếu là phone đủ 10 số
    if (digits.length === 10 && /^\d+$/.test(digits)) {
      val = formatPhoneNumber(digits); // Format lại hiển thị
      $this.val(val); // Gán lại giá trị vào input
      isPhone = true;
    } else {
      // Nếu đang ở dạng đã format mà không còn đủ 10 số → gỡ format
      if (val.includes("(") || val.includes(")") || val.includes("-")) {
        if (digits.length !== 10) {
          val = digits;
          $this.val(val);
        }
      }

      isPhone = isValidPhoneNumber(val);
      isEmail = isValidEmail(val);
    }
    // clear input #appointment-input
    $(document).on("click", ".clear-icon", function () {
      const $inputAppt = $("#appointment-input");
      $inputAppt.val("");
      clearInputError($inputAppt);
      $inputAppt.focus();
    });

    // Cập nhật lỗi
    if (val === "") {
      $this.addClass("is-invalid");
      $error.text("Email or phone is required.");
      // $('.btn-next-emailPhone').prop('disabled', true)
    } else if (val !== "" && !isPhone && !isEmail) {
      $this.addClass("is-invalid");
      $error.text("Email or phone is incorrect format.");
      // $('.btn-next-emailPhone').prop('disabled', true)
    } else {
      $this.removeClass("is-invalid");
      $error.text("");
      // Cho phép next
      $(".btn-next-emailPhone-1").prop("disabled", false);
    }
  });
  // Xử lý blur input apointment-input
  $(document).on("blur", "#appointment-input", function () {
    const store = salonStore.getState();
    const dataBooking = store.dataBooking;

    const $this = $(this);
    const res = validateEmailPhoneInput($this);
    if (res === "EMAIL") {
      dataBooking.users[0].email = $this.val();
    } else if (res === "PHONE") {
      dataBooking.users[0].phoneNumber = $this.val();
    } else {
      // $('.btn-next-emailPhone').prop('disabled', true)
    }
  });

  // Xử lý sự kiện cho next verify
  $(document).on("click", ".btn-next-emailPhone-1", async function () {
    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    const RVCNo = store.RVCNo;
    const $appointInput = $("#appointment-input");
    const res = validateEmailPhoneInput($appointInput);
    if (!res) return;

    const value = $appointInput.val();
    const resVerifyGetOtp = await sendOTP(value, res);

    if (resVerifyGetOtp && resVerifyGetOtp.status === 200) {
      const extraData = resVerifyGetOtp.extraData;
      dataBooking.users[0] = {
        ...dataBooking.users[0],
        email: extraData?.mail,
        phoneNumber: extraData?.contactPhone,
        firstName: extraData?.firstName,
        lastName: extraData?.lastName,
        rcpCustomer: extraData?.rcpCustomer,
        isChoosing: true,
        isVerify: true,
      };
      // update store
      salonStore.setState({
        ...store,
        dataBooking,
      });

      const emailPhoneMasked =
        res === typeInput.EMAIL
          ? dataBooking.users[0].email
          : dataBooking.users[0].phoneNumber;

      const htmlVerifyEmailPhoneMasked =
        renderVerifyCodeContent(emailPhoneMasked);

      const persistent = true;
      let height = 620,
        width = 560;
      if (isMobile) {
        height = 620;
        width = "100%";
      }

      const html = renderBasePopup(
        htmlVerifyEmailPhoneMasked,
        persistent,
        height,
        width
      );
      $wrapHomeTemp.append(html);

      setTimeout(() => {
        $(".overlay-screen").addClass("show");
        $('.otp-box[data-index="0"]').focus();
      }, 20);

      resendCountdown = 59;
      startResendTimer();

      const typeBooking = dataBooking.type;
      if (typeBooking === typeBookingEnum.GUESTS) {
        // Add thêm 1 Guest rỗng
        $(".btn-increase").trigger("click");
      }

      // lấy listcard authorized tại đây
      const owner = dataBooking.users[0];
      const customerID = owner.id;
      const rcpCustomer = owner.rcpCustomer;

      // locktime thợ đã chọn
      for (const user of dataBooking.users) {
        const listPayload = buildLocktimePayload(user);
        for (const payload of listPayload) {
          try {
            await fetchAPI.post("/api/appointment/createlocktime", payload);
          } catch (e) {
            console.error("[sendOTP - locktime tech]", payload, e);
          }
        }
      }

      // get list card authorized
      try {
        const listCardAuthorized = await fetchAPI.post(
          `/api/card/getlistcardauthorize?RCPCustomer=${rcpCustomer}&CustomerID=${customerID}&RVCNo=${RVCNo}&TypeAuthorize=1`
        );
        if (listCardAuthorized.data)
          dataBooking.cardNumber = listCardAuthorized.data;
        else return;
      } catch (e) {
        console.error("[sendOTP - list card authorized]", e.error);
      }
    } else {
      // console.log("! status 200");
    }
  });

  // next form policies
  $(document).on("click", ".btn-next-policies-1", async function () {
    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    const contentPaymentMethod = renderPaymentMethodsForm(dataBooking);
    let height = 776;
    let width = 886;
    if (isMobile) {
      height = 676;
      width = "100%";
    }
    const html = renderBasePopup(contentPaymentMethod, false, height, width);
    $wrapNewOnline.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });
  // add new card
  $(document).on("click", ".add-new-card-btn-1", function () {
    const htmlAddNewMethod = renderAddNewMethod();
    const persistent = true;
    const html = renderBasePopup(htmlAddNewMethod, persistent, 900, 886);

    $wrapNewOnline.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });
  // back: add new card
  $(document).on("click", ".btn-back-add-card", function () {
    let height = 776;
    let width = 886;
    if (isMobile) {
      height = 676;
      width = "100%";
    }
    const htmlPaymentMethod = renderPaymentMethodsForm(dataBooking);
    const html = renderBasePopup(htmlPaymentMethod, false, height, width);

    $wrapNewOnline.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
    // settime close form
  });

  $(document).on("click", ".payment-method-item", function () {
    const store = salonStore.getState();
    const dataBooking = store.dataBooking;

    const $this = $(this);
    $(".payment-method-item").removeClass("selected");

    $this.addClass("selected");
    const idCard = $this.data("id");
    let cardChoosing = {};
    dataBooking.cardNumber.forEach((item) => {
      if (item.id == idCard) {
        item.isChoosing = true;
        cardChoosing = item;
      }
    });
    salonStore.setState({ ...store, dataBooking });
    // bật nút Confirm
    $(".btn-next-payment-1").prop("disabled", false);
  });

  $(document).on("click", ".btn-next-payment-1", function () {
    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    const dataServices = store.dataServices;

    renderSumary(dataBooking, dataServices);

    salonStore.setState((prev) => ({
      ...prev,
      pageCurrent: PageCurrent.SUMMARY,
    }));
  });
});
