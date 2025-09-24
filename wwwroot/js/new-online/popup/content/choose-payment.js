export function renderDisPriceOnPopupChoosePayment(
  { isHidePrice, priceDisplay },
  { totalPayment, totalCashPayment }
) {
  if (priceDisplay === "0") {
    return `<span class="wrap-cash-base ${isHidePrice ? "hide-price" : ""}">
            <span class="sub-deposit-1l">
              ${"$" + totalPayment.toFixed(2)}
            </span>
          </span>`;
  } else if (priceDisplay === "2" || priceDisplay === "1") {
    return `<span class="wrap-cash-base ${isHidePrice ? "hide-price" : ""}">
              <span class="sub-depositcash-1l">
                ${"$" + totalCashPayment.toFixed(2)}
              </span>
              <span class="sub-deposit-1l">
                ${"$" + totalPayment.toFixed(2)}
              </span>
            </span>`;
  }
}

export function CalTotalPayment(dataBooking, listDataService) {
  let total = 0;
  let totalCash = 0;

  (dataBooking.users || []).forEach((userBooking) => {
    const dataRefact = buildServiceSummary(userBooking, listDataService);
    if (
      dataRefact.listServiceUser &&
      Array.isArray(dataRefact.listServiceUser)
    ) {
      dataRefact.listServiceUser.forEach((item) => {
        item.itemService.forEach((is) => {
          // cộng tiền service + optionals
          total += Number(getTotalPrice(is).total || 0);
          totalCash += Number(getTotalPrice(is).totalCash || 0);
        });
      });
    }
  });

  return { total, totalCash };
}

export function PaymentDeposit(dataBooking, dataServices) {
  const store = salonStore.getState();
  const totalPayment = CalTotalPayment(dataBooking, dataServices).total;
  const paymentDeposit = store?.paymentDeposit;

  if (dataBooking?.currencyDeposit === "%") {
    return "$" + ((totalPayment * parseFloat(paymentDeposit)) / 100).toFixed(2);
  } else if (dataBooking?.currencyDeposit === "$") {
    return "$" + parseFloat(paymentDeposit).toFixed(2);
  }
  return "$0";
}

// Form chọn phương thức thanh toán
import { maskCardNumber } from "../../../helper/format-card.js";
import { salonStore } from "../../../store/new-online-store.js";
import { buildServiceSummary } from "../../summary/summary.js";
import { getTotalPrice } from "../../summary/summary.js";

export function renderPaymentMethodsForm(
  dataBooking,
  colorPrimary,
  selectedMethod = null
) {
  const store = salonStore.getState();
  const dataServices = store.dataServices;
  const isHidePrice = store.isHidePrice;
  const priceDisplay = store.priceDisplay;

  const numberCard = dataBooking.cardNumber;
  const caclTotal = CalTotalPayment(dataBooking, dataServices);

  const totalPayment = caclTotal.total;
  const totalCashPayment = caclTotal.totalCash;
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
          <div class="payment-summary ${isHidePrice ? "hide-price" : ""}">
            <div class="sub-deposit">
              <span class="sub-deposit-1r">
                Total
              </span>
              ${renderDisPriceOnPopupChoosePayment(
                { isHidePrice, priceDisplay },
                { totalPayment, totalCashPayment }
              )}
            </div>
            <div class="cur-deposit">
              <span class="sub-deposit-2r">
                Deposit
              </span>
              <span class="sub-deposit-2l">
                ${PaymentDeposit(dataBooking, dataServices)}
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
