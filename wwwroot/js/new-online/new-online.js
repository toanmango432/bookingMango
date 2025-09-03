//import store
import { salonStore } from "../store/new-online-store.js";
// import component
import { ChooseNailSalon } from "./choose-nail-salon/choose-nail-salon.js";
// import helper
$(document).ready(async function () {
  const $wrapNewOnline = $(".wrap-newonline");

  const contentSalon = ChooseNailSalon();
  $wrapNewOnline.append(contentSalon);
});
