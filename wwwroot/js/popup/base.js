// POPUP
function formatUnit(val) {
  return typeof val === "number" ? `${val}px` : val;
}
// base popup
export function renderBasePopup(
  innerContentHTML,
  persistent = false,
  height = 620,
  width = 560
) {
  // Clear popup cũ nếu có
  $(".overlay-screen").remove();

  const html = `
        <div class="overlay-screen ${persistent ? "persistent" : ""}">
          <div class="popup-container-template"
            style="
              height: ${formatUnit(height)};
              width: ${formatUnit(width)};
            "
          >
            ${innerContentHTML}
            <div class="btn-closepopup">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>
      `;
  return html;
}
