export function renderTrackCate(dataService, classItem = "item-cate") {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);

  // tìm cateId cần active
  let activeCateId = null;

  if (user) {
    // 1. Kiểm tra cate nào có itemService user đã chọn
    for (const cate of dataService) {
      const isChosen = cate.item.listItem.some((item) =>
        user.services.some((uCate) =>
          uCate.itemService.some((srv) => srv.idItemService === item.id)
        )
      );
      if (isChosen) {
        activeCateId = cate.item.id;
        break;
      }
    }

    // 2. Nếu chưa có, tìm cate nào có listItem > 0
    if (!activeCateId) {
      const cateWithItem = dataService.find((c) => c.item.listItem.length > 0);
      if (cateWithItem) {
        activeCateId = cateWithItem.item.id;
      }
    }
  }

  // 3. Nếu vẫn chưa có, fallback cate đầu tiên
  if (!activeCateId && dataService.length > 0) {
    activeCateId = dataService[0].item.id;
  }

  return dataService
    .map((cate, index) => {
      // kiểm tra cate này có service user chọn không
      const hasChosenService = user?.services.some((uCate) =>
        uCate.itemService.some((srv) =>
          cate.item.listItem.some((item) => item.id === srv.idItemService)
        )
      );
      // set class cho cate
      const classNames = [
        cate.item.id === activeCateId ? "active" : "",
        hasChosenService ? "choosed" : "",
      ]
        .filter(Boolean)
        .join(" ");
      return `
      <div class="${classItem} ${classNames}" data-id="${cate.item.id}">
        <span class="name-cate">${cate.item.value}</span>
        <span class="count">${cate.item.listItem.length}</span>
      </div>
    `;
    })
    .join("");
}
export function renderFooterService() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);
  // đã chọn service mới được phép next
  const isNext = user.services.some((srv) => {
    return srv.itemService.length > 0;
  });

  const $wrapDirBtn = `
    <div class="wrap-dir-btn">
      <button id="btn-back-ser" class="dir-btn-back-ser text-uppercase">Back</button>
      <button id="btn-next-ser" class="dir-btn-next-ser text-uppercase ${
        isNext ? "allow-next" : ""
      }">Next</button>
    </div>
  `;
  // nếu DOM đã có footer-dir thì append khi hàm được gọi
  const $footerDir = $(".footer-dir");
  if ($footerDir.length) {
    $footerDir.empty(); // reset
    $footerDir.append($wrapDirBtn);
  }
  return $wrapDirBtn;
}
// ScreenChooseService.js
export async function ScreenChooseService() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);

  const salonChoosing = store.salonChoosing;
  console.log("store.rvcno: ", store.RVCNo);
  let dataService = await store.getListDataService();

  const htmlHeaderSalon = HeaderSalon(salonChoosing);
  // Lấy categories từ API
  const htmlCategories = renderTrackCate(dataService);

  // Render footer
  const $wrapDirBtn = renderFooterService();
  const htmlScreenChooseService = `
        <div class="wrap-content-salon">
            <div class="header-sertech">
                ${htmlHeaderSalon}
            </div>
            <div class="content-choose-sertech">
                <div class="choose-services">
                    <div class="wrap-title">
                        <h2 class="title">CHOOSE SERVICES</h2>
                    </div>
                    <p class="desc">
                        Pick <strong>SERVICE</strong> if you know the service you want, or pick <strong>STAFF</strong> if you prefer your favorite technician.
                    </p>
                    <div class="btn-group-service">
                        <button id="flow-ser" class="btn-service active" data-type="service">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                              <path d="M19.7329 9.61726C19.5903 9.62698 19.0052 10.5484 18.7305 11.0079C18.6526 11.0079 17.1771 11.7562 17.1865 12.0562C17.194 12.2962 18.1584 12.8686 18.6396 13.1249C18.8646 13.5936 19.3746 14.5367 19.6146 14.5592C19.8546 14.5817 20.4577 13.6124 20.7293 13.1249C21.1608 12.8905 22.0445 12.3693 22.127 12.1593C22.2301 11.8968 20.8154 11.069 20.7293 11.0936C20.6432 11.1182 19.9113 9.60511 19.7329 9.61726Z" fill="white" stroke="white" stroke-width="0.1"/>
                              <path d="M5.33499 2.85945C5.19232 2.86917 4.60725 3.79058 4.33255 4.25007C4.2547 4.25007 2.7792 4.99836 2.78857 5.29835C2.79607 5.53834 3.76044 6.11082 4.24169 6.36706C4.46668 6.83579 4.97666 7.77889 5.21665 7.80138C5.45664 7.82388 6.05979 6.85454 6.33137 6.36706C6.76289 6.1327 7.64656 5.61146 7.72906 5.40147C7.83218 5.13898 6.41748 4.31117 6.33137 4.33577C6.24526 4.36038 5.51332 2.8473 5.33499 2.85945Z" fill="white" stroke="white" stroke-width="0.1"/>
                              <path d="M17.2175 5.69993C16.8105 5.29702 15.9762 4.46946 15.8952 4.38352L17.4548 2.805L18.0128 2.16253L18.5553 1.50391L19.9187 2.88876L18.666 4.1131L17.2175 5.69993Z" fill="white"/>
                              <path d="M15.258 5.33391L12.7919 7.77596L13.8884 8.80583L16.2686 6.39253L15.258 5.33391Z" fill="white"/>
                              <path d="M13.4726 9.38807C13.4097 9.37409 12.3049 8.21337 12.2699 8.15044C11.7147 8.18759 11.3498 8.44069 11.1806 8.9375C10.9351 9.65827 11.6888 10.3633 12.3876 10.4688C13.0864 10.5742 13.4726 9.54297 13.4726 9.38807Z" fill="white"/>
                              <path d="M12.1648 7.38766L13.2748 6.2636C12.3983 5.14888 11.7267 4.83289 11.3755 4.95156C9.15854 5.70079 8.76585 8.21291 8.74778 8.3016C8.6055 9 8.37724 11.8121 8.58767 12.7377C9.23862 15.601 14.1562 15.7945 14.4134 12.4149L14.3606 9.38807C13.8269 10.7374 13.6333 10.9309 13.2116 11.1111C11.3358 11.624 10.4727 9.87579 10.4366 9.24236C10.3593 7.88647 11.5396 7.79982 12.1648 7.38766Z" fill="white"/>
                              <path d="M15.0875 12.7377C13.3642 17.6544 8.2904 15.6799 7.79359 12.6812C7.78663 12.6391 7.53951 12.9187 7.37227 14.2629C7.35493 14.4023 7.22157 20.7805 7.37227 21.5302C7.52296 22.2799 8.13672 22.4865 8.30154 22.4865C8.55859 22.4865 14.0692 22.5174 14.5113 22.4865C15.383 22.3672 15.4922 21.8281 15.5251 21.5302C15.5492 21.3113 15.6114 17.0921 15.5469 15.0078C15.5469 13.9688 15.125 12.6875 15.0875 12.7377Z" fill="white"/>
                              <path d="M17.2175 5.69993C16.8105 5.29702 15.9762 4.46946 15.8952 4.38352L17.4548 2.805L18.0128 2.16253L18.5553 1.50391L19.9187 2.88876L18.666 4.1131L17.2175 5.69993Z" stroke="white" stroke-width="0.1"/>
                              <path d="M15.258 5.33391L12.7919 7.77596L13.8884 8.80583L16.2686 6.39253L15.258 5.33391Z" stroke="white" stroke-width="0.1"/>
                              <path d="M13.4726 9.38807C13.4097 9.37409 12.3049 8.21337 12.2699 8.15044C11.7147 8.18759 11.3498 8.44069 11.1806 8.9375C10.9351 9.65827 11.6888 10.3633 12.3876 10.4688C13.0864 10.5742 13.4726 9.54297 13.4726 9.38807Z" stroke="white" stroke-width="0.1"/>
                              <path d="M12.1648 7.38766L13.2748 6.2636C12.3983 5.14888 11.7267 4.83289 11.3755 4.95156C9.15854 5.70079 8.76585 8.21291 8.74778 8.3016C8.6055 9 8.37724 11.8121 8.58767 12.7377C9.23862 15.601 14.1562 15.7945 14.4134 12.4149L14.3606 9.38807C13.8269 10.7374 13.6333 10.9309 13.2116 11.1111C11.3358 11.624 10.4727 9.87579 10.4366 9.24236C10.3593 7.88647 11.5396 7.79982 12.1648 7.38766Z" stroke="white" stroke-width="0.1"/>
                              <path d="M15.0875 12.7377C13.3642 17.6544 8.2904 15.6799 7.79359 12.6812C7.78663 12.6391 7.53951 12.9187 7.37227 14.2629C7.35493 14.4023 7.22157 20.7805 7.37227 21.5302C7.52296 22.2799 8.13672 22.4865 8.30154 22.4865C8.55859 22.4865 14.0692 22.5174 14.5113 22.4865C15.383 22.3672 15.4922 21.8281 15.5251 21.5302C15.5492 21.3113 15.6114 17.0921 15.5469 15.0078C15.5469 13.9688 15.125 12.6875 15.0875 12.7377Z" stroke="white" stroke-width="0.1"/>
                            </svg>
                            SERVICE - I want to pick a services
                        </button>
                        <button id="flow-tech" class="btn-service" data-type="staff">
                            <i class="fa-solid fa-user-plus"></i>
                            STAFF - I want to pick a technician
                        </button>
                    </div>
                </div>

                <div class="categories-search">
                    <div class="categories">
                        <div class="slider-categories">
                            <div class="slider-track-categories">
                                ${htmlCategories}
                            </div>
                            <button class="slider-btn-categories prev"><i class="fa-solid fa-chevron-left"></i></button>
                            <button class="slider-btn-categories next"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>

                    <div class="wrap-search-ser">
                        <input type="text" class="input-search-ser" placeholder="Search by name..."/>
                        <button class="btn-search-toggle"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </div>

                <div class="list-services"></div>
                <div class="footer-dir">
                  ${$wrapDirBtn}
                </div>
            </div>
        </div>
    `;
  const $wrapNewOnline = $(".wrap-newonline");
  $wrapNewOnline.empty();
  $wrapNewOnline.append(htmlScreenChooseService);
  // render cart
  Cart();
  // khởi tạo lần đầu renderServices
  const id = $(".item-cate.active").data("id");
  const cate = dataService.find((c) => c.item.id === id);
  renderServices(cate?.item.listItem || []);
  // render slider cate
  setTimeout(() => {
    const sliderEl = document.querySelector(".categories-search .categories");
    const sliderTrackSelector = ".slider-track-categories";
    const cardSelector = ".item-cate";
    const btnNextSelector = ".slider-btn-categories.next";
    const btnPreSelector = ".slider-btn-categories.prev";

    if (sliderEl) {
      initSliderFromElement(
        sliderTrackSelector,
        sliderEl,
        cardSelector,
        btnNextSelector,
        btnPreSelector,
        208 // 80 padding,80 gap, 48 width btn
      );
    }
  }, 100);
  return htmlScreenChooseService;
}
// Render service items
export function renderServices(listItem) {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);
  const selectedServices = [];

  if (user) {
    for (const cate of user.services) {
      for (const s of cate.itemService) {
        selectedServices.push(s);
      }
    }
  }

  const html = listItem
    .map((serviceItem) => {
      const hasAddon = serviceItem.listOptionAddOn?.length > 0;

      // check service này có đang được chọn không
      const matchedService = selectedServices.find(
        (s) => s.idItemService === serviceItem.id
      );
      const isSelected = Boolean(matchedService);

      // nếu có addon đã chọn
      const addonCount = matchedService?.optionals?.length || 0;
      const addOnTotalPrice =
        matchedService?.optionals?.reduce(
          (sum, opt) => sum + (opt.price || 0),
          0
        ) || 0;
      return `
        <div
          class="wrap-service-card ${isSelected ? "selected" : ""}"
          data-iditem="${serviceItem.id}"
        >
          <span class="icon-checked ${isSelected ? "selected" : ""}"">
            <i class="fa-solid fa-check"></i>
          </span>
          <div class="green-addOn ${hasAddon ? "dis-addOn" : ""}">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div class="service-card">
            <div class="service-title text-uppercase">
              ${serviceItem.title}
            </div>
            <div class="service-price">
              <span class="pcash">
                $${serviceItem.priceRental.toFixed(2)} Cash
              </span> /
              <span class="pcard">
                $${serviceItem.priceRental.toFixed(2)} Card
              </span>
            </div>
            <div class="bot-item-service">
              ${
                addonCount > 0
                  ? `<div class="addon-indicator">
                        <span class="be-addOn">
                          ${addonCount} Add on
                          <span class="be-addOn_cash">
                            $ ${addOnTotalPrice.toFixed(2)}
                          </span>
                          <span class="partiti">|</span>
                          <span class="be-addOn_card">
                            $ ${addOnTotalPrice.toFixed(2)}
                          </span>
                        </span>
                      </div>`
                  : ""
              }
              ${
                serviceItem.description
                  ? `<div class="info-icon"><i class="fa-solid fa-circle-info"></i></div>`
                  : ""
              }
            </div>
          </div>
        </div>
    `;
    })
    .join("");

  $(".list-services").html(html);
  // load lại btn next, back footer
  renderFooterService();
}
export function renderAddonPanel(itemService, employeeID) {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);
  if (!user) return;

  let currentService = null;
  let serviceInstanceId = null;
  // Tìm service đã chọn trong dataBooking
  if (employeeID) {
    // tìm đúng instance trong user theo serviceId + employeeID
    for (const cate of user.services) {
      currentService = cate.itemService.find(
        (s) =>
          s.idItemService === itemService.id &&
          s.selectedStaff?.employeeID === employeeID
      );
      if (currentService) break;
    }
    // nếu có employee tức là chọn tech trước, do đó dùng serviceInstanceId
    serviceInstanceId = `${itemService.id}-${employeeID}`;
  } else {
    // fallback: chỉ lấy theo idItemService
    for (const cate of user.services) {
      currentService = cate.itemService.find(
        (s) => s.idItemService === itemService.id
      );
      if (currentService) break;
    }
  }

  // Lấy danh sách add-on đã chọn
  const selectedOptIds = currentService
    ? currentService.optionals.map((o) => o.id)
    : [];
  // xoá panel cũ
  $(".overlay-nav-addOn").remove();
  const html = `
    <div class="overlay-nav-addOn">
      <div class="wrap-nav-addOn">
        <div class="addon-panel">
          <div class="wrap-addOn-header">
            <div class="addon-header">
              <h3 class="text-uppercase">${itemService.title}</h3>
              <button class="btn-close-addon">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div class="title-addOn">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                  <path d="M2.27539 3.22266H13.2773M2.27539 5.53885H13.2773M9.51349 7.85504H2.27539M7.48682 10.1712H2.27539M9.51349 12.4874H2.27539" stroke="#231F20" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.698 7.85547V12.7774M15.0142 10.1717H10.0923" stroke="#231F20" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Add-Ons</span>
            </div>
          </div>
          <div
            class="addon-list"
            data-instance-id="${serviceInstanceId || "undefined"}"
            data-id=${itemService.id}
          >
            ${itemService.listOptionAddOn
              .map((opt) => {
                const isSelected = selectedOptIds.includes(opt.id);
                return `
                  <label class="addon-item" data-id="${opt.id}">
                    <div class="checkbox-addOn ${isSelected ? "selected" : ""}">
                      <div class="circle-addOn">
                        <i class="fa-solid fa-check"></i>
                      </div>
                    </div>
                    <span>${opt.title}</span>
                    <span class="cash-card">
                      <p class="addOn-cash">
                        $${opt.price}
                      </p>
                      <p class="addOn-card">
                        / $${opt.price}
                      </p>
                    </span>
                  </label>
                `;
              })
              .join("")}
          </div>
          <div class="addon-footer">
            <button class="btn-clear text-uppercase">Clear All</button>
            <button class="btn-done text-uppercase">Done</button>
          </div>
        </div>
      </div>
    </div>
  `;

  $(".content-choose-sertech").append(html);
}

