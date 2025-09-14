export function renderContentNotify(title, content, callback) {
  const popupHtml = `
        <div class="popup-notify"
          style="
            --color-cur-primary: ${colorPrimary};
          "
        >
          <div class="popup-header-notify">
            <h3>${title}</h3>
          </div>
          <div class="popup-body-notify">
            ${content}
          </div>
          <div class="popup-footer-notify">
            <button class="btn-confirm-delete">Đồng ý</button>
            <button class="btn-cancel">Hủy</button>
          </div>
        </div>
      `;

  // Gắn event khi DOM đã append
  setTimeout(() => {
    const $overlay = $(".overlay-screen");

    $overlay.find(".btn-confirm-delete").on("click", function () {
      if (typeof callback === "function") {
        callback();
      }
      closeNotify();
    });

    $overlay.find(".btn-cancel").on("click", closeNotify);

    $overlay.on("click", function (e) {
      if ($(e.target).is(".overlay-screen")) {
        closeNotify();
      }
    });

    function closeNotify() {
      $overlay.hide();
      $overlay.find(".popup-notify").remove();
    }
  });

  return popupHtml;
}
