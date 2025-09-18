// helper: cố gắng auto-assign staff nếu các service đã chọn đều cùng 1 staff
// trả về { isNext: boolean, appliedStaff: object|null, reason: string }
function tryAutoAssignSelectedStaffAndUpdateStore() {
  const store = salonStore.getState();
  const dataBooking = JSON.parse(JSON.stringify(store.dataBooking));
  const user = dataBooking.users.find((u) => u.isChoosing);
  if (!user) return { isNext: false, appliedStaff: null, reason: "no_user" };

  const allServices = (user.services || []).flatMap((c) => c.itemService || []);
  if (!allServices.length) {
    return { isNext: false, appliedStaff: null, reason: "no_services" };
  }

  const withStaff = allServices.filter(
    (s) => s.selectedStaff && Object.keys(s.selectedStaff).length > 0
  );
  const withoutStaff = allServices.filter(
    (s) => !s.selectedStaff || Object.keys(s.selectedStaff).length === 0
  );

  // nếu chưa chọn ai cả -> không next
  if (withStaff.length === 0) {
    return { isNext: false, appliedStaff: null, reason: "no_staff_selected" };
  }

  const staffKey = (s) =>
    s && (s.employeeID ?? s.employeeId ?? s.id ?? JSON.stringify(s));

  const staffIds = Array.from(
    new Set(withStaff.map((s) => staffKey(s.selectedStaff)))
  );

  // nếu đã có nhiều staff khác nhau -> không next
  if (staffIds.length > 1) {
    if (withoutStaff.length === 0) {
      return {
        isNext: true,
        appliedStaff: null,
        reason: "all_assigned_multiple_staff",
      };
    }
    // Nếu nhiều staff mà còn cái chưa chọn -> không biết gán ai -> không next
    return {
      isNext: false,
      appliedStaff: null,
      reason: "multiple_different_staff",
    };
  }

  // tất cả withStaff cùng một staff -> gán cho những cái chưa chọn
  const staffToApply = withStaff[0].selectedStaff;
  withoutStaff.forEach((s) => {
    s.selectedStaff = { ...staffToApply };
  });

  // sau khi gán, kiểm tra lại: tất cả đã có staff chưa?
  const stillWithoutStaff = allServices.some(
    (s) => !s.selectedStaff || Object.keys(s.selectedStaff).length === 0
  );

  if (stillWithoutStaff) {
    return { isNext: false, appliedStaff: null, reason: "some_without_staff" };
  }

  // cập nhật store
  salonStore.setState((prev) => ({
    ...prev,
    dataBooking,
  }));

  return { isNext: true, appliedStaff: staffToApply, reason: "all_assigned" };
}

