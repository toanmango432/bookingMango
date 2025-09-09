export function renderFooterForPageChooseEachTech() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);
  // đã chọn service mới được phép next
  const isNext = user.services.some((srv) => {
    return srv.itemService.length > 0;
  });
  const $wrapDirBtn = `
    <div class="wrap-dir-btn">
      <button id="btn-back-cetech" class="dir-btn-back-tech text-uppercase">Back</button>
      <button id="btn-next-cetech" class="dir-btn-next-tech text-uppercase ${
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
function renderFirstTechAvailable(tech, isSelected) {
  return `
    <div class="item-petech wrap-item-petech-first ${
      isSelected ? "selected" : ""
    }" data-id=${tech?.employeeID}>
      <span class="icon-checked ${isSelected ? "selected" : ""}">
        <i class="fa-solid fa-check"></i>
      </span>
      <div class="wrap-image">
        <img
          src="${tech?.imageFileName}"
          alt="${tech.nickName}"
          class="image-avail"
        />
      </div>
      <div class="left-item-petech">
        <h2 class="name-tech">
          ${tech.nickName}
        </h2>
        <span class="sub-avail">
          for maximun availability
        </span>
        <span class="recommended-tech">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
            <g clip-path="url(#clip0_3984_109552)">
              <path d="M7.84278 11.8035C7.63169 11.67 7.367 11.6701 7.15592 11.8035L3.91858 13.851C3.4168 14.1684 2.79649 13.6988 2.92982 13.1026L3.78809 9.26457C3.84385 9.01523 3.763 8.75416 3.57797 8.58601L0.728384 5.99656C0.286987 5.59546 0.524275 4.83784 1.10749 4.78617L4.86282 4.4534C5.10736 4.43173 5.3204 4.2708 5.41649 4.03515L6.89027 0.420733C7.119 -0.140245 7.881 -0.140244 8.10974 0.420733L9.58351 4.03515C9.6796 4.2708 9.89264 4.43173 10.1372 4.4534L13.8925 4.78617C14.4757 4.83784 14.713 5.59546 14.2716 5.99656L11.422 8.58601C11.237 8.75416 11.1562 9.01523 11.2119 9.26457L12.0702 13.1029C12.2036 13.6991 11.5833 14.1686 11.0815 13.8513L7.84278 11.8035Z" fill="#FCC003"/>
            </g>
            <defs>
              <clipPath id="clip0_3984_109552">
                <rect width="14" height="14" fill="white" transform="translate(0.5)"/>
              </clipPath>
            </defs>
          </svg>
          Recommended
        </span>
      </div>
    </div>
  `;
}

function renderItemTech(staff) {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);

  const $activeSer = $(".serd-item.active");
  const serviceId = $activeSer.data("service-id");
  const itemServiceId = $activeSer.data("item-service-id");

  // lấy service active trong data
  const cate = user?.services.find((c) => c.idService === serviceId);
  const srv = cate?.itemService.find((s) => s.idItemService === itemServiceId);

  const isStaff = srv?.selectedStaff?.employeeID === staff.employeeID;

  return `
    <div
      class="item-petech staff ${isStaff ? "selected" : ""}"
      data-id=${staff?.employeeID}
      style="--border-color:${staff.color || "#6f42c1"}"
    >
      <span class="icon-checked ${isStaff ? "selected" : ""}"">
        <i class="fa-solid fa-check"></i>
      </span>
      <div class="wrap-image">
        <img src="${staff.imageFileName}" alt="${staff.nickName}" />
      </div>
      <div class="staff-info">
        <div class="staff-name">
          <span>${staff.nickName || staff.firstName}</span>
          <span class="desc-staff">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
              <mask id="mask0_3984_111267" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="18">
                <path d="M18.5 0H0.5V18H18.5V0Z" fill="white"/>
              </mask>
              <g mask="url(#mask0_3984_111267)">
                <path d="M3.06941 5.7H10.1914M3.06941 7.608H10.1914M3.06941 11.562H7.79141M10.1914 0V3.504M3.06941 0V3.504M3.06941 9.546H7.79141M12.5194 9.696V1.638H1.19141V15.3H7.64141M12.2014 17.31H10.0414V15.216L15.6694 9.624L17.5414 11.49L12.2014 17.31Z" stroke="currentColor" stroke-width="1.2"/>
              </g>
            </svg>
          </span>
        </div>
        <div class="wrap-staff-sub">
          <div class="staff-sub">
            <span class="schedule">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M5.83203 1.33203V3.33203" stroke="currentColor" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.168 1.33203V3.33203" stroke="currentColor" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.83203 6.05859H14.1654" stroke="currentColor" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.5 5.66536V11.332C14.5 13.332 13.5 14.6654 11.1667 14.6654H5.83333C3.5 14.6654 2.5 13.332 2.5 11.332V5.66536C2.5 3.66536 3.5 2.33203 5.83333 2.33203H11.1667C13.5 2.33203 14.5 3.66536 14.5 5.66536Z" stroke="currentColor" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.49764 9.13411H8.50363" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.02889 9.13411H6.03488" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.02889 11.1341H6.03488" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Upcoming Day Of</span>
            </span>
            <span class="icon-show-day-off">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M7.1655 3.33464H5.96549C5.21876 3.33464 4.84511 3.33464 4.5599 3.47996C4.30901 3.60779 4.10519 3.81162 3.97736 4.0625C3.83203 4.34772 3.83203 4.72136 3.83203 5.4681V10.5348C3.83203 11.2815 3.83203 11.6547 3.97736 11.9399C4.10519 12.1908 4.30901 12.395 4.5599 12.5228C4.84483 12.668 5.21803 12.668 5.9633 12.668H11.0341C11.7794 12.668 12.152 12.668 12.437 12.5228C12.6878 12.395 12.8924 12.1906 13.0202 11.9397C13.1654 11.6548 13.1654 11.282 13.1654 10.5367V9.33464M13.832 6.0013V2.66797M13.832 2.66797H10.4987M13.832 2.66797L9.16536 7.33464" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderListStaff(listUserStaff) {
  if (!listUserStaff?.length) return "";

  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);

  const $activeSer = $(".serd-item.active");
  const serviceId = $activeSer.data("service-id");
  const itemServiceId = $activeSer.data("item-service-id");

  let htmlListTech = "";

  // staff idStaffDefault
  const techAvailable = listUserStaff.find(
    (s) => s.employeeID === idStaffDefault
  );
  if (techAvailable) {
    const cate = user?.services.find((c) => c.idService === serviceId);
    const srv = cate?.itemService.find(
      (s) => s.idItemService === itemServiceId
    );
    const isSelected9999 = srv?.selectedStaff?.employeeID === idStaffDefault;
    htmlListTech += renderFirstTechAvailable(techAvailable, isSelected9999);
  }

  // staff khác
  htmlListTech += listUserStaff
    .filter((s) => s.employeeID !== idStaffDefault)
    .map((staff) => renderItemTech(staff))
    .join("");

  $(".list-petechs").html(htmlListTech);
}

