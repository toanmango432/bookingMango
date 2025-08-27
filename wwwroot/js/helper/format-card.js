// format card number
export function formatCardNumber(value) {
  const digits = value.replace(/\D/g, ""); // giữ lại số
  return (
    digits
      .match(/.{1,4}/g) // tách thành từng block 4 số
      ?.join("-") || ""
  ); // nối lại bằng dấu -
}
// unformat card number
export function unformatCardNumber(value) {
  return value.replace(/\D/g, ""); // xóa tất cả ký tự không phải số
}
// valid cardnumber
export function isValidCardNumber(value) {
  const digits = value.replace(/\D/g, ""); // xoá mọi ký tự không phải số
  return /^\d{13,19}$/.test(digits); // còn lại 13–19 số
}

// format date expired
export function formatExpiryDate(value) {
  return value
    .replace(/\D/g, "") // chỉ giữ số
    .replace(/(\d{2})(\d{1,2})/, "$1/$2") // auto thêm /
    .slice(0, 5); // giới hạn 5 ký tự
}
// valid date expired
export function isValidExpiryDate(value) {
  if (!/^\d{2}\/\d{2}$/.test(value)) return false;

  const [mm, yy] = value.split("/").map(Number);
  if (mm < 1 || mm > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100; // lấy 2 số cuối
  const currentMonth = now.getMonth() + 1;

  // expired?
  return yy > currentYear || (yy === currentYear && mm >= currentMonth);
}
// valid cvv
export function isValidCVV(value) {
  return /^\d{3,4}$/.test(value);
}
// Hàm dấu mã số thẻ
export function maskCardNumber(cardNumber = "") {
  if (!cardNumber) return "";
  const digits = cardNumber.replace(/\D/g, "");
  const last4 = digits.slice(-4);
  // fake X cho đủ 12 số + nối 4 số cuối
  const masked = "X".repeat(12) + last4;
  // nhóm 4 số 1 block
  return masked.match(/.{1,4}/g).join("-");
}
