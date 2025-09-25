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
          <p class="error-message send-otp"></p>

          <div class="resend-wrapper">
            Didn’t get a code? <span class="resend-btn disabled">Send Again (<span class="countdown">00:59</span>)</span>
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
