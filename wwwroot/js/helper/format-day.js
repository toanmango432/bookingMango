export function formatDateMMDDYYYY(d) {
  // Nếu truyền vào là string thì convert sang Date
  if (typeof d === "string") {
    d = new Date(d);
  }

  // Nếu vẫn không phải Date hợp lệ thì null
  if (!(d instanceof Date) || isNaN(d)) {
    console.warn("formatDateMMDDYYYY: invalid date", d);
    return null;
  }

  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();

  return `${month}/${day}/${year}`;
}
