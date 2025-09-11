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
  const daysEl = document.getElementById("days");
  const monthYearEl = document.getElementById("monthYear");
  if (!daysEl || monthYearEl) return;
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
        templateStore.setState({ dataBooking });

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
          await fetchStaffTimeSlots({
            dataBooking,
            itemSelected: {},
            empID: item,
          });
        }
        const slotTimeForSelect = templateStore.getState().slotTimeForSelect;
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

export async function fetchStaffTimeSlots({
  dataBooking,
  itemSelected,
  empID,
  oldEmpID = null, // tham số khi đổi staff
}) {
  try {
    // 1. Lấy user đang chọn
    const userChoosing = dataBooking.users.find((u) => u.isChoosing === true);
    const RVCNo = templateStore.getState().RVCNo;
    if (!userChoosing) return [];

    // 2. Tính tổng duration cho thợ empID
    let totalDuration = 0;

    // ---- A. Các service đã có trong dataBooking ----
    for (const sv of userChoosing.services) {
      for (const item of sv.itemService) {
        if (item.selectedStaff && item.selectedStaff.employeeID === empID) {
          // cộng duration chính
          totalDuration += item.duration || 0;

          // cộng optionals nếu có
          if (Array.isArray(item.optionals) && item.optionals.length) {
            totalDuration += item.optionals.reduce(
              (sum, opt) => sum + (opt.timedura || 0),
              0
            );
          }
        }
      }
    }

    // ---- B. Service vừa chọn (chưa có trong dataBooking) ----
    if (itemSelected) {
      totalDuration += itemSelected.timetext || 0;
    }

    if (totalDuration === 0) {
      console.warn("Chưa có dịch vụ nào gán cho thợ:", empID);
      return [];
    }

    // 3. Lấy ngày
    const dateSer =
      formatDateMMDDYYYY(userChoosing.selectedDate) ||
      formatDateMMDDYYYY(new Date());

    // 4. Call API
    const res = await fetchAPI.get(
      `/api/appointment/gettimebookonline?date=${dateSer}&duration=${totalDuration}&rvcno=${RVCNo}&empID=${empID}`
    );

    const techID = empID;
    let slotTimeMultiTech = templateStore.getState().slotTimeMultiTech;

    // --- Clone mảng ---
    let techs = [...slotTimeMultiTech.techs];
    let durations = [...slotTimeMultiTech.durations];

    // --- Nếu có oldEmpID thì remove thợ cũ trước ---
    if (oldEmpID) {
      techs = techs.filter((t) => t.techID !== oldEmpID);
      durations = durations.filter((d) => d.techID !== oldEmpID);
    }

    // --- Update techs ---
    let idxTech = techs.findIndex((t) => t.techID === techID);
    if (idxTech >= 0) {
      techs[idxTech] = { ...techs[idxTech], timeSlotTech: res?.data };
    } else {
      techs.push({ techID, timeSlotTech: res?.data });
    }

    // --- Update durations ---
    let idxDur = durations.findIndex((d) => d.techID === techID);
    if (idxDur >= 0) {
      durations[idxDur] = { techID, totalDuration };
    } else {
      durations.push({ techID, totalDuration });
    }

    // --- Update store ---
    slotTimeMultiTech = { techs, durations };
    templateStore.setState({ slotTimeMultiTech });

    // lọc slot time (multi tech)
    const possibleTimeSlot = findMultiTechStarts(slotTimeMultiTech);
    templateStore.setState({ slotTimeForSelect: possibleTimeSlot });

    return {
      timeSlotTech: res?.data || [],
      duration: totalDuration,
    };
  } catch (e) {
    console.error("Lỗi lấy time slots:", e);
    return [];
  }
}

