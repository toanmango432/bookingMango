// render calender
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
  console.log("check");

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

import {
  findItemsOfTech,
  renderTimeSlotsForDate,
} from "../time-slots/time-slots.js";
import { templateStore } from "../store/template-store.js";
import { fetchStaffTimeSlots } from "../layout-template/layout.js";
