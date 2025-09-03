// helper in
function listSalon(group) {
  return `
        <div class="list-salon">
            ${group
              .map((item) => {
                return `
                    <div class="item-salon">
                        <div class="infor-salon">
                            <div class="wrap-avt">
                                <img src="" alt="Image salon" class="avt-salon"/>
                            </div>
                            <div class="salon-address">
                                <h1 class="text-uppercase">MIA NAILS & SPA</h1>
                                <div class="address">
                                    <span class="icon-address">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                            <path d="M15.5 10C15.5 11.6569 14.1569 13 12.5 13C10.8431 13 9.5 11.6569 9.5 10C9.5 8.34315 10.8431 7 12.5 7C14.1569 7 15.5 8.34315 15.5 10Z" stroke="#181818" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M19.5 9.75C19.5 15.375 12.5 21 12.5 21C12.5 21 5.5 15.375 5.5 9.75C5.5 6.02208 8.63401 3 12.5 3C16.366 3 19.5 6.02208 19.5 9.75Z" stroke="#181818" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                    <span class="text-address">2118 Thornridge Cir. Syracuse, Connecticut 35624</span>
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
function initSliderFromElement(containerEl, cardSelector) {
  const track = containerEl.querySelector(".slider-track-salon");
  const cards = containerEl.querySelectorAll(cardSelector);
  const prevBtn = containerEl.querySelector(".slider-btn-booking.prev");
  const nextBtn = containerEl.querySelector(".slider-btn-booking.next");

  if (!cards.length || !track) return;

  const cardWidth = cards[0].offsetWidth + 16;
  const visibleWidth = containerEl.offsetWidth;
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
export function ChooseNailSalon() {
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };
  const arrfake = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1,
  ];
  const chunkArr = chunkArray(arrfake, 9);
  const htmlHeaderLocation = HeaderLocation();
  return `
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
}

//import store
import { salonStore } from "../../store/new-online-store.js";
// import component
import { HeaderLocation } from "../header/header-location.js";
import { ServiceOrTech } from "../service-or-tech/service-or-tech.js";
$(document).ready(async function () {
  const $wrapNewOnline = $(".wrap-newonline");
  const $wrapContenSalon = $(".wrap-content-salon");

  setTimeout(() => {
    const sliderEl = document.querySelector(
      ".wrap-content-salon .content-salon"
    );
    if (sliderEl) {
      initSliderFromElement(sliderEl, ".list-salon");
    }
  }, 0);

  $(document).on("click", ".book-salon", function () {
    $wrapNewOnline.empty();
    const htmlWrapContentSertech = ServiceOrTech();

    $wrapNewOnline.append(htmlWrapContentSertech);
  });
});
