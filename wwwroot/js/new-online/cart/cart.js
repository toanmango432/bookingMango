export function Cart() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);

  let totalCash = 0;
  let totalCard = 0;

  // render từng user
  const userHtml = user.services
    .map((cate) => {
      return cate.itemService
        .map((srv) => {
          const staffName = srv.selectedStaff?.nickName || "Select Tech";
          const price = srv.price || 0;
          const duration = srv.duration || 0;

          totalCash += price;
          totalCard += price;

          // render optionals
          const optionalsHtml = srv.optionals
            .map((opt) => {
              const optPrice = opt.price || 0;
              const priceAfterDiscount = opt.priceDiscount
                ? optPrice - opt.priceDiscount
                : optPrice;

              totalCash += priceAfterDiscount;
              totalCard += optPrice;

              return `
                  <div class="cart-addon">
                    <span class="addon-title">${opt.title}</span>
                    <span class="addon-price">
                      <span class="cash">$${priceAfterDiscount.toFixed(
                        2
                      )}</span> |
                      <span class="card">$${optPrice.toFixed(2)}</span>
                    </span>
                    ${
                      opt.priceDiscount
                        ? `<div class="addon-discount">Discount ($${opt.priceDiscount})</div>`
                        : ""
                    }
                  </div>
                `;
            })
            .join("");

          return `
              <div class="cart-item">
                <div class="cart-item-header">
                  <div class="cart-title">${srv.title}</div>
                  <div class="cart-prices">
                    <span class="cash">$${price.toFixed(2)}</span> |
                    <span class="card">$${price.toFixed(2)}</span>
                  </div>
                </div>
                <div class="cart-staff">${staffName}</div>
                ${optionalsHtml}
                <button class="btn-addons">+ ADD-ONS</button>
              </div>
            `;
        })
        .join("");
    })
    .join("");

  const totalItems = (user?.services || []).reduce(
    (sum, cate) => sum + (cate.itemService?.length || 0),
    0
  );
  const htmlCart = `
    <div class="overlay-nav-cart">
      <div class="wrap-cart">
        <div class="cart">
          <button>
            <span class="quantity">${totalItems || 0}</span>
            <i class="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
        <div class="content-cart">
          ${userHtml}
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
  console.log("cartHTML: ", htmlCart);
  $(".content-choose-sertech .overlay-nav-cart").remove(); // xoá trước khi append mới
  $(".content-choose-sertech").append(htmlCart);
}

// import store
import { salonStore } from "../../store/new-online-store.js";

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
});
