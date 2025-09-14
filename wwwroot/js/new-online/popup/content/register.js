// Content popup register
import { typeRequire, typeInput } from "../../constants/template-online.js";
export function renderRegisterForm(
  dataRegis,
  fieldEntered = null,
  colorPrimary
) {
  const valCheckDis =
    fieldEntered === typeInput.EMAIL ? dataRegis.email : dataRegis.phoneNumber;
  const isDisabled = dataRegis.firstName && dataRegis.lastName && valCheckDis;
  return `
        <div class="wrap-popup-register"
          style="
            --color-cur-primary: ${colorPrimary}
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
                <p>${fieldEntered === typeInput.EMAIL ? "" : "*"}</p>
              </label>
              <input
                id="phone-register"
                placeholder="Phone number"
                value="${dataRegis.phoneNumber ? dataRegis.phoneNumber : ""}"
                data-type="${
                  fieldEntered === typeInput.EMAIL
                    ? typeRequire.NOTREQUIRED
                    : typeRequire.REQUIRED
                }"
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
                  <p>*</p>
                </label>
                <input
                  placeholder="Last Name"
                  id="lastname-register"
                  value="${dataRegis.lastName ? dataRegis.lastName : ""}"
                />
                <p class="error-message"></p>
              </div>
            </div>
            <div class="form-input-email">
              <label>
                Email
                <p>${fieldEntered === typeInput.PHONE ? "" : "*"}</p>
              </label>
              <input
                id="email-register"
                placeholder="Email"
                value="${dataRegis.email ? dataRegis.email : ""}"
                data-type="${
                  fieldEntered === typeInput.PHONE
                    ? typeRequire.NOTREQUIRED
                    : typeRequire.REQUIRED
                }"
              />
              <p class="error-message"></p>
            </div>
            <div class="form-input-zipcode">
              <label>
                Zip Code
              </label>
              <input placeholder="Zip Code" id="zipcode-register"/>
              <p class="error-message"></p>
            </div>
          </div>
          <div class="regis-message-error"></div>
          <div class="button-container">
            <button class="btn-back-verify-register">Back</button>
            <button class="btn-next-verify-register" ${
              isDisabled ? "" : "disabled"
            }>Sign Up</button>
          </div>
        </div>
      `;
}