function findAddonById(optId, dataServices) {
  // duyệt tất cả category
  for (const cate of dataServices || []) {
    // duyệt tất cả service trong category
    for (const srv of cate.item.listItem || []) {
      // duyệt option addOn
      const opt = srv.listOptionAddOn?.find((o) => o.id === optId);
      if (opt) return opt;
    }
  }
  return null;
}

// import store
import { salonStore } from "../../store/new-online-store.js";
import { HeaderSalon } from "../header/header-salon.js";
import { Cart } from "../cart/cart.js";
import { initSliderFromElement } from "../choose-nail-salon/choose-nail-salon.js";
// import constant
import { PageCurrent, SelecteFlow } from "../../constants/new-online.js";
// import component
import { ServiceOrTech } from "../service-or-tech/service-or-tech.js";
import { ChooseTechForServices } from "./choose-tech-for-service/choose-tech-for-service.js";
import { closePopupContainerTemplate } from "../../popup/close-popup.js";
import { shakeError } from "../../helper/shake-error.js";
import { ScreenChooseTech } from "./screen-choose-tech.js";
// import popup
import { contentShowResetDataBooking } from "../../popup/content/reset-databooking.js";
import { renderBasePopup } from "../../popup/base.js";
import {
  renderListPeTech_PageChooseServiceTech,
  renderServices_PageChooseServiceTech,
} from "./choose-service-for-tech/choose-service-for-tech.js";

