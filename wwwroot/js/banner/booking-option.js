// function render option banner
export function renderBookingOption(
  containerSelector,
  btnOptionBook,
  optionBooked
) {
  const { content, bgColor, border, color, icon } = btnOptionBook;

  const html = `
      <button class="btn-option-banner-selected"
        style="
          --color-book-for: ${color};
          --bg-book-for: ${bgColor};
          --border-book-for: ${border};
        "
      >
        <span class="text-selected-option">
          ${content.find((x) => x.type === optionBooked).text}
        </span>
        ${icon}
      </button>
      <div class="list-option-booking">
        ${content
          .map((item) => {
            if (item.type === optionBooked) return "";
            return `
            <button class="option-item-booking" data-type="${item.type}"
              style="
                --color-book-for: ${color};
                --bg-book-for: ${bgColor};
                --border-book-for: ${border};
              "
            >
              ${item.text}
            </button>
          `;
          })
          .join("")}
      </div>
    `;

  $(containerSelector).html(html);
}
// import store
import { templateStore } from "../store/template-store.js";
import { dataRelease } from "../templateDetail.js";
// import constant
import {
  typeBookingEnum,
  genderEnum,
  idStaffDefault,
} from "../constants/template-online.js";
// --------
import { renderSumary } from "../sumary/sumary.js";
import {
  updateGuestSection,
  renderListService,
} from "../layout-template/layout.js";
import { showScrollToTarget } from "../scroll-quickly/scroll-quickly.js";
import {
  formatPhoneNumber,
  isValidPhoneNumber,
} from "../helper/format-phone.js";
import { shakeError } from "../helper/shake-error.js";
import { updateCalendarData } from "../templateDetail.js";
import { renderCalendar } from "../calander/calander.js";

import {
  validateFirstNameInput,
  validateLastNameInput,
  validateEmailPhoneInputBanner,
  isValidEmail,
  checkValInputs,
} from "../helper/input/valid-form.js";
import { formatAutoFirstName } from "../helper/find-work.js";
import { renderInfoUser } from "../layout-template/layout.js";
import { renderCopyServiceOption } from "./copy-service-option.js";
import { renderCopyServiceBtn } from "../layout-template/layout.js";
import { showScrollToFinalBooking } from "../scroll-quickly/scroll-quickly.js";
import { monthNames, dayNames } from "../constants/days-weeks.js";

