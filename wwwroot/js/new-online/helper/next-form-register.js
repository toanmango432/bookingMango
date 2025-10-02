import { renderRegisterForm } from "../popup/content/register.js";
import { renderBasePopup } from "../popup/base.js";
// import constant
import { typeInput } from "../../constants/template-online.js";
import { salonStore } from "../../store/new-online-store.js";

export function nextFormRegister(actionCur) {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const userBooking = dataBooking.users.find((u) => u.isChoosing);

  let fieldEntered;
  const isMobile = $(window).width() <= 768;
  const $wrapNewOnline = $(".wrap-newonline");

  const dataRegis = {};
  if (userBooking.email?.trim()) {
    fieldEntered = typeInput.EMAIL;
    dataRegis.email = userBooking.email.trim();
  } else if (userBooking.phoneNumber?.trim()) {
    fieldEntered = typeInput.PHONE;
    dataRegis.phoneNumber = userBooking.phoneNumber.trim();
  }

  const htmlFormRegis = renderRegisterForm(dataRegis, fieldEntered, actionCur);
  const persistent = true;
  let height = 762;
  let width = 886;
  if (isMobile) {
    height = "fit-content";
    width = "100%";
  }
  const html = renderBasePopup(htmlFormRegis, persistent, height, width);
  $wrapNewOnline.append(html);
  setTimeout(() => {
    $(".overlay-screen").addClass("show");
  }, 10);
  // document.getElementById("phone-register").readOnly =
  //   fieldEntered === typeInput.PHONE;
  // document.getElementById("email-register").readOnly =
  //   fieldEntered === typeInput.EMAIL;
}
