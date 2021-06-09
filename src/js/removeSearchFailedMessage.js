import $ from "jquery";

function removeSearchFailedMessage() {
  const searchFailed = $(".js-search-failed-row");
  searchFailed.length > 0 ? searchFailed.remove() : null;
}

export default removeSearchFailedMessage;