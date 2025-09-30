// content popup verify phone & email
export function renderAddGuestContent(emailOrPhone, colorPrimary) {
  return `
        <div class="popup-wrap-addguest"
          style="
            --color-cur-primary: ${colorPrimary ? colorPrimary : "white"}
          "
        >
          <div class="title-addguest">
            <h2>Add guest</h2>
            <span>Please enter guest phone number</span>
          </div>
          <div class="container-addguest">
            <input type="text" id="addguest-input" class="appointment-input-1" value="${
              emailOrPhone ? emailOrPhone : ""
            }" placeholder="Enter phone number">
            <span class="clear-icon-addguest">
              <i class="fa-solid fa-arrow-left"></i>
            </span>
            <p class="error-message"></p>
          </div>
          <div class="button-container">
            <button class="btn-back-addguest">Back</button>
            <button class="btn-skipguest">Skip</button>
          </div>
        </div>
      `;
}