export function renderFooterTech_PageChooseOnlyTech() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);
  // Gọi helper -> nó sẽ auto-assign nếu có thể, và trả isNext
  const result = tryAutoAssignSelectedStaffAndUpdateStore();
  const isNext = result.isNext;

  const hasAnyItemService =
    user?.services?.some((cate) => cate.itemService?.length > 0) ?? false;

  // Nút back có thêm hand khi chưa có service
  const backBtn = `
    <button id="btn-back-tech" class="dir-btn-back-tech text-uppercase">
      ${!hasAnyItemService ? '<span class="hand-anim">👉</span>' : ""} Back
    </button>
  `;
  const $wrapDirBtn = `
    <div class="wrap-dir-btn ${hasAnyItemService ? "" : "not-ser"}">
      ${backBtn}
      <button id="btn-next-tech" class="dir-btn-next-tech text-uppercase ${
        isNext ? "allow-next" : ""
      }">Next</button>
    </div>
    ${
      !hasAnyItemService
        ? `<div class="tip-text">Please go back to select service</div>`
        : ""
    }
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
  const firstChar = tech?.nickName?.charAt(0)?.toUpperCase() || "?";

  return `
    <div class="item-tech item-tech-ctpage wrap-item-tech-first ${
      isSelected ? "selected" : ""
    }" data-id=${tech?.employeeID}>
      <span class="icon-checked ${isSelected ? "selected" : ""}">
        <i class="fa-solid fa-check"></i>
      </span>
      <div
        class="wrap-image"
      >
        <img
          src="${tech?.imageFileName}"
          alt="${tech.nickName}"
          class="image-avail"
          data-fallback="${firstChar}"
          onerror="
            const fb = this.getAttribute(&quot;data-fallback&quot;) || '?';
            this.outerHTML = '<div class=&quot;image-fallback&quot;>' + fb + '</div>';
          "
        />
      </div>
      <div class="left-item-tech">
        <h2 class="name-tech">
          ${tech.nickName}
        </h2>
        <span class="sub-avail">
          for maximum availability
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

  const isStaff = user?.services.some((cate) =>
    cate.itemService.some(
      (srv) => srv.selectedStaff?.employeeID === staff.employeeID
    )
  );

  const firstChar = staff?.nickName?.charAt(0)?.toUpperCase() || "?";
  const color = staff.color === "#FFFFFF" ? "#505050" : staff.color;

  return `
    <div
      class="item-tech item-tech-ctpage staff ${isStaff ? "selected" : ""}"
      data-id=${staff?.employeeID}
      style="--border-color:${staff.color || "#6f42c1"}"
    >
      <span class="icon-checked ${isStaff ? "selected" : ""}"">
        <i class="fa-solid fa-check"></i>
      </span>
      <div
        class="wrap-image"
        style="--color-img: ${color}; --bg-img: ${color + "20"}"
      >
        <img
          src="${staff.imageFileName}"
          alt="${staff.nickName}"
          class="image-avail"
          data-fallback="${firstChar}"
          onerror="
            const fb = this.getAttribute(&quot;data-fallback&quot;) || '?';
            this.outerHTML = '<div class=&quot;image-fallback&quot;>' + fb + '</div>';
          "
        />
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
export function renderListStaff_PageChooseOnlyTech(listStaffUser) {
  if (!listStaffUser?.length) return "";
  let htmlListTech = "";

  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);

  // staff idStaffDefault (Next Available)
  const techAvailable = listStaffUser.find(
    (s) => s.employeeID === idStaffDefault
  );
  if (techAvailable) {
    const isSelected9999 = user?.services.some((cate) =>
      cate.itemService.some(
        (srv) => srv.selectedStaff?.employeeID === idStaffDefault
      )
    );
    htmlListTech += renderFirstTechAvailable(techAvailable, isSelected9999);
  }

  // staff khác
  htmlListTech += listStaffUser
    .filter((s) => s.employeeID !== idStaffDefault)
    .map((staff) => renderItemTech(staff))
    .join("");

  const listTech = $(".list-techs");
  if (listTech.length) {
    listTech.empty();
    listTech.append(htmlListTech);
  }

  // tại đây kiểm tra userChoosing = true có đang có itemService nào không
  const hasAnyItemService =
    user?.services?.some((cate) => cate.itemService?.length > 0) ?? false;
  if (!hasAnyItemService) {
    $(".list-techs").addClass("not-ser");
    $(".choose-multitech").addClass("not-ser");
  }
  return htmlListTech;
}
export async function ChooseTechForServices() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);
  const listStaffUser = store.listStaffUser?.length
    ? store.listStaffUser
    : await store.getListUserStaff();
  const salonChoosing = store.salonChoosing;

  const htmlHeaderSalon = HeaderSalon(salonChoosing);
  // Render footer
  const $wrapDirBtn = renderFooterTech_PageChooseOnlyTech();
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
                      Select tech for service
                    </p>
                    <div class="wrap-search-tech">
                        <div class="container-search-tech">
                          <input id="input-search-tech-2" type="text" class="input-search-tech" placeholder="Search by name..."/>
                          <button class="btn-search-toggle"><i class="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </div>
                </div>
                <div class="list-techs"></div>
                <div class="wrap-choose-multitech">
                  <div class="choose-multitech">
                    <span class="icon-c-multitech">
                      <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                        <path d="M24.4991 10.5464C24.4591 10.5464 24.4324 10.5464 24.3924 10.5464H24.3258C21.8058 10.4664 19.9258 8.51969 19.9258 6.11969C19.9258 3.66636 21.9258 1.67969 24.3658 1.67969C26.8058 1.67969 28.8058 3.67969 28.8058 6.11969C28.7925 8.53302 26.9124 10.4797 24.5124 10.5597C24.5124 10.5464 24.5124 10.5464 24.4991 10.5464ZM24.3658 3.66636C23.0191 3.66636 21.9258 4.7597 21.9258 6.10636C21.9258 7.42636 22.9525 8.49303 24.2725 8.54637C24.2858 8.53303 24.3924 8.53303 24.5124 8.54637C25.8058 8.4797 26.8058 7.41303 26.8191 6.10636C26.8191 4.7597 25.7258 3.66636 24.3658 3.66636Z" fill="#5C5C5C"/>
                        <path d="M24.514 20.3742C23.994 20.3742 23.474 20.3342 22.954 20.2408C22.4073 20.1475 22.0473 19.6275 22.1407 19.0808C22.234 18.5342 22.754 18.1742 23.3007 18.2675C24.9407 18.5475 26.674 18.2409 27.834 17.4675C28.4607 17.0542 28.794 16.5342 28.794 16.0142C28.794 15.4942 28.4473 14.9875 27.834 14.5742C26.674 13.8008 24.914 13.4942 23.2607 13.7875C22.714 13.8942 22.194 13.5208 22.1007 12.9742C22.0073 12.4275 22.3673 11.9075 22.914 11.8142C25.0873 11.4275 27.3407 11.8408 28.9407 12.9075C30.114 13.6942 30.794 14.8142 30.794 16.0142C30.794 17.2008 30.1273 18.3342 28.9407 19.1342C27.7273 19.9342 26.154 20.3742 24.514 20.3742Z" fill="#5C5C5C"/>
                        <path d="M8.46063 10.548C8.44729 10.548 8.43396 10.548 8.43396 10.548C6.03396 10.468 4.15396 8.5213 4.14062 6.1213C4.14062 3.66796 6.14063 1.66797 8.58063 1.66797C11.0206 1.66797 13.0206 3.66797 13.0206 6.10797C13.0206 8.5213 11.1406 10.468 8.74063 10.548L8.46063 9.54797L8.55396 10.548C8.52729 10.548 8.48729 10.548 8.46063 10.548ZM8.59396 8.54797C8.67396 8.54797 8.74063 8.54797 8.82063 8.5613C10.0073 8.50797 11.0473 7.4413 11.0473 6.1213C11.0473 4.77463 9.95396 3.68129 8.6073 3.68129C7.26063 3.68129 6.16729 4.77463 6.16729 6.1213C6.16729 7.42796 7.18062 8.4813 8.47396 8.5613C8.48729 8.54797 8.54063 8.54797 8.59396 8.54797Z" fill="#5C5C5C"/>
                        <path d="M8.44797 20.3742C6.80797 20.3742 5.23463 19.9342 4.0213 19.1342C2.84797 18.3475 2.16797 17.2142 2.16797 16.0142C2.16797 14.8275 2.84797 13.6942 4.0213 12.9075C5.6213 11.8408 7.87463 11.4275 10.048 11.8142C10.5946 11.9075 10.9546 12.4275 10.8613 12.9742C10.768 13.5208 10.248 13.8942 9.7013 13.7875C8.04797 13.4942 6.3013 13.8008 5.12797 14.5742C4.5013 14.9875 4.16797 15.4942 4.16797 16.0142C4.16797 16.5342 4.51464 17.0542 5.12797 17.4675C6.28797 18.2409 8.0213 18.5475 9.6613 18.2675C10.208 18.1742 10.728 18.5475 10.8213 19.0808C10.9146 19.6275 10.5546 20.1475 10.008 20.2408C9.48797 20.3342 8.96797 20.3742 8.44797 20.3742Z" fill="#5C5C5C"/>
                        <path d="M16.4991 20.5073C16.4591 20.5073 16.4324 20.5073 16.3924 20.5073H16.3258C13.8058 20.4273 11.9258 18.4806 11.9258 16.0806C11.9258 13.6273 13.9258 11.6406 16.3658 11.6406C18.8058 11.6406 20.8058 13.6406 20.8058 16.0806C20.7924 18.494 18.9124 20.4406 16.5124 20.5206C16.5124 20.5073 16.5124 20.5073 16.4991 20.5073ZM16.3658 13.6273C15.0191 13.6273 13.9258 14.7206 13.9258 16.0673C13.9258 17.3873 14.9525 18.454 16.2725 18.5073C16.2858 18.494 16.3924 18.494 16.5124 18.5073C17.8058 18.4406 18.8058 17.374 18.8191 16.0673C18.8191 14.734 17.7258 13.6273 16.3658 13.6273Z" fill="#5C5C5C"/>
                        <path d="M16.5004 30.345C14.9004 30.345 13.3004 29.9317 12.0604 29.0917C10.887 28.305 10.207 27.185 10.207 25.985C10.207 24.7983 10.8737 23.6517 12.0604 22.865C14.5537 21.2117 18.4604 21.2117 20.9404 22.865C22.1137 23.6517 22.7937 24.7717 22.7937 25.9717C22.7937 27.1583 22.127 28.305 20.9404 29.0917C19.7004 29.9184 18.1004 30.345 16.5004 30.345ZM13.167 24.545C12.5404 24.9583 12.207 25.4783 12.207 25.9983C12.207 26.5183 12.5537 27.025 13.167 27.4383C14.967 28.6517 18.0204 28.6517 19.8204 27.4383C20.447 27.025 20.7804 26.505 20.7804 25.985C20.7804 25.465 20.4337 24.9583 19.8204 24.545C18.0337 23.3317 14.9804 23.345 13.167 24.545Z" fill="#5C5C5C"/>
                      </svg>
                    </span>
                    <span class="text-c-multitech">
                      Choose Tech per Service
                    </span>
                  </div>
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
  renderListStaff_PageChooseOnlyTech(listStaffUser);
  // append Card
  Cart();
  return htmlScreenChooseTech;
}
// import store
import { salonStore } from "../../../store/new-online-store.js";
// import constant
import { idStaffDefault } from "../../../constants/template-online.js";
import { monthNames, dayNames } from "../../../constants/days-weeks.js";
// import component
import { HeaderSalon } from "../../header/header-salon.js";
import { ScreenChooseService } from "../screen-choose-service.js";
import { Cart } from "../../cart/cart.js";
import { ChooseTechForEachServices } from "../choose-tech-for-each-service/choose-tech-for-each-service.js";
import { PageCurrent } from "../../../constants/new-online.js";
import {
  renderChooseTime,
  updateCalendarData,
  renderCalendar,
} from "../../choose-time/choose-time.js";
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

  // btn back tech to services
  $(document).on("click", "#btn-back-tech", async function () {
    const $this = $(this);

    await ScreenChooseService();
  });

  $(document).on("input", "#input-search-tech-2", async function () {
    const store = salonStore.getState();
    const listStaffUser = store.listStaffUser;
    const keyword = $(this).val().toLowerCase();
    let list = listStaffUser;
    if (keyword) {
      list = list.filter((u) => u.nickName.toLowerCase().includes(keyword));
    }
    renderListStaff_PageChooseOnlyTech(list);
  });

  // Xử lý chọn staff tại đây, dù có setting multitech hay không thì
  // cũng gán tất cả service đã chọn bằng staff được chọn
  $(document).on("click", ".item-tech-ctpage", async function () {
    const $this = $(this);
    if ($this.hasClass("not-ser")) {
      console.log("Please back to choose tech!");
      return;
    }
    const store = salonStore.getState();
    const listStaffUser = store.listStaffUser;
    const dataBooking = store.dataBooking;
    const user = dataBooking.users.find((u) => u.isChoosing);

    const idStaff = $this.data("id");
    const inforStaff = listStaffUser.find((s) => s.employeeID == idStaff);

    // update staff cho toàn bộ service của user
    user.services.forEach((cate) => {
      cate.itemService.forEach((srv) => {
        srv.selectedStaff = inforStaff;
      });
    });

    salonStore.setState({ ...store, dataBooking: { ...dataBooking } });
    // render lại list staff
    renderListStaff_PageChooseOnlyTech(listStaffUser);
    // render lại footer
    renderFooterTech_PageChooseOnlyTech();
    // render lại cart
    Cart();
  });

  $(document).on("click", "#btn-next-tech", async function () {
    const $this = $(this);
    const store = salonStore.getState();
    const dataBooking = store.dataBooking;
    const user = dataBooking.users.find((u) => u.isChoosing);
    // Kiểm tra đã chọn service chưa trước khi next
    const isNext = user.services.some((cate) =>
      cate.itemService.some(
        (srv) => srv.selectedStaff && Object.keys(srv.selectedStaff).length > 0
      )
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
  $(document).on("click", ".choose-multitech", async function () {
    const $this = $(this);
    const store = salonStore.getState();
    if ($this.hasClass("not-ser")) {
      console.log("Please back to choose service!");
      return;
    }
    // Chuyển page chọn tech cho từng service, chỉ chọn được 1 thợ cho 1 service
    salonStore.setState({
      ...store,
      pageCurrent: PageCurrent.CHOOSE_TECH_FOR_SERVICE,
    });
    await ChooseTechForEachServices();
  });
});
