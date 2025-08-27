export function isValidPhoneNumber(phoneNumber) {
  if (typeof phoneNumber !== "string") return false;

  // Xóa tất cả ký tự không phải số
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Regex kiểm tra: đủ 10 chữ số
  const regex = /^\d{10}$/;

  return regex.test(cleaned);
}

export function formatPhoneNumber(raw) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 10) return raw;

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
// UNFORMAT PHONE NUMBER
export function unFormatPhoneNumber(formatted) {
  if (!formatted) return "";
  return formatted.replace(/\D/g, "");
}
