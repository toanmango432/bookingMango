// content popup verify code
export function renderVerifyCodeContent(
  emailPhoneMasked = "(+84) 124 2149",
  colorPrimary
) {
  return `
        <div class="popup-wrap-verify-code"
          style="
            --color-cur-primary: ${colorPrimary ? colorPrimary : ""}
          "
        >
          <div class="title-verify-number">
            <h2>VERIFY YOUR NUMBER</h2>
          </div>
          <p class="desc-verify">Enter the code we sent over SMS to ${emailPhoneMasked}</p>

          <div class="otp-inputs">
            ${[...Array(6)]
              .map(
                (_, i) =>
                  `<input type="text" maxlength="1" class="otp-box" data-index="${i}" />`
              )
              .join("")}
          </div>
          <p class="error-message"></p>

          <div class="resend-wrapper">
            Didn’t get a code? <span class="resend-btn disabled">Send Again (<span class="countdown">00:59</span>)</span>
          </div>

          <div class="consent-container">
            <span class="wrap-icon-checked">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 6.73671L4.67305 9.75195L11.5 3.75195" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <label>Input your number to consent to HANG NAILS & SPA SMS messages. Opt out with Stop</label>
          </div>

          <div class="button-container">
            <button class="btn-back-verify-1">Back</button>
            <button class="btn-next-verify-1" disabled>
            Verify
            <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
}
