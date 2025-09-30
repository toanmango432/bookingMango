// content popup verify phone & email
export function renderVerifyEmailPhoneContent(emailOrPhone, colorPrimary) {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const owner = dataBooking.users[0];
  const cardChoosing = dataBooking.cardNumber.find((card) => card.isChoosing);
  const OBLogin = store.OBLogin;

  const isSkipVerify =
    (owner.phoneNumber || owner.email) && cardChoosing ? true : false;

  const textTitle = {
    0: "Please enter your cell phone number to make an appointment",
    1: "Please enter your email to make an appointment",
    2: "Please enter your cell phone number or email to make an appointment",
  };

  const textPlaceholder = {
    0: "Enter your phone number",
    1: "Enter your email address",
    2: "Enter phone number or email address",
  };
  return `
        <div class="popup-wrap-verify-emailPhone"
          style="
            --color-cur-primary: ${colorPrimary ? colorPrimary : "white"}
          "
        >
          <div class="title-appointment">
            <h2>${textTitle[OBLogin || 0]}</h2>
          </div>
          <div class="container-verify-emailPhone">
            <input type="text" id="appointment-input-1" class="appointment-input-1" value="${
              emailOrPhone ? formatPhoneNumber(emailOrPhone) : ""
            }" placeholder="${textPlaceholder[OBLogin || "0"]}">
            <span class="clear-icon">
              <i class="fa-solid fa-arrow-left"></i>
            </span>
            <p class="error-message"></p>
            <!--
            <p class="register-nav">
              <span class="text-ques-regis">
                Don't have an account?
              </span>
              <span id="nav-tab-register" class="nav-tab-register">Sign up?</span>
            </p>
            -->
          </div>
          <div class="consent-container">
            <span class="wrap-icon-checked">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 6.73671L4.67305 9.75195L11.5 3.75195" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <label for="consent-checkbox">Input your number to consent to HANG NAILS & SPA SMS messages. Opt out with Stop</label>
          </div>
          <div class="wrap-btn-create">
            <button id="btn-create-new" class="btn-create-new text-uppercase">
              Create new client
            </button>
          </div>
          <div class="button-container">
          ${
            isSkipVerify
              ? `<button id="skip-verify" class="btn-skip-verify">Skip verify</button>`
              : ``
          }
            <button class="btn-next-emailPhone-1" ${
              emailOrPhone ? "" : "disabled"
            }>Next</button>
          </div>
        </div>
      `;
}
import { salonStore } from "../../../store/new-online-store.js";
import { renderSumary } from "../../summary/summary.js";
import { formatPhoneNumber } from "../../../helper/format-phone.js";
import { PageCurrent } from "../../../constants/new-online.js";
// import helper
import { nextFormRegister } from "../../helper/next-form-register.js";
// import constant
import { actionCurRegister } from "../../../constants/template-online.js";
$(document).ready(async function () {
  $(document).on("click", "#skip-verify", async function () {
    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    const owner = dataBooking.users[0];
    const listDataService = store.dataServices;

    // check lại cho phép skip
    const cardChoosing = dataBooking.cardNumber.find((card) => card.isChoosing);
    const isSkipVerify =
      (owner.phoneNumber || owner.email) && cardChoosing ? true : false;
    if (!isSkipVerify) return;

    salonStore.setState((prev) => ({
      ...prev,
      pageCurrent: PageCurrent.SUMMARY,
    }));
    renderSumary(dataBooking, listDataService);
  });
  $(document).on("click", "#btn-create-new", function () {
    nextFormRegister(actionCurRegister.CREATE_NEW);
  });
});
