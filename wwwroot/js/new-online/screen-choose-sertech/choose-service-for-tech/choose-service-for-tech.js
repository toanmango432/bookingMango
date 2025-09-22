export function renderListPeTech_PageChooseServiceTech(forceChoose = false) {
  const store = salonStore.getState();
  const { dataBooking, listStaffUser } = store;
  let itemTechChoosing = store.itemTechChoosing;
  let isSameTime = store.isSameTime;
  const user = dataBooking.users.find((u) => u.isChoosing);
  const isHidePrice = store.isHidePrice;

  let chooseStaffBefore = store.chooseStaffBefore || [];

  // Nếu chưa chọn tech nào thì alert và return
  if (chooseStaffBefore.length === 0) {
    alert("Please choose a tech before proceeding");
    return;
  }

  // chỉ lấy staff có trong chooseStaffBefore
  const staffToRender = listStaffUser.filter((s) =>
    chooseStaffBefore.includes(s.employeeID)
  );

  // --- Xác định itemTechChoosing ---
  if (forceChoose || !itemTechChoosing) {
    // lấy danh sách employeeID đã gắn với service
    const staffWithService = new Set();
    user.services.forEach((cate) => {
      cate.itemService.forEach((srv) => {
        if (srv.selectedStaff?.employeeID) {
          staffWithService.add(srv.selectedStaff.employeeID);
        }
      });
    });

    // tìm staff đầu tiên chưa có trong staffWithService
    let firstNoServiceStaff = chooseStaffBefore.find(
      (id) => !staffWithService.has(id)
    );

    if (firstNoServiceStaff) {
      itemTechChoosing = { employeeID: firstNoServiceStaff };
    } else {
      // fallback: staff đầu tiên trong chooseStaffBefore
      itemTechChoosing = { employeeID: chooseStaffBefore[0] };
    }

    salonStore.setState({ ...store, itemTechChoosing });
  }
  const htmlListPeTech = staffToRender
    .map((staff) => {
      const isActive = itemTechChoosing?.employeeID === staff.employeeID;

      // Tìm các service đang gắn với staff này
      const servicesOfStaff = [];
      user.services.forEach((cate) => {
        cate.itemService.forEach((srv) => {
          if (srv.selectedStaff?.employeeID === staff.employeeID) {
            servicesOfStaff.push(srv);
          }
        });
      });

      // Tính tổng thời gian (service + optionals)
      const totalDuration = servicesOfStaff.reduce((sum, s) => {
        let d = s.duration || 0;
        if (Array.isArray(s.optionals)) {
          d += s.optionals.reduce((acc, opt) => acc + (opt.timedura || 0), 0);
        }
        return sum + d;
      }, 0);

      // Tính tổng AddOn (tất cả service)
      let totalAddonCount = 0;
      let totalAddonPrice = 0;
      servicesOfStaff.forEach((s) => {
        if (Array.isArray(s.optionals)) {
          totalAddonCount += s.optionals.length;
          totalAddonPrice += s.optionals.reduce(
            (sum, opt) => sum + (opt.price || 0),
            0
          );
        }
      });

      // Build dòng AddOn tổng
      let optionalsHtml = "";
      if (totalAddonCount > 0) {
        optionalsHtml = `
                          <div class="addon-indicator-fortech">
                            <span class="be-addOn">
                              ${totalAddonCount} Add on
                              <span class="w-price-addon ${
                                isHidePrice ? "hide-price" : ""
                              }">
                                <span class="be-addOn_cash">$${totalAddonPrice.toFixed(
                                  2
                                )}</span>
                                <span class="partiti">|</span>
                                <span class="be-addOn_card">$${totalAddonPrice.toFixed(
                                  2
                                )}</span>
                              </span>
                            </span>
                          </div>
                        `;
      }

      // Build service blocks
      let serviceInfoHtml = `<span class="no-ser">No service</span>`;
      if (servicesOfStaff.length > 0) {
        const serviceBlocks = servicesOfStaff.map((s) => {
          const baseDuration = s.duration || 0;
          return `
                  <div class="ser-of-tech">
                    <span class="ser-name">${s.title} (${baseDuration}m)</span>
                    <span class="ser-price">$${s.price.toFixed(2)}</span>
                  </div>
                `;
        });

        if (serviceBlocks.length > 1) {
          const hiddenCount = serviceBlocks.length - 1;
          serviceInfoHtml =
            serviceBlocks[0] +
            `<div class="ser-of-tech see-more">+${hiddenCount} more...</div>`;
        } else {
          serviceInfoHtml = serviceBlocks.join("");
        }
      }

      // Ghép vào HTML cuối
      return `
        <div class="techd-item ${isActive ? "active" : ""}" data-techd-id="${
        staff.employeeID
      }">
          <div class="nametechd-time-dura">
            <div class="name-techd text-uppercase">${staff.nickName}</div>
            <span class="time-duratechd">
              ${totalDuration > 0 ? `(${totalDuration}m)` : ""}
            </span>
          </div>
          ${serviceInfoHtml}
          ${optionalsHtml}
        </div>
      `;
    })
    .join("");

  $(".wrap-list-petech").empty(); // làm mới trước khi append;
  $(".wrap-list-petech").append(
    `<div class="list-petech">${htmlListPeTech}</div>`
  );

  // Chỉ hiện start same time khi có ít nhất 2 itemService
  const totalSelected = user.services.reduce(
    (count, cate) => count + cate.itemService.length,
    0
  );
  let isValidSameTime = false;
  if (totalSelected >= 2) {
    isValidSameTime = true;
    let allHaveStaff = true;
    user.services.forEach((cate) => {
      cate.itemService.forEach((srv) => {
        if (!srv.selectedStaff || !srv.selectedStaff.employeeID) {
          allHaveStaff = false;
        }
      });
      isValidSameTime = allHaveStaff;
    });
  }
  if (!isValidSameTime) {
    isSameTime = false;
    salonStore.setState((prev) => ({
      ...prev,
      isSameTime,
    }));
  }
  const htmlSameTime = `
  ${
    totalSelected >= 2
      ? `
        <div class="wrap-sametime-op">
            <div class="copy-time">
                <input
                    id="select-sametime"
                    type="checkbox"
                    ${isSameTime ? "checked" : ""}
                    class="toggle-switch"
                    ${!isValidSameTime ? "disabled" : ""}
                    title="${
                      !isValidSameTime
                        ? "You can only select this if each service has a different staff"
                        : ""
                    }"
                />
                <span class="text-same-time">Start on same time</span>
            </div>
            <span class="guide-sametime">
                Use this if you want multiple services done at the same time with different techs
            </span>
        </div>
      `
      : ""
  } `;
  $(".wrap-list-petech").append(htmlSameTime);
}

