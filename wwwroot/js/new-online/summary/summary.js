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
  const store = salonStore.getState();
  const $wrapNewOnline = $(".wrap-newonline");
  $wrapNewOnline.empty();
  const salonChoosing = store.salonChoosing;
  console.log("store sum: ", store);

  const htmlHeaderSalon = HeaderSalon(salonChoosing);

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
            (item) => item.selectedStaff,
            user.selectedDate && user.selectedTimeSlot
          )
      )
    );
  });
  if (!allSelected) {
    $wrapNewOnline.append("");
    return;
  }

  const owner = dataBooking.users[0];
  const cardChoosing = dataBooking.cardNumber.find((card) => card.isChoosing);

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

  const isConfim = dataBooking?.isConfirmBook;
  const htmlSumary = `
    <div class="wrap-content-salon bg-choose-time">
      <div class="header-sertech">
        ${htmlHeaderSalon}
      </div>
      <div class="content-choose-sertech">
        <div class="wrap-sumary new-sumary">
            <div id="section-booking" class="container-sumary">
                <div class="wrap-title">
                    <h2 class="title text-uppercase">Booking sumary</h2>
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
                              userTotalPayment += Number(
                                getTotalPrice(is) || 0
                              );
                            });
                          });
                        }
                        // save total amount
                        // cộng dồn vào tổng của cả booking
                        totalPayment += userTotalPayment;
                        return `
                        <div class="item-sumary" data-id="${userBooking.id}">
                          <div class="top-item-sumary">
                            <div class="user-book">
                              <div class="left-info-sum">
                                <h2 class="name">${
                                  userBooking.firstName
                                    ? userBooking.firstName
                                    : "Not Name"
                                }</h2>
                                |
                                <h2 class="phone">${
                                  userBooking?.phoneNumber ||
                                  userBooking?.email ||
                                  "Not info"
                                }</h2>
                              </div>
                              <div class="right-info-sum">
                                <p class="item-right-info">
                                  ${userBooking?.selectedTimeSlot || "N/A"}
                                </p>
                                <p class="item-right-info">
                                  ${
                                    formatDisDay(userBooking?.selectedDate) ||
                                    "N/A"
                                  }
                                </p>
                                <p class="item-right-info">
                                  <button class="edit-sumary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                      <path d="M16.1218 4.45017L14.7017 5.87029C14.5123 6.05963 14.323 6.05963 14.1336 5.87029L10.6306 2.36733C10.4413 2.17798 10.4413 1.98863 10.6306 1.79928L12.0508 0.379161C12.6188 -0.188887 13.5656 -0.188887 14.1336 0.379161L16.0271 2.27265C16.6898 2.93537 16.6898 3.88212 16.1218 4.45017ZM9.39988 3.12472L1.16319 11.3614L0.500467 15.1484C0.405792 15.6218 0.879165 16.0951 1.35254 16.0005L5.13952 15.3377L13.3762 7.10105C13.5656 6.91171 13.5656 6.72236 13.3762 6.53301L9.96792 3.12472C9.77857 2.93537 9.58922 2.93537 9.39988 3.12472ZM4.38212 10.604C4.19277 10.4147 4.19277 10.1306 4.38212 9.94129L9.21053 5.11289C9.39988 4.92354 9.6839 4.92354 9.87325 5.11289C9.96792 5.39691 9.96792 5.68094 9.87325 5.77561L5.04485 10.604C4.8555 10.7934 4.57147 10.7934 4.38212 10.604ZM3.24603 13.2549H4.76082V14.391L2.77266 14.7697L1.82591 13.8229L2.20461 11.8348H3.3407V13.2549H3.24603Z" fill="#505062"/>
                                    </svg>
                                    <span class="text-uppercase">Edit</span>
                                  </button>
                                </p>
                                <p class="item-right-info">
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
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="header-item-sumary">
                              <div class="wrap-header">
                                <p class="item name-service text-uppercase">Services</p>
                                <p class="item name-tech text-uppercase">Tech</p>
                                <p class="item name-dura text-uppercase">Duration</p>
                                <p class="item name-price text-uppercase">Price</p>
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
                                        const optionalsHtml = (
                                          is.optionals || []
                                        )
                                          .map((opt, i) => {
                                            return `
                                              <div
                                                class="wrap-item-addon"
                                                data-addon-id="${opt.id}"
                                                data-service-instance-id="${
                                                  opt.serviceInstanceId ||
                                                  "undefined"
                                                }"
                                              >
                                                <button class="btn-remove-addon">
                                                  <i class="fa-solid fa-xmark"></i>
                                                </button>
                                                ${
                                                  i === 0
                                                    ? `<svg class="first" xmlns="http://www.w3.org/2000/svg" width="27" height="34" viewBox="0 0 27 34" fill="none">
                                                  <path d="M1.8289 1C1.8289 0.723858 1.60504 0.5 1.3289 0.5C1.05276 0.5 0.828898 0.723858 0.828898 1H1.3289H1.8289ZM1.3289 25.4371L1.8289 25.4371V25.4371H1.3289ZM9.69149 30.97L9.68341 31.47L9.69149 30.97ZM21.3607 30.97C21.3607 32.4428 22.5546 33.6367 24.0273 33.6367C25.5001 33.6367 26.694 32.4428 26.694 30.97C26.694 29.4973 25.5001 28.3034 24.0273 28.3034C22.5546 28.3034 21.3607 29.4973 21.3607 30.97ZM1.3289 1H0.828898V25.4371H1.3289H1.8289V1H1.3289ZM1.3289 25.4371L0.828898 25.4371C0.828887 26.0958 0.797077 26.8364 0.896934 27.5208C1.00018 28.2285 1.24812 28.9287 1.83369 29.5348C2.41188 30.1333 3.27625 30.5953 4.52839 30.9184C5.78013 31.2414 7.45189 31.4339 9.68341 31.47L9.69149 30.97L9.69956 30.4701C7.50855 30.4347 5.92372 30.2457 4.77824 29.9501C3.63316 29.6547 2.95969 29.2611 2.55287 28.84C2.15341 28.4265 1.96915 27.9433 1.88646 27.3765C1.80037 26.7864 1.82889 26.1616 1.8289 25.4371L1.3289 25.4371ZM9.69149 30.97L9.68341 31.47C13.8599 31.5375 18.662 31.47 24.0273 31.47V30.97V30.47C18.6408 30.47 13.8663 30.5374 9.69956 30.4701L9.69149 30.97Z" fill="#707070"/>
                                                </svg>`
                                                    : `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="49" viewBox="0 0 27 49" fill="none">
                                                  <path d="M1.29374 1C1.29374 0.723858 1.06988 0.5 0.793742 0.5C0.5176 0.5 0.293742 0.723858 0.293742 1H0.793742H1.29374ZM0.793742 37.6557L1.29374 37.6557V37.6557H0.793742ZM9.15633 45.9551L9.14422 46.4549L9.15633 45.9551ZM20.8255 45.9551C20.8255 47.4278 22.0194 48.6217 23.4922 48.6217C24.9649 48.6217 26.1589 47.4278 26.1589 45.9551C26.1589 44.4823 24.9649 43.2884 23.4922 43.2884C22.0194 43.2884 20.8255 44.4823 20.8255 45.9551ZM0.793742 1H0.293742V37.6557H0.793742H1.29374V1H0.793742ZM0.793742 37.6557L0.293742 37.6557C0.29373 38.6711 0.26283 39.7338 0.358888 40.7214C0.455797 41.7177 0.685136 42.6939 1.23777 43.5519C2.36259 45.2983 4.67723 46.3467 9.14422 46.4549L9.15633 45.9551L9.16844 45.4552C4.79037 45.3491 2.92369 44.3227 2.07848 43.0104C1.64609 42.3391 1.44322 41.5399 1.35419 40.6246C1.26431 39.7005 1.29373 38.7151 1.29374 37.6557L0.793742 37.6557ZM9.15633 45.9551L9.14422 46.4549C13.3232 46.5562 18.1321 46.4551 23.4922 46.4551V45.9551V45.4551C18.1003 45.4551 13.3328 45.5561 9.16844 45.4552L9.15633 45.9551Z" fill="#707070"/>
                                                </svg>`
                                                }
                                                <div class="addon-content">
                                                  <div class="p-wrap addon">
                                                    <p class="item text-name-service name-addon">${
                                                      opt.title
                                                    }</p>
                                                    <p class="item text-time-dura time-dura-addon">${
                                                      opt.timedura || "0 min"
                                                    }</p>
                                                    <p class="item text-price-service price-addon">$ ${(
                                                      opt.price || 0
                                                    ).toFixed(2)}</p>
                                                  </div>
                                                </div>
                                              </div>`;
                                          })
                                          .join("");

                                        return `
                                            <div class="wrap-item-content"
                                              data-id=${services.id}
                                              data-id-item=${is.idItemService}
                                              data-service-instance-id=${
                                                is.serviceInstanceId ||
                                                "undefined"
                                              }
                                            >
                                                <button class="btn-remove-service">
                                                  <i class="fa-solid fa-xmark"></i>
                                                </button>
                                                <div class="item-content">
                                                  <div class="p-wrap">
                                                    <p class="item text-name-service">${
                                                      is?.title
                                                    }</p>
                                                    <p class="item text-name-tech">${
                                                      is.selectedStaff?.nickName
                                                    }</p>
                                                    <p class="item text-time-dura">${
                                                      is?.timetext
                                                    }</p>
                                                    <p class="item text-price-service">$ ${getTotalPrice(
                                                      is
                                                    )}</p>
                                                  </div>
                                                  ${optionalsHtml}
                                              </div>
                                            </div>`;
                                      })
                                      .join("");
                                  })
                                  .join("")
                              }
                          </div>
                          <div class="total-pay">
                              <p class="item text-total-amount">Total (${totalServices})</p>
                              <p class="item text-total-times">${totalMinutes} min</p>
                              <p class="item text-total-price">$ ${userTotalPayment.toFixed(
                                2
                              )}</p>
                          </div>
                        </div>
                    `;
                      })
                      .join("")}
                </div>
                <div class="wrap-bottom-sum">
                  <div class="add-ticket-note">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                      <path d="M10.5002 4H7.7002C6.58009 4 6.01962 4 5.5918 4.21799C5.21547 4.40973 4.90973 4.71547 4.71799 5.0918C4.5 5.51962 4.5 6.08009 4.5 7.2002V16.8002C4.5 17.9203 4.5 18.4801 4.71799 18.9079C4.90973 19.2842 5.21547 19.5905 5.5918 19.7822C6.0192 20 6.57899 20 7.69691 20H17.3031C18.421 20 18.98 20 19.4074 19.7822C19.7837 19.5905 20.0905 19.2839 20.2822 18.9076C20.5 18.4802 20.5 17.921 20.5 16.8031V14M16.5 5L10.5 11V14H13.5L19.5 8M16.5 5L19.5 2L22.5 5L19.5 8M16.5 5L19.5 8" stroke="#2E2E2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <input id="note-ticket" placeholder="Add ticket note..." class="input-note"/>
                  </div>
                  <div class="total-book">
                    <span class="total-1">
                        <span class="total-text">
                          Total
                        </span>
                        <span class="total-value">
                          ${
                            dataBooking.currencyDeposit +
                            dataBooking?.totalAmount
                          }
                        </span>
                    </span>
                    <span class="total-2">
                        <span class="depo-text">
                          Deposit
                        </span>
                        <span class="depo-value">
                          ${
                            dataBooking.currencyDeposit +
                            dataBooking?.paymentDeposit
                          }
                        </span>
                    </span>
                  </div>
                  <div class="checkbox-confirm">
                    <div class="checkbox-confirm-sum">
                      <div class="circle-check">
                        <i class="fa-solid fa-check"></i>
                      </div>
                    </div>
                    <div class="text-checkbox-confirm">
                      Just to confirm, would you like me to process this payment now?
                    </div>
                  </div>
                  <div data-id=${cardChoosing?.id} class="payment-method-item">
                    <div class="wrap-name-method">
                      <div class=""wrap-img-method>
                      </div>
                      <div class="name-numbercard">
                        <span class="name-method">
                          VISA
                        </span>
                        <span class="number-card">
                          ${maskCardNumber(cardChoosing?.last4)}
                        </span>
                      </div>
                    </div>
                    <div class="icon-check">
                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <path d="M11.75 8L8.75 11L7.25 9.5M9.5 16.25C5.77208 16.25 2.75 13.2279 2.75 9.5C2.75 5.77208 5.77208 2.75 9.5 2.75C13.2279 2.75 16.25 5.77208 16.25 9.5C16.25 13.2279 13.2279 16.25 9.5 16.25Z" stroke="#3BA755" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div class="confirm-booking">
                      <button id="back-summary" class="btn-back-sum text-uppercase">Back</button>
                      <button id="add-guest" class="btn-add-guest text-uppercase">Add guest</button>
                      <button ${
                        isConfim ? "" : "disabled"
                      } class="btn-confirm-booking-1 text-uppercase">
                          Book now
                      </button>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    `;
  Cart();
  // gán totalPayment cho dataBooking
  dataBooking.totalAmount = totalPayment;
  $wrapNewOnline.append(htmlSumary);
}

