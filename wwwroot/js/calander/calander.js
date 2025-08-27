// render calender
export function renderCalendar(
  monthNames,
  dayNames,
  currentMonth,
  currentYear,
  fakeDataCalender,
  selectedDate,
  dataBooking,
  listDataService
) {
  const daysEl = document.getElementById("days");
  const monthYearEl = document.getElementById("monthYear");
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

    const isToday =
      date === todayDate &&
      currentMonth === todayMonth &&
      currentYear === todayYear;
    const isSelected =
      selectedDate &&
      date === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear();
    const nonWorking = fakeDataCalender[currentMonth + 1]?.includes(date);

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
      day.addEventListener("click", () => {
        selectedDate = new Date(currentYear, currentMonth, date);
        const user = dataBooking.users.find((u) => u.isChoosing);
        if (user) {
          user.selectedDate = selectedDate;
        }
        document
          .querySelectorAll(".day")
          .forEach((d) => d.classList.remove("active", "today"));
        day.classList.add("active");
        document.getElementById("selectedDateTitle").textContent =
          selectedDate.toDateString();
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
    document.getElementById("selectedDateTitle").textContent =
      selectedDate.toDateString();
    renderTimeSlotsForDate(dataBooking);
  }
}

import { renderTimeSlotsForDate } from "../time-slots/time-slots.js";