function renderFooterService() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);
  const chooseStaffBefore = store.chooseStaffBefore;

  // Lấy danh sách staff đã được gán trong itemService
  const staffSelectedInServices = new Set();
  user.services.forEach((srv) => {
    srv.itemService.forEach((item) => {
      if (item.selectedStaff) {
        staffSelectedInServices.add(item.selectedStaff.employeeID);
      }
    });
  });

  // Kiểm tra tất cả staff trong chooseStaffBefore đã có mặt trong itemService chưa
  const isNext =
    chooseStaffBefore.length > 0 &&
    chooseStaffBefore.every((staffId) => staffSelectedInServices.has(staffId));

  const $wrapDirBtn = `
    <div class="wrap-dir-btn">
      <button id="btn-back-ftser" class="dir-btn-back-ser text-uppercase">Back</button>
      <button id="btn-next-ftser" class="dir-btn-next-ser text-uppercase ${
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
// Render service items
// Hàm render 1 item service
// Hàm dựng HTML cho 1 service
function renderServiceItem(serviceItem, selectedServices, itemTechChoosing) {
  const store = salonStore.getState();
  const isHidePrice = store.isHidePrice;
  const priceDisplay = store.priceDisplay;

  const hasAddon = serviceItem.listOptionAddOn?.length > 0;

  // Lấy tất cả tech đã chọn service này
  const matchedServices = selectedServices.filter(
    (s) => s.idItemService === serviceItem.id
  );

  const isSelected = matchedServices.some(
    (s) => s.selectedStaff?.employeeID === itemTechChoosing?.employeeID
  );

  // AddOn tính theo service của tech đang active
  const matchedActiveService = matchedServices.find(
    (s) => s.selectedStaff?.employeeID === itemTechChoosing?.employeeID
  );

  const addonCount = matchedActiveService?.optionals?.length || 0;
  const addOnTotalPrice =
    matchedActiveService?.optionals?.reduce(
      (sum, opt) => sum + (opt.price || 0),
      0
    ) || 0;

  // Lấy danh sách tất cả tech đã chọn service này
  const selectedByList = matchedServices
    .map((s) => s.selectedStaff?.nickName || s.selectedStaff?.fullName)
    .filter(Boolean);
  return `
    <div
      class="wrap-ftservice-card ${isSelected ? "selected" : ""}"
      data-iditem="${serviceItem.id}"
    >
      <span class="icon-checked ${isSelected ? "selected" : ""}">
        <i class="fa-solid fa-check"></i>
      </span>
      <div class="green-addOn ${hasAddon ? "dis-addOn" : ""}">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
      <div class="service-card">
        <div class="service-title text-uppercase">
          ${serviceItem.title}
        </div>
        ${funcDisplayPrice(serviceItem, { isHidePrice, priceDisplay })}
        <div class="bot-item-service">
          ${
            addonCount > 0
              ? `<div class="addon-indicator">
                    <span class="be-addOn">
                      ${addonCount} Add on
                      <span class="be-addOn_cash">
                        <span class="w-price-addon ${
                          isHidePrice ? "hide-price" : ""
                        }">
                          <span>
                            $ ${addOnTotalPrice.toFixed(2)}
                          </span>
                          <span class="partiti">|</span>
                          <span class="be-addOn_card">
                            $ ${addOnTotalPrice.toFixed(2)}
                          </span>
                        </span>
                      </span>
                    </span>
                  </div>`
              : ""
          }
          ${
            selectedByList.length
              ? `<div class="selected-by">
                  <span>Selected by: <b>${selectedByList.join(", ")}</b></span>
                </div>`
              : ""
          }
        </div>
        ${
          serviceItem.description
            ? `<div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
                    <path d="M14.5 12.8333V18.6667M14.5 24.5C8.70101 24.5 4 19.799 4 14C4 8.20101 8.70101 3.5 14.5 3.5C20.299 3.5 25 8.20101 25 14C25 19.799 20.299 24.5 14.5 24.5ZM14.5581 9.33333V9.45L14.4419 9.45023V9.33333H14.5581Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </div>`
            : ""
        }
      </div>
    </div>
  `;
}
// Hàm render lại toàn bộ list
export function renderServices_PageChooseServiceTech(listItem) {
  const store = salonStore.getState();
  const { dataBooking, itemTechChoosing } = store;
  const user = dataBooking.users.find((u) => u.isChoosing);

  const selectedServices = [];
  if (user) {
    user.services.forEach((cate) => {
      cate.itemService.forEach((s) => selectedServices.push(s));
    });
  }

  const html = listItem
    .map((serviceItem) =>
      renderServiceItem(serviceItem, selectedServices, itemTechChoosing)
    )
    .join("");

  $(".list-pesers3").html(html);

  renderFooterService();
}
// Hàm render lại 1 item cụ thể
function rerenderServiceItem(serviceItem) {
  const store = salonStore.getState();
  const { dataBooking, itemTechChoosing } = store;
  const user = dataBooking.users.find((u) => u.isChoosing);

  const selectedServices = [];
  if (user) {
    user.services.forEach((cate) => {
      cate.itemService.forEach((s) => selectedServices.push(s));
    });
  }

  const html = renderServiceItem(
    serviceItem,
    selectedServices,
    itemTechChoosing
  );

  // Thay thế DOM cũ bằng DOM mới
  $(`.wrap-ftservice-card[data-iditem="${serviceItem.id}"]`).replaceWith(html);

  renderFooterService();
}

export async function ScreenChooseServiceForTech() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);

  const salonChoosing = store.salonChoosing;
  let dataService = await store.getListDataService();

  if (dataService.length) {
    renderServices_PageChooseServiceTech(dataService[0].item.listItem);
  }

  const htmlHeaderSalon = HeaderSalon(salonChoosing);
  // Lấy categories từ API
  const htmlCategories = renderTrackCate(dataService, "item-ftcate");

  // Render footer
  const $wrapDirBtn = renderFooterService();
  const htmlScreenChooseService = `
        <div class="wrap-content-salon">
            <div class="header-sertech">
                ${htmlHeaderSalon}
            </div>
            <div class="content-choose-sertech">
                <div class="choose-ftservices">
                    <div class="wrap-title">
                        <h2 class="title text-uppercase">Choose services</h2>
                    </div>
                    <p class="desc">
                      Select service for each techs
                    </p>
                </div>

                <div class="categories-ftsearch">
                  <div class="categories">
                      <div class="slider-categories">
                          <div class="slider-track-categories">
                              ${htmlCategories}
                          </div>
                          <button class="slider-btn-categories prev"><i class="fa-solid fa-chevron-left"></i></button>
                          <button class="slider-btn-categories next"><i class="fa-solid fa-chevron-right"></i></button>
                      </div>
                  </div>
                </div>
                <div class="wrap-search-ftser mt-3 mb-3">
                  <div class="container-search-ftser">
                    <input type="text" class="input-search-ftser" placeholder="Search by name..."/>
                    <button class="btn-search-toggle"><i class="fa-solid fa-magnifying-glass"></i></button>
                  </div>
                </div>
                <div class="persers-petechs">
                  <div class="container-list-petech">
                    <div class="wrap-list-petech">
                    </div>
                  </div>
                  <div class="line-one"></div>
                  <div class="list-pesers3"></div>
                </div>
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
  // khởi tạo lần đầu renderServices_PageChooseServiceTech
  const id = $(".item-ftcate.active").data("id");
  const cate = dataService.find((c) => c.item.id === id);
  renderServices_PageChooseServiceTech(cate?.item.listItem || []);
  renderListPeTech_PageChooseServiceTech(true); // lần đầu render page
  // render slider cate
  setTimeout(() => {
    const sliderEl = document.querySelector(".categories-ftsearch .categories");
    const sliderTrackSelector = ".slider-track-categories";
    const cardSelector = ".item-ftcate";
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

// import store
import { salonStore } from "../../../store/new-online-store.js";
import { HeaderSalon } from "../../header/header-salon.js";
import { Cart } from "../../cart/cart.js";
import { initSliderFromElement } from "../../choose-nail-salon/choose-nail-salon.js";
// import constant
import { monthNames, dayNames } from "../../../constants/days-weeks.js";
// import component
import { funcDisplayPrice } from "../screen-choose-service.js";
import { renderContentDesSer } from "../../popup/content/content-descser.js";
import { renderBasePopup } from "../../popup/base.js";
import { renderTrackCate } from "../screen-choose-service.js";
import { renderAddonPanel } from "../screen-choose-service.js";
import { ScreenChooseTech } from "../screen-choose-tech.js";
import {
  renderChooseTime,
  updateCalendarData,
  renderCalendar,
} from "../../choose-time/choose-time.js";
// hanle event
$(document).ready(async function () {
  const store = salonStore.getState();
  const currentMonth = store.currentMonth;
  const selectedDate = store.selectedDate;
  const currentYear = store.currentYear;
  const currentDate = new Date();
  const daysOffNail = store.daysOffNail;
  const RVCNo = store.RVCNo;
  const dataBooking = store.dataBooking;
  const $wrapNewOnline = $(".wrap-newonline");

  const isMobile = $(window).width() <= 768;

  $(document).on("click", ".wrap-ftservice-card", async function () {
    const isUnSelected = true; // True: Cho phép bỏ chọn nếu item service đã chọn
    const serviceId = $(this).data("iditem");
    const cateId = $(".item-ftcate.active").data("id");

    const store = salonStore.getState();
    const listStaffUser = store.listStaffUser;
    let itemTechChoosing = store.itemTechChoosing;
    let dataService = store.dataServices;

    const cate = dataService.find((c) => c.item.id === cateId);
    const itemService = cate?.item.listItem.find((s) => s.id === serviceId);
    if (!itemService) {
      console.log("Not found item service!");
      return;
    }
    if (!itemTechChoosing) {
      console.log("Please choose tech!");
      return;
    }

    const dataBooking = store.dataBooking;
    const user = dataBooking.users.find((u) => u.isChoosing);
    // Tìm category trong user
    let cateInUser = user.services.find((s) => s.idService === cateId);
    if (!cateInUser) {
      cateInUser = { idService: cateId, itemService: [] };
      user.services.push(cateInUser);
    }
    // Lấy tech đang active
    const techActive = listStaffUser.find(
      (s) => s.employeeID === itemTechChoosing.employeeID
    );
    if (!techActive) {
      console.log("Not found tech active!");
      return;
    }

    // Kiểm tra xem service đã được chọn chưa
    let existingServices = cateInUser.itemService.filter(
      (s) => s.idItemService === itemService.id
    );

    const serviceInstanceId = `${itemService.id}-${techActive.employeeID}`;

    if (existingServices.length) {
      // Kiểm tra xem techActive đã chọn service này chưa
      let existingForTech = existingServices.find(
        (s) => s.selectedStaff?.employeeID === techActive.employeeID
      );

      if (existingForTech && isUnSelected) {
        // Dùng serviceInstanceId
        cateInUser.itemService = cateInUser.itemService.filter(
          (s) => s.serviceInstanceId !== serviceInstanceId
        );
      } else if (!existingForTech) {
        // Nếu service đã được chọn bởi tech khác thì add thêm service cho tech active
        cateInUser.itemService.push({
          serviceInstanceId,
          idItemService: itemService.id,
          title: itemService.title,
          price: itemService.basePrice,
          cashPrice: itemService.baseCashPrice,
          duration: itemService.timetext,
          selectedStaff: {
            employeeID: techActive.employeeID,
            nickName: techActive.nickName,
          },
          optionals: [],
        });
        // mở AddOn cho tech mới này
        if (itemService.listOptionAddOn?.length) {
          renderAddonPanel(itemService, techActive.employeeID);
          requestAnimationFrame(() => {
            $(".overlay-nav-addOn").addClass("open");
          });
        }
      }
    } else {
      // Service chưa có -> thêm mới cho tech active
      cateInUser.itemService.push({
        serviceInstanceId,
        idItemService: itemService.id,
        title: itemService.title,
        price: itemService.basePrice,
        cashPrice: itemService.baseCashPrice,
        duration: itemService.timetext,
        selectedStaff: {
          employeeID: techActive.employeeID,
          nickName: techActive.nickName,
        },
        optionals: [],
      });

      // Nếu có AddOn, chỗ này add on cho tech đầu tiên
      if (itemService.listOptionAddOn?.length) {
        renderAddonPanel(itemService, techActive.employeeID);
        requestAnimationFrame(() => {
          $(".overlay-nav-addOn").addClass("open");
        });
      }
    }

    salonStore.setState({ ...store, dataBooking: { ...dataBooking } });
    rerenderServiceItem(itemService); // chỉ render lại item đang chọn, tối ưu
    renderFooterService();
    renderListPeTech_PageChooseServiceTech();
    Cart();
  });

  $(document).on("click", ".techd-item", function () {
    const $this = $(this);
    const store = salonStore.getState();
    const dataService = store.dataServices;

    const techId = $this.data("techd-id");
    const cateId = $(".item-ftcate.active").data("id");
    const cate = dataService.find((c) => c.item.id === cateId);

    // Cập nhật state
    salonStore.setState({
      ...store,
      itemTechChoosing: {
        employeeID: techId,
      },
    });

    // Update active UI
    $(".techd-item").removeClass("active");
    $this.addClass("active");

    // Render lại list staff
    renderServices_PageChooseServiceTech(cate?.item.listItem || []);
  });

  // Chọn category
  $(document).on("click", ".item-ftcate", function () {
    const store = salonStore.getState();
    const dataService = store.dataServices;
    $(".item-ftcate").removeClass("active");
    $(this).addClass("active");

    const id = $(this).data("id");
    const cate = dataService.find((c) => c.item.id === id);
    renderServices_PageChooseServiceTech(cate?.item.listItem || []);
    $(".input-search-ser").val(""); // clear search khi đổi cate
  });
  // Search trong category active
  $(document).on("input", ".input-search-ftser", function () {
    const store = salonStore.getState();
    const dataService = store.dataServices;

    const keyword = $(this).val().toLowerCase();
    const id = $(".item-ftcate.active").data("id");
    const cate = dataService.find((c) => c.item.id === id);
    let list = cate?.item.listItem || [];

    if (keyword) {
      list = list.filter((srv) => srv.title.toLowerCase().includes(keyword));
    }
    renderServices_PageChooseServiceTech(list);
  });
  //

  // back choose service or tech
  $(document).on("click", "#btn-back-ftser", async function () {
    await ScreenChooseTech();
  });

  $(document).on("click", "#btn-next-ftser", async function () {
    // Kiểm tra đã chọn đầy đủ service cho thợ chưa trước khi next
    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    const user = dataBooking.users.find((u) => u.isChoosing);
    const chooseStaffBefore = store.chooseStaffBefore;

    // Lấy danh sách staff đã được gán trong itemService
    const staffSelectedInServices = new Set();
    user.services.forEach((srv) => {
      srv.itemService.forEach((item) => {
        if (item.selectedStaff) {
          staffSelectedInServices.add(item.selectedStaff.employeeID);
        }
      });
    });

    // Kiểm tra tất cả staff trong chooseStaffBefore đã có mặt trong itemService chưa
    const isNext =
      chooseStaffBefore.length > 0 &&
      chooseStaffBefore.every((staffId) =>
        staffSelectedInServices.has(staffId)
      );
    if (!isNext) return;

    await renderChooseTime();

    // lần đầu load: fetch ngày nghỉ của tháng hiện tại
    updateCalendarData(currentMonth, currentYear, RVCNo, daysOffNail, () => {
      renderCalendar(
        monthNames,
        dayNames,
        currentMonth,
        currentYear,
        daysOffNail,
        selectedDate,
        dataBooking
      );
    });
  });
  $(document).on("click", ".info-icon", function (e) {
    e.stopPropagation();
    const $this = $(this);
    const idItemSer = $this.closest(".wrap-service-card").data("iditem");
    const idCate = $(".item-cate.active").data("id");

    const store = salonStore.getState();
    const dataServices = store.dataServices;
    console.log("datasSER: ", dataServices);
    console.log("idCate: ", idCate);

    const cate = dataServices.find((ser) => ser.item.id === idCate);
    console.log("cate: ", cate);
    const iser = cate?.item?.listItem.find((is) => is.id === idItemSer);

    console.log("check: ", iser);

    const contentDescSer = renderContentDesSer(iser);
    let height = 276;
    let width = 586;
    if (isMobile) {
      height = 376;
      width = "100%";
    }
    const html = renderBasePopup(contentDescSer, false, height, width);
    $wrapNewOnline.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);
  });
});
