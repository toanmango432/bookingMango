// Form thêm thẻ mới
import { typeRequire } from "../../../constants/template-online.js";
export function renderAddNewMethod(colorPrimary) {
  return `
        <div class="wrap-popup-add-card"
          style="--color-cur-primary: ${colorPrimary ? colorPrimary : ""};">
          <div class="header-popup-payment">
            <h2 class="title-payment text-uppercase">Payments</h2>
            <span class="popup-flow-countdown time-off"></span>
          </div>
          <div class="subtitle-card-new">
            <h3 class="subtitle">Add new card</h3>
          </div>
          <div id="form-add-card" class="wrap-form-group-card-new">
            <div class="form-group-card-new">
              <label>
                Card Holder Name
                <p class="mb-0">*</p>
              </label>
              <input
                type="text"
                id="card-holder-name"
                placeholder="Card Holder Name"
                data-type="${typeRequire.REQUIRED}"
              >
              <p class="error-message"></p>
            </div>
            <div class="form-group-card-new">
              <label>
                Card Number
                <p class="mb-0">*</p>
              </label>
              <input type="text" id="card-number" placeholder="Card Number">
              <p class="error-message"></p>
            </div>
            <div class="form-row-card-new">
              <div class="group-card-ex">
                <label>
                  MM/YY
                  <p class="mb-0">*</p>
                </label>
                <input
                  type="text"
                  id="card-expiry"
                  placeholder="MM/YY"
                  data-type="${typeRequire.REQUIRED}"
                >
                <p class="error-message"></p>
              </div>
              <div class="group-card-ccv">
                <label>
                  CVV2
                  <p class="mb-0">*</p>
                </label>
                <input
                  type="text"
                  id="card-cvv"
                  placeholder="CVV2"
                  data-type="${typeRequire.REQUIRED}"
                >
                <p class="error-message"></p>
              </div>
            </div>
            <div class="form-group-card-new">
              <label>
                Billing Address
                <p class="mb-0">*</p>
              </label>
              <input
                type="text"
                id="billing-address"
                placeholder="Billing Address"
                data-type="${typeRequire.REQUIRED}"
              >
              <p class="error-message"></p>
            </div>
            <div class="form-group-card-new">
              <label>
                Street
              </label>
              <input type="text" id="card-street" placeholder="Street">
            </div>
            <div class="form-group-card-new">
              <label>
                City
              </label>
              <input type="text" id="card-city" placeholder="City">
            </div>
            <div class="form-group-card-new">
              <label>
                State
              </label>
              <input type="text" id="card-state" placeholder="State">
            </div>
            <div class="form-group-card-new">
              <label>
                Zip
              </label>
              <input type="text" id="card-zip" placeholder="Zip">
            </div>
          </div>
          <!--
          <div class="form-group-card-sub">
            <div class="checkbox-add-card">
              <div class="circle-add-card">
                <i class="fa-solid fa-check"></i>
              </div>
              <span>Save my card</span>
            </div>
          </div>
          -->
          <div class="button-container">
            <button class="btn-back-add-card-1">Back</button>
            <button class="btn-add-card-1">Add</button>
          </div>
        </div>
      `;
}
