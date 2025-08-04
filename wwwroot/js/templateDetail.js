  const dataTemplate = JSON.parse(localStorage.getItem('dataTemplate'));
  let dataRelease = JSON.parse(JSON.stringify(dataTemplate));
  // Thêm option vào item id = "page-about"
  const optionItems = [
    { aboutItemId: 1, text: 'About Nailvibe', bgColor: dataRelease.color.bgPrimary },
    { aboutItemId: 2, text: 'About Mango' , bgColor: dataRelease.color.bgPrimary}
  ];
  const findAbout = dataRelease.dataHeaderNav.itemNav.find((item)=> item.id === 'page-about');
  if(findAbout) {
    findAbout.optionItems = optionItems;
  }
  // Thêm option chọn trong banner


  const typeBookingEnum = {
    GUESTS: 'GUESTS',
    ME: 'ME',
    FAMILY: 'FAMILY',
  };
  const genderEnum = {
    OTHER: 'OTHER',
    MALE: 'MALE',
    FEMALE: 'FEMALE',
  };

  const templateStore = {
    load: () => {
      let dataBooking = {
        type: typeBookingEnum.ME,
        users: [
          {
            id: 1,
            firstName: 'Shane',
            lastName: 'Fox',
            fullName: 'Shane Fox',
            phoneNumber: '0230203023',
            email: 'jessica.hanson@gmail.com',
            gender: genderEnum.MALE,
            services: [], // Danh sách dịch vụ đã chọn
            selectedDate: null, // Ngày được chọn (Date object)
            selectedTimeSlot: null, // Khung giờ được chọn
            selectedStaff: null, // Thợ được chọn
          },
        ],
      };
      // Danh sách người làm việc có quyền
      let listDataService = [
        {
          item: {
            iconLeft: `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16625 11.4688H13.4263V2.46875H1.90625V21.9688H13.4263V12.9688H7.16625V11.4688Z" fill="#E27303" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8448 11.4691C19.8328 11.4681 18.0008 9.63605 18.0008 7.62305V6.87305H16.5008V7.62305C16.5008 9.10005 17.1758 10.4801 18.2198 11.4691L13.4219 11.469V12.969L18.2198 12.9691C17.1758 13.9581 16.5008 15.3371 16.5008 16.8141V17.5641H18.0008V16.8141C18.0008 14.8021 19.8338 12.9691 21.8458 12.9691H22.5958V11.4691H21.8448Z" fill="#E27303" />
            </svg>
            `,
            value: 'Manicure 1',
            iconRight: `
              <i class="fa-solid fa-chevron-down rotate-transition"></i>
            `,
            listItem: [
              {
                title: 'Essential Pedicure 1',
                subTitle: 'Hydrating Pedi Salt Soak 1',
                priceRental: '$45',
                timetext: '40min',
                userSelected: {},
              },
              {
                title: 'Essential Pedicure 2',
                subTitle: 'Hydrating Pedi Salt Soak 1',
                priceRental: '$45',
                timetext: '40min',
                userSelected: {},
              },
            ],
          },
        },
        {
          item: {
            iconLeft: `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16625 11.4688H13.4263V2.46875H1.90625V21.9688H13.4263V12.9688H7.16625V11.4688Z" fill="#E27303" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8448 11.4691C19.8328 11.4681 18.0008 9.63605 18.0008 7.62305V6.87305H16.5008V7.62305C16.5008 9.10005 17.1758 10.4801 18.2198 11.4691L13.4219 11.469V12.969L18.2198 12.9691C17.1758 13.9581 16.5008 15.3371 16.5008 16.8141V17.5641H18.0008V16.8141C18.0008 14.8021 19.8338 12.9691 21.8458 12.9691H22.5958V11.4691H21.8448Z" fill="#E27303" />
            </svg>
            `,
            value: 'Manicure 2',
            iconRight: `
            <i class="fa-solid fa-chevron-down rotate-transition"></i>
            `,
            listItem: [
              {
                title: 'Essential Pedicure 1',
                subTitle: 'Hydrating Pedi Salt Soak 1',
                priceRental: '$45',
                timetext: '40min',
                userSelected: {},
              },
              {
                title: 'Essential Pedicure 2',
                subTitle: 'Hydrating Pedi Salt Soak 1',
                priceRental: '$45',
                timetext: '40min',
                userSelected: {},
              },
            ],
          },
        },
      ];
      const listUser = [
        {
          id: 'default',
          avatar: '/assets/images/listUser/userAvailable.png',
          name: 'Next Available',
        },
        {
          id: '1',
          avatar: '/assets/images/listUser/avatar1.png',
          name: 'Lily',
        },
        {
          id: '2',
          avatar: '/assets/images/listUser/avatar1.png',
          name: 'Savananah',
        },
      ];

      let dataCart = {
        order: [],
        noneOrder: {
          image: '/assets/images/cart-user/img_bg.svg',
        },
        btnBack: {
          text: 'Back',
          bgColor: '#E6EEE8',
          borderColor: dataRelease?.color?.bgPrimary || '#04972F',
        },
      };

      let dataGuest =[
        {
          id: 1,
          fullName: '',
        },
        {
          id: 2,
          fullName: '',
        }
      ]
      let dataFamily =[
        {
          id: 1,
          fullName: 'Nguyen A',
        },
        {
          id: 2,
          fullName: 'Nguyen B',
        },
        {
          id: 3,
          fullName: 'Nguyen C',
        },
        {
          id: 4,
          fullName: 'Nguyen D',
        }
      ];
      return {
        dataBooking,
        listDataService,
        listUser,
        dataCart,
        dataGuest,
        dataFamily
      };
    },
  };

  // Function block element
  function renderNavHeaderTemplates(dataHeaderNav) {
    const { logo: logoWeb, itemNav, colorActiveNav, iconUser, buttonBooking, cart } = dataHeaderNav;

    return `
      <div class="nav-header-web" style="--color-active: ${colorActiveNav}">
        <div class="wrap-logo-nav-web">
          <img src=${logoWeb} alt="logo" class="img-logo" />
        </div>
        <div class="left-nav-web">
          <div class="list-option">
            ${itemNav
              .map((item) => {
                const iconItemNav = item.icon ? item.icon : '';
                const hasDropdown = Array.isArray(item.optionItems) && item.optionItems.length>0;

                return `
                <div class="nav-item-with-dropdown" data-id="${item.id}">
                  <button id="${item.id}" class="text-uppercase option">
                    ${item.name}
                    ${iconItemNav}
                  </button>
                  ${hasDropdown
                    ?
                      `<div class="dropdown-nav-list">
                        ${item.optionItems.map((opt) => {
                          return `
                            <div class="dropdown-item" data-id=${opt.id}
                              style="
                                --bgColorItemHeader: ${opt.bgColor}
                              "
                            >
                              ${opt.text}
                            </div>
                          `
                        }).join('')}
                      </div>`
                    : ''
                  }
                </div>
              `;
              })
              .join('')}
          </div>
          <div class="cart-profile">
            <button class="user">
              ${iconUser}
            </button>
            <div class="right-profile">
              <button class="booking text-uppercase"
                style="
                  --btn-bg: ${buttonBooking.bgBtn};
                  --btn-color: ${buttonBooking.color};
                  --btn-border: ${buttonBooking.border};
                  --btn-bg-hover: ${buttonBooking.bgColorHover}
                "
              >
                  ${buttonBooking.content}
              </button>
              <div class="cart-user">
                <button>
                  ${cart.icon}
                </button>
                <span class="quantity-prod"
                  style="
                    --bgColorQa: ${cart.bgColor};
                    --colorQua: ${cart.color};
                  "
                >
                  ${cart.quatity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderAdvertisePage(dataAdvertise) {
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
              ${bgAdvertise2.content.map((item) => {
                return `
                  <span class="text-advertise"
                    style="
                      --text-weight-ad: ${item.fontWeight}
                    "
                  >
                    ${item.text}
                  </span>
                `;
              })}
            </p>
          </div>
          <div class="wrap-signin">
            <div class="text-uppercase sign-in"
                style="
                  --bgColor-signin: ${buttonSignIn.bgColor};
                  --text-color-signin: ${buttonSignIn.color};
                  --bgColor-signin-hover: ${buttonSignIn.bgColorHover};
                  --border-signin: ${buttonSignIn.border};
                "
            >
              ${buttonSignIn.content}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // function render option banner
  function renderBookingOption(containerSelector, btnOptionBook, optionBooked) {
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
          ${content.find(x => x.type === optionBooked).text}
        </span>
        ${icon}
      </button>
      <div class="list-option-booking hidden">
        ${content.map(item => {
          if (item.type === optionBooked) return '';
          console.log("item.type: ", item.type);
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
        }).join('')}
      </div>
    `;

    $(containerSelector).html(html);
  }
  // render control user booking
  function renderCountControls(containerSelector, dataArray, dataBooking) {
    const $c = $(containerSelector);
    $c.empty();
    // Kiểm tra xem có user nào đã chọn dịch vụ hay không
    const hasSelectedServices = dataBooking.users.some(user => user.services.length > 0);

    $c.html(`
      <div class="guest-controls">
        <button class="btn-decrease">–</button>
        <span class="guest-count">${dataArray.length}</span>
        <button class="btn-increase">+</button>
        ${hasSelectedServices ? `
          <div class="copy-service-wrapper">
            <button class="btn-copy-service">Copy Service</button>
            <div class="copy-service-dropdown hidden">
              ${dataBooking.users
                .filter(user => user.services.length > 0)
                .map(user => `
                  <div class="copy-service-item" data-user-id="${user.id}">
                    ${user.fullName || 'Unknown'}
                  </div>
                `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `);
  }
  // render input fullname user
  function renderGuestInputs(containerSelector, dataArray, dataBooking) {
    const $c = $(containerSelector);
    $c.empty();

    if (!dataArray || dataArray.length === 0) return;

    dataArray.forEach(item => {
      // Tìm user tương ứng trong dataBooking.users hoặc tạo mới nếu chưa có
      let user = dataBooking.users.find(u => u.id === item.id);
      if (!user) {
        user = {
          id: item.id,
          firstName: '',
          lastName: '',
          fullName: item.fullName,
          phoneNumber: '',
          email: '',
          gender: genderEnum.OTHER,
          services: [],
          selectedDate: null,
          selectedTimeSlot: null,
          selectedStaff: null,
        };
        dataBooking.users.push(user);
      }

      $c.append(`
        <div class="guest-input" data-id="${item.id}">
          <input
            type="text"
            class="input-fullname"
            value="${item.fullName}"
            placeholder="Full name..."
          />
          <button class="btn-remove">×</button>
        </div>
      `);
    });
  }


  // banner page
  function renderBannerPage(dataBannerPage) {
    const { greeting, brand, title, desc, bookFor,optionBooked, btnOptionBook, image } = dataBannerPage;
    const imgBannerLeft1 = '/assets/images/banner-template/image-banner-left-1.png';
    const imgBannerLeft2 = '/assets/images/banner-template/cloud-left.png';
    console.log("btn option: ", btnOptionBook.content.find(x => x.type === optionBooked));
    return `
      <div class="banner">
        <div class="content-banner">
          <div class="wrap-content-left-banner">
            <div class="hight-text-banner">
              <div class="welcome-to">${greeting}</div>
              <p>
                <span class="text-uppercase text-mountains-christmas">${brand}</span>
                <br />
                <span id="banner-title" class="time-relax">${title}</span>
              </p>
              <p id="banner-desc" class="text-content-banner">
                ${desc}
              </p>
            </div>
            <div class="book-appoint">
              <div class="text-book-for">
                  <span class="book-for">${bookFor}</span>
                  <i class="fa-solid fa-arrow-right"></i>
              </div>
              <div class="wrap-book-for"></div>
              <div class="wrap-control"></div>
              <div class="wrap-input-guests hidden"></div>
            </div>
            <div class="img-banner-left">
                <img class="img-booking-left-1" src="${imgBannerLeft1} ">
                <img class="img-booking-left-2" src="${imgBannerLeft2}" />
            </div>
          </div>
          <div class="img-banner-booking">
            <img class="img-booking-2" src="${image.imgBooking2} ">
            <img class="img-booking-1" src="${image.imgBooking1}" />
            <img class="img-booking-3" src="${image.imgBooking3}" />
          </div>
        </div>
      </div>
    `;
  }

  // list services page
  function renderListService(dataList, containerSelector = '.list-more', dataBooking, currentUserId) {
    const $container = $(containerSelector);
    $container.empty();

    dataList.forEach(({ item }, i) => {
      const $moreItem = $(
        `<div class="more-item" style="z-index: ${100 + item.listItem.length - i}"></div>`
      );

      const $expandTitle = renderExpandTitle(item);
      $moreItem.append($expandTitle);
      console.log("dataBooking: ", dataBooking)

      const $listCards = item.listItem.map(cardItem => renderServiceCard(cardItem, dataBooking, currentUserId));
      const $wrapper = $(`<div class="wrap-list-more"></div>`).append($listCards);
      $moreItem.append($wrapper);

      $container.append($moreItem);
    });
  }
    // title card service
    function renderExpandTitle(item) {
      const $title = $('<div class="expend-title"></div>');

      $title.append(item.iconLeft);
      $title.append(`<p class="text-uppercase bold-medium-14 mb-0">${item.value}</p>`);
      $title.append(item.iconRight);

      return $title;
    }
    // item card service
    function renderServiceCard(item, dataBooking, currentUserId) {
      const $card = $('<div class="card-more"></div>');

      const $top = $(`
        <div class="top-card">
          <div class="left-card">
            <p class="bold-medium-14">${item.title}</p>
            <p class="thin-mid-14">${item.subTitle}</p>
          </div>
          <div class="right-card">
            <p class="bold-medium-20">${item.priceRental}</p>
            <p class="bold-mid-12">${item.timetext}</p>
          </div>
        </div>
      `);
        console.log("dataBooking: ", dataBooking);
      const user = dataBooking.users.find(u => u.id === currentUserId);
      const isSelected = user && user.services.some(s => s.title === item.title);

      const $listUser = $(`
        <div class="option-select-user">
          ${renderSelectedUsers(user?.selectedStaff ? { name: user.selectedStaff } : {})}
        </div>
      `);

      const $actions = renderActionButtons(item, dataBooking, currentUserId, isSelected);
      $card.append($top, $actions, $listUser);
      return $card;
    }
    // Render danh sách user để chọn
    function renderUserOptions(users) {
      return `
        <div class="wrap-user">
          ${users
            .map(
              (user) => `
            <div class="item-user" data-id="${user.id}">
              <div class="avatar-user">
                <img src="${user.avatar}" alt="image ${user.name}" class="img-user" />
              </div>
              <span class="full-name">${user.name}</span>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }
    // hiển thị user đã được chọn
    function renderSelectedUsers(userSelected) {
      if (!userSelected || Object.keys(userSelected).length === 0) return '';

      const { name = 'Name user', image = '' } = userSelected;

      return `
        <div class="item-user">
          <div class="avatar-user">
            <img src="${image}" alt="image user" class="img-user"/>
          </div>
          <span>${name}</span>
        </div>
      `;
    }
    // btn action
    function renderActionButtons(item, dataBooking, currentUserId, isSelected) {
      const $wrap = $('<div class="add-more"></div>');

      const $add = $(`
        <button class="btn-add-more" style="display: ${isSelected ? 'none' : 'block'}">
          <i class="fa-solid fa-plus"></i>
        </button>
      `);

      const $wrapSelect = $(`
        <div class="wrap-select-user" style="display: ${isSelected ? 'flex' : 'none'}">
          <div class="icon-checked">
            <i class="fa-solid fa-check"></i>
          </div>
          <div class="toggle-select">
            <span id="full-name-selected">${isSelected && dataBooking.users.find(u => u.id === currentUserId)?.selectedStaff || 'Next Available'}</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
        </div>
      `);

      const $del = $(`
        <button class="btn-delete" style="display: ${isSelected ? 'block' : 'none'}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M14 10.0605V17.0605M10 10.0605V17.0605M6 6.06055V17.8605C6 18.9807 6 19.5403 6.21799 19.9681C6.40973 20.3445 6.71547 20.651 7.0918 20.8428C7.5192 21.0605 8.07899 21.0605 9.19691 21.0605H14.8031C15.921 21.0605 16.48 21.0605 16.9074 20.8428C17.2837 20.651 17.5905 20.3445 17.7822 19.9681C18 19.5407 18 18.9816 18 17.8636V6.06055M6 6.06055H8M6 6.06055H4M8 6.06055H16M8 6.06055C8 5.12866 8 4.66295 8.15224 4.29541C8.35523 3.80535 8.74432 3.41578 9.23438 3.21279C9.60192 3.06055 10.0681 3.06055 11 3.06055H13C13.9319 3.06055 14.3978 3.06055 14.7654 3.21279C15.2554 3.41578 15.6447 3.80535 15.8477 4.29541C15.9999 4.66295 16 5.12867 16 6.06055M16 6.06055H18M18 6.06055H20" stroke="#ECB155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      `);

      $wrap.append($add, $wrapSelect, $del);
      return $wrap;
    }
  // render infor store
    // render promotion shop
    const renderPromotionItemPage = (dataProm, extraClass = '') => {
      return `
        <div class="item-promotion-page ${extraClass}">
          <div class="right-promotion-item">
            <img src="${dataProm.img}" alt="image promotion" class="img-promotion"/>
          </div>
          <div class="left-promotion-item">
            <div class="title-icon">
              <h2 class="title mb-0">${dataProm.title.content}</h2>
            </div>
            <div class="percent-promotion">
              <span class="percent"
                style="--bgColor-percent: ${dataProm.percent.bgColor}; --textColor-percent: ${dataProm.percent.color};"
              >
                ${dataProm.percent.number}%
              </span>
              <h2 class="title-percent mb-0">${dataProm.percent.content}</h2>
            </div>
            <div class="date-time">
              <p>Valid until ${dataProm.dateTime.endTime}</p>
            </div>
          </div>
        </div>
      `;
    };

    // render work-time
    const renderStoreInfo = (dataStoreInfo, color = '') => {
      const $container = $('<div class="store-info"></div>');

      const $left = $(`
        <div class="store-left">
          <h3 style="
            --colorTextStoreInfo: ${color};"
          >
            ${dataStoreInfo.brand.toUpperCase()}
          </h3>
          <p>${dataStoreInfo.iconLocation} ${dataStoreInfo.phoneNumber}</p>
          <p>${dataStoreInfo.address}</p>
        </div>
      `);

      const $right = $('<div class="store-right"></div>');
      $right.append('<h4>HOURS</h4>');

      dataStoreInfo.timeWork.forEach((item) => {
        const $row = $(`
          <div class="store-hour-row">
            <span class="weekday">${item.weekday}</span>
            <span class="time">${item.time}</span>
          </div>
        `);
        $right.append($row);
      });

      $container.append($left).append($right);
      return $container;
    };
    // render policy
    const renderPolicyPage = (dataPolicyPage, color = '') => {
      const { title, styleTitle, listItem } = dataPolicyPage;

      const titleHtml = `
        <h3
          class="title-policy"
          style="
            --colorTextTitlePolicy: ${color}
          "
        >
          ${title.toUpperCase()}
        </h3>
      `;

      const itemsHtml = listItem
        .map((item) => {
          const contentHtml = item.content
            .map((part) => {
              if (part.style) {
                // Nếu có style riêng
                return `<span style="color: ${part.style.color}">${part.text}</span>`;
              } else {
                return `<span>${part.text}</span>`;
              }
            })
            .join(' ');

          return `<p class="item-policy">${contentHtml}</p>`;
        })
        .join('');

      return `
        <div class="policy-page">
          ${titleHtml}
          <div class="policy-list">
            ${itemsHtml}
          </div>
        </div>
      `;
    };
    //render social link
    const renderSocialLink = (data, color = '') => {
      const address = encodeURIComponent(data.mapLocation.address);
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
    };

    // render social icon
    function renderSocialItemPage(item) {
      return `
        <div class="wrap-image-social" data-id="${item.id}">
          <img src="${item.img}" alt="image social" class="img-social"/>
        </div>
      `;
    }
  // render calender
  function renderCalendar(monthNames, dayNames, daysEl, monthYearEl, currentMonth, currentYear, fakeDataCalender, selectedDate, dataBooking, currentUserId) {
    daysEl.innerHTML = "";
    monthYearEl.textContent = `${monthNames[currentMonth]}, ${currentYear}`;

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    // Render day names
    dayNames.forEach(day => {
      const dayName = document.createElement("div");
      dayName.className = "day-name";
      dayName.textContent = day;
      daysEl.appendChild(dayName);
    });

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("div");
      daysEl.appendChild(empty);
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const day = document.createElement("div");
      day.className = "day";
      day.textContent = date;

      const isToday = date === todayDate && currentMonth === todayMonth && currentYear === todayYear;
      const isSelected = selectedDate && date === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear();
      const nonWorking = fakeDataCalender[currentMonth + 1]?.includes(date);

      const isPast =
            currentYear < todayYear ||
            (currentYear === todayYear && currentMonth < todayMonth) ||
            (currentYear === todayYear && currentMonth === todayMonth && date < todayDate);


      if (nonWorking) {
        day.classList.add("inactive");
      } else {
        if (isPast) {
          day.classList.add("past");
        } else if (isSelected) {
          day.classList.add("active");
        } else if (isToday) {
          day.classList.add("today", "active");
        }

        // Gán sự kiện click chỉ nếu không phải ngày đã qua
        if (!isPast) {
          day.addEventListener("click", () => {
            const allDays = document.querySelectorAll(".day");
            allDays.forEach(d => {
              d.classList.remove("active");
            });

            const todayEl = Array.from(allDays).find(d =>
              parseInt(d.textContent) === todayDate &&
              currentMonth === todayMonth &&
              currentYear === todayYear
            );

            if (todayEl && !todayEl.classList.contains("inactive")) {
              todayEl.classList.remove("active");
              todayEl.classList.add("today");
            }

            day.classList.remove("today");
            day.classList.add("active");
            selectedDate = new Date(currentYear, currentMonth, date);

            // Lưu ngày vào user hiện tại
            const user = dataBooking.users.find(u => u.id === currentUserId);
            if (user) {
              user.selectedDate = selectedDate;
            }

            document.getElementById("selectedDateTitle").textContent = selectedDate.toDateString();
            renderTimeSlotsForDate(selectedDate, dataBooking, currentUserId);
          });
        }
      }

      daysEl.appendChild(day);
    }
  }
  //render timeslot
  function generateTimeSlots(start, end, interval = 30) {
    const slots = [];
    let [h, m] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    while (h < endH || (h === endH && m <= endM)) {
      const formatted = new Date(0, 0, 0, h, m)
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      slots.push(formatted);

      m += interval;
      if (m >= 60) {
        m -= 60;
        h++;
      }
    }

    return slots;
  }
  function renderTimeSlotsForDate(selectedDate, dataBooking, currentUserId) {
    const container = $("#timeSlotsContainer");
    container.empty();
      //timeslot
    const workingHoursByWeekday = {
      0: [], // Chủ nhật - không làm
      1: ["09:00", "15:00"], // Thứ 2
      2: ["08:30", "16:00"], // Thứ 3
      3: ["08:00", "17:00"], // Thứ 4
      4: ["09:15", "17:30"], // Thứ 5
      5: ["10:00", "15:30"], // Thứ 6
      6: ["08:00", "12:00"], // Thứ 7
    };

    const weekday = selectedDate.getDay(); // 0 = Sun, 1 = Mon, ...
    const workingRange = workingHoursByWeekday[weekday];

    if (!workingRange || workingRange.length === 0) {
      container.append(`<div class="time-slot">Không có giờ làm việc hôm nay.</div>`);
      return;
    }

    const slots = generateTimeSlots(workingRange[0], workingRange[1]);

    slots.forEach(slot => {
      const div = $(`
        <div class="time-slot">
          <span>${slot}</span>
          <div class="circle"></div>
        </div>
      `);
      container.append(div);
    });

    $(".time-slot").on("click", function () {
      $(".time-slot").removeClass("selected");
      $(this).addClass("selected");

      // Lưu khung giờ vào user hiện tại
      const user = dataBooking.users.find(u => u.id === currentUserId);
      if (user) {
        user.selectedTimeSlot = $(this).find('span').text();
      }
    });
  }



  // popup cart user
  function renderPopupCart(dataCart) {
    const { order, noneOrder, btnBack } = dataCart;
    return `
      <div class="overlay-screen">
        <div class="popup-container-cart">
          <div class="popup-wrap-cart">
            <div class="title-select-services">
              <h2 class="text-uppercase">Services Selected</h2>
            </div>
            <div class="wrap-list-services">
              ${
                order && order.length > 0
                  ? order.map((item) => {
                      return `
                  <div class="list-order">
                    Map order here
                  </div>
                `;
                    })
                  : `<div class="image-order-none">
                <img src=${noneOrder.image} alt="Empty order" class="empty-img-order"/>
              </div>`
              }
            </div>
            <div class="wrap-btn-back-order">
              <div class="btn-back-order"
                style="
                --borderBtnBackOrder: ${btnBack.borderColor};
                --bgBtnBackOrder: ${btnBack.bgColor};
                "
              >
                ${btnBack.text}
              </div>
            </div>
          </div>
          <div class="btn-closepopup">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
    `;
  }

  // Function render block element
  function renderBlockTemplate(dataBlock) {
    // Variable data block
    const { dataHeaderNav, advertises, banner,sideInfo, bannerProSelected, color  } = dataRelease;
    const {promotion, policy, storeInfo, socialLink, socialIcon} = sideInfo;

    const $wrapWeb = $('.wrap-home-templates');
    const htmlHeaderNav = renderNavHeaderTemplates(dataHeaderNav);
    const htmlAdvertise = renderAdvertisePage(advertises);
    const htmlBannerPage = renderBannerPage(banner);
    // data render infoshop


    $wrapWeb.prepend(
      `<div class="wrap-header">${htmlHeaderNav}</div>`,
      `<div class="wrap-advertise-page">${htmlAdvertise}</div>`,
      `<div class="wrap-banner-page">${htmlBannerPage}</div>`,
      `<div class="wrap-service-infoshop">
        <div class="list-more">
        </div>
        <div id="list-info" class="show-list-info">
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
      `<div class="calendar-timeslot">
        <div class="calendar">
          <div class="calendar-header">
            <button id="prev">&#x25C0;</button>
            <div id="monthYear"></div>
            <button id="next">&#x25B6;</button>
          </div>
          <div class="calendar-grid" id="days">
            <!-- days will be rendered here -->
          </div>
        </div>
        <div class="timeslot">
          <h2 id="selectedDateTitle">August 14, 2025</h2>
          <div id="timeSlotsContainer" class="time-slots"></div>
          <div class="text-scroll-more">
            <h2>Scroll to see more time slots</h2>
          </div>
        </div>
      </div>`
    );
    const { dataBooking, dataGuest } = dataBlock; // Lấy dataBooking từ dataBlock
    console.log("dataBlock: ", dataBlock);
    if (banner.optionBooked === 'GUESTS') {
      renderCountControls('.wrap-control', dataGuest, dataBooking);
      renderGuestInputs('.wrap-input-guests', dataGuest, dataBooking);
      $('.wrap-input-guests').removeClass('hidden');
    } else if (banner.optionBooked === 'FAMILY') {
      renderCountControls('.wrap-control', dataFamily, dataBooking);
      renderGuestInputs('.wrap-input-guests', dataFamily, dataBooking);
      $('.wrap-input-guests').removeClass('hidden');
    }
    // init render list services
    renderListService(dataBlock.listDataService,'.list-more', dataBooking, dataBlock.currentUserId);
    // init render info shop
    if(promotion){
      if ($('.item-promotion-page').length > 0) {
        $('.item-promotion-page').remove();
        let classEx = '';
        if ($('#item-promotion-page').find('.overlay-dark').length > 0) {
          classEx = 'transparent';
        }

        const htmlProPage = renderPromotionItemPage(promotion, classEx);
        $('.wrap-item-promotion-page').append(htmlProPage);
      } else {
        $('#item-promotion-page')
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
    if(storeInfo){
      const $container = $('#store-info-page');
      $container.html(renderStoreInfo(storeInfo, color.bgPrimary)).show();
    }
    if(policy) {
      const $container = $('#policy-page');
      $container.html(renderPolicyPage(policy, color.bgPrimary)).show();
    }
    if(socialLink) {
      const $container = $('#social-link-page');
      $container.html(renderSocialLink(socialLink, color.bgPrimary)).show();
    }
    if(socialIcon) {
      const $loShowSo = $('#social-icon-page');
      socialIcon.forEach((item) =>{
        const htmlSocialItem = renderSocialItemPage(item);
        $loShowSo.find('.list-social').append(htmlSocialItem);
      })
    }
    if(bannerProSelected) {
      const $loShowbg = $('.wrap-item-promotion-page');
      const $itemPromotionPage = $loShowbg.find('.item-promotion-page');
      if ($('.overlay-dark').length === 0) {
          $loShowbg.append(`<div class="overlay-dark"></div>`);
        }
        $itemPromotionPage.addClass('transparent');
        $loShowbg.css({
          'background-image': `url("${bannerProSelected.image}")`,
          'justify-content': 'flex-start',
          padding: '24px 12px',
        });
    }
    // init render option booking
    renderBookingOption('.wrap-book-for', banner.btnOptionBook, banner.optionBooked);
  }

  $(document).ready(function () {
    const $wrapHomeTemp = $('.wrap-home-templates');
    const { dataBooking, listDataService, listUser, dataCart,dataGuest, dataFamily } = templateStore.load();
    let {banner} = dataRelease;
    // Khai báo currentUserId trước khi gọi renderBlockTemplate
    let currentUserId = dataBooking.users[0]?.id || 1;

    renderBlockTemplate({listDataService, listUser, dataBooking, dataGuest, dataFamily, currentUserId});

    // Các sự kiện tương tác trên header
      // << START: dropdown option header
        // Đóng mở dropdown
        $(document).on('click', '.nav-item-with-dropdown > .option', function(e){
          e.stopPropagation();

          const $parent = $(this).closest('.nav-item-with-dropdown');

          // Ẩn các dropdown khác
          $('.nav-item-with-dropdown').not($parent).removeClass('open').find('i').removeClass('rotate-transition rotate-180');;

          // Toggle hiện dropdown option hiện tại
          $parent.toggleClass('open');

          // Tìm icon thẻ i
          const $iconI = $(this).find('i');

          if($parent.hasClass('open')){
            if(!$iconI.hasClass('rotate-transition')){
              $iconI.addClass('rotate-transition');
            }
            $iconI.addClass('rotate-180');
          }else{
            $iconI.removeClass('rotate-180')
          }
        })
        // Đóng dropdown khi click ra ngoài
        $(document).on('click', function() {
          $('.nav-item-with-dropdown').removeClass('open');
        })
      // >> END: dropdown option header

      // << START: popup cart
        // Mở popup cart
        $wrapHomeTemp.on('click', '.cart-user button', function (e) {
          e.stopPropagation();
          const html = renderPopupCart(dataCart);
          $wrapHomeTemp.append(html);

          setTimeout(() => {
            $('.overlay-screen').addClass('show');
          }, 10);
        });
        // Đóng popup cart
          // 1. Đóng khi click overlay-screen
            $wrapHomeTemp.on('click', '.overlay-screen', function (e) {
              if (e.target === this) closePopupCart();
            });
          // 2. Đóng khi click btn 'back'
            $wrapHomeTemp.on('click', '.btn-back-order', function () {
              closePopupCart();
            });

          // 3. Đóng khi click btn close 'x'
            $wrapHomeTemp.on('click', '.btn-closepopup', function () {
              closePopupCart();
            });
          // 4. Function animation đóng popup cart
            function closePopupCart() {
              const $overlay = $('.overlay-screen');
              $overlay.removeClass('show'); // remove class để thu nhỏ

              setTimeout(() => {$overlay.remove()}, 300); // chờ animation xong mới xóa DOM
            }
      // >> END: popup cart
      // << START: Xử lý chọn option: ME, FAMILY, GUESTS
        // Toggle khi bấm vào button chính
        $(document).on('click', '.btn-option-banner-selected', function (e) {
          e.stopPropagation(); // tránh bị close ngay khi click

          const $dropdown = $(this).next('.list-option-booking');
          $('.btn-option-banner-selected i').not($(this).find('i')).removeClass('rotate-180');

          $('.list-option-booking').not($dropdown).removeClass('active'); // close các dropdown khác
          $dropdown.toggleClass('active');
          $(this).find('i').toggleClass('rotate-180');
        });

        // Đóng dropdown khi click ra ngoài
        $(document).on('click', function () {
          $('.list-option-booking').removeClass('active');
        });
        //
        let currentData = [];
        function updateGuestSection() {
          renderCountControls('.wrap-control', currentData, dataBooking);
          renderGuestInputs('.wrap-input-guests', currentData, dataBooking);
        }
        $(document).on('click', '.option-item-booking', function (e) {
          e.stopPropagation();
          const selectedType = $(this).data('type');
          const selectedText = $(this).text().trim();
          // Cập nhật dữ liệu optionBooked nếu cần (tùy vào logic bạn dùng lưu ở đâu)
          banner.optionBooked = selectedType;

          // Render lại component option
          renderBookingOption('.wrap-book-for', banner.btnOptionBook, banner.optionBooked);
          // Hiện ô nhập thêm nếu là guests hoặc family
          if (selectedType === 'GUESTS') currentData = dataGuest;
          else if (selectedType === 'FAMILY') currentData = dataFamily;
          else currentData = [];

          // show or hide cả 2 khu vực
          if (currentData.length) {
            $('.wrap-input-guests').removeClass('hidden');
            updateGuestSection();
          } else {
            $('.wrap-input-guests').addClass('hidden');
            $('.wrap-control').empty();
            $('.wrap-input-guests').empty();
          }
        });
        // Tăng số lượng
        $(document).on('click', '.btn-increase', function() {
          const maxId = currentData.reduce((max,i) => Math.max(max,i.id), 0);
          const newId = maxId + 1;
          currentData.push({ id: newId, fullName: '' });
          dataBooking.users.push({
            id: newId,
            firstName: '',
            lastName: '',
            fullName: '',
            phoneNumber: '',
            email: '',
            gender: genderEnum.OTHER,
            services: [],
            selectedDate: null,
            selectedTimeSlot: null,
            selectedStaff: null,
          });
          updateGuestSection();
        });

        // Giảm số lượng
        $(document).on('click', '.btn-decrease', function() {
          if (currentData.length <= 1) {
            alert('Bạn phải chọn tối thiểu 1 người.');
            return;
          }
          const idx = currentData.findIndex(i => i.fullName === '');
          if (idx === -1) {
            alert('Không thể xóa khi tất cả các ô đã điền tên.');
            return;
          }
          const idToRemove = currentData[idx].id;
          currentData.splice(idx, 1);
          dataBooking.users = dataBooking.users.filter(u => u.id !== idToRemove);
          updateGuestSection();
        });

        // Xóa từng input
        $(document).on('click', '.btn-remove', function() {
          const $inpWrap = $(this).closest('.guest-input');
          const id = +$inpWrap.data('id');

          if (currentData.length <= 1) {
            alert('Bạn phải giữ tối thiểu 1 người.');
            return;
          }
          const obj = currentData.find(i => i.id === id);
          if (!obj.fullName) {
            currentData = currentData.filter(i => i.id !== id);
            dataBooking.users = dataBooking.users.filter(u => u.id !== id);
            updateGuestSection();
          } else {
            alert('Không thể xóa khi ô đã nhập tên.');
          }
        });

        // Cập nhật data khi gõ input
        $(document).on('input', '.input-fullname', function() {
          const id = +$(this).closest('.guest-input').data('id');
          const val = $(this).val();
          const obj = currentData.find(i => i.id === id);
          if (obj) obj.fullName = val;
          const user = dataBooking.users.find(u => u.id === id);
          if (user) user.fullName = val;
        });

        //focus onput ( xử lý active như tab)
        $(document).on('focus', '.input-fullname', function () {
            $('.input-fullname').removeClass('active'); // Bỏ active các ô khác
          $(this).addClass('active'); // Thêm active ô đang focus
          currentUserId = +$(this).closest('.guest-input').data('id');
          // Cập nhật lại danh sách dịch vụ để hiển thị đúng user
          renderListService(listDataService, '.list-more', dataBooking, currentUserId);
        });
    // Xử lý select services
    $(document).on('click', '.expend-title', function () {
      const $wrap = $(this).next('.wrap-list-more');
      const $iconDown = $(this).find('.fa-chevron-down');

      if ($iconDown.hasClass('rotate-180')) {
        $iconDown.removeClass('rotate-180');
      } else {
        $iconDown.addClass('rotate-180');
      }
      $wrap.toggleClass('collapsed');
    });
    // btn more
    $(document).on('click', '.add-more .btn-add-more', function () {
      const $parentBtn = $(this).closest('.add-more');
      const $card = $parentBtn.closest('.card-more');
      const title = $card.find('.bold-medium-14').text();
      const user = dataBooking.users.find(u => u.id === currentUserId);
      if (user) {
        user.services.push({ title });
      }
      $(this).hide();
      const $selectUser = $parentBtn.find('.wrap-select-user');
      const $btnDelete = $parentBtn.find('.btn-delete');

      $selectUser.css('display', 'flex').hide().fadeIn();
      $btnDelete.show();
      updateGuestSection(); // Cập nhật để hiển thị nút Copy Service
    });
    // remove option select user
    $(document).on('click', '.add-more .btn-delete', function () {
      const $parentBtn = $(this).closest('.add-more');
      const $card = $parentBtn.closest('.card-more');
      const title = $card.find('.bold-medium-14').text();
      const user = dataBooking.users.find(u => u.id === currentUserId);
      if (user) {
        user.services = user.services.filter(s => s.title !== title);
      }
      $(this).hide();
      const $selectUser = $parentBtn.find('.wrap-select-user');
      const $btnAddmore = $parentBtn.find('.btn-add-more');

      $selectUser.hide();
      $btnAddmore.show();
      updateGuestSection(); // Cập nhật để hiển thị nút Copy Service
    });
    // select option user
    $(document).on('click', '.wrap-select-user .toggle-select', function (e) {
      e.stopPropagation();

      const $toggle = $(this); // phần tử được click
      const $parentN = $toggle.closest('.wrap-select-user');

      const $wrap = $toggle.closest('.card-more');
      const $optionList = $wrap.find('.option-select-user');

      const $iconChecked = $parentN.find('.icon-checked');

      // Nếu chưa render
      if ($optionList.children().length === 0) {
        const html = renderUserOptions(listUser);
        $optionList.html(html);
      }

      // Xóa dropdown cũ
      $('.option-select-user').not($optionList).removeClass('show');

      // Lấy kích thước của toggle-select
      const toggleWidth = $toggle.outerWidth();
      // Lấy vị trí cho option-select-user
      const optionUserWidth = $iconChecked.outerWidth();
      const paddingCardMore = 20;
      const gapWrapSelectUser = 16;
      const leftPosOptionList = optionUserWidth + paddingCardMore + gapWrapSelectUser;

      // Gán lại CSS cho dropdown
      $optionList.css({
        position: 'absolute',
        left: leftPosOptionList + 'px',
        width: toggleWidth + 'px',
        zIndex: 999,
      });

      // Toggle hiển thị
      $optionList.toggleClass('show');
    });

    // touch out close option user
    $(document).on('click', function () {
      const $optionList = $(this).find('.option-select-user');
      $optionList.empty();
      $('.option-select-user').removeClass('show');
    });

    // gắn user selected
    $(document).on('click', '.item-user', function (e) {
      e.stopPropagation();
      const name = $(this).find('.full-name').text();
      const $wrap = $(this).closest('.card-more');
      const user = dataBooking.users.find(u => u.id === currentUserId);
      if (user) {
        user.selectedStaff = name;
      }

      $wrap.find('#full-name-selected').text(name);
      $wrap.find('.option-select-user').removeClass('show');
    });
    // Xử lý nút Copy Service
    $(document).on('click', '.btn-copy-service', function (e) {
      e.stopPropagation();
      const $dropdown = $(this).next('.copy-service-dropdown');
      $dropdown.toggleClass('hidden');
    });

    // Xử lý chọn user để copy dịch vụ
    $(document).on('click', '.copy-service-item', function () {
      const sourceUserId = +$(this).data('user-id');
      const sourceUser = dataBooking.users.find(u => u.id === sourceUserId);
      const targetUser = dataBooking.users.find(u => u.id === currentUserId);
      if (sourceUser && targetUser) {
        targetUser.services = [...sourceUser.services];
        targetUser.selectedDate = sourceUser.selectedDate;
        targetUser.selectedTimeSlot = sourceUser.selectedTimeSlot;
        targetUser.selectedStaff = sourceUser.selectedStaff;
      }
      $(this).closest('.copy-service-dropdown').addClass('hidden');
      renderListService(listDataService, '.list-more', dataBooking, currentUserId);
    });
    // Xử lý chọn ngày đặt lịch
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysEl = document.getElementById("days");
    const monthYearEl = document.getElementById("monthYear");
    const currentDate = new Date();

    let selectedDate = null;
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const fakeDataCalender = {
      8: [8, 9, 10, 12, 20, 22] // August: non-working days
    };

    document.getElementById("prev").addEventListener("click", () => {
      if (currentMonth > 0) {
        currentMonth--;
        renderCalendar(monthNames, dayNames, daysEl, monthYearEl, currentMonth, currentYear, fakeDataCalender, selectedDate, dataBooking, currentUserId);
      }
    });

    document.getElementById("next").addEventListener("click", () => {
      if (currentMonth < 11) {
        currentMonth++;
        renderCalendar(monthNames, dayNames, daysEl, monthYearEl, currentMonth, currentYear, fakeDataCalender, selectedDate, dataBooking, currentUserId);
      }
    });

    renderCalendar(monthNames, dayNames, daysEl, monthYearEl, currentMonth, currentYear, fakeDataCalender, selectedDate, dataBooking, currentUserId);

    // Khởi tạo ngày hôm nay làm selectedDate
    selectedDate = new Date(currentYear, currentMonth, currentDate.getDate());

    // Cập nhật tiêu đề ngày được chọn
    document.getElementById("selectedDateTitle").textContent = selectedDate.toDateString();

    // Hiển thị time slots cho ngày hôm nay
    renderTimeSlotsForDate(selectedDate, dataBooking, currentUserId);
  });
