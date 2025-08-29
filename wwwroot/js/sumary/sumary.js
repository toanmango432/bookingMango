import { showScrollToFinalBooking } from "../scroll-quickly/scroll-quickly.js";
// render sumary

// Refactor Data
function buildServiceSummary(data, listDataService) {
  const dataService = data.services;

  const images = data.images ? data.images : [];
  if (!Array.isArray(dataService)) return [];

  const listServiceUser = dataService
    .map((service) => {
      const foundService = listDataService.find(
        (s) => s.item.id === service.idService
      );
      if (!foundService) return null;

      const serviceInfo = {
        services: {
          id: foundService.item.id,
          nameService: foundService.item.value,
        },
        itemService: service.itemService
          .map((item) => {
            const matchedItem = foundService.item.listItem.find(
              (i) => i.id === item.idItemService
            );
            if (!matchedItem) return null;

            return {
              title: matchedItem.title,
              subTitle: matchedItem.subTitle,
              priceRental: matchedItem.priceRental,
              timetext: matchedItem.timetext,
              selectedStaff: item.selectedStaff,
              optionals: item.optionals ?? [],
              idItemService: item.idItemService,
            };
          })
          .filter(Boolean),
      };

      return serviceInfo;
    })
    .filter(Boolean);

  return {
    listServiceUser,
    images,
  };
}
export function renderSumary(dataBooking, listDataService) {
  const $containerSumary = $(".wrap-sumary");
  $containerSumary.empty();
  // Kiểm tra có user tất cả user chọn xong servce và timming
  const allSelected = dataBooking.users.every((user) => {
    return (
      Array.isArray(user.services) &&
      user.services.length > 0 &&
      user.services.every(
        (service) =>
          Array.isArray(service.itemService) &&
          service.itemService.length > 0 &&
          service.itemService.every(
            (item) =>
              item.selectedStaff &&
              item.selectedStaff.selectedDate &&
              item.selectedStaff.selectedTimeSlot
          )
      )
    );
  });
  if (!allSelected) {
    $containerSumary.append("");
    return;
  }

  const isAllowConfirm = showScrollToFinalBooking(dataBooking);
  const owner = dataBooking.users[0];

  // Kiểm tra mảng users
  const hasUserWithService = dataBooking.users.some(
    (user) => Array.isArray(user.services) && user.services.length > 0
  );

  if (!Array.isArray(dataBooking.users) || !hasUserWithService) {
    return ``;
  }

  // hàm tính tiền tạm thời, do data chưa chuẩn
  function parsePrice(priceStr) {
    // Bỏ ký tự $ và chuyển sang số
    if (typeof priceStr === "number") return priceStr;
    return parseFloat(priceStr.replace("$", "")) || 0;
  }

  function parseTime(timeStr) {
    if (!timeStr) return 0;
    if (typeof timeStr === "number") return timeStr;
    return parseInt(timeStr.replace(/[^0-9]/g, "")) || 0;
  }

  function getTotalPrice(service) {
    const basePrice = parsePrice(service.priceRental);

    const optionalTotal = (service.optionals || []).reduce((sum, opt) => {
      return sum + parsePrice(opt.price);
    }, 0);

    const total = basePrice + optionalTotal;

    return total.toFixed(2);
  }

  let totalPayment = 0;

  const htmlSumary = `
      <div id="section-booking" class="container-sumary">
        <div class="header-sumary">
          <h2 class="title-header-sumary text-uppercase">Booking sumary</h2>
          <p class="sub-time-sumary">14:00, Thu, May 14 2025</p>
        </div>
        <div class="wrap-list-sumary">
        ${dataBooking.users
          .map((userBooking) => {
            const dataRefact = buildServiceSummary(
              userBooking,
              listDataService
            );
            // tính tổng bản ghi, tổng tiền và tổng time
            let totalServices = 0;
            let totalMinutes = 0;
            let userTotalPayment = 0;

            if (
              dataRefact.listServiceUser &&
              Array.isArray(dataRefact.listServiceUser)
            ) {
              dataRefact.listServiceUser.forEach((item) => {
                item.itemService.forEach((is) => {
                  totalServices += 1;

                  // Tính thời gian chính
                  totalMinutes += parseTime(is.timetext);

                  // Cộng thêm thời gian optional nếu có
                  const optionalMins = (is.optionals || []).reduce(
                    (sum, opt) => {
                      return sum + parseTime(opt.timedura);
                    },
                    0
                  );
                  totalMinutes += optionalMins;

                  // cộng tiền service + optionals
                  userTotalPayment += Number(getTotalPrice(is) || 0);
                });
              });
            }
            // save total amount
            // cộng dồn vào tổng của cả booking
            totalPayment += userTotalPayment;
            return `
            <div class="item-sumary" data-id="${userBooking.id}">
              <div class="top-item-sumary">
                <div class="left-top-item-sumary">
                  <div class="user-book">
                    <h2>${
                      userBooking.firstName ? userBooking.firstName : "Not Name"
                    }</h2>
                  </div>
                  <button class="edit-sumary">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <span>Edit</span>
                  </button>
                  ${
                    owner.id !== userBooking.id
                      ? `
                      <button class="delete-sumary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                          <path d="M14.8359 10.7598V17.7598M10.8359 10.7598V17.7598M6.83594 6.75977V18.5598C6.83594 19.6799 6.83594 20.2395 7.05392 20.6674C7.24567 21.0437 7.55141 21.3502 7.92773 21.542C8.35514 21.7598 8.91493 21.7598 10.0328 21.7598H15.639C16.7569 21.7598 17.3159 21.7598 17.7433 21.542C18.1197 21.3502 18.4264 21.0437 18.6182 20.6674C18.8359 20.24 18.8359 19.6808 18.8359 18.5629V6.75977M6.83594 6.75977H8.83594M6.83594 6.75977H4.83594M8.83594 6.75977H16.8359M8.83594 6.75977C8.83594 5.82788 8.83594 5.36217 8.98818 4.99463C9.19117 4.50457 9.58026 4.11499 10.0703 3.91201C10.4379 3.75977 10.9041 3.75977 11.8359 3.75977H13.8359C14.7678 3.75977 15.2338 3.75977 15.6013 3.91201C16.0914 4.11499 16.4806 4.50457 16.6836 4.99463C16.8358 5.36217 16.8359 5.82788 16.8359 6.75977M16.8359 6.75977H18.8359M18.8359 6.75977H20.8359" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Delete
                      </button>
                    `
                      : ""
                  }
                </div>
                <div class="right-top-item-sumary">
                  <button class="btn-upload-image">Upload Image ${
                    dataRefact.images.length !== 0
                      ? `(${dataRefact.images.length})`
                      : ""
                  }</button>
                </div>
              </div>
              <div class="body-item-sumary">
                ${
                  dataRefact.listServiceUser &&
                  dataRefact.listServiceUser
                    .map((item) => {
                      const services = item.services;
                      const itemService = item.itemService;
                      return itemService
                        .map((is) => {
                          return `
                      <div class="wrap-item-content" data-id=${
                        services.id
                      } data-id-item=${is.idItemService}>
                        <div class="item-content">
                          <div class="p-wrap">
                          <p class="text-name-service">${is?.title}</p>
                          <p class="text-name-tech">${
                            is.selectedStaff?.nickName
                          }</p>
                          <p class="text-time-dura">${is?.timetext}</p>
                          <p class="text-price-serice">$ ${getTotalPrice(
                            is
                          )}</p>
                          <div class="action-item-ser">
                            ${
                              /*
                            <p class="edit-item-ser">
                              <i class="fa-solid fa-pen-to-square"></i>
                            </p>
                              */ ""
                            }
                            <p class="delete-item-ser">
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M14.8359 10.7598V17.7598M10.8359 10.7598V17.7598M6.83594 6.75977V18.5598C6.83594 19.6799 6.83594 20.2395 7.05392 20.6674C7.24567 21.0437 7.55141 21.3502 7.92773 21.542C8.35514 21.7598 8.91493 21.7598 10.0328 21.7598H15.639C16.7569 21.7598 17.3159 21.7598 17.7433 21.542C18.1197 21.3502 18.4264 21.0437 18.6182 20.6674C18.8359 20.24 18.8359 19.6808 18.8359 18.5629V6.75977M6.83594 6.75977H8.83594M6.83594 6.75977H4.83594M8.83594 6.75977H16.8359M8.83594 6.75977C8.83594 5.82788 8.83594 5.36217 8.98818 4.99463C9.19117 4.50457 9.58026 4.11499 10.0703 3.91201C10.4379 3.75977 10.9041 3.75977 11.8359 3.75977H13.8359C14.7678 3.75977 15.2338 3.75977 15.6013 3.91201C16.0914 4.11499 16.4806 4.50457 16.6836 4.99463C16.8358 5.36217 16.8359 5.82788 16.8359 6.75977M16.8359 6.75977H18.8359M18.8359 6.75977H20.8359" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </p>
                          </div>
                          </div>
                        </div>
                      </div>
                    `;
                        })
                        .join("");
                    })
                    .join("")
                }
              </div>
              <div class="total-pay">
                <p class="text-total-amount">Total (${totalServices})</p>
                <p class="text-total-times">${totalMinutes} min</p>
                <p class="text-total-price">$ ${userTotalPayment.toFixed(2)}</p>
                <div class="action-item-ser"></div>
              </div>
            </div>
          `;
          })
          .join("")}
        </div>
        <div class="confirm-booking">
          <button class="btn-confirm-booking" ${
            isAllowConfirm ? "" : "disabled"
          }>
            Confirm
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

  // gán totalPayment cho dataBooking
  dataBooking.totalAmount = totalPayment;
  $containerSumary.append(htmlSumary);
}
