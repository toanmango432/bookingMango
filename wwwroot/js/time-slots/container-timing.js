// render container time-booking && select time
export function renderContainerTiming(
  dataBooking,
  currentDate,
  monthNames,
  dayNames,
  currentMonth,
  currentYear,
  fakeDataCalender,
  selectedDateParam,
  listDataService,
  isCopySameTime
) {
  const $wrapCalendarTimeslot = $(".calendar-timeslot");
  const htmlTimeBooking = renderTimeBooking(dataBooking, isCopySameTime);
  $wrapCalendarTimeslot.replaceWith(htmlTimeBooking);

  // Lấy user hiện tại
  const user = dataBooking.users.find((u) => u.isChoosing);

  // 1. Lấy selectedDate ưu tiên từ user, nếu là string -> new Date()
  let userSelected = user ? normalizeToDate(user.selectedDate) : null;

  // 2. Nếu không có userSelected => chọn selectedDateParam hoặc today
  let useDate =
    userSelected || normalizeToDate(selectedDateParam) || new Date();

  // 3. Không để date ở quá khứ (so với today) — nếu quá khứ dùng today
  const today = new Date();
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  if (useDate < todayOnly) useDate = todayOnly;

  // 4. Nếu ngày rơi vào non-working, tìm ngày làm việc tiếp theo
  useDate = findNextWorkingDate(useDate, fakeDataCalender);

  // 5. đồng bộ month/year với useDate
  currentMonth = useDate.getMonth();
  currentYear = useDate.getFullYear();

  // Render calendar + time slots với ngày đã chọn
  renderCalendar(
    monthNames,
    dayNames,
    currentMonth,
    currentYear,
    fakeDataCalender,
    useDate,
    dataBooking,
    listDataService
  );

  // Cập nhật tiêu đề ngày
  const titleEl = document.getElementById("selectedDateTitle");
  if (titleEl) titleEl.textContent = useDate.toDateString();

  // Render time slots cho ngày này (và sẽ chọn time slot nếu user.selectedTimeSlot tồn tại)
  renderTimeSlotsForDate(dataBooking);
}
