export function renderTimeBooking(dataBooking, colorPrimary, isCopySameTime) {
  const userCopyTime = dataBooking.users.find(
    (u) => u.isSelecting && !u.isChoosing
  );
  // Kiểm tra chọn service xong mới hiện chọn time
  const userChoosing = dataBooking.users.find((u) => u.isChoosing);
  const isSelectedService = userChoosing.services.length > 0;
  return `
      <div class="calendar-timeslot">
        <div class="wrap-calendar-time"
          style="
            --color-cur-primary: ${colorPrimary};
          "
        >
          <div class="top-cal-time">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16625 11.4688H13.4263V2.46875H1.90625V21.9688H13.4263V12.9688H7.16625V11.4688Z" fill="#E27303" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8448 11.4691C19.8328 11.4681 18.0008 9.63605 18.0008 7.62305V6.87305H16.5008V7.62305C16.5008 9.10005 17.1758 10.4801 18.2198 11.4691L13.4219 11.469V12.969L18.2198 12.9691C17.1758 13.9581 16.5008 15.3371 16.5008 16.8141V17.5641H18.0008V16.8141C18.0008 14.8021 19.8338 12.9691 21.8458 12.9691H22.5958V11.4691H21.8448Z" fill="#E27303" />
            </svg>
            <h2 class="title-copy-time text-uppercase mb-0">SELECT DATE AND TIME</h2>
            ${
              userCopyTime && Object.keys(userCopyTime).length > 0
                ? `<div class="copy-time">
                <input
                  id="select-banner-pm"
                  type='checkbox'
                  class='toggle-switch'
                  ${isCopySameTime ? "checked" : ""}
                />
                <span class="text-same-time">Start on same time</span>
              </div>`
                : ""
            }
          </div>
          <div class="container-cal-time">
            <div class="calendar">
              <div class="calendar-header">
                <button id="prev">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path d="M12.5547 22.752C18.0775 22.752 22.5547 18.2748 22.5547 12.752C22.5547 7.22911 18.0775 2.75195 12.5547 2.75195C7.03184 2.75195 2.55469 7.22911 2.55469 12.752C2.55469 18.2748 7.03184 22.752 12.5547 22.752Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.0547 12.752H10.0547" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.0547 9.75195L9.05469 12.752L12.0547 15.752" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div id="monthYear"></div>
                <button id="next">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path d="M12.5547 22.752C18.0775 22.752 22.5547 18.2748 22.5547 12.752C22.5547 7.22911 18.0775 2.75195 12.5547 2.75195C7.03184 2.75195 2.55469 7.22911 2.55469 12.752C2.55469 18.2748 7.03184 22.752 12.5547 22.752Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9.05469 12.752H15.0547" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.0547 15.752L16.0547 12.752L13.0547 9.75195" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div class="calendar-grid" id="days">
              </div>
            </div>
            <div class="timeslot">
              <h2 id="selectedDateTitle">August 14, 2025</h2>
              <!-- <div id="comboBox"></div> -->
              <div id="timeSlotsContainer" class="time-slots"></div>
              <div class="text-scroll-more">
                <h2>Scroll to see more time slots</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}