// hanle event
$(document).ready(async function () {
  const $wrapNewOnline = $(".wrap-newonline");
  const isMobile = $(window).width() <= 768;
  let selectFlow;

  // Toggle search
  $(document).on("click", ".btn-search-toggle", function () {
    const $this = $(this);
    const store = salonStore.getState();
    const dataService = store.dataServices;

    const $inputSearch = $(".input-search-ser");
    const $wrapSearchSer = $(".wrap-search-ser");
    $this.toggleClass("active");
    $inputSearch.toggleClass("active");
    $wrapSearchSer.toggleClass("active");

    $inputSearch.focus().val(""); // reset input khi mở
    // Reset list về category active
    const id = $(".item-cate.active").data("id");
    const cate = dataService.find((c) => c.item.id === id);
    renderServices(cate?.item.listItem || []);
  });

  // Search trong category active
  $(document).on("input", ".input-search-ser", function () {
    const store = salonStore.getState();
    const dataService = store.dataServices;

    const keyword = $(this).val().toLowerCase();
    const id = $(".item-cate.active").data("id");
    const cate = dataService.find((c) => c.item.id === id);
    let list = cate?.item.listItem || [];

    if (keyword) {
      list = list.filter((srv) => srv.title.toLowerCase().includes(keyword));
    }

    renderServices(list);
  });

  // Chọn category
  $(document).on("click", ".item-cate", async function () {
    const store = salonStore.getState();
    const dataService = store.dataServices;
    console.log("dataSer: ", dataService);

    $(".item-cate").removeClass("active");
    $(this).addClass("active");

    const id = $(this).data("id");
    const cate = dataService.find((c) => c.item.id === id);
    renderServices(cate?.item.listItem || []);
    $(".input-search-ser").val(""); // clear search khi đổi cate
  });

  $(document).on("click", ".wrap-service-card", async function () {
    const store = salonStore.getState();
    let dataService = store.dataServices;

    let isUnSelected = true;
    const serviceId = $(this).data("iditem");
    const cateId = $(".item-cate.active").data("id");

    const cate = dataService.find((c) => c.item.id === cateId);
    const itemService = cate?.item.listItem.find((s) => s.id === serviceId);
    if (!itemService) return;

    // Lấy user đang chọn
    const dataBooking = store.dataBooking;
    const user = dataBooking.users.find((u) => u.isChoosing);
    if (!user) return;

    // Tìm category trong user
    let cateInUser = user.services.find((s) => s.idService === cateId);
    if (!cateInUser) {
      cateInUser = { idService: cateId, itemService: [] };
      user.services.push(cateInUser);
    }
    // Kiểm tra item service đã có chưa
    let existingService = cateInUser.itemService.find(
      (s) => s.idItemService === itemService.id
    );
    if (!existingService) {
      // Thêm itemService
      cateInUser.itemService.push({
        idItemService: itemService.id,
        title: itemService.title,
        price: itemService.priceRental,
        duration: itemService.timetext,
        selectedStaff: {},
        optionals: [],
      });
      // Nếu có AddOn thì mở panel
      if (itemService.listOptionAddOn?.length) {
        renderAddonPanel(itemService);
        // trigger chờ để transition
        requestAnimationFrame(() => {
          $(".overlay-nav-addOn").addClass("open");
        });
      }
    } else if (existingService && isUnSelected) {
      // Remove itemService đã chọn
      cateInUser.itemService = cateInUser.itemService.filter(
        (s) => s.idItemService !== itemService.id
      );
    }

    salonStore.setState((prev) => ({
      ...prev,
      dataBooking: dataBooking,
    }));
    // load list service sau khi chọn service
    renderServices(cate?.item.listItem || []);
    // Load lại cart
    Cart();
    // Load button next, back
    renderFooterService();
    // Load lại cate
    const $trackCate = $(".slider-track-categories");
    const htmlCategories = renderTrackCate(dataService);
    $trackCate.empty(); // reset
    $trackCate.append(htmlCategories);
  });

  // Click ra ngoài addOn-pannel đóng addOn
  $(document).on("click", function (e) {
    if ($(".overlay-nav-addOn").hasClass("open")) {
      // click out
      if (!$(e.target).closest(".addon-panel").length) {
        $(".overlay-nav-addOn").removeClass("open");
        if ($(".overlay-nav-cart").hasClass("addon-pan")) {
          $(".overlay-nav-cart").removeClass("addon-pan").addClass("open");

          $(".content-cart").hasClass("addon-pan") &&
            $(".content-cart").removeClass("addon-pan").addClass("open");
        }
      }
    }
  });

  $(document).on("click", ".addon-item", async function () {
    const store = salonStore.getState();
    const dataServices = store.dataServices;
    const dataBooking = store.dataBooking;

    const user = dataBooking.users.find((u) => u.isChoosing);
    if (!user) return;

    const $this = $(this);
    const $item = $this.find(".checkbox-addOn");
    const optId = $this.data("id");

    // lấy instanceId service đang mở panel
    let serviceInstanceId = $this.closest(".addon-list").data("instance-id");
    if (serviceInstanceId == "undefined") {
      serviceInstanceId = $this.closest(".addon-list").data("id");
    }
    console.log("serIn: ", serviceInstanceId);
    // tìm đúng service theo id
    let currentService = null;
    for (const cate of user.services) {
      currentService = cate.itemService.find(
        (s) =>
          s.serviceInstanceId === serviceInstanceId ||
          s.idItemService === serviceInstanceId
      );
      if (currentService) break;
    }
    if (!currentService) return;
    // toggle chọn
    if ($item.hasClass("selected")) {
      $item.removeClass("selected");
      currentService.optionals = currentService.optionals.filter(
        (o) => o.id !== optId
      );
    } else {
      $item.addClass("selected");
      const opt = findAddonById(optId, dataServices);
      currentService.optionals.push(opt);
    }

    salonStore.setState({
      dataBooking: store.dataBooking,
    });
    // Tuỳ pageCurrent mà render lại component cần thiết
    const pageCurrent = store.pageCurrent;
    if (pageCurrent === PageCurrent.CHOOSE_SERVICE) {
      // Load lại service khi thay đổi addOn
      let cateId = $(".item-cate.active").data("id");
      if (!cateId) {
        cateId = $("item-ftcate.active").data("id");
      }
      const cate = store.dataServices;
      const currentCate = cate.find((c) => c.item.id === cateId);
      renderServices(currentCate?.item.listItem);
      // Load lại cart khi đang chỉ chọn add on hoặc đang có mở cart
      // đang mở cart
      const $cartActive = $(".content-cart.addon-pan");
      if ($cartActive.length) {
        Cart(true, true);
      } else {
        Cart();
      }
    } else if (pageCurrent === PageCurrent.CHOOSE_SERVICE_FOR_TECH) {
      // khởi tạo lần đầu renderServices_PageChooseServiceTech
      const id = $(".item-ftcate.active").data("id");
      const cate = dataServices.find((c) => c.item.id === id);
      renderServices_PageChooseServiceTech(cate?.item.listItem);
      renderListPeTech_PageChooseServiceTech();

      // Load lại cart khi đang chỉ chọn add on hoặc đang có mở cart
      // đang mở cart
      const $cartActive = $(".content-cart.addon-pan");
      if ($cartActive.length) {
        Cart(true, true);
      } else {
        Cart();
      }
    }
    console.log("data affter choose addon item: ", dataBooking);
  });

  $(document).on("click", ".btn-close-addon, .btn-done", async function () {
    $(".overlay-nav-addOn").removeClass("open");
    const $contentCart = $(".overlay-nav-cart.open");
    // chỉ đóng add on, vẫn mở cart nếu cart đang mở
    if ($contentCart.length) {
      $(".content-cart").removeClass("addon-pan");
      $contentCart.removeClass("addon-pan");
    }
    const store = salonStore.getState();
    const cateId = $(".item-cate.active").data("id");
    const cate = store.dataServices;
    const currentCate = cate.find((c) => c.item.id === cateId);
    renderServices(currentCate.item.listItem);
  });

  $(document).on("click", ".btn-clear", function () {
    const $addonList = $(this).closest(".addon-panel").find(".addon-list");
    const idItemService = $addonList.data("id");

    // bỏ chọn tất cả UI
    $addonList.find(".checkbox-addOn").removeClass("selected");

    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    const user = dataBooking.users.find((u) => u.isChoosing);
    if (!user) return;

    // tìm đúng service đang mở
    let currentService = null;
    for (const cate of user.services) {
      currentService = cate.itemService.find(
        (s) => s.idItemService === idItemService
      );
      if (currentService) break;
    }

    if (currentService) {
      currentService.optionals = [];
    }
    salonStore.setState({
      dataBooking: dataBooking,
    });

    // Load lại service khi thay đổi addOn
    const cateId = $(".item-cate.active").data("id");
    const cate = store.dataServices;
    const currentCate = cate.find((c) => c.item.id === cateId);
    renderServices(currentCate.item.listItem);
    // Load lại cart khi đang chỉ chọn add on hoặc đang có mở cart
    // đang mở cart
    const $cartActive = $(".content-cart.addon-pan");
    if ($cartActive.length) {
      Cart(true, true);
    } else {
      Cart();
    }
  });
  // back choose service or tech
  $(document).on("click", "#btn-back-ser", function () {
    const $this = $(this);

    $wrapNewOnline.empty();
    const htmlWrapContentSertech = ServiceOrTech();
    $wrapNewOnline.append(htmlWrapContentSertech);
  });
  // next choose service
  $(document).on("click", "#btn-next-ser", async function () {
    const $this = $(this);
    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    const user = dataBooking.users.find((u) => u.isChoosing);
    // Kiểm tra đã chọn service chưa trước khi next
    const isNext = user.services.some((srv) => {
      return srv.itemService.length > 0;
    });
    if (!isNext) return;

    await ChooseTechForServices();
    // Chuyển tới page chọn duy nhất một thợ
    salonStore.setState({ pageCurrent: PageCurrent.CHOOSE_ONLY_TECH });
  });

  // Chuyển đổi flow
  // 1 Chọn service trước khi chọn tech
  $(document).on("click", "#flow-ser", function () {
    const $this = $(this);
    const flowActive = $this.hasClass("active");
    if (flowActive) return;
    selectFlow = SelecteFlow.SER;

    const htmlConfirmReset = contentShowResetDataBooking();
    let height = 300;
    let width = 600;
    if (isMobile) {
      height = 300;
      width = "100%";
    }
    const persistent = true;
    const html = renderBasePopup(htmlConfirmReset, persistent, height, width);

    $wrapNewOnline.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });
  // 1 Chọn tech trước khi chọn service
  $(document).on("click", "#flow-tech", function () {
    const $this = $(this);
    const flowActive = $this.hasClass("active");
    if (flowActive) return;
    console.log("choose tech");
    selectFlow = SelecteFlow.TECH;

    const htmlConfirmReset = contentShowResetDataBooking();
    let height = 300;
    let width = 600;
    if (isMobile) {
      height = 300;
      width = "100%";
    }
    const persistent = true;
    const html = renderBasePopup(htmlConfirmReset, persistent, height, width);

    $wrapNewOnline.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });
  $wrapNewOnline.on("click", ".btn-closepopup", function () {
    closePopupContainerTemplate();
  });

  $(document).on("click", ".btn-back-reset", function () {
    closePopupContainerTemplate();
  });
  $(document).on("click", ".btn-confirm-reset", async function () {
    // reset databooking
    salonStore.resetDataBooking();
    // reset chọn thợ
    salonStore.setState({ chooseStaffBefore: [] });

    // render ui chọn
    if (selectFlow === SelecteFlow.SER) {
      await ScreenChooseService();
    } else {
      await ScreenChooseTech();
    }
    salonStore.setState({ flow: selectFlow });
    closePopupContainerTemplate();
  });

  // 1. Đóng / persitent khi click overlay-screen
  $(document).on("click", ".overlay-screen", function (e) {
    const $this = $(this);
    const $popupContainerTemplate = $this.find(".popup-container-template");
    const isPersit = $this.hasClass("persistent");
    if (e.target === this && isPersit) {
      shakeError($popupContainerTemplate);
    } else if (e.target === this) closePopupContainerTemplate();
  });
});
