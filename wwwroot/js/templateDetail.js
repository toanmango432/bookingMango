  const dataTemplate = JSON.parse(localStorage.getItem('dataTemplate'));
  let dataRelease = JSON.parse(JSON.stringify(dataTemplate));
  console.log('dataPage ', dataRelease)
  const colorPrimary = dataRelease?.color?.bgPrimary || '#00bed6';
  const colorSecondary = dataRelease?.color?.bgSecondary || '#1cdef4';
  // Thêm option vào item id = "page-about"
  const optionItems = [
    { aboutItemId: 1, text: 'About Nailvibe', bgColor: dataRelease.color.bgPrimary },
    { aboutItemId: 2, text: 'About Mango' , bgColor: dataRelease.color.bgPrimary}
  ];
  const findAbout = dataRelease.dataHeaderNav.itemNav.find((item)=> item.id === 'page-about');
  if(findAbout) {
    findAbout.optionItems = optionItems;
  }
  // Thêm service add on cho item service trong service


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
            phoneNumber: '0230203023',
            email: 'jessica.hanson@gmail.com',
            gender: genderEnum.MALE,
            services: [

            ], // Danh sách dịch vụ đã chọn
            selectedDate: null, // Ngày được chọn (Date object)
            selectedTimeSlot: null, // Khung giờ được chọn
            isSelecting: false,
            isChoosing: true,
          },
        ],
      };
      // Danh sách người làm việc có quyền
      let listDataService = [
        {
          item: {
            id: 1,
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
                id: 1,
                title: 'Essential Pedicure 1',
                subTitle: 'Hydrating Pedi Salt Soak 1',
                priceRental: '$45',
                timetext: '40min',
                listOptionAddOn: [
                  {
                    id: 1,
                    title: 'Gel Extensions',
                    price: '$40.00',
                    timedura: '40min',
                  },
                  {
                    id: 2,
                    title: 'Gel Extensions Removal',
                    price: '$40.00',
                    timedura: '40min',
                  },
                  {
                    id: 3,
                    title: 'Gel Removal',
                    price: '$40.00',
                    timedura: '40min',
                  },
                  {
                    id: 4,
                    title: 'Basic Design (All Nails)',
                    price: '$40.00',
                    timedura: '40min',
                  },
                  {
                    id: 5,
                    title: 'Set up Design (All Nails)',
                    price: '$40.00',
                    timedura: '40min',
                  },
                  {
                    id: 6,
                    title: 'Basic Design (Per Nail)',
                    price: '$40.00',
                    timedura: '40min',
                  },
                  {
                    id: 7,
                    title: 'Foil Design (Per Nail)',
                    price: '$40.00',
                    timedura: '40min',
                  },
                  {
                    id: 8,
                    title: 'Step up Design (Per Nail)',
                    price: '$40.00',
                    timedura: '40min',
                  },
                  {
                    id: 9,
                    title: 'Back Massage',
                    price: '$40.00',
                    timedura: '40min',
                  },
                  {
                    id: 10,
                    title: 'Hand Massage',
                    price: '$40.00',
                    timedura: '40min',
                  }
                ]
              },
              {
                id: 2,
                title: 'Essential Pedicure 2',
                subTitle: 'Hydrating Pedi Salt Soak 1',
                priceRental: '$45',
                timetext: '40min',
                listOptionAddOn:[],
              },
            ],
          },
        },
        {
          item: {
            id: 2,
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
                id: 1,
                title: 'Essential Pedicure 1',
                subTitle: 'Hydrating Pedi Salt Soak 1',
                priceRental: '$45',
                timetext: '40min',
                listOptionAddOn:[],
              },
              {
                id: 2,
                title: 'Essential Pedicure 2',
                subTitle: 'Hydrating Pedi Salt Soak 1',
                priceRental: '$45',
                timetext: '40min',
                listOptionAddOn:[],
              },
            ],
          },
        },
      ];
      const listUserStaff = [
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
      let dataMe = [{
        id: 1,
        firstName: 'Shane',
        lastName: 'Fox',
        phoneNumber: '0230203023',
        email: 'jessica.hanson@gmail.com',
        gender: genderEnum.MALE,
        services: [

        ],
        selectedDate: null,
        selectedTimeSlot: null,
        isSelecting: false,
        isChoosing: true,
      }]
      let dataGuest =[
        {
          id: 1,
          firstName: null,
          lastName: null,
          phoneNumber: null,
          email: null,
          gender: null,
          services: [

          ],
          selectedDate: null,
          selectedTimeSlot: null,
          isSelecting: false,
          isChoosing: false,
        },
        {
          id: 2,
          firstName: null,
          lastName: null,
          phoneNumber: null,
          email: null,
          gender: null,
          services: [

          ],
          selectedDate: null,
          selectedTimeSlot: null,
          isSelecting: false,
          isChoosing: false,
        },
      ]
      let dataFamily =[
        {
          id: 1,
          firstName: 'Family',
          lastName: 'own',
          phoneNumber: '092304923',
          email: 'khacowner@gmail.com',
          gender: genderEnum.FEMALE,
          services: [
            {
              idService: 1,
              itemService: [
                {
                  idItemService: 1,
                  selectedStaff: {
                    id: 'default',
                    avatar: '/assets/images/listUser/userAvailable.png',
                    name: 'Next Available',
                  },
                }
              ]
            }
          ],
          selectedDate: null,
          selectedTimeSlot: null,
          isSelecting: false,
          isChoosing: false,
        },
        {
          id: 1,
          firstName: 'Family',
          lastName: '1',
          phoneNumber: '092304923',
          email: 'khac1@gmail.com',
          gender: genderEnum.FEMALE,
          services: [
            {
              idService: 1,
              itemService: [
                {
                  idItemService: 1,
                  selectedStaff: {
                    id: 'default',
                    avatar: '/assets/images/listUser/userAvailable.png',
                    name: 'Next Available',
                  },
                }
              ]
            }
          ],
          selectedDate: null,
          selectedTimeSlot: null,
          isSelecting: false,
          isChoosing: false,
        },{
          id: 2,
          firstName: 'Family',
          lastName: '2',
          phoneNumber: '000012',
          email: 'khac2@gmail.com',
          gender: genderEnum.FEMALE,
          services: [
            {
              idService: 1,
              itemService: [
                {
                  idItemService: 1,
                  selectedStaff: {
                    id: '1',
                    avatar: '/assets/images/listUser/userAvailable.png',
                    name: 'Next Available',
                  },
                }
              ]
            }
          ],
          selectedDate: null,
          selectedTimeSlot: null,
          isSelecting: false,
          isChoosing: false,
        },
        {
          id: 1,
          firstName: 'Family',
          lastName: '3',
          phoneNumber: '000003',
          email: 'khac3@gmail.com',
          gender: genderEnum.FEMALE,
          services: [
            {
              idService: 1,
              itemService: [
                {
                  idItemService: 2,
                  selectedStaff: {
                    id: '1',
                    avatar: '/assets/images/listUser/userAvailable.png',
                    name: 'Next Available',
                  },
                }
              ]
            }
          ],
          selectedDate: null,
          selectedTimeSlot: null,
          isSelecting: false,
          isChoosing: false,
        },
      ];
      return {
        dataBooking,
        listDataService,
        listUserStaff,
        dataCart,
        dataMe,
        dataGuest,
        dataFamily
      };
    },
  };

  // HELP FUNCTION
  function isValidPhoneNumber(phoneNumber) {
    if (typeof phoneNumber !== 'string') return false;

    // Xóa tất cả ký tự không phải số
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Regex kiểm tra: bắt đầu bằng 0, đủ 10 chữ số
    const regex = /^0\d{9}$/;

    return regex.test(cleaned);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }
  // FORMAT PHONE NUMBER
  function formatPhoneNumber(raw) {
    const digits = raw.replace(/\D/g, '');
    if (digits.length !== 10) return raw;

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  // SNAKE text error
  function shakeError($el) {
    $el.addClass('shake');
    setTimeout(() => {
      $el.removeClass('shake');
    }, 400);
  }
  // FORMAT FIRSTNAME USER
  function formatAutoFirstName(owner, id) {
    return owner.firstName + ' ' + 'G' + id;
  }


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
              }).join('')}
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
      <div class="list-option-booking">
        ${content.map(item => {
          if (item.type === optionBooked) return '';
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
  // function render option copy
    function renderCopyServiceOption(containerSelector, optionCopyService) {
      const {
        dataUser,
        bgColor = '',
        border = '#E28B01',
        color = '#E28B01',
        icon = `<i class="fa-solid fa-chevron-up rotate-transition"></i>`
      } = optionCopyService;

      const userSelecting = dataUser.find(x=> x.isSelecting === true);

      const availableUsers = dataUser.filter((item) => !item.isSelecting && !item.isChoosing && item.firstName)

      const html = `
        <button class="btn-option-copy-user"
          style="
            --color-user-copy: ${color};
            --bg-user-copy: ${bgColor};
            --border-user-copy: ${border};
          "
        >
          <span class="text-selected-option">
            ${userSelecting ? userSelecting.firstName : 'Choose guest copy service'}
          </span>
          ${icon}
        </button>
        <div class="list-option-copy">
          ${availableUsers.length === 0 ?
            `<div class="option-item-none">
              None Option
            </div>`
            :
            dataUser.map(item => {
            if (item.isSelecting === true || item.isChoosing || !item.firstName || item.services.length === 0 ) return '';
            return `
              <button class="option-item-copy" data-id="${item.id}"
                style="
                  --color-user-copy: ${color};
                  --bg-user-copy: ${bgColor};
                  --border-user-copy: ${border};
                "
              >
                ${item.firstName}
              </button>
            `;
          }).join('')}
        </div>
      `;

      $(containerSelector).html(html);
    }
    //render button copy
    function renderCopyServiceBtn (containerSelector) {
      const isUserSelected = $('.btn-option-copy-user').hasClass('selected');
      const htmlBtn =`
          <button class="btn-copy-service ${!isUserSelected ? 'disabled' : ''}"
            ${!isUserSelected ? 'disabled' :''}
          >
            Copy Service
          </button>
        `
      $(containerSelector).html(htmlBtn);
    }

    // render info user: firstname, lastname, email or phone
    function renderInfoUser(containerSelector, dataUser, firstUser) {
      const {firstName, lastName, phoneNumber, email} = dataUser;
      let emailPhone = phoneNumber;
      if(!isValidPhoneNumber(phoneNumber)) {
        emailPhone = email;
        dataUser.phoneNumber = '';
      }else {
        dataUser.email = '';
      }

      const isFirst = firstUser.id === dataUser.id;
      // Chỉ yêu cầu nhập đầy đủ cho user đầu tiên
      const htmlInputInfoUser = `
          <div class="item-info-input">
            <label>First name</label>
            <input
              placeholder="Required (*)"
              value="${firstName || ''}"
              id="firstname-banner"
            />
            <p class="error-message"></p>
          </div>
          <div class="item-info-input">
            <label>Last name</label>
            <input
              placeholder="${isFirst ? 'Required (*)' : 'Optional (*)'}"
              value="${lastName || ''}"
              id="lastname-banner"
            />
            <p class="error-message"></p>
          </div>
          <div class="item-info-input">
            <label>Email or phone</label>
            <input
              placeholder="${isFirst ? 'Required (*)' : 'Optional (*)'}"
              value="${emailPhone || ''}"
              id="emailPhone-banner"
            />
            <p class="error-message"></p>
          </div>
      `
      $(containerSelector).html(htmlInputInfoUser)
    }
  // render control user booking
  function renderCountControls(containerSelector, dataBooking) {
    if(dataBooking.type === typeBookingEnum.ME) return;
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
  function renderGuestInputs(containerSelector, dataBooking) {
    const $c = $(containerSelector);
    const $containerGuestInput = $(`<div class="container-guest-input"></div>`)
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
              class="input-fullname ${item.isChoosing ? 'active' : ''}"
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
      const hasSelectedServices = dataBooking.users.some(user => user.services.length > 0);
      if(hasSelectedServices) {
        // kiểm tra có user được chọn để copy

        const $copyService =
          $(`
            <div class="copy-service-wrapper">
              <div class="copy-options-wrapper">
              </div>
              <div class="copy-btn-wrapper">
              </div>
            </div>
          `)
        const optionCopyService = {
          dataUser: dataBooking.users,
          bgColor: '',
          border: '#E28B01',
          color: '#E28B01',
          icon: `<i class="fa-solid fa-chevron-up rotate-transition"></i>`
        };

        $c.append($copyService);
        renderCopyServiceBtn('.copy-btn-wrapper');
        renderCopyServiceOption('.copy-options-wrapper',optionCopyService )
    }
    $c.append('<div class="container-info-user"></div>')
    // Điền thông tin khách hàng, tự fill nếu đã có thông tin: firstname, lastname và emai or phone
    const userChoosing=  dataBooking.users.find(u => u.isChoosing === true);
    const firstUser = dataBooking.users[0];
    if(userChoosing) {
      renderInfoUser('.container-info-user', userChoosing, firstUser)
    }
  }


  // banner page
  function renderBannerPage(dataBannerPage) {
    const { greeting, brand, title, desc, bookFor,optionBooked, btnOptionBook, image } = dataBannerPage;
    const imgBannerLeft1 = '/assets/images/banner-template/image-banner-left-1.png';
    const imgBannerLeft2 = '/assets/images/banner-template/cloud-left.png';

    return `
      <div class="banner">
        <div class="content-banner">
          <div class="wrap-content-left-banner"
            style="
              --color-cur-primary: ${colorPrimary};
            "
          >
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
            <div id="targetBlock" class="book-appoint">
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
        const idMoreItem = item.id;
        const $moreItem = $(
          `<div class="more-item" data-id=${idMoreItem} style="z-index: ${100 + item.listItem.length - i}"></div>`
        );

        const $expandTitle = renderExpandTitle(item);
        $moreItem.append($expandTitle);

        //render card
        const $listCards = item.listItem.map(cardItem => renderServiceCard(idMoreItem, cardItem, dataBooking, currentUserId));

        const $wrapper = $(`<div class="wrap-list-more"></div>`).append($listCards);
        const $ListAddOn = item.listItem.map(cardItem =>renderListAddOn(item, cardItem.id, dataBooking));
        $wrapper.append($ListAddOn);
        $moreItem.append($wrapper);

        $container.append($moreItem);
      });
    }
    // title card service
    function renderExpandTitle(item) {
      const $title = $('<div class="expand-title"></div>');

      $title.append(item.iconLeft);
      $title.append(`<p class="text-uppercase bold-medium-14 mb-0">${item.value}</p>`);
      $title.append(item.iconRight);

      return $title;
    }
    // item card service
    function renderServiceCard(idMoreItem, cardItem, dataBooking, currentUserId) {
      const $cardMore = $(`
          <div class="card-more" data-id="${cardItem.id}">
          </div>
        `);

      const $top = $(`
        <div class="top-card">
          <div class="left-card">
            <p class="bold-medium-14">${cardItem.title}</p>
            <p class="thin-mid-14">${cardItem.subTitle}</p>
          </div>
          <div class="right-card">
            <p class="bold-medium-20">${cardItem.priceRental}</p>
            <p class="bold-mid-12">${cardItem.timetext}</p>
          </div>
        </div>
      `);
      const user = dataBooking.users.find(u => u.id === currentUserId);

      const serviceCardMoreCurr = user.services.find((se) => se.idService === idMoreItem);
      const serviceCardItemCurr = serviceCardMoreCurr && serviceCardMoreCurr.itemService.find((si) => si.idItemService === cardItem.id);
      const staffUserSelected = serviceCardItemCurr && serviceCardItemCurr.selectedStaff;

      const $listUserStaff = $(`
        <div class="option-select-staff">
          ${renderSelectedStaff(staffUserSelected ? staffUserSelected : {})}
        </div>
      `);

      const $actions = renderActionButtons(idMoreItem, cardItem.id, dataBooking, currentUserId);

      $cardMore.append($top, $actions, $listUserStaff);
      return $cardMore;
    }
    // Render danh sách staff để chọn
    function renderUserOptions(staff) {
      return `
        <div class="wrap-staff">
          ${staff
            .map(
              (user) => `
            <div class="item-staff" data-id="${user.id}">
              <div class="avatar-staff">
                <img src="${user.avatar}" alt="image ${user.name}" class="img-staff" />
              </div>
              <span class="full-name">${user.name}</span>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }
    // hiển thị staff đã được chọn
    function renderSelectedStaff(selectedStaff) {
      if (!selectedStaff || Object.keys(selectedStaff).length === 0) return '';

      const { name = 'Name user', image = '' } = selectedStaff;

      return `
        <div class="item-staff">
          <div class="avatar-staff">
            <img src="${image}" alt="image staff" class="img-staff"/>
        <div class="item-staff">
          <div class="avatar-staff">
            <img src="${image}" alt="image staff" class="img-staff"/>
          </div>
          <span>${name}</span>
        </div>
      `;
    }
    // btn action
    function renderActionButtons(idMoreItem, idCardItem, dataBooking, currentUserId) {
      // Kiểm tra có staff đã được chọn trong item service này hay không
      const findUserCur = dataBooking.users.find((u) => u.id === currentUserId);
      const findService = findUserCur.services.find((s) => s.idService == idMoreItem);
      const findItemService = findService && findService.itemService.find((is) => is.idItemService == idCardItem);
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
            <span id="full-name-selected">${findItemService && findItemService.selectedStaff.name || 'Next Available'}</span>
            <i class="fa-solid fa-chevron-down"></i>
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
      if(findItemService) {
        $wrap.append($wrapSelect, $del);
      }else{
        $wrap.append($add);
      }
      return $wrap;
    }
    // render list add on
    function renderListAddOn (dataItem, idItemChild,dataBooking, isFull=false) {

      const titleAddOnSelected = dataItem.value;
      const findItemChild = dataItem.listItem.find((i) => i.id === idItemChild);
      const listOptionAddOn = findItemChild.listOptionAddOn;
      if(!findItemChild || listOptionAddOn.length ===0 ) return '';

      const limitList = isFull ? listOptionAddOn : listOptionAddOn.slice(0, 4);
      // Trong card item kiểm tra option được chọn
      const curUser = dataBooking.users.find((u) => u.isChoosing);
      const findService = curUser && curUser.services.find((s) => s.idService == dataItem.id);
      const findItemService = findService && findService.itemService.find((si) => si.idItemService == idItemChild);

      return `
        <div class="wrap-addOn" data-id=${dataItem.id}>
          <div class="container-addOn">
            <div class="expand-addOn">
              <i class="fa-solid fa-chevron-up"></i>
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
              ${limitList.map((item) => {
                const isOptionSelected = findItemService?.optionals?.some(opt => opt.id === item.id);
                return `
                  <div class="item-addOn" data-id=${item.id}>
                    <div class="right-item-addOn">
                      <h2 class="text-right-item-addOn">
                        ${item.title}
                      </h2>
                    </div>
                    <div class="left-item-addOn">
                      <div class="price-timedura">
                        <h2 class="text-price-item-addOn">${item.price}</h2>
                        <p class="timedura">${item.timedura}</p>
                      </div>
                      <div class="checkbox-addOn ${isOptionSelected ? 'selected' :''}">
                        <div class="circle-addOn"></div>
                      </div>
                    </div>
                  </div>
                `
              }).join('')}
            </div>
          </div>
        </div>
      `
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

  // render sumary
  function renderSumary (dataSumary) {
    const $containerSumary = $('.wrap-sumary');
    $containerSumary.empty();
    const htmlSumary =  `
      <div class="container-sumary">
        <div class="header-sumary">
          <h2 class="title-header-sumary text-uppercase">Booking sumary</h2>
          <p class="sub-time-sumary">14:00, Thu, May 14 2025</p>
        </div>
        <div class="wrap-list-sumary">
          <div class="item-sumary">
            <div class="top-item-sumary">
              <div class="left-top-item-sumary">
                <button class="edit-sumary">
                  <i class="fa-solid fa-pen-to-square"></i>
                  Edit
                </button>
                <button class="delete-sumary">
                  <i class="fa-solid fa-trash"></i>
                  Delete
                </button>
              </div>
              <div class="right-top-item-sumary">
                <button class="btn-upload-image">Upload Image</button>
              </div>
            </div>
            <div class="body-item-sumary">
              <div class="wrap-item-content">
                <div class="item-content">
                  <div class="p-wrap">
                    <p class="text-name-service">Classic Mani</p>
                    <p class="text-name-tech">Next Available</p>
                    <p class="text-time-dura">20 mins</p>
                    <p class="text-price-serice">$ 10.00</p>
                  </div>
                </div>
              </div>
              <div class="wrap-item-content">
                <div class="item-content">
                  <div class="p-wrap">
                    <p class="text-name-service">Classic Mani</p>
                    <p class="text-name-tech">Next Available</p>
                    <p class="text-time-dura">20 mins</p>
                    <p class="text-price-serice">$ 10.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="total-pay">
              <p class="text-total-amount">Total (2)</p>
              <p class="text-total-times">60 mins</p>
              <p class="text-total-price">$ 35</p>
            </div>
          </div>
          <div class="item-sumary">
            <div class="top-item-sumary">
              <div class="left-top-item-sumary">
                <button class="edit-sumary">
                  <i class="fa-solid fa-pen-to-square"></i>
                  Edit
                </button>
                <button class="delete-sumary">
                  <i class="fa-solid fa-trash"></i>
                  Delete
                </button>
              </div>
              <div class="right-top-item-sumary">
                <button class="btn-upload-image">Upload Image</button>
              </div>
            </div>
            <div class="body-item-sumary">
              <div class="wrap-item-content">
                <div class="item-content">
                  <div class="p-wrap">
                    <p class="text-name-service">Classic Mani</p>
                    <p class="text-name-tech">Next Available</p>
                    <p class="text-time-dura">20 mins</p>
                    <p class="text-price-serice">$ 10.00</p>
                  </div>
                </div>
              </div>
              <div class="wrap-item-content">
                <div class="item-content">
                  <div class="p-wrap">
                    <p class="text-name-service">Classic Mani</p>
                    <p class="text-name-tech">Next Available</p>
                    <p class="text-time-dura">20 mins</p>
                    <p class="text-price-serice">$ 10.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="total-pay">
              <p class="text-total-amount">Total (2)</p>
              <p class="text-total-times">60 mins</p>
              <p class="text-total-price">$ 35</p>
            </div>
          </div>
        </div>
        <div class="confirm-booking">
          <button class="btn-confirm-booking">
            Confirm
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `
    $containerSumary.append(htmlSumary);
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
        <div class="wrap-calendar-time">
          <div class="top-cal-time">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16625 11.4688H13.4263V2.46875H1.90625V21.9688H13.4263V12.9688H7.16625V11.4688Z" fill="#E27303" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8448 11.4691C19.8328 11.4681 18.0008 9.63605 18.0008 7.62305V6.87305H16.5008V7.62305C16.5008 9.10005 17.1758 10.4801 18.2198 11.4691L13.4219 11.469V12.969L18.2198 12.9691C17.1758 13.9581 16.5008 15.3371 16.5008 16.8141V17.5641H18.0008V16.8141C18.0008 14.8021 19.8338 12.9691 21.8458 12.9691H22.5958V11.4691H21.8448Z" fill="#E27303" />
            </svg>
            <h2 class="title-copy-time text-uppercase mb-0">SELECT DATE AND TIME</h2>
            <div class="copy-time">
              <input
                id="select-banner-pm"
                type='checkbox'
                class='toggle-switch'
              />
             <span class="text-same-time">Start on same time</span>
            </div>
          </div>
          <div class="container-cal-time">
            <div class="calendar">
              <div class="calendar-header">
                <button id="prev">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path d="M12.5547 22.752C18.0775 22.752 22.5547 18.2748 22.5547 12.752C22.5547 7.22911 18.0775 2.75195 12.5547 2.75195C7.03184 2.75195 2.55469 7.22911 2.55469 12.752C2.55469 18.2748 7.03184 22.752 12.5547 22.752Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.0547 12.752H10.0547" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.0547 9.75195L9.05469 12.752L12.0547 15.752" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div id="monthYear"></div>
                <button id="next">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path d="M12.5547 22.752C18.0775 22.752 22.5547 18.2748 22.5547 12.752C22.5547 7.22911 18.0775 2.75195 12.5547 2.75195C7.03184 2.75195 2.55469 7.22911 2.55469 12.752C2.55469 18.2748 7.03184 22.752 12.5547 22.752Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9.05469 12.752H15.0547" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.0547 15.752L16.0547 12.752L13.0547 9.75195" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div class="calendar-grid" id="days">
              </div>
            </div>
            <div class="timeslot">
              <h2 id="selectedDateTitle">August 14, 2025</h2>
              <div id="timeSlotsContainer" class="time-slots"></div>
              <div class="text-scroll-more">
                <h2>Scroll to see more time slots</h2>
              </div>
            </div>
          </div>
        </div>
      </div>`,
      `<div id="triggerBlock" class="wrap-sumary"></div>`
    );
    const { dataBooking, dataMe, dataGuest, dataFamily } = dataBlock;
    if (banner.optionBooked === 'GUESTS') {
      // Thay bằng data guest
      dataBooking.type = typeBookingEnum.GUESTS;
      dataBooking.users = dataGuest;

      // Default user đầu tiên isChoosing
      dataBooking.users[0].isChoosing = true;

      renderCountControls('.wrap-control', dataBooking);
      renderGuestInputs('.wrap-input-guests', dataBooking);
      $('.wrap-input-guests').removeClass('hidden');
    } else if (banner.optionBooked === 'FAMILY') {
      // Thay bằng data family
      dataBooking.type = typeBookingEnum.FAMILY;
      dataBooking.users = dataFamily;

      // Default user đầu tiên isChoosing
      dataBooking.users[0].isChoosing = true;

      renderCountControls('.wrap-control', dataBooking);
      renderGuestInputs('.wrap-input-guests', dataBooking);
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
    const { dataBooking, listDataService, listUserStaff, dataCart,dataMe, dataGuest, dataFamily } = templateStore.load();
    let {banner} = dataRelease;
    // Khai báo currentUserId trước khi gọi renderBlockTemplate
    let currentUserId = dataBooking.users[0]?.id || 1;

    renderBlockTemplate({listDataService, listUserStaff, dataBooking,dataMe,  dataGuest, dataFamily, currentUserId});

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
        // Toggle chọn loại dịch vụ
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
          $('.list-option-copy').removeClass('active');
        });
        //
        function updateGuestSection() {
          // Default user đầu tiên isSelecting
          // dataBooking.users[0].isSelecting = true;

          renderCountControls('.wrap-control', dataBooking);
          renderGuestInputs('.wrap-input-guests', dataBooking);
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
          if (selectedType === 'GUESTS'){
            dataBooking.type = typeBookingEnum.GUESTS;
            dataBooking.users = dataGuest;
            dataBooking.users[0].isChoosing = true;
          }
          else if (selectedType === 'FAMILY') {
            dataBooking.type = typeBookingEnum.FAMILY;
            dataBooking.users = dataFamily;
            dataBooking.users[0].isChoosing = true;
          }
          else {
            dataBooking.type = typeBookingEnum.ME;
            dataBooking.users = dataMe;
          };

          // show or hide cả 2
          if (dataBooking.type !== typeBookingEnum.ME) {
            $('.wrap-input-guests').removeClass('hidden');
            updateGuestSection();
          } else {
            $('.wrap-input-guests').addClass('hidden');
            $('.wrap-control').empty();
            $('.wrap-input-guests').empty();
          }

          // render lại list service
          renderListService(listDataService, '.list-more', dataBooking, currentUserId);

        });
        // Tăng số lượng khách
        $(document).on('click', '.btn-increase', function() {
          const maxId = dataBooking.users.reduce((max,i) => Math.max(max,i.id), 0);
          const newId = maxId + 1;
          dataBooking.users.push({
            id: newId,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            gender: genderEnum.OTHER,
            services: [
            ],
            selectedDate: null,
            selectedTimeSlot: null,
            isSelecting: false,
            isChoosing: false,
            isSelecting: false,
            isChoosing: false,
          });
          updateGuestSection();
        });

        // Giảm số lượng
        $(document).on('click', '.btn-decrease', function() {
          if (dataBooking.users.length <= 1) {
          if (dataBooking.users.length <= 1) {
            alert('Bạn phải chọn tối thiểu 1 người.');
            return;
          }
          const idx = dataBooking.users.findIndex(i => i.firstName === '');
          if (idx === -1) {
            alert('Không thể xóa khi tất cả các ô đã điền tên.');
            return;
          }
          const idToRemove = dataBooking.users[idx].id;
          dataBooking.users.splice(idx, 1);
          dataBooking.users = dataBooking.users.filter(u => u.id !== idToRemove);
          updateGuestSection();
        });

        // Xóa từng input
        $(document).on('click', '.btn-remove', function() {
          const $inpWrap = $(this).closest('.guest-input');
          const id = +$inpWrap.data('id');

          if (dataBooking.users.length <= 1) {
            alert('Bạn phải giữ tối thiểu 1 người.');
            return;
          }
          const obj = dataBooking.users.find(i => i.id === id);
          if (!obj.firstName) {
            dataBooking.users = dataBooking.users.filter(i => i.id !== id);
            updateGuestSection();
          } else {
            alert('Không thể xóa khi ô đã nhập tên.');
          }
        });
        // Cập nhật data khi onChange input
          // firstname
          $(document).on('input', '#firstname-banner', function() {
            const $this = $(this);
            const $parent = $this.closest('.wrap-input-guests');
            const userCur = dataBooking.users.find((u) => u.isChoosing);
            const isFirst = dataBooking.users[0].id === userCur.id;
            const $findInputFullname = $parent.find(`.guest-input[data-id=${userCur.id}] input`);

            const $error = $this.next('.error-message');

            const val = $this.val();
            $findInputFullname.val(val);
            if(val === '') {
              $findInputFullname.val(`GUEST ${userCur.id}`);
            }
            // Valid text required
            if (isFirst && val === '') {
              $this.addClass('is-invalid');
              $error.text('First name is required.');
            } else {
              $this.removeClass('is-invalid');
              $error.text('');
            }
            // Update data user
            userCur.firstName = val;
          });
          //  lastName
          $(document).on('input', '#lastname-banner', function() {
            const $this = $(this);
            const userCur = dataBooking.users.find((u) => u.isChoosing);
            const isFirst = dataBooking.users[0].id === userCur.id;

            const $error = $this.next('.error-message');

            const val = $this.val();
            // Valid text required
            if (isFirst && val === '') {
              $this.addClass('is-invalid');
              $error.text('Last name is required.');
            } else {
              $this.removeClass('is-invalid');
              $error.text('');
            }

            // Update data user
            userCur.lastName = val;
          });
          //  phone or email
          $(document).on('input', '#emailPhone-banner', function () {
            const $this = $(this);
            const userCur = dataBooking.users.find((u) => u.isChoosing);
            const isFirst = dataBooking.users[0].id === userCur.id;

            let val = $this.val().trim();
            const $error = $this.next('.error-message');

            const digits = val.replace(/\D/g, '');

            let isPhone = false;
            let isEmail = false;

            // Check nếu là phone đủ 10 số
            if (digits.length === 10 && /^\d+$/.test(digits)) {
              val = formatPhoneNumber(digits); // Format lại hiển thị
              $this.val(val); // Gán lại giá trị vào input
              isPhone = true;
            } else {
               // Nếu đang ở dạng đã format mà không còn đủ 10 số → gỡ format
              if (val.includes('(') || val.includes(')') || val.includes('-')) {
                if (digits.length !== 10) {
                  val = digits;
                  $this.val(val);
                }
              }

              isPhone = isValidPhoneNumber(val);
              isEmail = isValidEmail(val);
            }

            // Cập nhật lỗi
            if (isFirst && val === '') {
              $this.addClass('is-invalid');
              $error.text('Email or phone is required.');
            } else if (val !== '' && !isPhone && !isEmail) {
              $this.addClass('is-invalid');
              $error.text('Email or phone is incorrect format.');
            } else {
              $this.removeClass('is-invalid');
              $error.text('');
            }

            // Update data user
            userCur.email = isEmail ? val : '';
            userCur.phoneNumber = isPhone ? digits : '';
          });

        // Xử lý blur valid
          // BLUR firstName
          function validateFirstNameInput($input) {
            const $parent = $input.closest('.wrap-input-guests');
            const userCur = dataBooking.users.find((u) => u.isChoosing);
            const $findInputFullname = $parent.find(`.guest-input[data-id=${userCur.id}] input`);
            const $error = $input.next('.error-message');
            const val = $input.val().trim();

            $findInputFullname.val(val || `GUEST ${userCur.id}`);
            userCur.firstName = val;

            if (val === '') {
              $input.addClass('is-invalid');
              $error.text('First name is required.');
            } else {
              $input.removeClass('is-invalid');
              $error.text('');
            }
          }
          // BLUR lastname
          function validateLastNameInput($input) {
            const userCur = dataBooking.users.find((u) => u.isChoosing);
            const isFirst = dataBooking.users[0].id === userCur.id;
            const $error = $input.next('.error-message');
            const val = $input.val().trim();

            userCur.lastName = val;

            if (isFirst && val === '') {
              $input.addClass('is-invalid');
              $error.text('Last name is required.');
            } else {
              $input.removeClass('is-invalid');
              $error.text('');
            }
          }
          // BLUR phone&email
          function validateEmailPhoneInput($input) {
            const userCur = dataBooking.users.find((u) => u.isChoosing);
            const isFirst = dataBooking.users[0].id === userCur.id;
            const val = $input.val().trim();
            const $error = $input.next('.error-message');

            const isPhone = isValidPhoneNumber(val);
            const isEmail = isValidEmail(val);

            userCur.email = isEmail ? val : '';
            userCur.phoneNumber = isPhone ? val : '';

            if (isFirst && val === '') {
              $input.addClass('is-invalid');
              $error.text('Email or phone is required.');
            } else if (val !== '' && !isPhone && !isEmail) {
              $input.addClass('is-invalid');
              $error.text('Email or phone is incorrect format.');
            } else {
              $input.removeClass('is-invalid');
              $error.text('');
            }
          }

        // input firstName và blur
        $(document).on('input blur', '#firstname-banner', function () {
          validateFirstNameInput($(this));
        });
        $(document).on('input blur', '#lastname-banner', function () {
          validateLastNameInput($(this));
        });

        $(document).on('input blur', '#emailPhone-banner', function () {
          validateEmailPhoneInput($(this));
        });

        // Cập nhật data khi onChange input

        //focus onput ( xử lý active như tab)
       $(document).on('focus', '.input-fullname', function () {
          const $this = $(this);
          const idFocus = $this.data('id');
          const $container = $this.closest('.wrap-input-guests');
          const idNext = + $container.find('.guest-input').data('id');

          const currentUser = dataBooking.users.find(u => u.isChoosing);
          const firstUser = dataBooking.users[0];

          // Lấy giá trị đang nhập của tab hiện tại
          const $wrapCur = $(`.container-info-user`);
          const valFirstName = $wrapCur.find('#firstname-banner').val().trim();
          const valLastName = $wrapCur.find('#lastname-banner').val().trim();
          const valEmailPhone = $wrapCur.find('#emailPhone-banner').val().trim();

          const isPhone = isValidPhoneNumber(valEmailPhone);
          const isEmail = isValidEmail(valEmailPhone);

          // Kiểm tra nếu là user đầu tiên → bắt buộc phải nhập
          let hasError = false;
          if (currentUser.id === firstUser.id) {

            if (valFirstName === '') {
              $wrapCur.find('#firstname-banner').addClass('is-invalid');
              const $errorFirst = $wrapCur.find('#firstname-banner').next('.error-message');
              $errorFirst.text('First name is required.');
              shakeError($errorFirst);
              hasError = true;
            }

            if (valLastName === '') {
              $wrapCur.find('#lastname-banner').addClass('is-invalid');
              const $errorFirst = $wrapCur.find('#lastname-banner').next('.error-message');
              $errorFirst.text('Last name is required.');
              shakeError($errorFirst);
              hasError = true;
            }

            if (valEmailPhone === '') {
              $wrapCur.find('#emailPhone-banner').addClass('is-invalid');
              const $errorFirst = $wrapCur.find('#emailPhone-banner').next('.error-message');
              $errorFirst.text('Email or phone is required.');
              shakeError($errorFirst);
              hasError = true;
            } else if (!isPhone && !isEmail) {
              $wrapCur.find('#emailPhone-banner').addClass('is-invalid');
              const $errorFirst = $wrapCur.find('#emailPhone-banner').next('.error-message');
              $errorFirst.text('Email or phone is incorrect format.');
              shakeError($errorFirst);
              hasError = true;
            }
          } else {
            if (valFirstName === '') {
              $wrapCur.find('#firstname-banner').addClass('is-invalid');
              const $errorFirst = $wrapCur.find('#firstname-banner').next('.error-message');
              $errorFirst.text('First name is required.');
              shakeError($errorFirst);
              hasError = true;
            }

            if (valEmailPhone !== '' && !isPhone && !isEmail) {
              $wrapCur.find('#emailPhone-banner').addClass('is-invalid');
              const $errorFirst = $wrapCur.find('#emailPhone-banner').next('.error-message');
              $errorFirst.text('Email or phone is incorrect format.');
              shakeError($errorFirst);
              hasError = true;
            }
          }
          if (hasError) {
            $this.blur(); // Gỡ focus
            return;
          }


          // Đủ điều kiện mới chuyển tab
          $('.input-fullname').removeClass('active');
          $this.addClass('active');

          dataBooking.users.forEach((user) => {
            user.isChoosing = (user.id === idFocus);
          });

          currentUserId = idFocus;
          const nextUser = dataBooking.users.find((u) => u.id === currentUserId);
          // Nếu next tab được thì kiểm tra firstName của user khác user owner thì format firstName user owner + G + id
          if(! nextUser.firstName) {
            let nextNameUser = formatAutoFirstName(dataBooking.users[0], currentUserId);
            nextUser.firstName = nextNameUser;
          }

          const userChoosing = dataBooking.users.find(u => u.isChoosing);
          if (userChoosing) {
            renderInfoUser('.container-info-user', userChoosing, firstUser);
          }

          // render lại option copy
          const optionCopyService = {
            dataUser: dataBooking.users,
            bgColor: '',
            border: '#E28B01',
            color: '#E28B01',
            icon: `<i class="fa-solid fa-chevron-up rotate-transition"></i>`
          };
          renderCopyServiceOption('.copy-options-wrapper',optionCopyService )
          renderListService(listDataService, '.list-more', dataBooking, currentUserId);
        });

    // Xử lý chọn user để copy
      // Toggle khi bấm vào button chính
      $(document).on('click', '.btn-option-copy-user', function (e) {
        e.stopPropagation(); // tránh bị close ngay khi click

        const $dropdown = $(this).next('.list-option-copy');
        $('.btn-option-copy-user i').not($(this).find('i')).removeClass('rotate-180');

        $('.list-option-copy').not($dropdown).removeClass('active'); // close các dropdown khác
        $dropdown.toggleClass('active');
        $(this).find('i').toggleClass('rotate-180');
      });
      // Chọn user để copy
      $(document).on('click', '.option-item-copy', function(e) {
        e.stopPropagation();
        const $this = $(this);
        const idUserSelected = $this.data('id');

        // Cập nhật user được chọn copy trong dataUser
        const userSelected = dataBooking.users.find((u) => u.id === idUserSelected);
        userSelected.isSelecting = true;
        // Thêm selected vào btn-option-copy-user
        $('.btn-option-copy-user').addClass('selected');
        // render lại
        const optionCopyService = {dataUser: dataBooking.users}
        renderCopyServiceBtn('.copy-btn-wrapper')
        renderCopyServiceOption('.copy-options-wrapper',optionCopyService);
      })
      // Copy service
      $(document).on('click', '.btn-copy-service', function () {
        const userChoosing = dataBooking.users.find((u) => u.isChoosing);
        const userSelectedCopy = dataBooking.users.find((u) => u.isSelecting);
        if(userChoosing !== userSelectedCopy) {
          userChoosing.services = JSON.parse(JSON.stringify(userSelectedCopy.services));
        }
        // upadate lại list service
        renderListService(listDataService, '.list-more', dataBooking, currentUserId);
      })
    // Xử lý select services
    $(document).on('click', '.expand-title', function () {
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
      const $this = $(this);
      const $card = $this.closest('.card-more');

      // Thêm staff id defult vào user
      const staffSelecting = listUserStaff.find((st) => st.id == 'default');
      const idService = $this.closest('.more-item').data('id');
      const idItemService = $card.data('id');
      const userSelecting = dataBooking.users.find((u) => u.isChoosing === true);

      // nếu khong tìm thấy idService trong userSelecting thì thêm mới
      let serviceExit = userSelecting.services.find((item) => item.idService === idService);
      let serviceItemExit = serviceExit && serviceExit.itemService.find(item => item.idItemService ===idItemService);

      if (serviceExit) {
        if (serviceItemExit) {
          serviceItemExit.selectedStaff = staffSelecting;
        } else {
          serviceItemExit = {
            idItemService,
            selectedStaff: staffSelecting
          };
          serviceExit.itemService.push(serviceItemExit);
        }
      } else {
        serviceExit = {
          idService,
          itemService: [
            {
              idItemService,
              selectedStaff: staffSelecting
            }
          ]
        };
        userSelecting.services.push(serviceExit);
      }
      const $action = renderActionButtons(idService, idItemService, dataBooking, currentUserId);
      $card.find('.add-more').replaceWith($action);

      updateGuestSection(); // Cập nhật để hiển thị nút Copy Service
    });
    // remove option select user
    $(document).on('click', '.add-more .btn-delete', function () {
      const $this = $(this);

      const $parentBtn = $(this).closest('.add-more');
      const $card = $parentBtn.closest('.card-more');
      const title = $card.find('.bold-medium-14').text();

      const user = dataBooking.users.find(u => u.id === currentUserId);
      if (user) {
        user.services = user.services.filter(s => s.title !== title);
      }

      // remove staff of user in databooking
      const idService = $this.closest('.more-item').data('id');
      const idItemService = $this.closest('.card-more').data('id');
      const userSelecting = dataBooking.users.find((u) => u.isChoosing === true);

      const serviceDelete = userSelecting.services.find((s) =>s.idService == idService);

      if (serviceDelete && serviceDelete.itemService) {
        serviceDelete.itemService = serviceDelete.itemService.filter(is => is.idItemService != idItemService);
      }

      const $action = renderActionButtons(idService, idItemService, dataBooking, currentUserId);
      $card.find('.add-more').replaceWith($action);
    });
    // select option user
    $(document).on('click', '.wrap-select-user .toggle-select', function (e) {
      e.stopPropagation();

      const $toggle = $(this);
      const $parentN = $toggle.closest('.wrap-select-user');

      const $wrap = $toggle.closest('.card-more');
      const $optionList = $wrap.find('.option-select-staff');

      const $iconChecked = $parentN.find('.icon-checked');

      // Nếu chưa render
      if ($optionList.children().length === 0) {
        const html = renderUserOptions(listUserStaff);
        $optionList.html(html);
      }

      // Xóa dropdown cũ
      $('.option-select-staff').not($optionList).removeClass('show');

      // Lấy kích thước của toggle-select
      const toggleWidth = $toggle.outerWidth();
      // Lấy vị trí cho option-select-staff
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

    // touch out close option staff
    $(document).on('click', function () {
      const $optionList = $(this).find('.option-select-staff');
      $optionList.empty();
      $('.option-select-staff').removeClass('show');
    });

    // gắn staff selected cho user
    $(document).on('click', '.item-staff', function (e) {
    // gắn staff selected cho user
    $(document).on('click', '.item-staff', function (e) {
      e.stopPropagation();
      const $this = $(this);
      const idStaff = $this.data('id');
      const staffSelecting = listUserStaff.find((st) => st.id == idStaff);

      const idService = $this.closest('.more-item').data('id');
      const idItemService = $this.closest('.card-more').data('id');

      const userSelecting = dataBooking.users.find((u) => u.isChoosing === true);


      // nếu khong tìm thấy idService trong userSelecting thì thêm mới
      let serviceExit = userSelecting.services.find((item) => item.idService === idService);
      let serviceItemExit = serviceExit && serviceExit.itemService.find(item => item.idItemService ===idItemService);

      if (serviceExit) {
        if (serviceItemExit) {
          serviceItemExit.selectedStaff = staffSelecting;
        } else {
          serviceItemExit = {
            idItemService,
            selectedStaff: staffSelecting
          };
          serviceExit.itemService.push(serviceItemExit);
        }
      } else {
        serviceExit = {
          idService,
          itemService: [
            {
              idItemService,
              selectedStaff: staffSelecting
            }
          ]
        };
        userSelecting.services.push(serviceExit);
      }

      const name = $(this).find(".full-name").text();
      const $wrap = $(this).closest('.card-more');

      $wrap.find('#full-name-selected').text(name);
      $wrap.find('.option-select-staff').removeClass('show');

      updateGuestSection(); // Cập nhật để hiển thị nút Copy Service
    });
    // toggle addOn service
    $(document).on('click', '.expand-addOn', function() {
      const $wrapAddOn = $(this).closest('.wrap-addOn');
      const dataId = parseInt($wrapAddOn.attr('data-id'));
      const $wrapListAddOn = $wrapAddOn.find('.wrap-list-addOn');
      const childId = parseInt($wrapListAddOn.attr('data-id'));

      const isExpanded = $(this).hasClass('expanded');

      const dataItem = listDataService.find(({item}) => item.id === dataId);
      if(!dataItem) return;

      const newListAddOn = renderListAddOn(dataItem.item, childId,dataBooking, !isExpanded);

      $wrapAddOn.replaceWith(newListAddOn);

      if(!isExpanded) {
        $(`[data-id=${dataId}].wrap-addOn .expand-addOn`).addClass('expanded')
      }
    })

    // selected add-on option
    $(document).on('click', '.checkbox-addOn', function () {
      const $this = $(this);
      const $wrapAddOn = $this.closest('.wrap-addOn');
      const $itemAddOn = $this.closest('.item-addOn');

      const idService = $this.closest('.more-item').data('id');
      const idItemService = $wrapAddOn.data('id'); // id card-more
      const idItemAddOn = $itemAddOn.data('id');

      const serviceCur = listDataService.find(({ item }) => item.id == idService)?.item;
      const itemService = serviceCur?.listItem.find((item) => item.id == idItemService);
      const itemAddOn = itemService?.listOptionAddOn.find((item) => item.id == idItemAddOn);

      const userCurr = dataBooking.users.find((u) => u.isChoosing === true);
      let serviceInUser = userCurr.services.find((item) => item.idService == idService);

      if (!serviceInUser) {
        serviceInUser = {
          idService,
          itemService: []
        };
        userCurr.services.push(serviceInUser);
      }

      let itemServiceInUser = serviceInUser.itemService.find((item) => item.idItemService == idItemService);

      if (!itemServiceInUser) {
        itemServiceInUser = {
          idItemService,
          selectedStaff: null,
          optionals: [] // dùng mảng
        };
        serviceInUser.itemService.push(itemServiceInUser);
      }

      // Đảm bảo optionals là mảng
      if (!Array.isArray(itemServiceInUser.optionals)) {
        itemServiceInUser.optionals = [];
      }

      // Kiểm tra itemAddOn có đang tồn tại trong optionals không
      const index = itemServiceInUser.optionals.findIndex((opt) => opt.id === itemAddOn.id);

      if (index > -1) {
        // Đã chọn rồi ⇒ bỏ chọn
        itemServiceInUser.optionals.splice(index, 1);
        $this.removeClass("selected");
      } else {
        // Chưa chọn ⇒ thêm vào
        itemServiceInUser.optionals.push(itemAddOn);
        $this.addClass("selected");
      }
    });


  // START: Xử lý option trên banner

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

    // confirm booking
    renderSumary({});


    // test btn scroll
    const $btn = $('#scrollToTopBtn');
    const $trigger = $('#triggerBlock');
    const $target = $('#targetBlock');

    // Hàm kiểm tra trigger có trong khung nhìn chưa
    function isInViewport($el) {
      const rect = $el[0].getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // Khi scroll: kiểm tra có nhìn thấy block trigger chưa
    $('.wrap-home-templates').on('scroll', function () {

      if (isInViewport($trigger)) {
        $btn.fadeIn();
      } else {
        $btn.fadeOut();
      }
    });

    // Khi click nút → scroll lên block target
    $btn.on('click', function () {
      const $container = $('.wrap-home-templates');
      const scrollTopValue = $target.position().top;

      $container.animate({
        scrollTop: scrollTopValue
      }, 500);
    });
  });
