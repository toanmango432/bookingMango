// Content policies
export function contentShowResetDataBooking(title) {
  return `
        <div class="wrap-popup-reset-databooking">
          <div class="content-req-reset">
            <h2>${title}</h2>
            <span class="text-req-reset">
              Making this change will clear your current picks. Would you like to choose anew?
            </span>
          </div>
          <div class="button-container">
            <button class="btn-back-reset">Cancel</button>
            <button class="btn-confirm-reset">Confirm Change</button>
          </div>
        </div>
      `;
}
