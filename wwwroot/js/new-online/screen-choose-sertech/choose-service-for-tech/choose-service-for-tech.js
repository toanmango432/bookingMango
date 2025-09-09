function renderListPeTech() {
  const store = salonStore.getState();
  const { dataBooking, listStaffUser } = store;
  const user = dataBooking.users.find((u) => u.isChoosing);

  let chooseStaffBefore = store.chooseStaffBefore || [];

  // Nếu chưa có chooseStaffBefore và user chưa có service nào, active staff đầu tiên
  const hasAnyService = user.services.some(
    (cate) => cate.itemService.length > 0
  );
  if (
    chooseStaffBefore.length === 0 &&
    !hasAnyService &&
    listStaffUser.length > 0
  ) {
    chooseStaffBefore = [listStaffUser[0].employeeID];
    salonStore.setState({ chooseStaffBefore });
  }

  // chỉ lấy staff có trong chooseStaffBefore
  const staffToRender = listStaffUser.filter((s) =>
    chooseStaffBefore.includes(s.employeeID)
  );

  const htmlListPeTech = staffToRender
    .map((staff) => {
      const isActive = chooseStaffBefore.includes(staff.employeeID);

      // Tìm các service đang gắn với staff này
      const servicesOfStaff = [];
      user.services.forEach((cate) => {
        cate.itemService.forEach((srv) => {
          if (srv.selectedStaff?.employeeID === staff.employeeID) {
            servicesOfStaff.push(srv);
          }
        });
      });

      // tính tổng thời gian (service + optionals)
      const totalDuration = servicesOfStaff.reduce((sum, s) => {
        let d = s.duration || 0;
        if (Array.isArray(s.optionals)) {
          d += s.optionals.reduce((acc, opt) => acc + (opt.timedura || 0), 0);
        }
        return sum + d;
      }, 0);

      let serviceInfoHtml = `<span class="no-ser">No service</span>`;
      if (servicesOfStaff.length > 0) {
        const serviceBlocks = servicesOfStaff.map((s) => {
          const baseDuration = s.duration || 0;
          const optionalsHtml = (s.optionals || [])
            .map(
              (opt) => `
          <div class="ser-optional">
            <span class="ser-name">+ ${opt.title} (${opt.timedura}m)</span>
            <span class="ser-price">$${opt.price.toFixed(2)}</span>
          </div>`
            )
            .join("");

          return `
      <div class="ser-of-tech">
        <span class="ser-name">${s.title} (${baseDuration}m)</span>
        <span class="ser-price">$${s.price.toFixed(2)}</span>
      </div>
      ${optionalsHtml}`;
        });

        if (serviceBlocks.length > 1) {
          const hiddenCount = serviceBlocks.length - 1;
          serviceInfoHtml =
            serviceBlocks.slice(0, 1).join("") +
            `<div class="ser-of-tech see-more">+${hiddenCount} more...</div>`;
        } else {
          serviceInfoHtml = serviceBlocks.join("");
        }
      }

      return `
        <div class="techd-item ${isActive ? "active" : ""}" data-techd-id="${
        staff.employeeID
      }">
          <div class="wrap-header-techd">
            <div class="nametechd-time-dura">
              <div class="name-techd text-uppercase">${staff.nickName}</div>
              <span class="time-duratechd">
              ${totalDuration > 0 ? `(${totalDuration}m)` : ""}
              </span>
            </div>
              ${serviceInfoHtml}
          </div>
        </div>`;
    })
    .join("");

  $(".list-petech").html(htmlListPeTech);
}

function renderFooterService() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);
  // đã chọn service mới được phép next
  const isNext = user.services.some((srv) => {
    return srv.itemService.length > 0;
  });

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
function renderServices(listItem) {
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
          class="wrap-ftservice-card ${isSelected ? "selected" : ""}"
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
                            $ ${addOnTotalPrice}
                          </span>
                          <span class="partiti">|</span>
                          <span class="be-addOn_card">
                            $ ${addOnTotalPrice}
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

  $(".list-pesers3").html(html);
  // load lại btn next, back footer
  renderFooterService();
}

export async function ScreenChooseServiceForTech() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);

  const salonChoosing = store.salonChoosing;
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
                <div class="choose-ftservices">
                    <div class="wrap-title">
                        <h2 class="title">CHOOSE SERVICES</h2>
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
                  <div class="list-petech"></div>
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
  // render slider cate
  setTimeout(() => {
    const sliderEl = document.querySelector(".categories-search .categories");
    if (sliderEl) {
      initSliderFromElement(sliderEl, ".item-cate");
    }
  }, 100);
  // khởi tạo lần đầu renderServices
  const id = $(".item-cate.active").data("id");
  const cate = dataService.find((c) => c.item.id === id);
  renderServices(cate?.item.listItem || []);
  renderListPeTech();
  return htmlScreenChooseService;
}

