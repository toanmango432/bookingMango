export function updateGuestSection(dataBooking) {
  renderCountControls(".wrap-control", dataBooking);
  renderGuestInputs(".wrap-input-guests", dataBooking);
}
export function renderNavHeaderTemplates(dataBooking, dataHeaderNav) {
  const { logo: logoWeb, itemNav, colorActiveNav, iconUser } = dataHeaderNav;

  const navItemsHtml = itemNav
    .map((item) => renderNavItem(item, colorActiveNav))
    .join("");

  return `
      <div class="nav-header-web" style="--color-active: ${colorActiveNav}">
        <div class="wrap-logo-nav-web">
          <img src=${logoWeb} alt="logo" class="img-logo" />
        </div>
        <div class="left-nav-web">
          <div class="list-option">
            <div class="nav-item-with-dropdown">
              <button class="user"
                style="
                  text-align: start;
                "
              >
                ${iconUser}
              </button>
            </div>
            ${navItemsHtml}
          </div>
          ${renderCartProfile(dataBooking, dataHeaderNav)}
        </div>
      </div>
    `;
}

export function renderAdvertisePage(dataAdvertise) {
  const { bgAdvertise1, bgAdvertise2, buttonSignIn } = dataAdvertise;

  return `
      <div class="advertise">
        <div class="advertise-bg-1"
          style="
            --bg-advertise1: ${bgAdvertise1.bgColor};
            --rotate-bg-advertise1: ${bgAdvertise1.transformRotate};
          "
        ></div>
        <div class="advertise-bg-2"
          style="
            --bg-adverstise2: ${bgAdvertise2.bgColor};
            --color-content: ${bgAdvertise2.colorContent};
          "
        >
          <div class="w-72">
            <p>
              ${bgAdvertise2.content
                .map((item) => {
                  return `
                  <span class="text-advertise"
                    style="
                      --text-weight-ad: ${item.fontWeight}
                    "
                  >
                    ${item.text}
                  </span>
                `;
                })
                .join("")}
            </p>
          </div>
          <!-- <div class="wrap-signin">
            <div id="sign-in" class="text-uppercase sign-in"
                style="
                  --bgColor-signin: ${buttonSignIn.bgColor};
                  --text-color-signin: ${buttonSignIn.color};
                  --bgColor-signin-hover: ${buttonSignIn.bgColorHover};
                  --border-signin: ${buttonSignIn.border};
                "
            >
              ${buttonSignIn.content}
            </div>
          -->
          </div>
        </div>
      </div>
    `;
}

//render button copy
export function renderCopyServiceBtn(containerSelector) {
  const isUserSelected = $(".btn-option-copy-user").hasClass("selected");
  const htmlBtn = `
          <button class="btn-copy-service ${!isUserSelected ? "disabled" : ""}"
            ${!isUserSelected ? "disabled" : ""}
          >
            Copy Service
          </button>
        `;
  $(containerSelector).html(htmlBtn);
}

// render info user banner: firstname, lastname, email or phone
export function renderInfoUser(containerSelector, dataUser, firstUser) {
  const { firstName, lastName, phoneNumber, email } = dataUser;
  let emailPhone = phoneNumber;
  if (!isValidPhoneNumber(phoneNumber)) {
    emailPhone = email;
    dataUser.phoneNumber = "";
  } else {
    dataUser.email = "";
  }

  const isFirst = firstUser.id === dataUser.id;
  // Chỉ yêu cầu nhập đầy đủ cho user đầu tiên
  const htmlInputInfoUser = `
          <div class="item-info-input">
            <label>First name</label>
            <input
              placeholder="Required (*)"
              value="${firstName || ""}"
              id="firstname-banner"
            />
            <p class="error-message"></p>
          </div>
          <div class="item-info-input">
            <label>Last name</label>
            <input
              placeholder="${isFirst ? "Required (*)" : "Optional (*)"}"
              value="${lastName || ""}"
              id="lastname-banner"
            />
            <p class="error-message"></p>
          </div>
          <div class="item-info-input">
            <label>Email or phone</label>
            <input
              placeholder="${isFirst ? "Required (*)" : "Optional (*)"}"
              value="${emailPhone || ""}"
              id="emailPhone-banner"
            />
            <p class="error-message"></p>
          </div>
      `;
  $(containerSelector).html(htmlInputInfoUser);
}
// render control user booking
export function renderCountControls(containerSelector, dataBooking) {
  if (dataBooking.type === typeBookingEnum.ME) return;
  const $c = $(containerSelector);
  $c.empty();
  $c.html(`
      <div class="guest-controls">
        <button class="btn-decrease">–</button>
        <span class="guest-count">${dataBooking.users.length}</span>
        <button class="btn-increase">+</button>
      </div>
    `);
}
// render input fullname user
export function renderGuestInputs(containerSelector, dataBooking) {
  const $c = $(containerSelector);
  const $containerGuestInput = $(`<div class="container-guest-input"></div>`);
  $c.empty();
  $containerGuestInput.empty();

  $c.append($containerGuestInput);

  if (!dataBooking || dataBooking.users.length === 0) return;
  // input name customer
  dataBooking.users.forEach((item, index) => {
    const $inputBox = $(`
          <div class="guest-input" data-id="${item.id}"
            style="
              --color-cur-primary: ${colorPrimary}
            "
          >
            <input
              type="text"
              class="input-fullname ${item.isChoosing ? "active" : ""}"
              value="${item.firstName || `GUEST ${index + 1}`}"
              placeholder="Name customer"
              data-id=${item.id}
              readonly
            />
            <button class="btn-remove">×</button>
          </div>
      `);
    $containerGuestInput.append($inputBox);
  });
  // copy service customer
  // Kiểm tra xem có user nào đã chọn dịch vụ hay không
  const hasSelectedServices = dataBooking.users.some(
    (user) => user.services.length > 0
  );
  if (hasSelectedServices) {
    // kiểm tra có user được chọn để copy

    const $copyService = $(`
            <div class="copy-service-wrapper">
              <div class="copy-options-wrapper">
              </div>
              <div class="copy-btn-wrapper">
              </div>
            </div>
          `);
    const optionCopyService = {
      dataUser: dataBooking.users,
      bgColor: "",
      border: "#E28B01",
      color: "#E28B01",
      icon: `<i class="fa-solid fa-chevron-up rotate-transition"></i>`,
    };

    $c.append($copyService);
    renderCopyServiceOption(".copy-options-wrapper", optionCopyService); // gọi trước để cập nhật selected
    renderCopyServiceBtn(".copy-btn-wrapper");
  }
  $c.append('<div class="container-info-user"></div>');
  // Điền thông tin khách hàng, tự fill nếu đã có thông tin: firstname, lastname và emai or phone
  const userChoosing = dataBooking.users.find((u) => u.isChoosing === true);
  const firstUser = dataBooking.users[0];
  if (userChoosing) {
    renderInfoUser(".container-info-user", userChoosing, firstUser);
  }
}

