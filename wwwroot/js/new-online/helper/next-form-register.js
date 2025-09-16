import { renderRegisterForm } from "../popup/content/register.js";
import { renderBasePopup } from "../popup/base.js";
// import constant
import { typeInput } from "../../constants/template-online.js";

export function nextFormRegister(dataBooking) {
  let fieldEntered;
  const isMobile = $(window).width() <= 768;
  const $wrapNewOnline = $(".wrap-newonline");

  const user = dataBooking.users[0];
  const dataRegis = {};
  if (user.email?.trim()) {
    fieldEntered = typeInput.EMAIL;
    dataRegis.email = user.email.trim();
    user.phoneNumber = "";
    user.firstName = "";
    user.lastName = "";
  } else if (user.phoneNumber?.trim()) {
    fieldEntered = typeInput.PHONE;
    dataRegis.phoneNumber = user.phoneNumber.trim();
    user.email = "";
    user.firstName = "";
    user.lastName = "";
  }

  const htmlFormRegis = renderRegisterForm(dataRegis, fieldEntered);
  const persistent = true;
  let height = 762;
  let width = 886;
  if (isMobile) {
    height = 800;
    width = "100%";
  }
  const html = renderBasePopup(htmlFormRegis, persistent, height, width);
  $wrapNewOnline.append(html);
  setTimeout(() => {
    $(".overlay-screen").addClass("show");
  }, 10);
  document.getElementById("phone-register").readOnly =
    fieldEntered === typeInput.PHONE;
  document.getElementById("email-register").readOnly =
    fieldEntered === typeInput.EMAIL;
}
