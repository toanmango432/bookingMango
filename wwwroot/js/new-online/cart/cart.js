export function Cart(isOpen = false) {
  const store = salonStore.getState();
  const dataServices = store.dataServices;
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);

  let totalCash = 0;
  let totalCard = 0;
  const userHtml = user.services
    .map((cate) =>
      cate.itemService
        .map((srv) => {
          const staffName = srv.selectedStaff?.nickName || "Select Tech";
          const price = srv.price || 0;
          const duration = srv.duration || 0;

          totalCash += price;
          totalCard += price;

          const optionalsHtml = srv.optionals
            .map((opt, i) => {
              const optPrice = opt.price || 0;
              const priceAfterDiscount = opt.priceDiscount
                ? optPrice - opt.priceDiscount
                : optPrice;

              totalCash += priceAfterDiscount;
              totalCard += optPrice;

              return `
                <div class="cart-addon-wrapper">
                  ${
                    i === 0
                      ? `<svg class="first" xmlns="http://www.w3.org/2000/svg" width="19" height="64" viewBox="0 0 19 64" fill="none">
                          <path d="M1.47953 0.960938C1.47953 0.684795 1.25567 0.460938 0.979526 0.460938C0.703384 0.460938 0.479526 0.684795 0.479526 0.960938H0.979526H1.47953ZM0.979526 49.8352L1.47953 49.8352V49.8352H0.979526ZM6.27558 60.901L6.2501 61.4004L6.27558 60.901ZM12.6879 60.901C12.6879 62.3738 13.8818 63.5677 15.3545 63.5677C16.8273 63.5677 18.0212 62.3738 18.0212 60.901C18.0212 59.4283 16.8273 58.2344 15.3545 58.2344C13.8818 58.2344 12.6879 59.4283 12.6879 60.901ZM0.979526 0.960938H0.479526V49.8352H0.979526H1.47953V0.960938H0.979526ZM0.979526 49.8352L0.479526 49.8352C0.479511 52.5588 0.397253 55.3522 1.04881 57.4821C1.38013 58.5651 1.91119 59.5181 2.76904 60.2171C3.62901 60.9179 4.77 61.3249 6.2501 61.4004L6.27558 60.901L6.30106 60.4017C4.98036 60.3343 4.05894 59.9782 3.40074 59.4419C2.74043 58.9038 2.29756 58.1456 2.00507 57.1895C1.40899 55.2411 1.47951 52.6444 1.47953 49.8352L0.979526 49.8352ZM6.27558 60.901L6.2501 61.4004C8.90737 61.536 11.9834 61.401 15.3545 61.401V60.901V60.401C11.9165 60.401 8.92761 60.5357 6.30106 60.4017L6.27558 60.901Z" fill="#707070"/>
                        </svg>`
                      : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="94" viewBox="0 0 18 94" fill="none">
                          <path d="M1.31546 0.960938C1.31546 0.684795 1.09161 0.460938 0.815464 0.460938C0.539321 0.460938 0.315464 0.684795 0.315464 0.960938H0.815464H1.31546ZM0.815464 74.2723L1.31546 74.2723V74.2723H0.815464ZM6.11152 90.8711L6.07336 91.3696L6.11152 90.8711ZM12.5238 90.8711C12.5238 92.3438 13.7177 93.5377 15.1905 93.5377C16.6632 93.5377 17.8571 92.3438 17.8571 90.8711C17.8571 89.3983 16.6632 88.2044 15.1905 88.2044C13.7177 88.2044 12.5238 89.3983 12.5238 90.8711ZM0.815464 0.960938H0.315464V74.2723H0.815464H1.31546V0.960938H0.815464ZM0.815464 74.2723L0.315464 74.2723C0.315448 78.3926 0.236331 82.5016 0.872963 85.6231C1.19239 87.1893 1.7015 88.563 2.53384 89.5804C3.38136 90.6163 4.53974 91.2522 6.07336 91.3696L6.11152 90.8711L6.14967 90.3725C4.8825 90.2756 3.97847 89.7669 3.30782 88.9472C2.622 88.1089 2.15719 86.9158 1.85279 85.4233C1.24179 82.4274 1.31545 78.4513 1.31546 74.2723L0.815464 74.2723ZM6.11152 90.8711L6.07336 91.3696C8.73824 91.5736 11.836 91.3711 15.1905 91.3711V90.8711V90.3711C11.7357 90.3711 8.76861 90.573 6.14967 90.3725L6.11152 90.8711Z" fill="#707070"/>
                        </svg>`
                  }
                  <div class="cart-addon" data-addon-id="${opt.id}">
                    <button class="btn-remove-addon">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                    <div class="d-price-discount-addon">
                      <div class="d-title-price">
                        <span class="addon-title">${opt.title}</span>
                        <span class="addon-price">
                          <span class="cashser-in-cart">$${priceAfterDiscount.toFixed(
                            2
                          )}</span> |
                          <span class="cardser-in-cart">$${optPrice.toFixed(
                            2
                          )}</span>
                        </span>
                      </div>
                      ${
                        opt.priceDiscount
                          ? `<div class="addon-discount">Discount ($${opt.priceDiscount})</div>`
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
            <div class="cart-item" data-service-id="${
              cate.idService
            }" data-item-service-id="${srv.idItemService}">
              <div class="wrap-header-dura">
                <button class="btn-remove-cart-item">
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="d-wrap-header-dura ${hasAddon ? "has-add-bt" : ""}">
                  <div class="cart-item-header">
                    <div class="cart-title">${srv.title}</div>
                    <div class="cart-prices">
                      <span class="cashaddon-in-cart">$${price.toFixed(
                        2
                      )}</span> |
                      <span class="cardaddon-in-cart">$${price.toFixed(
                        2
                      )}</span>
                    </div>
                  </div>
                  <div class="staff-dura">
                    <div class="cart-staff">${staffName}</div>
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
    <div class="overlay-nav-cart ${isOpen ? "open" : ""}">
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
        <div class="content-cart">
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
          <div class="end-cart">
            <div class="total-cash">
              <span class="left">Total Cash:</span>
              <span class="text-price-cash">$${totalCash.toFixed(2)}</span>
            </div>
            <div class="total-card">
              <span class="left">Total Card:</span>
              <span class="text-price-card">$${totalCard.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  $(".content-choose-sertech .overlay-nav-cart").remove(); // xoá trước khi append mới
  $(".content-choose-sertech").append(htmlCart);
}

// import store
import { salonStore } from "../../store/new-online-store.js";
// import component
import { renderAddonPanel } from "../screen-choose-sertech/screen-choose-service.js";
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
      if (!$(e.target).closest(".content-cart").length) {
        $(".overlay-nav-cart").removeClass("open");
      }
    }
  });
  $(document).on("click", ".btn-remove-cart-item", function () {
    const itemServiceId = $(this).closest(".cart-item").data("item-service-id");
    console.log("itemServiceId: ", itemServiceId);

    salonStore.setState((prev) => {
      const newUsers = prev.dataBooking.users.map((u) => ({
        ...u,
        services: u.services
          .map((cate) => ({
            ...cate,
            itemService: cate.itemService.filter(
              (srv) => srv.idItemService !== itemServiceId
            ),
          }))
          // lọc bỏ cate rỗng
          .filter((cate) => cate.itemService.length > 0),
      }));

      return {
        ...prev,
        dataBooking: { ...prev.dataBooking, users: newUsers },
      };
    });
    console.log("dataBooking: ", salonStore.getState().dataBooking);

    Cart();
  });

  $(document).on("click", ".btn-remove-addon", function () {
    const addonId = $(this).closest(".cart-addon").data("addon-id");

    const store = salonStore.getState();
    const dataBooking = store.dataBooking;

    // tìm user đang chọn
    const user = dataBooking.users.find((u) => u.isChoosing);
    if (!user) return;

    // cập nhật optionals trong user đó
    user.services.forEach((cate) => {
      cate.itemService.forEach((srv) => {
        srv.optionals = srv.optionals.filter(
          (opt) => String(opt.id) !== String(addonId)
        );
      });
    });

    // set lại state
    salonStore.setState({ dataBooking: { ...dataBooking } });

    console.log("updated dataBooking:", dataBooking);

    Cart(true); // render lại giỏ
  });

  // close-cart
  $(document).on("click", ".close-cart", function () {
    $(".overlay-nav-cart").removeClass("open");
  });

  // click add on trong cart
  $(document).on("click", ".btn-addons-in-cart", function () {
    const store = salonStore.getState();
    const dataServices = store.dataServices;

    const serviceId = $(this).closest(".cart-item").data("service-id");
    const itemServiceId = $(this).closest(".cart-item").data("item-service-id");

    const cate = dataServices.find((c) => c.item.id === serviceId);
    const itemService = cate?.item.listItem.find((s) => s.id === itemServiceId);
    let settingPanel = {};
    console.log("itemservice: ", itemService);
    renderAddonPanel(itemService, settingPanel);
    // trigger chờ để transition
    requestAnimationFrame(() => {
      $(".overlay-nav-addOn").addClass("open");
    });
  });
});
