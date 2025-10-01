// Content popup register
import { typeRequire, typeInput } from "../../../constants/template-online.js";
import { salonStore } from "../../../store/new-online-store.js";
export function renderRegisterForm(
  dataRegis,
  fieldEntered = null,
  actionCur,
  colorPrimary
) {
  const store = salonStore.getState();
  const OBLogin = store.OBLogin;
  const requestClient = store.requestClient;

  // check param config
  const paramLastName = requestClient.find(
    (p) => p.paraName === "ClientLastName"
  );
  const paramZip = requestClient.find((p) => p.paraName === "ZipRewardMember");
  const lastNameRequired = paramLastName?.paraStr === "1";
  const zipRequired = paramZip?.paraStr === "1";

  const valCheckDis =
    fieldEntered === typeInput.EMAIL ? dataRegis.email : dataRegis.phoneNumber;

  // isDisabled: firstname + (lastname nếu required) + contact field (email/phone rules)
  const isContactFilled = valCheckDis ? true : false;
  const isDisabled =
    dataRegis.firstName &&
    (lastNameRequired ? dataRegis.lastName : true) &&
    isContactFilled;

  let phoneRequire, emailRequire;
  if (fieldEntered === null) {
    if (OBLogin === "0") {
      phoneRequire = typeRequire.REQUIRED;
      emailRequire = typeRequire.NOTREQUIRED;
    } else if (OBLogin === "1") {
      phoneRequire = typeRequire.NOTREQUIRED;
      emailRequire = typeRequire.REQUIRED;
    } else {
      phoneRequire = typeRequire.REQUIRED;
      emailRequire = typeRequire.REQUIRED;
    }
  } else {
    // Nếu có fieldEntered thì giữ nguyên logic cũ
    phoneRequire =
      fieldEntered === typeInput.EMAIL
        ? typeRequire.NOTREQUIRED
        : typeRequire.REQUIRED;
    emailRequire =
      fieldEntered === typeInput.PHONE
        ? typeRequire.NOTREQUIRED
        : typeRequire.REQUIRED;
  }

  return `
        <div class="wrap-popup-register"
          style="
            --color-cur-primary: ${colorPrimary ? colorPrimary : ""}
          "
        >
          <h2 class="title-register text-uppercase">
            Register
          </h2>
          <div class="pa-intro-register">
            <p class="content">
              Your name and phone number will be used to send you
              appointment confirmations and reminders.
              We’ll also be able to call or text you if anything changes.
            </p>
          </div>
          <div class="form-group">
            <div class="form-input-phone">
              <label>
                Phone
                <p>${phoneRequire === typeRequire.REQUIRED ? "*" : ""}</p>
              </label>
              <input
                id="phone-register"
                placeholder="Phone number"
                value="${dataRegis.phoneNumber || ""}"
                data-type="${phoneRequire}"
              />
              <p class="error-message"></p>
            </div>
            <div class="form-input-fullname">
              <div class="form-input-firstname-register">
                <label>
                  First Name
                  <p>*</p>
                </label>
                <input
                  id="firstname-register"
                  placeholder="First Name"
                  value="${dataRegis.firstName ? dataRegis.firstName : ""}"
                />
                <p class="error-message"></p>
              </div>
              <div class="form-input-lastname-register">
                <label>
                  Last Name
                  <p>${lastNameRequired ? "*" : ""}</p>
                </label>
                <input
                  placeholder="Last Name"
                  id="lastname-register"
                  value="${dataRegis.lastName || ""}"
                  data-type="${
                    lastNameRequired
                      ? typeRequire.REQUIRED
                      : typeRequire.NOTREQUIRED
                  }"
                />
                <p class="error-message"></p>
              </div>
            </div>
            <div class="form-input-email">
              <label>
                Email
                <p>${emailRequire === typeRequire.REQUIRED ? "*" : ""}</p>
              </label>
              <input
                id="email-register"
                placeholder="Email"
                value="${dataRegis.email || ""}"
                data-type="${emailRequire}"
              />
              <p class="error-message"></p>
            </div>
            <div class="form-input-zipcode">
              <label>
                Zip Code <p>${zipRequired ? "*" : ""}</p>
              </label>
              <input
                placeholder="Zip Code"
                id="zipcode-register"
                value="${dataRegis.zipcode || ""}"
                data-type="${
                  zipRequired ? typeRequire.REQUIRED : typeRequire.NOTREQUIRED
                }"
              />
              <p class="error-message"></p>
            </div>
          </div>
          <div class="regis-message-error"></div>
          <div class="button-container">
            <button class="btn-back-verify-register-1">Back</button>
            <button
              class="btn-next-verify-register-1"
              ${isDisabled ? "" : "disabled"}
              data-accur=${actionCur}
            >Sign Up</button>
          </div>
        </div>
      `;
}
