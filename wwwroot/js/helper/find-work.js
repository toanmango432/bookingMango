export function formatAutoFirstName(owner, id) {
  return owner.firstName + " " + "G" + id;
}
// function lấy ngày
export function normalizeToDate(d) {
  if (!d) return null;
  const dt = d instanceof Date ? d : new Date(d);
  return isNaN(dt.getTime()) ? null : dt;
}

export function isNonWorkingDay(date, fakeDataCalender) {
  if (!date) return false;
  const m0 = date.getMonth(); // 0-index
  const m1 = m0 + 1; // maybe your map uses 1-index
  const day = date.getDate();
  const arr0 = fakeDataCalender[m0] || [];
  const arr1 = fakeDataCalender[m1] || [];
  return arr0.includes(day) || arr1.includes(day);
}

export function findNextWorkingDate(
  startDate,
  fakeDataCalender,
  maxDays = 365
) {
  const d = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  let tries = 0;
  while (isNonWorkingDay(d, fakeDataCalender) && tries < maxDays) {
    d.setDate(d.getDate() + 1);
    tries++;
  }
  return d;
}
