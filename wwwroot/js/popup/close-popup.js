export function closePopupContainerTemplate() {
  const $overlay = $(".overlay-screen");
  $overlay.removeClass("show"); // remove class để thu nhỏ

  setTimeout(() => {
    $overlay.remove();
  }, 300); // chờ animation xong mới xóa DOM
}
