// Content policies
export function renderPoliciesForm(
  policySetting,
  colorPrimary,
  isTimeOff = false
) {
  return `
        <div class="wrap-popup-policies"
          style="
            --color-cur-primary: ${colorPrimary};
          "
        >
          <div class="title-timeoff">
            <h2 class="title-policies text-uppercase">
              Salon Policies
            </h2>
            <span class="popup-flow-countdown timeoff">
            </span>
          </div>
          <div class="content-policies">
            ${policySetting}
          </div>
          <div class="button-container">
            <button class="btn-back-policies">Back</button>
            <button class="btn-next-policies">Accept</button>
          </div>
        </div>
      `;
}
