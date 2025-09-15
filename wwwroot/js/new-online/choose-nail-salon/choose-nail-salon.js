// helper in
function listSalon(group) {
  return `
        <div class="list-salon">
            ${group
              .map((item) => {
                return `
                    <div
                      class="item-salon"
                      data-id=${item.storeID}
                      data-rvcno=${item.rvcNo}
                    >
                        <div class="infor-salon">
                            <div class="wrap-avt">
                                <img src="${
                                  baseLogoSalon + item?.logo
                                }" alt="Image salon" class="avt-salon"/>
                            </div>
                            <div class="salon-address">
                                <h1 class="text-uppercase">${
                                  item?.storeName
                                }</h1>
                                <div class="address">
                                    <span class="icon-address">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                            <path d="M15.5 10C15.5 11.6569 14.1569 13 12.5 13C10.8431 13 9.5 11.6569 9.5 10C9.5 8.34315 10.8431 7 12.5 7C14.1569 7 15.5 8.34315 15.5 10Z" stroke="#181818" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M19.5 9.75C19.5 15.375 12.5 21 12.5 21C12.5 21 5.5 15.375 5.5 9.75C5.5 6.02208 8.63401 3 12.5 3C16.366 3 19.5 6.02208 19.5 9.75Z" stroke="#181818" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                    <span class="text-address">${
                                      item?.addressLine
                                    }</span>
                                </div>
                            </div>
                        </div>
                        <div class="book-now">
                            <button class="book-salon text-uppercase">Book Now</button>
                        </div>
                    </div>
                `;
              })
              .join("")}
        </div>
    `;
}
// slider
export function initSliderFromElement(
  sliderTrackEl,
  containerEl,
  cardSelector,
  btnNextSelector,
  btnPreSelector,
  offsetSetting = 0
) {
  const track = containerEl.querySelector(sliderTrackEl);
  const cards = containerEl.querySelectorAll(cardSelector);

  const prevBtn = containerEl.querySelector(btnPreSelector);

  const nextBtn = containerEl.querySelector(btnNextSelector);
  if (!cards.length || !track) return;

  const cardWidth = cards[0].offsetWidth + 16;
  const visibleWidth = containerEl.offsetWidth - offsetSetting;
  let currentOffset = 0;

  function updateButtons() {
    const maxOffset = track.scrollWidth - visibleWidth;
    prevBtn.style.display = currentOffset <= 0 ? "none" : "block";
    nextBtn.style.display = currentOffset >= maxOffset ? "none" : "block";
  }

  function moveSlider(direction) {
    const maxOffset = track.scrollWidth - visibleWidth;
    if (direction === "next") {
      currentOffset = Math.min(currentOffset + cardWidth, maxOffset);
    } else {
      currentOffset = Math.max(currentOffset - cardWidth, 0);
    }
    track.style.transform = `translateX(-${currentOffset}px)`;
    updateButtons();
  }

  prevBtn.addEventListener("click", () => moveSlider("prev"));
  nextBtn.addEventListener("click", () => moveSlider("next"));
  updateButtons();
}
export async function ChooseNailSalon() {
  await salonStore.getState().getAllSalon();
  const $wrapNewOnline = $(".wrap-newonline");
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };
  let allSalon = salonStore.getState().allSalon;

  const chunkArr = chunkArray(allSalon, 9);
  const htmlHeaderLocation = HeaderLocation();

  const htmlChooseNailSalon = `
        <div class="wrap-content-salon">
            <div class="header-salon">
                ${htmlHeaderLocation}
            </div>
            <div class="content-salon">
                <div class="slider-booking">
                    <div class="slider-track-salon">
                        ${chunkArr
                          .map((group) => {
                            const htmlListSalon = listSalon(group);
                            return htmlListSalon;
                          })
                          .join("")}
                    </div>
                    <button class="slider-btn-booking prev">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <button class="slider-btn-booking next">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
  $wrapNewOnline.empty();
  $wrapNewOnline.append(htmlChooseNailSalon);
  //init slider
  setTimeout(() => {
    const sliderEl = document.querySelector(
      ".wrap-content-salon .content-salon"
    );
    const sliderTrackSelector = ".slider-track-salon";
    const cardSelector = ".list-salon";
    const btnNextSelector = ".slider-btn-booking.prev";
    const btnPreSelector = ".slider-btn-booking.next";
    if (sliderEl) {
      initSliderFromElement(
        sliderTrackSelector,
        sliderEl,
        cardSelector,
        btnNextSelector,
        btnPreSelector
      );
    }
  }, 0);
  return htmlChooseNailSalon;
}

//import store
import { salonStore } from "../../store/new-online-store.js";
// import component
import { HeaderLocation } from "../header/header-location.js";
import { ServiceOrTech } from "../service-or-tech/service-or-tech.js";

// import constant
import { baseLogoSalon } from "../../constants/base-url.js";

$(document).ready(async function () {
  const allSalon = salonStore.getState().allSalon;
  const $wrapNewOnline = $(".wrap-newonline");

  $(document).on("click", ".item-salon", function () {
    let allSalon = salonStore.getState().allSalon;

    const $this = $(this);
    const rvcNoChoose = $this.data("rvcno");
    const idStore = $this.data("id");
    salonStore.setState({ RVCNo: rvcNoChoose });

    const salonChoosing =
      allSalon.find((item) => item.storeID == idStore) || {};
    salonStore.setState({ salonChoosing: { ...salonChoosing } });

    // đổi route mà không reload
    history.pushState({}, "", `/new-online/${rvcNoChoose}`);
    ServiceOrTech();

    // save salon choosing
  });
});
