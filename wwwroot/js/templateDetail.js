const dataTemplate = JSON.parse(localStorage.getItem('dataTemplate'));
let dataRelease = JSON.parse(JSON.stringify(dataTemplate));
const typeBookingEnum = {
    GUESTS: 'GUESTS',
    ME: 'ME',
    FAMILY: 'FAMILY'
};
const genderEnum = {
    OTHER: 'OTHER',
    MALE: 'MALE',
    FEMALE: 'FEMALE',
}

let dataBooking = {
    type: typeBookingEnum.ME,
    users: [
        {
            firstName: 'Shane',
            lastName: 'Fox',
            phoneNumber: '0230203023',
            email: 'jessica.hanson@gmail.com',
            gender: genderEnum.MALE

        }
    ]
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
                return `
              <button id="${item.id}" class="text-uppercase option">
                ${item.name}
                ${iconItemNav}
              </button>
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
  `;
}
function renderBannerPage(dataBannerPage) {
    const { greeting, brand, title, desc, bookFor, btnOptionBook, image } = dataBannerPage;
    const imgBannerLeft1 = "/assets/images/banner-template/image-banner-left-1.png"
    const imgBannerLeft2 = "/assets/images/banner-template/cloud-left.png"

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
            <button class="btn-just-me"
              style="
                --color-book-for: ${btnOptionBook.color};
                --bg-book-for: ${btnOptionBook.bgColor};
                --border-book-for: ${btnOptionBook.border};
              "
            >
              ${btnOptionBook.content}
              ${btnOptionBook.icon}
            </button>
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

// Function render block element
function renderBlockTemplate() {
    // Variable data block
    const { dataHeaderNav, advertises, banner } = dataRelease;

    const $wrapWeb = $('.wrap-home-templates');
    const htmlHeaderNav = renderNavHeaderTemplates(dataHeaderNav);
    const htmlAdvertise = renderAdvertisePage(advertises);
    const htmlBannerPage = renderBannerPage(banner);

    $wrapWeb.prepend(
        `<div class="wrap-header">${htmlHeaderNav}</div>`,
        `<div class="wrap-advertise-page">${htmlAdvertise}</div>`,
        `<div class="wrap-banner-page">${htmlBannerPage}</div>`
    );
}

$(document).ready(function () {
    renderBlockTemplate();
})