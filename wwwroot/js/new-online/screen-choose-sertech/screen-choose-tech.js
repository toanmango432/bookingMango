function renderFooterTech_PageChooseTech() {
  const store = salonStore.getState();
  let chooseStaffBefore = store.chooseStaffBefore;
  // đã chọn tech mới được phép next
  const isNext = chooseStaffBefore.length > 0;
  const $wrapDirBtn = `
    <div class="wrap-dir-btn">
      <button id="btn-back-pctech" class="dir-btn-back-tech text-uppercase">Back</button>
      <button id="btn-next-pctech" class="dir-btn-next-tech text-uppercase ${
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
function renderFirstTechAvailable(tech) {
  const store = salonStore.getState();
  const chooseStaffBefore = store.chooseStaffBefore || [];
  const isSelected = chooseStaffBefore.includes(tech.employeeID);
  const firstChar = tech?.nickName?.charAt(0)?.toUpperCase() || "?";
  return `
    <div class="item-tech item-tech-sctpage wrap-item-tech-first ${
      isSelected ? "selected" : ""
    }" data-id=${tech?.employeeID}>
      <span class="icon-checked ${isSelected ? "selected" : ""}">
        <i class="fa-solid fa-check"></i>
      </span>
      <div class="wrap-image">
         <img
          src="${tech?.imageFileName || ""}"
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
  const chooseStaffBefore = store.chooseStaffBefore || [];

  const isStaff = chooseStaffBefore.includes(staff.employeeID);
  const firstChar = staff?.nickName?.charAt(0)?.toUpperCase() || "?";
  const color = staff.color === "#FFFFFF" ? "#505050" : staff.color;
  return `
    <div
      class="item-tech item-tech-sctpage staff ${isStaff ? "selected" : ""}"
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

function renderListStaff_PageChooseTech(listUserStaff) {
  if (!listUserStaff?.length) return "";
  let htmlListTech = "";

  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);

  // staff idStaffDefault (Next Available)
  const techAvailable = listUserStaff.find(
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
  htmlListTech += listUserStaff
    .filter((s) => s.employeeID !== idStaffDefault)
    .map((staff) => renderItemTech(staff))
    .join("");

  const listTech = $(".list-techs");
  if (listTech.length) {
    listTech.empty();
    listTech.append(htmlListTech);
  }
  return htmlListTech;
}
export async function ScreenChooseTech() {
  const store = salonStore.getState();
  const dataBooking = store.dataBooking;
  const user = dataBooking.users.find((u) => u.isChoosing);
  const listStaffUser = await store.getListUserStaff();
  const salonChoosing = store.salonChoosing;

  const htmlHeaderSalon = HeaderSalon(salonChoosing);
  const $wrapDirBtn = renderFooterTech_PageChooseTech();
  const htmlScreenChooseTechs = `
        <div class="wrap-content-salon">
             <div class="header-sertech">
                ${htmlHeaderSalon}
            </div>
            <div class="content-choose-sertech">
                <div class="choose-ptechs">
                    <div class="wrap-title">
                      <h2 class="title text-uppercase">Choose technician</h2>
                    </div>
                    <p class="desc">
                        Pick <b>SERVICE</b> if you know the service you want, or pick <b>STAFF</b> if you prefer your favorite technician.
                    </p>
                    <div class="btn-group-service">
                        <button id="flow-ser" class="btn-service" data-type="service">
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M19.7329 9.87507C19.5903 9.88479 19.0052 10.8062 18.7305 11.2657C18.6526 11.2657 17.1771 12.014 17.1865 12.314C17.194 12.554 18.1584 13.1264 18.6396 13.3827C18.8646 13.8514 19.3746 14.7945 19.6146 14.817C19.8546 14.8395 20.4577 13.8702 20.7293 13.3827C21.1608 13.1483 22.0445 12.6271 22.127 12.4171C22.2301 12.1546 20.8154 11.3268 20.7293 11.3514C20.6432 11.376 19.9113 9.86292 19.7329 9.87507Z" fill="black" stroke="black" stroke-width="0.1"/>
                            <path d="M5.33499 3.11726C5.19232 3.12698 4.60725 4.04839 4.33255 4.50789C4.2547 4.50789 2.7792 5.25617 2.78857 5.55616C2.79607 5.79615 3.76044 6.36863 4.24169 6.62487C4.46668 7.09361 4.97666 8.0367 5.21665 8.0592C5.45664 8.0817 6.05979 7.11236 6.33137 6.62487C6.76289 6.39051 7.64656 5.86928 7.72906 5.65928C7.83218 5.39679 6.41748 4.56898 6.33137 4.59359C6.24526 4.61819 5.51332 3.10511 5.33499 3.11726Z" fill="black" stroke="black" stroke-width="0.1"/>
                            <path d="M17.2175 5.95774C16.8105 5.55483 15.9762 4.72727 15.8952 4.64133L17.4548 3.06281L18.0128 2.42034L18.5553 1.76172L19.9187 3.14657L18.666 4.37092L17.2175 5.95774Z" fill="black"/>
                            <path d="M15.258 5.59173L12.7919 8.03377L13.8884 9.06364L16.2686 6.65035L15.258 5.59173Z" fill="black"/>
                            <path d="M13.4726 9.64588C13.4097 9.6319 12.3049 8.47118 12.2699 8.40825C11.7147 8.44541 11.3498 8.6985 11.1806 9.19531C10.9351 9.91608 11.6888 10.6211 12.3876 10.7266C13.0864 10.832 13.4726 9.80078 13.4726 9.64588Z" fill="black"/>
                            <path d="M12.1648 7.64548L13.2748 6.52142C12.3983 5.40669 11.7267 5.0907 11.3755 5.20937C9.15854 5.9586 8.76585 8.47073 8.74778 8.55941C8.6055 9.25781 8.37724 12.0699 8.58767 12.9955C9.23862 15.8588 14.1562 16.0523 14.4134 12.6727L14.3606 9.64588C13.8269 10.9952 13.6333 11.1888 13.2116 11.3689C11.3358 11.8818 10.4727 10.1336 10.4366 9.50017C10.3593 8.14428 11.5396 8.05763 12.1648 7.64548Z" fill="black"/>
                            <path d="M15.0875 12.9955C13.3642 17.9122 8.2904 15.9377 7.79359 12.939C7.78663 12.8969 7.53951 13.1765 7.37227 14.5207C7.35493 14.6601 7.22157 21.0383 7.37227 21.788C7.52296 22.5377 8.13672 22.7443 8.30154 22.7443C8.55859 22.7443 14.0692 22.7752 14.5113 22.7443C15.383 22.625 15.4922 22.0859 15.5251 21.788C15.5492 21.5691 15.6114 17.3499 15.5469 15.2656C15.5469 14.2266 15.125 12.9453 15.0875 12.9955Z" fill="black"/>
                            <path d="M17.2175 5.95774C16.8105 5.55483 15.9762 4.72727 15.8952 4.64133L17.4548 3.06281L18.0128 2.42034L18.5553 1.76172L19.9187 3.14657L18.666 4.37092L17.2175 5.95774Z" stroke="black" stroke-width="0.1"/>
                            <path d="M15.258 5.59173L12.7919 8.03377L13.8884 9.06364L16.2686 6.65035L15.258 5.59173Z" stroke="black" stroke-width="0.1"/>
                            <path d="M13.4726 9.64588C13.4097 9.6319 12.3049 8.47118 12.2699 8.40825C11.7147 8.44541 11.3498 8.6985 11.1806 9.19531C10.9351 9.91608 11.6888 10.6211 12.3876 10.7266C13.0864 10.832 13.4726 9.80078 13.4726 9.64588Z" stroke="black" stroke-width="0.1"/>
                            <path d="M12.1648 7.64548L13.2748 6.52142C12.3983 5.40669 11.7267 5.0907 11.3755 5.20937C9.15854 5.9586 8.76585 8.47073 8.74778 8.55941C8.6055 9.25781 8.37724 12.0699 8.58767 12.9955C9.23862 15.8588 14.1562 16.0523 14.4134 12.6727L14.3606 9.64588C13.8269 10.9952 13.6333 11.1888 13.2116 11.3689C11.3358 11.8818 10.4727 10.1336 10.4366 9.50017C10.3593 8.14428 11.5396 8.05763 12.1648 7.64548Z" stroke="black" stroke-width="0.1"/>
                            <path d="M15.0875 12.9955C13.3642 17.9122 8.2904 15.9377 7.79359 12.939C7.78663 12.8969 7.53951 13.1765 7.37227 14.5207C7.35493 14.6601 7.22157 21.0383 7.37227 21.788C7.52296 22.5377 8.13672 22.7443 8.30154 22.7443C8.55859 22.7443 14.0692 22.7752 14.5113 22.7443C15.383 22.625 15.4922 22.0859 15.5251 21.788C15.5492 21.5691 15.6114 17.3499 15.5469 15.2656C15.5469 14.2266 15.125 12.9453 15.0875 12.9955Z" stroke="black" stroke-width="0.1"/>
                          </svg>
                          SERVICE - I want to choose a service
                        </button>
                        <button id="flow-tech" class="btn-service active" data-type="staff">
                        <i class="fa-solid fa-user-plus"></i>
                        STAFF - I want to choose a technician
                        </button>
                    </div>
                    <div class="wrap-search-tech mt-3">
                        <div class="container-search-tech">
                          <input id="input-search-tech-1" type="text" class="input-search-tech" placeholder="Search by name..."/>
                          <button class="btn-search-toggle"><i class="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </div>
                </div>
                <div class="list-techs"></div>
                <div class="footer-dir">
                    ${$wrapDirBtn}
                </div>
            </div>
        </div>
    `;
  const $wrapNewOnline = $(".wrap-newonline");
  $wrapNewOnline.empty();
  $wrapNewOnline.append(htmlScreenChooseTechs);
  renderListStaff_PageChooseTech(listStaffUser);
  // append Card
  Cart();
}
// import store
import { salonStore } from "../../store/new-online-store.js";
import { HeaderSalon } from "../header/header-salon.js";
// import constant
import { idStaffDefault } from "../../constants/template-online.js";
// import component
import { ScreenChooseServiceForTech } from "./choose-service-for-tech/choose-service-for-tech.js";
import { ServiceOrTech } from "../service-or-tech/service-or-tech.js";
import { Cart } from "../cart/cart.js";
import { PageCurrent } from "../../constants/new-online.js";
$(document).ready(async function () {
  const store = salonStore.getState();

  const $wrapNewOnline = $(".wrap-newonline");
  // Lưu staff chọn vào chooseStaffBefore
  $(document).on("click", ".item-tech-sctpage", async function () {
    const $this = $(this);
    const staffId = $this.data("id");

    const store = salonStore.getState();
    const isBookMultipleTech = store.isBookMultipleTech;
    let chooseStaffBefore = store.chooseStaffBefore || [];

    if (isBookMultipleTech) {
      // --- Trường hợp cho phép chọn nhiều tech ---
      const isExist = chooseStaffBefore.includes(staffId);

      if (isExist) {
        // Nếu click staff đã chọn => bỏ chọn
        chooseStaffBefore = chooseStaffBefore.filter((id) => id !== staffId);
      } else {
        // Nếu chưa có => thêm vào
        chooseStaffBefore.push(staffId);
      }
    } else {
      // --- Trường hợp chỉ cho phép chọn 1 tech duy nhất ---
      if (chooseStaffBefore.length === 1 && chooseStaffBefore[0] === staffId) {
        // Nếu click lại staff đang chọn => bỏ chọn hết
        chooseStaffBefore = [];
      } else {
        // Nếu chọn staff khác => chỉ giữ staff này
        chooseStaffBefore = [staffId];
      }
    }

    // Cập nhật lại store
    const dataBooking = store.dataBooking;
    const user = dataBooking.users.find((u) => u.isChoosing);
    user.services = []; // reset
    salonStore.setState({
      ...store,
      dataBooking,
      chooseStaffBefore,
    });

    // Render lại staff với trạng thái selected mới
    const listStaff =
      store.listStaffUser?.length > 0
        ? store.listStaffUser
        : await store.getListUserStaff();

    // Lặp qua tất cả staff trong danh sách và re-render (để trạng thái chính xác)
    listStaff.forEach((staff) => {
      const $staffEl = $(`.item-tech-sctpage[data-id="${staff.employeeID}"]`);
      if ($staffEl.length) {
        const newHtml = renderItemTech(staff);
        $staffEl.replaceWith(newHtml);
      }
    });

    // Render lại footer (cập nhật nút Next nếu cần)
    renderFooterTech_PageChooseTech();
  });

  // btn back tech to services
  $(document).on("click", "#btn-back-pctech", async function () {
    const $this = $(this);

    ServiceOrTech();
  });
  $(document).on("input", "#input-search-tech-1", async function () {
    const store = salonStore.getState();
    const listStaffUser = store.listStaffUser;

    const keyword = $(this).val().toLowerCase();
    let list = listStaffUser;
    if (keyword) {
      list = list.filter((u) => u.nickName.toLowerCase().includes(keyword));
    }
    renderListStaff_PageChooseTech(list);
  });
  $(document).on("click", "#btn-next-pctech", async function () {
    const $this = $(this);
    const store = salonStore.getState();
    const chooseStaffBefore = store.chooseStaffBefore;
    // Kiểm tra đã chọn service chưa trước khi next
    const isNext = chooseStaffBefore.length > 0;
    if (!isNext) return;
    // Chuyển page chọn nhiều service cho tech, có thể chọn nhiều service cho 1 tech và 1 service chọn nhiều tech,
    salonStore.setState({
      ...store,
      pageCurrent: PageCurrent.CHOOSE_SERVICE_FOR_TECH,
    });
    await ScreenChooseServiceForTech();
  });
});
