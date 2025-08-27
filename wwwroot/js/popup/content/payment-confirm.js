// Form xác nhận thanh toán
export function renderPaymentConfirmationForm(data = {}, colorPrimary) {
  const {
    image = "/assets/images/payment-success/img-succes-payment.png",
    ticketNumber = "38538",
    dateTime = "May 14, 2025 at 2:00PM",
    paymentMethodLabel = "VISA",
    paymentMethodMasked = "Xxx Xxx Xxx 4008",
    deposit = "60.00",
    remaining = "60.00",
    requestAnotherCount = 5,
  } = data;

  return `
        <div class="wrap-popup-payment-confirmation"
          style="
            --color-cur-primary: ${
              typeof colorPrimary !== "undefined" ? colorPrimary : "#39b54a"
            };
          "
        >
          <div class="confirm-grid">
            <!-- LEFT IMAGE -->
            <div class="confirm-left">
              <img src="${image}" alt="Salon image" class="confirm-image" />
            </div>

            <!-- RIGHT CONTENT -->
            <div class="wrap-confirm-right">
              <div class="confirm-right">
                <div class="wrap-top-payment-success">
                  <div class="check-circle" aria-hidden="true">
                    <svg class="check-svg" viewBox="0 0 64 64" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                      <!-- fill circle -->
                      <circle class="fill-circle" cx="32" cy="32" r="28" fill="var(--color-cur-primary)"></circle>

                      <!-- stroke circle for animated border (no fill) -->
                      <circle class="stroke-circle" cx="32" cy="32" r="28" fill="none" stroke="#2d8e45" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

                      <!-- check path -->
                      <path class="check-path" d="M20 34 L28 42 L44 24" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                  </div>
                  <div class="confirm-top-content">
                    <h2 class="confirm-title my-0">Appointment Is Requested</h2>
                    <p class="confirm-desc mb-0">Thank you for booking with us! Please wait while we confirm your appointment.</p>
                  </div>
                </div>

                <div class="divider"></div>
                <div class="apoint-remain">
                  <div class="appointment-rows">
                    <div class="row">
                      <div class="label">Ticket Number</div>
                      <div class="value">#${ticketNumber}</div>
                    </div>

                    <div class="row">
                      <div class="label">Date &amp; Time</div>
                      <div class="value">${dateTime}</div>
                    </div>

                    <div class="row">
                      <div class="label">Payment Method</div>
                      <div class="value payment-method">
                        <span class="pm-badge">${paymentMethodLabel}</span>
                        <span class="pm-text">${paymentMethodMasked}</span>
                      </div>
                    </div>

                    <div class="row">
                      <div class="label">Deposit Paid</div>
                      <div class="value">$${deposit}</div>
                    </div>
                  </div>

                  <div class="remaining-wrapper">
                    <div class="remaining-label">Remaining Balance</div>
                    <div class="remaining-amount">$${remaining}</div>
                  </div>
                </div>
                </div>
              <button class="btn-request-another text-uppercase">REQUEST ANOTHER APPOINTMENT (${requestAnotherCount})</button>
            </div>
          </div>

          <div class="dotted-sep" aria-hidden="true"></div>

          <div class="app-promo">
            <h3 class="promo-title">Experience Our App</h3>
            <p class="promo-desc">
              Conveniently manage all your appointments and gift cards with ease, and stay informed
              about upcoming offers from the salon through our app.
            </p>

            <div class="badges">
              <div class="google-badge">
                <div class="icon-gg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <g clip-path="url(#clip0_2870_30408)">
                      <path d="M24.4905 12.4761C24.4905 11.4929 24.4088 10.7753 24.2321 10.0312H12.7422V14.4692H19.4865C19.3506 15.5721 18.6163 17.2331 16.9846 18.3492L16.9617 18.4978L20.5946 21.248L20.8463 21.2725C23.1579 19.1863 24.4905 16.1169 24.4905 12.4761Z" fill="#4285F4"/>
                      <path d="M12.7372 24.1698C16.0413 24.1698 18.8152 23.1067 20.8413 21.2731L16.9796 18.3498C15.9462 19.054 14.5592 19.5456 12.7372 19.5456C9.50096 19.5456 6.75427 17.4596 5.77515 14.5762L5.63164 14.5881L1.85409 17.4449L1.80469 17.5791C3.81711 21.4856 7.95077 24.1698 12.7372 24.1698Z" fill="#34A853"/>
                      <path d="M5.7758 14.5758C5.51745 13.8317 5.36794 13.0343 5.36794 12.2106C5.36794 11.3867 5.51745 10.5895 5.76221 9.84537L5.75536 9.6869L1.93048 6.78418L1.80533 6.84235C0.97592 8.46345 0.5 10.2839 0.5 12.2106C0.5 14.1372 0.97592 15.9576 1.80533 17.5787L5.7758 14.5758Z" fill="#FBBC05"/>
                      <path d="M12.7372 4.87598C15.0351 4.87598 16.5852 5.84597 17.4691 6.65656L20.9228 3.36124C18.8017 1.43455 16.0413 0.251953 12.7372 0.251953C7.95077 0.251953 3.8171 2.93601 1.80469 6.84252L5.76156 9.84554C6.75427 6.96215 9.50096 4.87598 12.7372 4.87598Z" fill="#EB4335"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_2870_30408">
                        <rect width="24" height="24" fill="white" transform="translate(0.5 0.251953)"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="text-icon">
                  <span class="small">GET IT ON</span>
                  <span class="big">Google Play</span>
                </div>
              </div>
              <div class="app-badge">
                <div class="icon-app-store">
                  <img
                    src="/assets/images/payment-success/app-store.svg"
                    alt="Icon app store"
                    class="img-icon-appStore"
                  />
                </div>
                <div class="text-icon">
                  <span class="small">GET IT ON</span>
                  <span class="big">App Store</span>
                </div>
              </div>
            </div>

            <p class="legal">
              <p class="mb-0">
                Apple and the Apple logo are trademarks of Apple Inc.,
                registered in the U.S. and other countries.
              </p>
              <p class="mb-0">
                App Store is a service mark of Apple Inc.
              </p>
              <p class="mb-0">
                Google Play is a trademark of Google Inc.
              </p>
            </p>
          </div>
        </div>
      `;
}
