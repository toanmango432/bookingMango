export function renderDescBlackList(message, colorPrimary) {
  return `
        <div class="wrap-popup-descbl"
          style="
            --color-cur-primary: ${colorPrimary ? colorPrimary : ""};
          "
        >
          <div class="title-timeoff">
            <!--
            <h2 class="title-policies text-uppercase">
              Salon Policies
            </h2>
            -->
          </div>
          <div class="content-desc text-">
            ${message}
          </div>
        </div>
    `;
}
