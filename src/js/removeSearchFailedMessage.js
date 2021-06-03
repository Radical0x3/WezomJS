import $ from "jquery";

function removeSearchFailedMessage() {
  const searchFailed = $(".js-search-failed");
  searchFailed.length > 0 ? searchFailed.remove() : null;
}

export default removeSearchFailedMessage;