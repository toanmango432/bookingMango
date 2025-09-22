// Content policies
export function renderContentDesSer(iser, colorPrimary) {
  return `
        <div class="wrap-popup-descser"
          style="
            --color-cur-primary: ${colorPrimary ? colorPrimary : ""};
          "
        >
          <div class="title-descser">
            <h2 class="title-ds text-uppercase">
              Description
            </h2>
          </div>
          <div class="content-descser">
            ${iser?.description}
          </div>
        </div>
      `;
}
