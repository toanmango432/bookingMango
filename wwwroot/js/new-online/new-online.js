// import component
import { ChooseNailSalon } from "./choose-nail-salon/choose-nail-salon.js";
// import helper
$(document).ready(async function () {
  const $wrapNewOnline = $(".wrap-newonline");
  await ChooseNailSalon();

  // event quickly
  // Bắt Enter khi popup verify email/phone đang mở
  $(document).on("keydown", function (e) {
    if (
      (e.key === "Enter" || e.which === 13) &&
      $(".popup-wrap-verify-emailPhone").length > 0
    ) {
      e.preventDefault();
      $(".btn-next-emailPhone-1").trigger("click");
    }
  });
});
