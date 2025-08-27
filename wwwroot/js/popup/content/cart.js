// content popup cart user
export function renderCartContent(dataCart, currency) {
  const { order, noneOrder, btnBack } = dataCart;

  const imgBgCart = `url('/assets/images/background-cart-nail/bg-cart.png')`;
  return `
        <div class="popup-wrap-cart">
          <div class="title-select-services">
            <h2 class="text-uppercase">Services Selected</h2>
          </div>
          <div class="wrap-list-services">
            ${
              order && order.length > 0
                ? order
                    .map((item) => {
                      return `
                      <div class="item-order"
                        style="
                          --bg-image-cart: ${imgBgCart};
                        "
                      >
                        <div class="top-item-order">
                          <div class="title-item-order">
                            <span>${item.title}</span>
                          </div>
                          <div class="right-item-order">
                            <span class="price-item-order">${
                              item.price + " " + currency
                            }</span>
                            <span class="dura-item-order">${
                              item.duration + " " + "min"
                            }</span>
                          </div>
                        </div>
                        <div class="staff-item-order">
                          <img src="${
                            item.selectedStaff.imageFileName
                          }" alt="image staff" class="img-staff-order"/>
                          <span>
                            ${item.selectedStaff.nickName}
                          </span>
                        </div>
                      </div>
                    `;
                    })
                    .join("")
                : `<div class="image-order-none">
                  <img src="${noneOrder.image}" alt="Empty order" class="empty-img-order"/>
                </div>`
            }
          </div>
          <div class="wrap-btn-back-order">
            <div class="btn-back-order"
              style="
              --borderBtnBackOrder: ${btnBack.borderColor};
              --bgBtnBackOrder: ${btnBack.bgColor};
              "
            >
              ${btnBack.text}
            </div>
          </div>
        </div>
      `;
}
