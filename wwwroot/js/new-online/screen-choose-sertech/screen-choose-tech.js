// import store
import { salonStore } from "../../store/new-online-store.js";
import { HeaderSalon } from "../header/header-salon.js";

export function ScreenChooseTech() {
  const htmlHeaderSalon = HeaderSalon();
  return `
        <div class="wrap-screen-choose-service">
             <div class="header-sertech">
                ${htmlHeaderSalon}
            </div>
            <div class="content-choose-sertech">
                <div class="choose-services">
                    <h2 class="title">CHOOSE SERVICES</h2>
                    <p class="desc">
                        Pick <b>SERVICE</b> if you know the service you want, or pick <b>STAFF</b> if you prefer your favorite technician.
                    </p>
                    <div class="btn-group-service">
                        <button class="btn-service" data-type="service">
                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                        SERVICE - I want to pick a services
                        </button>
                        <button class="btn-service active" data-type="staff">
                        <i class="fa-solid fa-user-plus"></i>
                        STAFF - I want to pick a technician
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

$(document).ready(async function () {});
