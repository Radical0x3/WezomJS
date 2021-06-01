function removeSearchFailedMessage() {
  const searchFailed = document.querySelector(".js-search-failed");
  searchFailed ? searchFailed.remove() : null;
}

export default removeSearchFailedMessage;