function renderListPeSer(forceChoose = false) {
  // forceChoose = true: nếu muốn chọn lại active cho itemService, thường dùng khi từ page khác vào page này
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);
  let itemServiceChoosing = store.itemServiceChoosing;
  let isSameTime = store.isSameTime;

  let totalCash = 0;
  let totalCard = 0;
  const userHtml = user.services
    .map((cate) =>
      cate.itemService
        .map((srv) => {
          const staffName = srv.selectedStaff?.nickName || "";
          const price = srv.price || 0;
          const duration = srv.duration || 0;

          totalCash += price;
          totalCard += price;

          // block HTML khép kín
          return `
            <div
                class="serd-item"
                data-service-id="${cate.idService}"
                data-item-service-id="${srv.idItemService}"
            >
                <div class="wrap-header-serd">
                    <div class="d-wrap-header-serd">
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
                        <div class="staff-serd">
                            <div class="cart-staff text-uppercase">${staffName}</div>
                            <div class="cart-duration">${duration} mins</div>
                        </div>
                    </div>
                </div>
            </div>`;
        })
        .join("")
    )
    .join("");

  // Chỉ hiện start same time khi có ít nhất 2 itemService
  const totalSelected = user.services.reduce(
    (count, cate) => count + cate.itemService.length,
    0
  );

  // Kiểm tra xem tất cả itemService có staff khác nhau không
  let isValidSameTime = false;
  if (totalSelected >= 2) {
    // Hiện tại chỉ cần check có chọn 2 service không là start on same time được, không quan trọng tech trùng service
    // Confirm by : a.Trí :v
    isValidSameTime = true;

    // Comment xử lý chọn start on same time cho trường hợp mỗi service mỗi tech khác nhau
    // const staffIds = [];
    // let allHaveStaff = true;

    // user.services.forEach((cate) => {
    //   cate.itemService.forEach((srv) => {
    //     if (srv.selectedStaff?.employeeID) {
    //       staffIds.push(srv.selectedStaff.employeeID);
    //     } else {
    //       allHaveStaff = false;
    //     }
    //   });
    // });
    // TRƯỜNG HỢP KHÔNG QUAN TRỌNG TRÙNG TECH
    let allHaveStaff = true;
    user.services.forEach((cate) => {
      cate.itemService.forEach((srv) => {
        if (!srv.selectedStaff || !srv.selectedStaff.employeeID) {
          allHaveStaff = false;
        }
      });
      isValidSameTime = allHaveStaff;
    });

    // Hợp lệ khi tất cả đều có staff và không có staff trùng nhau
    // const uniqueStaff = new Set(staffIds);
    // isValidSameTime = allHaveStaff && staffIds.length === uniqueStaff.size;
  }
  if (!isValidSameTime) {
    isSameTime = false;
    salonStore.setState({ isSameTime: isSameTime });
  }
  // chưa xử lý chuẩn cho trường hợp next available
  // khi chọn next available thì được phép trùng
  const htmlPeSer = `
    <div class="wrap-list-peser">
        <div class="list-peser">
            ${userHtml}
        </div>
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
       }
    </div>
    `;

  const $listPeSer = $(".list-pesers");
  $listPeSer.empty();
  $listPeSer.append(htmlPeSer);

  // Xác định itemServiceChoosing
  if (forceChoose || !itemServiceChoosing) {
    // tìm item đầu tiên chưa có staff
    let firstNoStaff = null;
    outer: for (const cate of user.services) {
      for (const srv of cate.itemService) {
        if (!srv.selectedStaff || Object.keys(srv.selectedStaff).length === 0) {
          firstNoStaff = {
            idService: cate.idService,
            idItemService: srv.idItemService,
          };
          break outer;
        }
      }
    }
    if (!firstNoStaff) {
      // fallback: item đầu tiên
      const first = user.services[0]?.itemService[0];
      if (first) {
        firstNoStaff = {
          idService: user.services[0].idService,
          idItemService: first.idItemService,
        };
      }
    }
    itemServiceChoosing = firstNoStaff;
    salonStore.setState({ itemServiceChoosing });
  }

  // Active itemServiceChoosing
  if (itemServiceChoosing) {
    $listPeSer
      .find(
        `.serd-item[data-service-id="${itemServiceChoosing.idService}"][data-item-service-id="${itemServiceChoosing.idItemService}"]`
      )
      .addClass("active");
  }

  return htmlPeSer;
}

