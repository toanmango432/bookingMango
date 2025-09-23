export function renderContentDaysOffTech(listDaysOff, colorPrimary) {
  return `<div class="wrap-popup-daysoff-tech"
          style="
            --color-cur-primary: ${colorPrimary ? colorPrimary : ""}
          "
        >
          <div class="title-daysoff-tech">
            <h2 class="title-dotec text-uppercase">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M5.93066 1.33203V3.33203" stroke="#181818" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.2646 1.33203V3.33203" stroke="#181818" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2.93066 6.05859H14.264" stroke="#181818" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.5977 5.66536V11.332C14.5977 13.332 13.5977 14.6654 11.2643 14.6654H5.93099C3.59766 14.6654 2.59766 13.332 2.59766 11.332V5.66536C2.59766 3.66536 3.59766 2.33203 5.93099 2.33203H11.2643C13.5977 2.33203 14.5977 3.66536 14.5977 5.66536Z" stroke="#181818" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.59432 9.13411H8.60031" stroke="#181818" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.12752 9.13411H6.13351" stroke="#181818" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.12752 11.1341H6.13351" stroke="#181818" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Days Off:
            </h2>
          </div>
          <div class="content-daysoff-tech">
            <ul class="list-daysoff-tech">
            ${
              listDaysOff && listDaysOff.length > 0
                ? listDaysOff
                    .map((day) => `<li class="day-off-item">${day}</li>`)
                    .join("")
                : "<li class='day-off-item'>No days off</li>"
            }
            </ul>
          </div>
        </div>
      `;
}
