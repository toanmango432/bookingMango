export function renderCartProfile(dataBooking, dataHeaderNav) {
  const buttonBooking = dataHeaderNav.buttonBooking;
  const iconUser = dataHeaderNav.iconUser;
  return `
    <div class="cart-profile">
      <button class="user">${iconUser}</button>
      <div class="right-profile">
        <button class="booking text-uppercase"
          style="
            --btn-bg: ${buttonBooking.bgBtn};
            --btn-color: ${buttonBooking.color};
            --btn-border: ${buttonBooking.border};
            --btn-bg-hover: ${buttonBooking.bgColorHover};
          ">
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
  `;
}
import { renderCartUser } from "./cart-user.js";
