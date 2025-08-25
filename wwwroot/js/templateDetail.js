import { fetchAPI } from "./site.js";
import {alertCustom} from "./site.js";

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
    // FAMILY: 'FAMILY',
  };
  const genderEnum = {
    OTHER: 'OTHER',
    MALE: 'MALE',
    FEMALE: 'FEMALE',
  };
  const typeInput = {
    PHONE: 'PHONE',
    EMAIL: 'EMAIL',
  }
  const typeRequire = {
    REQUIRED: 'REQUIRED',
    NOTREQUIRED: 'NOT-REQUIRED'
  }
  const idStaffDefault = 9999;

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
        cardNumber: [
        ]
      };
      // Danh sách người làm việc có quyền
      const getDataListDataService = async () => {
        try {
          const dataCategories = await fetchAPI.get('/api/category/getallcategories?RVCNo=336');
          const dataItemServices = await fetchAPI.get('/api/category/getallitem?RVCNo=336');

          const dataServices = [];

          dataCategories.forEach((itemCar) => {
            const objCar = {};
            const categoryID = itemCar.categoryID;

            objCar.item = {};

            objCar.item.id = categoryID;
            objCar.item.value = itemCar.categoryName;

            const listItem = [];
            dataItemServices.forEach((itemSer) => {
              if(itemSer.categoryID === categoryID && itemSer.isActive && itemSer.isShowOB) {
                const ser = {};

                ser.id = itemSer.itemID;
                ser.title = itemSer.itemName;
                ser.priceRental = itemSer.basePrice;
                ser.timetext = itemSer.duration;

                // list add on
                const itemAddOn = [];
                if(itemSer.listAddOn.length >0) {
                  itemSer.listAddOn.forEach((iAdd) => {
                    const objAddOn = {};

                    objAddOn.id = iAdd.addOnID;
                    objAddOn.title = iAdd.itemName;
                    objAddOn.price = iAdd.price;
                    objAddOn.timedura = iAdd.duration;

                    itemAddOn.push(objAddOn);
                  })
                }
                ser.listOptionAddOn = itemAddOn;
                listItem.push(ser);
              }
            })
            objCar.item.listItem = listItem;
            dataServices.push(objCar);
          })
          return dataServices;
        }catch(e){
          console.error("[getDataListDataService]", {
          message: e.message,
          stack: e.stack,
          name: e.name,
          response: e.response || null
        });
        }

      }
      const getlistUserStaff = async () => {
        try {
          const resTechFull = await fetchAPI.get('/api/tech/gettechinfoofsalon?rvcNo=336');
          const staffDefault = {
            employeeID: idStaffDefault,
            imageFileName: '/assets/images/listUser/userAvailable.png',
            nickName: 'Next Available',
          }
          const dataTech = resTechFull.data.filter((item) => item.allowBookingOnline);
          dataTech.unshift(staffDefault);
          return dataTech || [];
        }catch(e){
          console.error(
            "[getlistUserStaff]", {
              message: e.message,
              stack: e.stack,
              name: e.name,
            }
          )
        }
      }

      //

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
                    employeeID: idStaffDefault,
                    imageFileName: '/assets/images/listUser/userAvailable.png',
                    nickName: 'Next Available',
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
                    employeeID: idStaffDefault,
                    imageFileName: '/assets/images/listUser/userAvailable.png',
                    nickName: 'Next Available',
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
                    employeeID: idStaffDefault,
                    imageFileName: '/assets/images/listUser/userAvailable.png',
                    nickName: 'Next Available',
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
                    employeeID: idStaffDefault,
                    imageFileName: '/assets/images/listUser/userAvailable.png',
                    nickName: 'Next Available',
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
        getDataListDataService,
        getlistUserStaff,
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

    // Regex kiểm tra: đủ 10 chữ số
    const regex = /^\d{10}$/;

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
  // UNFORMAT PHONE NUMBER
  function unFormatPhoneNumber(formatted) {
    if (!formatted) return '';
    return formatted.replace(/\D/g, '');
  }
  // SNAKE text error
  function shakeError($el) {
    $el.addClass('shake');
    setTimeout(() => {
      $el.removeClass('shake');
    }, 400);
  }
  // SHOW error valid input, and snake text
  function showInputError($input, message, isSnake = false) {
    let $error = $input.siblings('.error-message');
    $error.text(message);

    isSnake && shakeError($error);
  }

  function formatDateMMDDYYYY(d) {
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day   = String(d.getDate()).padStart(2, "0");
    const year  = d.getFullYear();
    return `${month}/${day}/${year}`;
  }


  function clearInputError($input) {
    $input.siblings('.error-message').text('');
  }

  // FORMAT FIRSTNAME USER
  function formatAutoFirstName(owner, id) {
    return owner.firstName + ' ' + 'G' + id;
  }
  // function lấy ngày
  function normalizeToDate(d) {
    if (!d) return null;
    const dt = (d instanceof Date) ? d : new Date(d);
    return isNaN(dt.getTime()) ? null : dt;
  }

  function isNonWorkingDay(date, fakeDataCalender) {
    if (!date) return false;
    const m0 = date.getMonth();     // 0-index
    const m1 = m0 + 1;             // maybe your map uses 1-index
    const day = date.getDate();
    const arr0 = fakeDataCalender[m0] || [];
    const arr1 = fakeDataCalender[m1] || [];
    return arr0.includes(day) || arr1.includes(day);
  }

  function findNextWorkingDate(startDate, fakeDataCalender, maxDays = 365) {
    const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    let tries = 0;
    while (isNonWorkingDay(d, fakeDataCalender) && tries < maxDays) {
      d.setDate(d.getDate() + 1);
      tries++;
    }
    return d;
  }

  // function kiểm tra giá trị input, sử dụng sau khi đã valid
  function checkValInputs(listIdInput) {
    return listIdInput.every((item) => $(item).val().trim() !=='');
  }
  // function update show content nút scroll to target
  function updateScrollButton(options = {}) {
    const $mainScrollBtn = $('.scroll-btn-main');

    if (options.text) {
      $mainScrollBtn.find('.text-control-scroll').text(options.text);
    }
    if (options.icon) {
      $mainScrollBtn.find('.icon-control-scroll i').attr('class', options.icon);
    }
    if (options.target) {
      $mainScrollBtn.data('target', options.target);
    }
    if (options.trigger) {
      $mainScrollBtn.data('trigger', options.trigger);
    }
    if (options.triggerBanner) {
      $mainScrollBtn.attr('data-trigger-banner', options.triggerBanner);
    }

    // forceShowScrollBtn = !!options.force;
    $mainScrollBtn.fadeIn();
  }
  //function hiển thị button scroll
  function showScrollToTarget(dataBooking, directUp = false){
    // Ưu tiên check user choosing
    const currentUser = dataBooking.users.find((u) => u.isChoosing);
    // Nếu chưa chọn service
    if (!currentUser.services || currentUser.services.length === 0) {
      updateScrollButton({
        target: '#section-service',
        trigger: '#trigger-service',
        triggerBanner: '#triggerBlockSumary',
        text: 'Choose Service',
        icon: `fa fa-hand-pointer ${directUp ? 'up' : 'down'}`,
        force: false
      });
      return true;
    }

    // Nếu chưa chọn date hoặc time slot
    if (!currentUser.selectedDate || !currentUser.selectedTimeSlot) {
      updateScrollButton({
        target: '#section-date-time',
        trigger: '#trigger-date-time',
        triggerBanner: '#triggerBlockSumary',
        text: 'Select Date & Time',
        icon: 'fa fa-hand-pointer down',
        force: false
      });
      return true;
    }
    // kiểm tra các user đã chọn service, time
    // to-do
    return false;
  }
  // function kiểm tra dataBooking đã chọn đầy đủ service và timming all users, show scroll continue
  function showScrollToFinalBooking (dataBooking) {
    if(!dataBooking.users){
      return dataBooking.services.length > 0 && dataBooking.selectedDate && dataBooking.selectedTimeSlot;
    }
    return dataBooking.users.every((item) => {
      return item.services.length > 0 && item.selectedDate && item.selectedTimeSlot;
    })
  }

  // startConfirmAnimation(loopCount, options)
  function startConfirmAnimation(loopCount, options = {}) {
    const sel = options.selector || '.check-circle';
    const btnSel = options.buttonSelector || '.btn-request-another';
    const $circleWrap = $(sel).first();
    const $btn = $(btnSel).first();

    if (!$circleWrap.length) {
      console.warn('[startConfirmAnimation] wrapper not found:', sel);
      return null;
    }

    // store original markup for cloning
    const originalInner = $circleWrap.html();
    if (!originalInner || originalInner.trim() === '') {
      console.warn('[startConfirmAnimation] no inner HTML in wrapper to clone');
      return null;
    }

    // timings (ms) - can override via options
    const borderMs = options.borderMs ?? 1000; // draw outer stroke
    const fillMs   = options.fillMs   ?? 400;  // background expand
    const checkMs  = options.checkMs  ?? 1000; // check draw + pop
    const totalMs  = borderMs + fillMs + checkMs;

    // button label setup
    if ($btn.length) {
      const orig = $btn.data('orig-text') || $btn.text().replace(/\(\d+\)/, '').trim();
      $btn.data('orig-text', orig);
      $btn.text(orig);
    }

    const timeouts = [];

    function clearAllTimeouts() {
      while (timeouts.length) {
        const t = timeouts.shift();
        clearTimeout(t);
      }
    }

    // prepare inserted SVG elements (set dash arrays, inline stroke-width, vars)
    function prepareSvg($wrap) {
      const $path = $wrap.find('.check-path');
      const $stroke = $wrap.find('.stroke-circle');
      const $fill = $wrap.find('.fill-circle');

      if (!$path.length || !$stroke.length || !$fill.length) {
        console.warn('[startConfirmAnimation] missing SVG parts after insert');
        return null;
      }

      // compute path lengths
      let checkLen = 50;
      try { checkLen = Math.ceil($path.get(0).getTotalLength()); } catch (e) { /*fallback*/ }
      let r = 28;
      try { r = Number($stroke.attr('r')) || r; } catch (e) { /*fallback*/ }
      const circ = Math.ceil(2 * Math.PI * r);

      const initialStrokeW = options.initialStrokeW ?? 3;

      $path.css({
        'stroke-dasharray': checkLen,
        'stroke-dashoffset': checkLen,
        'opacity': 0,
        'transform': 'scale(0.22)',
        'transform-origin': '32px 32px'
      });

      $stroke.attr('stroke-width', initialStrokeW);
      $stroke.css({
        'stroke-dasharray': circ,
        'stroke-dashoffset': circ,
        'stroke-width': initialStrokeW + 'px',
        'transform': 'scale(1)',
        'transform-origin': '32px 32px',
        'paint-order': 'stroke fill markers'
      });

      $fill.css({
        'transform': 'scale(0)',
        'opacity': 0,
        'transform-origin': '32px 32px'
      });

      // set CSS vars on wrapper
      const node = $wrap.get(0);
      node.style.setProperty('--border-duration', `${borderMs}ms`);
      node.style.setProperty('--fill-duration', `${fillMs}ms`);
      node.style.setProperty('--check-duration', `${checkMs}ms`);
      node.style.setProperty('--check-length', checkLen);
      node.style.setProperty('--circumference', circ);
      node.style.setProperty('--initial-stroke-width', initialStrokeW);

      return { $path, $stroke, $fill, checkLen, circ, initialStrokeW };
    }

    // single run - không burst, giữ trạng thái cuối
    function runOnce() {
      // replace content with fresh clone to ensure animations start
      $circleWrap.html(originalInner);

      const prep = prepareSvg($circleWrap);
      if (!prep) return;

      // remove any leftover classes
      $circleWrap.removeClass('animate-border animate-fill animate-check animate-burst');

      // start sequence via RAF + timeouts
      requestAnimationFrame(() => {
        // draw border immediately
        $circleWrap.addClass('animate-border');

        // expand fill after border finished
        timeouts.push(setTimeout(() => {
          $circleWrap.addClass('animate-fill');
        }, borderMs));

        // draw check after border+fill
        timeouts.push(setTimeout(() => {
          $circleWrap.addClass('animate-check');
        }, borderMs + fillMs));

      });
    }

    // start first run
    runOnce();

    // controller - hỗ trợ stop
    return {
      stop() {
        clearAllTimeouts();
        if ($btn.length) $btn.text($btn.data('orig-text'));
        $circleWrap.html(originalInner);
        // reset SVG về trạng thái ban đầu nếu stop được gọi
        prepareSvg($circleWrap);
      }
    };
  }

  // Refactor Data
  function buildServiceSummary(data, listDataService) {
    const dataService = data.services;

    const images = data.images ? data.images : [];
    if (!Array.isArray(dataService)) return [];

    const listServiceUser =  dataService.map(service => {

      const foundService = listDataService.find(s => s.item.id === service.idService);
      if (!foundService) return null;

      const serviceInfo = {
        services: {
          id: foundService.item.id,
          nameService: foundService.item.value,
        },
        itemService: service.itemService.map(item => {
          const matchedItem = foundService.item.listItem.find(i => i.id === item.idItemService);
          if (!matchedItem) return null;

          return {
            title: matchedItem.title,
            subTitle: matchedItem.subTitle,
            priceRental: matchedItem.priceRental,
            timetext: matchedItem.timetext,
            selectedStaff: item.selectedStaff,
            optionals: item.optionals ?? [],
            idItemService: item.idItemService,
          };
        }).filter(Boolean),
      };

      return serviceInfo;
    }).filter(Boolean);

    return {
      listServiceUser,
      images,
    }

  }

  // format card number
  function formatCardNumber(value) {
    const digits = value.replace(/\D/g, ''); // giữ lại số
    return digits
      .match(/.{1,4}/g)       // tách thành từng block 4 số
      ?.join('-') || '';      // nối lại bằng dấu -
  }
  // unformat card number
  function unformatCardNumber(value) {
    return value.replace(/\D/g, ''); // xóa tất cả ký tự không phải số
  }
  // valid cardnumber
  function isValidCardNumber(value) {
    const digits = value.replace(/\D/g, '');   // xoá mọi ký tự không phải số
    return /^\d{13,19}$/.test(digits);        // còn lại 13–19 số
  }
  // format date expired
  function formatExpiryDate(value) {
    return value
      .replace(/\D/g, '')        // chỉ giữ số
      .replace(/(\d{2})(\d{1,2})/, '$1/$2') // auto thêm /
      .slice(0, 5);              // giới hạn 5 ký tự
  }
  // valid date expired
  function isValidExpiryDate(value) {
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;

    const [mm, yy] = value.split('/').map(Number);
    if (mm < 1 || mm > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear() % 100; // lấy 2 số cuối
    const currentMonth = now.getMonth() + 1;

    // expired?
    return (yy > currentYear) || (yy === currentYear && mm >= currentMonth);
  }
  // valid cvv
  function isValidCVV(value) {
    return /^\d{3,4}$/.test(value);
  }
  // Hàm dấu mã số thẻ
  function maskCardNumber(cardNumber = '') {
    if (!cardNumber) return '';
    const digits = cardNumber.replace(/\D/g, '');
    const last4 = digits.slice(-4);
    // fake X cho đủ 12 số + nối 4 số cuối
    const masked = 'X'.repeat(12) + last4;
    // nhóm 4 số 1 block
    return masked.match(/.{1,4}/g).join('-');
  }



  // Function block element
  function renderCartUser (dataBooking, dataHeaderNav) {
    const {cart} = dataHeaderNav;
    const quantity = dataBooking.users.reduce((accUser, user) => {
      const userCount = user.services.reduce((accService, service) => {
        return accService + service.itemService.length;
      }, 0)
      return accUser + userCount;
    }, 0)
    return `
        <button>
          ${cart.icon}
        </button>
        <span class="quantity-prod"
          style="
            --bgColorQa: ${cart.bgColor};
            --colorQua: ${cart.color};
          "
        >
          ${quantity}
        </span>
    `
  }
  function renderNavHeaderTemplates(dataBooking, dataHeaderNav) {
    const { logo: logoWeb, itemNav, colorActiveNav, iconUser, buttonBooking } = dataHeaderNav;

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
            ${itemNav
              .map((item) => {
                const iconItemNav = item.icon ? item.icon : '';
                const hasDropdown = Array.isArray(item.optionItems) && item.optionItems.length>0;

                return `
                <div class="nav-item-with-dropdown" data-id="${item.id}">
                  <button id="${item.id}" class="text-uppercase option ${item.id === 'page-service' ? 'active' : ''}">
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
                ${renderCartUser(dataBooking, dataHeaderNav)}
              </div>
              <button class="menu-toggle" aria-label="Toggle navigation">
                <i class="fa-solid fa-bars"></i>
              </button>
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
      const isSelected = !$('btn-option-copy-user').hasClass('selected') && userSelecting;
      const html = `
        <button class="btn-option-copy-user ${isSelected ? 'selected':''}"
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

    // render info user banner: firstname, lastname, email or phone
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
        renderCopyServiceOption('.copy-options-wrapper',optionCopyService ) // gọi trước để cập nhật selected
        renderCopyServiceBtn('.copy-btn-wrapper');
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
            <div id="targetBlockBanner" class="book-appoint">
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
    function renderListService(dataList, containerSelector = '.list-more', dataBooking, dataSetting) {

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
        const $listCards = item.listItem.map(cardItem => renderServiceCard(idMoreItem, cardItem, dataBooking, dataSetting));

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
      const iconLeft = `
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16625 11.4688H13.4263V2.46875H1.90625V21.9688H13.4263V12.9688H7.16625V11.4688Z" fill="#E27303" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8448 11.4691C19.8328 11.4681 18.0008 9.63605 18.0008 7.62305V6.87305H16.5008V7.62305C16.5008 9.10005 17.1758 10.4801 18.2198 11.4691L13.4219 11.469V12.969L18.2198 12.9691C17.1758 13.9581 16.5008 15.3371 16.5008 16.8141V17.5641H18.0008V16.8141C18.0008 14.8021 19.8338 12.9691 21.8458 12.9691H22.5958V11.4691H21.8448Z" fill="#E27303" />
              </svg>
            `
      const iconRight = `
               <i class="fa-solid fa-chevron-down rotate-transition"></i>
            `
      $title.append(iconLeft);
      $title.append(`<p class="text-uppercase bold-medium-14 mb-0">${item.value}</p>`);
      $title.append(iconRight);

      return $title;
    }
    // item card service
    function renderServiceCard(idMoreItem, cardItem, dataBooking, dataSetting) {
      const isHidePrice = dataSetting.HidePrice === "1";
      const $cardMore = $(`
          <div class="card-more" data-id="${cardItem.id}">
          </div>
        `);

      const $top = $(`
        <div class="top-card">
          <div class="left-card">
            <p class="bold-medium-14">${cardItem.title}</p>
            <p class="thin-mid-14">${cardItem.subTitle ? cardItem.subTitle :'Not subtitle'}</p>
          </div>
          <div class="right-card">
            ${isHidePrice ? '' : `<p id="service-price" class="bold-medium-20">${cardItem.priceRental} $</p>`}
            <p id="service-duration" class="bold-mid-12 ${isHidePrice ? 'is-hide-price' : ''}" data-value=${cardItem.timetext}>${cardItem.timetext} min</p>
          </div>
        </div>
      `);
      const user = dataBooking.users.find(u => u.isChoosing);
      const serviceCardMoreCurr = user.services.find((se) => se.idService === idMoreItem);
      const serviceCardItemCurr = serviceCardMoreCurr && serviceCardMoreCurr.itemService.find((si) => si.idItemService === cardItem.id);
      const staffUserSelected = serviceCardItemCurr && serviceCardItemCurr.selectedStaff;

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
    function renderUserOptions(staff) {
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
                <img src="${user.imageFileName ? user.imageFileName : 'null'}" alt="image ${user.nickName ? user.nickName : 'Not nickname'}" class="img-staff" />
              </div>
              <span class="full-name">${user.nickName ? user.nickName : 'Not nickname'}</span>
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
    function renderActionButtons(idMoreItem, idCardItem, dataBooking) {
      // Kiểm tra có staff đã được chọn trong item service này hay không
      const findUserCur = dataBooking.users.find((u) => u.isChoosing);
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
      if(findItemService) {
        $wrap.append($wrapSelect, $del);
      }else{
        $wrap.append($add);
      }
      return $wrap;
    }
    // render list add on
    function renderListAddOn (dataItem, idItemChild, dataBooking, isFull=false) {
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
                        <h2 class="text-price-item-addOn">${item.price} $</h2>
                        <p class="timedura">${item.timedura} min</p>
                      </div>
                      <div class="checkbox-addOn ${isOptionSelected ? 'selected' :''}">
                        <div class="circle-addOn">
                          <i class="fa-solid fa-check"></i>
                        </div>
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
      if(Object.keys(dataProm).length === 0) return '';

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
    };

    // render work-time
    const renderStoreInfo = (dataStoreInfo, color = '') => {
      if(Object.keys(dataStoreInfo).length === 0) return '';

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
      $right.append('<h4>HOURS</h4>');

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
    };
    // render policy
    const renderPolicyPage = (dataPolicyPage, color = '') => {
      if(Object.keys(dataPolicyPage).length ===0) return '';

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
    };

    // render social icon
    function renderSocialItemPage(item) {
      return `
        <div class="wrap-image-social" data-id="${item.id}">
          <img src="${item.img}" alt="image social" class="img-social"/>
        </div>
      `;
    }
  // render time booking
  function renderTimeBooking(dataBooking, isCopySameTime) {
    const userCopyTime = dataBooking.users.find((u) => u.isSelecting && !u.isChoosing);
    // Kiểm tra chọn service xong mới hiện chọn time
    const userChoosing = dataBooking.users.find((u) => u.isChoosing);
    const isSelectedService = userChoosing.services.length > 0;
    return `
      <div class="calendar-timeslot">
        <div class="wrap-calendar-time"
          style="
            --color-cur-primary: ${colorPrimary};
          "
        >
          <div class="top-cal-time">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16625 11.4688H13.4263V2.46875H1.90625V21.9688H13.4263V12.9688H7.16625V11.4688Z" fill="#E27303" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8448 11.4691C19.8328 11.4681 18.0008 9.63605 18.0008 7.62305V6.87305H16.5008V7.62305C16.5008 9.10005 17.1758 10.4801 18.2198 11.4691L13.4219 11.469V12.969L18.2198 12.9691C17.1758 13.9581 16.5008 15.3371 16.5008 16.8141V17.5641H18.0008V16.8141C18.0008 14.8021 19.8338 12.9691 21.8458 12.9691H22.5958V11.4691H21.8448Z" fill="#E27303" />
            </svg>
            <h2 class="title-copy-time text-uppercase mb-0">SELECT DATE AND TIME</h2>
            ${
              userCopyTime && Object.keys(userCopyTime).length > 0 ?
              `<div class="copy-time">
                <input
                  id="select-banner-pm"
                  type='checkbox'
                  class='toggle-switch'
                  ${isCopySameTime ? 'checked' : ''}
                />
                <span class="text-same-time">Start on same time</span>
              </div>` : ''
          }
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
              <div id="comboBox"></div>
              <div id="timeSlotsContainer" class="time-slots"></div>
              <div class="text-scroll-more">
                <h2>Scroll to see more time slots</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
  // render container time-booking && select time
  function renderContainerTiming(
    dataBooking,
    currentDate,
    monthNames,
    dayNames,
    currentMonth,
    currentYear,
    fakeDataCalender,
    selectedDateParam,
    listDataService,
    isCopySameTime,
  ) {
    const $wrapCalendarTimeslot = $('.calendar-timeslot');
    const htmlTimeBooking = renderTimeBooking(dataBooking, isCopySameTime);
    $wrapCalendarTimeslot.replaceWith(htmlTimeBooking);

    // Lấy user hiện tại
    const user = dataBooking.users.find(u => u.isChoosing);

    // 1. Lấy selectedDate ưu tiên từ user, nếu là string -> new Date()
    let userSelected = user ? normalizeToDate(user.selectedDate) : null;

    // 2. Nếu không có userSelected => chọn selectedDateParam hoặc today
    let useDate = userSelected || normalizeToDate(selectedDateParam) || new Date();

    // 3. Không để date ở quá khứ (so với today) — nếu quá khứ dùng today
    const today = new Date();
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (useDate < todayOnly) useDate = todayOnly;

    // 4. Nếu ngày rơi vào non-working, tìm ngày làm việc tiếp theo
    useDate = findNextWorkingDate(useDate, fakeDataCalender);

    // 5. đồng bộ month/year với useDate
    currentMonth = useDate.getMonth();
    currentYear = useDate.getFullYear();

    // Render calendar + time slots với ngày đã chọn
    renderCalendar(monthNames, dayNames, currentMonth, currentYear, fakeDataCalender, useDate, dataBooking, listDataService);

    // Cập nhật tiêu đề ngày
    const titleEl = document.getElementById("selectedDateTitle");
    if (titleEl) titleEl.textContent = useDate.toDateString();

    // Render time slots cho ngày này (và sẽ chọn time slot nếu user.selectedTimeSlot tồn tại)
    renderTimeSlotsForDate(useDate, dataBooking, listDataService);
  }
  // render calender
  function renderCalendar(monthNames, dayNames, currentMonth, currentYear, fakeDataCalender, selectedDate, dataBooking, listDataService) {
    const daysEl = document.getElementById("days");
    const monthYearEl = document.getElementById("monthYear");
    daysEl.innerHTML = "";
    monthYearEl.textContent = `${monthNames[currentMonth]}, ${currentYear}`;

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    const hasSelectedDate = !! selectedDate;

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

    let nearestWorkingDate = null;

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
      } else if (isPast) {
        day.classList.add("past");
      } else {
        // Nếu chưa có selectedDate và chưa tìm nearestWorkingDate
        if (!hasSelectedDate && !nearestWorkingDate) {
          nearestWorkingDate = date;
        }

        if (isSelected) {
          day.classList.add("active");
        } else if (!hasSelectedDate && nearestWorkingDate === date) {
          day.classList.add("active");
        }
      }

      // Gán select
      if (!isPast && !nonWorking) {
        day.addEventListener("click", () => {
          selectedDate = new Date(currentYear, currentMonth, date);
          const user = dataBooking.users.find(u => u.isChoosing);
          if (user) {
            user.selectedDate = selectedDate;
          }
          document.querySelectorAll(".day").forEach(d => d.classList.remove("active", "today"));
          day.classList.add("active");
          document.getElementById("selectedDateTitle").textContent = selectedDate.toDateString();
          renderTimeSlotsForDate(selectedDate, dataBooking, listDataService);
        });
      }

      daysEl.appendChild(day);
    }

    // Nếu chưa có selectedDate, set selectedDate = nearestWorkingDate
    if (!hasSelectedDate && nearestWorkingDate) {
      selectedDate = new Date(currentYear, currentMonth, nearestWorkingDate);
      const user = dataBooking.users.find(u => u.isChoosing);
      if (user) {
        user.selectedDate = selectedDate;
      }
      document.getElementById("selectedDateTitle").textContent = selectedDate.toDateString();
      renderTimeSlotsForDate(selectedDate, dataBooking, listDataService);
    }

  }

  function getAMPM(timeStr) {
    const [hourStr] = timeStr.split(":");
    const hour = parseInt(hourStr, 10);
    return hour >= 12 ? "PM" : "AM";
  }
  // tab chọn thợ để chọn time
  function createTabTech({dataBooking, data, callback, listDataService, itemWidth = "200px" }) {
    const container = document.getElementById("comboBox");
    container.classList.add("tab-tech");
    container.innerHTML = `
      <div class="tab-list">
        ${data.map(item => `
          <div
            class="tab-item ${item.staff.isChoosing ? "active" : ""}"
            data-id="${item.staff.employeeID}"
            style="width:${itemWidth}"
          >
            ${item.staff.nickName}

            <p class="icon-mark-staff">
              <i class="fa-solid fa-check"></i>
            </p>
          </div>
        `).join("")}
      </div>
    `;
    const items = container.querySelectorAll(".tab-item");

    items.forEach(itemEl => {
      itemEl.addEventListener("click", () => {
        // clear active
        items.forEach(el => el.classList.remove("active"));
        data.forEach(d => d.staff.isChoosing = false);

        // set active
        itemEl.classList.add("active");

        const id = itemEl.dataset.id;
        const selected = data.find(d => d.staff.employeeID == id);
        if(selected){
          selected.staff.isChoosing = true;
        }
        if (callback) callback(dataBooking, selected, listDataService);
      });
    });

    // nếu chưa có tab nào active thì active tab đầu tiên
    const activeEl = container.querySelector(".tab-item.active");
    if (!activeEl && items.length > 0) {
      const firstEl = items[0];
      firstEl.classList.add("active");

      const firstId = firstEl.dataset.id;
      const firstSelected = data.find(d => d.staff.employeeID == firstId);
      if (firstSelected) {
        firstSelected.staff.isChoosing = true;
      }
      if (callback) callback(dataBooking, firstSelected, listDataService);
    }
  }


  function buildTechDataFromBooking(user) {
    if (!user || !user.services) return [];

    let rows = [];
    user.services.forEach(svc => {
      svc.itemService.forEach(item => {
        rows.push({
          id: item.selectedStaff.employeeID,       // key duy nhất
          staff: item.selectedStaff,               // object thợ
          itemService: item                        // object service
        });
      });
    });

    // lọc unique theo id
    const unique = [];
    const seen = new Set();

    rows.forEach(r => {
      if (!seen.has(r.id)) {
        seen.add(r.id);
        unique.push(r);
      }
    });

    return unique;
  }

  function getTotalDuration(selected) {
    const base = selected?.itemService?.duration || 0;
    const addon = (selected?.itemService?.optionals || []).reduce((sum, opt) => sum + (opt.timedura || 0), 0);
    return base + addon;
  }
  async function getTimeTechFrame(dataBooking, selectedTech, listDataService) {
    try {
      const userChoosing = dataBooking.users.find(u => u.isChoosing);
      const selectedDate = userChoosing.selectedDate || new Date();
      const dateSer = formatDateMMDDYYYY(selectedDate);
      const duration = getTotalDuration(selectedTech);
      const empID = selectedTech?.staff?.employeeID ?? selectedTech?.id;

      const res = await fetchAPI.get(
        `/api/appointment/gettimebookonline?date=${dateSer}&duration=${duration}&rvcno=336&empID=${empID}`
      );

      renderTimeSlotsForTech(dataBooking, selectedTech, selectedDate, listDataService, res.data);
    }catch(e){
      console.error("[getTimeTechFrame]", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      })
    }
  }


  function renderServiceTechCombo(dataBooking, listDataService) {
    const user = dataBooking.users.find(u => u.isChoosing); // lấy user đang chọn

    if (!user) return;

    const data = buildTechDataFromBooking(user);

    createTabTech({
      dataBooking,
      data,
      itemWidth: "200px",
      callback: getTimeTechFrame,
      listDataService,
    });

    // Sau khi render tab, check lại staff nào đã có chọn time
    user.services.forEach(svc => {
      svc.itemService.forEach(item => {
        if (item.selectedStaff) {
          const empID = item.selectedStaff.employeeID;
          const hasTime = !!item.selectedStaff.selectedTimeSlot;
          updateTabMark(empID, hasTime);
        }
      });
    });
  }

  // làm tròn phút lên mốc gần nhất (interval = 20 phút)
  function roundUpToNearestInterval(date, interval = 20) {
    const d = new Date(date);
    const minutes = d.getMinutes();
    const mod = minutes % interval;
    if (mod !== 0) {
      d.setMinutes(minutes + (interval - mod));
    }
    d.setSeconds(0, 0);
    return d;
  }

  function generateTimeSlotsDynamic(selectedDate, start, end, interval = 20) {
    const slots = [];

    // lấy working hours
    let [startH, startM] = start.split(":").map(Number);
    let [endH, endM] = end.split(":").map(Number);

    let startTime = new Date(selectedDate);
    startTime.setHours(startH, startM, 0, 0);

    let endTime = new Date(selectedDate);
    endTime.setHours(endH, endM, 0, 0);

    // clamp endTime <= 20:00
    const hardEnd = new Date(selectedDate);
    hardEnd.setHours(20, 0, 0, 0);
    if (endTime > hardEnd) endTime = hardEnd;

    // nếu hôm nay => lấy mốc gần nhất so với giờ hiện tại
    const now = new Date();
    if (selectedDate.toDateString() === now.toDateString()) {
      const roundedNow = roundUpToNearestInterval(now, interval);
      if (roundedNow > startTime) startTime = roundedNow;
    }

    // sinh slots
    let cur = new Date(startTime);
    while (cur <= endTime) {
      const formatted = cur.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      slots.push(formatted);
      cur.setMinutes(cur.getMinutes() + interval);
    }

    return slots;
  }

  function renderTimeSlotsForDate(selectedDate, dataBooking, listDataService) {
    const container = $("#timeSlotsContainer");
    container.empty();

    // render combobox cho user đang chọn
    renderServiceTechCombo(dataBooking, listDataService);
      //timeslot
    const workingHoursByWeekday = {
      0: [], // Chủ nhật - không làm
      1: ["08:00", "20:00"], // Thứ 2
      2: ["08:00", "20:00"], // Thứ 3
      3: ["08:00", "20:00"], // Thứ 4
      4: ["08:00", "20:00"], // Thứ 5
      5: ["08:00", "20:00"], // Thứ 6
      6: ["08:00", "20:00"], // Thứ 7
    };

    const weekday = selectedDate.getDay();
    const workingRange = workingHoursByWeekday[weekday];

    if (!workingRange || workingRange.length === 0) {
      container.append(`<div class="time-slot">Không có giờ làm việc hôm nay.</div>`);
      return;
    }

    const slots = generateTimeSlotsDynamic(selectedDate, workingRange[0], workingRange[1]);

    slots.forEach(slot => {
      const div = $(`
        <div class="time-slot">
          <span>${slot}</span>
          <span>${getAMPM(slot)}</span>
          <div class="circle">
            <div class="dot"></div>
          </div>
        </div>
      `);
      container.append(div);
    });
    container.off('click', '.time-slot');

    container.on("click", ".time-slot", function () {
      container.find(".time-slot").removeClass("selected");
      $(this).addClass("selected");
      const user = dataBooking.users.find(u => u.isChoosing);
      if (user){
        user.selectedTimeSlot = $(this).find('span').text();
        user.selectedDate = selectedDate;
      }
      // Kiểm tra user đã được chọn time và service đầy đủ chưa, đã đủ thì ẩn btn scroll
      const isFinalBooking = showScrollToFinalBooking(user)
      isFinalBooking && updateScrollButton({
          target: '#section-booking',
          trigger: '#trigger-booking',
          triggerBanner: '#triggerBlockSumary',
          text: 'Continue Booking',
          icon: 'fa fa-hand-pointer down',
          force: false
        });

      // Cập nhật đã chọn cho staff
      renderServiceTechCombo(dataBooking, listDataService)
      // Cập nhật sumary
      renderSumary(dataBooking, listDataService);
    });

    // Nếu user đã có selectedTimeSlot thì đánh dấu slot tương ứng
    const user = dataBooking.users.find(u => u.isChoosing);
    if (user && user.selectedTimeSlot) {
      const match = container.find('.time-slot').filter(function() {
        return $(this).find('span').text().trim() === String(user.selectedTimeSlot).trim();
      });
      if (match.length) {
        container.find(".time-slot").removeClass("selected");
        match.first().addClass("selected");
        // scroll tới slot
        // container.animate({ scrollTop: match.first().position().top - 40 }, 300);
      } else {

      }
    }
  }

  function findItemsOfTech(userChoosing, empId) {
    const items = [];
    (userChoosing.services || []).forEach(svc => {
      (svc.itemService || []).forEach(it => {
        if (it.selectedStaff && String(it.selectedStaff.employeeID) === String(empId)) {
          items.push(it);
        }
      });
    });
    return items;
  }

  // đánh dấu tech đã chọn
  function updateTabMark(empID, hasTime) {
    const el = document.querySelector(`.tab-list .tab-item[data-id="${empID}"]`);
    if (!el) return;
    el.classList.toggle("has-time", !!hasTime);
  }

  function renderTimeSlotsForTech(dataBooking, selectedTech, selectedDate, listDataService, frameData) {
    const container = $("#timeSlotsContainer");
    container.empty();

    const userChoosing = dataBooking.users.find(u => u.isChoosing);
    const empID = selectedTech?.staff?.employeeID ?? selectedTech?.id;

    // các itemService đang gán cho đúng tech
    const itemsOfTech = findItemsOfTech(userChoosing, empID);

    // giờ đã lưu trước đó (nếu có) trong selectedStaff của tech này
    const prevSlot =
      itemsOfTech.find(it => it.selectedStaff && it.selectedStaff.selectedTimeSlot)?.selectedTimeSlot;

    if (!frameData || !frameData.length) {
      container.append(`<div class="time-slot">Không có giờ trống hôm nay.</div>`);
      // nếu trước đó có lưu giờ mà giờ không còn, xử lý xoá
      if (prevSlot) {
        alert(`Xin thông báo: giờ ${prevSlot} đã được chọn bởi người khác.`);
        itemsOfTech.forEach(it => {
          delete it.selectedStaff.selectedTimeSlot;
          delete it.selectedStaff.selectedDate;
          delete it.selectedStaff.isChoosing;
        });
        updateTabMark(empID, false);
        renderSumary(dataBooking, listDataService);
      }
      return;
    }
    // render danh sách slot
    frameData.forEach(slot => {
      const div = $(`
        <div class="time-slot ${!slot.isEnable ? "disabled" : ""}">
          <span>${slot.time}</span>
          <span>${getAMPM(slot.time)}</span>
          <div class="circle"><div class="dot"></div></div>
        </div>
      `);

      if (itemsOfTech.some(it => it.selectedStaff?.selectedTimeSlot === slot.time)) {
        div.addClass("selected");
      }

      if (slot.isEnable) {
        div.on("click", function () {
          container.find(".time-slot").removeClass("selected");
          $(this).addClass("selected");

          // lưu vào selectedStaff của tất cả itemService thuộc tech này
          itemsOfTech.forEach(it => {
            it.selectedStaff.selectedTimeSlot = slot.time;
            it.selectedStaff.selectedDate = formatDateMMDDYYYY(selectedDate);
          });
          updateTabMark(empID, true);

          // optional: vẫn có thể sync lên userChoosing nếu còn dùng nơi khác
          userChoosing.selectedTimeSlot = slot.time;
          userChoosing.selectedDate = formatDateMMDDYYYY(selectedDate);

          const okToScroll = showScrollToFinalBooking(userChoosing);
          if (okToScroll) {
            updateScrollButton({
              target: "#section-booking",
              trigger: "#trigger-booking",
              triggerBanner: "#triggerBlockSumary",
              text: "Continue Booking",
              icon: "fa fa-hand-pointer down",
              force: false
            });
          }

          renderSumary(dataBooking, listDataService);
        });
      }

      container.append(div);
    });

    // Đánh dấu lại slot đã lưu trong staff (nếu còn hợp lệ)
    if (prevSlot) {
      const stillOk = frameData.some(s => s.time === prevSlot && s.isEnable);
      if (stillOk) {
        const match = container.find(".time-slot").filter(function () {
          return $(this).find("span").first().text().trim() === String(prevSlot).trim();
        });
        if (match.length) {
          container.find(".time-slot").removeClass("selected");
          match.first().addClass("selected");
        }
        updateTabMark(empID, true);
      } else {
        alert(`Xin thông báo: giờ ${prevSlot} đã được chọn bởi người khác.`);
        itemsOfTech.forEach(it => {
          delete it.selectedStaff.selectedTimeSlot;
          delete it.selectedStaff.selectedDate;
        });
        updateTabMark(empID, false);
        renderSumary(dataBooking, listDataService);
      }
    }
  }

  // render sumary
  function renderSumary (dataBooking, listDataService) {
    const $containerSumary = $('.wrap-sumary');
    $containerSumary.empty();
    // Kiểm tra có user tất cả user chọn xong servce và timming
    const allSelected = dataBooking.users.every(user => {
      return (
        Array.isArray(user.services) &&
        user.services.length > 0 &&
        user.services.every(service =>
          Array.isArray(service.itemService) &&
          service.itemService.length > 0 &&
          service.itemService.every(item =>
            item.selectedStaff &&
            item.selectedStaff.selectedDate &&
            item.selectedStaff.selectedTimeSlot
          )
        )
      );
    });

    if (!allSelected) {
      $containerSumary.append('');
      return;
    }


    const isAllowConfirm = showScrollToFinalBooking(dataBooking);
    const owner = dataBooking.users[0];

    // Kiểm tra mảng users
    const hasUserWithService = dataBooking.users.some(user => Array.isArray(user.services) && user.services.length >0);

    if(!Array.isArray(dataBooking.users) || !hasUserWithService) {
      return ``;
    }

    // hàm tính tiền tạm thời, do data chưa chuẩn
    function parsePrice(priceStr) {
      // Bỏ ký tự $ và chuyển sang số
      if(typeof priceStr ==='number') return priceStr;
      return parseFloat(priceStr.replace('$', '')) || 0;
    }

    function parseTime(timeStr) {
      if (!timeStr) return 0;
      if(typeof timeStr === 'number') return timeStr;
      return parseInt(timeStr.replace(/[^0-9]/g, '')) || 0;
    }

    function getTotalPrice(service) {
      const basePrice = parsePrice(service.priceRental);

      const optionalTotal = (service.optionals || []).reduce((sum, opt) => {
        return sum + parsePrice(opt.price);
      }, 0);

      const total = basePrice + optionalTotal;

      return total.toFixed(2);
    }

    let totalPayment = 0;

    const htmlSumary =  `
      <div id="section-booking" class="container-sumary">
        <div class="header-sumary">
          <h2 class="title-header-sumary text-uppercase">Booking sumary</h2>
          <p class="sub-time-sumary">14:00, Thu, May 14 2025</p>
        </div>
        <div class="wrap-list-sumary">
        ${dataBooking.users.map((userBooking) => {
          const dataRefact = buildServiceSummary(userBooking, listDataService);
          // tính tổng bản ghi, tổng tiền và tổng time
          let totalServices = 0;
          let totalMinutes = 0;

          if (dataRefact.listServiceUser && Array.isArray(dataRefact.listServiceUser)) {
            dataRefact.listServiceUser.forEach(item => {
              item.itemService.forEach(is => {
                totalServices += 1;

                // Tính thời gian chính
                totalMinutes += parseTime(is.timetext);

                // Cộng thêm thời gian optional nếu có
                const optionalMins = (is.optionals || []).reduce((sum, opt) => {
                  return sum + parseTime(opt.timedura);
                }, 0);
                totalMinutes += optionalMins;

                totalPayment += Number(getTotalPrice(is) || 0);
              });
            });
          }
          // save total amount
          dataBooking.totalAmount = totalPayment;
          return `
            <div class="item-sumary" data-id="${userBooking.id}">
              <div class="top-item-sumary">
                <div class="left-top-item-sumary">
                  <div class="user-book">
                    <h2>${userBooking.firstName ? userBooking.firstName : 'Not Name'}</h2>
                  </div>
                  <button class="edit-sumary">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <span>Edit</span>
                  </button>
                  ${owner.id !== userBooking.id ?
                    `
                      <button class="delete-sumary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                          <path d="M14.8359 10.7598V17.7598M10.8359 10.7598V17.7598M6.83594 6.75977V18.5598C6.83594 19.6799 6.83594 20.2395 7.05392 20.6674C7.24567 21.0437 7.55141 21.3502 7.92773 21.542C8.35514 21.7598 8.91493 21.7598 10.0328 21.7598H15.639C16.7569 21.7598 17.3159 21.7598 17.7433 21.542C18.1197 21.3502 18.4264 21.0437 18.6182 20.6674C18.8359 20.24 18.8359 19.6808 18.8359 18.5629V6.75977M6.83594 6.75977H8.83594M6.83594 6.75977H4.83594M8.83594 6.75977H16.8359M8.83594 6.75977C8.83594 5.82788 8.83594 5.36217 8.98818 4.99463C9.19117 4.50457 9.58026 4.11499 10.0703 3.91201C10.4379 3.75977 10.9041 3.75977 11.8359 3.75977H13.8359C14.7678 3.75977 15.2338 3.75977 15.6013 3.91201C16.0914 4.11499 16.4806 4.50457 16.6836 4.99463C16.8358 5.36217 16.8359 5.82788 16.8359 6.75977M16.8359 6.75977H18.8359M18.8359 6.75977H20.8359" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Delete
                      </button>
                    ` :''
                  }
                </div>
                <div class="right-top-item-sumary">
                  <button class="btn-upload-image">Upload Image ${dataRefact.images.length !== 0 ? `(${dataRefact.images.length})` : ''}</button>
                </div>
              </div>
              <div class="body-item-sumary">
                ${dataRefact.listServiceUser && dataRefact.listServiceUser.map((item) => {
                  const services = item.services;
                  const itemService = item.itemService;
                  return itemService.map((is) => {
                    return `
                      <div class="wrap-item-content" data-id=${services.id} data-id-item=${is.idItemService}>
                        <div class="item-content">
                          <div class="p-wrap">
                          <p class="text-name-service">${is?.title}</p>
                          <p class="text-name-tech">${is.selectedStaff?.nickName}</p>
                          <p class="text-time-dura">${is?.timetext}</p>
                          <p class="text-price-serice">$ ${getTotalPrice(is)}</p>
                          <div class="action-item-ser">
                            ${/*
                            <p class="edit-item-ser">
                              <i class="fa-solid fa-pen-to-square"></i>
                            </p>
                              */ ''}
                            <p class="delete-item-ser">
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M14.8359 10.7598V17.7598M10.8359 10.7598V17.7598M6.83594 6.75977V18.5598C6.83594 19.6799 6.83594 20.2395 7.05392 20.6674C7.24567 21.0437 7.55141 21.3502 7.92773 21.542C8.35514 21.7598 8.91493 21.7598 10.0328 21.7598H15.639C16.7569 21.7598 17.3159 21.7598 17.7433 21.542C18.1197 21.3502 18.4264 21.0437 18.6182 20.6674C18.8359 20.24 18.8359 19.6808 18.8359 18.5629V6.75977M6.83594 6.75977H8.83594M6.83594 6.75977H4.83594M8.83594 6.75977H16.8359M8.83594 6.75977C8.83594 5.82788 8.83594 5.36217 8.98818 4.99463C9.19117 4.50457 9.58026 4.11499 10.0703 3.91201C10.4379 3.75977 10.9041 3.75977 11.8359 3.75977H13.8359C14.7678 3.75977 15.2338 3.75977 15.6013 3.91201C16.0914 4.11499 16.4806 4.50457 16.6836 4.99463C16.8358 5.36217 16.8359 5.82788 16.8359 6.75977M16.8359 6.75977H18.8359M18.8359 6.75977H20.8359" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </p>
                          </div>
                          </div>
                        </div>
                      </div>
                    `
                  }).join('')
                }).join('')}
              </div>
              <div class="total-pay">
                <p class="text-total-amount">Total (${totalServices})</p>
                <p class="text-total-times">${totalMinutes} min</p>
                <p class="text-total-price">$ ${totalPayment}</p>
                <div class="action-item-ser"></div>
              </div>
            </div>
          `
        }).join('')}
        </div>
        <div class="confirm-booking">
          <button class="btn-confirm-booking" ${isAllowConfirm ? '' : 'disabled'}>
            Confirm
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `

    // gán totalPayment cho dataBooking
    dataBooking.totalPayment = totalPayment;
    $containerSumary.append(htmlSumary);
  }

  // POPUP
      function formatUnit(val) {
      return typeof val === 'number' ? `${val}px` : val;
    }
    // base popup
    function renderBasePopup(innerContentHTML, persistent = false, height = 620, width = 560) {
      // Clear popup cũ nếu có
      $('.overlay-screen').remove();

      const html = `
        <div class="overlay-screen ${persistent ? 'persistent' :''}">
          <div class="popup-container-template"
            style="
              height: ${formatUnit(height)};
              width: ${formatUnit(width)};
            "
          >
            ${innerContentHTML}
            <div class="btn-closepopup">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>
      `;
      return html;
    }
    function renderContentNotify(title, content, callback) {
      const popupHtml = `
        <div class="popup-notify"
          style="
            --color-cur-primary: ${colorPrimary};
          "
        >
          <div class="popup-header-notify">
            <h3>${title}</h3>
          </div>
          <div class="popup-body-notify">
            ${content}
          </div>
          <div class="popup-footer-notify">
            <button class="btn-confirm-delete">Đồng ý</button>
            <button class="btn-cancel">Hủy</button>
          </div>
        </div>
      `;

      // Gắn event khi DOM đã append
      setTimeout(() => {
        const $overlay = $('.overlay-screen');

        $overlay.find('.btn-confirm-delete').on('click', function () {
          if (typeof callback === 'function') {
            callback();
          }
          closeNotify();
        });

        $overlay.find('.btn-cancel').on('click', closeNotify);

        $overlay.on('click', function (e) {
          if ($(e.target).is('.overlay-screen')) {
            closeNotify();
          }
        });

        function closeNotify() {
          $overlay.hide();
          $overlay.find('.popup-notify').remove();
        }
      });

      return popupHtml;
    }


    // content popup cart user
    function renderCartContent(dataCart, currency) {
      const { order, noneOrder, btnBack } = dataCart;
      const imgBgCart = `url('/assets/images/background-cart-nail/bg-cart.png')`;
      return `
        <div class="popup-wrap-cart">
          <div class="title-select-services">
            <h2 class="text-uppercase">Services Selected</h2>
          </div>
          <div class="wrap-list-services">
            ${
              order && order.length > 0
                ? order.map((item) => {
                    return `
                      <div class="item-order"
                        style="
                          --bg-image-cart: ${imgBgCart};
                        "
                      >
                        <div class="top-item-order">
                          <div class="title-item-order">
                            <span>${item.title}</span>
                          </div>
                          <div class="right-item-order">
                            <span class="price-item-order">${item.price + " " + currency}</span>
                            <span class="dura-item-order">${item.duration + " " + currency}</span>
                          </div>
                        </div>
                        <div class="staff-item-order">
                          <img src="${item.selectedStaff.imageFileName}" alt="image staff" class="img-staff-order"/>
                          <span>
                            ${item.selectedStaff.nickName}
                          </span>
                        </div>
                      </div>
                    `;
                  }).join('')
                : `<div class="image-order-none">
                  <img src="${noneOrder.image}" alt="Empty order" class="empty-img-order"/>
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
      `;
    }
    // content popup verify phone & email
    function renderVerifyEmailPhoneContent(emailOrPhone) {
      return `
        <div class="popup-wrap-verify-emailPhone"
          style="
            --color-cur-primary: ${colorPrimary}
          "
        >
          <div class="title-appointment">
            <h2>Please enter your cell phone number or email to make appointment</h2>
          </div>
          <div class="container-verify-emailPhone">
            <input type="text" id="appointment-input" class="appointment-input" value="${emailOrPhone ? emailOrPhone : ''}" placeholder="Enter phone number or email">
            <span class="clear-icon">
              <i class="fa-solid fa-arrow-left"></i>
            </span>
            <p class="error-message"></p>
            <!--
            <p class="register-nav">
              <span class="text-ques-regis">
                Don't have an account?
              </span>
              <span id="nav-tab-register" class="nav-tab-register">Sign up?</span>
            </p>
            -->
          </div>
          <div class="consent-container">
            <span class="wrap-icon-checked">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 6.73671L4.67305 9.75195L11.5 3.75195" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <label for="consent-checkbox">Input your number to consent to HANG NAILS & SPA SMS messages. Opt out with Stop</label>
          </div>
          <div class="button-container">
            <button class="btn-back-emailPhone">Back</button>
            <button class="btn-next-emailPhone" ${emailOrPhone ? '' : 'disabled' }>Next</button>
          </div>
        </div>
      `;
    }
    // content popup verify code
    function renderVerifyCodeContent(emailPhoneMasked = '(+84) 124 2149') {
      return `
        <div class="popup-wrap-verify-code"
          style="
            --color-cur-primary: ${colorPrimary}
          "
        >
          <div class="title-verify-number">
            <h2>VERIFY YOUR NUMBER</h2>
          </div>
          <p class="desc-verify">Enter the code we sent over SMS to ${emailPhoneMasked}</p>

          <div class="otp-inputs">
            ${[...Array(6)].map((_, i) => `<input type="text" maxlength="1" class="otp-box" data-index="${i}" />`).join('')}
          </div>
          <p class="error-message"></p>

          <div class="resend-wrapper">
            Didn’t get a code? <span class="resend-btn disabled">Send Again (<span class="countdown">00:59</span>)</span>
          </div>

          <div class="consent-container">
            <span class="wrap-icon-checked">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 6.73671L4.67305 9.75195L11.5 3.75195" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <label>Input your number to consent to HANG NAILS & SPA SMS messages. Opt out with Stop</label>
          </div>

          <div class="button-container">
            <button class="btn-back-verify">Back</button>
            <button class="btn-next-verify" disabled>
            Verify
            <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    }
    // Content popup register
    function renderRegisterForm (dataRegis, fieldEntered = null) {
      const valCheckDis = fieldEntered === typeInput.EMAIL ? dataRegis.email : dataRegis.phoneNumber;
      const isDisabled = dataRegis.firstName && dataRegis.lastName && valCheckDis;
      return `
        <div class="wrap-popup-register"
          style="
            --color-cur-primary: ${colorPrimary}
          "
        >
          <h2 class="title-register text-uppercase">
            Register
          </h2>
          <div class="pa-intro-register">
            <p class="content">
              Your name and phone number will be used to send you
              appointment confirmations and reminders.
              We’ll also be able to call or text you if anything changes.
            </p>
          </div>
          <div class="form-group">
            <div class="form-input-phone">
              <label>
                Phone
                <p>${fieldEntered === typeInput.EMAIL  ? '' : '*'}</p>
              </label>
              <input
                id="phone-register"
                placeholder="Phone number"
                value="${ dataRegis.phoneNumber? dataRegis.phoneNumber : '' }"
                data-type="${fieldEntered === typeInput.EMAIL ? typeRequire.NOTREQUIRED : typeRequire.REQUIRED}"
              />
              <p class="error-message"></p>
            </div>
            <div class="form-input-fullname">
              <div class="form-input-firstname-register">
                <label>
                  First Name
                  <p>*</p>
                </label>
                <input
                  id="firstname-register"
                  placeholder="First Name"
                  value="${dataRegis.firstName ? dataRegis.firstName : ''}"
                />
                <p class="error-message"></p>
              </div>
              <div class="form-input-lastname-register">
                <label>
                  Last Name
                  <p>*</p>
                </label>
                <input
                  placeholder="Last Name"
                  id="lastname-register"
                  value="${dataRegis.lastName ? dataRegis.lastName : ''}"
                />
                <p class="error-message"></p>
              </div>
            </div>
            <div class="form-input-email">
              <label>
                Email
                <p>${fieldEntered === typeInput.PHONE ? '' : '*'}</p>
              </label>
              <input
                id="email-register"
                placeholder="Email"
                value="${dataRegis.email ? dataRegis.email : '' }"
                data-type="${fieldEntered === typeInput.PHONE ? typeRequire.NOTREQUIRED : typeRequire.REQUIRED}"
              />
              <p class="error-message"></p>
            </div>
            <div class="form-input-zipcode">
              <label>
                Zip Code
              </label>
              <input placeholder="Zip Code" id="zipcode-register"/>
              <p class="error-message"></p>
            </div>
          </div>
          <div class="button-container">
            <button class="btn-back-verify-register">Back</button>
            <button class="btn-next-verify-register" ${isDisabled ? '' : 'disabled'}>Sign Up</button>
          </div>
        </div>
      `
    }
    // Content policies
    function renderPoliciesForm(policySetting, isTimeOff = false) {
      return `
        <div class="wrap-popup-policies"
          style="
            --color-cur-primary: ${colorPrimary};
          "
        >
          <div class="title-timeoff">
            <h2 class="title-policies text-uppercase">
              Salon Policies
            </h2>
            <span class="popup-flow-countdown timeoff">
            </span>
          </div>
          <div class="content-policies">
            ${policySetting}
          </div>
          <div class="button-container">
            <button class="btn-back-policies">Back</button>
            <button class="btn-next-policies">Accept</button>
          </div>
        </div>
      `
    }
    // Form chọn phương thức thanh toán
    function renderPaymentMethodsForm(dataBooking, selectedMethod = null) {
      const numberCard = dataBooking.cardNumber;
      return `
        <div
          class="wrap-popup-payment-methods"
          style="
            --color-cur-primary: ${colorPrimary};
          "
        >
          <div class="header-popup-payment">
            <h2 class="title-payment text-uppercase">Payments</h2>
            <span class="popup-flow-countdown time-off"></span>
          </div>
          <div class="subtitle">
            <span class="subtitle-text">
              Choose your card
            </span>
            <span class="add-new-card-btn">
              <i class="fa-solid fa-plus"></i>
              Add new card
            </span>
          </div>
          <div class="payment-methods-list">
          ${numberCard && numberCard.map((item) => {

            return `
              <div data-id="${item.id}" class="payment-method-item">
                <div class="wrap-name-method">
                  <div class=""wrap-img-method>
                  </div>
                  <div class="name-numbercard">
                    <span class="name-method">
                      VISA
                    </span>
                    <span class="number-card">
                      ${maskCardNumber(item.last4)}
                    </span>
                  </div>
                </div>
                <div class="circle">
                  <div class="dot"></div>
                </div>
              </div>
            `
          }).join('')}
          </div>
          <div class="payment-summary">
            <div class="sub-deposit">
              <span class="sub-deposit-1r">
                Total
              </span>
              <span class="sub-deposit-1l">
                ${dataBooking.currencyDeposit + dataBooking.totalAmount}
              </span>
            </div>
            <div class="cur-deposit">
              <span class="sub-deposit-2r">
                Deposit
              </span>
              <span class="sub-deposit-2l">
                ${dataBooking.currencyDeposit + dataBooking.paymentDeposit}
              </span>
            </div>
          </div>
          <div class="button-container">
            <button class="btn-back-payment">Back</button>
            <button class="btn-next-payment" disabled>Confirm</button>
          </div>
        </div>
      `;
    }
    // Form xác nhận thanh toán
    function renderPaymentConfirmationForm(data = {}) {
      const {
        image = '/assets/images/payment-success/img-succes-payment.png',
        ticketNumber = '38538',
        dateTime = 'May 14, 2025 at 2:00PM',
        paymentMethodLabel = 'VISA',
        paymentMethodMasked = 'Xxx Xxx Xxx 4008',
        deposit = '60.00',
        remaining = '60.00',
        requestAnotherCount = 5
      } = data;

      return `
        <div class="wrap-popup-payment-confirmation"
          style="
            --color-cur-primary: ${typeof colorPrimary !== 'undefined' ? colorPrimary : '#39b54a'};
          "
        >
          <div class="confirm-grid">
            <!-- LEFT IMAGE -->
            <div class="confirm-left">
              <img src="${image}" alt="Salon image" class="confirm-image" />
            </div>

            <!-- RIGHT CONTENT -->
            <div class="wrap-confirm-right">
              <div class="confirm-right">
                <div class="wrap-top-payment-success">
                  <div class="check-circle" aria-hidden="true">
                    <svg class="check-svg" viewBox="0 0 64 64" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                      <!-- fill circle -->
                      <circle class="fill-circle" cx="32" cy="32" r="28" fill="var(--color-cur-primary)"></circle>

                      <!-- stroke circle for animated border (no fill) -->
                      <circle class="stroke-circle" cx="32" cy="32" r="28" fill="none" stroke="#2d8e45" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

                      <!-- check path -->
                      <path class="check-path" d="M20 34 L28 42 L44 24" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                  </div>
                  <div class="confirm-top-content">
                    <h2 class="confirm-title my-0">Appointment Is Requested</h2>
                    <p class="confirm-desc mb-0">Thank you for booking with us! Please wait while we confirm your appointment.</p>
                  </div>
                </div>

                <div class="divider"></div>
                <div class="apoint-remain">
                  <div class="appointment-rows">
                    <div class="row">
                      <div class="label">Ticket Number</div>
                      <div class="value">#${ticketNumber}</div>
                    </div>

                    <div class="row">
                      <div class="label">Date &amp; Time</div>
                      <div class="value">${dateTime}</div>
                    </div>

                    <div class="row">
                      <div class="label">Payment Method</div>
                      <div class="value payment-method">
                        <span class="pm-badge">${paymentMethodLabel}</span>
                        <span class="pm-text">${paymentMethodMasked}</span>
                      </div>
                    </div>

                    <div class="row">
                      <div class="label">Deposit Paid</div>
                      <div class="value">$${deposit}</div>
                    </div>
                  </div>

                  <div class="remaining-wrapper">
                    <div class="remaining-label">Remaining Balance</div>
                    <div class="remaining-amount">$${remaining}</div>
                  </div>
                </div>
                </div>
              <button class="btn-request-another text-uppercase">REQUEST ANOTHER APPOINTMENT (${requestAnotherCount})</button>
            </div>
          </div>

          <div class="dotted-sep" aria-hidden="true"></div>

          <div class="app-promo">
            <h3 class="promo-title">Experience Our App</h3>
            <p class="promo-desc">
              Conveniently manage all your appointments and gift cards with ease, and stay informed
              about upcoming offers from the salon through our app.
            </p>

            <div class="badges">
              <div class="google-badge">
                <div class="icon-gg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <g clip-path="url(#clip0_2870_30408)">
                      <path d="M24.4905 12.4761C24.4905 11.4929 24.4088 10.7753 24.2321 10.0312H12.7422V14.4692H19.4865C19.3506 15.5721 18.6163 17.2331 16.9846 18.3492L16.9617 18.4978L20.5946 21.248L20.8463 21.2725C23.1579 19.1863 24.4905 16.1169 24.4905 12.4761Z" fill="#4285F4"/>
                      <path d="M12.7372 24.1698C16.0413 24.1698 18.8152 23.1067 20.8413 21.2731L16.9796 18.3498C15.9462 19.054 14.5592 19.5456 12.7372 19.5456C9.50096 19.5456 6.75427 17.4596 5.77515 14.5762L5.63164 14.5881L1.85409 17.4449L1.80469 17.5791C3.81711 21.4856 7.95077 24.1698 12.7372 24.1698Z" fill="#34A853"/>
                      <path d="M5.7758 14.5758C5.51745 13.8317 5.36794 13.0343 5.36794 12.2106C5.36794 11.3867 5.51745 10.5895 5.76221 9.84537L5.75536 9.6869L1.93048 6.78418L1.80533 6.84235C0.97592 8.46345 0.5 10.2839 0.5 12.2106C0.5 14.1372 0.97592 15.9576 1.80533 17.5787L5.7758 14.5758Z" fill="#FBBC05"/>
                      <path d="M12.7372 4.87598C15.0351 4.87598 16.5852 5.84597 17.4691 6.65656L20.9228 3.36124C18.8017 1.43455 16.0413 0.251953 12.7372 0.251953C7.95077 0.251953 3.8171 2.93601 1.80469 6.84252L5.76156 9.84554C6.75427 6.96215 9.50096 4.87598 12.7372 4.87598Z" fill="#EB4335"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_2870_30408">
                        <rect width="24" height="24" fill="white" transform="translate(0.5 0.251953)"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="text-icon">
                  <span class="small">GET IT ON</span>
                  <span class="big">Google Play</span>
                </div>
              </div>
              <div class="app-badge">
                <div class="icon-app-store">
                  <img
                    src="/assets/images/payment-success/app-store.svg"
                    alt="Icon app store"
                    class="img-icon-appStore"
                  />
                </div>
                <div class="text-icon">
                  <span class="small">GET IT ON</span>
                  <span class="big">App Store</span>
                </div>
              </div>
            </div>

            <p class="legal">
              <p class="mb-0">
                Apple and the Apple logo are trademarks of Apple Inc.,
                registered in the U.S. and other countries.
              </p>
              <p class="mb-0">
                App Store is a service mark of Apple Inc.
              </p>
              <p class="mb-0">
                Google Play is a trademark of Google Inc.
              </p>
            </p>
          </div>
        </div>
      `;
    }

    // Form thêm thẻ mới
    function renderAddNewMethod() {
      return `
        <div class="wrap-popup-add-card"
          style="--color-cur-primary: ${colorPrimary};">
          <div class="header-popup-payment">
            <h2 class="title-payment text-uppercase">Payments</h2>
            <span class="popup-flow-countdown time-off"></span>
          </div>
          <div class="subtitle-card-new">
            <h3 class="subtitle">Add new card</h3>
          </div>
          <div id="form-add-card" class="wrap-form-group-card-new">
            <div class="form-group-card-new">
              <label>
                Card Holder Name
                <p class="mb-0">*</p>
              </label>
              <input
                type="text"
                id="card-holder-name"
                placeholder="Card Holder Name"
                data-type="${typeRequire.REQUIRED}"
              >
              <p class="error-message"></p>
            </div>
            <div class="form-group-card-new">
              <label>
                Card Number
                <p class="mb-0">*</p>
              </label>
              <input type="text" id="card-number" placeholder="Card Number">
              <p class="error-message"></p>
            </div>
            <div class="form-row-card-new">
              <div class="group-card-ex">
                <label>
                  MM/YY
                  <p class="mb-0">*</p>
                </label>
                <input
                  type="text"
                  id="card-expiry"
                  placeholder="MM/YY"
                  data-type="${typeRequire.REQUIRED}"
                >
                <p class="error-message"></p>
              </div>
              <div class="group-card-ccv">
                <label>
                  CVV2
                  <p class="mb-0">*</p>
                </label>
                <input
                  type="text"
                  id="card-cvv"
                  placeholder="CVV2"
                  data-type="${typeRequire.REQUIRED}"
                >
                <p class="error-message"></p>
              </div>
            </div>
            <div class="form-group-card-new">
              <label>
                Billing Address
                <p class="mb-0">*</p>
              </label>
              <input
                type="text"
                id="billing-address"
                placeholder="Billing Address"
                data-type="${typeRequire.REQUIRED}"
              >
              <p class="error-message"></p>
            </div>
            <div class="form-group-card-new">
              <label>
                Street
              </label>
              <input type="text" id="card-street" placeholder="Street">
            </div>
            <div class="form-group-card-new">
              <label>
                City
              </label>
              <input type="text" id="card-city" placeholder="City">
            </div>
            <div class="form-group-card-new">
              <label>
                State
              </label>
              <input type="text" id="card-state" placeholder="State">
            </div>
            <div class="form-group-card-new">
              <label>
                Zip
              </label>
              <input type="text" id="card-zip" placeholder="Zip">
            </div>
          </div>
          <div class="form-group-card-sub">
            <div class="checkbox-add-card">
              <div class="circle-add-card">
                <i class="fa-solid fa-check"></i>
              </div>
              <span>Save my card</span>
            </div>
          </div>
          <div class="button-container">
            <button class="btn-back-add-card">Back</button>
            <button class="btn-add-card">Add</button>
          </div>
        </div>
      `;
    }

    // Content popup upload image
    function renderPopupUpload(dataImages, isMobile) {

      const maxImages = 3;

      const imageSlots = Array.from({ length: maxImages }).map((_, index) => {
        const img = dataImages[index];
        const hasImg = !!img?.link;

        return `
          <div class="cover-input-img">
            <label class="upload-box">
              <i class="fa-solid fa-cloud-arrow-down"></i>
              <span class="text">
              ${hasImg ? 'Change image' :
                `
                  ${isMobile ?
                    `
                      <p class="text-click-to-upload">Image</p>
                    `
                    :
                    `
                      <p class="text-click-to-upload">Click to upload<p/>
                      <p> Or Drag and drop</p>
                    `
                  }
                `
              }</span>
              <img
                class="preview"
                src="${hasImg ? img.link : ''}"
                style="display: ${hasImg ? 'block' : 'none'};"
              />
              <div class="error-msg" style="display: none;">Error</div>
              <input type="file" accept=".png,.jpg,.jpeg,.svg">
            </label>
            ${hasImg ? `
              <div class="btn-action-img">
                <button class="remove-img">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>` : ''
            }
          </div>
        `;
      });

      return `
        <div class="popup-wrap-upload"
          style="
            --color-cur-primary: ${colorPrimary};
          "
        >
          <div class="title-upload">
            <h2>Upload photos</h2>
          </div>
          <div class="center-upload">
            <div class="wrap-img-represent">
              <img src="/assets/images/upload-represent/image-represent-upload.png" alt="Image represent upload"/>
            </div>
            <div class="desc-how-up">
              ${isMobile ?
                `
                <span>Choose your image</span>
                `
                :
                `
                  <span class="click-upload">
                    Click To Upload
                  </span>
                  <span class="drag-upload">
                    Or Drag And Drop
                  </span>
                `
              }
            </div>
            <div class="condi-img">
              <span class="name">
                <p>Png, </p>
                <p>Svg, </p>
                <p>Jpg </p>
              </span>
              <span class="max-size">
                Max File Size: 6Mb
              </span>
            </div>
          </div>
          <div class="wrap-list-img">
            <div class="container-list-img">
              ${imageSlots.join('')}
            </div>
          </div>
          <div class="wrap-action-btn">
            <div class="container-action-btn">
              <button class="cancel-upload">
                Cancel
              </button>
              <button class="save-upload">
                Save
              </button>
            </div>
          </div>
        </div>
      `
    }

  // Function render block element
  function renderBlockTemplate(dataBlock, isCopySameTime) {
    // Variable data block
    const { dataHeaderNav, advertises, banner,sideInfo, bannerProSelected, color  } = dataRelease;
    const {promotion, policy, storeInfo, socialLink, socialIcon} = sideInfo;

    const $wrapWeb = $('.wrap-home-templates');
    const htmlHeaderNav = renderNavHeaderTemplates(dataBlock.dataBooking, dataHeaderNav);
    const htmlAdvertise = renderAdvertisePage(advertises);
    const htmlBannerPage = renderBannerPage(banner);
    const htmlTimeBooking = renderTimeBooking(dataBlock.dataBooking, isCopySameTime);
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
    if (banner.optionBooked === 'GUESTS') {
      // Thay bằng data guest
      dataBooking.type = typeBookingEnum.GUESTS;
      dataBooking.users = dataGuest;

      // Default user đầu tiên isChoosing
      dataBooking.users[0].isChoosing = true;

      renderCountControls('.wrap-control', dataBooking);
      renderGuestInputs('.wrap-input-guests', dataBooking);
      $('.wrap-input-guests').removeClass('hidden');
    }
    // else if (banner.optionBooked === 'FAMILY') {
    //   // Thay bằng data family
    //   dataBooking.type = typeBookingEnum.FAMILY;
    //   dataBooking.users = dataFamily;

    //   // Default user đầu tiên isChoosing
    //   dataBooking.users[0].isChoosing = true;

    //   renderCountControls('.wrap-control', dataBooking);
    //   renderGuestInputs('.wrap-input-guests', dataBooking);
    //   $('.wrap-input-guests').removeClass('hidden');
    // }
    // init render list services
    renderListService(dataBlock.listDataService,'.list-more', dataBooking, dataSetting);
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
        bannerProSelected.image && $loShowbg.css({
          'background-image': `url("${bannerProSelected.image}")`,
          'justify-content': 'flex-start',
          padding: '24px 12px',
        });
    }
    // init render option booking
    renderBookingOption('.wrap-book-for', banner.btnOptionBook, banner.optionBooked);
  }

  // hàm chuyển đổi jsonToXLM
  function jsonToXml(obj, rootTag = "root") {
    function toXml(tag, val) {
      if (val == null) return `<${tag}></${tag}>`;

      // array -> lặp tag
      if (Array.isArray(val)) {
        return val.map(v => toXml(tag, v)).join("");
      }

      // object -> duyệt key
      if (typeof val === "object") {
        let attrs = "";
        let inner = "";

        // Đặc biệt với Detail: ApptIndex thành attribute
        if (tag === "Detail" && Object.prototype.hasOwnProperty.call(val, "ApptIndex")) {
          attrs += ` ApptIndex="${val.ApptIndex}"`;
        }

        for (const [k, v] of Object.entries(val)) {
          if (tag === "Detail" && k === "ApptIndex") continue; // đã lên attr
          inner += toXml(k, v);
        }

        return `<${tag}${attrs}>${inner}</${tag}>`;
      }

      // primitive
      return `<${tag}>${val}</${tag}>`;
    }

    // root: render từng key top-level đúng 1 lần, tránh lồng lặp
    const inner = Object.entries(obj).map(([k, v]) => toXml(k, v)).join("");
    return `<${rootTag}>${inner}</${rootTag}>`;
  }

  $(document).ready(async function () {
    const $wrapHomeTemp = $('.wrap-home-templates');
    const { dataBooking, getDataListDataService, getlistUserStaff, dataCart,dataMe, dataGuest, dataFamily } = templateStore.load();
    let listDataService;
    let listUserStaff;
    try{
      listDataService = await getDataListDataService();
    }catch(e){
      console.error('[const listDataService]', {
        message: e.message,
        stack: e.stack,
        name: e.name,
      })
    }
    try{
      listUserStaff = await getlistUserStaff();
    }catch(e){
      console.error('[const listUserStaff]', {
        message: e.message,
        stack: e.stack,
        name: e.name,
      })
    }
    // Lấy thông tin setting tiệm
    let dataSetting;
    let paymentDeposit;
    // to-do: Tham số trả trước, còn nhiều trường hợp chưa xử lý
    let isDeposit;
    // Tham số đơn vị tiền tệ : $, VNĐ, ...
    let currencyDeposit;
    // Tham số html chính sách điều khoản booking
    let policySetting;
    // Tham số cho phép chọn nhiều thợ
    let isBookMultipleTech = true;

    try {
      const rcvNo = 336;
      const resSetting = await fetchAPI.get(`/api/store/getsettingonlinebook?RVCNo=${rcvNo}`);
      dataSetting = resSetting?.data;
      policySetting = dataSetting.Policy;

      const DepositData = dataSetting.Deposit;
      const parts = DepositData.split('|');
      isDeposit = parts[0] === "1";
      currencyDeposit = parts[1];
      paymentDeposit = parts[2];
      dataBooking.currencyDeposit = currencyDeposit;
      dataBooking.paymentDeposit = paymentDeposit;
      isBookMultipleTech = dataSetting.BookMultipleTech === "1";

    }catch(e){
      console.error('[const resSetting]', {
        message: e.message,
        stack: e.stack,
        name: e.name,
      })
    }

    let {banner} = dataRelease;
    // Khai báo currentUserId trước khi gọi renderBlockTemplate
    let currentUserId = dataBooking.users[0]?.id || 1;
    // fake time , sẽ xử lý thêm close form
    let resendCountdown = 59;
    let resendInterval;
    let fieldEntered;
    // Biến xử lý chọn ngày đặt lịch
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = new Date();
    let selectedDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const fakeDataCalender = {
      8: [8, 9, 10, 12, 20, 22] // August: non-working days
    };

    // hiện nút scroll
    let forceShowScrollBtn = false;
    const $mainScrollBtn = $('.scroll-btn-main');
    // Biến local copySameTime
    let isCopySameTime = true

    // Kiểm tra mobile
    const isMobile = $(window).width() <= 768;

    // biến countdown interval
    let popupFlowCountdownInterval = null;
    let popupFlowRemaining = 0;

    function formatTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}:${s < 10 ? '0' + s : s}`;
    }
    function startPopupFlowCountdown(seconds = 1800) {
      popupFlowRemaining = seconds;

      // clear nếu đang chạy
      if (popupFlowCountdownInterval) {
        clearInterval(popupFlowCountdownInterval);
      }

      updatePopupFlowCountdownUI(popupFlowRemaining);

      popupFlowCountdownInterval = setInterval(() => {
        popupFlowRemaining--;

        updatePopupFlowCountdownUI(popupFlowRemaining);

        if (popupFlowRemaining <= 0) {
          clearInterval(popupFlowCountdownInterval);
          popupFlowCountdownInterval = null;

          // hết giờ -> đóng tất cả popup
          closePopupContainerTemplate();
        }
      }, 1000);
    }
    function updatePopupFlowCountdownUI(remaining) {
      const $countdown = $('.popup-flow-countdown');
      if ($countdown.length) {
        $countdown.text(formatTime(remaining));
      }
    }

    renderBlockTemplate({
      listDataService, listUserStaff,
      dataBooking,dataMe,  dataGuest, dataFamily,
      currentUserId, isCopySameTime, dataSetting
    });

    // Các sự kiện tương tác trên header
      // << START: dropdown option header
        // Đóng mở dropdown
        $(document).on('click', '.nav-item-with-dropdown > .option', function(e){
          e.stopPropagation();

          const $parent = $(this).closest('.nav-item-with-dropdown');

          // Ẩn các dropdown khác
          $('.nav-item-with-dropdown').not($parent).removeClass('open').find('i').removeClass('rotate-transition rotate-180');

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
          let width = 720;
          let height = 620;
          if(isMobile){
            width = '100%'
          }
          const isItemOrder = dataBooking.users.some((user) =>
            user.services.some((service) =>
              service.itemService.length > 0
          ))
          // Nếu có item service được chọn
          if(isItemOrder){
            dataCart.order = dataBooking.users.map((user) => {
              return user.services.map((service) => {
                return service.itemService;
              })
            }).flat(Infinity);
          }
          const htmlPopupCartContent = renderCartContent(dataCart, dataBooking.currencyDeposit);
          const html = renderBasePopup(htmlPopupCartContent, false, height, width);
          $wrapHomeTemp.append(html);

          setTimeout(() => {
            $('.overlay-screen').addClass('show');
          }, 10);
        });
        // Đóng popup cart
          // 1. Đóng / persitent khi click overlay-screen
            $wrapHomeTemp.on('click', '.overlay-screen', function (e) {
              const $this = $(this);
              const $popupContainerTemplate = $this.find('.popup-container-template');
              const isPersit = $this.hasClass('persistent');
              if(e.target === this && isPersit){
                shakeError($popupContainerTemplate);
              }
              else if (e.target === this) closePopupContainerTemplate();
            });
          // 2. Đóng khi click btn 'back'
            $wrapHomeTemp.on('click', '.btn-back-order', function () {
              closePopupContainerTemplate();
            });

          // 3. Đóng khi click btn close 'x'
            $wrapHomeTemp.on('click', '.btn-closepopup', function () {
              closePopupContainerTemplate();
            });
          // 4. Function animation đóng popup cart
            function closePopupContainerTemplate() {
              const $overlay = $('.overlay-screen');
              $overlay.removeClass('show'); // remove class để thu nhỏ

              setTimeout(() => {$overlay.remove()}, 300); // chờ animation xong mới xóa DOM
            }
          //Login
          $(document).on('click', '#sign-in', function() {
            // Verify trước khi gán dataBooking.users cho dataFamily
            const htmlVerifyEmailPhone = renderVerifyEmailPhoneContent();
            let height = 620;
            let width = 560;
            if(isMobile) {
              height = 620;
              width = '100%';
            }
            // const persistent = true;
            const html = renderBasePopup(htmlVerifyEmailPhone, false, height, width);
            $wrapHomeTemp.append(html);
            setTimeout(() => {
              $('.overlay-screen').addClass('show');
            }, 10);
          })
      // >> END: popup cart
      // << START: popup verify user

      // >> END: popup verify user
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
          if (selectedType === typeBookingEnum.GUESTS){
            dataBooking.type = typeBookingEnum.GUESTS;
            dataBooking.users = dataGuest;
            dataBooking.users[0].isChoosing = true;
          }
          if (selectedType !== typeBookingEnum.ME) {
            dataBooking.type = selectedType;
            // Verify trước khi gán dataBooking.users cho dataFamily
            // const htmlVerifyEmailPhone = renderVerifyEmailPhoneContent();
            // let height = 620;
            // let width = 560;
            // if(isMobile) {
            //   height = 620;
            //   width = '100%';
            // }
            // const persistent = true;
            // const html = renderBasePopup(htmlVerifyEmailPhone, false, height, width);
            // $wrapHomeTemp.append(html);
            // setTimeout(() => {
            //   $('.overlay-screen').addClass('show');
            // }, 10);
            // Vì chưa đăng nhập nên dataFamily khởi tạo là một mảng users:[]
            const tempData = [
                {
                  id: 1,
                  firstName: '',
                  lastName: '',
                  phoneNumber: '',
                  email: '',
                  gender: genderEnum.MALE,
                  services: [

                  ],
                  selectedDate: null,
                  selectedTimeSlot: null,
                  isSelecting: false,
                  isChoosing: true,
                },
                {
                  id: 2,
                  firstName: '',
                  lastName: '',
                  phoneNumber: '',
                  email: '',
                  gender: genderEnum.MALE,
                  services: [

                  ],
                  selectedDate: null,
                  selectedTimeSlot: null,
                  isSelecting: false,
                  isChoosing: false,
                },
              ]
            dataBooking.users = tempData;
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
          renderListService(listDataService, '.list-more', dataBooking);

        });
        // Tăng số lượng khách
        $(document).on('click', '.btn-increase', function() {
          // max guest 6
          if(dataBooking.users.length >=6) return;
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
          updateGuestSection();
        });

        // Xóa từng input
        $(document).on('click', '.btn-remove', function() {
          const $inpWrap = $(this).closest('.guest-input');
          const id = +$inpWrap.data('id');

          if (dataBooking.users[0].id === id) {
            alert('Không thể xoá người dùng này!');
            return;
          }
          const index = dataBooking.users.findIndex(i => i.id === id);
          const obj = dataBooking.users[index];
          const nearestLeftUser = dataBooking.users[index - 1];
          dataBooking.users = dataBooking.users.filter(i => i.id !== id);

          nearestLeftUser.isChoosing = true;
          updateGuestSection();
          renderSumary(dataBooking, listDataService);
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
              // check show scroll service || timming
              const isShowSroll = checkValInputs(['#firstname-banner', '#lastname-banner','#emailPhone-banner']);
              isShowSroll && showScrollToTarget(dataBooking);
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
              // check show scroll service || timming
              const isShowSroll = checkValInputs(['#firstname-banner', '#lastname-banner','#emailPhone-banner']);
              isShowSroll && showScrollToTarget(dataBooking);
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
              // check show scroll service || timming
              const isShowSroll = checkValInputs(['#firstname-banner', '#lastname-banner','#emailPhone-banner']);
              isShowSroll && showScrollToTarget(dataBooking);
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
          // BLUR phone&email banner
          function validateEmailPhoneInputBanner($input) {

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
          // BLUR phone&email
          function validateEmailPhoneInput($input) {
            const val = $input.val().trim();
            const $error = $input.siblings('.error-message');

            const isPhone = isValidPhoneNumber(val);
            const isEmail = isValidEmail(val);

            if (val === '') {
              $input.addClass('is-invalid');
              $error.text('Email or phone is required.');
              shakeError($error);
            } else if (val !== '' && !isPhone && !isEmail) {
              $input.addClass('is-invalid');
              $error.text('Email or phone is incorrect format.');
              shakeError($error);
            } else {
              $input.removeClass('is-invalid');
              $error.text('');
            }
            if(isPhone) return "PHONE";
            if(isEmail) return "EMAIL";
            return;
          }
          // Check phone form register blur
          function validatePhoneFormRegister($input) {
            const val = $input.val().trim();
            const isPhone = isValidPhoneNumber(val);

            if(isPhone) {
              const $errorMs = $input.next('.error-message')
              $errorMs.text('');
            }else if(val === ''){
              showInputError($input, `Phone is required`, true);
            }else if(!isPhone) {
              showInputError($input, `Phone is incorrect format!`, true);
            }
          }
          // Check email form register
          function validateEmailFormRegister($input) {
            const val = $input.val().trim();
            const isMail = isValidEmail(val);

            if(isMail) {
              const $errorMs = $input.next('.error-message')
              $errorMs.text('');
            }else if(val === ''){
              showInputError($input, `Email is required`, true);
            }else if(!isMail) {
              showInputError($input, `Email is incorrect format!`, true);
            }
          }

        // input firstName và blur
        $(document).on('input blur', '#firstname-banner', function () {
          validateFirstNameInput($(this));
        });
        $(document).on('input blur', '#lastname-banner', function () {
          validateLastNameInput($(this));
        });

        $(document).on('blur', '#emailPhone-banner', function () {
          validateEmailPhoneInputBanner($(this));
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

          // Kiểm tra nếu là user đầu tiên, buộc nhập đủ
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
          // Kiểm tra đã chọn service và time slot chưa và show button scroll target
          const isShowScrollTarget = showScrollToTarget(dataBooking);
          if(isShowScrollTarget){
            if($('.scroll-btn-main').is(':visible')){
              shakeError($('.scroll-btn-main'));
            }
            $this.blur();
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
            // Cập nhật input fullname
            $this.val(nextNameUser);
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
          renderListService(listDataService, '.list-more', dataBooking);

          // render lại timming để cập timming đã chọn
          renderContainerTiming(
            dataBooking, currentDate, monthNames,
            dayNames, currentMonth, currentYear,
            fakeDataCalender, nextUser.selectedDate || selectedDate,
            listDataService,
            isCopySameTime,
          );
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

        // Cập nhật lại isSelecting của user đang được chọn
        const userCurSelecting = dataBooking.users.find((user) => user.isSelecting);
        if(userCurSelecting){
          userCurSelecting.isSelecting = false;
        }

        // Cập nhật user được chọn copy trong dataUser
        const userSelected = dataBooking.users.find((u) => u.id === idUserSelected);
        userSelected.isSelecting = true;
        // Thêm selected vào btn-option-copy-user
        $('.btn-option-copy-user').addClass('selected');
        // render lại
        const optionCopyService = {dataUser: dataBooking.users}
        renderCopyServiceBtn('.copy-btn-wrapper')
        renderCopyServiceOption('.copy-options-wrapper',optionCopyService);

        // render lại timming để cập nút copy
        renderContainerTiming(
          dataBooking, currentDate, monthNames,
          dayNames, currentMonth, currentYear,
          fakeDataCalender, selectedDate,
          listDataService,
          isCopySameTime,
        );
      })
      // Copy service
      $(document).on('click', '.btn-copy-service', function () {
        // to-do: chỉ copy service, sau đó scroll chọn thợ next availble, mặc định gán thợ 9999
        const userChoosing = dataBooking.users.find((u) => u.isChoosing);
        const userSelectedCopy = dataBooking.users.find((u) => u.isSelecting);

        // copy service
        if(userChoosing !== userSelectedCopy) {
          userChoosing.services = JSON.parse(JSON.stringify(userSelectedCopy.services));
        }
        // kiểm tra nếu action copy datetime on thì copy cả timming
        if(isCopySameTime){
          userChoosing.selectedDate = JSON.parse(JSON.stringify(userSelectedCopy.selectedDate));
          userChoosing.selectedTimeSlot = JSON.parse(JSON.stringify(userSelectedCopy.selectedTimeSlot));
        }
        // upadate lại list service
        renderListService(listDataService, '.list-more', dataBooking);

        // render lại timming để show timming vừa copy
        renderContainerTiming(
          dataBooking, currentDate, monthNames,
          dayNames, currentMonth, currentYear,
          fakeDataCalender, userChoosing.selectedDate,
          listDataService,
          isCopySameTime
        );

        const isFinalBooking = showScrollToFinalBooking(dataBooking);
        isFinalBooking && updateScrollButton({
          target: '#section-booking',
          trigger: '#trigger-booking',
          triggerBanner: '#triggerBlockSumary',
          text: 'Continue Booking',
          icon: 'fa fa-hand-pointer down',
          force: false
        });

        // render lại sumary
        renderSumary(dataBooking, listDataService);
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
      // Kiểm tra có thợ nào được chọn chưa
      function techSelect(dataBooking) {
        const userChoosing = dataBooking.users.find((user) => user.isChoosing);
        const services = userChoosing.services;
        const findTechOnly = services.find((ser) => {
          return ser.itemService.find((itemSer) => {
            return itemSer && itemSer.selectedStaff && itemSer.selectedStaff.employeeID !== idStaffDefault;
          })
        })
        return findTechOnly;
      }
    $(document).on('click', '.add-more .btn-add-more', async function () {
      const $this = $(this);
      const $card = $this.closest('.card-more');

      /*
        @Author: NK.Toan 22/8/2025
        - Thêm staff id defult vào user trong trường hợp cho phép chọn nhiều thợ
        - Trường hợp chỉ chọn 1 thợ (isBookMultipleTech === false) thì kiểm tra trong dataBooking userChoosing đã chọn thợ chưa,
        nếu đã chọn thợ thì mặc định chọn thợ đó cho các service sau
      */
     console.log("dataBooking :")
     if(!isBookMultipleTech) {
      const techOnly = techSelect(dataBooking);
      console.log("techOnly: ", techOnly);
     }

      const staffSelecting = listUserStaff.find((st) => st.employeeID == idStaffDefault);
      const idService = $this.closest('.more-item').data('id');
      const idItemService = $card.data('id');
      const userChoosing = dataBooking.users.find((u) => u.isChoosing === true);

      // nếu khong tìm thấy idService trong userChoosing thì thêm mới
      let serviceExit = userChoosing.services.find((item) => item.idService === idService);
      let serviceItemExit = serviceExit && serviceExit.itemService.find(item => item.idItemService ===idItemService);

      // lấy thông tin service vừa chọn
      const serviceSelected = listDataService.find(({item}) => item.id == idService)?.item;
      const itemSelected = serviceSelected && serviceSelected.listItem.find((is) => is.id === idItemService);

      if (serviceExit) {
        if (serviceItemExit) {
          serviceItemExit.selectedStaff = staffSelecting;
        } else {
          serviceItemExit = {
            idItemService,
            title: itemSelected.title,
            duration: itemSelected.timetext,
            price: itemSelected.priceRental,
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
              title: itemSelected.title,
              duration: itemSelected.timetext,
              price: itemSelected.priceRental,
              selectedStaff: staffSelecting
            }
          ]
        };
        userChoosing.services.push(serviceExit);
      }

      // const timeDuraSer = $card.find('#service-duration').data('value');
      // const frameTimeFree = await fetchAPI.get(`/api/appointment/gettimebookonline?date=08/19/2025&duration=${timeDuraSer}&rvcno=336&empID=${staffSelecting.employeeID}`)

      const $action = renderActionButtons(idService, idItemService, dataBooking);
      $card.find('.add-more').replaceWith($action);
      // to-do : will

      updateGuestSection(); // Cập nhật để hiển thị nút Copy Service

      // show nút scroll to choose time-slots nếu chưa chọn time-slots
      if(!userChoosing.selectedDate || !userChoosing.selectedTimeSlot){
        updateScrollButton({
          target: '#section-date-time',
          trigger: '#trigger-date-time',
          triggerBanner: '#triggerBlockSumary',
          text: 'Select Date & Time',
          icon: 'fa fa-hand-pointer down',
          force: false
        });
      }else {
        const isFinalBooking = showScrollToFinalBooking(dataBooking);
        isFinalBooking && updateScrollButton({
          target: '#section-booking',
          trigger: '#trigger-booking',
          triggerBanner: '#triggerBlockSumary',
          text: 'Continue Booking',
          icon: 'fa fa-hand-pointer down',
          force: false
        });
      }

      // update calander
      // selectedDate = (userChoosing.selectedDate);
      // renderTimeSlotsForDate(selectedDate, dataBooking, listDataService);
      renderServiceTechCombo(dataBooking, listDataService);

      // update cart user
      const $cardUser = $('.cart-user');
      const htmlCartUser = renderCartUser(dataBooking, dataRelease.dataHeaderNav);
      $cardUser.empty();
      $cardUser.append(htmlCartUser);

      //Cập nhật table booking
      renderSumary(dataBooking, listDataService);
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
    $(document).on('click', '.add-more .btn-delete', function () {
      const $this = $(this);

      const $wrapListMore = $this.closest('.wrap-list-more');
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

      const serviceDeleteIndex = userSelecting.services.findIndex(se => se.idService == idService);
      const serviceDelete = userSelecting.services.find((s) =>s.idService == idService);

      if (serviceDelete && serviceDelete.itemService) {
        serviceDelete.itemService = serviceDelete.itemService.filter(is => is.idItemService != idItemService);
      }
      // Kiểm tra xoá hết item service thì xoá service
      if(serviceDelete.itemService.length === 0) {
        userSelecting.services.splice(serviceDeleteIndex, 1);
      }

      const $action = renderActionButtons(idService, idItemService, dataBooking);
      $card.find('.add-more').replaceWith($action);

      // re-render list add on
      const $wrapAddOn = $wrapListMore.find(`.wrap-addOn[data-id=${idService}]`);
      const dataItem = listDataService.find(({item}) => item.id === idService);
      // Kiểm tra idItemService có khớp data-id của wrap-list-addOn không
      const $wrapListAddOn = $wrapAddOn.find(`.wrap-list-addOn[data-id=${idItemService}]`);
      if($wrapListAddOn.length > 0){
        const newListAddOn = renderListAddOn(dataItem.item, idItemService,dataBooking);
        $wrapAddOn.replaceWith(newListAddOn);
      }
      // Nếu xoá hết service đã chọn xoá nút scroll continue booking
      if(userSelecting.services.length === 0){
        $mainScrollBtn.fadeOut();
      }

      // re-render sumary
      renderSumary(dataBooking, listDataService);
    });
    // select option user
    $(document).on('click', '.wrap-select-user .toggle-select', function (e) {
      e.stopPropagation();

      // lấy danh sách thợ phù hợp

      const $this = $(this);
      const $parentN = $this.closest('.wrap-select-user');
      const $iconDown = $this.find('i');
      $iconDown.toggleClass('rotate-180');

      const $wrap = $this.closest('.card-more');
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
      const toggleWidth = $this.outerWidth();
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
        height: 300 + 'px',
        overflowY: 'scroll',
      });

      // Toggle hiển thị
      $optionList.toggleClass('show');
    });
    // search staff
    $(document).on('click', '.search-staff-input', function (e) {
      e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
    });
    $(document).on('keyup', '.search-staff-input', function (e) {
      e.stopPropagation()
      const searchText = $(this).val().toLowerCase();
      const $wrap = $(this).closest('.option-select-staff');

      $wrap.find('.item-staff').each(function () {
        const name = $(this).find('.full-name').text().toLowerCase();
        $(this).toggle(name.includes(searchText));
      });
    });
    // touch out close option staff
    $(document).on('click', function () {
      const $optionList = $(this).find('.option-select-staff');
      $optionList.empty();
      $('.option-select-staff').removeClass('show');
    });
    // gắn staff selected cho user
    $(document).on('click', '.item-staff', function (e) {
      e.stopPropagation();
      const $this = $(this);
      const idStaff = $this.data('id');

      const staffSelecting = listUserStaff.find((st) => st.employeeID == idStaff);
      const idService = $this.closest('.more-item').data('id');
      const idItemService = $this.closest('.card-more').data('id');

      const userChoosing = dataBooking.users.find((u) => u.isChoosing === true);

      // nếu khong tìm thấy idService trong userChoosing thì thêm mới
      let serviceExit = userChoosing.services.find((item) => item.idService === idService);
      let serviceItemExit = serviceExit && serviceExit.itemService.find(item => item.idItemService ===idItemService);

      // lấy thông tin service vừa chọn
      const serviceSelected = listDataService.find(({item}) => item.id == idService)?.item;
      const itemSelected = serviceSelected && serviceSelected.listItem.find((is) => is.id === idItemService);
      // Phòng trường hợp cho chọn thợ ngay khi bấm +, tạm để logic
      if (serviceExit) {
        if (serviceItemExit) {
          serviceItemExit.selectedStaff = staffSelecting;
        } else {
          serviceItemExit = {
            idItemService,
            price: itemSelected.priceRental,
            duration: itemSelected.timetext,
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
              price: itemSelected.priceRental,
              duration: itemSelected.timetext,
              selectedStaff: staffSelecting
            }
          ]
        };
        userChoosing.services.push(serviceExit);
      }

      const name = $(this).find(".full-name").text();
      const $wrap = $(this).closest('.card-more');

      $wrap.find('#full-name-selected').text(name);
      $wrap.find('.option-select-staff').removeClass('show');

      updateGuestSection(); // Cập nhật để hiển thị nút Copy Service

      // show nút scroll to choose time-slots nếu chưa chọn time-slots
      if(!userChoosing.selectedDate || !userChoosing.selectedTimeSlot){
        updateScrollButton({
          target: '#section-date-time',
          trigger: '#trigger-date-time',
          triggerBanner: '#triggerBlockSumary',
          text: 'Select Date & Time',
          icon: 'fa fa-hand-pointer down',
          force: false
        });
      }

      // update calander
      // selectedDate = (userChoosing.selectedDate);
      // renderTimeSlotsForDate(selectedDate, dataBooking, listDataService);
      renderServiceTechCombo(dataBooking, listDataService);


      //Cập nhật table booking
      renderSumary(dataBooking, listDataService);
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

      const newListAddOn = renderListAddOn(dataItem.item, childId, dataBooking, !isExpanded);

      $wrapAddOn.replaceWith(newListAddOn);

      if(!isExpanded) {
        const $addOn = $(`[data-id=${dataId}].wrap-addOn .expand-addOn`);
        $addOn.addClass('expanded');
        $addOn.find('i').addClass('rotate-180')
      }
    })
    // selected add-on option
    $(document).on('click', '.item-addOn', function () {
      const $this = $(this);
      const $wrapListAddOn = $this.closest('.wrap-list-addOn');
      const $checkboxAddOn = $this.find('.checkbox-addOn');

      const idService = $this.closest('.more-item').data('id');
      const idItemService = $wrapListAddOn.data('id'); // id card-more
      const idItemAddOn = $this.data('id');

      const serviceCur = listDataService.find(({ item }) => item.id == idService)?.item;
      const itemService = serviceCur?.listItem.find((item) => item.id == idItemService);

      const itemAddOn = itemService?.listOptionAddOn.find((item) => {
        return item.id == idItemAddOn;
      });

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
          title: itemService.title,
          price: itemService.priceRental,
          duration: itemService.timetext,
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
      const index = itemServiceInUser?.optionals.findIndex((opt) => opt.id === itemAddOn.id);

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
      const $wrapListMore = $this.closest('.wrap-list-more');
      const $cardMore = $wrapListMore.find(`.card-more[data-id="${idItemService}"]`);
      $cardMore.find('.add-more .btn-add-more').trigger('click');
      // Cập nhật sumary
      renderSumary(dataBooking, listDataService);
    });
    // Xử lý onChange input appointment-input
    $(document).on('input', '#appointment-input', function() {
      const $this = $(this);
      let val = $this.val().trim();
      const $error = $this.siblings('.error-message');

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
      // clear input #appointment-input
      $(document).on('click', '.clear-icon', function(){
        const $inputAppt = $('#appointment-input');
        $inputAppt.val('');
        clearInputError($inputAppt);
        $inputAppt.focus();
      })

      // Cập nhật lỗi
      if (val === '') {
        $this.addClass('is-invalid');
        $error.text('Email or phone is required.');
        // $('.btn-next-emailPhone').prop('disabled', true)
      } else if (val !== '' && !isPhone && !isEmail) {
        $this.addClass('is-invalid');
        $error.text('Email or phone is incorrect format.');
        // $('.btn-next-emailPhone').prop('disabled', true)
      } else {
        $this.removeClass('is-invalid');
        $error.text('');
        // Cho phép next
        $('.btn-next-emailPhone').prop('disabled', false)
      }

    })
    // Xử lý blur input apointment-input
    $(document).on('blur', '#appointment-input', function() {
      const $this = $(this);
      const res = validateEmailPhoneInput($this);
      if(res ==="EMAIL") {
        dataBooking.users[0].email = $this.val();
      }else if(res === "PHONE"){
        dataBooking.users[0].phoneNumber = $this.val();
      }else {
        // $('.btn-next-emailPhone').prop('disabled', true)
      }
    })
    // Build payload locktime
    function buildLocktimePayload(user) {
      const payloads = [];

      user.services.forEach(service => {
        service.itemService.forEach(item => {
          const staff = item.selectedStaff;
          if (!staff || !staff.employeeID) return;

          // start time
          const startMoment = moment(
            `${staff.selectedDate} ${staff.selectedTimeSlot}`,
            "MM/DD/YYYY HH:mm"
          );

          // tính tổng duration
          let totalDuration = item.duration || 0;
          if (item.optionals && item.optionals.length > 0) {
            totalDuration += item.optionals.reduce(
              (sum, opt) => sum + (opt.timedura || 0),
              0
            );
          }

          // end time
          const endMoment = startMoment.clone().add(totalDuration, "minutes");

          // build payload
          const payload = {
            EmployeeID: staff.employeeID.toString(),
            FromTime: startMoment.format("MM-DD-YYYY hh:mm A"),
            EndTime: endMoment.format("MM-DD-YYYY hh:mm A"),
            Key: `${user.id}|${moment().utc().format("MMDDYYYYhhmmss")}`,
            RVCNo: "336"
          };

          payloads.push(payload);
        });
      });

      return payloads;
    }

    // Hàm dùng để gửi OTP (email hoặc phone)
    async function sendOTP(inputValue, type) {
      if (type == typeInput.PHONE) {
        const phoneFormatVerify = inputValue;
        dataBooking.users[0].phoneNumber = phoneFormatVerify;
        dataBooking.users[0].email = '';

        try {
          const phoneUnformat = unFormatPhoneNumber(phoneFormatVerify);
          const resVerifyAccount = await fetchAPI.get(`/api/client/getcustomerfamily?RVCNo=336&key=${phoneUnformat}&ismail=false`);
          if (resVerifyAccount.status === 201 || resVerifyAccount.status === 202) {
            // chưa verify, cần gửi OTP
            return await fetchAPI.get(`/api/user/verifycode?phone=${phoneUnformat}&portalCode=${encodeURIComponent('+84')}&isMail=false`);
          }
          else if (resVerifyAccount.status === 200) {
            // tồn tại và verified
            // Xử lý khi typeBooking đang là GUEST hay FAMILY
            // Chưa có data FAMILY, tạm thời xử lý GUEST
            const typeBooking = dataBooking.type;

            dataBooking.users[0] = {
              ...dataBooking.users[0],
              email: resVerifyAccount?.data[0]?.email,
              phoneNumber: resVerifyAccount?.data[0]?.contactPhone,
              firstName: resVerifyAccount?.data[0]?.firstName,
              lastName: resVerifyAccount?.data[0]?.lastName,
              id: resVerifyAccount?.data[0]?.customerID,
              rcpCustomer: resVerifyAccount?.data[0]?.rcpCustomer,
              isChoosing: true,
              isVerify: true,
            };

            currentUserId = dataBooking.users[0].id;

            if(typeBooking === typeBookingEnum.GUESTS){
              // Add thêm 1 Guest rỗng
              $('.btn-increase').trigger('click');
            }

            // lấy listcard authorized tại đây
            const owner = dataBooking.users[0];
            const customerID = owner.id;
            const rcpCustomer = owner.rcpCustomer

            // locktime thợ đã chọn
            for(const user of dataBooking.users){
              const listPayload = buildLocktimePayload(user);
              for (const payload of listPayload) {
                try {
                  await fetchAPI.post("/api/appointment/createlocktime", payload);
                }catch(e) {
                  console.error("[sendOTP - locktime tech]", payload, e);
                }
              }
            }

            // get list card authorized
            try {
              const listCardAuthorized = await fetchAPI.post(`/api/card/getlistcardauthorize?RCPCustomer=${rcpCustomer}&CustomerID=${customerID}&RVCNo=336&TypeAuthorize=1`)
              if(listCardAuthorized.data) dataBooking.cardNumber = listCardAuthorized.data;
              else return;
            }catch(e){
              console.error('[sendOTP - list card authorized]', e.error);
            }

            const contentPolicies = renderPoliciesForm(policySetting);
            let height = 768;
            let width = 886;
            if(isMobile) {
              height = 700;
              width = '100%'
            }
            const persistent = true;
            const html = renderBasePopup(contentPolicies, persistent, height, width);

            $wrapHomeTemp.append(html);
            // count downtime
            if (!popupFlowCountdownInterval) {
              startPopupFlowCountdown(1800);
            }

            setTimeout(() => {
              $('.overlay-screen').addClass('show');
            }, 10);

            if (dataBooking.type !== typeBookingEnum.ME) {
              $('.wrap-input-guests').removeClass('hidden');
              updateGuestSection();
            }

            $('.wrap-advertise-page').css({ display: 'none' });
            return null; // Không cần OTP nữa
          }
        }catch(e){
          console.error('[sendOTP]: error', {
            message: e.message,
            stack: e.stack,
            name: e.name,
          })
        }
      }
      else if (type == typeInput.EMAIL) {
        dataBooking.users[0].phoneNumber = '';
        dataBooking.users[0].email = inputValue;
        try {
          return await fetchAPI.get(`/api/user/sendotplogin?RVCNo=336&phone=${inputValue}&isMail=true`);
        }catch(e) {
          console.error('[sendOTP]', {
            message: e.message,
            stack: e.stack,
            name: e.name,
          })
        }
      }
    }

    // Xử lý sự kiện cho next verify
    $(document).on('click', '.btn-next-emailPhone', async function () {
      const $appointInput = $('#appointment-input');
      const res = validateEmailPhoneInput($appointInput);
      if (!res) return;

      const value = $appointInput.val();
      const resVerifyGetOtp = await sendOTP(value, res);

      if (resVerifyGetOtp && resVerifyGetOtp.status === 200) {
        const emailPhoneMasked = (res === "EMAIL" ? dataBooking.users[0].email : dataBooking.users[0].phoneNumber);
        const htmlVerifyEmailPhoneMasked = renderVerifyCodeContent(emailPhoneMasked);

        const persistent = true;
        let height = 620, width = 560;
        if (isMobile) {
          height = 620;
          width = '100%';
        }

        const html = renderBasePopup(htmlVerifyEmailPhoneMasked, persistent, height, width);
        $wrapHomeTemp.append(html);

        setTimeout(() => {
          $('.overlay-screen').addClass('show');
          $('.otp-box[data-index="0"]').focus();
        }, 20);

        resendCountdown = 59;
        startResendTimer();
      }else{
        console.log("! status 200")
      }

    });
    // resent verify otp
    $(document).on('click', '.resent-btn', async function () {
      const { email, phoneNumber } = dataBooking.users[0];
      const type = email ? "EMAIL" : "PHONE";
      const value = email || phoneNumber;

      const resVerify = await sendOTP(value, type);

      if (resVerify && resVerify.status === 200) {
        resendCountdown = 59;
        startResendTimer();
      }
    });


    // Xử lý back popup back
    $(document).on('click', '.btn-back-emailPhone', function () {
      dataBooking.users[0].email = '';
      dataBooking.users[0].phoneNumber = '';
      closePopupContainerTemplate();
      // reset optionBooked = ME
      renderBookingOption('.wrap-book-for', banner.btnOptionBook, typeBookingEnum.ME);
    })
    // Auto focus và chuyển sang ô tiếp theo
    $(document).on('input', '.otp-box', function () {
      const $this = $(this);
      const val = $this.val();
      const index = parseInt($this.data('index'), 10);

      if (val.length === 1) {
        $(`.otp-box[data-index="${index + 1}"]`).focus();
      }

      // Nếu đủ 6 ô thì bật nút Verify
      const allFilled = $('.otp-box').toArray().every(input => $(input).val().length === 1);
      $('.btn-next-verify').prop('disabled', !allFilled);
    });
    function getOtpCode() {
      return $('.otp-box')
        .toArray()
        .map(input => $(input).val())
        .join('');
    }
    // Cho phép back bằng phím <-
    $(document).on('keydown', '.otp-box', function (e) {
      const $this = $(this);
      const index = parseInt($this.data('index'), 10);

      if (e.key === 'Backspace' && !$this.val()) {
        $(`.otp-box[data-index="${index - 1}"]`).focus();
      }
    });
    // next verify code
    function nextFormRegister(dataBooking) {
      const user = dataBooking.users[0];
      const dataRegis = {};
      if (user.email?.trim()) {
        fieldEntered = typeInput.EMAIL;
        dataRegis.email = user.email.trim();
        user.phoneNumber = '';
        user.firstName = '';
        user.lastName = '';
      } else if (user.phoneNumber?.trim()) {
        fieldEntered = typeInput.PHONE;
        dataRegis.phoneNumber = user.phoneNumber.trim();
        user.email = '';
        user.firstName = '';
        user.lastName = '';
      }

      const htmlFormRegis = renderRegisterForm(dataRegis, fieldEntered);
      const persistent = true;
      let height = 762;
      let width = 886;
      if(isMobile) {
        height = 800;
        width = '100%';
      }
      const html = renderBasePopup(htmlFormRegis, persistent, height, width);
      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
      document.getElementById("phone-register").readOnly = (fieldEntered === typeInput.PHONE);
      document.getElementById("email-register").readOnly = (fieldEntered === typeInput.EMAIL);

      //clear interval time opt
      clearInterval(resendInterval);
    }
    $(document).on('click', '.btn-next-verify',async function () {
      // Chỉ verify code lần đầu đăng ký, những lần sau không còn cần verify
      const phoneVerify = unFormatPhoneNumber(JSON.parse(JSON.stringify(dataBooking.users[0].phoneNumber)));
      const optCode = getOtpCode();
      try {
        const resVerifyCode = await fetchAPI.get(`/api/user/checkdevice?phone=${phoneVerify}&verifyCode=${optCode}`);
        if(resVerifyCode.status === 200) {
          nextFormRegister(dataBooking);
        }
        else{
          // to-do: Ngược lại input verify error shake
        }
      }catch(e) {
        console.error("[on.btn-next-verify]: ", {
          message: e.message,
          stack: e.stack,
          name: e.name,
        });
      }
    })
    // popup register
    $(document).on('click', '#nav-tab-register', function(){
      nextFormRegister(dataBooking);
    })
    function startResendTimer() {
      $('.resend-btn').addClass('disabled');

      resendInterval = setInterval(() => {
        resendCountdown--;
        $('.countdown').text(`00:${resendCountdown < 10 ? '0' + resendCountdown : resendCountdown}`);

        if (resendCountdown <= 0) {
          clearInterval(resendInterval);
          $('.resend-btn').removeClass('disabled').text('Send Again');
        }
      }, 1000);
    }
    // back để quay về popup email
    $(document).on('click', '.btn-back-verify', function () {
      const emailOrPhone = dataBooking.users[0].email || dataBooking.users[0].phoneNumber;
      let height = 620;
      const htmlVerifyEmailPhone = renderVerifyEmailPhoneContent(emailOrPhone);
      let width = 560;
      if(isMobile) {
        height = 620;
        width = '100%';
      }
      // const persistent = true;
      const htmlPopupVerify = renderBasePopup(htmlVerifyEmailPhone, false, height, width);

      $wrapHomeTemp.append(htmlPopupVerify);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);

      // reset data users[0]
      dataBooking.users[0].email = '';
      dataBooking.users[0].phoneNumber = '';
      //clear interval time opt
      clearInterval(resendInterval);
    });
    // back form register
    $(document).on('click', '.btn-back-verify-register', function () {
      const emailOrPhone = dataBooking.users[0].email || dataBooking.users[0].phoneNumber;
      const htmlVerifyEmailPhone = renderVerifyEmailPhoneContent(emailOrPhone);
      // const persistent = true;
      let height = 620;
      let width = 560;
      if(isMobile) {
        height = 620;
        width = '100%';
      }
      const htmlPopupVerify = renderBasePopup(htmlVerifyEmailPhone, false, height, width);
      $wrapHomeTemp.append(htmlPopupVerify);

      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
    });
      // next verify
    $(document).on('click', '.btn-next-verify-register', async function() {
      const $this = $(this);

      // xử lý check lại toàn bộ form input, verify và snake text error
      // Chỉ check format mail và phone, đã xử lý onChange input verify button verify
       // Lấy giá trị trên tab hiện tại
        const $wrapRegis = $(`.wrap-popup-register`);
        const valPhoneRegis = $wrapRegis.find('#phone-register').val().trim();
        const valFirstRegis = $wrapRegis.find('#firstname-register').val().trim();
        const valLastRegis = $wrapRegis.find('#lastname-register').val().trim();
        const valEmailRegis = $wrapRegis.find('#email-register').val().trim();

        const isPhone = isValidPhoneNumber(valPhoneRegis);
        const isEmail = isValidEmail(valEmailRegis);

      let hasError = false;

      if(valEmailRegis === '' && valPhoneRegis === ''){
        const $errorEmailRegis = $wrapRegis.find('#email-register').next('.error-message');
        const textErrEmail = 'Please enter at least 1 of the 2 fields email or phone number!'
        $errorEmailRegis.text(textErrEmail)
        shakeError($errorEmailRegis);


        const $errorPhoneNumberRegis = $wrapRegis.find('#phone-register').next('.error-message');
        const textErrPhoneNumber = 'Please enter at least 1 of the 2 fields email or phone number!'
        $errorPhoneNumberRegis.text(textErrPhoneNumber)
        shakeError($errorPhoneNumberRegis);


        hasError = true;
      }

      if (valPhoneRegis !== '' && !isPhone) {
        const $errorPhoneRegis = $wrapRegis.find('#phone-register').next('.error-message');

        const textErr = !isPhone ? 'Phone is incorrect format.' : 'Phone is required!'
        $errorPhoneRegis.text(textErr);
        shakeError($errorPhoneRegis);
        hasError = true;
      }

      if (valEmailRegis !== '' && !isEmail) {
        const $errorEmailRegis = $wrapRegis.find('#email-register').next('.error-message');

        const textErr = !isEmail ? 'Email is incorrect format.' : 'Email is required!'
        $errorEmailRegis.text(textErr);
        shakeError($errorEmailRegis);
        hasError = true;
      }

      if (valFirstRegis === '') {
        const $errorFirstRegis = $wrapRegis.find('#firstname-register').next('.error-message');

        const textErr = 'First name is required!'
        $errorFirstRegis.text(textErr);
        shakeError($errorFirstRegis);
        hasError = true;
      }

      if (valLastRegis === '') {
        const $errorLastRegis = $wrapRegis.find('#lastname-register').next('.error-message');

        const textErr = 'Last name is required!'
        $errorLastRegis.text(textErr);
        shakeError($errorLastRegis);
        hasError = true;
      }

      if (hasError) {
        $this.blur(); // Gỡ focus
        return;
      }

      // Đăng ký thành viên
      const payloadRegis = {
        firstName: valFirstRegis,
        lastName: valLastRegis,
        contactPhone: unFormatPhoneNumber(JSON.parse(JSON.stringify(valPhoneRegis))),
        email: valEmailRegis,
        isMail: valEmailRegis ? true : false,
      }
      try {
        const resRegis = await fetchAPI.post('/api/user/register', payloadRegis);
        if(resRegis.status !== 200) {
          // chưa biết response trả về gì
          // to-do : will
          return;
        }
        // token & refreshTokens
        const token_bot = resRegis?.data?.token;
        const refreshTokens_bot = resRegis?.data?.refreshTokens;
        localStorage.setItem('token_bot', token_bot)
        localStorage.setItem('refreshTokens_bot', refreshTokens_bot);

        // Lưu thông tin vào dataBooking
        dataBooking.users[0].email = resRegis?.data?.email
        dataBooking.users[0].phoneNumber = resRegis?.data?.phone;
        dataBooking.users[0].id = resRegis?.data?.id;
        // res chỉ trả về fullName
        dataBooking.users[0].firstName = valFirstRegis;
        dataBooking.users[0].lastName = valLastRegis;

        // close và hiển thị gia đình | guest
        // add thêm 1 thành viên rỗng nếu length dataBooking.users.length = 1
        const newU = {
          id: 2,
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          gender: genderEnum.MALE,
          services: [

          ],
          selectedDate: null,
          selectedTimeSlot: null,
          isSelecting: false,
          isChoosing: false,
        };
        if(dataBooking.users.length <2 ) {
          dataBooking.users.push(newU);
        }
        closePopupContainerTemplate();

        alertCustom({
          type: "success",
          isNoti: true,
          notify: {
            title: "Đăng ký thành công!",
            position: "bottom-end",
            timer: 3000,
            toast: true,
            showConfirmButton: false
          }
        });
      }catch(e){
        console.error("[on.next-verify-register]", {
          message: e.message,
          stack: e.stack,
          name: e.name,
        });
      }

      $('.wrap-input-guests').removeClass('hidden');
      updateGuestSection();

    })
    // back form policies
    $(document).on('click', '.btn-back-policies', function() {

      closePopupContainerTemplate();
      // clear time nếu có
    })
    // next form policies
    $(document).on('click', '.btn-next-policies', function() {
      const contentPaymentMethod = renderPaymentMethodsForm(dataBooking);
      let height = 776;
      let width = 886;
      if(isMobile) {
        height = 776;;
        width = '100%';
      }
      const html = renderBasePopup(contentPaymentMethod,false, height, width);
      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
    })
    // add new card
    $(document).on('click', '.add-new-card-btn', function () {
      const htmlAddNewMethod = renderAddNewMethod();
      const persistent = true;
      const html = renderBasePopup(htmlAddNewMethod, persistent, 900, 886);

      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
    })
    // back: add new card
    $(document).on('click', '.btn-back-add-card', function() {
      let height = 776;
      let width = 886;
      if(isMobile) {
        height = 776;;
        width = '100%';
      }
      const htmlPaymentMethod = renderPaymentMethodsForm(dataBooking);
      const html = renderBasePopup(htmlPaymentMethod,false, height, width);

      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
      // settime close form
    })
    // back select payment
    $(document).on('click', '.btn-back-payment', function() {
      const htmlPoliciesForm = renderPoliciesForm(policySetting);
      let height = 768;
      let width = 886;
      if(isMobile) {
        height = 700;
        width = '100%'
      }
      const persistent = true;
      const html = renderBasePopup(htmlPoliciesForm, persistent, height, width);

      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
      // settime close
    })
    // Confirm payment final
    $(document).on('click', '.btn-next-payment', async function () {
      // Chọn thẻ
      const cardChoosing = dataBooking.cardNumber.find((card) => card.isChoosing);
      const userChoosing = dataBooking.users[0];

      const rcpCustomer = userChoosing.rcpCustomer;
      const appointmentID = 0;
      const customerID = userChoosing.id;
      const cardAuthorize = cardChoosing.cardAuthorize;
      const totalAmount = dataBooking.totalAmount || 0;
      const rcvNo = 336;
      const typeAuth = 1;
      const idCard = cardChoosing.id;
      let dataAddDeposit;
      try {
        const urlAddDeposit =`/api/card/adddeposit
        ?RCPCustomer=${rcpCustomer}&AppointmentID=${appointmentID}
        &CustomerID=${customerID}&AuthorizeCardID=${cardAuthorize}
        &Amount=${totalAmount}&RVCNo=${rcvNo}&TypeAuthorize=${typeAuth}&ID=${idCard}`
        .replace(/\s+/g, "");

        dataAddDeposit = await fetchAPI.get(urlAddDeposit);
      }catch(e){
        console.error('[on.btn-next-payment]', {
          message: e.message,
          stack: e.stack,
          name: e.name,
        });
      }
      // book now
      const list_appointmentSubject = new Set();
      dataBooking.users.forEach(user => {
        user.services.forEach(service => {
          service.itemService.forEach(item => {
            list_appointmentSubject.add(item.title);
          });
        });
      });
      const result_list_appointmentSubject = Array.from(list_appointmentSubject).join(", ");

      const serviceDateTimeSet = new Set();

      dataBooking.users.forEach(user => {
        user.services.forEach(service => {
          service.itemService.forEach(item => {
            const staff = item.selectedStaff;
            if (staff && staff.selectedDate && staff.selectedTimeSlot) {
              // Ghép lại thành "MM-DD-YYYY HH:mm:ss"
              const dateTime = `${staff.selectedDate} ${staff.selectedTimeSlot}:00`;

              // Thêm vào Set để loại bỏ trùng lặp
              serviceDateTimeSet.add(dateTime);
            }
          });
        });
      });

      const uniqueSelectedDates = Array.from(serviceDateTimeSet); // dùng cho cả ServiceDate và StartTime

      // EndTime
        // help function
      function buildUniqueEndTimes(dataBooking) {
        const seen = new Set();
        const results = [];

        dataBooking.users.forEach(user => {
          user.services.forEach(service => {
            service.itemService.forEach(item => {
              const staff = item.selectedStaff;
              if (!staff?.selectedDate || !staff?.selectedTimeSlot) return;

              // start time
              const [month, day, year] = staff.selectedDate.split("/"); // "08/21/2025"
              const [hour, minute] = staff.selectedTimeSlot.split(":"); // "16:20"
              const start = new Date(`${year}-${month}-${day}T${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00`);

              // tổng duration = chính + optional
              let totalDuration = item.duration || 0;
              if (item.optionals && item.optionals.length > 0) {
                totalDuration += item.optionals.reduce((sum, opt) => sum + (opt.timedura || 0), 0);
              }

              // end time = start + duration
              const end = new Date(start.getTime() + totalDuration * 60000);

              // format: MM-DD-YYYY HH:mm:ss
              const formatted = `${month}-${day}-${year} ${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}:${String(end.getSeconds()).padStart(2, "0")}`;

              // loại bỏ trùng lặp
              if (!seen.has(formatted)) {
                seen.add(formatted);
                results.push(formatted);
              }
            });
          });
        });

        return results;
      }
      const endTimes = buildUniqueEndTimes(dataBooking);

      // nickName thợ
      const uniqueNicknames = new Set();
      dataBooking.users.forEach(user => {
        user.services.forEach(service => {
          service.itemService.forEach(item => {
            if (item.selectedStaff && item.selectedStaff.nickName) {
              uniqueNicknames.add(item.selectedStaff.nickName);
            }
          });
        });
      });

      const staffNickNames = Array.from(uniqueNicknames);

      // list id thợ
      const uniqueEmployeeID = new Set();
      dataBooking.users.forEach(user => {
        user.services.forEach(service => {
          service.itemService.forEach(item => {
            if (item.selectedStaff && item.selectedStaff.id) {
              uniqueEmployeeID.add(item.selectedStaff.id);
            }
          });
        });
      });

      const listUniqueEmID = Array.from(uniqueEmployeeID);

      // Tổng duration book
      function calcTotalDuration(dataBooking) {
        let totalDuration = 0;

        dataBooking.users.forEach(user => {
          user.services.forEach(service => {
            service.itemService.forEach(item => {
              // thời lượng chính của service
              let itemDuration = item.duration || 0;

              // cộng thêm các optional (nếu có)
              if (item.optionals && item.optionals.length > 0) {
                item.optionals.forEach(opt => {
                  itemDuration += opt.timedura || 0;
                });
              }

              totalDuration += itemDuration;
            });
          });
        });

        return totalDuration;
      }

      const totalTimeDuration = calcTotalDuration(dataBooking);
      // help calc end time
      function calcEndTime(startDateTime, duration) {
        const [date, time] = startDateTime.split(" ");
        // tách bằng cả "/" và "-"
        const [month, day, year] = date.includes("/")
          ? date.split("/").map(Number)
          : date.split("-").map(Number);

        const [h, m, s] = time.split(":").map(Number);

        const dt = new Date(year, month - 1, day, h, m, s || 0);
        dt.setMinutes(dt.getMinutes() + duration);

        const MM = String(dt.getMonth() + 1).padStart(2, "0");
        const DD = String(dt.getDate()).padStart(2, "0");
        const YYYY = dt.getFullYear();
        const HH = String(dt.getHours()).padStart(2, "0");
        const mm = String(dt.getMinutes()).padStart(2, "0");
        const SS = String(dt.getSeconds()).padStart(2, "0");

        return `${MM}-${DD}-${YYYY} ${HH}:${mm}:${SS}`;
      }

      function buildItemList(dataBooking) {
        let index = 0;
        const listItemDetail = [];

        dataBooking.users.forEach((user) => {
          user.services.forEach((service) => {
            service.itemService.forEach((itemService) => {
              const staff = itemService.selectedStaff;

              // Tính tổng price + duration (cả optional nếu có)
              let totalPrice = parseFloat(itemService.price) || 0;
              let totalDuration = parseInt(itemService.duration) || 0;

              if (itemService.optionals && Array.isArray(itemService.optionals)) {
                itemService.optionals.forEach((opt) => {
                  totalPrice += parseFloat(opt.price) || 0;
                  totalDuration += parseInt(opt.timeDuration) || 0;
                });
              }

              const startTime = `${staff.selectedDate} ${staff.selectedTimeSlot}:00`;
              const endTime = calcEndTime(startTime, totalDuration);

              listItemDetail.push({
                Index: index++,
                ParentAddon: -1,
                ItemID: itemService.idItemService,
                ItemName: itemService.title,
                ItemPrice: totalPrice.toFixed(2),
                Duration: totalDuration,
                EmployeeID: staff.employeeID,
                EmployeeName: staff.nickName,
                Type: 1,
                IsCategory: 0,
                IsRequestTech: 1,
                StartTime: startTime,
                EndTime: endTime,
                DurationItem: totalDuration,
                IsChangeTime: 0,
                ProductCharge: 0,
                Turn: 0,
                Comission: 0,
                IDCombo: 0,
                AddonId: 0,
              });
            });
          });
        });

        return listItemDetail;
      }
      // item detail
      const listItemDetail = buildItemList(dataBooking);

      const bookXLM = {
          Appointment: {
            AppointmentID: "0",
            CustomerID: userChoosing.id,
            CustomerName: userChoosing.firstName + userChoosing.lastName,
            CustomerPhone: userChoosing.phoneNumber.slice(1),
            AppointmentSubject: result_list_appointmentSubject,
            ServiceDate: uniqueSelectedDates,
            StartTime: uniqueSelectedDates,
            EndTime: endTimes,
            AppointmentStatusID: "1",
            EmployeeID: listUniqueEmID,
            GroupEmployeeName: staffNickNames,
            AptComment: "",
            TotalAmount: dataBooking.totalAmount,
            DepositAmount: dataBooking.paymentDeposit,
            CrearteBy: "0",
            IsBookOnline: "1",
            IsConfirmOB: "0",
            BarcodeTicket: "",
            TotalDuration: totalTimeDuration,
            IDParty: "0",
            IsStartAllSameTime: "0",
            ApptIndex: "0",
            Detail: {
              ApptIndex: "0",
                Item: listItemDetail,
            }
          }
        }
      // Dùng cho bookXLM
      const xmlString = jsonToXml(bookXLM, "root");
      const payloadBookXLM = {
        RVCNo: "336",
        xml: xmlString,
        isConfirm: '0',
        CustomerID: userChoosing.id.toString(),
      }

      // book now
      let dataBookXLM;
      try{
        dataBookXLM = await fetchAPI.post('/api/appointment/bookAptXML',payloadBookXLM);
      }catch(e){
        console.error('[dataBookXLM]', {
          message: e.message,
          stack: e.stack,
          name: e.name,
        })
      }

      if(dataBookXLM.appointmentID){
        // send manualNotify
        const RVCNo = 336;
        const keyOnline = "OnlineBookingConfirm";
        const keyTech = "OB.NotifyTech";
        const type = "sms";
        const appointmentID = dataBookXLM.appointmentID;

        let resManualNotiOnline;
        try {
          resManualNotiOnline = await fetchAPI.get(`/api/appointment/SendManualNotify?RVCNo=${RVCNo}&key=${keyOnline}&type=${type}&appointmentID=${appointmentID}`)
        }catch(e) {
          console.error('[resManualNotiOnline]', {
            message: e.message,
            stack: e.stack,
            name: e.name,
          })
        }
        if(resManualNotiOnline.status !== 200) return;

        let resManualNotiTech;
        try {
          resManualNotiTech = await fetchAPI.get(`/api/appointment/SendManualNotify?RVCNo=${RVCNo}&key=${keyTech}&type=${type}&appointmentID=${appointmentID}`)
        }catch(e) {
          console.error('[resManualNotiTech]', {
            message: e.message,
            stack: e.stack,
            name: e.name,
          })
        }
        if(resManualNotiTech.status !== 200) return;

        // add log deposit


        // invoke hub
        // const dataInvokeHub = await


      }else {
        console.log("Not res appointmentID")
      }
      const contentSuccessPayment = renderPaymentConfirmationForm();
      const html = renderBasePopup(contentSuccessPayment,false, 920, 886);

      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);

      // start animation 5 vòng (fake 5s)
      setTimeout(() => {
        startConfirmAnimation(1, {
          selector: '.wrap-popup-payment-confirmation .check-circle',
          buttonSelector: '.wrap-popup-payment-confirmation .btn-request-another'
        });
      }, 50);
    })
    // Chọn thẻ thanh toán
    $(document).on('click', '.payment-method-item', function() {
      const $this = $(this);
      $('.payment-method-item').removeClass('selected');

      $this.addClass('selected');
      const idCard = $this.data('id');
      let cardChoosing = {};
      dataBooking.cardNumber.forEach((item) =>{
        if(item.id == idCard) {
          item.isChoosing = true;
          cardChoosing = item;
        }
      })
      // bật nút Confirm
      $('.btn-next-payment').prop('disabled', false);
    })
    // Sự kiện trên popup register
     // Kiểm tra và disable btn verify form register
    $(document).on('input', '#firstname-register, #lastname-register, #email-register, #phone-register', function () {
      const $this = $(this);
      const val = $this.val().trim();
      if (val) {
        clearInputError($this);
      }

      // verify button next :(Verify)
      let allFilled = $('#firstname-register').val().trim()
        && $('#lastname-register').val().trim();

      if($this.attr('id') === 'email-register'){

        const valid = isValidEmail(val);

        if($this.data('type') === typeRequire.REQUIRED){
          allFilled = allFilled && val;
        }

        // --- update phone required/not required ---
        const $phone = $('#phone-register');
        const $labelPhone = $('.form-input-phone label p');

        if (valid && val !== '') {
          // Email hợp lệ -> Phone không bắt buộc
          $phone.attr('data-type', typeRequire.NOTREQUIRED);
          $labelPhone.text('');
        } else {
          // Email rỗng/không hợp lệ -> Phone bắt buộc
          $phone.attr('data-type', typeRequire.REQUIRED);
          $labelPhone.text('*');
        }

      }
      if($this.attr('id') === 'phone-register'){
        const $this = $(this);

        let phoneVal = $this.val().trim();
        const isRequired = $this.data('type') === typeRequire.REQUIRED;
        const phoneDigits = phoneVal.replace(/\D/g, '');

        let valid = true;

        // Check nếu là phone đủ 10 số
        if (phoneDigits.length === 10 && /^\d+$/.test(phoneDigits)) {
          phoneVal = formatPhoneNumber(phoneDigits);
          $this.val(phoneVal);
          valid = isValidPhoneNumber(phoneVal);
        } else {
            // Nếu đang ở dạng đã format mà không còn đủ 10 số → gỡ format
          if (phoneVal.includes('(') || phoneVal.includes(')') || phoneVal.includes('-')) {
            if (phoneDigits.length !== 10) {
              phoneVal = phoneDigits;
              $this.val(phoneVal);
            }
          }
          valid = isValidPhoneNumber(phoneVal);
        }
        if(phoneVal === '' && !isRequired){
          clearInputError($this);
        }
        else if(!valid) {
          showInputError($this, 'Phone is incorrect format')
        }
        else {
          clearInputError($this);
        }

        if($this.data('type') === typeRequire.REQUIRED){
          const valPhone = $this.val().trim();
          allFilled = allFilled && valPhone;
        }

        // --- update email required/not required ---
        const $email = $('#email-register');
        const $labelEmail = $('.form-input-email label p');

        if (valid && phoneVal !== '') {
          // Phone hợp lệ -> Email không bắt buộc
          $email.attr('data-type', typeRequire.NOTREQUIRED);
          $labelEmail.text('');
        } else {
          // Phone rỗng/không hợp lệ -> Email bắt buộc
          $email.attr('data-type', typeRequire.REQUIRED);
          $labelEmail.text('*');
        }
      }

      $('.btn-next-verify-register').prop('disabled', !allFilled);
    });
    // blur #firsname-register, #lastname-register,
    $(document).on('blur', '#firstname-register, #lastname-register', function () {
      const $input = $(this);
      const id = $input.attr('id');
      const val = $input.val().trim();
      const nameMap = {
        'firstname-register': 'First Name',
        'lastname-register': 'Last Name',
      };

      const fieldName = nameMap[id] || 'This field';

      if (!val) {
        showInputError($input, `${fieldName} is required`, true);
        return;
      }

      // Nếu hợp lệ => xóa lỗi
      clearInputError($input);
    });
    // blur #phone-register
    $(document).on('blur', '#phone-register', function () {
      const $this = $(this);
      const isRequired = $this.data('type');
      if(isRequired === typeRequire.REQUIRED){
        validatePhoneFormRegister($this);
      }
      // nếu val = '', clear error, néu có val vẫn valid format
      if($this.val() === '' && isRequired === typeRequire.NOTREQUIRED){
        clearInputError($this);
      }else{
        validatePhoneFormRegister($this);
      }
    });
    // blur #email-register
    $(document).on('blur', '#email-register', function() {
      const $this = $(this);
      const isRequired = $this.data('type');
      if(isRequired === typeRequire.REQUIRED){
        validateEmailFormRegister($this);
      }
      // nếu val = '', clear error, néu có val vẫn valid format
      if($this.val() === '' && isRequired === typeRequire.NOTREQUIRED){
        clearInputError($this);
      }else{
        validateEmailFormRegister($this);
      }
    })
    // Sự kiện mở form phương thức thanh toán
    $(document).on('click', '.btn-open-payment', function () {
      const htmlPaymentMethod = renderPaymentMethodsForm(dataBooking);
      let height = 776;
      let width = 886;
      if(isMobile) {
        height = 776;;
        width = '100%';
      }
      const html = renderBasePopup(htmlPaymentMethod, false, height, width);
      $wrapHomeTemp.append(html);
      setTimeout(() => $('.overlay-screen').addClass('show'), 10);
    });

    // Chuyển sang form thêm thẻ mới
    $(document).on('click', '.btn-add-new-card', function () {
      const htmlAddNewCardForm = renderAddNewCardForm();
      const html = renderBasePopup(htmlAddNewCardForm, false, 762, 886);
      $wrapHomeTemp.html(html); // thay nội dung popup
      setTimeout(() => $('.overlay-screen').addClass('show'), 10);
    });

    // Lưu thẻ mới và quay lại form phương thức thanh toán
    $(document).on('click', '.btn-save-card', function () {

      // Render lại form chọn phương thức với thẻ mới tick sẵn
      const htmlPaymentMethod = renderPaymentMethodsForm(dataBooking);
      let height = 776;
      let width = 886;
      if(isMobile) {
        height = 776;;
        width = '100%';
      }
      const html = renderBasePopup(htmlPaymentMethod, false, height, width);
      $wrapHomeTemp.html(html);
      setTimeout(() => $('.overlay-screen').addClass('show'), 10);
    });

    // Xác nhận phương thức và mở form xác nhận thanh toán
    $(document).on('click', '.btn-confirm-payment-method', function () {
      // Lấy dữ liệu thanh toán đã chọn (demo)
      const paymentInfo = {
        ticketType: 'VIP Ticket',
        date: 'Aug 20, 2025',
        time: '10:30 AM',
        method: 'Visa **** 1234',
        deposit: '$50',
        remaining: '$150'
      };
      const htmlPaymentConfirm = renderPaymentConfirmationForm(paymentInfo);
      const html = renderBasePopup(htmlPaymentConfirm, false, 762, 886);
      $wrapHomeTemp.html(html);
      setTimeout(() => $('.overlay-screen').addClass('show'), 10);
    });

    // Xác nhận cuối cùng
    $(document).on('click', '.btn-final-confirm', function () {
      alert('Thanh toán thành công!');
      $('.overlay-screen').removeClass('show');
    });

    // Xử lý upload hình ảnh
      // Mở popup upload hình ảnh
      let userSelectedUpload;
      $(document).on('click', '.btn-upload-image', function() {
        const $this = $(this);
        userSelectedUpload = $this.closest('.item-sumary').data('id');
        const findUser = dataBooking.users.find((item) => item.id == userSelectedUpload);

        const dataImages = findUser.images ? findUser.images : {};
        const popUpload = renderPopupUpload(dataImages, isMobile);

        let width = 800;
        let height = 810;
        if(isMobile){
          height = 600;
          width = '100%';
        }
        const html = renderBasePopup(popUpload, false, height, width);

        $wrapHomeTemp.append(html);
        setTimeout(() => {
          $('.overlay-screen').addClass('show');
        }, 10);
      })
      //
      function handleImageFile($coverInput, file) {
        const $label = $coverInput.find('.upload-box');
        const $errorMsg = $label.find('.error-msg');
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];

        // Reset lỗi
        $label.removeClass('error');
        $errorMsg.hide();

        if (!validTypes.includes(file.type)) {
          $label.addClass('error');
          $errorMsg.show();
          return;
        }

        // Hiển thị ảnh preview
        const reader = new FileReader();
        reader.onload = function (e) {
          $label.find('img.preview')
            .attr('src', e.target.result)
            .show();
          $label.find('i, .text').hide();

          // Nếu chưa có nút .btn-action-img thì thêm vào
          if ($coverInput.find('.btn-action-img').length === 0) {
            $coverInput.append(`
              <div class="btn-action-img">
                <button class="remove-img">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            `);
          } else {
            $coverInput.find('.btn-action-img').show();
          }
        };
        reader.readAsDataURL(file);
      }
      //Onchange hình ảnh
      $(document).on('change', '.upload-box input[type="file"]', function (e) {
        const file = e.target.files[0];
        if (file) {
          const $coverInput = $(this).closest('.cover-input-img');
          handleImageFile($coverInput, file);
        }
      });
      // Ngăn hành vi mặc định khi kéo–thả vào document
      $(document).on('dragover drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
      // Drag over – highlight ô upload
      $(document).on('dragover', '.upload-box', function (e) {
        e.preventDefault();
        $(this).addClass('drag-over');
      });

      // Drag leave – bỏ highlight
      $(document).on('dragleave', '.upload-box', function (e) {
        e.preventDefault();
        $(this).removeClass('drag-over');
      });

      // Drop file vào
      $(document).on('drop', '.upload-box', function (e) {
        e.preventDefault();
        const file = e.originalEvent.dataTransfer.files[0];
        if (file) {
          const $coverInput = $(this).closest('.cover-input-img');
          handleImageFile($coverInput, file);
        }
        $(this).removeClass('drag-over');
      });

      // remove image
      $(document).on('click', '.remove-img', function () {
        const $cover = $(this).closest('.cover-input-img');
        const $label = $cover.find('.upload-box');

        $label.find('input[type="file"]').val('');
        $label.find('img.preview').hide().attr('src', '');
        $label.find('i, .text').show();
        $label.removeClass('error');
        $label.find('.error-msg').hide();

        const $btnActionImg = $(this).closest('.btn-action-img');
        $btnActionImg.hide();
      });

      // edit image
      $(document).on('click', '.edit-img', function () {
        const $cover = $(this).closest('.cover-input-img');
        const $input = $cover.find('.upload-box input[type="file"]');

        $input.trigger('click'); // chọn lại ảnh
      });
      // cancel
      $(document).on('click', '.cancel-upload', function () {
        closePopupContainerTemplate();
      })
      // save imag
      $(document).on('click', '.save-upload', function () {
        const $this =  $(this);
        const images = [];

        $('.cover-input-img .upload-box img.preview').each(function () {
          const base64Img = $(this).attr('src');
          if (base64Img) {
            images.push({
              id: Date.now() + Math.random(), // ID tạm để đảm bảo duy nhất
              link: base64Img
            });
          }
        });

        // id của user upload image userSelectedUpload
        const user = dataBooking.users.find(u => u.id == userSelectedUpload);

        if (!user) return;

        if (!Array.isArray(user.images)) user.images = [];
        // clear ảnh cũ
        user.images = [];
        user.images.push(...images);
        closePopupContainerTemplate();

        // render lại sumary cập nhật ảnh
        renderSumary(dataBooking, listDataService);
      })
      // Các sự kiện trên sumary
        // delete/edit service
          // function delete service
          const handleDeleteService = (idUser) => {
            $(`.guest-input[data-id="${idUser}"]`).find('.btn-remove').trigger('click');
          }
          // function delete item service
          const handleDeleteItemService = (idUser, idService, idItemService) => {
            const user = dataBooking.users.find((u) => u.id == idUser);
            if (!user) return;

            const serviceIndex = user.services.findIndex((se) => se.idService == idService);
            if(serviceIndex === -1) return;

            const service = user.services[serviceIndex];

            service.itemService = service.itemService.filter(
              (is) => is.idItemService != idItemService
            );

            if(service.itemService.length === 0){
              user.services.splice(serviceIndex, 1);
            }

            const userChoosing = dataBooking.users.find((user) => user.isChoosing);
            renderListService(listDataService, '.list-more', dataBooking);
            // re-render sumary
            renderSumary(dataBooking, listDataService);
          }
          // Delete service
          $(document).on('click', '.delete-sumary', function() {
            const $this = $(this);
            const idUser = $this.closest('.item-sumary').data('id');
            const nameUser = $this.closest('.item-sumary').find('.user-book h2').text().trim();
            const title = `Xoá dịch vụ đã chọn của ${nameUser}?`
            const content = ``
            let width = 560;
            let height = 320;
            if(isMobile){
              height = 292;
              width = '100%'
            }

            const htmlPopupNotify = renderContentNotify(title, content,() => handleDeleteService(idUser))
            const html = renderBasePopup(htmlPopupNotify, false, height, width);

            $wrapHomeTemp.append(html);
            setTimeout(() => {
              $('.overlay-screen').addClass('show')
            }, 10)
          })
          // Delete item service
          $(document).on('click', '.delete-item-ser', function() {
            const $this = $(this);

            const idUser = $this.closest('.item-sumary').data('id');
            const idService = $this.closest('.wrap-item-content').data('id');
            const idItemService = $this.closest('.wrap-item-content').data('id-item');

            const $pWrap = $this.closest('.p-wrap');
            const nameService = $pWrap.find('.text-name-service').text().trim();
            const title = `Xoá dịch vụ ${nameService} ?`
            const content = ``;
            let width = 560;
            let height = 320;
            if(isMobile){
              height = 292;
              width = '100%'
            }
            const htmlPopupNotify = renderContentNotify(title, content, () => handleDeleteItemService(idUser, idService, idItemService));
            const html = renderBasePopup(htmlPopupNotify,false, height, width);

            $wrapHomeTemp.append(html);
            setTimeout(() => {
              $('.overlay-screen').addClass('show');
            }, 10);
          })

    // START: Xử lý option trên banner
    // Hàm fetch ngày nghỉ thật từ tiệm 336
    async function fetchStoreOffDays(rvcNo, month, year) {
      const beginDate = `${month + 1}/01/${year}`;
      const endDate = `${month + 1}/30/${year}`;
      const url = `/api/store/getstoreoffday?rvcNo=${rvcNo}&beginDate=${encodeURIComponent(beginDate)}&endDate=${encodeURIComponent(endDate)}`;

      try {
        const res = await fetchAPI.get(url);
        if (res.status === 0 && Array.isArray(res.data)) {
          return res.data.map(item => new Date(item.dateOff).getDate());
        }
        return [];
      } catch (e) {
        console.error("[fetchStoreOffDays]", {
          message: e.message,
          stack: e.stack,
          name: e.name,
        });
        return [];
      }
    }


    // Hàm cập nhật dữ liệu fakeDataCalender theo tháng
    function updateCalendarData(month, year, rvcNo, callback) {
      fetchStoreOffDays(rvcNo, month, year).then(daysOff => {
        fakeDataCalender[month + 1] = daysOff; // lưu lại theo key tháng
        if (typeof callback === "function") callback();
      });
    }

    $(document).on("click", '#prev', function () {
      if (currentMonth > 0) {
        currentMonth--;
        selectedDate = new Date(currentYear, currentMonth, currentDate.getDate());

        updateCalendarData(currentMonth, currentYear, 336, () => {
          renderCalendar(monthNames, dayNames, currentMonth, currentYear, fakeDataCalender, selectedDate, dataBooking, listDataService);
          document.getElementById("selectedDateTitle").textContent = selectedDate.toDateString();
          renderTimeSlotsForDate(selectedDate, dataBooking, listDataService);
        });
      }
    });

    $(document).on("click", '#next', function () {
      if (currentMonth < 11) {
        currentMonth++;
        selectedDate = new Date(currentYear, currentMonth, currentDate.getDate());

        updateCalendarData(currentMonth, currentYear, 336, () => {
          renderCalendar(monthNames, dayNames, currentMonth, currentYear, fakeDataCalender, selectedDate, dataBooking, listDataService);
          document.getElementById("selectedDateTitle").textContent = selectedDate.toDateString();
          renderTimeSlotsForDate(selectedDate, dataBooking, listDataService);
        });
      }
    });
    // === START: VALID SESSION CREDIT
    function validateField($input, showError = true) {
      const id = $input.attr('id');
      const value = $input.val().trim();
      let valid = true;

      switch (id) {
        case 'card-holder-name':
          if (!value) {
            if (showError) showInputError($input, 'Card holder is required');
            valid = false;
          } else {
            clearInputError($input);
          }
          break;

        case 'card-number':
          if (!isValidCardNumber(value)) {
            if (showError) showInputError($input, 'Invalid card number');
            valid = false;
          } else {
            clearInputError($input);
          }
          break;

        case 'card-expiry':
          if (!isValidExpiryDate(value)) {
            if (showError) showInputError($input, 'Invalid expiry date');
            valid = false;
          } else {
            clearInputError($input);
          }
          break;

        case 'card-cvv':
          if (!isValidCVV(value)) {
            if (showError) showInputError($input, 'Invalid CVV');
            valid = false;
          } else {
            clearInputError($input);
          }
          break;

        case 'billing-address':
          if (!value) {
            if (showError) showInputError($input, 'Billing address is required');
            valid = false;
          } else {
            clearInputError($input);
          }
          break;
      }

      return valid;
    }

    function checkAllFormAddCard() {
      let isValid = true;
      $('#form-add-card input').each(function () {
      if (!validateField($(this), false)) {
          isValid = false;
        }
      });

      const $btnAdd = $('#form-add-card .btn-add-card');
      if (isValid) {
        $btnAdd.prop('disabled', false).removeClass('disabled');
      } else {
        $btnAdd.prop('disabled', true).addClass('disabled');
      }
    }
    // Check từng field khi blur
    $(document).on('blur', '#form-add-card input', function () {
      validateField($(this), true);
      checkAllFormAddCard();
    });

    // Check toàn bộ khi input change
    $(document).on('input change', '#form-add-card input', function () {
      const $this = $(this);
      if($this.attr('id') === 'card-number'){
        $this.val(formatCardNumber($this.val()));
      }
      if ($this.attr('id') === 'card-expiry') {
        $this.val(formatExpiryDate($this.val())); // auto format expiry date
      }
      checkAllFormAddCard();
    });

    // Helper: lấy value theo id
    function getVal($wrap, selector) {
      return $wrap.find(selector).val().trim();
    }
    async function fillNewCard($wrapFormAddCard, dataBooking) {
      // map key trong object <=> id trong form
      const fieldMap = {
        cardHolderName: '#card-holder-name',
        cardNumber:     '#card-number',
        mmyy:           '#card-expiry',
        ccv2:           '#card-cvv',
        billingAddress: '#billing-address',
        street:         '#card-street',
        city:           '#card-city',
        state:          '#card-state',
        zip:            '#card-zip',
      };

      let newCard = {};

      // gán giá trị cho newCard theo mapping
      Object.entries(fieldMap).forEach(([key, selector]) => {
        newCard[key] = getVal($wrapFormAddCard, selector);
      });

      const mmyy = newCard.mmyy || ""; // dạng "12/34"
      let expiryMonth = "";
      let expiryYear = "";

      if (mmyy.includes("/")) {
        const [mm, yy] = mmyy.split("/");
        expiryMonth = mm.trim();
        expiryYear = yy.trim();
      }

      const owner = dataBooking.users[0];
      const phoneNumberOwner = owner.phoneNumber;
      const emailOwner = owner.email;
      const customerID = owner.id;
      const rcpCustomer = owner.rcpCustomer

      // add new card
      const payloadNewCard = {
        // Card info
        number: unformatCardNumber(newCard.cardNumber),
        expiryMonth: expiryMonth,
        expiryYear: expiryYear,
        cvv: newCard.ccv2,
        isDefault: true,
        magstripe: "",
        code: "",

        // Holder info
        firstName: newCard.cardHolderName,
        lastName: newCard.cardHolderName,
        name: "",
        alias: "",

        // Contact
        phoneNumber: phoneNumberOwner,
        email: emailOwner,
        company: "",
        faxNumber: "",

        // Billing address
        address: newCard.billingAddress,
        avsStreet: newCard.billingAddress,
        avsZip: "",
        city: newCard.city,
        state: newCard.state,
        zip: newCard.zip,
        country: ""
      };
      try{
        const url = `/api/card/createcardcustomer?RCPCustomer=${rcpCustomer}&CustomerID=${customerID}&RVCNo=336&TypeAuthorize=1`
        await fetchAPI.post(url, payloadNewCard)
      }catch(e){
        console.error("[fillNewCard - add new card]", {
          message: e.message,
          stack: e.stack,
          name: e.name,
        });
      }
      // get list card authorized
      try {
        const listCardAuthorized = await fetchAPI.post(`/api/card/getlistcardauthorize?RCPCustomer=${rcpCustomer}&CustomerID=${customerID}&RVCNo=336&TypeAuthorize=1`)

        if(listCardAuthorized.data) owner.cardNumber = listCardAuthorized.data;
      }catch(e){
        console.error('[fillNewCard - get list card]', {
          message: e.message,
          stack: e.stack,
          name: e.name,
        });
      }

    }
    $(document).on('click', '.btn-add-card', function() {
      const $this = $(this);
      const $wrapFormAddCard = $this.closest('.wrap-popup-add-card');
      const $inputs = $wrapFormAddCard.find('input');

      let isValid = true;
      $inputs.each(function () {
        if (!validateField($(this), true)) {
          isValid = false;
          shakeError($(this));
        }
      });

      if (!isValid) {
        return; // stop add card
      }

      fillNewCard($wrapFormAddCard, dataBooking);

      // to-do : valid các input

      const contentPaymentMethod = renderPaymentMethodsForm(dataBooking);
      let height = 776;
      let width = 886;
      if(isMobile) {
        height = 776;;
        width = '100%';
      }
      const html = renderBasePopup(contentPaymentMethod,false, height, width);
      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
    })

    // === END: VALID SESSION CREDIT

    // toggle copy same time
    $(document).on('change', '#select-banner-pm', function() {
      const $this = $(this);
      isCopySameTime = $this.prop('checked');
    })


    // START: confirm booking
    $(document).on('click', '.btn-confirm-booking', function() {
      const htmlVerifyEmailPhone = renderVerifyEmailPhoneContent();
      let height = 620;
      let width = 560;
      if(isMobile) {
        height = 620;
        width = '100%';
      }
      // const persistent = true;
      const html = renderBasePopup(htmlVerifyEmailPhone, false, height, width);
      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
    })


    // lần đầu load: fetch ngày nghỉ của tháng hiện tại
    updateCalendarData(currentMonth, currentYear, 336, () => {
      renderCalendar(
        monthNames,
        dayNames,
        currentMonth,
        currentYear,
        fakeDataCalender,
        selectedDate,
        dataBooking,
        listDataService
      );

      // cập nhật tiêu đề ngày được chọn
      document.getElementById("selectedDateTitle").textContent =
        selectedDate.toDateString();

      // hiển thị time slots cho ngày hôm nay
      renderTimeSlotsForDate(selectedDate, dataBooking, listDataService);
    });

    // confirm booking
    renderSumary(dataBooking, listDataService);

    $(document).on('click', '.edit-sumary', function() {
      const $this = $(this);

      const $container = $('.wrap-home-templates');
      const $target = $('#section-service');

      // Kiểm tra tab hiện tại có chọn đầy đủ service, time-slot chưa
      const idUserEdit = $this.closest('.item-sumary').data('id');
      const userCur = dataBooking.users.find(u => u.isChoosing);

      const isFinalBooking = showScrollToFinalBooking(userCur);
      if(isFinalBooking) {
        const isShowScrollTarget = showScrollToTarget(dataBooking);
        if(isShowScrollTarget && $('.scroll-btn-main').is(':visible')){
          shakeError($('.scroll-btn-main'));
        }
      }
      // Sau khi kiểm tra focus tab edit
      $(`.input-fullname[data-id=${idUserEdit}]`).focus();
      // Và scroll lên
      scrollToElementInContainer($container, $target, -250, 500);

    })

    function isInViewport($el) {
      if (!$el || !$el.length) return false;
      const rect = $el[0].getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // Lắng nghe scroll container
    $('.wrap-home-templates').on('scroll', function () {
      if (forceShowScrollBtn) return;

      const $trigger = $($mainScrollBtn.data('triggerBanner'));
      const $triggerSum = $('#triggerBlockSumary');
      const isFinalBooking = showScrollToFinalBooking(dataBooking);
      if (isInViewport($trigger) && !isFinalBooking) {
        const isSeTi = showScrollToTarget(dataBooking, true);
        if(!isSeTi){
          updateScrollButton({
            target: '#targetBlockBanner',
            trigger: '#triggerBlockSumary',
            text: 'Scroll to choose user',
            icon: 'fa fa-hand-pointer',
            triggerBanner: '#triggerBlockSumary',
            force: false
          });
        }

        $mainScrollBtn.fadeIn();
      }else if(isFinalBooking && !isInViewport($triggerSum)){
        updateScrollButton({
          target: '#section-booking',
          trigger: '#trigger-booking',
          triggerBanner: '#triggerBlockSumary',
          text: 'Continue Booking',
          icon: 'fa fa-hand-pointer down',
          force: false
        });
      } else {
        $mainScrollBtn.fadeOut();
      }
    });

    function scrollToElementInContainer($container, $target, extra = 0, duration = 500) {
      if (!$target || !$target.length) return;

      // Nếu container là window / body -> dùng offset
      const containerEl = $container && $container.length ? $container[0] : null;
      const isDocument = !containerEl || containerEl === document.body || containerEl === document.documentElement;

      if (isDocument) {
        // scroll toàn trang
        const top = $target.offset().top + extra;
        $('html, body').animate({ scrollTop: top }, duration);
        return;
      }

      // Container cuộn
      const containerRect = containerEl.getBoundingClientRect();
      const targetRect = $target[0].getBoundingClientRect();
      const currentScroll = $container.scrollTop();

      // Vị trí tương đối của target so với container's content top
      const relativeTop = (targetRect.top - containerRect.top) + currentScroll;

      // Nếu container có padding-top, bù vào (tuỳ layout)
      const paddingTop = parseFloat($container.css('padding-top')) || 0;

      const finalScroll = Math.round(relativeTop - paddingTop + extra);
      $container.animate({ scrollTop: finalScroll }, duration);
    }


    // Sự kiện click nút scroll
    $mainScrollBtn.on('click', function () {
      const $container = $('.wrap-home-templates');
      const $target = $($mainScrollBtn.data('target'));

      if ($target.length) {
        // 86 header, 136 adverties, extra 30
        scrollToElementInContainer($container, $target, -250, 500);
      }
    });


    // click test api
    $(document).on('click', '#page-fag', async function () {

    })

    // ========================
    // ========================
    // ========================
    // ========================
    // XỬ LÝ SỰ KIỆN TRÊN MOBILE
      // HEADER MENU
      $(document).on('click', '.menu-toggle', function () {
        $('.list-option').toggleClass('show');
      });

      $(document).on('click', '.btn-more-info', function (){
        const $this = $(this);
        const $showListInfo = $this.closest('.show-list-info');
        $showListInfo.toggleClass('show');
      })


      // // Gọi khi load xong
      // $(window).on('load', updateBannerHeight);

      // // Gọi khi resize (phòng responsive)
      // $(window).on('resize', updateBannerHeight);

      // // Nếu nội dung thay đổi sau khi load (AJAX, DOM update)
      // const observer = new MutationObserver(updateBannerHeight);
      // observer.observe(document.querySelector('.banner .content-banner'), {
      //   childList: true,
      //   subtree: true,
      //   characterData: true


      // });
  });


  /*
   - 1. Verify email, phone:
    -> (not) 1.1: register
    -> 1.2: fill data user, gồm service gần nhất booking, chọn lại thợ và giờ
  */
  /*
   - 1. Lấy ra thông tin tech cho service (payload: date, time, duration)
   - 2. Lấy ra time-frame phù hợp cho các service và tech đã chọn
   - 3. Copy service, chọn lại thợ -> (1)&(2)
   - 4. Khi copy service, kiểm tra có option copy time để copy time -> (1)&(2)
   - 5. Xử lý booking kiểm tra tech, time-frame còn slot không:
        -> (not) 5.1: api trả ra thợ bị "nghẽn" hoặc re-start
        -> 5.2: Booking
  */
  /*
    1. Chọn thẻ thanh toán -> verify thẻ
    2. Thanh toán credit
    END
  */
