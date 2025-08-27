export function renderBannerPage(colorPrimary, dataBannerPage) {
  const {
    greeting,
    brand,
    title,
    desc,
    bookFor,
    optionBooked,
    btnOptionBook,
    image,
  } = dataBannerPage;
  const imgBannerLeft1 =
    "/assets/images/banner-template/image-banner-left-1.png";
  const imgBannerLeft2 = "/assets/images/banner-template/cloud-left.png";

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
