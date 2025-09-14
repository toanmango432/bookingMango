// Form chọn phương thức thanh toán
import { maskCardNumber } from "../../../helper/format-card.js";
export function renderPaymentMethodsForm(
  dataBooking,
  colorPrimary,
  selectedMethod = null
) {
  const numberCard = dataBooking.cardNumber;

  return `
        <div
          class="wrap-popup-payment-methods"
          style="
            --color-cur-primary: ${colorPrimary ? colorPrimary : ""};
          "
        >
          <div class="header-popup-payment">
            <h2 class="title-payment text-uppercase">Payments</h2>
            <span class="popup-flow-countdown time-off"></span>
          </div>
          <div class="subtitle">
            <span class="subtitle-text">
              Choose your card
            </span>
            <span class="add-new-card-btn-1">
              <i class="fa-solid fa-plus"></i>
              Add new card
            </span>
          </div>
          <div class="payment-methods-list">
          ${
            numberCard &&
            numberCard
              .map((item) => {
                return `
              <div data-id="${item.id}" class="payment-method-item">
                <div class="wrap-name-method">
                  <div class=""wrap-img-method>
                  </div>
                  <div class="name-numbercard">
                    <span class="name-method">
                      VISA
                    </span>
                    <span class="number-card">
                      ${maskCardNumber(item.last4)}
                    </span>
                  </div>
                </div>
                <div class="circle">
                  <div class="dot"></div>
                </div>
              </div>
            `;
              })
              .join("")
          }
          </div>
          <div class="payment-summary">
            <div class="sub-deposit">
              <span class="sub-deposit-1r">
                Total
              </span>
              <span class="sub-deposit-1l">
                ${dataBooking.currencyDeposit + dataBooking?.totalAmount}
              </span>
            </div>
            <div class="cur-deposit">
              <span class="sub-deposit-2r">
                Deposit
              </span>
              <span class="sub-deposit-2l">
                ${dataBooking.currencyDeposit + dataBooking?.paymentDeposit}
              </span>
            </div>
          </div>
          <div class="button-container">
            <button class="btn-back-payment-1">Back</button>
            <button class="btn-next-payment-1" disabled>Confirm</button>
          </div>
        </div>
      `;
}
