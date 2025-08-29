import { fetchAPI } from "./site.js";
import { alertCustom } from "./site.js";

const dataTemplate = JSON.parse(localStorage.getItem("dataTemplate"));
export let dataRelease = JSON.parse(JSON.stringify(dataTemplate));
console.log("dataPage ", dataRelease);
export const colorPrimary = dataRelease?.color?.bgPrimary || "#00bed6";
export const colorSecondary = dataRelease?.color?.bgSecondary || "#1cdef4";
// Thêm option vào item id = "page-about"
const optionItems = [
  {
    aboutItemId: 1,
    text: "About Nailvibe",
    bgColor: dataRelease.color.bgPrimary,
  },
  { aboutItemId: 2, text: "About Mango", bgColor: dataRelease.color.bgPrimary },
];
const findAbout = dataRelease.dataHeaderNav.itemNav.find(
  (item) => item.id === "page-about"
);
if (findAbout) {
  findAbout.optionItems = optionItems;
}

export function nextFormRegister(dataBooking, colorPrimary) {
  let fieldEntered;
  const isMobile = $(window).width() <= 768;
  const $wrapHomeTemp = $(".wrap-home-templates");

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

  const htmlFormRegis = renderRegisterForm(
    dataRegis,
    fieldEntered,
    colorPrimary
  );
  const persistent = true;
  let height = 762;
  let width = 886;
  if (isMobile) {
    height = 800;
    width = "100%";
  }
  const html = renderBasePopup(htmlFormRegis, persistent, height, width);
  $wrapHomeTemp.append(html);
  setTimeout(() => {
    $(".overlay-screen").addClass("show");
  }, 10);
  document.getElementById("phone-register").readOnly =
    fieldEntered === typeInput.PHONE;
  document.getElementById("email-register").readOnly =
    fieldEntered === typeInput.EMAIL;
}
// Hàm fetch ngày nghỉ thật từ tiệm RVCNo
export async function fetchStoreOffDays(rvcNo, month, year) {
  console.log("RC: ", rvcNo);
  const beginDate = `${month + 1}/01/${year}`;
  const endDate = `${month + 1}/30/${year}`;
  const url = `/api/store/getstoreoffday?rvcNo=${rvcNo}&beginDate=${encodeURIComponent(
    beginDate
  )}&endDate=${encodeURIComponent(endDate)}`;

  try {
    const res = await fetchAPI.get(url);
    if (res.status === 0 && Array.isArray(res.data)) {
      return res.data.map((item) => new Date(item.dateOff).getDate());
    }
    return [];
  } catch (e) {
    console.error("[fetchStoreOffDays]", {
      message: e.message,
      stack: e.stack,
      name: e.name,
    });
    return [];
  }
}
// Hàm cập nhật dữ liệu daysOffNail theo tháng
export function updateCalendarData(month, year, rvcNo, daysOffNail, callback) {
  fetchStoreOffDays(rvcNo, month, year).then((daysOff) => {
    daysOffNail[month + 1] = daysOff; // lưu lại theo key tháng
    // update store
    templateStore.setState({ daysOffNail: { ...daysOffNail } });
    if (typeof callback === "function") callback();
  });
}
// import store
import { templateStore } from "./store/template-store.js";
// import constant
import {
  typeBookingEnum,
  genderEnum,
  typeInput,
  typeRequire,
  idStaffDefault,
} from "./constants/template-online.js";
import { monthNames, dayNames } from "./constants/days-weeks.js";
// import header
// import banner
import { renderBookingOption } from "./banner/booking-option.js";
// import popup
import { renderBasePopup } from "./popup/base.js";
import { renderPopupUpload } from "./popup/popup-upload.js";
import { renderAddNewMethod } from "./popup/content/add-new-payment.js";
import { renderPaymentConfirmationForm } from "./popup/content/payment-confirm.js";
import { renderPaymentMethodsForm } from "./popup/content/choose-payment.js";
import { renderPoliciesForm } from "./popup/content/policies.js";
import { renderRegisterForm } from "./popup/content/register.js";
import { renderVerifyCodeContent } from "./popup/content/verify-code.js";
import { renderVerifyEmailPhoneContent } from "./popup/content/verify-email-phone.js";
import { renderContentNotify } from "./popup/content/notify.js";
import { startConfirmAnimation } from "./helper/confirm-animation.js";
import { closePopupContainerTemplate } from "./popup/close-popup.js";
// import scroll quickly
import {
  updateScrollButton,
  showScrollToTarget,
  showScrollToFinalBooking,
} from "./scroll-quickly/scroll-quickly.js";
// import sumary
import { renderSumary } from "./sumary/sumary.js";
// import time-slots
import { renderTimeSlotsForDate } from "./time-slots/time-slots.js";
import { renderCalendar } from "./calander/calander.js";
// import layout
import {
  updateGuestSection,
  renderListService,
  renderBlockTemplate,
} from "./layout-template/layout.js";
// help function
import {
  validateEmailPhoneInput,
  isValidEmail,
} from "./helper/input/valid-form.js";
import { formatDateMMDDYYYY } from "./helper/format-day.js";
import { buildLocktimePayload } from "./helper/build-lock-time.js";
import {
  validateEmailFormRegister,
  validatePhoneFormRegister,
} from "./helper/input/valid-form.js";
import {
  isValidPhoneNumber,
  formatPhoneNumber,
  unFormatPhoneNumber,
} from "./helper/format-phone.js";
import {
  shakeError,
  showInputError,
  clearInputError,
} from "./helper/shake-error.js";
import { jsonToXml } from "./helper/xlm-to-json.js";
import {
  formatCardNumber,
  unformatCardNumber,
  isValidCardNumber,
  formatExpiryDate,
  isValidExpiryDate,
  isValidCVV,
  maskCardNumber,
} from "./helper/format-card.js";
import { sendOTP } from "./helper/send-otp.js";