// import store
import { salonStore } from "../../../store/new-online-store.js";
import { HeaderSalon } from "../../header/header-salon.js";
import { Cart } from "../../cart/cart.js";
import { initSliderFromElement } from "../../choose-nail-salon/choose-nail-salon.js";
// import constant
import { idStaffDefault } from "../../../constants/template-online.js";
import { ServiceOrTech } from "../../service-or-tech/service-or-tech.js";
import { ChooseTechForServices } from "../choose-tech-for-service/choose-tech-for-service.js";
import { renderTrackCate } from "../screen-choose-service.js";
import { renderAddonPanel } from "../screen-choose-service.js";
import { ScreenChooseTech } from "../screen-choose-tech.js";
// hanle event
$(document).ready(async function () {
  let dataService = await salonStore.getState().getListDataService();
  const $wrapNewOnline = $(".wrap-newonline");

  // Toggle search
  $(document).on("click", ".btn-search-toggle", function () {
    const $this = $(this);
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
  $(document).on("click", ".item-cate", function () {
    $(".item-cate").removeClass("active");
    $(this).addClass("active");

    const id = $(this).data("id");
    const cate = dataService.find((c) => c.item.id === id);
    renderServices(cate?.item.listItem || []);
    $(".input-search-ser").val(""); // clear search khi đổi cate
  });

  // Render lần đầu (category đầu tiên)
  if (dataService.length) {
    renderServices(dataService[0].item.listItem);
  }

  $(document).on("click", ".wrap-ftservice-card", async function () {
    const serviceId = $(this).data("iditem");
    const cateId = $(".item-cate.active").data("id");

    const store = salonStore.getState();
    let dataService = store.getListDataService
      ? await store.getListDataService()
      : [];
    const cate = dataService.find((c) => c.item.id === cateId);
    const itemService = cate?.item.listItem.find((s) => s.id === serviceId);
    if (!itemService) return;

    const dataBooking = store.dataBooking;
    const user = dataBooking.users.find((u) => u.isChoosing);

    // Lấy tech đang active
    const techActiveId = $(".techd-item.active").data("techd-id");
    const techActive = store.listStaffUser.find(
      (s) => s.employeeID == techActiveId
    );
    if (!techActive) return;

    // Tìm category trong user
    let cateInUser = user.services.find((s) => s.idService === cateId);
    if (!cateInUser) {
      cateInUser = { idService: cateId, itemService: [] };
      user.services.push(cateInUser);
    }

    // Kiểm tra service đã có chưa
    let existingService = cateInUser.itemService.find(
      (s) => s.idItemService === itemService.id
    );
    if (existingService) {
      // Nếu có rồi → bỏ chọn (remove)
      cateInUser.itemService = cateInUser.itemService.filter(
        (s) => s.idItemService !== itemService.id
      );
    } else {
      // Thêm mới
      cateInUser.itemService.push({
        idItemService: itemService.id,
        title: itemService.title,
        price: itemService.priceRental,
        duration: itemService.timetext,
        selectedStaff: {
          employeeID: techActive.employeeID,
          nickName: techActive.nickName,
        },
        optionals: [],
      });

      // Nếu có AddOn
      if (itemService.listOptionAddOn?.length) {
        renderAddonPanel(itemService);
        requestAnimationFrame(() => {
          $(".overlay-nav-addOn").addClass("open");
        });
      }
    }

    salonStore.setState({ dataBooking });
    renderServices(cate?.item.listItem || []);
    renderFooterService();
    renderListPeTech();
    Cart();
  });

  // back choose service or tech
  $(document).on("click", "#btn-back-ftser", async function () {
    const $this = $(this);

    await ScreenChooseTech();
  });
  // next choose service
  $(document).on("click", "#btn-next-ser", function () {
    const $this = $(this);
    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    const user = dataBooking.users.find((u) => u.isChoosing);
    // Kiểm tra đã chọn service chưa trước khi next
    const isNext = user.services.some((srv) => {
      return srv.itemService.length > 0;
    });
    if (!isNext) return;

    $wrapNewOnline.empty();
    const htmlChooseTechForSer = ChooseTechForServices();
    $wrapNewOnline.append(htmlChooseTechForSer);
  });
});
