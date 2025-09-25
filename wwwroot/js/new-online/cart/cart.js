export function funcDisPriceItemSerCart(
  { isHidePrice, priceDisplay },
  { basePrice, baseCashPrice }
) {
  if (isHidePrice) {
    return ``;
  }
  if (priceDisplay === "0" || priceDisplay === "1") {
    // Hiển thị giá gốc
    return `<div class="cart-prices">
            <span class="cardaddon-in-cart">$${basePrice.toFixed(2)}</span>
          </div>`;
  } else if (priceDisplay === "2") {
    return `<div class="cart-prices ${isHidePrice ? "hide-price" : ""}">
              <span class="cashaddon-in-cart">$${baseCashPrice.toFixed(
                2
              )}</span>
              <span class="line-ss">|</span>
              <span class="cardaddon-in-cart">$${basePrice.toFixed(2)}</span>
            </div>`;
  }
}
export function funcDisPriceTotal(
  { isHidePrice, priceDisplay },
  { totalCard, totalCash }
) {
  if (priceDisplay === "0") {
    return `<div class="end-cart ${isHidePrice ? "hide-price" : ""}">
                <div class="total-card">
                  <span class="left">Total Card:</span>
                  <span class="text-price-card">$${totalCard.toFixed(2)}</span>
                </div>
              </div>`;
  } else if (priceDisplay === "1" || priceDisplay === "2") {
    return `<div class="end-cart ${isHidePrice ? "hide-price" : ""}">
              <div class="total-cash">
                <span class="left">Total Cash:</span>
                <span class="text-price-cash">$${totalCash.toFixed(2)}</span>
              </div>
              <div class="total-card">
                <span class="left">Total Card:</span>
                <span class="text-price-card">$${totalCard.toFixed(2)}</span>
              </div>
            </div>`;
  }
}
export function renderDisPriceItemAddonCart(
  { isHidePrice, priceDisplay },
  { basePrice, priceCash }
) {
  if (priceDisplay === "0" || priceDisplay === "1") {
    return `<span class="addon-price ${isHidePrice ? "hide-price" : ""}">
              <span class="cardser-in-cart">$${basePrice.toFixed(2)}</span>
            </span>`;
  } else if (priceDisplay === "2") {
    return `<span class="addon-price ${isHidePrice ? "hide-price" : ""}">
              <span class="cashser-in-cart">$${priceCash.toFixed(2)}</span>
              <span class="line-cc">|</span>
              <span class="cardser-in-cart">$${basePrice.toFixed(2)}</span>
            </span>`;
  }
}
export function Cart(isOpen = false, isAddOn = false) {
  const store = salonStore.getState();
  const dataServices = store.dataServices;
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);
  const flowCur = store.flow;
  const isHidePrice = store.isHidePrice;
  const priceDisplay = store.priceDisplay;
  console.log("price: ", priceDisplay);

  let totalCash = 0;
  let totalCard = 0;

  const isMobile = $(window).width() <= 768;
  const userHtml = user.services
    .map((cate) =>
      cate.itemService
        .map((srv) => {
          const staffName = srv.selectedStaff?.nickName || "Select Tech";

          const price = srv.price || 0;
          const priceCash = srv.priceCash || 0;
          const duration = srv.duration || 0;

          totalCard += price;
          totalCash += priceCash;

          const optionalsHtml = srv.optionals
            .map((opt, i) => {
              const optPrice = opt.price || 0;
              const optBasePrice = opt.priceCash || 0;

              totalCard += optPrice;
              totalCash += optBasePrice;

              return `
                <div class="cart-addon-wrapper">
                ${
                  isMobile === false
                    ? i === 0
                      ? `<svg class="first" xmlns="http://www.w3.org/2000/svg" width="19" height="64" viewBox="0 0 19 64" fill="none">
                          <path d="M1.47953 0.960938C1.47953 0.684795 1.25567 0.460938 0.979526 0.460938C0.703384 0.460938 0.479526 0.684795 0.479526 0.960938H0.979526H1.47953ZM0.979526 49.8352L1.47953 49.8352V49.8352H0.979526ZM6.27558 60.901L6.2501 61.4004L6.27558 60.901ZM12.6879 60.901C12.6879 62.3738 13.8818 63.5677 15.3545 63.5677C16.8273 63.5677 18.0212 62.3738 18.0212 60.901C18.0212 59.4283 16.8273 58.2344 15.3545 58.2344C13.8818 58.2344 12.6879 59.4283 12.6879 60.901ZM0.979526 0.960938H0.479526V49.8352H0.979526H1.47953V0.960938H0.979526ZM0.979526 49.8352L0.479526 49.8352C0.479511 52.5588 0.397253 55.3522 1.04881 57.4821C1.38013 58.5651 1.91119 59.5181 2.76904 60.2171C3.62901 60.9179 4.77 61.3249 6.2501 61.4004L6.27558 60.901L6.30106 60.4017C4.98036 60.3343 4.05894 59.9782 3.40074 59.4419C2.74043 58.9038 2.29756 58.1456 2.00507 57.1895C1.40899 55.2411 1.47951 52.6444 1.47953 49.8352L0.979526 49.8352ZM6.27558 60.901L6.2501 61.4004C8.90737 61.536 11.9834 61.401 15.3545 61.401V60.901V60.401C11.9165 60.401 8.92761 60.5357 6.30106 60.4017L6.27558 60.901Z" fill="#707070"/>
                        </svg>`
                      : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="99" viewBox="0 0 18 99" fill="none">
                          <path d="M1.31546 0.960938C1.31546 0.684795 1.09161 0.460938 0.815464 0.460938C0.539321 0.460938 0.315464 0.684795 0.315464 0.960938H0.815464H1.31546ZM0.815464 78.3451L1.31546 78.3451V78.3451H0.815464ZM6.11152 95.8661L6.07126 96.3645L6.11152 95.8661ZM12.5238 95.8661C12.5238 97.3388 13.7177 98.5328 15.1905 98.5328C16.6632 98.5328 17.8571 97.3388 17.8571 95.8661C17.8571 94.3933 16.6632 93.1994 15.1905 93.1994C13.7177 93.1994 12.5238 94.3933 12.5238 95.8661ZM0.815464 0.960938H0.315464V78.3451H0.815464H1.31546V0.960938H0.815464ZM0.815464 78.3451L0.315464 78.3451C0.315448 82.6975 0.236602 87.0276 0.871957 90.316C1.19044 91.9643 1.69741 93.4072 2.52563 94.4758C3.36947 95.5645 4.5287 96.2399 6.07126 96.3645L6.11152 95.8661L6.15178 95.3677C4.89354 95.2661 3.99035 94.7332 3.31602 93.8632C2.62608 92.973 2.15913 91.7065 1.8538 90.1262C1.24152 86.9574 1.31545 82.7532 1.31546 78.3451L0.815464 78.3451ZM6.11152 95.8661L6.07126 96.3645C8.7374 96.5798 11.8388 96.3661 15.1905 96.3661V95.8661V95.3661C11.7329 95.3661 8.76945 95.5792 6.15178 95.3677L6.11152 95.8661Z" fill="#707070"/>
                        </svg>`
                    : i === 0
                    ? `<svg class="first" xmlns="http://www.w3.org/2000/svg" width="18" height="49" viewBox="0 0 18 49" fill="none">
                          <path d="M1.34281 1.03516C1.34281 0.759014 1.11895 0.535156 0.842808 0.535156C0.566665 0.535156 0.342808 0.759014 0.342808 1.03516H0.842808H1.34281ZM0.842808 37.6908L1.34281 37.6908V37.6908H0.842808ZM6.13921 45.9902L6.12009 46.4899L6.13921 45.9902ZM12.5521 45.9902C12.5521 47.463 13.746 48.6569 15.2188 48.6569C16.6915 48.6569 17.8854 47.463 17.8854 45.9902C17.8854 44.5175 16.6915 43.3236 15.2188 43.3236C13.746 43.3236 12.5521 44.5175 12.5521 45.9902ZM0.842808 1.03516H0.342808V37.6908H0.842808H1.34281V1.03516H0.842808ZM0.842808 37.6908L0.342808 37.6908C0.3428 38.7143 0.3234 39.7628 0.383526 40.7389C0.443782 41.717 0.585449 42.6671 0.927295 43.5051C1.27365 44.3542 1.82494 45.086 2.68758 45.6132C3.54179 46.1352 4.66442 46.4342 6.12009 46.4899L6.13921 45.9902L6.15833 45.4906C4.81301 45.4391 3.8731 45.1657 3.20904 44.7599C2.55341 44.3593 2.13072 43.8077 1.85322 43.1274C1.57121 42.4361 1.43914 41.6109 1.38163 40.6774C1.324 39.7417 1.3428 38.7422 1.34281 37.6908L0.842808 37.6908ZM6.13921 45.9902L6.12009 46.4899C8.7737 46.5914 11.839 46.4902 15.2188 46.4902V45.9902V45.4902C11.7888 45.4902 8.78888 45.5912 6.15833 45.4906L6.13921 45.9902Z" fill="#707070"/>
                        </svg>`
                    : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="74" viewBox="0 0 18 74" fill="none">
                        <path d="M1.34281 1C1.34281 0.723858 1.11895 0.5 0.842808 0.5C0.566665 0.5 0.342808 0.723858 0.342808 1H0.842808H1.34281ZM0.842808 58.0199L1.34281 58.0199V58.0199H0.842808ZM6.13921 70.9301L6.1095 71.4292L6.13921 70.9301ZM12.5521 70.9301C12.5521 72.4029 13.746 73.5968 15.2188 73.5968C16.6915 73.5968 17.8854 72.4029 17.8854 70.9301C17.8854 69.4574 16.6915 68.2634 15.2188 68.2634C13.746 68.2634 12.5521 69.4574 12.5521 70.9301ZM0.842808 1H0.342808V58.0199H0.842808H1.34281V1H0.842808ZM0.842808 58.0199L0.342808 58.0199C0.342792 61.2103 0.261993 64.4393 0.906611 66.8975C1.23227 68.1393 1.75382 69.2343 2.60382 70.0424C3.46229 70.8585 4.6118 71.3401 6.1095 71.4292L6.13921 70.9301L6.16892 70.431C4.86563 70.3534 3.95259 69.9448 3.29281 69.3176C2.62454 68.6823 2.1721 67.781 1.8739 66.6438C1.27081 64.344 1.34279 61.2847 1.34281 58.0199L0.842808 58.0199ZM6.13921 70.9301L6.1095 71.4292C8.76948 71.5875 11.8529 71.4301 15.2188 71.4301V70.9301V70.4301C11.7749 70.4301 8.7931 70.5872 6.16892 70.431L6.13921 70.9301Z" fill="#707070"/>
                      </svg>`
                }
                  <div
                    class="cart-addon"
                    data-addon-id="${opt.id}"
                    data-service-instance-id="${
                      srv.serviceInstanceId || "undefined"
                    }"
                  >
                    <button class="btn-remove-addon">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                    <div class="d-price-discount-addon">
                      <div class="d-title-price">
                        <span class="addon-title">${opt.title}</span>
                        ${renderDisPriceItemAddonCart(
                          { isHidePrice, priceDisplay },
                          {
                            basePrice: optPrice,
                            priceCash: optBasePrice,
                          }
                        )}
                      </div>
                      ${
                        opt.priceDiscount
                          ? `<div class="addon-discount ${
                              isHidePrice ? "hide-price" : ""
                            }">Discount ($${opt.priceDiscount})</div>`
                          : ""
                      }
                    </div>
                  </div>
                </div>`;
            })
            .join("");

          // check addon
          const hasAddon = dataServices.some((c) =>
            c.item.listItem.some(
              (x) => x.id === srv.idItemService && x.listOptionAddOn?.length
            )
          );

          // block HTML khép kín
          return `
            <div
              class="cart-item"
              data-service-id="${cate.idService}"
              data-item-service-id="${srv.idItemService}"
              data-service-instance-id="${srv.serviceInstanceId || "undefined"}"
            >
              <div class="wrap-header-dura">
                <button class="btn-remove-cart-item">
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="d-wrap-header-dura ${hasAddon ? "has-add-bt" : ""}">
                  <div class="cart-item-header">
                    <div class="cart-title">${srv.title}</div>
                    ${funcDisPriceItemSerCart(
                      { isHidePrice, priceDisplay },
                      { basePrice: price, baseCashPrice: priceCash }
                    )}
                  </div>
                  <div class="staff-dura">
                    <div id="${
                      flowCur === SelecteFlow.SER
                        ? "select-tech-in-cart"
                        : "select-service-in-cart"
                    }"
                      class="cart-staff"
                      data-id-cate=${cate.idService}
                      data-id-selected=${srv.idItemService}
                      data-id-selected-instance=${
                        srv.serviceInstanceId || "undefined"
                      }
                    >
                      ${staffName}
                    </div>
                    <div class="cart-duration">${duration} mins</div>
                  </div>
                </div>
              </div>
              ${optionalsHtml}
              ${
                hasAddon
                  ? `
                    <div class="d-btn-addons-in-cart">
                      <button class="btn-addons-in-cart">
                        <i class="fa-solid fa-plus"></i>
                        ADD-ONS
                      </button>
                    </div>
                  `
                  : ""
              }
            </div>`;
        })
        .join("")
    )
    .join("");

  const totalItems = (user?.services || []).reduce(
    (sum, cate) => sum + (cate.itemService?.length || 0),
    0
  );
  const htmlCart = `
    <div class="overlay-nav-cart ${isOpen ? "open" : ""} ${
    isAddOn ? "addon-pan" : ""
  }">
      <div class="wrap-cart">
        <div class="cart">
          <button>
            <span class="quantity">${totalItems || 0}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <g clip-path="url(#clip0_3941_98119)">
                <path d="M23.5619 7.99442H20.2719L15.318 1.25357C15.2451 1.15432 15.1533 1.07041 15.0479 1.00663C14.9426 0.942845 14.8257 0.900445 14.7039 0.881847C14.5822 0.863249 14.4579 0.868816 14.3383 0.898232C14.2187 0.927648 14.1061 0.980338 14.0068 1.05329C13.9076 1.12611 13.8237 1.21777 13.76 1.32303C13.6962 1.4283 13.6538 1.54509 13.6352 1.66675C13.6166 1.7884 13.6221 1.91253 13.6515 2.03203C13.6809 2.15154 13.7336 2.26408 13.8065 2.36322L17.9444 7.99636H7.08902L11.2282 2.36322C11.375 2.16279 11.4363 1.91228 11.3987 1.66669C11.361 1.42109 11.2274 1.20048 11.0272 1.05329C10.9281 0.980373 10.8155 0.92771 10.696 0.898311C10.5765 0.868913 10.4524 0.863355 10.3308 0.881956C10.2091 0.900556 10.0923 0.942951 9.98704 1.00671C9.88178 1.07048 9.79012 1.15436 9.7173 1.25357L4.76342 7.99442H1.43837C1.31523 7.99433 1.1933 8.01851 1.07951 8.06557C0.965729 8.11263 0.862335 8.18166 0.775235 8.26869C0.688136 8.35573 0.619036 8.45908 0.571895 8.57284C0.524754 8.68659 0.500488 8.80852 0.500488 8.93165V12.6819C0.500488 12.9306 0.599308 13.1692 0.775196 13.3451C0.951083 13.521 1.18962 13.6198 1.43837 13.6198H2.07033L3.02247 21.5662C3.13195 22.4772 3.57131 23.3165 4.25752 23.9255C4.94373 24.5346 5.82926 24.8712 6.74678 24.8718H18.3313C19.2535 24.8725 20.1435 24.5331 20.8311 23.9186C21.5186 23.304 21.9553 22.4574 22.0576 21.5409C22.0714 21.4185 22.0609 21.2946 22.0268 21.1762C21.9927 21.0579 21.9356 20.9474 21.8589 20.8511C21.782 20.7548 21.687 20.6746 21.5792 20.615C21.4714 20.5554 21.3529 20.5176 21.2305 20.5039C21.1081 20.4901 20.9842 20.5005 20.8658 20.5346C20.7475 20.5687 20.637 20.6258 20.5407 20.7026C20.4444 20.7794 20.3642 20.8744 20.3046 20.9822C20.245 21.09 20.2073 21.2085 20.1935 21.3309C20.1423 21.7891 19.924 22.2123 19.5803 22.5197C19.2366 22.827 18.7917 22.9968 18.3307 22.9967H6.74354C6.28556 22.9961 5.84365 22.8279 5.5011 22.5239C5.15856 22.2199 4.93905 21.8011 4.88398 21.3465L3.95647 13.6204L3.64924 11.7453H2.37496V9.87018H22.6234V11.7453H22.1049C21.8742 11.745 21.6516 11.8298 21.4796 11.9835C21.3076 12.1372 21.1984 12.349 21.1729 12.5782L20.6848 16.926C20.6709 17.0484 20.6813 17.1724 20.7154 17.2908C20.7494 17.4092 20.8065 17.5197 20.8833 17.616C20.9601 17.7124 21.0552 17.7926 21.163 17.8521C21.2709 17.9117 21.3894 17.9494 21.5118 17.9631C21.5467 17.967 21.5818 17.969 21.6168 17.9689C21.8471 17.9685 22.0692 17.8834 22.2409 17.7298C22.4125 17.5762 22.5217 17.3649 22.5476 17.136L22.9423 13.6211H23.5581C23.8068 13.6211 24.0454 13.5223 24.2213 13.3464C24.3971 13.1705 24.4959 12.9319 24.4959 12.6832V8.93295C24.4961 8.68476 24.3979 8.44663 24.2229 8.27072C24.0478 8.0948 23.8101 7.99544 23.5619 7.99442Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_3941_98119">
                  <rect width="24" height="24.0006" fill="white" transform="translate(0.5 0.871094)"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div class="content-cart ${isAddOn ? "addon-pan" : ""}">
          <button class="close-cart">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="info-userbooking">
            <div class="name-booking text-uppercase">No infor</div>
            <div class="phone-owner">No Phone</div>
          </div>
          <div class="wrap-cart-item">
            ${userHtml}
          </div>
          ${funcDisPriceTotal(
            { isHidePrice, priceDisplay },
            { totalCard, totalCash }
          )}
        </div>
      </div>
    </div>
  `;
  $(".content-choose-sertech .overlay-nav-cart").remove(); // xoá trước khi append mới
  if (isMobile) {
    requestAnimationFrame(() => {
      $(".header-sertech").append(htmlCart);
    });
  } else {
    requestAnimationFrame(() => {
      $(".content-choose-sertech").append(htmlCart);
    });
  }
}

// import store
import { salonStore } from "../../store/new-online-store.js";
// import constant
import { PageCurrent } from "../../constants/new-online.js";
import { SelecteFlow } from "../../constants/new-online.js";
// import component
import { renderServices } from "../screen-choose-sertech/screen-choose-service.js";
import { renderAddonPanel } from "../screen-choose-sertech/screen-choose-service.js";
import {
  renderFooterTech_PageChooseOnlyTech,
  renderListStaff_PageChooseOnlyTech,
} from "../screen-choose-sertech/choose-tech-for-service/choose-tech-for-service.js";
import {
  renderFooterFor_PageChooseEachTech,
  renderListPeSer,
  renderListStaff_PageChoseEachSer,
} from "../screen-choose-sertech/choose-tech-for-each-service/choose-tech-for-each-service.js";
import { renderListPeTech_PageChooseServiceTech } from "../screen-choose-sertech/choose-service-for-tech/choose-service-for-tech.js";
import { renderServices_PageChooseServiceTech } from "../screen-choose-sertech/choose-service-for-tech/choose-service-for-tech.js";
import { ChooseTechForEachServices } from "../screen-choose-sertech/choose-tech-for-each-service/choose-tech-for-each-service.js";
import { renderSumary } from "../summary/summary.js";
import { ChooseTechForServices } from "../screen-choose-sertech/choose-tech-for-service/choose-tech-for-service.js";
$(document).ready(async function () {
  // Toggle giỏ hàng
  $(document).on("click", ".cart button", function (e) {
    e.stopPropagation(); // tránh bị đóng ngay khi click vào chính nút
    $(".overlay-nav-cart").toggleClass("open");
  });
  // Click ra ngoài content-cart thì đóng
  $(document).on("click", function (e) {
    if ($(".overlay-nav-cart").hasClass("open")) {
      // Nếu click không nằm trong .content-cart
      if (!$(e.target).closest(".content-cart, .addon-panel").length) {
        $(".overlay-nav-cart").removeClass("open");
      }
    }
  });
  $(document).on("click", ".btn-remove-cart-item", function () {
    // 1. Xoá item cart khi ở page CHOOSE_SERVICE
    const store = salonStore.getState();
    const pageCurrent = store.pageCurrent;
    const listStaffUser = store.listStaffUser;
    const dataService = store.dataServices;

    // xử lý chung khi xoá
    const itemServiceId = $(this).closest(".cart-item").data("item-service-id");
    const instanceId = $(this)
      .closest(".cart-item")
      .data("service-instance-id");

    const dataBooking = store.dataBooking;
    // Tìm user đang chọn
    const user = dataBooking.users.find((u) => u.isChoosing);
    if (!user) return;

    // Cập nhật itemService trong user đó
    user.services.forEach((cate) => {
      cate.itemService = cate.itemService.filter((item) => {
        if (instanceId !== "undefined") {
          // xoá đúng instance
          return item.serviceInstanceId !== instanceId;
        }
        // fallback theo id
        return item.idItemService !== itemServiceId;
      });
    });
    // set lại store
    salonStore.setState({ ...store, dataBooking: { ...dataBooking } });
    Cart(true);

    if (pageCurrent === PageCurrent.CHOOSE_SERVICE) {
      // Load lại service khi thay đổi item service
      const cateId = $(".item-cate.active").data("id");
      const cate = store.dataServices;
      const currentCate = cate.find((c) => c.item.id === cateId);
      renderServices(currentCate.item.listItem);
    } else if (pageCurrent === PageCurrent.CHOOSE_ONLY_TECH) {
      // render lại listStaff khi xoá
      const listStaffUser = store.listStaffUser;
      renderListStaff_PageChooseOnlyTech(listStaffUser);
      renderFooterTech_PageChooseOnlyTech();
    } else if (pageCurrent === PageCurrent.CHOOSE_TECH_FOR_SERVICE) {
      renderListPeSer(true);
      renderListStaff_PageChoseEachSer(listStaffUser);
      renderFooterFor_PageChooseEachTech();
    } else if (pageCurrent === PageCurrent.CHOOSE_SERVICE_FOR_TECH) {
      renderListPeTech_PageChooseServiceTech();
      // khởi tạo lần đầu renderServices_PageChooseServiceTech
      const id = $(".item-ftcate.active").data("id");
      const cate = dataService.find((c) => c.item.id === id);
      renderServices_PageChooseServiceTech(cate?.item.listItem || []);
    } else if (pageCurrent === PageCurrent.SUMMARY) {
      const store = salonStore.getState();
      const databooking = store.dataBooking;
      const dataServices = store.dataServices;

      renderSumary(databooking, dataServices);
      Cart(true);
    }
  });

  $(document).on("click", ".btn-remove-addon", function () {
    const addonId = $(this).closest(".cart-addon").data("addon-id");
    const instanceId = $(this)
      .closest(".cart-addon")
      .data("service-instance-id");

    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    let pageCurrent = store.pageCurrent;
    const dataServices = store.dataServices;

    // tìm user đang chọn
    const user = dataBooking.users.find((u) => u.isChoosing);
    if (!user) return;

    // cập nhật optionals trong user đó
    user.services.forEach((cate) => {
      cate.itemService.forEach((srv) => {
        if (instanceId == "undefined" || srv.serviceInstanceId === instanceId) {
          srv.optionals = srv.optionals.filter(
            (opt) => String(opt.id) !== String(addonId)
          );
        }
      });
    });
    // set lại state
    salonStore.setState({ ...store, dataBooking: { ...dataBooking } });

    Cart(true); // render lại giỏ
    // Khi remove addOn cần render lại ui cần thiết
    // Load lại service khi thay đổi addOn
    let cateId =
      $(".item-cate.active").data("id") || $(".item-ftcate.active").data("id");

    if (cateId) {
      const cate = store.dataServices;
      const currentCate = cate.find((c) => c.item.id === cateId);
      renderServices(currentCate.item.listItem);
    }
    // render lại theo page
    if (pageCurrent === PageCurrent.CHOOSE_SERVICE_FOR_TECH) {
      renderListPeTech_PageChooseServiceTech();
      // khởi tạo lần đầu renderServices_PageChooseServiceTech
      const id = $(".item-ftcate.active").data("id");
      const cate = dataServices.find((c) => c.item.id === id);
      renderServices_PageChooseServiceTech(cate?.item.listItem || []);
    } else if (pageCurrent === PageCurrent.SUMMARY) {
      const addonId = $(this).closest(".wrap-item-addon").data("addon-id");
      const instanceId = $(this)
        .closest(".wrap-item-addon")
        .data("service-instance-id");

      const store = salonStore.getState();
      const dataBooking = store.dataBooking;
      const listDataService = store.dataServices;

      // tìm user đang chọn
      const user = dataBooking.users.find((u) => u.isChoosing);
      if (!user) return;

      // cập nhật optionals trong user đó
      user.services.forEach((cate) => {
        cate.itemService.forEach((srv) => {
          if (
            instanceId == "undefined" ||
            srv.serviceInstanceId === instanceId
          ) {
            srv.optionals = srv.optionals.filter(
              (opt) => String(opt.id) !== String(addonId)
            );
          }
        });
      });
      // set lại state
      salonStore.setState({ ...store, dataBooking: { ...dataBooking } });

      Cart(); // render lại giỏ
      renderSumary(dataBooking, listDataService);
    }
  });

  // close-cart
  $(document).on("click", ".close-cart", function () {
    $(".overlay-nav-cart").removeClass("open");
  });

  // click add on trong cart
  $(document).on("click", ".btn-addons-in-cart", function () {
    // right
    $(".content-cart").addClass("addon-pan");
    $(".overlay-nav-cart").addClass("addon-pan");
    const store = salonStore.getState();
    const dataServices = store.dataServices;

    const serviceId = $(this).closest(".cart-item").data("service-id");
    const itemServiceId = $(this).closest(".cart-item").data("item-service-id");

    const cate = dataServices.find((c) => c.item.id === serviceId);
    const itemService = cate?.item.listItem.find((s) => s.id === itemServiceId);
    let settingPanel = {};
    renderAddonPanel(itemService);
    // trigger chờ để transition
    requestAnimationFrame(() => {
      $(".overlay-nav-addOn").addClass("open");
    });
  });

  // Chuyển page chọn tech cho service trong cart
  $(document).on("click", "#select-tech-in-cart", async function () {
    const $this = $(this);
    const store = salonStore.getState();
    const isBookMultipleTech = store.isBookMultipleTech;

    if (isBookMultipleTech) {
      // Chuyển page chọn tech cho từng service, chỉ chọn được 1 thợ cho 1 service
      const idCate = $this.data("id-cate");
      const idItemServiceSlected =
        $this.data("id-selected-instance") !== "undefined"
          ? $this.data("id-selected-instance")
          : $this.data("id-selected");

      salonStore.setState({
        ...store,
        pageCurrent: PageCurrent.CHOOSE_TECH_FOR_SERVICE,
      });
      await ChooseTechForEachServices({ idCate, idItemServiceSlected });
    } else {
      // Chuyển tới page chọn duy nhất một thợ
      salonStore.setState({
        ...store,
        pageCurrent: PageCurrent.CHOOSE_ONLY_TECH,
      });

      await ChooseTechForServices();
    }
    return;
  });
  $(document).on("click", "#select-service-in-cart", async function () {});
});
