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
  const typeInput = {
    PHONE: 'PHONE',
    EMAIL: 'EMAIL',
  }
  const typeRequire = {
    REQUIRED: 'REQUIRED',
    NOTREQUIRED: 'NOT-REQUIRED'
  }

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
  // SHOW error valid input, and snake text
  function showInputError($input, message, isSnake = false) {
    let $error = $input.siblings('.error-message');
    $error.text(message);

    isSnake && shakeError($error);
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

    forceShowScrollBtn = !!options.force;
    $mainScrollBtn.fadeIn();
  }
  //function hiển thị button scroll
  function showScrollToTarget(dataBooking, directUp = false){
    // Ưu tiên check user choosing
    console.log("check 2");
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
  function showScrollButton(selector) {
    const $section = $(selector);

    $('html, body').animate({
      scrollTop: $section.offset().top - 100
    }, 500);

    // Hiển thị nút hoặc highlight section
    $section.addClass('highlight');
    setTimeout(() => $section.removeClass('highlight'), 2000);
  }
  // Hàm cấu hình nút scroll
  function setupScrollButton({
      triggerSelector,   // selector để kiểm tra hiển thị nút
      targetSelector,    // selector block muốn scroll tới
      text,              // text nút
      iconClass          // class icon Font Awesome
  }) {
      const $btn = $('#scrollToTopBtn');
      const $trigger = $(triggerSelector);
      const $target = $(targetSelector);

      // Cập nhật text & icon
      $btn.find('.text-control-scroll').text(text);
      $btn.find('.icon-control-scroll i')
          .removeAttr('class')
          .addClass(iconClass);

      // Hàm kiểm tra trigger có trong viewport
      function isInViewport($el) {
          const rect = $el[0].getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
      }

      // Lắng nghe scroll container
      $('.wrap-home-templates').off('scroll.scrollBtn').on('scroll.scrollBtn', function () {
          if (isInViewport($trigger)) {
              $btn.fadeIn();
          } else {
              $btn.fadeOut();
          }
      });

      // Click > scroll tới target
      $btn.off('click.scrollBtn').on('click.scrollBtn', function () {
          const $container = $('.wrap-home-templates');
          const scrollTopValue = $target.position().top;

          $container.animate({
              scrollTop: scrollTopValue
          }, 500);
      });
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
  function renderTimeBooking(dataBooking) {
    const userCopyTime = dataBooking.users.find((u) => u.isSelecting && !u.isChoosing);

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
                  checked
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
    currentUserId,
    listDataService,
  ) {
    const $wrapCalendarTimeslot = $('.calendar-timeslot');
    const htmlTimeBooking = renderTimeBooking(dataBooking);
    $wrapCalendarTimeslot.replaceWith(htmlTimeBooking);

    // Lấy user hiện tại
    const user = dataBooking.users.find(u => u.id === currentUserId);

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
    renderCalendar(monthNames, dayNames, currentMonth, currentYear, fakeDataCalender, useDate, dataBooking, currentUserId, listDataService);

    // Cập nhật tiêu đề ngày
    const titleEl = document.getElementById("selectedDateTitle");
    if (titleEl) titleEl.textContent = useDate.toDateString();

    // Render time slots cho ngày này (và sẽ chọn time slot nếu user.selectedTimeSlot tồn tại)
    renderTimeSlotsForDate(useDate, dataBooking, currentUserId, listDataService);
  }

  // render calender
  function renderCalendar(monthNames, dayNames, currentMonth, currentYear, fakeDataCalender, selectedDate, dataBooking, currentUserId, listDataService) {
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
          const user = dataBooking.users.find(u => u.id === currentUserId);
          if (user) {
            user.selectedDate = selectedDate;
          }
          document.querySelectorAll(".day").forEach(d => d.classList.remove("active", "today"));
          day.classList.add("active");
          document.getElementById("selectedDateTitle").textContent = selectedDate.toDateString();
          renderTimeSlotsForDate(selectedDate, dataBooking, currentUserId, listDataService);
        });
      }

      daysEl.appendChild(day);
    }

    // Nếu chưa có selectedDate, set selectedDate = nearestWorkingDate
    if (!hasSelectedDate && nearestWorkingDate) {
      selectedDate = new Date(currentYear, currentMonth, nearestWorkingDate);
      const user = dataBooking.users.find(u => u.id === currentUserId);
      if (user) {
        user.selectedDate = selectedDate;
      }
      document.getElementById("selectedDateTitle").textContent = selectedDate.toDateString();
      renderTimeSlotsForDate(selectedDate, dataBooking, currentUserId, listDataService);
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
  function renderTimeSlotsForDate(selectedDate, dataBooking, currentUserId, listDataService) {
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

    const weekday = selectedDate.getDay();
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
      const user = dataBooking.users.find(u => u.id === currentUserId);
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

      renderSumary(dataBooking, listDataService);
    });

    // Nếu user đã có selectedTimeSlot thì đánh dấu slot tương ứng
    const user = dataBooking.users.find(u => u.id === currentUserId);
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

  // render sumary
  function renderSumary (dataBooking, listDataService) {
    const $containerSumary = $('.wrap-sumary');
    $containerSumary.empty();
    // Kiểm tra có user nào chọn xong servce và timming
    const someUChoosed = dataBooking.users.some(item => {
      return item.services.length > 0 && item.selectedDate && item.selectedTimeSlot;
    })
    if(!someUChoosed) $containerSumary.append('');;

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
      return parseFloat(priceStr.replace('$', '')) || 0;
    }

    function parseTime(timeStr) {
      if (!timeStr) return 0;
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
          let totalPrice = 0;

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

                totalPrice += Number(getTotalPrice(is) || 0);
              });
            });
          }
          return `
            <div class="item-sumary" data-id="${userBooking.id}">
              <div class="top-item-sumary">
                <div class="left-top-item-sumary">
                  <div class="user-book">
                    <h2>${userBooking.firstName ? userBooking.firstName : 'Not Name'}</h2>
                  </div>
                  <button class="edit-sumary">
                    <i class="fa-solid fa-pen-to-square"></i>
                    Edit
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
                          <p class="text-name-tech">${is.selectedStaff?.name}</p>
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
                <p class="text-total-price">$ ${totalPrice}</p>
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
    $containerSumary.append(htmlSumary);
  }

  // POPUP
    // base popup
    function renderBasePopup(innerContentHTML, height = 620, width = 560) {
      // Clear popup cũ nếu có
      $('.overlay-screen').remove();

      const html = `
        <div class="overlay-screen">
          <div class="popup-container-template"
            style="
              height: ${height}px;
              width: ${width}px;
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
            <button class="btn-success">Đồng ý</button>
            <button class="btn-cancel">Hủy</button>
          </div>
        </div>
      `;

      // Gắn event khi DOM đã append
      setTimeout(() => {
        const $overlay = $('.overlay-screen');

        $overlay.find('.btn-success').on('click', function () {
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
    function renderCartContent(dataCart) {
      const { order, noneOrder, btnBack } = dataCart;

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
                  <div class="list-order">
                    Map order: ${item.name}
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
            <span class="clear-icon">&larr;</span>
            <p class="error-message"></p>
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
            <button class="btn-next-verify" disabled>Verify →</button>
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
                <p>${fieldEntered === typeInput.EMAIL ? '' : '*'}</p>
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
            <button class="btn-next-verify-register" ${isDisabled ? '' : 'disabled'}>Sign In →</button>
          </div>
        </div>
      `
    }
    // Content policies
    function renderPoliciesForm(isTimeOff = false) {
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
            <span class="timeoff ${isTimeOff ? '' : 'hidden'}">
              5:00
            </span>
          </div>
          <div class="content-policies">
            This section applies specifically to the booking functions available on
            this Website and Mobile App. When using Vietnam Airlines' online booking
            facility to purchase tickets and add-on products, you accept and comply
            with the instructions, terms, conditions, and notes available on the website
            and app, including but not limited to the followings: If this is not your
            intention and/or you disagree with any part of these applicable terms and
            conditions, DO NOT USE Vietnam Airlines' online booking facility.
          </div>
          <div class="button-container">
            <button class="btn-back-policies">Back</button>
            <button class="btn-next-policies">Accept</button>
          </div>
        </div>
      `
    }
    // Form chọn phương thức thanh toán
    function renderPaymentMethodsForm(selectedMethod = null) {
      return `
        <div
          class="wrap-popup-payment-methods"
          style="
            --color-cur-primary: ${colorPrimary};
          "
        >
          <div class="header-popup-payment">
            <h2 class="title-payment text-uppercase">Payments</h2>
            <span class="time-off">5:59</span>
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
            <div class="payment-method-item">
              <div class="wrap-name-method">
                <div class="wrap-img-method">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" viewBox="0 0 25 30" fill="none">
                    <path d="M7.16778 28.1027L7.66262 24.9596L6.56035 24.934H1.29688L4.95472 1.74087C4.96607 1.67086 5.00297 1.60557 5.05691 1.55921C5.11084 1.51285 5.17991 1.4873 5.25181 1.4873H14.1268C17.0731 1.4873 19.1064 2.10041 20.168 3.31055C20.6657 3.87824 20.9826 4.47149 21.1359 5.12433C21.2968 5.80935 21.2996 6.62778 21.1425 7.62598L21.1312 7.69883V8.33843L21.6289 8.62039C22.048 8.84273 22.3811 9.09725 22.6365 9.38867C23.0623 9.87405 23.3376 10.4909 23.454 11.2223C23.5742 11.9745 23.5344 12.8696 23.3376 13.8829C23.1105 15.0486 22.7434 16.0638 22.2476 16.8945C21.7916 17.66 21.2107 18.2948 20.5209 18.7868C19.8624 19.2543 19.0799 19.6091 18.1953 19.8361C17.338 20.0594 16.3607 20.172 15.2887 20.172H14.598C14.1041 20.172 13.6244 20.3499 13.2478 20.6688C12.8703 20.9942 12.6205 21.4389 12.5439 21.9253L12.4918 22.2082L11.6176 27.7479L11.5778 27.9513C11.5674 28.0157 11.5494 28.0478 11.5229 28.0696C11.4993 28.0895 11.4652 28.1027 11.4321 28.1027H7.16778Z" fill="#253B80"/>
                    <path d="M22.1003 7.77148C22.0738 7.94085 22.0436 8.11399 22.0095 8.29187C20.8391 14.3009 16.835 16.3768 11.721 16.3768H9.11716C8.49175 16.3768 7.96474 16.8309 7.86729 17.4478L6.53415 25.9027L6.15664 28.2993C6.09324 28.7043 6.40548 29.0695 6.81422 29.0695H11.4324C11.9793 29.0695 12.4439 28.6721 12.53 28.1328L12.5754 27.8981L13.4449 22.3802L13.5007 22.0774C13.5859 21.5362 14.0514 21.1388 14.5983 21.1388H15.2889C19.7633 21.1388 23.266 19.3222 24.2897 14.0653C24.7174 11.8693 24.496 10.0356 23.3644 8.74603C23.0219 8.35716 22.5971 8.03452 22.1003 7.77148Z" fill="#179BD7"/>
                    <path d="M20.8837 7.28728C20.7049 7.23524 20.5204 7.18793 20.3312 7.14536C20.141 7.10373 19.9461 7.06683 19.7455 7.03466C19.0434 6.92112 18.2742 6.86719 17.4501 6.86719H10.494C10.3227 6.86719 10.16 6.90598 10.0143 6.976C9.69351 7.13022 9.45508 7.43394 9.39737 7.80578L7.91758 17.1784L7.875 17.4519C7.97245 16.835 8.49946 16.3808 9.12487 16.3808H11.7287C16.8427 16.3808 20.8468 14.304 22.0172 8.29589C22.0522 8.11801 22.0816 7.94486 22.108 7.7755C21.8119 7.61844 21.4912 7.48408 21.1458 7.3696C21.0607 7.34121 20.9727 7.31377 20.8837 7.28728Z" fill="#222D65"/>
                    <path d="M10.0101 6.97419C10.1568 6.90417 10.3186 6.86538 10.4898 6.86538H17.446C18.2701 6.86538 19.0393 6.91931 19.7413 7.03285C19.9419 7.06502 20.1368 7.10192 20.327 7.14355C20.5163 7.18613 20.7008 7.23343 20.8796 7.28547C20.9685 7.31197 21.0565 7.3394 21.1426 7.36684C21.488 7.48133 21.8087 7.61663 22.1049 7.77275C22.453 5.55211 22.102 4.04015 20.9013 2.67106C19.5777 1.16383 17.1886 0.518555 14.1316 0.518555H5.25662C4.63216 0.518555 4.09947 0.97271 4.00296 1.59055L0.306326 25.0221C0.233472 25.4858 0.591119 25.904 1.05852 25.904H6.53772L7.91343 17.1757L9.39322 7.80302C9.45094 7.43118 9.68937 7.12746 10.0101 6.97419Z" fill="#253B80"/>
                  </svg>
                </div>
                <div class="name-numbercard">
                  <span class="name-method">
                    Paypal
                  </span>
                </div>
              </div>
              <div class="circle">
                <div class="dot"></div>
              </div>
            </div>
            <div class="payment-method-item">
              <div class="wrap-name-method">
                <div class=""wrap-img-method>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                    <g clip-path="url(#clip0_787_142840)">
                      <path d="M4.00476 11.3195C4.56726 11.367 5.12976 11.0345 5.48226 10.6107C5.82851 10.1782 6.05726 9.59195 6.00101 9.00195C5.49976 9.0257 4.88601 9.33445 4.53476 9.7682C4.20976 10.1382 3.93351 10.7482 4.00476 11.3195ZM2.61226 19.0595C3.23476 19.0357 3.47976 18.6507 4.22976 18.6507C4.98476 18.6507 5.20476 19.0595 5.86101 19.0507C6.54101 19.037 6.96726 18.4332 7.38351 17.8132C7.85601 17.1095 8.05351 16.4282 8.06351 16.3907C8.04976 16.377 6.75101 15.872 6.73601 14.3495C6.72226 13.0745 7.76351 12.4695 7.80851 12.432C7.22226 11.547 6.30851 11.452 5.98976 11.4282L5.99226 11.4295C5.17601 11.3807 4.47851 11.8995 4.09351 11.8995C3.69976 11.8995 3.10976 11.452 2.46226 11.4657C1.62476 11.4807 0.846011 11.962 0.419761 12.727C-0.461489 14.2632 0.189761 16.5332 1.04226 17.7845C1.45976 18.402 1.95601 19.0832 2.61226 19.0595ZM17.8123 14.2357H19.0923C19.1998 13.6645 19.7198 13.2882 20.4335 13.2882C21.301 13.2882 21.7885 13.697 21.7885 14.4532V14.967L20.0173 15.077C18.3723 15.177 17.481 15.862 17.481 17.0507C17.486 18.2495 18.4035 19.0482 19.721 19.0495C20.6123 19.0495 21.4373 18.5932 21.811 17.8657H21.8385V18.9795H23.151V14.3645C23.151 13.0282 22.096 12.162 20.4748 12.162C18.9698 12.162 17.856 13.0357 17.8123 14.2357ZM21.7935 16.4682C21.7935 17.3345 21.066 17.952 20.106 17.952C19.351 17.952 18.8685 17.5807 18.8685 17.0195C18.8685 16.4332 19.3323 16.097 20.2185 16.0445L21.7935 15.9445V16.4682ZM10.6973 9.7057V18.9782H12.1173V15.8095H14.081C15.876 15.8095 17.1323 14.5582 17.1323 12.7507C17.1323 10.9432 15.896 9.7057 14.1273 9.7057H10.6973ZM15.6898 12.7557C15.6898 13.9257 14.9873 14.602 13.7485 14.602H12.1173V10.9195H13.7535C14.986 10.9195 15.6898 11.5845 15.6898 12.7557Z" fill="black"/>
                      <path d="M26.8609 17.727L25.1922 12.252H23.7109L26.1109 19.0032L25.9797 19.412C25.7634 20.1057 25.4122 20.3782 24.7847 20.3782C24.6722 20.3782 24.4572 20.3645 24.3672 20.3545V21.4682C24.4522 21.4882 24.8047 21.502 24.9122 21.502L24.9109 21.4995C26.2934 21.4995 26.9447 20.962 27.5134 19.3395L30.0022 12.252H28.5584L26.8897 17.727H26.8609Z" fill="black"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_787_142840">
                        <rect width="30" height="30" fill="white" transform="translate(0 0.251953)"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="name-numbercard">
                  <span class="name-method">
                    Apple Pay
                  </span>
                </div>
              </div>
              <div class="circle">
                <div class="dot"></div>
              </div>
            </div>
            <div class="payment-method-item">
              <div class="wrap-name-method">
                <div class=""wrap-img-method>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                    <path d="M14.6835 11.8137V14.4331H16.299C16.6837 14.4331 17.0019 14.3039 17.2538 14.0454C17.5125 13.7872 17.6418 13.4798 17.6416 13.1232C17.6416 12.7741 17.5123 12.4701 17.2538 12.2112C17.0018 11.9458 16.6835 11.8131 16.299 11.813H14.6835V11.8137ZM14.6835 15.3554V18.3939H13.7188V10.8916H16.2783C16.9287 10.8916 17.4809 11.1081 17.9348 11.5412C18.3971 11.9741 18.628 12.5015 18.6276 13.1232C18.6276 13.7592 18.3967 14.29 17.9348 14.7156C17.4874 15.142 16.9352 15.3551 16.2782 15.3548H14.6834L14.6835 15.3554ZM19.6025 16.822C19.6025 17.074 19.7092 17.2837 19.9226 17.451C20.1363 17.6183 20.3857 17.7022 20.6726 17.7022C21.0786 17.7022 21.4395 17.5518 21.7578 17.2517C22.0761 16.9516 22.2351 16.5989 22.2351 16.1942C21.9345 15.9562 21.515 15.8373 20.9765 15.8377C20.5849 15.8377 20.258 15.9321 19.996 16.121C19.7342 16.3095 19.6026 16.5425 19.6026 16.822H19.6025ZM20.8512 13.0923C21.5648 13.0923 22.1278 13.2827 22.5402 13.6634C22.9525 14.044 23.1587 14.566 23.1586 15.2294V18.3938H22.2357V17.6815H22.1937C21.7953 18.2679 21.264 18.5611 20.5999 18.5612C20.0335 18.5612 19.5597 18.3937 19.1783 18.0587C18.7968 17.7227 18.6062 17.3033 18.6063 16.8006C18.6063 16.27 18.8072 15.8476 19.209 15.5336C19.6108 15.2195 20.1476 15.0622 20.8192 15.0618C21.3924 15.0618 21.8644 15.1666 22.2352 15.376V15.1558C22.2352 14.8206 22.1024 14.536 21.8368 14.3022C21.5705 14.0679 21.2604 13.9514 20.9033 13.9514C20.3645 13.9514 19.938 14.1785 19.6239 14.6327L18.7738 14.0979C19.2431 13.4273 19.9356 13.092 20.8513 13.0921L20.8512 13.0923Z" fill="#231F20"/>
                    <path d="M28.4523 13.2588L25.2315 20.6558H24.2353L25.4313 18.0679L23.3125 13.2588H24.3618L25.893 16.947H25.9137L27.4029 13.2588H28.4523Z" fill="#231F20"/>
                    <path d="M10.7768 14.7C10.7772 14.4061 10.7524 14.1128 10.7026 13.8232H6.63281V15.4834H8.96369C8.86379 16.0247 8.56127 16.4854 8.10197 16.7934V17.8716H9.49313C10.3075 17.121 10.7771 16.0116 10.7771 14.7H10.7768Z" fill="#4285F4"/>
                    <path d="M6.63709 18.9129C7.80175 18.9129 8.78221 18.5307 9.49741 17.8716L8.10655 16.7934C7.71937 17.0541 7.22065 17.2063 6.63739 17.2063C5.51185 17.2063 4.55647 16.4483 4.21471 15.4268H2.78125V16.5373C3.49147 17.9456 4.95115 18.9129 6.63709 18.9129Z" fill="#34A853"/>
                    <path d="M4.21301 15.4267C4.03257 14.8915 4.03257 14.3119 4.21301 13.7767V12.666H2.77985C2.47769 13.2665 2.32031 13.9294 2.32031 14.6016C2.32031 15.2738 2.47769 15.9367 2.77985 16.5372L4.21301 15.4267Z" fill="#FABB05"/>
                    <path d="M6.63709 11.9973C7.27309 11.9973 7.84309 12.2157 8.29261 12.6439V12.6445L9.52435 11.414C8.77627 10.718 7.80115 10.291 6.63709 10.291C4.95109 10.291 3.49147 11.2577 2.78125 12.6661L4.21441 13.7765C4.55641 12.755 5.51155 11.9973 6.63709 11.9973Z" fill="#E94235"/>
                  </svg>
                </div>
                <div class="name-numbercard">
                  <span class="name-method">
                    Google Pay
                  </span>
                </div>
              </div>
              <div class="circle">
                <div class="dot"></div>
              </div>
            </div>
          </div>
          <div class="payment-summary">
            <div class="sub-deposit">
              <span class="sub-deposit-1r">
                Total
              </span>
              <span class="sub-deposit-1l">
                $200.00
              </span>
            </div>
            <div class="cur-deposit">
              <span class="sub-deposit-2r">
                Deposit
              </span>
              <span class="sub-deposit-2l">
                $60.00
              </span>
            </div>
          </div>
          <div class="button-container">
            <button class="btn-back-payment">Back</button>
            <button class="btn-next-payment">Confirm</button>
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
            <span class="time-off">5:59</span>
          </div>
          <div class="subtitle-card-new">
            <h3 class="subtitle">Add new card</h3>
          </div>
          <div class="wrap-form-group-card-new">
            <div class="form-group-card-new">
              <label>
                Card Holder Name
                <p class="mb-0">*</p>
              </label>
              <input type="text" id="card-holder-name" placeholder="Card Holder Name">
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
                <input type="text" id="card-expiry"placeholder="MM/YY">
                <p class="error-message"></p>
              </div>
              <div class="group-card-ccv">
                <label>
                  CVV2
                  <p class="mb-0">*</p>
                </label>
                <input type="text" id="card-cvv" placeholder="CVV2">
                <p class="error-message"></p>
              </div>
            </div>
            <div class="form-group-card-new">
              <label>
                Billing Address
                <p class="mb-0">*</p>
              </label>
              <input type="text" id="card-billing-address" placeholder="Billing Address">
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
                <p class="mb-0">*</p>
              </label>
              <input type="text" id="card-zip" placeholder="Zip">
              <p class="error-message"></p>
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
    function renderPopupUpload(dataImages) {

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
                  <p class="text-click-to-upload">Click to upload<p/>
                  <p> Or Drag and drop</p>
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
              <span class="click-upload">
                Click To Upload
              </span>
              <span class="drag-upload">
                Or Drag And Drop
              </span>
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
  function renderBlockTemplate(dataBlock) {
    // Variable data block
    const { dataHeaderNav, advertises, banner,sideInfo, bannerProSelected, color  } = dataRelease;
    const {promotion, policy, storeInfo, socialLink, socialIcon} = sideInfo;

    const $wrapWeb = $('.wrap-home-templates');
    const htmlHeaderNav = renderNavHeaderTemplates(dataHeaderNav);
    const htmlAdvertise = renderAdvertisePage(advertises);
    const htmlBannerPage = renderBannerPage(banner);
    const htmlTimeBooking = renderTimeBooking(dataBlock.dataBooking);
    // data render infoshop


    $wrapWeb.prepend(
      `<div class="wrap-header">${htmlHeaderNav}</div>`,
      `<div class="wrap-advertise-page">${htmlAdvertise}</div>`,
      `<div class="wrap-banner-page">${htmlBannerPage}</div>`,
      `<div class="wrap-service-infoshop">
        <div id="section-service" class="list-more">
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
        bannerProSelected.image && $loShowbg.css({
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

    let selectedDate = null;
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const fakeDataCalender = {
      8: [8, 9, 10, 12, 20, 22] // August: non-working days
    };

    // hiện nút scroll
    let forceShowScrollBtn = false;
    const $mainScrollBtn = $('.scroll-btn-main');

    renderBlockTemplate({listDataService, listUserStaff, dataBooking,dataMe,  dataGuest, dataFamily, currentUserId});

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
          const html = renderBasePopup(renderCartContent(dataCart));
          $wrapHomeTemp.append(html);

          setTimeout(() => {
            $('.overlay-screen').addClass('show');
          }, 10);
        });
        // Đóng popup cart
          // 1. Đóng khi click overlay-screen
            $wrapHomeTemp.on('click', '.overlay-screen', function (e) {
              if (e.target === this) closePopupContainerTemplate();
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
          if (selectedType === 'GUESTS'){
            dataBooking.type = typeBookingEnum.GUESTS;
            dataBooking.users = dataGuest;
            dataBooking.users[0].isChoosing = true;
          }
          else if (selectedType === 'FAMILY') {
            dataBooking.type = typeBookingEnum.FAMILY;
            // Verify trước khi gán dataBooking.users cho dataFamily
            const htmlPopupVerify = renderBasePopup(renderVerifyEmailPhoneContent())
            $wrapHomeTemp.append(htmlPopupVerify);
            setTimeout(() => {
              $('.overlay-screen').addClass('show');
            }, 10);
            // Vì chưa đăng nhập nên dataFamily khởi tạo là một mảng users:[]
            const tempFamily = [
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
              ]
            dataBooking.users = tempFamily;
          }
          else {
            dataBooking.type = typeBookingEnum.ME;
            dataBooking.users = dataMe;
          };


          // show or hide cả 2
          if (dataBooking.type !== typeBookingEnum.GUESTS) {
            $('.wrap-input-guests').addClass('hidden');
            $('.wrap-control').empty();
            $('.wrap-input-guests').empty();
          } else {
            $('.wrap-input-guests').removeClass('hidden');
            updateGuestSection();
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
          renderListService(listDataService, '.list-more', dataBooking, currentUserId);

          // render lại timming để cập timming đã chọn
          renderContainerTiming(
            dataBooking, currentDate, monthNames,
            dayNames, currentMonth, currentYear,
            fakeDataCalender, nextUser.selectedDate || selectedDate, currentUserId,
            listDataService,
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
          fakeDataCalender, selectedDate, currentUserId,
          listDataService,
        );
      })
      // Copy service
      $(document).on('click', '.btn-copy-service', function () {
        const userChoosing = dataBooking.users.find((u) => u.isChoosing);
        const userSelectedCopy = dataBooking.users.find((u) => u.isSelecting);

        // copy service
        if(userChoosing !== userSelectedCopy) {
          userChoosing.services = JSON.parse(JSON.stringify(userSelectedCopy.services));
        }
        // kiểm tra nếu action copy datetime on thì copy cả timming
        const isChecked = $('#select-banner-pm').prop('checked');
        if(isChecked){
          userChoosing.selectedDate = JSON.parse(JSON.stringify(userSelectedCopy.selectedDate));
          userChoosing.selectedTimeSlot = JSON.parse(JSON.stringify(userSelectedCopy.selectedTimeSlot));
        }
        // upadate lại list service
        renderListService(listDataService, '.list-more', dataBooking, currentUserId);

        // render lại timming để show timming vừa copy
        renderContainerTiming(
          dataBooking, currentDate, monthNames,
          dayNames, currentMonth, currentYear,
          fakeDataCalender, userChoosing.selectedDate, currentUserId,
          listDataService
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
    $(document).on('click', '.add-more .btn-add-more', function () {
      const $this = $(this);
      const $card = $this.closest('.card-more');

      // Thêm staff id defult vào user
      const staffSelecting = listUserStaff.find((st) => st.id == 'default');
      const idService = $this.closest('.more-item').data('id');
      const idItemService = $card.data('id');
      const userChoosing = dataBooking.users.find((u) => u.isChoosing === true);

      // nếu khong tìm thấy idService trong userChoosing thì thêm mới
      let serviceExit = userChoosing.services.find((item) => item.idService === idService);
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
        userChoosing.services.push(serviceExit);
      }
      const $action = renderActionButtons(idService, idItemService, dataBooking, currentUserId);
      $card.find('.add-more').replaceWith($action);

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

      //Cập nhật table booking
      renderSumary(dataBooking, listDataService);
    });
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

      const $action = renderActionButtons(idService, idItemService, dataBooking, currentUserId);
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
      e.stopPropagation();
      const $this = $(this);
      const idStaff = $this.data('id');
      const staffSelecting = listUserStaff.find((st) => st.id == idStaff);

      const idService = $this.closest('.more-item').data('id');
      const idItemService = $this.closest('.card-more').data('id');

      const userChoosing = dataBooking.users.find((u) => u.isChoosing === true);


      // nếu khong tìm thấy idService trong userChoosing thì thêm mới
      let serviceExit = userChoosing.services.find((item) => item.idService === idService);
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
        $(`[data-id=${dataId}].wrap-addOn .expand-addOn`).addClass('expanded')
      }
    })

    // selected add-on option
    $(document).on('click', '.item-addOn', function () {
      const $this = $(this);
      const $wrapAddOn = $this.closest('.wrap-addOn');
      const $checkboxAddOn = $this.find('.checkbox-addOn');

      const idService = $this.closest('.more-item').data('id');
      const idItemService = $wrapAddOn.data('id'); // id card-more
      const idItemAddOn = $this.data('id');

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

    // Xử lý sự kiện cho next verify
    $(document).on('click', '.btn-next-emailPhone', function () {
      // verify val input trước khi cho next
      const $appointInput = $('#appointment-input');
      const res = validateEmailPhoneInput($appointInput);
      if(!res) return;

      // Lưu lại vào dataBooking
      if(res === "PHONE"){
        dataBooking.users[0].phoneNumber = $appointInput.val();
        dataBooking.users[0].email = '';
      }
      if(res === "EMAIL"){
        dataBooking.users[0].phoneNumber = '';
        dataBooking.users[0].email = $appointInput.val();
      }

      const emailPhoneMasked = res === "EMAIL" ? dataBooking.users[0].email : dataBooking.users[0].phoneNumber;
      const newContent = renderVerifyCodeContent(emailPhoneMasked);
      const html = renderBasePopup(newContent);

      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');

        // focus vào input đầu tiên trong opt
        $('.otp-box[data-index="0"]').focus();

      }, 20);

      resendCountdown = 59;
      startResendTimer();
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

    // Cho phép back bằng phím <-
    $(document).on('keydown', '.otp-box', function (e) {
      const $this = $(this);
      const index = parseInt($this.data('index'), 10);

      if (e.key === 'Backspace' && !$this.val()) {
        $(`.otp-box[data-index="${index - 1}"]`).focus();
      }
    });

    // next verify code
    $(document).on('click', '.btn-next-verify',function () {
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

      const contentFormRegis = renderRegisterForm(dataRegis, fieldEntered);
      const html = renderBasePopup(contentFormRegis, 762, 886);
      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
      document.getElementById("phone-register").readOnly = (fieldEntered === typeInput.PHONE);
      document.getElementById("email-register").readOnly = (fieldEntered === typeInput.EMAIL);

      //clear interval time opt
      clearInterval(resendInterval);
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
      const htmlPopupVerify = renderBasePopup(renderVerifyEmailPhoneContent(emailOrPhone))

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
      const htmlPopupVerify = renderBasePopup(renderVerifyEmailPhoneContent(emailOrPhone))
      $wrapHomeTemp.append(htmlPopupVerify);

      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
    });
      // next verify
    $(document).on('click', '.btn-next-verify-register', function() {
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

      // Lưu thông tin vào dataBooking
      dataBooking.users[0].email = valEmailRegis;
      dataBooking.users[0].phoneNumber = valPhoneRegis;
      dataBooking.users[0].firstName = valFirstRegis;
      dataBooking.users[0].lastName = valLastRegis;

      // close và hiển thị gia đình
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
      $('.wrap-input-guests').removeClass('hidden');
      updateGuestSection();

    })
    // back form policies
    $(document).on('click', '.btn-back-policies', function() {
      const dataRegis = {
        firstName: dataBooking.users[0].firstName,
        lastName: dataBooking.users[0].lastName,
        email: dataBooking.users[0].email,
        phoneNumber: dataBooking.users[0].phoneNumber
      };

      const contentFormRegis = renderRegisterForm(dataRegis, fieldEntered);
      const html = renderBasePopup(contentFormRegis, 762, 886);

      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);

      document.getElementById("phone-register").readOnly = (fieldEntered === typeInput.PHONE);
      document.getElementById("email-register").readOnly = (fieldEntered === typeInput.EMAIL);

      // clear time nếu có
    })
    // next form policies
    $(document).on('click', '.btn-next-policies', function() {
      const contentPaymentMethod = renderPaymentMethodsForm();
      const html = renderBasePopup(contentPaymentMethod, 776, 886);

      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
    })
    // add new card
    $(document).on('click', '.add-new-card-btn', function () {
      const contentAddNewMethod = renderAddNewMethod();
      const html = renderBasePopup(contentAddNewMethod, 900, 886);

      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
    })
    // back: add new card
    $(document).on('click', '.btn-back-add-card', function() {
      const contentPaymentMethod = renderPaymentMethodsForm();
      const html = renderBasePopup(contentPaymentMethod, 776, 886);

      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
    })
    // back select payment
    $(document).on('click', '.btn-back-payment', function() {
      const contentPolicies = renderPoliciesForm();
      const html = renderBasePopup(contentPolicies, 768, 886);

      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
    })
    // Confirm payment final
    $(document).on('click', '.btn-next-payment', function () {
      const contentSuccessPayment = renderPaymentConfirmationForm();
      const html = renderBasePopup(contentSuccessPayment, 920, 886);

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
        if($this.data('type') === typeRequire.REQUIRED){
          const valEmail = $this.val().trim();

          allFilled = allFilled && valEmail;
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
      const html = renderBasePopup(renderPaymentMethodsForm(), 762, 886);
      $wrapHomeTemp.append(html);
      setTimeout(() => $('.overlay-screen').addClass('show'), 10);
    });

    // Chuyển sang form thêm thẻ mới
    $(document).on('click', '.btn-add-new-card', function () {
      const html = renderBasePopup(renderAddNewCardForm(), 762, 886);
      $wrapHomeTemp.html(html); // thay nội dung popup
      setTimeout(() => $('.overlay-screen').addClass('show'), 10);
    });

    // Lưu thẻ mới và quay lại form phương thức thanh toán
    $(document).on('click', '.btn-save-card', function () {
      // Giả lập lưu card (ở đây bạn call API thật)
      const newCard = {
        type: 'Visa',
        number: '**** 1234',
        exp: '12/28'
      };

      // Render lại form chọn phương thức với thẻ mới tick sẵn
      const html = renderBasePopup(renderPaymentMethodsForm(newCard), 762, 886);
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

      const html = renderBasePopup(renderPaymentConfirmationForm(paymentInfo), 762, 886);
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
        const popUpload = renderPopupUpload(dataImages);
        const html = renderBasePopup(popUpload, 810, 800);

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
            renderListService(listDataService, '.list-more', dataBooking, userChoosing?.id);
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
            const htmlPopupNotify = renderContentNotify(title, content,() => handleDeleteService(idUser))
            const html = renderBasePopup(htmlPopupNotify);

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

            const htmlPopupNotify = renderContentNotify(title, content, () => handleDeleteItemService(idUser, idService, idItemService));
            const html = renderBasePopup(htmlPopupNotify);

            $wrapHomeTemp.append(html);
            setTimeout(() => {
              $('.overlay-screen').addClass('show');
            }, 10);
          })



  // START: Xử lý option trên banner
    $(document).on("click",'#prev', function() {
      if (currentMonth > 0) {
        currentMonth--;
        // Khởi tạo ngày hôm nay làm selectedDate
        selectedDate = new Date(currentYear, currentMonth, currentDate.getDate());

        renderCalendar(monthNames, dayNames, currentMonth, currentYear, fakeDataCalender, selectedDate, dataBooking, currentUserId, listDataService);
        // Cập nhật tiêu đề ngày được chọn
        document.getElementById("selectedDateTitle").textContent = selectedDate.toDateString();
        // Hiển thị time slots cho ngày hôm nay
        renderTimeSlotsForDate(selectedDate, dataBooking, currentUserId, listDataService);
      }
    });
    $(document).on("click",'#next', function() {
      if (currentMonth < 11) {
        currentMonth++;
        // Khởi tạo ngày hôm nay làm selectedDate
        selectedDate = new Date(currentYear, currentMonth, currentDate.getDate());

        renderCalendar(monthNames, dayNames, currentMonth, currentYear, fakeDataCalender, selectedDate, dataBooking, currentUserId, listDataService);
        // Cập nhật tiêu đề ngày được chọn
        document.getElementById("selectedDateTitle").textContent = selectedDate.toDateString();
        // Hiển thị time slots cho ngày hôm nay
        renderTimeSlotsForDate(selectedDate, dataBooking, currentUserId, listDataService);
      }
    });

    // START: confirm booking
    $(document).on('click', '.btn-confirm-booking', function() {
      const contentPolicies = renderPoliciesForm();
      const html = renderBasePopup(contentPolicies, 768, 886);

      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
    })


    renderCalendar(monthNames, dayNames, currentMonth, currentYear, fakeDataCalender, selectedDate, dataBooking, currentUserId, listDataService);
    // Khởi tạo ngày hôm nay làm selectedDate và gán ngày hôm nay cho selectedDate user nếu selectedDate chưa có
    selectedDate = new Date(currentYear, currentMonth, currentDate.getDate());
    // Cập nhật tiêu đề ngày được chọn
    document.getElementById("selectedDateTitle").textContent = selectedDate.toDateString();
    // Hiển thị time slots cho ngày hôm nay
    renderTimeSlotsForDate(selectedDate, dataBooking, currentUserId, listDataService);

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
      console.log("check 1");
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

    $(document).on('click', '#page-fag', function () {
      const contentPaymentMethod = renderPaymentMethodsForm();
      const html = renderBasePopup(contentPaymentMethod, 776, 886);

      $wrapHomeTemp.append(html);
      setTimeout(() => {
        $('.overlay-screen').addClass('show');
      }, 10);
    })
  });