$(document).ready(async function () {
  let dataBooking = templateStore.getState().dataBooking;
  let dataGuest = templateStore.getState().dataGuest;
  let listDataService = await templateStore.getState().getListDataService();
  let currentMonth = templateStore.getState().currentMonth;
  let currentYear = templateStore.getState().currentYear;
  let daysOffNail = templateStore.getState().daysOffNail;
  let selectedDate = templateStore.getState().selectedDate;
  let RVCNo = templateStore.getState().RVCNo;
  let banner = dataRelease?.banner;

  // Toggle chọn loại dịch vụ
  $(document).on("click", ".btn-option-banner-selected", function (e) {
    e.stopPropagation(); // tránh bị close ngay khi click

    const $dropdown = $(this).next(".list-option-booking");
    $(".btn-option-banner-selected i")
      .not($(this).find("i"))
      .removeClass("rotate-180");

    $(".list-option-booking").not($dropdown).removeClass("active"); // close các dropdown khác
    $dropdown.toggleClass("active");
    $(this).find("i").toggleClass("rotate-180");
  });

  // Đóng dropdown khi click ra ngoài
  $(document).on("click", function () {
    $(".list-option-booking").removeClass("active");
    $(".list-option-copy").removeClass("active");
  });
  //
  $(document).on("click", ".option-item-booking", async function (e) {
    const dataBooking = templateStore.getState().dataBooking;
    const dataMe = templateStore.getState().dataMe;

    e.stopPropagation();
    const selectedType = $(this).data("type");
    const selectedText = $(this).text().trim();
    // Cập nhật dữ liệu optionBooked nếu cần (tùy vào logic bạn dùng lưu ở đâu)
    banner.optionBooked = selectedType;

    // Render lại component option
    renderBookingOption(
      ".wrap-book-for",
      banner.btnOptionBook,
      banner.optionBooked
    );
    // Hiện ô nhập thêm nếu là guests hoặc family
    if (selectedType === typeBookingEnum.GUESTS) {
      dataBooking.type = typeBookingEnum.GUESTS;
      dataBooking.users = dataGuest;
      dataBooking.users[0].isChoosing = true;
    }
    if (selectedType !== typeBookingEnum.ME) {
      dataBooking.type = selectedType;
      const tempData = templateStore.getState().dataGuest;
      dataBooking.users = tempData;

      // update store
      templateStore.setState({
        dataBooking: { ...dataBooking },
      });
    } else {
      dataBooking.type = typeBookingEnum.ME;
      dataBooking.users = dataMe;

      // update store
      templateStore.setState({
        dataBooking: { ...dataBooking },
      });
    }

    // show or hide cả 2
    if (dataBooking.type !== typeBookingEnum.ME) {
      $(".wrap-input-guests").removeClass("hidden");
      updateGuestSection(dataBooking);
    } else {
      $(".wrap-input-guests").addClass("hidden");
      $(".wrap-control").empty();
      $(".wrap-input-guests").empty();
    }

    // render lại list service
    renderListService(listDataService, ".list-more", dataBooking);
  });
  // Tăng số lượng khách
  $(document).on("click", ".btn-increase", function () {
    // max guest 6
    if (dataBooking.users.length >= 6) return;
    const maxId = dataBooking.users.reduce((max, i) => Math.max(max, i.id), 0);
    const newId = maxId + 1;
    dataBooking.users.push({
      id: newId,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: genderEnum.OTHER,
      services: [],
      selectedDate: null,
      selectedTimeSlot: null,
      isSelecting: false,
      isChoosing: false,
      isSelecting: false,
      isChoosing: false,
    });
    updateGuestSection(dataBooking);
  });

  // Giảm số lượng
  $(document).on("click", ".btn-decrease", function () {
    if (dataBooking.users.length <= 1) {
      alert("Bạn phải chọn tối thiểu 1 người.");
      return;
    }
    const idx = dataBooking.users.findIndex((i) => i.firstName === "");
    if (idx === -1) {
      alert("Không thể xóa khi tất cả các ô đã điền tên.");
      return;
    }
    const idToRemove = dataBooking.users[idx].id;
    dataBooking.users.splice(idx, 1);
    updateGuestSection(dataBooking);
  });

  // Xóa từng input
  $(document).on("click", ".btn-remove", function () {
    const $inpWrap = $(this).closest(".guest-input");
    const id = +$inpWrap.data("id");

    if (dataBooking.users[0].id === id) {
      alert("Không thể xoá người dùng này!");
      return;
    }
    const index = dataBooking.users.findIndex((i) => i.id === id);
    const obj = dataBooking.users[index];
    const nearestLeftUser = dataBooking.users[index - 1];
    dataBooking.users = dataBooking.users.filter((i) => i.id !== id);

    nearestLeftUser.isChoosing = true;
    updateGuestSection(dataBooking);
    renderSumary(dataBooking, listDataService);
  });
  // Cập nhật data khi onChange input
  // firstname
  $(document).on("input", "#firstname-banner", function () {
    const dataBooking = templateStore.getState().dataBooking;

    const $this = $(this);
    const $parent = $this.closest(".wrap-input-guests");
    const userCur = dataBooking.users.find((u) => u.isChoosing);
    const isFirst = dataBooking.users[0].id === userCur.id;
    const $findInputFullname = $parent.find(
      `.guest-input[data-id=${userCur.id}] input`
    );

    const $error = $this.next(".error-message");

    const val = $this.val();
    $findInputFullname.val(val);
    if (val === "") {
      $findInputFullname.val(`GUEST ${userCur.id}`);
    }
    // Valid text required
    if (isFirst && val === "") {
      $this.addClass("is-invalid");
      $error.text("First name is required.");
    } else {
      $this.removeClass("is-invalid");
      $error.text("");
      // check show scroll service || timming
      const isShowSroll = checkValInputs([
        "#firstname-banner",
        "#lastname-banner",
        "#emailPhone-banner",
      ]);
      isShowSroll && showScrollToTarget(dataBooking);
    }
    // Update data user
    userCur.firstName = val;

    templateStore.setState({ dataBooking: { ...dataBooking } });
  });
  //  lastName
  $(document).on("input", "#lastname-banner", function () {
    const dataBooking = templateStore.getState().dataBooking;

    const $this = $(this);
    const userCur = dataBooking.users.find((u) => u.isChoosing);
    const isFirst = dataBooking.users[0].id === userCur.id;

    const $error = $this.next(".error-message");

    const val = $this.val();
    // Valid text required
    if (isFirst && val === "") {
      $this.addClass("is-invalid");
      $error.text("Last name is required.");
    } else {
      $this.removeClass("is-invalid");
      $error.text("");
      // check show scroll service || timming
      const isShowSroll = checkValInputs([
        "#firstname-banner",
        "#lastname-banner",
        "#emailPhone-banner",
      ]);
      isShowSroll && showScrollToTarget(dataBooking);
    }

    // Update data user
    userCur.lastName = val;

    templateStore.setState({ dataBooking: { ...dataBooking } });
  });
  //  phone or email
  $(document).on("input", "#emailPhone-banner", function () {
    const dataBooking = templateStore.getState().dataBooking;

    const $this = $(this);
    const userCur = dataBooking.users.find((u) => u.isChoosing);
    const isFirst = dataBooking.users[0].id === userCur.id;

    let val = $this.val().trim();
    const $error = $this.next(".error-message");

    const digits = val.replace(/\D/g, "");

    let isPhone = false;
    let isEmail = false;

    // Check nếu là phone đủ 10 số
    if (digits.length === 10 && /^\d+$/.test(digits)) {
      val = formatPhoneNumber(digits); // Format lại hiển thị
      $this.val(val); // Gán lại giá trị vào input
      isPhone = true;
    } else {
      // Nếu đang ở dạng đã format mà không còn đủ 10 số → gỡ format
      if (val.includes("(") || val.includes(")") || val.includes("-")) {
        if (digits.length !== 10) {
          val = digits;
          $this.val(val);
        }
      }

      isPhone = isValidPhoneNumber(val);
      isEmail = isValidEmail(val);
    }

    // Cập nhật lỗi
    if (isFirst && val === "") {
      $this.addClass("is-invalid");
      $error.text("Email or phone is required.");
    } else if (val !== "" && !isPhone && !isEmail) {
      $this.addClass("is-invalid");
      $error.text("Email or phone is incorrect format.");
    } else {
      $this.removeClass("is-invalid");
      $error.text("");
      // check show scroll service || timming
      const isShowSroll = checkValInputs([
        "#firstname-banner",
        "#lastname-banner",
        "#emailPhone-banner",
      ]);
      isShowSroll && showScrollToTarget(dataBooking);
    }

    // Update data user
    userCur.email = isEmail ? val : "";
    userCur.phoneNumber = isPhone ? digits : "";

    templateStore.setState({ dataBooking: { ...dataBooking } });
  });
  // input firstName và blur
  $(document).on("input blur", "#firstname-banner", function () {
    validateFirstNameInput($(this));
  });
  $(document).on("input blur", "#lastname-banner", function () {
    validateLastNameInput($(this));
  });

  $(document).on("blur", "#emailPhone-banner", function () {
    validateEmailPhoneInputBanner($(this));
  });

  // Cập nhật data khi onChange input

  //focus onput ( xử lý active như tab)
  $(document).on("focus", ".input-fullname", async function () {
    const dataBooking = templateStore.getState().dataBooking;

    const $this = $(this);
    const idFocus = $this.data("id");
    const $container = $this.closest(".wrap-input-guests");
    const idNext = +$container.find(".guest-input").data("id");

    const currentUser = dataBooking.users.find((u) => u.isChoosing);
    const currentUserId = currentUser.id;
    const firstUser = dataBooking.users[0];

    // Lấy giá trị đang nhập của tab hiện tại
    const $wrapCur = $(`.container-info-user`);
    const valFirstName = $wrapCur.find("#firstname-banner").val().trim();
    const valLastName = $wrapCur.find("#lastname-banner").val().trim();
    const valEmailPhone = $wrapCur.find("#emailPhone-banner").val().trim();

    const isPhone = isValidPhoneNumber(valEmailPhone);
    const isEmail = isValidEmail(valEmailPhone);

    // Kiểm tra nếu là user đầu tiên, buộc nhập đủ
    let hasError = false;
    if (currentUser.id === firstUser.id) {
      if (valFirstName === "") {
        $wrapCur.find("#firstname-banner").addClass("is-invalid");
        const $errorFirst = $wrapCur
          .find("#firstname-banner")
          .next(".error-message");
        $errorFirst.text("First name is required.");
        shakeError($errorFirst);
        hasError = true;
      }

      if (valLastName === "") {
        $wrapCur.find("#lastname-banner").addClass("is-invalid");
        const $errorFirst = $wrapCur
          .find("#lastname-banner")
          .next(".error-message");
        $errorFirst.text("Last name is required.");
        shakeError($errorFirst);
        hasError = true;
      }

      if (valEmailPhone === "") {
        $wrapCur.find("#emailPhone-banner").addClass("is-invalid");
        const $errorFirst = $wrapCur
          .find("#emailPhone-banner")
          .next(".error-message");
        $errorFirst.text("Email or phone is required.");
        shakeError($errorFirst);
        hasError = true;
      } else if (!isPhone && !isEmail) {
        $wrapCur.find("#emailPhone-banner").addClass("is-invalid");
        const $errorFirst = $wrapCur
          .find("#emailPhone-banner")
          .next(".error-message");
        $errorFirst.text("Email or phone is incorrect format.");
        shakeError($errorFirst);
        hasError = true;
      }
    } else {
      if (valFirstName === "") {
        $wrapCur.find("#firstname-banner").addClass("is-invalid");
        const $errorFirst = $wrapCur
          .find("#firstname-banner")
          .next(".error-message");
        $errorFirst.text("First name is required.");
        shakeError($errorFirst);
        hasError = true;
      }

      if (valEmailPhone !== "" && !isPhone && !isEmail) {
        $wrapCur.find("#emailPhone-banner").addClass("is-invalid");
        const $errorFirst = $wrapCur
          .find("#emailPhone-banner")
          .next(".error-message");
        $errorFirst.text("Email or phone is incorrect format.");
        shakeError($errorFirst);
        hasError = true;
      }
    }

    if (hasError) {
      $this.blur(); // Gỡ focus
      return;
    }
    // Kiểm tra đã chọn service và time slot chưa và show button scroll target
    const isShowScrollTarget = showScrollToTarget(dataBooking);
    if (isShowScrollTarget) {
      if ($(".scroll-btn-main").is(":visible")) {
        shakeError($(".scroll-btn-main"));
      }
      $this.blur();
      return;
    }
    // Đủ điều kiện mới chuyển tab
    $(".input-fullname").removeClass("active");
    $this.addClass("active");

    dataBooking.users.forEach((user) => {
      user.isChoosing = user.id === idFocus;
    });

    const nextUser = dataBooking.users.find((u) => u.isChoosing);
    // Nếu next tab được thì kiểm tra firstName của user khác user owner thì format firstName user owner + G + id
    if (!nextUser.firstName) {
      let nextNameUser = formatAutoFirstName(
        dataBooking.users[0],
        currentUserId
      );
      nextUser.firstName = nextNameUser;
      // Cập nhật input fullname
      $this.val(nextNameUser);
    }

    const userChoosing = dataBooking.users.find((u) => u.isChoosing);
    if (userChoosing) {
      renderInfoUser(".container-info-user", userChoosing, firstUser);
    }

    // render lại option copy
    const optionCopyService = {
      dataUser: dataBooking.users,
      bgColor: "",
      border: "#E28B01",
      color: "#E28B01",
      icon: `<i class="fa-solid fa-chevron-up rotate-transition"></i>`,
    };
    // update store
    templateStore.setState({ dataBooking: { ...dataBooking } });
    renderCopyServiceOption(".copy-options-wrapper", optionCopyService);
    renderListService(listDataService, ".list-more", dataBooking);
  });

  // Xử lý chọn user để copy
  // Toggle khi bấm vào button chính
  $(document).on("click", ".btn-option-copy-user", function (e) {
    e.stopPropagation(); // tránh bị close ngay khi click

    const $dropdown = $(this).next(".list-option-copy");
    $(".btn-option-copy-user i")
      .not($(this).find("i"))
      .removeClass("rotate-180");

    $(".list-option-copy").not($dropdown).removeClass("active"); // close các dropdown khác
    $dropdown.toggleClass("active");
    $(this).find("i").toggleClass("rotate-180");
  });
  // Chọn user để copy
  $(document).on("click", ".option-item-copy", function (e) {
    e.stopPropagation();
    const $this = $(this);
    const idUserSelected = $this.data("id");

    // Cập nhật lại isSelecting của user đang được chọn
    const userCurSelecting = dataBooking.users.find((user) => user.isSelecting);
    if (userCurSelecting) {
      userCurSelecting.isSelecting = false;
    }

    // Cập nhật user được chọn copy trong dataUser
    const userSelected = dataBooking.users.find((u) => u.id === idUserSelected);
    userSelected.isSelecting = true;
    // Thêm selected vào btn-option-copy-user
    $(".btn-option-copy-user").addClass("selected");
    // render lại
    const optionCopyService = { dataUser: dataBooking.users };
    renderCopyServiceBtn(".copy-btn-wrapper");
    renderCopyServiceOption(".copy-options-wrapper", optionCopyService);
  });
  // Copy service
  $(document).on("click", ".btn-copy-service", async function () {
    const dataBooking = templateStore.getState().dataBooking;
    const listStaffUser = templateStore.getState().listStaffUser;
    // to-do: chỉ copy service, sau đó scroll chọn thợ next availble, mặc định gán thợ 9999
    const userChoosing = dataBooking.users.find((u) => u.isChoosing);
    const userSelectedCopy = dataBooking.users.find((u) => u.isSelecting);

    // lấy staffDefault trong listStaffUser
    const staffDefault = listStaffUser.find(
      (s) => s.employeeID === idStaffDefault
    );
    // copy service
    if (userChoosing && userSelectedCopy && userChoosing !== userSelectedCopy) {
      userChoosing.services = JSON.parse(
        JSON.stringify(userSelectedCopy.services)
      );

      // thay toàn bộ selectedStaff = staffDefault, cho trường hợp này, nhiều trường hợp khác sẽ xử lý sau
      userChoosing.services.forEach((svc) => {
        svc.itemService.forEach((item) => {
          if (item.selectedStaff) {
            item.selectedStaff = { ...staffDefault };
          }
        });
      });
      // copy thêm cả selectedDate cho tiện guest chọn
      userChoosing.selectedDate = userSelectedCopy.selectedDate || null;
    }
    // kiểm tra nếu action copy datetime on thì copy cả timming
    // if (isCopySameTime) {
    //   userChoosing.selectedDate = JSON.parse(
    //     JSON.stringify(userSelectedCopy.selectedDate)
    //   );
    //   userChoosing.selectedTimeSlot = JSON.parse(
    //     JSON.stringify(userSelectedCopy.selectedTimeSlot)
    //   );
    // }
    // update store
    templateStore.setState({ dataBooking: { ...dataBooking } });

    // upadate lại list service
    renderListService(listDataService, ".list-more", dataBooking);
    // update lại calander
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
      // update store
      templateStore.setState({ dataBooking });
    });
    const isFinalBooking = showScrollToFinalBooking(dataBooking);
    if (!isFinalBooking) {
      const isSeTi = showScrollToTarget(dataBooking, true);
      // chắc chắn lúc này phải scroll chọn time, còn chọn thợ service thì tuỳ xử lý sau
    }
    isFinalBooking &&
      updateScrollButton({
        target: "#section-booking",
        trigger: "#trigger-booking",
        triggerBanner: "#triggerBlockSumary",
        text: "Continue Booking",
        icon: "fa fa-hand-pointer down",
        force: false,
      });

    // render lại sumary
    renderSumary(dataBooking, listDataService);
  });
});
