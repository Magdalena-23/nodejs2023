function removeErrorMessage(inputElement) {
  const errorMessage =
    inputElement.parentElement.querySelector(".error-message");
  if (errorMessage) {
    inputElement.parentElement.removeChild(errorMessage);
  }
}
