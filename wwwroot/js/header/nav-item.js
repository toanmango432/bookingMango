// components/nav-item.js
export function renderNavItem(item, colorActiveNav) {
  const iconItemNav = item.icon ? item.icon : "";
  const hasDropdown =
    Array.isArray(item.optionItems) && item.optionItems.length > 0;

  return `
    <div class="nav-item-with-dropdown" data-id="${item.id}">
      <button id="${item.id}"
        class="text-uppercase option ${
          item.id === "page-service" ? "active" : ""
        }">
        ${item.name}
        ${iconItemNav}
      </button>
      ${
        hasDropdown
          ? `<div class="dropdown-nav-list">
              ${item.optionItems
                .map(
                  (opt) => `
                <div class="dropdown-item" data-id=${opt.id}
                  style="--bgColorItemHeader: ${opt.bgColor}">
                  ${opt.text}
                </div>
              `
                )
                .join("")}
            </div>`
          : ""
      }
    </div>
  `;
}

$(document).ready(async function () {
  // click ra ngoài đóng dropdown
  $(document).on("click", function () {
    $(".nav-item-with-dropdown").removeClass("open");
    $(".nav-item-with-dropdown i").removeClass("rotate-180");
  });
  // mở drop down option
  $(document).on("click", ".nav-item-with-dropdown > .option", function (e) {
    e.stopPropagation();

    const $parent = $(this).closest(".nav-item-with-dropdown");

    // Ẩn các dropdown khác
    $(".nav-item-with-dropdown")
      .not($parent)
      .removeClass("open")
      .find("i")
      .removeClass("rotate-transition rotate-180");

    // Toggle hiện dropdown option hiện tại
    $parent.toggleClass("open");

    // Tìm icon thẻ i
    const $iconI = $(this).find("i");

    if ($parent.hasClass("open")) {
      if (!$iconI.hasClass("rotate-transition")) {
        $iconI.addClass("rotate-transition");
      }
      $iconI.addClass("rotate-180");
    } else {
      $iconI.removeClass("rotate-180");
    }
  });
});
