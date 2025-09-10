// import component
import { ChooseNailSalon } from "./choose-nail-salon/choose-nail-salon.js";
// import helper
$(document).ready(async function () {
  const $wrapNewOnline = $(".wrap-newonline");

  await ChooseNailSalon();
});