$(document).ready(async function () {
  const $wrapHomeTemp = $(".wrap-home-templates");
  let dataBooking = templateStore.getState().dataBooking;
  let dataMe = templateStore.getState().dataMe;
  let dataGuest = templateStore.getState().dataGuest;
  let dataFamily = templateStore.getState().dataFamily;
  let dataSetting = templateStore.getState().dataSetting;
  let policySetting = templateStore.getState().policySetting;
  const RVCNo = templateStore.getState().RVCNo;

  let listDataService = await templateStore.getState().getListDataService();
  let listUserStaff = await templateStore.getState().getListUserStaff();

  let { banner } = dataRelease;
  // Khai báo currentUserId trước khi gọi renderBlockTemplate
  let currentUserId = dataBooking.users[0]?.id || 1;
  // fake time , sẽ xử lý thêm close form
  let resendCountdown = 59;
  let resendInterval;
  // Biến xử lý chọn ngày đặt lịch
  const currentDate = new Date();
  let selectedDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const daysOffNail = templateStore.getState().daysOffNail;

  // hiện nút scroll
  let forceShowScrollBtn = false;
  const $mainScrollBtn = $(".scroll-btn-main");
  // Biến local copySameTime
  let isCopySameTime = true;

  // Kiểm tra mobile
  const isMobile = $(window).width() <= 768;
  // get data store

  renderBlockTemplate({
    listDataService,
    listUserStaff,
    dataBooking,
    dataMe,
    dataGuest,
    dataFamily,
    currentUserId,
    isCopySameTime,
    dataSetting,
  });

  // Xử lý onChange input appointment-input
  $(document).on("input", "#appointment-input", function () {
    const $this = $(this);
    let val = $this.val().trim();
    const $error = $this.siblings(".error-message");

    const digits = val.replace(/\D/g, "");

    let isPhone = false;
    let isEmail = false;

    // Check nếu là phone đủ 10 số
    if (digits.length === 10 && /^\d+$/.test(digits)) {
      val = formatPhoneNumber(digits); // Format lại hiển thị
      $this.val(val); // Gán lại giá trị vào input
      isPhone = true;
    } else {
      // Nếu đang ở dạng đã format mà không còn đủ 10 số → gỡ format
      if (val.includes("(") || val.includes(")") || val.includes("-")) {
        if (digits.length !== 10) {
          val = digits;
          $this.val(val);
        }
      }

      isPhone = isValidPhoneNumber(val);
      isEmail = isValidEmail(val);
    }
    // clear input #appointment-input
    $(document).on("click", ".clear-icon", function () {
      const $inputAppt = $("#appointment-input");
      $inputAppt.val("");
      clearInputError($inputAppt);
      $inputAppt.focus();
    });

    // Cập nhật lỗi
    if (val === "") {
      $this.addClass("is-invalid");
      $error.text("Email or phone is required.");
      // $('.btn-next-emailPhone').prop('disabled', true)
    } else if (val !== "" && !isPhone && !isEmail) {
      $this.addClass("is-invalid");
      $error.text("Email or phone is incorrect format.");
      // $('.btn-next-emailPhone').prop('disabled', true)
    } else {
      $this.removeClass("is-invalid");
      $error.text("");
      // Cho phép next
      $(".btn-next-emailPhone").prop("disabled", false);
    }
  });
  // Xử lý blur input apointment-input
  $(document).on("blur", "#appointment-input", function () {
    const $this = $(this);
    const res = validateEmailPhoneInput($this);
    if (res === "EMAIL") {
      dataBooking.users[0].email = $this.val();
    } else if (res === "PHONE") {
      dataBooking.users[0].phoneNumber = $this.val();
    } else {
      // $('.btn-next-emailPhone').prop('disabled', true)
    }
  });
  // Xử lý sự kiện cho next verify
  $(document).on("click", ".btn-next-emailPhone", async function () {
    const dataBooking = templateStore.getState().dataBooking;
    const RVCNo = templateStore.getState().RVCNo;

    const $appointInput = $("#appointment-input");
    const res = validateEmailPhoneInput($appointInput);
    if (!res) return;

    const value = $appointInput.val();
    const resVerifyGetOtp = await sendOTP(value, res);

    if (resVerifyGetOtp && resVerifyGetOtp.status === 200) {
      const extraData = resVerifyGetOtp.extraData;
      console.log("extraData: ", extraData);
      dataBooking.users[0] = {
        ...dataBooking.users[0],
        email: extraData?.mail,
        phoneNumber: extraData?.contactPhone,
        firstName: extraData?.firstName,
        lastName: extraData?.lastName,
        rcpCustomer: extraData?.rcpCustomer,
        isChoosing: true,
        isVerify: true,
      };
      // update store
      templateStore.setState({
        dataBooking,
      });

      const emailPhoneMasked =
        res === typeInput.EMAIL
          ? dataBooking.users[0].email
          : dataBooking.users[0].phoneNumber;

      const htmlVerifyEmailPhoneMasked = renderVerifyCodeContent(
        emailPhoneMasked,
        colorPrimary
      );

      const persistent = true;
      let height = 620,
        width = 560;
      if (isMobile) {
        height = 620;
        width = "100%";
      }

      const html = renderBasePopup(
        htmlVerifyEmailPhoneMasked,
        persistent,
        height,
        width
      );
      $wrapHomeTemp.append(html);

      setTimeout(() => {
        $(".overlay-screen").addClass("show");
        $('.otp-box[data-index="0"]').focus();
      }, 20);

      resendCountdown = 59;
      startResendTimer();

      const typeBooking = dataBooking.type;
      if (typeBooking === typeBookingEnum.GUESTS) {
        // Add thêm 1 Guest rỗng
        $(".btn-increase").trigger("click");
      }

      // lấy listcard authorized tại đây
      const owner = dataBooking.users[0];
      const customerID = owner.id;
      const rcpCustomer = owner.rcpCustomer;

      // locktime thợ đã chọn
      for (const user of dataBooking.users) {
        const listPayload = buildLocktimePayload(user);
        for (const payload of listPayload) {
          try {
            await fetchAPI.post("/api/appointment/createlocktime", payload);
          } catch (e) {
            console.error("[sendOTP - locktime tech]", payload, e);
          }
        }
      }

      // get list card authorized
      try {
        const listCardAuthorized = await fetchAPI.post(
          `/api/card/getlistcardauthorize?RCPCustomer=${rcpCustomer}&CustomerID=${customerID}&RVCNo=${RVCNo}&TypeAuthorize=1`
        );
        if (listCardAuthorized.data)
          dataBooking.cardNumber = listCardAuthorized.data;
        else return;
      } catch (e) {
        console.error("[sendOTP - list card authorized]", e.error);
      }
    } else {
      // console.log("! status 200");
    }
  });
  // resent verify otp
  $(document).on("click", ".resent-btn", async function () {
    const { email, phoneNumber } = dataBooking.users[0];
    const type = email ? "EMAIL" : "PHONE";
    const value = email || phoneNumber;

    const resVerify = await sendOTP(value, type);

    if (resVerify && resVerify.status === 200) {
      resendCountdown = 59;
      startResendTimer();
    }
  });

  // Xử lý back popup back
  $(document).on("click", ".btn-back-emailPhone", function () {
    dataBooking.users[0].email = "";
    dataBooking.users[0].phoneNumber = "";
    closePopupContainerTemplate();
    // reset optionBooked = ME
    renderBookingOption(
      ".wrap-book-for",
      banner.btnOptionBook,
      typeBookingEnum.ME
    );
  });
  // Auto focus và chuyển sang ô tiếp theo
  $(document).on("input", ".otp-box", function () {
    const $this = $(this);
    const val = $this.val();
    const index = parseInt($this.data("index"), 10);

    if (val.length === 1) {
      $(`.otp-box[data-index="${index + 1}"]`).focus();
    }

    // Nếu đủ 6 ô thì bật nút Verify
    const allFilled = $(".otp-box")
      .toArray()
      .every((input) => $(input).val().length === 1);
    $(".btn-next-verify").prop("disabled", !allFilled);
  });
  function getOtpCode() {
    return $(".otp-box")
      .toArray()
      .map((input) => $(input).val())
      .join("");
  }
  // Cho phép back bằng phím <-
  $(document).on("keydown", ".otp-box", function (e) {
    const $this = $(this);
    const index = parseInt($this.data("index"), 10);

    if (e.key === "Backspace" && !$this.val()) {
      $(`.otp-box[data-index="${index - 1}"]`).focus();
    }
  });
  $(document).on("click", ".btn-next-verify", async function () {
    const policySetting = templateStore.getState().policySetting;
    const dataBooking = templateStore.getState().dataBooking;
    const currencyDeposit = templateStore.getState().currencyDeposit;
    const paymentDeposit = templateStore.getState().paymentDeposit;
    // Chỉ verify code lần đầu đăng ký, những lần sau không còn cần verify
    const phoneVerify = unFormatPhoneNumber(
      JSON.parse(JSON.stringify(dataBooking.users[0]?.phoneNumber || ""))
    );
    dataBooking.currencyDeposit = currencyDeposit;
    dataBooking.paymentDeposit = paymentDeposit;
    templateStore.setState({ dataBooking });

    const emailVerify = dataBooking.users[0].email;

    const optCode = getOtpCode();
    try {
      const resVerifyCode = await fetchAPI.get(
        `/api/user/checkverifycode?phone=${
          phoneVerify || emailVerify
        }&verifyCode=${optCode}`
      );
      if (resVerifyCode.status === 200) {
        const htmlPoliciesForm = renderPoliciesForm(
          policySetting,
          colorPrimary
        );
        let height = 768;
        let width = 886;
        if (isMobile) {
          height = 700;
          width = "100%";
        }
        const persistent = true;
        const html = renderBasePopup(
          htmlPoliciesForm,
          persistent,
          height,
          width
        );

        $wrapHomeTemp.append(html);
        setTimeout(() => {
          $(".overlay-screen").addClass("show");
        }, 10);
      } else if (resVerifyCode.status === 201) {
        // Chưa đăng ký
        nextFormRegister(dataBooking, colorPrimary);
        clearInterval(resendInterval);
      } else {
        // to-do: Ngược lại input verify error shake
      }
    } catch (e) {
      console.error("[on.btn-next-verify]: ", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      });
    }
  });
  // popup register
  $(document).on("click", "#nav-tab-register", function () {
    nextFormRegister(dataBooking, colorPrimary);
    clearInterval(resendInterval);
  });
  function startResendTimer() {
    $(".resend-btn").addClass("disabled");

    resendInterval = setInterval(() => {
      resendCountdown--;
      $(".countdown").text(
        `00:${resendCountdown < 10 ? "0" + resendCountdown : resendCountdown}`
      );

      if (resendCountdown <= 0) {
        clearInterval(resendInterval);
        $(".resend-btn").removeClass("disabled").text("Send Again");
      }
    }, 1000);
  }
  // back để quay về popup email
  $(document).on("click", ".btn-back-verify", function () {
    const emailOrPhone =
      dataBooking.users[0].email || dataBooking.users[0].phoneNumber;
    let height = 620;
    const htmlVerifyEmailPhone = renderVerifyEmailPhoneContent(
      emailOrPhone,
      colorPrimary
    );
    let width = 560;
    if (isMobile) {
      height = 620;
      width = "100%";
    }
    // const persistent = true;
    const htmlPopupVerify = renderBasePopup(
      htmlVerifyEmailPhone,
      false,
      height,
      width
    );

    $wrapHomeTemp.append(htmlPopupVerify);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);

    // reset data users[0]
    dataBooking.users[0].email = "";
    dataBooking.users[0].phoneNumber = "";
    //clear interval time opt
    clearInterval(resendInterval);
  });
  // back form register
  $(document).on("click", ".btn-back-verify-register", function () {
    const emailOrPhone =
      dataBooking.users[0].email || dataBooking.users[0].phoneNumber;
    const htmlVerifyEmailPhone = renderVerifyEmailPhoneContent(
      emailOrPhone,
      colorPrimary
    );
    // const persistent = true;
    let height = 620;
    let width = 560;
    if (isMobile) {
      height = 620;
      width = "100%";
    }
    const htmlPopupVerify = renderBasePopup(
      htmlVerifyEmailPhone,
      false,
      height,
      width
    );
    $wrapHomeTemp.append(htmlPopupVerify);

    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });
  // next verify
  $(document).on("click", ".btn-next-verify-register", async function () {
    const $this = $(this);

    // xử lý check lại toàn bộ form input, verify và snake text error
    // Chỉ check format mail và phone, đã xử lý onChange input verify button verify
    // Lấy giá trị trên tab hiện tại
    const $wrapRegis = $(`.wrap-popup-register`);
    const valPhoneRegis = $wrapRegis.find("#phone-register").val().trim();
    const valFirstRegis = $wrapRegis.find("#firstname-register").val().trim();
    const valLastRegis = $wrapRegis.find("#lastname-register").val().trim();
    const valEmailRegis = $wrapRegis.find("#email-register").val().trim();

    const isPhone = isValidPhoneNumber(valPhoneRegis);
    const isEmail = isValidEmail(valEmailRegis);

    let hasError = false;

    if (valEmailRegis === "" && valPhoneRegis === "") {
      const $errorEmailRegis = $wrapRegis
        .find("#email-register")
        .next(".error-message");
      const textErrEmail =
        "Please enter at least 1 of the 2 fields email or phone number!";
      $errorEmailRegis.text(textErrEmail);
      shakeError($errorEmailRegis);

      const $errorPhoneNumberRegis = $wrapRegis
        .find("#phone-register")
        .next(".error-message");
      const textErrPhoneNumber =
        "Please enter at least 1 of the 2 fields email or phone number!";
      $errorPhoneNumberRegis.text(textErrPhoneNumber);
      shakeError($errorPhoneNumberRegis);

      hasError = true;
    }

    if (valPhoneRegis !== "" && !isPhone) {
      const $errorPhoneRegis = $wrapRegis
        .find("#phone-register")
        .next(".error-message");

      const textErr = !isPhone
        ? "Phone is incorrect format."
        : "Phone is required!";
      $errorPhoneRegis.text(textErr);
      shakeError($errorPhoneRegis);
      hasError = true;
    }

    if (valEmailRegis !== "" && !isEmail) {
      const $errorEmailRegis = $wrapRegis
        .find("#email-register")
        .next(".error-message");

      const textErr = !isEmail
        ? "Email is incorrect format."
        : "Email is required!";
      $errorEmailRegis.text(textErr);
      shakeError($errorEmailRegis);
      hasError = true;
    }

    if (valFirstRegis === "") {
      const $errorFirstRegis = $wrapRegis
        .find("#firstname-register")
        .next(".error-message");

      const textErr = "First name is required!";
      $errorFirstRegis.text(textErr);
      shakeError($errorFirstRegis);
      hasError = true;
    }

    if (valLastRegis === "") {
      const $errorLastRegis = $wrapRegis
        .find("#lastname-register")
        .next(".error-message");

      const textErr = "Last name is required!";
      $errorLastRegis.text(textErr);
      shakeError($errorLastRegis);
      hasError = true;
    }

    if (hasError) {
      $this.blur(); // Gỡ focus
      return;
    }

    // Đăng ký thành viên
    const payloadRegis = {
      firstName: valFirstRegis,
      lastName: valLastRegis,
      contactPhone: unFormatPhoneNumber(
        JSON.parse(JSON.stringify(valPhoneRegis))
      ),
      email: valEmailRegis,
      isMail: valEmailRegis ? true : false,
    };
    try {
      // /api/card/createauthorize
      const resRegis = await fetchAPI.post("/api/user/register", payloadRegis);
      if (resRegis.status !== 200) {
        const $errorRes = $(".regis-message-error");
        $errorRes.text();
        return;
      }
      // token & refreshTokens
      const token_bot = resRegis?.data?.token;
      const refreshTokens_bot = resRegis?.data?.refreshTokens;
      localStorage.setItem("token_bot", token_bot);
      localStorage.setItem("refreshTokens_bot", refreshTokens_bot);

      // Lưu thông tin vào dataBooking
      dataBooking.users[0].email = resRegis?.data?.email;
      dataBooking.users[0].phoneNumber = resRegis?.data?.phone;
      dataBooking.users[0].id = resRegis?.data?.id;
      // res chỉ trả về fullName
      dataBooking.users[0].firstName = valFirstRegis;
      dataBooking.users[0].lastName = valLastRegis;

      // close và hiển thị gia đình | guest
      // add thêm 1 thành viên rỗng nếu length dataBooking.users.length = 1
      const newU = {
        id: 2,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        gender: genderEnum.MALE,
        services: [],
        selectedDate: null,
        selectedTimeSlot: null,
        isSelecting: false,
        isChoosing: false,
      };
      if (dataBooking.users.length < 2) {
        dataBooking.users.push(newU);
      }
      closePopupContainerTemplate();

      alertCustom({
        type: "success",
        isNoti: true,
        notify: {
          title: "Đăng ký thành công!",
          position: "bottom-end",
          timer: 3000,
          toast: true,
          showConfirmButton: false,
        },
      });
    } catch (e) {
      console.error("[on.next-verify-register]", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      });
    }

    $(".wrap-input-guests").removeClass("hidden");
    updateGuestSection(dataBooking);
  });
  // back form policies
  $(document).on("click", ".btn-back-policies", function () {
    closePopupContainerTemplate();
    // clear time nếu có
  });
  // next form policies
  $(document).on("click", ".btn-next-policies", async function () {
    const dataBooking = templateStore.getState().dataBooking;

    const contentPaymentMethod = renderPaymentMethodsForm(
      dataBooking,
      colorPrimary
    );
    let height = 776;
    let width = 886;
    if (isMobile) {
      height = 676;
      width = "100%";
    }
    const html = renderBasePopup(contentPaymentMethod, false, height, width);
    $wrapHomeTemp.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });
  // add new card
  $(document).on("click", ".add-new-card-btn", function () {
    const htmlAddNewMethod = renderAddNewMethod(colorPrimary);
    const persistent = true;
    const html = renderBasePopup(htmlAddNewMethod, persistent, 900, 886);

    $wrapHomeTemp.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });
  // back: add new card
  $(document).on("click", ".btn-back-add-card", function () {
    let height = 776;
    let width = 886;
    if (isMobile) {
      height = 676;
      width = "100%";
    }
    const htmlPaymentMethod = renderPaymentMethodsForm(
      dataBooking,
      colorPrimary
    );
    const html = renderBasePopup(htmlPaymentMethod, false, height, width);

    $wrapHomeTemp.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
    // settime close form
  });
  // back select payment
  $(document).on("click", ".btn-back-payment", function () {
    const policySetting = templateStore.getState().policySetting;

    const htmlPoliciesForm = renderPoliciesForm(policySetting, colorPrimary);
    let height = 768;
    let width = 886;
    if (isMobile) {
      height = 700;
      width = "100%";
    }
    const persistent = true;
    const html = renderBasePopup(htmlPoliciesForm, persistent, height, width);

    $wrapHomeTemp.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
    // settime close
  });
  // Confirm payment final
  $(document).on("click", ".btn-next-payment", async function () {
    const $btn = $(this);
    // tránh bấm nhiều lần
    if ($btn.hasClass("loading")) return;

    // set trạng thái loading
    $btn.addClass("loading").prop("disabled", true);

    // thêm loader (nếu chưa có)
    if ($btn.find(".btn-loader").length === 0) {
      $btn.prepend('<span class="btn-loader"></span>');
    }
    const dataBooking = templateStore.getState().dataBooking;
    // Chọn thẻ
    const cardChoosing = dataBooking.cardNumber.find((card) => card.isChoosing);
    const userChoosing = dataBooking.users[0];

    const rcpCustomer = userChoosing.rcpCustomer;
    const appointmentID = 0;
    const customerID = userChoosing.id;
    const cardAuthorize = cardChoosing.cardAuthorize;
    const totalAmount = dataBooking.totalAmount || 0;
    const rcvNo = templateStore.getState().RVCNo;
    const typeAuth = 1;
    const idCard = cardChoosing.id;
    let dataAddDeposit;
    try {
      const urlAddDeposit = `/api/card/adddeposit
        ?RCPCustomer=${rcpCustomer}&AppointmentID=${appointmentID}
        &CustomerID=${customerID}&AuthorizeCardID=${cardAuthorize}
        &Amount=${totalAmount}&RVCNo=${rcvNo}&TypeAuthorize=${typeAuth}&ID=${idCard}`.replace(
        /\s+/g,
        ""
      );

      dataAddDeposit = await fetchAPI.get(urlAddDeposit);
    } catch (e) {
      console.error("[on.btn-next-payment]", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      });
    }
    // book now
    const list_appointmentSubject = new Set();
    dataBooking.users.forEach((user) => {
      user.services.forEach((service) => {
        service.itemService.forEach((item) => {
          list_appointmentSubject.add(item.title);
        });
      });
    });
    const result_list_appointmentSubject = Array.from(
      list_appointmentSubject
    ).join(", ");

    const serviceDateTimeSet = new Set();

    dataBooking.users.forEach((user) => {
      user.services.forEach((service) => {
        service.itemService.forEach((item) => {
          const staff = item.selectedStaff;
          if (staff && staff.selectedDate && staff.selectedTimeSlot) {
            let timeStr = staff.selectedTimeSlot.trim();
            if (timeStr.endsWith("AM") || timeStr.endsWith("PM")) {
              timeStr.slice(-2); // "AM" hoặc "PM"
              timeStr = timeStr.slice(0, -2); // "08:20"
            }
            // Ghép lại thành "MM-DD-YYYY HH:mm:ss"
            const dateTime = `${formatDateMMDDYYYY(
              staff.selectedDate
            )} ${timeStr}:00`;

            // Thêm vào Set để loại bỏ trùng lặp
            serviceDateTimeSet.add(dateTime);
          }
        });
      });
    });

    const uniqueSelectedDates = Array.from(serviceDateTimeSet);
    //Lấy mốc thời gian start là mốc nhỏ nhất,  dùng cho cả ServiceDate và StartTime
    // Chuyển về đối tượng Date để so sánh
    const parsedDates = uniqueSelectedDates.map((dt) => new Date(dt));
    // Tìm mốc nhỏ nhất
    const minDate = new Date(Math.min(...parsedDates));
    // Format lại (MM/DD/YYYY HH:mm:ss)
    const minDateStr = `${formatDateMMDDYYYY(minDate)} ${String(
      minDate.getHours()
    ).padStart(2, "0")}:${String(minDate.getMinutes()).padStart(2, "0")}:00`;

    // EndTime
    function buildUserEndTimes(dataBooking) {
      const results = [];

      dataBooking.users.forEach((user) => {
        let earliestStart = null;
        let totalDuration = 0;

        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            const staff = item.selectedStaff;
            if (!staff?.selectedDate || !staff?.selectedTimeSlot) return;

            // Parse ngày
            const [month, day, year] = formatDateMMDDYYYY(
              staff.selectedDate
            ).split("/");

            // Parse giờ
            let timeStr = staff.selectedTimeSlot.trim();
            if (timeStr.endsWith("AM") || timeStr.endsWith("PM")) {
              timeStr = timeStr.slice(0, -2); // bỏ AM/PM
            }
            let [hour, minute] = timeStr.split(":");

            const start = new Date(
              parseInt(year),
              parseInt(month) - 1,
              parseInt(day),
              parseInt(hour),
              parseInt(minute),
              0
            );

            // Lấy start nhỏ nhất
            if (!earliestStart || start < earliestStart) {
              earliestStart = start;
            }

            // Cộng duration
            let itemDuration = item.duration || 0;
            if (item.optionals?.length > 0) {
              itemDuration += item.optionals.reduce(
                (sum, opt) => sum + (opt.timedura || 0),
                0
              );
            }
            totalDuration += itemDuration;
          });
        });

        if (earliestStart) {
          const end = new Date(earliestStart.getTime() + totalDuration * 60000);

          const formatted = `${String(end.getMonth() + 1).padStart(
            2,
            "0"
          )}/${String(end.getDate()).padStart(
            2,
            "0"
          )}/${end.getFullYear()} ${String(end.getHours()).padStart(
            2,
            "0"
          )}:${String(end.getMinutes()).padStart(2, "0")}:${String(
            end.getSeconds()
          ).padStart(2, "0")}`;

          results.push(formatted);
        }
      });

      return results;
    }

    const endTimes = buildUserEndTimes(dataBooking);

    // nickName thợ
    const uniqueNicknames = new Set();
    dataBooking.users.forEach((user) => {
      user.services.forEach((service) => {
        service.itemService.forEach((item) => {
          if (item.selectedStaff && item.selectedStaff.nickName) {
            uniqueNicknames.add(item.selectedStaff.nickName);
          }
        });
      });
    });

    const staffNickNames = Array.from(uniqueNicknames);

    // list id thợ
    const uniqueEmployeeID = new Set();
    dataBooking.users.forEach((user) => {
      user.services.forEach((service) => {
        service.itemService.forEach((item) => {
          if (item.selectedStaff && item.selectedStaff.employeeID) {
            uniqueEmployeeID.add(item.selectedStaff.employeeID);
          }
        });
      });
    });

    const listUniqueEmID = Array.from(uniqueEmployeeID);

    // Tổng duration book
    function calcTotalDuration(dataBooking) {
      let totalDuration = 0;

      dataBooking.users.forEach((user) => {
        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            // thời lượng chính của service
            let itemDuration = item.duration || 0;

            // cộng thêm các optional (nếu có)
            if (item.optionals && item.optionals.length > 0) {
              item.optionals.forEach((opt) => {
                itemDuration += opt.timedura || 0;
              });
            }

            totalDuration += itemDuration;
          });
        });
      });

      return totalDuration;
    }

    const totalTimeDuration = calcTotalDuration(dataBooking);
    // help calc end time
    function calcEndTime(startDateTime, duration) {
      const [date, time] = startDateTime.split(" ");
      // tách bằng cả "/" và "-"
      const [month, day, year] = date.includes("/")
        ? date.split("/").map(Number)
        : date.split("-").map(Number);

      const [h, m, s] = time.split(":").map(Number);

      const dt = new Date(year, month - 1, day, h, m, s || 0);
      dt.setMinutes(dt.getMinutes() + duration);

      const MM = String(dt.getMonth() + 1).padStart(2, "0");
      const DD = String(dt.getDate()).padStart(2, "0");
      const YYYY = dt.getFullYear();
      const HH = String(dt.getHours()).padStart(2, "0");
      const mm = String(dt.getMinutes()).padStart(2, "0");
      const SS = String(dt.getSeconds()).padStart(2, "0");

      return `${MM}-${DD}-${YYYY} ${HH}:${mm}:${SS}`;
    }

    function buildItemList(dataBooking) {
      let index = 0;
      const listItemDetail = [];

      dataBooking.users.forEach((user) => {
        user.services.forEach((service) => {
          let prevEndTime = null; // mốc giờ kết thúc trước đó

          service.itemService.forEach((itemService, idx) => {
            const staff = itemService.selectedStaff;

            // Tổng price + duration (kể cả optional)
            let totalPrice = parseFloat(itemService.price) || 0;
            let totalDuration = parseInt(itemService.duration) || 0;

            if (itemService.optionals && Array.isArray(itemService.optionals)) {
              itemService.optionals.forEach((opt) => {
                totalPrice += parseFloat(opt.price) || 0;
                totalDuration += parseInt(opt.timeDuration) || 0;
              });
            }

            let startTime;
            if (prevEndTime) {
              // Nếu đã có endTime trước -> start = end trước
              startTime = prevEndTime;
            } else {
              // Item đầu tiên thì lấy từ staff.selectedTimeSlot
              let timeStr = staff.selectedTimeSlot.trim();
              if (timeStr.endsWith("AM") || timeStr.endsWith("PM")) {
                timeStr = timeStr.slice(0, -2); // bỏ AM/PM
              }

              startTime = `${formatDateMMDDYYYY(
                staff.selectedDate
              )} ${timeStr}:00`;
            }

            const endTime = calcEndTime(startTime, totalDuration);
            prevEndTime = endTime; // cập nhật cho item sau

            listItemDetail.push({
              Index: index++,
              ParentAddon: -1,
              ItemID: itemService.idItemService,
              ItemName: itemService.title,
              ItemPrice: totalPrice.toFixed(2),
              Duration: totalDuration,
              EmployeeID: staff.employeeID,
              EmployeeName: staff.nickName,
              Type: 1,
              IsCategory: 0,
              IsRequestTech: 1,
              StartTime: startTime,
              EndTime: endTime,
              DurationItem: totalDuration,
              IsChangeTime: 0,
              ProductCharge: 0,
              Turn: 0,
              Comission: 0,
              IDCombo: 0,
              AddonId: 0,
            });
          });
        });
      });

      return listItemDetail;
    }

    // item detail
    const listItemDetail = buildItemList(dataBooking);

    const bookXLM = {
      Appointment: {
        AppointmentID: "0",
        CustomerID: userChoosing.id,
        CustomerName: userChoosing.firstName + userChoosing.lastName,
        CustomerPhone: userChoosing.phoneNumber.slice(1),
        AppointmentSubject: result_list_appointmentSubject,
        ServiceDate: minDateStr,
        StartTime: minDateStr,
        EndTime: endTimes,
        AppointmentStatusID: "1",
        EmployeeID: listUniqueEmID,
        GroupEmployeeName: staffNickNames,
        AptComment: "",
        TotalAmount: dataBooking.totalAmount,
        DepositAmount: dataBooking.paymentDeposit,
        CrearteBy: "0",
        IsBookOnline: "1",
        IsConfirmOB: "0",
        BarcodeTicket: "",
        TotalDuration: totalTimeDuration,
        IDParty: "0",
        IsStartAllSameTime: "0",
        ApptIndex: "0",
        Detail: {
          ApptIndex: "0",
          Item: listItemDetail,
        },
      },
    };
    // Dùng cho bookXLM
    const xmlString = jsonToXml(bookXLM, "root");
    const payloadBookXLM = {
      RVCNo: templateStore.getState().RVCNo,
      xml: xmlString,
      isConfirm: "0",
      CustomerID: userChoosing.id.toString(),
    };

    // book now
    let dataBookXLM;
    try {
      dataBookXLM = await fetchAPI.post(
        "/api/appointment/bookAptXML",
        payloadBookXLM
      );
    } catch (e) {
      console.error("[dataBookXLM]", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      });
    } finally {
      // bỏ loading
      $btn.removeClass("loading").prop("disabled", false);
      $btn.find(".btn-loader").remove(); // xoá loader
    }
    if (dataBookXLM.appointmentID) {
      // send manualNotify
      const RVCNo = templateStore.getState().RVCNo;
      const keyOnline = "OnlineBookingConfirm";
      const keyTech = "OB.NotifyTech";
      const type = "sms";
      const appointmentID = dataBookXLM.appointmentID;

      let resManualNotiOnline;
      try {
        resManualNotiOnline = await fetchAPI.get(
          `/api/appointment/SendManualNotify?RVCNo=${RVCNo}&key=${keyOnline}&type=${type}&appointmentID=${appointmentID}`
        );
      } catch (e) {
        console.error("[resManualNotiOnline]", {
          message: e.message,
          stack: e.stack,
          name: e.name,
        });
      }
      if (resManualNotiOnline.status !== 200) return;

      let resManualNotiTech;
      try {
        resManualNotiTech = await fetchAPI.get(
          `/api/appointment/SendManualNotify?RVCNo=${RVCNo}&key=${keyTech}&type=${type}&appointmentID=${appointmentID}`
        );
      } catch (e) {
        console.error("[resManualNotiTech]", {
          message: e.message,
          stack: e.stack,
          name: e.name,
        });
      }
      if (resManualNotiTech.status !== 200) return;

      // add log deposit

      // invoke hub
      // const dataInvokeHub = await
    } else {
      console.log("Not res appointmentID");
    }
    const findCardChoosing = dataBooking.cardNumber.find((c) => c.isChoosing);
    const dataBill = {
      image: "/assets/images/payment-success/img-succes-payment.png",
      ticketNumber: dataBookXLM.appointmentID,
      dateTime: dataBookXLM.bookedDate,
      paymentMethodLabel: findCardChoosing.cardType,
      paymentMethodMasked: maskCardNumber(findCardChoosing.last4),
      deposit: dataBooking.paymentDeposit,
      remaining:
        dataBooking.totalAmount - parseFloat(dataBooking.paymentDeposit),
      requestAnotherCount: 5,
      currencyDeposit: dataBooking.currencyDeposit,
    };

    const contentSuccessPayment = renderPaymentConfirmationForm(
      dataBill,
      colorPrimary
    );
    let height = 976;
    let width = 886;
    if (isMobile) {
      height = 676;
      width = "100%";
    }
    const html = renderBasePopup(contentSuccessPayment, false, height, width);

    $wrapHomeTemp.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);

    // start animation 5 vòng (fake 5s)
    setTimeout(() => {
      startConfirmAnimation(1, {
        selector: ".wrap-popup-payment-confirmation .check-circle",
        buttonSelector: ".wrap-popup-payment-confirmation .btn-request-another",
      });
    }, 50);
  });
  // Chọn thẻ thanh toán
  $(document).on("click", ".payment-method-item", function () {
    const dataBooking = templateStore.getState().dataBooking;

    const $this = $(this);
    $(".payment-method-item").removeClass("selected");

    $this.addClass("selected");
    const idCard = $this.data("id");
    let cardChoosing = {};
    dataBooking.cardNumber.forEach((item) => {
      if (item.id == idCard) {
        item.isChoosing = true;
        cardChoosing = item;
      }
    });
    templateStore.setState({ dataBooking });
    // bật nút Confirm
    $(".btn-next-payment").prop("disabled", false);
  });
  // Sự kiện trên popup register
  // Kiểm tra và disable btn verify form register
  $(document).on(
    "input",
    "#firstname-register, #lastname-register, #email-register, #phone-register",
    function () {
      const $this = $(this);
      const val = $this.val().trim();
      if (val) {
        clearInputError($this);
      }

      // verify button next :(Verify)
      let allFilled =
        $("#firstname-register").val().trim() &&
        $("#lastname-register").val().trim();

      if ($this.attr("id") === "email-register") {
        const valid = isValidEmail(val);

        if ($this.data("type") === typeRequire.REQUIRED) {
          allFilled = allFilled && val;
        }

        // --- update phone required/not required ---
        const $phone = $("#phone-register");
        const $labelPhone = $(".form-input-phone label p");

        if (valid && val !== "") {
          // Email hợp lệ -> Phone không bắt buộc
          $phone.attr("data-type", typeRequire.NOTREQUIRED);
          $labelPhone.text("");
        } else {
          // Email rỗng/không hợp lệ -> Phone bắt buộc
          $phone.attr("data-type", typeRequire.REQUIRED);
          $labelPhone.text("*");
        }
      }
      if ($this.attr("id") === "phone-register") {
        const $this = $(this);

        let phoneVal = $this.val().trim();
        const isRequired = $this.data("type") === typeRequire.REQUIRED;
        const phoneDigits = phoneVal.replace(/\D/g, "");

        let valid = true;

        // Check nếu là phone đủ 10 số
        if (phoneDigits.length === 10 && /^\d+$/.test(phoneDigits)) {
          phoneVal = formatPhoneNumber(phoneDigits);
          $this.val(phoneVal);
          valid = isValidPhoneNumber(phoneVal);
        } else {
          // Nếu đang ở dạng đã format mà không còn đủ 10 số → gỡ format
          if (
            phoneVal.includes("(") ||
            phoneVal.includes(")") ||
            phoneVal.includes("-")
          ) {
            if (phoneDigits.length !== 10) {
              phoneVal = phoneDigits;
              $this.val(phoneVal);
            }
          }
          valid = isValidPhoneNumber(phoneVal);
        }
        if (phoneVal === "" && !isRequired) {
          clearInputError($this);
        } else if (!valid) {
          showInputError($this, "Phone is incorrect format");
        } else {
          clearInputError($this);
        }

        if ($this.data("type") === typeRequire.REQUIRED) {
          const valPhone = $this.val().trim();
          allFilled = allFilled && valPhone;
        }

        // --- update email required/not required ---
        const $email = $("#email-register");
        const $labelEmail = $(".form-input-email label p");

        if (valid && phoneVal !== "") {
          // Phone hợp lệ -> Email không bắt buộc
          $email.attr("data-type", typeRequire.NOTREQUIRED);
          $labelEmail.text("");
        } else {
          // Phone rỗng/không hợp lệ -> Email bắt buộc
          $email.attr("data-type", typeRequire.REQUIRED);
          $labelEmail.text("*");
        }
      }

      $(".btn-next-verify-register").prop("disabled", !allFilled);
    }
  );
  // blur #firsname-register, #lastname-register,
  $(document).on(
    "blur",
    "#firstname-register, #lastname-register",
    function () {
      const $input = $(this);
      const id = $input.attr("id");
      const val = $input.val().trim();
      const nameMap = {
        "firstname-register": "First Name",
        "lastname-register": "Last Name",
      };

      const fieldName = nameMap[id] || "This field";

      if (!val) {
        showInputError($input, `${fieldName} is required`, true);
        return;
      }

      // Nếu hợp lệ => xóa lỗi
      clearInputError($input);
    }
  );
  // blur #phone-register
  $(document).on("blur", "#phone-register", function () {
    const $this = $(this);
    const isRequired = $this.data("type");
    if (isRequired === typeRequire.REQUIRED) {
      validatePhoneFormRegister($this);
    }
    // nếu val = '', clear error, néu có val vẫn valid format
    if ($this.val() === "" && isRequired === typeRequire.NOTREQUIRED) {
      clearInputError($this);
    } else {
      validatePhoneFormRegister($this);
    }
  });
  // blur #email-register
  $(document).on("blur", "#email-register", function () {
    const $this = $(this);
    const isRequired = $this.data("type");
    if (isRequired === typeRequire.REQUIRED) {
      validateEmailFormRegister($this);
    }
    // nếu val = '', clear error, néu có val vẫn valid format
    if ($this.val() === "" && isRequired === typeRequire.NOTREQUIRED) {
      clearInputError($this);
    } else {
      validateEmailFormRegister($this);
    }
  });
  // Sự kiện mở form phương thức thanh toán
  $(document).on("click", ".btn-open-payment", function () {
    const htmlPaymentMethod = renderPaymentMethodsForm(
      dataBooking,
      colorPrimary
    );
    let height = 776;
    let width = 886;
    if (isMobile) {
      height = 676;
      width = "100%";
    }
    const html = renderBasePopup(htmlPaymentMethod, false, height, width);
    $wrapHomeTemp.append(html);
    setTimeout(() => $(".overlay-screen").addClass("show"), 10);
  });

  // Chuyển sang form thêm thẻ mới
  $(document).on("click", ".btn-add-new-card", function () {
    const htmlAddNewCardForm = renderAddNewCardForm();
    const html = renderBasePopup(htmlAddNewCardForm, false, 762, 886);
    $wrapHomeTemp.html(html); // thay nội dung popup
    setTimeout(() => $(".overlay-screen").addClass("show"), 10);
  });

  // Lưu thẻ mới và quay lại form phương thức thanh toán
  $(document).on("click", ".btn-save-card", function () {
    // Render lại form chọn phương thức với thẻ mới tick sẵn
    const htmlPaymentMethod = renderPaymentMethodsForm(
      dataBooking,
      colorPrimary
    );
    let height = 776;
    let width = 886;
    if (isMobile) {
      height = 676;
      width = "100%";
    }
    const html = renderBasePopup(htmlPaymentMethod, false, height, width);
    $wrapHomeTemp.html(html);
    setTimeout(() => $(".overlay-screen").addClass("show"), 10);
  });

  // Xác nhận phương thức và mở form xác nhận thanh toán
  $(document).on("click", ".btn-confirm-payment-method", function () {
    // Lấy dữ liệu thanh toán đã chọn (demo)
    const paymentInfo = {
      ticketType: "VIP Ticket",
      date: "Aug 20, 2025",
      time: "10:30 AM",
      method: "Visa **** 1234",
      deposit: "$50",
      remaining: "$150",
    };
    const htmlPaymentConfirm = renderPaymentConfirmationForm(
      paymentInfo,
      colorPrimary
    );
    let height = 976;
    let width = 886;
    if (isMobile) {
      height = 676;
      width = "100%";
    }
    const html = renderBasePopup(htmlPaymentConfirm, false, height, width);
    $wrapHomeTemp.html(html);
    setTimeout(() => $(".overlay-screen").addClass("show"), 10);
  });

  // Xác nhận cuối cùng
  $(document).on("click", ".btn-final-confirm", function () {
    alert("Thanh toán thành công!");
    $(".overlay-screen").removeClass("show");
  });

  // Xử lý upload hình ảnh
  // Mở popup upload hình ảnh
  let userSelectedUpload;
  $(document).on("click", ".btn-upload-image", function () {
    const $this = $(this);
    userSelectedUpload = $this.closest(".item-sumary").data("id");
    const findUser = dataBooking.users.find(
      (item) => item.id == userSelectedUpload
    );

    const dataImages = findUser.images ? findUser.images : {};
    const popUpload = renderPopupUpload(dataImages, colorPrimary, isMobile);

    let width = 800;
    let height = 810;
    if (isMobile) {
      height = 600;
      width = "100%";
    }
    const html = renderBasePopup(popUpload, false, height, width);

    $wrapHomeTemp.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });
  //
  function handleImageFile($coverInput, file) {
    const $label = $coverInput.find(".upload-box");
    const $errorMsg = $label.find(".error-msg");
    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
    ];

    // Reset lỗi
    $label.removeClass("error");
    $errorMsg.hide();

    if (!validTypes.includes(file.type)) {
      $label.addClass("error");
      $errorMsg.show();
      return;
    }

    // Hiển thị ảnh preview
    const reader = new FileReader();
    reader.onload = function (e) {
      $label.find("img.preview").attr("src", e.target.result).show();
      $label.find("i, .text").hide();

      // Nếu chưa có nút .btn-action-img thì thêm vào
      if ($coverInput.find(".btn-action-img").length === 0) {
        $coverInput.append(`
              <div class="btn-action-img">
                <button class="remove-img">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            `);
      } else {
        $coverInput.find(".btn-action-img").show();
      }
    };
    reader.readAsDataURL(file);
  }
  //Onchange hình ảnh
  $(document).on("change", '.upload-box input[type="file"]', function (e) {
    const file = e.target.files[0];
    if (file) {
      const $coverInput = $(this).closest(".cover-input-img");
      handleImageFile($coverInput, file);
    }
  });
  // Ngăn hành vi mặc định khi kéo–thả vào document
  $(document).on("dragover drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
  // Drag over – highlight ô upload
  $(document).on("dragover", ".upload-box", function (e) {
    e.preventDefault();
    $(this).addClass("drag-over");
  });

  // Drag leave – bỏ highlight
  $(document).on("dragleave", ".upload-box", function (e) {
    e.preventDefault();
    $(this).removeClass("drag-over");
  });

  // Drop file vào
  $(document).on("drop", ".upload-box", function (e) {
    e.preventDefault();
    const file = e.originalEvent.dataTransfer.files[0];
    if (file) {
      const $coverInput = $(this).closest(".cover-input-img");
      handleImageFile($coverInput, file);
    }
    $(this).removeClass("drag-over");
  });

  // remove image
  $(document).on("click", ".remove-img", function () {
    const $cover = $(this).closest(".cover-input-img");
    const $label = $cover.find(".upload-box");

    $label.find('input[type="file"]').val("");
    $label.find("img.preview").hide().attr("src", "");
    $label.find("i, .text").show();
    $label.removeClass("error");
    $label.find(".error-msg").hide();

    const $btnActionImg = $(this).closest(".btn-action-img");
    $btnActionImg.hide();
  });

  // edit image
  $(document).on("click", ".edit-img", function () {
    const $cover = $(this).closest(".cover-input-img");
    const $input = $cover.find('.upload-box input[type="file"]');

    $input.trigger("click"); // chọn lại ảnh
  });
  // cancel
  $(document).on("click", ".cancel-upload", function () {
    closePopupContainerTemplate();
  });
  // save imag
  $(document).on("click", ".save-upload", function () {
    const $this = $(this);
    const images = [];

    $(".cover-input-img .upload-box img.preview").each(function () {
      const base64Img = $(this).attr("src");
      if (base64Img) {
        images.push({
          id: Date.now() + Math.random(), // ID tạm để đảm bảo duy nhất
          link: base64Img,
        });
      }
    });

    // id của user upload image userSelectedUpload
    const user = dataBooking.users.find((u) => u.id == userSelectedUpload);

    if (!user) return;

    if (!Array.isArray(user.images)) user.images = [];
    // clear ảnh cũ
    user.images = [];
    user.images.push(...images);
    closePopupContainerTemplate();

    // render lại sumary cập nhật ảnh
    renderSumary(dataBooking, listDataService);
  });
  // Các sự kiện trên sumary
  // delete/edit service
  // function delete service
  const handleDeleteService = (idUser) => {
    $(`.guest-input[data-id="${idUser}"]`).find(".btn-remove").trigger("click");
  };
  // function delete item service
  const handleDeleteItemService = async (idUser, idService, idItemService) => {
    const user = dataBooking.users.find((u) => u.id == idUser);
    if (!user) return;

    const serviceIndex = user.services.findIndex(
      (se) => se.idService == idService
    );
    if (serviceIndex === -1) return;

    const service = user.services[serviceIndex];

    service.itemService = service.itemService.filter(
      (is) => is.idItemService != idItemService
    );

    if (service.itemService.length === 0) {
      user.services.splice(serviceIndex, 1);
    }

    const userChoosing = dataBooking.users.find((user) => user.isChoosing);
    renderListService(listDataService, ".list-more", dataBooking);
    // re-render sumary
    renderSumary(dataBooking, listDataService);
  };
  // Delete service
  $(document).on("click", ".delete-sumary", function () {
    const $this = $(this);
    const idUser = $this.closest(".item-sumary").data("id");
    const nameUser = $this
      .closest(".item-sumary")
      .find(".user-book h2")
      .text()
      .trim();
    const title = `Xoá dịch vụ đã chọn của ${nameUser}?`;
    const content = ``;
    let width = 560;
    let height = 320;
    if (isMobile) {
      height = 292;
      width = "100%";
    }

    const htmlPopupNotify = renderContentNotify(title, content, () =>
      handleDeleteService(idUser)
    );
    const html = renderBasePopup(htmlPopupNotify, false, height, width);

    $wrapHomeTemp.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });
  // Delete item service
  $(document).on("click", ".delete-item-ser", function () {
    const $this = $(this);

    const idUser = $this.closest(".item-sumary").data("id");
    const idService = $this.closest(".wrap-item-content").data("id");
    const idItemService = $this.closest(".wrap-item-content").data("id-item");

    const $pWrap = $this.closest(".p-wrap");
    const nameService = $pWrap.find(".text-name-service").text().trim();
    const title = `Xoá dịch vụ ${nameService} ?`;
    const content = ``;
    let width = 560;
    let height = 320;
    if (isMobile) {
      height = 292;
      width = "100%";
    }
    const htmlPopupNotify = renderContentNotify(title, content, () =>
      handleDeleteItemService(idUser, idService, idItemService)
    );
    const html = renderBasePopup(htmlPopupNotify, false, height, width);

    $wrapHomeTemp.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });

  // START: Xử lý option trên banner

  $(document).on("click", "#prev", function () {
    const dataBooking = templateStore.getState().dataBooking;
    const RVCNo = templateStore.getState().RVCNo;

    if (currentMonth > 0) {
      currentMonth--;
      selectedDate = new Date(currentYear, currentMonth, currentDate.getDate());

      updateCalendarData(currentMonth, currentYear, RVCNo, daysOffNail, () => {
        renderCalendar(
          monthNames,
          dayNames,
          currentMonth,
          currentYear,
          daysOffNail,
          selectedDate,
          dataBooking
        );
        // update store
        templateStore.setState({ dataBooking });
      });
    }
  });

  $(document).on("click", "#next", function () {
    const dataBooking = templateStore.getState().dataBooking;
    const RVCNo = templateStore.getState().RVCNo;

    if (currentMonth < 11) {
      currentMonth++;
      selectedDate = new Date(currentYear, currentMonth, currentDate.getDate());

      updateCalendarData(currentMonth, currentYear, RVCNo, daysOffNail, () => {
        renderCalendar(
          monthNames,
          dayNames,
          currentMonth,
          currentYear,
          daysOffNail,
          selectedDate,
          dataBooking
        );
        // update store
        templateStore.setState({ dataBooking });
      });
    }
  });
  // === START: VALID SESSION CREDIT
  function validateField($input, showError = true) {
    const id = $input.attr("id");
    const value = $input.val().trim();
    let valid = true;

    switch (id) {
      case "card-holder-name":
        if (!value) {
          if (showError) showInputError($input, "Card holder is required");
          valid = false;
        } else {
          clearInputError($input);
        }
        break;

      case "card-number":
        if (!isValidCardNumber(value)) {
          if (showError) showInputError($input, "Invalid card number");
          valid = false;
        } else {
          clearInputError($input);
        }
        break;

      case "card-expiry":
        if (!isValidExpiryDate(value)) {
          if (showError) showInputError($input, "Invalid expiry date");
          valid = false;
        } else {
          clearInputError($input);
        }
        break;

      case "card-cvv":
        if (!isValidCVV(value)) {
          if (showError) showInputError($input, "Invalid CVV");
          valid = false;
        } else {
          clearInputError($input);
        }
        break;

      case "billing-address":
        if (!value) {
          if (showError) showInputError($input, "Billing address is required");
          valid = false;
        } else {
          clearInputError($input);
        }
        break;
    }

    return valid;
  }

  function checkAllFormAddCard() {
    let isValid = true;
    $("#form-add-card input").each(function () {
      if (!validateField($(this), false)) {
        isValid = false;
      }
    });

    const $btnAdd = $("#form-add-card .btn-add-card");
    if (isValid) {
      $btnAdd.prop("disabled", false).removeClass("disabled");
    } else {
      $btnAdd.prop("disabled", true).addClass("disabled");
    }
  }
  // Check từng field khi blur
  $(document).on("blur", "#form-add-card input", function () {
    validateField($(this), true);
    checkAllFormAddCard();
  });

  // Check toàn bộ khi input change
  $(document).on("input change", "#form-add-card input", function () {
    const $this = $(this);
    if ($this.attr("id") === "card-number") {
      $this.val(formatCardNumber($this.val()));
    }
    if ($this.attr("id") === "card-expiry") {
      $this.val(formatExpiryDate($this.val())); // auto format expiry date
    }
    checkAllFormAddCard();
  });

  // Helper: lấy value theo id
  function getVal($wrap, selector) {
    return $wrap.find(selector).val().trim();
  }
  async function fillNewCard($wrapFormAddCard, dataBooking) {
    // map key trong object <=> id trong form
    const fieldMap = {
      cardHolderName: "#card-holder-name",
      cardNumber: "#card-number",
      mmyy: "#card-expiry",
      ccv2: "#card-cvv",
      billingAddress: "#billing-address",
      street: "#card-street",
      city: "#card-city",
      state: "#card-state",
      zip: "#card-zip",
    };

    let newCard = {};

    // gán giá trị cho newCard theo mapping
    Object.entries(fieldMap).forEach(([key, selector]) => {
      newCard[key] = getVal($wrapFormAddCard, selector);
    });

    const mmyy = newCard.mmyy || ""; // dạng "12/34"
    let expiryMonth = "";
    let expiryYear = "";

    if (mmyy.includes("/")) {
      const [mm, yy] = mmyy.split("/");
      expiryMonth = mm.trim();
      expiryYear = yy.trim();
    }

    const owner = dataBooking.users[0];
    const phoneNumberOwner = owner.phoneNumber;
    const emailOwner = owner.email;
    const customerID = owner.id;
    const rcpCustomer = owner.rcpCustomer;

    // add new card
    const payloadNewCard = {
      // Card info
      number: unformatCardNumber(newCard.cardNumber),
      expiryMonth: expiryMonth,
      expiryYear: expiryYear,
      cvv: newCard.ccv2,
      isDefault: true,
      magstripe: "",
      code: "",

      // Holder info
      firstName: newCard.cardHolderName,
      lastName: newCard.cardHolderName,
      name: "",
      alias: "",

      // Contact
      phoneNumber: phoneNumberOwner,
      email: emailOwner,
      company: "",
      faxNumber: "",

      // Billing address
      address: newCard.billingAddress,
      avsStreet: newCard.billingAddress,
      avsZip: "",
      city: newCard.city,
      state: newCard.state,
      zip: newCard.zip,
      country: "",
    };
    try {
      const url = `/api/card/createcardcustomer?RCPCustomer=${rcpCustomer}&CustomerID=${customerID}&RVCNo=${RVCNo}&TypeAuthorize=1`;
      await fetchAPI.post(url, payloadNewCard);
    } catch (e) {
      console.error("[fillNewCard - add new card]", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      });
    }
    // get list card authorized
    try {
      const listCardAuthorized = await fetchAPI.post(
        `/api/card/getlistcardauthorize?RCPCustomer=${rcpCustomer}&CustomerID=${customerID}&RVCNo=${RVCNo}&TypeAuthorize=1`
      );

      if (listCardAuthorized.data) {
        const newDataBooking = {
          ...dataBooking,
          cardNumber: listCardAuthorized.data,
        };

        templateStore.setState({ dataBooking: newDataBooking });

        setTimeout(() => {
          const currentBooking = templateStore.getState().dataBooking;
          console.log("newDataBooking: ", currentBooking);

          const contentPaymentMethod = renderPaymentMethodsForm(
            currentBooking,
            colorPrimary
          );

          let height = 776;
          let width = 886;
          if (isMobile) {
            height = 676;
            width = "100%";
          }

          const html = renderBasePopup(
            contentPaymentMethod,
            false,
            height,
            width
          );
          $wrapHomeTemp.append(html);

          setTimeout(() => {
            $(".overlay-screen").addClass("show");
          }, 10);
        }, 0);
      }
    } catch (e) {
      console.error("[fillNewCard - get list card]", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      });
    }
  }
  $(document).on("click", ".btn-add-card", async function () {
    const dataBooking = templateStore.getState().dataBooking;
    const $this = $(this);
    const $wrapFormAddCard = $this.closest(".wrap-popup-add-card");
    const $inputs = $wrapFormAddCard.find("input");

    let isValid = true;
    $inputs.each(function () {
      if (!validateField($(this), true)) {
        isValid = false;
        shakeError($(this));
      }
    });

    if (!isValid) {
      return; // stop add card
    }

    fillNewCard($wrapFormAddCard, dataBooking);

    // to-do : valid các input
  });

  // === END: VALID SESSION CREDIT

  // toggle copy same time
  $(document).on("change", "#select-banner-pm", function () {
    const $this = $(this);
    isCopySameTime = $this.prop("checked");
  });

  // START: confirm booking
  $(document).on("click", ".btn-confirm-booking", function () {
    const dataBooking = templateStore.getState().dataBooking;
    const RVCNo = templateStore.getState().RVCNo;
    const htmlVerifyEmailPhone = renderVerifyEmailPhoneContent(
      "",
      colorPrimary
    );
    let height = 620;
    let width = 560;
    if (isMobile) {
      height = 620;
      width = "100%";
    }
    // const persistent = true;
    const html = renderBasePopup(htmlVerifyEmailPhone, false, height, width);
    $wrapHomeTemp.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });

  // lần đầu load: fetch ngày nghỉ của tháng hiện tại
  updateCalendarData(currentMonth, currentYear, RVCNo, daysOffNail, () => {
    renderCalendar(
      monthNames,
      dayNames,
      currentMonth,
      currentYear,
      daysOffNail,
      selectedDate,
      dataBooking
    );
  });

  // confirm booking
  renderSumary(dataBooking, listDataService);

  $(document).on("click", ".edit-sumary", function () {
    const $this = $(this);

    const $container = $(".wrap-home-templates");
    const $target = $("#section-service");

    // Kiểm tra tab hiện tại có chọn đầy đủ service, time-slot chưa
    const idUserEdit = $this.closest(".item-sumary").data("id");
    const userCur = dataBooking.users.find((u) => u.isChoosing);

    const isFinalBooking = showScrollToFinalBooking(userCur);
    if (isFinalBooking) {
      const isShowScrollTarget = showScrollToTarget(dataBooking);
      if (isShowScrollTarget && $(".scroll-btn-main").is(":visible")) {
        shakeError($(".scroll-btn-main"));
      }
    }
    // Sau khi kiểm tra focus tab edit
    $(`.input-fullname[data-id=${idUserEdit}]`).focus();
    // Và scroll lên
    scrollToElementInContainer($container, $target, -250, 500);
  });

  function isInViewport($el) {
    if (!$el || !$el.length) return false;
    const rect = $el[0].getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  // Lắng nghe scroll container
  $(".wrap-home-templates").on("scroll", function () {
    const dataBooking = templateStore.getState().dataBooking;
    if (forceShowScrollBtn) return;

    const $trigger = $($mainScrollBtn.data("triggerBanner"));
    const $triggerSum = $("#triggerBlockSumary");
    const isFinalBooking = showScrollToFinalBooking(dataBooking);
    if (isInViewport($trigger) && !isFinalBooking) {
      const isSeTi = showScrollToTarget(dataBooking, true);
      if (!isSeTi) {
        updateScrollButton({
          target: "#targetBlockBanner",
          trigger: "#triggerBlockSumary",
          text: "Scroll to choose user",
          icon: "fa fa-hand-pointer",
          triggerBanner: "#triggerBlockSumary",
          force: false,
        });
      }

      $mainScrollBtn.fadeIn();
    } else if (isFinalBooking && !isInViewport($triggerSum)) {
      updateScrollButton({
        target: "#section-booking",
        trigger: "#trigger-booking",
        triggerBanner: "#triggerBlockSumary",
        text: "Continue Booking",
        icon: "fa fa-hand-pointer down",
        force: false,
      });
    } else {
      $mainScrollBtn.fadeOut();
    }
  });

  function scrollToElementInContainer(
    $container,
    $target,
    extra = 0,
    duration = 500
  ) {
    if (!$target || !$target.length) return;

    // Nếu container là window / body -> dùng offset
    const containerEl = $container && $container.length ? $container[0] : null;
    const isDocument =
      !containerEl ||
      containerEl === document.body ||
      containerEl === document.documentElement;

    if (isDocument) {
      // scroll toàn trang
      const top = $target.offset().top + extra;
      $("html, body").animate({ scrollTop: top }, duration);
      return;
    }

    // Container cuộn
    const containerRect = containerEl.getBoundingClientRect();
    const targetRect = $target[0].getBoundingClientRect();
    const currentScroll = $container.scrollTop();

    // Vị trí tương đối của target so với container's content top
    const relativeTop = targetRect.top - containerRect.top + currentScroll;

    // Nếu container có padding-top, bù vào (tuỳ layout)
    const paddingTop = parseFloat($container.css("padding-top")) || 0;

    const finalScroll = Math.round(relativeTop - paddingTop + extra);
    $container.animate({ scrollTop: finalScroll }, duration);
  }

  // Sự kiện click nút scroll
  $mainScrollBtn.on("click", function () {
    const $container = $(".wrap-home-templates");
    const $target = $($mainScrollBtn.data("target"));

    if ($target.length) {
      // 86 header, 136 adverties, extra 30
      scrollToElementInContainer($container, $target, -250, 500);
    }
  });

  // click test api
  $(document).on("click", "#page-fag", async function () {});

  // ========================
  // ========================
  // ========================
  // ========================
  // XỬ LÝ SỰ KIỆN TRÊN MOBILE
  // HEADER MENU
  $(document).on("click", ".menu-toggle", function () {
    $(".list-option").toggleClass("show");
  });

  $(document).on("click", ".btn-more-info", function () {
    const $this = $(this);
    const $showListInfo = $this.closest(".show-list-info");
    $showListInfo.toggleClass("show");
  });

  // // Gọi khi load xong
  // $(window).on('load', updateBannerHeight);

  // // Gọi khi resize (phòng responsive)
  // $(window).on('resize', updateBannerHeight);

  // // Nếu nội dung thay đổi sau khi load (AJAX, DOM update)
  // const observer = new MutationObserver(updateBannerHeight);
  // observer.observe(document.querySelector('.banner .content-banner'), {
  //   childList: true,
  //   subtree: true,
  //   characterData: true

  // });
});

/*
   - 1. Verify email, phone:
    -> (not) 1.1: register
    -> 1.2: fill data user, gồm service gần nhất booking, chọn lại thợ và giờ
  */
/*
   - 1. Lấy ra thông tin tech cho service (payload: date, time, duration)
   - 2. Lấy ra time-frame phù hợp cho các service và tech đã chọn
   - 3. Copy service, chọn lại thợ -> (1)&(2)
   - 4. Khi copy service, kiểm tra có option copy time để copy time -> (1)&(2)
   - 5. Xử lý booking kiểm tra tech, time-frame còn slot không:
        -> (not) 5.1: api trả ra thợ bị "nghẽn" hoặc re-start
        -> 5.2: Booking
  */
/*
    1. Chọn thẻ thanh toán -> verify thẻ
    2. Thanh toán credit
    END
  */
