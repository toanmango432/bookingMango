// đánh dấu tech đã chọn
export function updateTabMark(empID, hasTime) {
  const el = document.querySelector(`.tab-list .tab-item[data-id="${empID}"]`);
  if (!el) return;
  el.classList.toggle("has-time", !!hasTime);
}
