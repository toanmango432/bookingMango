// SNAKE text error
export function shakeError($el) {
  $el.addClass("shake");
  setTimeout(() => {
    $el.removeClass("shake");
  }, 400);
}
// SHOW error valid input, and snake text
export function showInputError($input, message, isSnake = false) {
  let $error = $input.siblings(".error-message");
  $error.text(message);

  isSnake && shakeError($error);
}
export function clearInputError($input) {
  $input.siblings(".error-message").text("");
}