// list services page
export function renderListService(
  listDataService,
  containerSelector = ".list-more",
  dataBooking,
  dataSetting
) {
  const $container = $(containerSelector);
  $container.empty();

  listDataService.forEach(({ item }, i) => {
    const idMoreItem = item.id;
    const $moreItem = $(
      `<div class="more-item" data-id=${idMoreItem} style="z-index: ${
        100 + item.listItem.length - i
      }"></div>`
    );

    const $expandTitle = renderExpandTitle(item);
    $moreItem.append($expandTitle);

    //render card

    const $listCards = item.listItem.map((cardItem) =>
      renderServiceCard(idMoreItem, cardItem, dataBooking, dataSetting)
    );

    const $wrapper = $(`<div class="wrap-list-more"></div>`).append($listCards);
    const $ListAddOn = item.listItem.map((cardItem) =>
      renderListAddOn(item, cardItem.id, dataBooking)
    );
    $wrapper.append($ListAddOn);
    $moreItem.append($wrapper);

    $container.append($moreItem);
  });
}
// title card service
export function renderExpandTitle(item) {
  const $title = $('<div class="expand-title"></div>');
  const iconLeft = `
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16625 11.4688H13.4263V2.46875H1.90625V21.9688H13.4263V12.9688H7.16625V11.4688Z" fill="#E27303" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8448 11.4691C19.8328 11.4681 18.0008 9.63605 18.0008 7.62305V6.87305H16.5008V7.62305C16.5008 9.10005 17.1758 10.4801 18.2198 11.4691L13.4219 11.469V12.969L18.2198 12.9691C17.1758 13.9581 16.5008 15.3371 16.5008 16.8141V17.5641H18.0008V16.8141C18.0008 14.8021 19.8338 12.9691 21.8458 12.9691H22.5958V11.4691H21.8448Z" fill="#E27303" />
              </svg>
            `;
  const iconRight = `
               <i class="fa-solid fa-chevron-down rotate-transition"></i>
            `;
  $title.append(iconLeft);
  $title.append(
    `<p class="text-uppercase bold-medium-14 mb-0">${item.value}</p>`
  );
  $title.append(iconRight);

  return $title;
}
// item card service
export function renderServiceCard(
  idMoreItem,
  cardItem,
  dataBooking,
  dataSetting
) {
  const isHidePrice = dataSetting?.HidePrice === "1";
  const $cardMore = $(`
          <div class="card-more" data-id="${cardItem.id}">
          </div>
        `);

  const $top = $(`
        <div class="top-card">
          <div class="left-card">
            <p class="bold-medium-14">${cardItem.title}</p>
            <p class="thin-mid-14">${
              cardItem.subTitle ? cardItem.subTitle : "Not subtitle"
            }</p>
          </div>
          <div class="right-card">
            ${
              isHidePrice
                ? ""
                : `<p id="service-price" class="bold-medium-20">${cardItem.priceRental} $</p>`
            }
            <p id="service-duration" class="bold-mid-12 ${
              isHidePrice ? "is-hide-price" : ""
            }" data-value=${cardItem.timetext}>${cardItem.timetext} min</p>
          </div>
        </div>
      `);
  const user = dataBooking.users.find((u) => u.isChoosing);
  const serviceCardMoreCurr = user.services.find(
    (se) => se.idService === idMoreItem
  );
  const serviceCardItemCurr =
    serviceCardMoreCurr &&
    serviceCardMoreCurr.itemService.find(
      (si) => si.idItemService === cardItem.id
    );
  const staffUserSelected =
    serviceCardItemCurr && serviceCardItemCurr.selectedStaff;

  const $listUserStaff = $(`
        <div class="option-select-staff">
          ${renderSelectedStaff(staffUserSelected ? staffUserSelected : {})}
        </div>
      `);

  const $actions = renderActionButtons(idMoreItem, cardItem.id, dataBooking);

  $cardMore.append($top, $actions, $listUserStaff);
  return $cardMore;
}
// Render danh sách staff để chọn
export function renderUserOptions(staff) {
  return `
        <div class="search-staff">
          <input type="text" class="search-staff-input" placeholder="Search staff..." />
        </div>
        <div class="wrap-staff">
          ${staff
            .map(
              (user) => `
            <div class="item-staff" data-id="${user.employeeID}">
              <div class="avatar-staff">
                <img src="${
                  user.imageFileName ? user.imageFileName : "null"
                }" alt="image ${
                user.nickName ? user.nickName : "Not nickname"
              }" class="img-staff" />
              </div>
              <span class="full-name">${
                user.nickName ? user.nickName : "Not nickname"
              }</span>
            </div>
          `
            )
            .join("")}
        </div>
      `;
}
// hiển thị staff đã được chọn
export function renderSelectedStaff(selectedStaff) {
  if (!selectedStaff || Object.keys(selectedStaff).length === 0) return "";

  const { name = "Name user", image = "" } = selectedStaff;

  return `
        <div class="item-staff">
          <div class="avatar-staff">
            <img src="${image}" alt="image staff" class="img-staff"/>
          </div>
          <span>${name}</span>
        </div>
      `;
}
// btn action
export function renderActionButtons(idMoreItem, idCardItem, dataBooking) {
  const isBookMultipleTech = templateStore.getState().isBookMultipleTech;
  // Kiểm tra có staff đã được chọn trong item service này hay không
  const findUserCur = dataBooking.users.find((u) => u.isChoosing);
  const findService = findUserCur.services.find(
    (s) => s.idService == idMoreItem
  );
  const findItemService =
    findService &&
    findService.itemService.find((is) => is.idItemService == idCardItem);
  const $wrap = $('<div class="add-more"></div>');

  const $add = $(`
        <button class="btn-add-more">
          <i class="fa-solid fa-plus"></i>
        </button>
      `);

  const $wrapSelect = $(`
        <div class="wrap-select-user" >
          <div class="icon-checked">
            <i class="fa-solid fa-check"></i>
          </div>
          <div class="toggle-select">
            <span id="full-name-selected">${
              (findItemService && findItemService.selectedStaff.nickName) ||
              "Next Available"
            }</span>
            <i class="fa-solid fa-chevron-down rotate-transition"></i>
          </div>
        </div>
      `);

  const $del = $(`
        <button class="btn-delete">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M14 10.0605V17.0605M10 10.0605V17.0605M6 6.06055V17.8605C6 18.9807 6 19.5403 6.21799 19.9681C6.40973 20.3445 6.71547 20.651 7.0918 20.8428C7.5192 21.0605 8.07899 21.0605 9.19691 21.0605H14.8031C15.921 21.0605 16.48 21.0605 16.9074 20.8428C17.2837 20.651 17.5905 20.3445 17.7822 19.9681C18 19.5407 18 18.9816 18 17.8636V6.06055M6 6.06055H8M6 6.06055H4M8 6.06055H16M8 6.06055C8 5.12866 8 4.66295 8.15224 4.29541C8.35523 3.80535 8.74432 3.41578 9.23438 3.21279C9.60192 3.06055 10.0681 3.06055 11 3.06055H13C13.9319 3.06055 14.3978 3.06055 14.7654 3.21279C15.2554 3.41578 15.6447 3.80535 15.8477 4.29541C15.9999 4.66295 16 5.12867 16 6.06055M16 6.06055H18M18 6.06055H20" stroke="#ECB155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      `);
  //
  if (findItemService) {
    $wrap.append($wrapSelect, $del);
  } else {
    $wrap.append($add);
  }
  return $wrap;
}
// render list add on
export function renderListAddOn(
  dataItem,
  idItemChild,
  dataBooking,
  isFull = false
) {
  const titleAddOnSelected = dataItem.value;
  const findItemChild = dataItem.listItem.find((i) => i.id === idItemChild);
  const listOptionAddOn = findItemChild.listOptionAddOn;
  if (!findItemChild || listOptionAddOn.length === 0) return "";

  const limitList = isFull ? listOptionAddOn : listOptionAddOn.slice(0, 4);
  // Trong card item kiểm tra option được chọn
  const curUser = dataBooking.users.find((u) => u.isChoosing);
  const findService =
    curUser && curUser.services.find((s) => s.idService == dataItem.id);
  const findItemService =
    findService &&
    findService.itemService.find((si) => si.idItemService == idItemChild);

  return `
        <div
          class="wrap-addOn"
          data-id=${dataItem.id}
          style="
            --color-cur-primary: ${colorPrimary};
          "
        >
          <div class="container-addOn">
            <div class="expand-addOn">
              <i class="fa-solid fa-chevron-up rotate-transition"></i>
              <h2>Show more</h2>
            </div>
            <div class="service-addOn-selected">
              <p>
                <span class="sp-addOn-1">Suggested add-ons</span>
                (<span class="sp-addOn-2">
                  <strong>
                    ${titleAddOnSelected}
                  </strong>
                </span>)
              </p>
            </div>
            <div class="wrap-list-addOn" data-id="${idItemChild}">
              ${limitList
                .map((item) => {
                  const isOptionSelected = findItemService?.optionals?.some(
                    (opt) => opt.id === item.id
                  );
                  return `
                  <div class="item-addOn" data-id=${item.id}>
                    <div class="right-item-addOn">
                      <h2 class="text-right-item-addOn">
                        ${item.title}
                      </h2>
                    </div>
                    <div class="left-item-addOn">
                      <div class="price-timedura">
                        <h2 class="text-price-item-addOn">${item.price} $</h2>
                        <p class="timedura">${item.timedura} min</p>
                      </div>
                      <div class="checkbox-addOn ${
                        isOptionSelected ? "selected" : ""
                      }">
                        <div class="circle-addOn">
                          <i class="fa-solid fa-check"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
                })
                .join("")}
            </div>
          </div>
        </div>
      `;
}
// render infor store
// render promotion shop
export function renderPromotionItemPage(dataProm, extraClass = "") {
  if (Object.keys(dataProm).length === 0) return "";

  return `
        <div class="item-promotion-page ${extraClass}">
          <div class="right-promotion-item">
            <img src="${dataProm?.img}" alt="image promotion" class="img-promotion"/>
          </div>
          <div class="left-promotion-item">
            <div class="title-icon">
              <h2 class="title mb-0">${dataProm?.title?.content}</h2>
            </div>
            <div class="percent-promotion">
              <span class="percent"
                style="--bgColor-percent: ${dataProm?.percent?.bgColor}; --textColor-percent: ${dataProm?.percent?.color};"
              >
                ${dataProm?.percent?.number}%
              </span>
              <h2 class="title-percent mb-0">${dataProm?.percent?.content}</h2>
            </div>
            <div class="date-time">
              <p>Valid until ${dataProm?.dateTime?.endTime}</p>
            </div>
          </div>
        </div>
      `;
}

// render work-time
export function renderStoreInfo(dataStoreInfo, color = "") {
  if (Object.keys(dataStoreInfo).length === 0) return "";

  const $container = $('<div class="store-info"></div>');

  const $left = $(`
        <div class="store-left">
          <h3 style="
            --colorTextStoreInfo: ${color};"
          >
            ${dataStoreInfo?.brand?.toUpperCase()}
          </h3>
          <p>${dataStoreInfo?.iconLocation} ${dataStoreInfo?.phoneNumber}</p>
          <p>${dataStoreInfo?.address}</p>
        </div>
      `);

  const $right = $('<div class="store-right"></div>');
  $right.append("<h4>HOURS</h4>");

  dataStoreInfo?.timeWork?.forEach((item) => {
    const $row = $(`
          <div class="store-hour-row">
            <span class="weekday">${item?.weekday}</span>
            <span class="time">${item?.time}</span>
          </div>
        `);
    $right.append($row);
  });

  $container.append($left).append($right);
  return $container;
}
// render policy
export function renderPolicyPage(dataPolicyPage, color = "") {
  if (Object.keys(dataPolicyPage).length === 0) return "";

  const { title, styleTitle, listItem } = dataPolicyPage;

  const titleHtml = `
        <h3
          class="title-policy"
          style="
            --colorTextTitlePolicy: ${color}
          "
        >
          ${title?.toUpperCase()}
        </h3>
      `;

  const itemsHtml = listItem
    ?.map((item) => {
      const contentHtml = item.content
        .map((part) => {
          if (part.style) {
            // Nếu có style riêng
            return `<span style="color: ${part.style.color}">${part.text}</span>`;
          } else {
            return `<span>${part.text}</span>`;
          }
        })
        .join(" ");

      return `<p class="item-policy">${contentHtml}</p>`;
    })
    .join("");

  return `
        <div class="policy-page">
          ${titleHtml}
          <div class="policy-list">
            ${itemsHtml}
          </div>
        </div>
      `;
}
//render social link
export function renderSocialLink(data, color = "") {
  const address = encodeURIComponent(data?.mapLocation?.address);
  return `
        <div class="map-wrapper"
          style="
            --colorBorderMap: ${color}
          "
        >
          <iframe
            width="100%"
            height="300"
            style="border:0; border-radius: 8px;"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed">
          </iframe>
        </div>
      `;
}

// render social icon
export function renderSocialItemPage(item) {
  return `
        <div class="wrap-image-social" data-id="${item.id}">
          <img src="${item.img}" alt="image social" class="img-social"/>
        </div>
      `;
}

// Function render block element
export function renderBlockTemplate(dataBlock, isCopySameTime) {
  // Variable data block
  const {
    dataHeaderNav,
    advertises,
    banner,
    sideInfo,
    bannerProSelected,
    color,
  } = dataRelease;
  const { promotion, policy, storeInfo, socialLink, socialIcon } = sideInfo;

  const $wrapWeb = $(".wrap-home-templates");
  const htmlHeaderNav = renderNavHeaderTemplates(
    dataBlock.dataBooking,
    dataHeaderNav
  );
  const htmlAdvertise = renderAdvertisePage(advertises);
  const htmlBannerPage = renderBannerPage(colorPrimary, banner);
  const htmlTimeBooking = renderTimeBooking(
    dataBlock.dataBooking,
    colorPrimary,
    isCopySameTime
  );
  // data render infoshop

  $wrapWeb.prepend(
    `<div class="wrap-header">${htmlHeaderNav}</div>`,
    `<div class="wrap-advertise-page">${htmlAdvertise}</div>`,
    `<div class="wrap-banner-page">${htmlBannerPage}</div>`,
    `<div class="wrap-service-infoshop">
        <div id="section-service" class="list-more">
        </div>
        <div id="list-info" class="show-list-info"
          style="
            --color-cur-primary: ${colorPrimary}
          "
        >
          <div class="show-more-info">
            <button class="btn-more-info">
              Show More Info
            </button>
          </div>
          <div id="item-promotion-page"></div>
          <div id="store-info-page"></div>
          <div id="policy-page"></div>
          <div id="social-link-page">
          </div>
          <div id="social-icon-page">
            <div class="wrap-list-social">
              <div class="list-social"></div>
            </div>
          </div>
        </div>
      </div>`,
    `<div id="section-date-time" class="wrap-calendar-timeslot">${htmlTimeBooking}</div>`,
    `<div
        id="triggerBlockSumary"
        class="wrap-sumary"
        style="
          --color-cur-primary: ${colorPrimary};
        "
      >
      </div>`
  );
  const { dataBooking, dataMe, dataGuest, dataFamily, dataSetting } = dataBlock;
  if (banner.optionBooked === "GUESTS") {
    // Thay bằng data guest
    dataBooking.type = typeBookingEnum.GUESTS;
    dataBooking.users = dataGuest;

    // Default user đầu tiên isChoosing
    dataBooking.users[0].isChoosing = true;

    renderCountControls(".wrap-control", dataBooking);
    renderGuestInputs(".wrap-input-guests", dataBooking);
    $(".wrap-input-guests").removeClass("hidden");
  }
  // init render list services
  renderListService(
    dataBlock.listDataService,
    ".list-more",
    dataBooking,
    dataSetting
  );
  // init render info shop
  if (promotion) {
    if ($(".item-promotion-page").length > 0) {
      $(".item-promotion-page").remove();
      let classEx = "";
      if ($("#item-promotion-page").find(".overlay-dark").length > 0) {
        classEx = "transparent";
      }

      const htmlProPage = renderPromotionItemPage(promotion, classEx);
      $(".wrap-item-promotion-page").append(htmlProPage);
    } else {
      $("#item-promotion-page")
        .html(
          `
              <div class="wrap-item-promotion-page">
                ${renderPromotionItemPage(promotion)}
              </div>
            `
        )
        .show();
    }
  }
  if (storeInfo) {
    const $container = $("#store-info-page");
    $container.html(renderStoreInfo(storeInfo, color.bgPrimary)).show();
  }
  if (policy) {
    const $container = $("#policy-page");
    $container.html(renderPolicyPage(policy, color.bgPrimary)).show();
  }
  if (socialLink) {
    const $container = $("#social-link-page");
    $container.html(renderSocialLink(socialLink, color.bgPrimary)).show();
  }
  if (socialIcon) {
    const $loShowSo = $("#social-icon-page");
    socialIcon.forEach((item) => {
      const htmlSocialItem = renderSocialItemPage(item);
      $loShowSo.find(".list-social").append(htmlSocialItem);
    });
  }
  if (bannerProSelected) {
    const $loShowbg = $(".wrap-item-promotion-page");
    const $itemPromotionPage = $loShowbg.find(".item-promotion-page");
    if ($(".overlay-dark").length === 0) {
      $loShowbg.append(`<div class="overlay-dark"></div>`);
    }
    $itemPromotionPage.addClass("transparent");
    bannerProSelected.image &&
      $loShowbg.css({
        "background-image": `url("${bannerProSelected.image}")`,
        "justify-content": "flex-start",
        padding: "24px 12px",
      });
  }
  // init render option booking
  renderBookingOption(
    ".wrap-book-for",
    banner.btnOptionBook,
    banner.optionBooked
  );
}

// import api
import { fetchAPI } from "../site.js";
// import store
import { templateStore } from "../store/template-store.js";
import { dataRelease, colorPrimary } from "../templateDetail.js";
// import constant
import {
  typeBookingEnum,
  idStaffDefault,
  genderEnum,
} from "../constants/template-online.js";
// import scroll quickly
import {
  updateScrollButton,
  showScrollToTarget,
  showScrollToFinalBooking,
} from "../scroll-quickly/scroll-quickly.js";
// time slots
import { renderTimeSlotsForDate } from "../time-slots/time-slots.js";
import { formatDateMMDDYYYY } from "../helper/format-day.js";
// cart user
import { renderCartUser } from "../header/cart-user.js";
// import sumary
import { renderSumary } from "../sumary/sumary.js";

import { renderNavItem } from "../header/nav-item.js";
import { renderCartProfile } from "../header/cart-profile.js";
import { isValidPhoneNumber } from "../helper/format-phone.js";
import { renderCopyServiceOption } from "../banner/copy-service-option.js";
import { renderBannerPage } from "../banner/banner.js";
import { renderTimeBooking } from "../time-slots/time-booking.js";
import { renderBookingOption } from "../banner/booking-option.js";
// import help
import { findMultiTechStarts } from "../helper/free-time/slot-time-available.js";

$(document).ready(async function () {
  let mainTech = null;
  // Load store lần đầu tiên
  await templateStore.load();
  await templateStore.getState().getDataSetting();

  let slotTimeMultiTech = templateStore.getState().slotTimeMultiTech;
  let dataSetting = templateStore.getState().dataSetting;
  let listDataService = await templateStore.getState().getListDataService();
  let listUserStaff = await templateStore.getState().getListUserStaff();

  let isBookMultipleTech = templateStore.getState().isBookMultipleTech;
  let dataBooking = templateStore.getState().dataBooking;

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

  // Xử lý select services
  $(document).on("click", ".expand-title", function () {
    const $wrap = $(this).next(".wrap-list-more");
    const $iconDown = $(this).find(".fa-chevron-down");

    if ($iconDown.hasClass("rotate-180")) {
      $iconDown.removeClass("rotate-180");
    } else {
      $iconDown.addClass("rotate-180");
    }
    $wrap.toggleClass("collapsed");
  });

  // btn more
  function assignTech(selectedTech, dataBooking) {
    if (!selectedTech) return;

    const isDefault = selectedTech.selectedStaff.employeeID === idStaffDefault;

    if (isDefault) {
      // Nếu đang chọn default
      if (mainTech) {
        // đã có mainTech thì ép default về mainTech
        replaceDefaultWithMain(dataBooking);
      }
      // nếu chưa có mainTech thì thôi, để default tạm
    } else {
      // Nếu chọn thợ khác default
      if (!mainTech) {
        // lần đầu tiên chọn thợ khác default
        mainTech = selectedTech.selectedStaff;
      }
      // Luôn đồng bộ toàn bộ default về mainTech
      replaceDefaultWithMain(dataBooking);
      // Nếu chọn thợ khác mainTech thì vẫn ép về mainTech
    }
  }

  function replaceDefaultWithMain(dataBooking) {
    if (!mainTech) return;
    for (const user of dataBooking.users) {
      for (const service of user.services) {
        for (const item of service.itemService) {
          if (
            item?.selectedStaff?.employeeID === idStaffDefault ||
            item?.selectedStaff?.employeeID !== mainTech.employeeID
          ) {
            // Ép toàn bộ về mainTech
            item.selectedStaff = mainTech;
          }
        }
      }
    }
  }

  function techSelect(dataBooking) {
    const userChoosing = dataBooking.users.find((u) => u.isChoosing);
    if (!userChoosing) return null;

    for (const service of userChoosing.services) {
      const foundItem = service.itemService.find(
        (itemSer) =>
          itemSer?.selectedStaff &&
          itemSer.selectedStaff.employeeID !== idStaffDefault
      );
      if (foundItem) {
        return foundItem;
      }
    }

    return null;
  }

  async function fetchStaffTimeSlots({ dataBooking, itemSelected, empID }) {
    try {
      // 1. Lấy user đang chọn
      const userChoosing = dataBooking.users.find((u) => u.isChoosing === true);
      if (!userChoosing) return [];

      // 2. Tính tổng duration cho thợ empID
      let totalDuration = 0;

      // ---- A. Các service đã có trong dataBooking ----
      for (const sv of userChoosing.services) {
        for (const item of sv.itemService) {
          if (item.selectedStaff && item.selectedStaff.employeeID === empID) {
            // cộng duration chính
            totalDuration += item.duration || 0;

            // cộng optionals nếu có
            if (Array.isArray(item.optionals) && item.optionals.length) {
              totalDuration += item.optionals.reduce(
                (sum, opt) => sum + (opt.timedura || 0),
                0
              );
            }
          }
        }
      }

      // ---- B. Service vừa chọn (chưa có trong dataBooking) ----
      if (itemSelected) {
        totalDuration += itemSelected.timetext || 0;
      }

      if (totalDuration === 0) {
        console.warn("Chưa có dịch vụ nào gán cho thợ:", empID);
        return [];
      }

      // 3. Lấy ngày
      const dateSer =
        formatDateMMDDYYYY(userChoosing.selectedDate) ||
        formatDateMMDDYYYY(new Date());

      // 4. Call API
      console.log("dateSer: ", dateSer);

      const res = await fetchAPI.get(
        `/api/appointment/gettimebookonline?date=${dateSer}&duration=${totalDuration}&rvcno=336&empID=${empID}`
      );

      return {
        timeSlotTech: res?.data || [],
        duration: totalDuration,
      };
    } catch (e) {
      console.error("Lỗi lấy time slots:", e);
      return [];
    }
  }

  $(document).on("click", ".add-more .btn-add-more", async function () {
    const $this = $(this);
    const updateDataBooking = templateStore.getState().dataBooking;

    const $card = $this.closest(".card-more");

    const idService = $this.closest(".more-item").data("id");
    const idItemService = $card.data("id");
    const userChoosing = updateDataBooking.users.find(
      (u) => u.isChoosing === true
    );
    // --- xác định staffSelecting ---
    let staffSelecting;
    if (isBookMultipleTech) {
      // Trường hợp cho phép chọn nhiều thợ → lấy mặc định
      staffSelecting = listUserStaff.find(
        (st) => st.employeeID == idStaffDefault
      );
    } else {
      // Chỉ chọn được 1 thợ → kiểm tra đã có staff nào chưa
      const existingStaff = userChoosing.services
        .flatMap((sv) => sv.itemService)
        .map((it) => it.selectedStaff)
        .find((st) => !!st);

      if (existingStaff) {
        staffSelecting = existingStaff;
      } else {
        staffSelecting = listUserStaff.find(
          (st) => st.employeeID == idStaffDefault
        );
      }
    }
    // nếu khong tìm thấy idService trong userChoosing thì thêm mới
    let serviceExit = userChoosing.services.find(
      (item) => item.idService === idService
    );
    let serviceItemExit =
      serviceExit &&
      serviceExit.itemService.find(
        (item) => item.idItemService === idItemService
      );

    // lấy thông tin service vừa chọn
    const serviceSelected = listDataService.find(
      ({ item }) => item.id == idService
    )?.item;
    const itemSelected =
      serviceSelected &&
      serviceSelected.listItem.find((is) => is.id === idItemService);

    // Fetch khung giờ khả dụng
    const timeSlots = await fetchStaffTimeSlots({
      dataBooking: updateDataBooking,
      itemSelected,
      empID: staffSelecting.employeeID,
    });
    const { duration, timeSlotTech } = timeSlots;
    const techID = staffSelecting.employeeID;

    // --- Cập nhật techs ---
    let techs = [...slotTimeMultiTech.techs];
    let idxTech = techs.findIndex((t) => t.techID === techID);
    if (idxTech >= 0) {
      techs[idxTech] = { ...techs[idxTech], timeSlotTech };
    } else {
      techs.push({ techID, timeSlotTech });
    }

    // --- Cập nhật durations ---
    let durations = [...slotTimeMultiTech.durations];
    let idxDur = durations.findIndex((d) => d.techID === techID);
    if (idxDur >= 0) {
      durations[idxDur] = { techID, duration };
    } else {
      durations.push({ techID, duration });
    }

    // --- Update store ---
    slotTimeMultiTech = { techs, durations };
    templateStore.setState({ slotTimeMultiTech });

    if (serviceExit) {
      if (serviceItemExit) {
        serviceItemExit.selectedStaff = staffSelecting;
      } else {
        serviceItemExit = {
          idItemService,
          title: itemSelected.title,
          duration: itemSelected.timetext,
          price: itemSelected.priceRental,
          selectedStaff: {
            ...staffSelecting,
            timeSlots,
          },
        };
        serviceExit.itemService.push(serviceItemExit);
      }
    } else {
      serviceExit = {
        idService,
        itemService: [
          {
            idItemService,
            title: itemSelected.title,
            duration: itemSelected.timetext,
            price: itemSelected.priceRental,
            selectedStaff: {
              ...staffSelecting,
              timeSlots,
            },
          },
        ],
      };
      userChoosing.services.push(serviceExit);
    }
    // cập nhật store
    const newBooking = {
      ...updateDataBooking,
      users: updateDataBooking.users.map((u) =>
        u.id === userChoosing.id ? userChoosing : u
      ),
    };
    templateStore.setState({ dataBooking: newBooking });

    // lọc slot time
    const possibleTimeSlot = findMultiTechStarts(slotTimeMultiTech);
    // --- Update store ---
    templateStore.setState({ slotTimeForSelect: possibleTimeSlot });
    /*
      @Author: NK.Toan 22/8/2025
      - Thêm staff id defult vào user trong trường hợp cho phép chọn nhiều thợ
      - Trường hợp chỉ chọn 1 thợ (isBookMultipleTech === false) thì kiểm tra trong dataBooking userChoosing đã chọn thợ chưa,
      nếu đã chọn thợ thì mặc định chọn thợ đó cho các service sau
    */
    if (!isBookMultipleTech) {
      const selectedTech = techSelect(newBooking);
      // Tại thời điểm này chỉ có 1 thợ có thể khác các thợ còn lại hoặc có các next available
      assignTech(selectedTech, newBooking);
    }
    const $action = renderActionButtons(idService, idItemService, newBooking);
    $card.find(".add-more").replaceWith($action);
    // to-do : will

    updateGuestSection(newBooking); // Cập nhật để hiển thị nút Copy Service

    // show nút scroll to choose time-slots nếu chưa chọn time-slots
    if (!userChoosing.selectedDate || !userChoosing.selectedTimeSlot) {
      updateScrollButton({
        target: "#section-date-time",
        trigger: "#trigger-date-time",
        triggerBanner: "#triggerBlockSumary",
        text: "Select Date & Time",
        icon: "fa fa-hand-pointer down",
        force: false,
      });
    } else {
      const isFinalBooking = showScrollToFinalBooking(newBooking);
      isFinalBooking &&
        updateScrollButton({
          target: "#section-booking",
          trigger: "#trigger-booking",
          triggerBanner: "#triggerBlockSumary",
          text: "Continue Booking",
          icon: "fa fa-hand-pointer down",
          force: false,
        });
    }

    // update calander
    $("#timeSlotsContainer").empty();
    renderTimeSlotsForDate(newBooking, possibleTimeSlot);

    // update cart user
    const $cardUser = $(".cart-user");
    const htmlCartUser = renderCartUser(newBooking, dataRelease.dataHeaderNav);
    $cardUser.empty();
    $cardUser.append(htmlCartUser);

    //Cập nhật table booking
    renderSumary(newBooking, listDataService);
  });
  // Xử lý chọn thợ: Dịch vụ được chọn và làm theo thứ tự chọn
  // 1. Auto chọn thợ cho các service sau giống service đầu tiên customer chọn, nếu thợ đó không
  //    đủ thời gian gian xử lý service tiếp theo thì auto 'next availble'.
  //    Tại đây check funcCheckTechAvailable(users.services, idServiceChoosing)
  // 2. Nếu customer đổi thợ trong bất kì service nào, tính thời gian phù hợp và lọc ra thợ available
  // 3. Nếu sau khi chọn thợ rảnh cho service tiếp theo mà khung giờ rảnh của thợ đó cách thời
  //    gian hoàn thành service trước đó quá 15p chờ đợi thì phải thông báo cho người dùng biết
  //    trước khi chọn thợ, nếu không đồng ý, auto chọn next availble
  // 4. Xử lý timeframe có thể chọn sau khi chọn service

  // remove option select user
  $(document).on("click", ".add-more .btn-delete", function () {
    const $this = $(this);

    const $wrapListMore = $this.closest(".wrap-list-more");
    const $parentBtn = $(this).closest(".add-more");
    const $card = $parentBtn.closest(".card-more");
    const title = $card.find(".bold-medium-14").text();

    const user = dataBooking.users.find((u) => u.isChoosing);
    if (user) {
      user.services = user.services.filter((s) => s.title !== title);
    }

    // remove staff of user in databooking
    const idService = $this.closest(".more-item").data("id");
    const idItemService = $this.closest(".card-more").data("id");
    const userSelecting = dataBooking.users.find((u) => u.isChoosing === true);

    const serviceDeleteIndex = userSelecting.services.findIndex(
      (se) => se.idService == idService
    );
    const serviceDelete = userSelecting.services.find(
      (s) => s.idService == idService
    );

    if (serviceDelete && serviceDelete.itemService) {
      serviceDelete.itemService = serviceDelete.itemService.filter(
        (is) => is.idItemService != idItemService
      );
    }
    // Kiểm tra xoá hết item service thì xoá service
    if (serviceDelete.itemService.length === 0) {
      userSelecting.services.splice(serviceDeleteIndex, 1);
    }

    const $action = renderActionButtons(idService, idItemService, dataBooking);
    $card.find(".add-more").replaceWith($action);

    // re-render list add on
    const $wrapAddOn = $wrapListMore.find(`.wrap-addOn[data-id=${idService}]`);
    const dataItem = listDataService.find(({ item }) => item.id === idService);
    // Kiểm tra idItemService có khớp data-id của wrap-list-addOn không
    const $wrapListAddOn = $wrapAddOn.find(
      `.wrap-list-addOn[data-id=${idItemService}]`
    );
    if ($wrapListAddOn.length > 0) {
      const newListAddOn = renderListAddOn(
        dataItem.item,
        idItemService,
        dataBooking
      );
      $wrapAddOn.replaceWith(newListAddOn);
    }
    // Nếu xoá hết service đã chọn xoá nút scroll continue booking
    if (userSelecting.services.length === 0) {
      $mainScrollBtn.fadeOut();
    }

    // Cập nhật đã chọn cho staff
    // renderServiceTechCombo(dataBooking, listDataService);
    // re-render sumary
    renderSumary(dataBooking, listDataService);
  });
  // select option user
  $(document).on("click", ".wrap-select-user .toggle-select", function (e) {
    const dataBooking = templateStore.getState().dataBooking;
    // if (!isBookMultipleTech) {
    //   // tìm thợ khác default trong toàn bộ dataBooking
    //   const hasNonDefault = dataBooking.users.some((user) =>
    //     user.services.some((svc) =>
    //       svc.itemService.some(
    //         (item) =>
    //           item?.selectedStaff &&
    //           item.selectedStaff.employeeID !== idStaffDefault
    //       )
    //     )
    //   );

    //   if (hasNonDefault) {
    //     // đã có mainTech rồi => chặn mở danh sách nữa
    //     console.log("Đã có mainTech, không show danh sách chọn thợ nữa.");
    //     e.stopPropagation();
    //     return; // dừng hẳn, không render dropdown
    //   }
    // }
    e.stopPropagation();

    // lấy danh sách thợ phù hợp

    const $this = $(this);
    const $parentN = $this.closest(".wrap-select-user");
    const $iconDown = $this.find("i");
    $iconDown.toggleClass("rotate-180");

    const $wrap = $this.closest(".card-more");
    const $optionList = $wrap.find(".option-select-staff");

    const $iconChecked = $parentN.find(".icon-checked");

    // Nếu chưa render
    if ($optionList.children().length === 0) {
      const html = renderUserOptions(listUserStaff);
      $optionList.html(html);
    }

    // Xóa dropdown cũ
    $(".option-select-staff").not($optionList).removeClass("show");

    // Lấy kích thước của toggle-select
    const toggleWidth = $this.outerWidth();
    // Lấy vị trí cho option-select-staff
    const optionUserWidth = $iconChecked.outerWidth();
    const paddingCardMore = 20;
    const gapWrapSelectUser = 16;
    const leftPosOptionList =
      optionUserWidth + paddingCardMore + gapWrapSelectUser;

    // Gán lại CSS cho dropdown
    $optionList.css({
      position: "absolute",
      left: leftPosOptionList + "px",
      width: toggleWidth + "px",
      zIndex: 999,
      height: 300 + "px",
      overflowY: "scroll",
    });

    // Toggle hiển thị
    $optionList.toggleClass("show");
  });
  // search staff
  $(document).on("click", ".search-staff-input", function (e) {
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
  });
  $(document).on("keyup", ".search-staff-input", function (e) {
    e.stopPropagation();
    const searchText = $(this).val().toLowerCase();
    const $wrap = $(this).closest(".option-select-staff");

    $wrap.find(".item-staff").each(function () {
      const name = $(this).find(".full-name").text().toLowerCase();
      $(this).toggle(name.includes(searchText));
    });
  });
  // touch out close option staff
  $(document).on("click", function () {
    const $optionList = $(this).find(".option-select-staff");
    $optionList.empty();
    $(".option-select-staff").removeClass("show");
  });
  // gắn staff selected cho user
  $(document).on("click", ".item-staff", async function (e) {
    const updateDataBooking = templateStore.getState().dataBooking;
    e.stopPropagation();
    const $this = $(this);
    const idStaff = $this.data("id");

    const staffSelecting = listUserStaff.find((st) => st.employeeID == idStaff);

    const idService = $this.closest(".more-item").data("id");
    const idItemService = $this.closest(".card-more").data("id");

    const userChoosing = updateDataBooking.users.find(
      (u) => u.isChoosing === true
    );
    // Nếu chỉ cho phép 1 thợ (single tech mode)
    if (!isBookMultipleTech) {
      // Gán tất cả service trước đó thành staff mới chọn
      updateDataBooking.users.forEach((u) => {
        u.services.forEach((svc) => {
          svc.itemService.forEach((it) => {
            it.selectedStaff = staffSelecting;
          });
        });
      });
    }

    // nếu khong tìm thấy idService trong userChoosing thì thêm mới
    let serviceExit = userChoosing.services.find(
      (item) => item.idService === idService
    );
    let serviceItemExit =
      serviceExit &&
      serviceExit.itemService.find(
        (item) => item.idItemService === idItemService
      );

    // lấy thông tin service vừa chọn
    const serviceSelected = listDataService.find(
      ({ item }) => item.id == idService
    )?.item;
    const itemSelected =
      serviceSelected &&
      serviceSelected.listItem.find((is) => is.id === idItemService);

    // Fetch khung giờ khả dụng
    const timeSlots = await fetchStaffTimeSlots({
      dataBooking: updateDataBooking,
      itemSelected: {},
      empID: staffSelecting.employeeID,
    });
    const { duration, timeSlotTech } = timeSlots;
    const techID = staffSelecting.employeeID;

    // --- Cập nhật techs ---
    let techs = [...slotTimeMultiTech.techs];
    let idxTech = techs.findIndex((t) => t.techID === techID);
    if (idxTech >= 0) {
      techs[idxTech] = { ...techs[idxTech], timeSlotTech };
    } else {
      techs.push({ techID, timeSlotTech });
    }

    // --- Cập nhật durations ---
    let durations = [...slotTimeMultiTech.durations];
    let idxDur = durations.findIndex((d) => d.techID === techID);
    if (idxDur >= 0) {
      durations[idxDur] = { techID, duration };
    } else {
      durations.push({ techID, duration });
    }

    // --- Update store ---
    slotTimeMultiTech = { techs, durations };
    templateStore.setState({ slotTimeMultiTech });

    // Phòng trường hợp cho chọn thợ ngay khi bấm +, tạm để logic
    if (serviceExit) {
      if (serviceItemExit) {
        serviceItemExit.selectedStaff = { ...staffSelecting, timeSlots };
      } else {
        serviceItemExit = {
          idItemService,
          price: itemSelected.priceRental,
          duration: itemSelected.timetext,
          selectedStaff: {
            ...staffSelecting,
            timeSlots,
          },
        };
        serviceExit.itemService.push(serviceItemExit);
      }
    } else {
      serviceExit = {
        idService,
        itemService: [
          {
            idItemService,
            price: itemSelected.priceRental,
            duration: itemSelected.timetext,
            selectedStaff: {
              ...staffSelecting,
              timeSlots,
            },
          },
        ],
      };
      userChoosing.services.push(serviceExit);
    }
    // cập nhật store
    const newBooking = {
      ...updateDataBooking,
      users: updateDataBooking.users.map((u) =>
        u.id === userChoosing.id ? userChoosing : u
      ),
    };

    templateStore.setState({ dataBooking: newBooking });

    const possibleTimeSlot = findMultiTechStarts(slotTimeMultiTech);
    // --- Update store ---
    templateStore.setState({ slotTimeForSelect: possibleTimeSlot });

    const name = $(this).find(".full-name").text();
    const $wrap = $(this).closest(".card-more");

    $wrap.find("#full-name-selected").text(name);
    $wrap.find(".option-select-staff").removeClass("show");

    // render list service
    renderListService(listDataService, ".list-more", newBooking, dataSetting);
    $(".option-select-staff").empty();

    updateGuestSection(newBooking); // Cập nhật để hiển thị nút Copy Service

    // show nút scroll to choose time-slots nếu chưa chọn time-slots
    if (!userChoosing.selectedDate || !userChoosing.selectedTimeSlot) {
      updateScrollButton({
        target: "#section-date-time",
        trigger: "#trigger-date-time",
        triggerBanner: "#triggerBlockSumary",
        text: "Select Date & Time",
        icon: "fa fa-hand-pointer down",
        force: false,
      });
    }
    // update calander
    $("#timeSlotsContainer").empty();
    renderTimeSlotsForDate(newBooking, possibleTimeSlot);

    //Cập nhật table booking
    renderSumary(newBooking, listDataService);
  });
  // toggle addOn service
  $(document).on("click", ".expand-addOn", function () {
    const $wrapAddOn = $(this).closest(".wrap-addOn");
    const dataId = parseInt($wrapAddOn.attr("data-id"));
    const $wrapListAddOn = $wrapAddOn.find(".wrap-list-addOn");
    const childId = parseInt($wrapListAddOn.attr("data-id"));

    const isExpanded = $(this).hasClass("expanded");

    const dataItem = listDataService.find(({ item }) => item.id === dataId);
    if (!dataItem) return;

    const newListAddOn = renderListAddOn(
      dataItem.item,
      childId,
      dataBooking,
      !isExpanded
    );

    $wrapAddOn.replaceWith(newListAddOn);

    if (!isExpanded) {
      const $addOn = $(`[data-id=${dataId}].wrap-addOn .expand-addOn`);
      $addOn.addClass("expanded");
      $addOn.find("i").addClass("rotate-180");
    }
  });
  // selected add-on option
  $(document).on("click", ".item-addOn", function () {
    const $this = $(this);
    const $wrapListAddOn = $this.closest(".wrap-list-addOn");
    const $checkboxAddOn = $this.find(".checkbox-addOn");

    const idService = $this.closest(".more-item").data("id");
    const idItemService = $wrapListAddOn.data("id"); // id card-more
    const idItemAddOn = $this.data("id");

    const serviceCur = listDataService.find(
      ({ item }) => item.id == idService
    )?.item;
    const itemService = serviceCur?.listItem.find(
      (item) => item.id == idItemService
    );

    const itemAddOn = itemService?.listOptionAddOn.find((item) => {
      return item.id == idItemAddOn;
    });

    const userCurr = dataBooking.users.find((u) => u.isChoosing === true);
    let serviceInUser = userCurr.services.find(
      (item) => item.idService == idService
    );

    if (!serviceInUser) {
      serviceInUser = {
        idService,
        itemService: [],
      };
      userCurr.services.push(serviceInUser);
    }

    let itemServiceInUser = serviceInUser.itemService.find(
      (item) => item.idItemService == idItemService
    );
    if (!itemServiceInUser) {
      itemServiceInUser = {
        idItemService,
        title: itemService.title,
        price: itemService.priceRental,
        duration: itemService.timetext,
        selectedStaff: null,
        optionals: [], // dùng mảng
      };
      serviceInUser.itemService.push(itemServiceInUser);
    }

    // Đảm bảo optionals là mảng
    if (!Array.isArray(itemServiceInUser.optionals)) {
      itemServiceInUser.optionals = [];
    }
    // Kiểm tra itemAddOn có đang tồn tại trong optionals không
    const index = itemServiceInUser?.optionals.findIndex(
      (opt) => opt.id === itemAddOn.id
    );

    if (index > -1) {
      // Đã chọn rồi > bỏ chọn
      itemServiceInUser.optionals.splice(index, 1);
      $checkboxAddOn.removeClass("selected");
    } else {
      // Chưa chọn > thêm vào
      itemServiceInUser.optionals.push(itemAddOn);
      $checkboxAddOn.addClass("selected");
    }

    // trigger gọi btn add more nếu chưa chọn thợ
    const $wrapListMore = $this.closest(".wrap-list-more");
    const $cardMore = $wrapListMore.find(
      `.card-more[data-id="${idItemService}"]`
    );
    $cardMore.find(".add-more .btn-add-more").trigger("click");
    // Cập nhật sumary
    renderSumary(dataBooking, listDataService);
  });
});
