// import data
import { templateStore } from "../store/template-store.js";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" + s : s}`;
}
function updatePopupFlowCountdownUI(remaining) {
  const $countdown = $(".popup-flow-countdown");
  if ($countdown.length) {
    $countdown.text(formatTime(remaining));
  }
}
export async function startPopupFlowCountdown(seconds = 1800) {
  let popupFlowRemaining = 0;
  let popupFlowCountdownInterval =
    templateStore.getState().popupFlowCountdownInterval;

  popupFlowRemaining = seconds;

  // clear nếu đang chạy
  if (popupFlowCountdownInterval) {
    clearInterval(popupFlowCountdownInterval);
  }

  updatePopupFlowCountdownUI(popupFlowRemaining);

  popupFlowCountdownInterval = setInterval(() => {
    popupFlowRemaining--;

    updatePopupFlowCountdownUI(popupFlowRemaining);

    if (popupFlowRemaining <= 0) {
      clearInterval(popupFlowCountdownInterval);
      popupFlowCountdownInterval = null;

      // hết giờ -> đóng tất cả popup
      closePopupContainerTemplate();
    }
  }, 1000);
}
