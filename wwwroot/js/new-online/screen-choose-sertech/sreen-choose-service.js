// slider

export function ScreenChooseService() {
  const htmlHeaderSalon = HeaderSalon();
  const htmlCart = Cart();
  const arrayCate = [1, 2, 3, 4, 5, 6, 7, 8, 10];
  return `
        <div class="wrap-content-salon">
             <div class="header-sertech">
                ${htmlHeaderSalon}
            </div>
            <div class="content-choose-sertech">
                <div class="choose-services">
                    <div class="wrap-title">
                        <h2 class="title">CHOOSE SERVICES</h2>
                    </div>
                    <p class="desc">
                        Pick <strong>SERVICE</strong> if you know the service you want, or pick <strong>STAFF</strong> if you prefer your favorite technician.
                    </p>
                    <div class="btn-group-service">
                        <button class="btn-service active" data-type="service">
                            <img
                                alt="icon-nail"
                                src="/assets/new-online/icon-salon/icon-nail.png"
                                class="icon-nail"
                            />
                            SERVICE - I want to pick a services
                        </button>
                        <button class="btn-service" data-type="staff">
                            <i class="fa-solid fa-user-plus"></i>
                            STAFF - I want to pick a technician
                        </button>
                    </div>
                </div>
                <div class="categories-search">
                    <div class="categories">
                        <div class="slider-categories">
                            <div class="slider-track-categories">
                                <div class="item-cate active">
                                    <span class="name-cate">
                                        Popular
                                    </span>
                                    <span class="count">
                                        43
                                    </span>
                                </div>
                                ${arrayCate
                                  .map((item) => {
                                    return `
                                        <div class="item-cate">
                                            <span class="name-cate">
                                                New Services
                                            </span>
                                            <span class="count">
                                                32
                                            </span>
                                        </div>

                                    `;
                                  })
                                  .join("")}
                            </div>
                            <button class="slider-btn-categories prev">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>
                            <button class="slider-btn-categories next">
                                <i class="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <div class="wrap-search-ser">

                    </div>
                </div>
                ${htmlCart}
            </div>
        </div>
    `;
}

// import store
import { salonStore } from "../../store/new-online-store.js";
import { HeaderSalon } from "../header/header-salon.js";
import { Cart } from "../cart/cart.js";
$(document).ready(async function () {});
