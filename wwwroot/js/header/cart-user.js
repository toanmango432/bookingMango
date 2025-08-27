export function renderCartUser(dataBooking, dataHeaderNav) {
  const { cart } = dataHeaderNav;
  const quantity = dataBooking.users.reduce((accUser, user) => {
    const userCount = user.services.reduce((accService, service) => {
      return accService + service.itemService.length;
    }, 0);
    return accUser + userCount;
  }, 0);
  return `
        <button>
          ${cart.icon}
        </button>
        <span class="quantity-prod"
          style="
            --bgColorQa: ${cart.bgColor};
            --colorQua: ${cart.color};
          "
        >
          ${quantity}
        </span>
    `;
}
import { templateStore } from "../store/template-store.js";
import { renderCartContent } from "../popup/content/cart.js";
import { renderBasePopup } from "../popup/base.js";
import { closePopupContainerTemplate } from "../popup/close-popup.js";
$(document).ready(async function () {
  const $wrapHomeTemp = $(".wrap-home-templates");
  const isMobile = $(window).width() <= 768;

  // get data store
  // cart user open popup
  $wrapHomeTemp.on("click", ".cart-user button", async function (e) {
    await templateStore.getState().getDataSetting();

    const { dataBooking, dataCart, currencyDeposit } = templateStore.getState();
    e.stopPropagation();
    let width = 720;
    let height = 620;
    if (isMobile) {
      width = "100%";
    }
    const isItemOrder = dataBooking.users.some((user) =>
      user.services.some((service) => service.itemService.length > 0)
    );
    // Nếu có item service được chọn
    if (isItemOrder) {
      dataCart.order = dataBooking.users
        .map((user) => {
          return user.services.map((service) => {
            return service.itemService;
          });
        })
        .flat(Infinity);
    }
    const htmlPopupCartContent = renderCartContent(dataCart, currencyDeposit);
    const html = renderBasePopup(htmlPopupCartContent, false, height, width);
    $wrapHomeTemp.append(html);

    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });

  // 1. Đóng / persitent khi click overlay-screen
  $wrapHomeTemp.on("click", ".overlay-screen", function (e) {
    const $this = $(this);
    const $popupContainerTemplate = $this.find(".popup-container-template");
    const isPersit = $this.hasClass("persistent");
    if (e.target === this && isPersit) {
      shakeError($popupContainerTemplate);
    } else if (e.target === this) closePopupContainerTemplate();
  });
  // 2. Đóng khi click btn 'back'
  $wrapHomeTemp.on("click", ".btn-back-order", function () {
    closePopupContainerTemplate();
  });

  // 3. Đóng khi click btn close 'x'
  $wrapHomeTemp.on("click", ".btn-closepopup", function () {
    closePopupContainerTemplate();
  });
});