export async function ChooseTechForEachServices() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);
  const listStaffUser = store.listStaffUser;

  const salonChoosing = store.salonChoosing;

  const htmlHeaderSalon = HeaderSalon(salonChoosing);
  // Render footer
  const $wrapDirBtn = renderFooterForPageChooseEachTech();
  const htmlScreenChooseTech = `
        <div class="wrap-content-salon">
            <div class="header-sertech">
                ${htmlHeaderSalon}
            </div>
            <div class="content-choose-sertech">
                <div class="choose-techs">
                    <div class="wrap-title">
                        <h2 class="title">Choose Technician</h2>
                    </div>
                    <p class="desc">
                      Select tech for each services
                    </p>
                    <div class="wrap-search-tech">
                        <div class="container-search-tech">
                          <input type="text" class="input-search-tech" placeholder="Search by name..."/>
                          <button class="btn-search-toggle"><i class="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </div>
                </div>
                <div class="persers-petechs">
                    <div class="list-pesers"></div>
                    <div class="line-one"></div>
                    <div class="list-petechs"></div>
                </div>
                <div class="footer-dir">
                  ${$wrapDirBtn}
                </div>
            </div>
        </div>
    `;
  const $wrapNewOnline = $(".wrap-newonline");
  $wrapNewOnline.empty();
  $wrapNewOnline.append(htmlScreenChooseTech);
  renderListPeSer(true); //
  renderListStaff(listStaffUser);
  return htmlScreenChooseTech;
}
// import store
import { salonStore } from "../../../store/new-online-store.js";
// import constant
import { idStaffDefault } from "../../../constants/template-online.js";
// import component
import { HeaderSalon } from "../../header/header-salon.js";
import { ScreenChooseService } from "../screen-choose-service.js";
$(document).ready(async function () {
  const store = salonStore.getState();
  const listStaffUser = (await store.getListUserStaff()) || [];
  const $wrapNewOnline = $(".wrap-newonline");

  // btn back tech to services
  $(document).on("click", "#btn-back-cetech", async function () {
    const $this = $(this);

    await ScreenChooseService();
  });

  $(document).on("input", ".input-search-tech", async function () {
    const keyword = $(this).val().toLowerCase();
    let list = listStaffUser;
    if (keyword) {
      list = list.filter((u) => u.nickName.toLowerCase().includes(keyword));
    }
    renderListStaff(list);
  });

  // toggle copy same time
  $(document).on("change", "#select-sametime", function () {
    const $this = $(this);
    const isCopySameTime = $this.prop("checked");

    salonStore.setState({ isSameTime: isCopySameTime });
  });

  $(document).on("click", ".serd-item", function () {
    const $this = $(this);
    const serviceId = $this.data("service-id");
    const itemServiceId = $this.data("item-service-id");

    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    const user = dataBooking.users.find((u) => u.isChoosing);

    // Cập nhật state
    salonStore.setState({
      itemServiceChoosing: {
        idService: serviceId,
        idItemService: itemServiceId,
      },
    });

    // Update active UI
    $(".serd-item").removeClass("active");
    $this.addClass("active");

    // Render lại list staff
    renderListStaff(store.listStaffUser);
  });

  // Xử lý chọn staff tại đây, setting multitech thì cho phép chọn nhiều tech cho các service, nếu không thì xử lý chọn 1 tech cho tất cả service
  // cũng gán tất cả service đã chọn bằng staff được chọn
  $(document).on("click", ".item-petech", function () {
    const store = salonStore.getState();
    const listStaffUser = store.listStaffUser;
    const dataBooking = store.dataBooking;
    const user = dataBooking.users.find((u) => u.isChoosing);

    const staffId = $(this).data("id");
    const staffSelected = listStaffUser.find(
      (stf) => stf.employeeID == staffId
    );

    // Tìm service đang active
    const $activeSer = $(".serd-item.active");
    if (!$activeSer.length) return;

    const serviceId = $activeSer.data("service-id");
    const itemServiceId = $activeSer.data("item-service-id");

    // Cập nhật staff được chọn cho itemService
    const serviceSelected = user.services.find(
      (srv) => srv.idService == serviceId
    );
    const itemServiceSelected =
      serviceSelected &&
      serviceSelected.itemService.find(
        (iSrv) => iSrv.idItemService == itemServiceId
      );
    if (itemServiceSelected) {
      itemServiceSelected.selectedStaff = staffSelected;
    }
    // Cập nhật store
    salonStore.setState({ dataBooking: { ...dataBooking } });
    // Re-render lại staff list và peser
    renderListPeSer();
    renderListStaff(listStaffUser);
  });
});