export function renderTimeSlotsForDate(dataBooking, slotTimeForSelect = {}) {
  const container = $("#timeSlotsContainer");
  container.empty();
  //timeslot khi chưa chọn thợ
  const workingHoursByWeekday = {
    0: [], // Chủ nhật - không làm
    1: ["08:00", "20:00"], // Thứ 2
    2: ["08:00", "20:00"], // Thứ 3
    3: ["08:00", "20:00"], // Thứ 4
    4: ["08:00", "20:00"], // Thứ 5
    5: ["08:00", "20:00"], // Thứ 6
    6: ["08:00", "20:00"], // Thứ 7
  };
  let selectedDate =
    templateStore.getState().dataBooking.users.find((u) => u.isChoosing)
      .selectedDate || new Date();
  const weekday = selectedDate.getDay();
  const workingRange = workingHoursByWeekday[weekday];
  if (!workingRange || workingRange.length === 0) {
    container.append(
      `<div class="time-slot">Không có giờ làm việc hôm nay.</div>`
    );
    return;
  }
  let slots = generateTimeSlotsDynamic(
    selectedDate,
    workingRange[0],
    workingRange[1]
  );
  // khi đã chọn thợ
  if (Object.keys(slotTimeForSelect).length > 0) {
    slots = slotTimeForSelect.map((item) => item.time);
  }
  function removeAmPm(timeStr = "") {
    if (typeof timeStr !== "string") return timeStr;
    return timeStr.replace(/\s?(AM|PM)$/i, "").trim();
  }
  slots.forEach((slot) => {
    const div = $(`
        <div class="time-slot">
          <span>${removeAmPm(slot)}</span>
          <span>${getAMPM(slot)}</span>
          <div class="circle">
            <div class="dot"></div>
          </div>
        </div>
      `);
    container.append(div);
  });
  container.off("click", ".time-slot");

  // Nếu user đã có selectedTimeSlot thì đánh dấu slot tương ứng
  const user = dataBooking.users.find((u) => u.isChoosing);
  if (user && user.selectedTimeSlot) {
    const match = container.find(".time-slot").filter(function () {
      return (
        $(this).find("span").text().trim() ===
        String(user.selectedTimeSlot).trim()
      );
    });
    if (match.length) {
      container.find(".time-slot").removeClass("selected");
      match.first().addClass("selected");
      // scroll tới slot
      // container.animate({ scrollTop: match.first().position().top - 40 }, 300);
    } else {
    }
  }
}

export function renderChooseTime(dataBooking) {
  // xử lý lại copy time là khi người dùng chọn 2 service và 2 thợ khác nhau thì cho phép copy same time , tại đây cần check thời gian đó 2 thợ có rảnh không, case mid
  const userCopyTime = dataBooking.users.find(
    (u) => u.isSelecting && !u.isChoosing
  );
  // Kiểm tra chọn service xong mới hiện chọn time
  const userChoosing = dataBooking.users.find((u) => u.isChoosing);
  const isSelectedService = userChoosing.services.length > 0;
  return `
      <div class="calendar-timeslot">
        <div class="wrap-calendar-time"
          style="
            --color-cur-primary: ${colorPrimary};
          "
        >
          <div class="top-cal-time">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16625 11.4688H13.4263V2.46875H1.90625V21.9688H13.4263V12.9688H7.16625V11.4688Z" fill="#E27303" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8448 11.4691C19.8328 11.4681 18.0008 9.63605 18.0008 7.62305V6.87305H16.5008V7.62305C16.5008 9.10005 17.1758 10.4801 18.2198 11.4691L13.4219 11.469V12.969L18.2198 12.9691C17.1758 13.9581 16.5008 15.3371 16.5008 16.8141V17.5641H18.0008V16.8141C18.0008 14.8021 19.8338 12.9691 21.8458 12.9691H22.5958V11.4691H21.8448Z" fill="#E27303" />
            </svg>
            <h2 class="title-copy-time text-uppercase mb-0">SELECT DATE AND TIME</h2>
            ${
              userCopyTime && Object.keys(userCopyTime).length > 0
                ? `<div class="copy-time">
                <input
                  id="select-banner-pm"
                  type='checkbox'
                  class='toggle-switch'
                  ${isCopySameTime ? "checked" : ""}
                />
                <span class="text-same-time">Start on same time</span>
              </div>`
                : ""
            }
          </div>
          <div class="container-cal-time">
            <div class="calendar">
              <div class="calendar-header">
                <button id="prev">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path d="M12.5547 22.752C18.0775 22.752 22.5547 18.2748 22.5547 12.752C22.5547 7.22911 18.0775 2.75195 12.5547 2.75195C7.03184 2.75195 2.55469 7.22911 2.55469 12.752C2.55469 18.2748 7.03184 22.752 12.5547 22.752Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.0547 12.752H10.0547" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.0547 9.75195L9.05469 12.752L12.0547 15.752" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div id="monthYear"></div>
                <button id="next">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path d="M12.5547 22.752C18.0775 22.752 22.5547 18.2748 22.5547 12.752C22.5547 7.22911 18.0775 2.75195 12.5547 2.75195C7.03184 2.75195 2.55469 7.22911 2.55469 12.752C2.55469 18.2748 7.03184 22.752 12.5547 22.752Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9.05469 12.752H15.0547" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.0547 15.752L16.0547 12.752L13.0547 9.75195" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div class="calendar-grid" id="days">
              </div>
            </div>
            <div class="timeslot">
              <h2 id="selectedDateTitle">August 14, 2025</h2>
              <!-- <div id="comboBox"></div> -->
              <div id="timeSlotsContainer" class="time-slots"></div>
              <div class="text-scroll-more">
                <h2>Scroll to see more time slots</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}

// import store
import { salonStore } from "../../store/new-online-store.js";
// import component

// import constant

$(document).ready(async function () {});
