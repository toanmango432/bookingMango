import { isValidPhoneNumber } from "../format-phone.js";
import { templateStore } from "../../store/template-store.js";
import { shakeError } from "../shake-error.js";
import { showInputError } from "../shake-error.js";
import { salonStore } from "../../store/new-online-store.js";
import { errorMessagesPhoneEmail } from "../../constants/errorMessage.js";

// BLUR firstName
export function validateFirstNameInput($input) {
  const dataBooking = templateStore.getState().dataBooking;

  const $parent = $input.closest(".wrap-input-guests");
  const userCur = dataBooking.users.find((u) => u.isChoosing);
  const $findInputFullname = $parent.find(
    `.guest-input[data-id=${userCur.id}] input`
  );
  const $error = $input.next(".error-message");
  const val = $input.val().trim();

  $findInputFullname.val(val || `GUEST ${userCur.id}`);
  userCur.firstName = val;

  if (val === "") {
    $input.addClass("is-invalid");
    $error.text("First name is required.");
  } else {
    $input.removeClass("is-invalid");
    $error.text("");
  }
}
// BLUR lastname
export function validateLastNameInput($input) {
  const dataBooking = templateStore.getState().dataBooking;

  const userCur = dataBooking.users.find((u) => u.isChoosing);
  const isFirst = dataBooking.users[0].id === userCur.id;
  const $error = $input.next(".error-message");
  const val = $input.val().trim();

  userCur.lastName = val;

  if (isFirst && val === "") {
    $input.addClass("is-invalid");
    $error.text("Last name is required.");
  } else {
    $input.removeClass("is-invalid");
    $error.text("");
  }
}
// BLUR phone&email banner
export function validateEmailPhoneInputBanner($input) {
  const dataBooking = templateStore.getState().dataBooking;
  const userCur = dataBooking.users.find((u) => u.isChoosing);
  const isFirst = dataBooking.users[0].id === userCur.id;
  const val = $input.val().trim();
  const $error = $input.next(".error-message");

  const isPhone = isValidPhoneNumber(val);
  const isEmail = isValidEmail(val);

  userCur.email = isEmail ? val : "";
  userCur.phoneNumber = isPhone ? val : "";

  if (isFirst && val === "") {
    $input.addClass("is-invalid");
    $error.text("Email or phone is required.");
  } else if (val !== "" && !isPhone && !isEmail) {
    $input.addClass("is-invalid");
    $error.text("Email or phone is incorrect format.");
  } else {
    $input.removeClass("is-invalid");
    $error.text("");
  }
}
// BLUR phone&email
export function validateEmailPhoneInput($input) {
  const store = salonStore.getState();
  const OBLogin = store.OBLogin; // 0 = phone, 1 = email, 2 = phone|email

  const val = $input.val().trim();
  const $error = $input.siblings(".error-message");

  const isPhone = isValidPhoneNumber(val);
  const isEmail = isValidEmail(val);

  let errorMsg = "";
  let type = "";

  if (val === "") {
    errorMsg =
      OBLogin === "0"
        ? "Phone is required."
        : OBLogin === "1"
        ? "Email is required."
        : "Phone or email is required.";
  } else {
    if (OBLogin === "0") {
      if (!isPhone) errorMsg = "Phone number is invalid.";
      else type = "PHONE";
    } else if (OBLogin === "1") {
      if (!isEmail) errorMsg = "Email is invalid.";
      else type = "EMAIL";
    } else {
      if (!(isPhone || isEmail)) {
        errorMsg = "Email or phone format is invalid.";
      } else {
        type = isPhone ? "PHONE" : "EMAIL";
      }
    }
  }

  if (errorMsg) {
    $input.addClass("is-invalid");
    $error.text(errorMsg);
    shakeError?.($error);
  } else {
    $input.removeClass("is-invalid");
    $error.text("");
  }

  return type;
}

// Check phone form register blur
export function validatePhoneFormRegister($input) {
  const val = $input.val().trim();
  const isPhone = isValidPhoneNumber(val);

  if (isPhone) {
    const $errorMs = $input.next(".error-message");
    $errorMs.text("");
  } else if (val === "") {
    showInputError($input, `Phone number is required`, true);
  } else if (!isPhone) {
    showInputError($input, `Phone is incorrect format!`, true);
  }
}
// Check email form register
export function validateEmailFormRegister($input) {
  const val = $input.val().trim();
  const isMail = isValidEmail(val);

  if (isMail) {
    const $errorMs = $input.next(".error-message");
    $errorMs.text("");
  } else if (val === "") {
    showInputError($input, `Email is required`, true);
  } else if (!isMail) {
    showInputError($input, `Email is incorrect format!`, true);
  }
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function checkValInputs(listIdInput) {
  return listIdInput.every((item) => $(item).val().trim() !== "");
}
