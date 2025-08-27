// function update show content nút scroll to target
export function updateScrollButton(options = {}) {
  const $mainScrollBtn = $(".scroll-btn-main");

  if (options.text) {
    $mainScrollBtn.find(".text-control-scroll").text(options.text);
  }
  if (options.icon) {
    $mainScrollBtn.find(".icon-control-scroll i").attr("class", options.icon);
  }
  if (options.target) {
    $mainScrollBtn.data("target", options.target);
  }
  if (options.trigger) {
    $mainScrollBtn.data("trigger", options.trigger);
  }
  if (options.triggerBanner) {
    $mainScrollBtn.attr("data-trigger-banner", options.triggerBanner);
  }

  // forceShowScrollBtn = !!options.force;
  $mainScrollBtn.fadeIn();
}
//function hiển thị button scroll
export function showScrollToTarget(dataBooking, directUp = false) {
  // Ưu tiên check user choosing
  const currentUser = dataBooking.users.find((u) => u.isChoosing);
  // Nếu chưa chọn service
  if (!currentUser.services || currentUser.services.length === 0) {
    updateScrollButton({
      target: "#section-service",
      trigger: "#trigger-service",
      triggerBanner: "#triggerBlockSumary",
      text: "Choose Service",
      icon: `fa fa-hand-pointer ${directUp ? "up" : "down"}`,
      force: false,
    });
    return true;
  }

  // Nếu chưa chọn date hoặc time slot
  if (!currentUser.selectedDate || !currentUser.selectedTimeSlot) {
    updateScrollButton({
      target: "#section-date-time",
      trigger: "#trigger-date-time",
      triggerBanner: "#triggerBlockSumary",
      text: "Select Date & Time",
      icon: "fa fa-hand-pointer down",
      force: false,
    });
    return true;
  }
  // kiểm tra các user đã chọn service, time
  // to-do
  return false;
}
// function kiểm tra dataBooking đã chọn đầy đủ service và timming all users, show scroll continue
export function showScrollToFinalBooking(dataBooking) {
  if (!dataBooking.users) {
    return (
      dataBooking.services.length > 0 &&
      dataBooking.selectedDate &&
      dataBooking.selectedTimeSlot
    );
  }
  return dataBooking.users.every((item) => {
    return (
      item.services.length > 0 && item.selectedDate && item.selectedTimeSlot
    );
  });
}