function formatDisDay(date) {
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const formatted = date.toLocaleDateString("en-GB", options);
  return formatted;
}

// import component
import { fetchAPI } from "../../site.js";
import { salonStore } from "../../store/new-online-store.js";
import { HeaderSalon } from "../header/header-salon.js";
import { formatDateMMDDYYYY } from "../../helper/format-day.js";
import { jsonToXml } from "../../helper/xlm-to-json.js";
import { maskCardNumber } from "../../helper/format-card.js";
import { renderPaymentConfirmationForm } from "../../popup/content/payment-confirm.js";
import { renderBasePopup } from "../popup/base.js";
import { startConfirmAnimation } from "../../helper/confirm-animation.js";
import { closePopupContainerTemplate } from "../../popup/close-popup.js";
import { Cart } from "../cart/cart.js";

$(document).ready(async function () {
  // Confirm payment final
  $(document).on("click", ".checkbox-confirm-sum", function () {
    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    const $this = $(this);
    if ($this.hasClass("selected")) {
      $this.removeClass("selected");
      dataBooking.isConfirmBook = false;
    } else {
      $this.addClass("selected");
      dataBooking.isConfirmBook = true;
    }

    // Cập nhật button
    if (dataBooking.isConfirmBook) {
      $(".btn-confirm-booking-1").prop("disabled", false);
    } else {
      $(".btn-confirm-booking-1").prop("disabled", true);
    }

    salonStore.setState((prev) => ({
      ...prev,
      dataBooking,
    }));
  });

  $(document).on("click", ".btn-remove-service", function () {
    // 1. Xoá item cart khi ở page CHOOSE_SERVICE
    const store = salonStore.getState();
    const listDataService = store.dataServices;

    // xử lý chung khi xoá
    const itemServiceId = $(this).closest(".wrap-item-content").data("id-item");
    const instanceId = $(this)
      .closest(".wrap-item-content")
      .data("service-instance-id");

    // Tìm user đang chọn
    const dataBooking = store.dataBooking;
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
    Cart();
    renderSumary(dataBooking, listDataService);
  });

  $(document).on("click", ".btn-remove-addon", function () {
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
        if (instanceId == "undefined" || srv.serviceInstanceId === instanceId) {
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
  });

  $(document).on("click", ".btn-confirm-booking-1", async function () {
    const store = salonStore.getState();
    const isMobile = $(window).width() <= 768;

    const $wrapNewOnline = $(".wrap-newonline");
    const $btn = $(this);
    // Tránh bấm nhiều lần
    if ($btn.hasClass("loading")) return;

    // Set trạng thái loading
    $btn.addClass("loading").prop("disabled", true);

    // Thêm loader (nếu chưa có)
    if ($btn.find(".btn-loader").length === 0) {
      $btn.prepend('<span class="btn-loader"></span>');
    }

    const dataBooking = store.dataBooking;
    if (!dataBooking.isConfirmBook) return;

    // Chọn thẻ
    const cardChoosing = dataBooking.cardNumber.find((card) => card.isChoosing);

    // Tìm user0 (user có phone hoặc email)
    const user0 = dataBooking.users.find(
      (user) => user.phoneNumber || user.email
    );
    if (!user0) {
      console.error("Không tìm thấy user có phone hoặc email");
      $btn.removeClass("loading").prop("disabled", false);
      $btn.find(".btn-loader").remove();
      return;
    }

    const rcpCustomer = user0.rcpCustomer;
    const appointmentID = 0;
    const customerID = user0.id;
    const cardAuthorize = cardChoosing.cardAuthorize;
    const totalAmount = dataBooking.totalAmount || 0; // để tính remaining cho bill
    const rcvNo = store.RVCNo;
    const typeAuth = 1;
    const idCard = cardChoosing.id;

    let dataAddDeposit;
    try {
      const urlAddDeposit =
        `/api/card/adddeposit?RCPCustomer=${rcpCustomer}&AppointmentID=${appointmentID}&CustomerID=${customerID}&AuthorizeCardID=${cardAuthorize}&Amount=${totalAmount}&RVCNo=${rcvNo}&TypeAuthorize=${typeAuth}&ID=${idCard}`.replace(
          /\s+/g,
          ""
        );
      dataAddDeposit = await fetchAPI.get(urlAddDeposit);
    } catch (e) {
      console.error("[on.btn-next-payment]", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      });
      $btn.removeClass("loading").prop("disabled", false);
      $btn.find(".btn-loader").remove();
      return;
    }

    // Tạo danh sách AppointmentSubject
    const list_appointmentSubject = new Set();
    dataBooking.users.forEach((user) => {
      user.services.forEach((service) => {
        service.itemService.forEach((item) => {
          list_appointmentSubject.add(item.title);
        });
      });
    });
    const result_list_appointmentSubject = Array.from(
      list_appointmentSubject
    ).join(", ");

    // Tạo danh sách thời gian đặt dịch vụ
    // nếu
    const serviceDateTimeSet = new Set();
    dataBooking.users.forEach((user) => {
      user.services.forEach((service) => {
        service.itemService.forEach((item) => {
          const staff = item.selectedStaff;
          if (staff && user.selectedDate && user.selectedTimeSlot) {
            let timeStr = user.selectedTimeSlot.trim();
            if (timeStr.endsWith("AM") || timeStr.endsWith("PM")) {
              timeStr = timeStr.slice(0, -2);
            }
            const dateTime = `${formatDateMMDDYYYY(
              user.selectedDate
            )} ${timeStr}:00`;
            serviceDateTimeSet.add(dateTime);
          }
        });
      });
    });

    const uniqueSelectedDates = Array.from(serviceDateTimeSet);
    const parsedDates = uniqueSelectedDates.map((dt) => new Date(dt));
    const minDate = new Date(Math.min(...parsedDates));
    const minDateStr = `${formatDateMMDDYYYY(minDate)} ${String(
      minDate.getHours()
    ).padStart(2, "0")}:${String(minDate.getMinutes()).padStart(2, "0")}:00`;

    // Hàm tính EndTime cho mỗi user
    function buildUserEndTimes(dataBooking) {
      const results = [];
      dataBooking.users.forEach((user) => {
        let earliestStart = null;
        let totalDuration = 0;

        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            const staff = item.selectedStaff;
            if (!user?.selectedDate || !user?.selectedTimeSlot) return;

            const [month, day, year] = formatDateMMDDYYYY(
              user.selectedDate
            ).split("/");
            let timeStr = user.selectedTimeSlot.trim();
            if (timeStr.endsWith("AM") || timeStr.endsWith("PM")) {
              timeStr = timeStr.slice(0, -2);
            }
            let [hour, minute] = timeStr.split(":");

            const start = new Date(
              parseInt(year),
              parseInt(month) - 1,
              parseInt(day),
              parseInt(hour),
              parseInt(minute),
              0
            );

            if (!earliestStart || start < earliestStart) {
              earliestStart = start;
            }

            let itemDuration = item.duration || 0;
            if (item.optionals?.length > 0) {
              itemDuration += item.optionals.reduce(
                (sum, opt) => sum + (opt.timedura || 0),
                0
              );
            }
            totalDuration += itemDuration;
          });
        });

        if (earliestStart) {
          const end = new Date(earliestStart.getTime() + totalDuration * 60000);
          const formatted = `${String(end.getMonth() + 1).padStart(
            2,
            "0"
          )}/${String(end.getDate()).padStart(
            2,
            "0"
          )}/${end.getFullYear()} ${String(end.getHours()).padStart(
            2,
            "0"
          )}:${String(end.getMinutes()).padStart(2, "0")}:${String(
            end.getSeconds()
          ).padStart(2, "0")}`;
          results.push(formatted);
        } else {
          results.push(minDateStr); // Dự phòng nếu không có thời gian
        }
      });
      return results;
    }

    const endTimes = buildUserEndTimes(dataBooking);

    // Tạo danh sách nickName thợ
    const uniqueNicknames = new Set();
    dataBooking.users.forEach((user) => {
      user.services.forEach((service) => {
        service.itemService.forEach((item) => {
          if (item.selectedStaff && item.selectedStaff.nickName) {
            uniqueNicknames.add(item.selectedStaff.nickName);
          }
        });
      });
    });
    const staffNickNames = Array.from(uniqueNicknames);

    // Tạo danh sách ID thợ
    const uniqueEmployeeID = new Set();
    dataBooking.users.forEach((user) => {
      user.services.forEach((service) => {
        service.itemService.forEach((item) => {
          if (item.selectedStaff && item.selectedStaff.employeeID) {
            uniqueEmployeeID.add(item.selectedStaff.employeeID);
          }
        });
      });
    });
    const listUniqueEmID = Array.from(uniqueEmployeeID);

    // Tính tổng duration
    function calcTotalDuration(dataBooking) {
      let totalDuration = 0;
      dataBooking.users.forEach((user) => {
        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            let itemDuration = item.duration || 0;
            if (item.optionals && item.optionals.length > 0) {
              item.optionals.forEach((opt) => {
                itemDuration += opt.timedura || 0;
              });
            }
            totalDuration += itemDuration;
          });
        });
      });
      return totalDuration;
    }
    const totalTimeDuration = calcTotalDuration(dataBooking);

    // Hàm tính EndTime
    function calcEndTime(startDateTime, duration) {
      const [date, time] = startDateTime.split(" ");
      const [month, day, year] = date.includes("/")
        ? date.split("/").map(Number)
        : date.split("-").map(Number);
      const [h, m, s] = time.split(":").map(Number);

      const dt = new Date(year, month - 1, day, h, m, s || 0);
      dt.setMinutes(dt.getMinutes() + duration);

      const MM = String(dt.getMonth() + 1).padStart(2, "0");
      const DD = String(dt.getDate()).padStart(2, "0");
      const YYYY = dt.getFullYear();
      const HH = String(dt.getHours()).padStart(2, "0");
      const mm = String(dt.getMinutes()).padStart(2, "0");
      const SS = String(dt.getSeconds()).padStart(2, "0");

      return `${MM}-${DD}-${YYYY} ${HH}:${mm}:${SS}`;
    }

    // Hàm tạo danh sách Item cho mỗi user
    function buildItemListForUser(user, apptIndex) {
      let index = 0;
      const listItemDetail = [];
      let prevEndTime = null;

      user.services.forEach((service) => {
        service.itemService.forEach((itemService) => {
          const staff = itemService.selectedStaff;

          let totalPrice = parseFloat(itemService.price) || 0;
          let totalDuration = parseInt(itemService.duration) || 0;

          if (itemService.optionals && Array.isArray(itemService.optionals)) {
            itemService.optionals.forEach((opt) => {
              totalPrice += parseFloat(opt.price) || 0;
              totalDuration += parseInt(opt.timedura) || 0;
            });
          }

          let startTime;
          if (prevEndTime) {
            startTime = prevEndTime;
          } else {
            let timeStr = user.selectedTimeSlot.trim();
            if (timeStr.endsWith("AM") || timeStr.endsWith("PM")) {
              timeStr = timeStr.slice(0, -2);
            }
            startTime = `${formatDateMMDDYYYY(
              user.selectedDate
            )} ${timeStr}:00`;
          }

          const endTime = calcEndTime(startTime, totalDuration);
          prevEndTime = endTime;

          listItemDetail.push({
            Index: index++,
            ParentAddon: -1,
            ItemID: itemService.idItemService,
            ItemName: itemService.title,
            ItemPrice: totalPrice.toFixed(2),
            Duration: totalDuration,
            EmployeeID: staff.employeeID,
            EmployeeName: staff.nickName,
            Type: 1,
            IsCategory: 0,
            IsRequestTech: 1,
            StartTime: startTime,
            EndTime: endTime,
            DurationItem: totalDuration,
            IsChangeTime: 0,
            ProductCharge: 0,
            Turn: 0,
            Comission: 0,
            IDCombo: 0,
            AddonId: 0,
          });
        });
      });

      return listItemDetail;
    }

    // Hàm tạo danh sách Appointment
    function buildAppointments(dataBooking, user0) {
      const appointments = [];
      let apptIndex = 0;

      const customerName = `${user0.firstName || ""} ${
        user0.lastName || ""
      }`.trim();
      const customerPhone = user0.phoneNumber ? user0.phoneNumber.slice(1) : "";

      dataBooking.users.forEach((user, userIndex) => {
        const listItemDetail = buildItemListForUser(user, apptIndex);

        // Tính TotalAmount cho user này
        let userTotalAmount = 0;
        listItemDetail.forEach((item) => {
          userTotalAmount += parseFloat(item.ItemPrice) || 0;
        });

        // Tạo danh sách EmployeeID và GroupEmployeeName cho user này
        const userEmployeeIDs = new Set();
        const userNickNames = new Set();
        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            if (item.selectedStaff && item.selectedStaff.employeeID) {
              userEmployeeIDs.add(item.selectedStaff.employeeID);
            }
            if (item.selectedStaff && item.selectedStaff.nickName) {
              userNickNames.add(item.selectedStaff.nickName);
            }
          });
        });

        // Tạo AppointmentSubject cho user này
        const userAppointmentSubject = new Set();
        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            userAppointmentSubject.add(item.title);
          });
        });
        const userAppointmentSubjectStr = Array.from(
          userAppointmentSubject
        ).join(", ");

        // Tính ServiceDate và StartTime cho user này
        const userServiceDateTimeSet = new Set();
        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            const staff = item.selectedStaff;
            if (staff && user.selectedDate && user.selectedTimeSlot) {
              let timeStr = user.selectedTimeSlot.trim();
              if (timeStr.endsWith("AM") || timeStr.endsWith("PM")) {
                timeStr = timeStr.slice(0, -2);
              }
              const dateTime = `${formatDateMMDDYYYY(
                user.selectedDate
              )} ${timeStr}:00`;
              userServiceDateTimeSet.add(dateTime);
            }
          });
        });
        const userSelectedDates = Array.from(userServiceDateTimeSet);
        const userParsedDates = userSelectedDates.map((dt) => new Date(dt));
        const userMinDate =
          userParsedDates.length > 0
            ? new Date(Math.min(...userParsedDates))
            : minDate;
        const userMinDateStr = `${formatDateMMDDYYYY(userMinDate)} ${String(
          userMinDate.getHours()
        ).padStart(2, "0")}:${String(userMinDate.getMinutes()).padStart(
          2,
          "0"
        )}:00`;

        // Tính tổng duration cho user này
        let userTotalDuration = 0;
        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            let itemDuration = item.duration || 0;
            if (item.optionals && item.optionals.length > 0) {
              item.optionals.forEach((opt) => {
                itemDuration += opt.timedura || 0;
              });
            }
            userTotalDuration += itemDuration;
          });
        });

        const appointment = {
          AppointmentID: "0",
          CustomerID: customerID,
          CustomerName: customerName,
          CustomerPhone: customerPhone,
          AppointmentSubject: userAppointmentSubjectStr,
          ServiceDate: userMinDateStr,
          StartTime: userMinDateStr,
          EndTime: endTimes[userIndex] || userMinDateStr,
          AppointmentStatusID: "1",
          EmployeeID: Array.from(userEmployeeIDs),
          GroupEmployeeName: Array.from(userNickNames),
          AptComment: "",
          TotalAmount: userTotalAmount.toFixed(2), // Tổng tiền của user này
          DepositAmount: dataBooking.paymentDeposit || 0,
          CrearteBy: "0",
          IsBookOnline: "1",
          IsConfirmOB: "0",
          BarcodeTicket: "",
          TotalDuration: userTotalDuration,
          IDParty: "0",
          IsStartAllSameTime: "0",
          ApptIndex: String(apptIndex),
          Detail: {
            ApptIndex: String(apptIndex),
            Item: listItemDetail,
          },
        };

        appointments.push(appointment);
        apptIndex++;
      });

      return appointments;
    }

    // Tạo bookXLM
    const appointments = buildAppointments(dataBooking, user0);
    const bookXLM = {
      Appointment: appointments.length > 1 ? appointments : appointments[0],
    };
    const xmlString = jsonToXml(bookXLM, "root");

    const payloadBookXLM = {
      RVCNo: store.RVCNo,
      xml: xmlString,
      isConfirm: "0",
      CustomerID: customerID.toString(),
    };

    // Book now
    let dataBookXLM;
    try {
      dataBookXLM = await fetchAPI.post(
        "/api/appointment/bookAptXML",
        payloadBookXLM
      );
    } catch (e) {
      console.error("[dataBookXLM]", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      });
    } finally {
      $btn.removeClass("loading").prop("disabled", false);
      $btn.find(".btn-loader").remove();
    }

    if (dataBookXLM.appointmentID) {
      const RVCNo = store.RVCNo;
      const keyOnline = "OnlineBookingConfirm";
      const keyTech = "OB.NotifyTech";
      const type = "sms";
      const appointmentID = dataBookXLM.appointmentID;

      let resManualNotiOnline;
      try {
        resManualNotiOnline = await fetchAPI.get(
          `/api/appointment/SendManualNotify?RVCNo=${RVCNo}&key=${keyOnline}&type=${type}&appointmentID=${appointmentID}`
        );
      } catch (e) {
        console.error("[resManualNotiOnline]", {
          message: e.message,
          stack: e.stack,
          name: e.name,
        });
      }
      if (resManualNotiOnline.status !== 200) return;

      let resManualNotiTech;
      try {
        resManualNotiTech = await fetchAPI.get(
          `/api/appointment/SendManualNotify?RVCNo=${RVCNo}&key=${keyTech}&type=${type}&appointmentID=${appointmentID}`
        );
      } catch (e) {
        console.error("[resManualNotiTech]", {
          message: e.message,
          stack: e.stack,
          name: e.name,
        });
      }
      if (resManualNotiTech.status !== 200) return;
    } else {
      console.log("Not res appointmentID");
    }

    const findCardChoosing = dataBooking.cardNumber.find((c) => c.isChoosing);
    const dataBill = {
      image: "/assets/images/payment-success/img-succes-payment.png",
      ticketNumber: dataBookXLM.appointmentID,
      dateTime: dataBookXLM.bookedDate,
      paymentMethodLabel: findCardChoosing.cardType,
      paymentMethodMasked: maskCardNumber(findCardChoosing.last4),
      deposit: dataBooking.paymentDeposit,
      remaining:
        dataBooking.totalAmount - parseFloat(dataBooking.paymentDeposit),
      requestAnotherCount: 5,
      currencyDeposit: dataBooking.currencyDeposit,
    };

    const contentSuccessPayment = renderPaymentConfirmationForm(dataBill);
    let height = 976;
    let width = 886;
    if (isMobile) {
      height = 676;
      width = "100%";
    }
    const html = renderBasePopup(contentSuccessPayment, false, height, width);

    $wrapNewOnline.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);

    setTimeout(() => {
      startConfirmAnimation(1, {
        selector: ".wrap-popup-payment-confirmation .check-circle",
        buttonSelector: ".wrap-popup-payment-confirmation .btn-request-another",
      });
      // Thêm đếm ngược 5 giây
      let countdownSeconds = 10;
      const countdownElement = $(
        ".wrap-popup-payment-confirmation .countdown-seconds"
      );
      const countdownInterval = setInterval(() => {
        countdownSeconds -= 1;
        countdownElement.text(countdownSeconds);

        if (countdownSeconds <= 0) {
          clearInterval(countdownInterval);
          // Đóng popup
          closePopupContainerTemplate();
          // Reload trang
          window.location.reload();
        }
      }, 1000);
    }, 100);
  });
});
