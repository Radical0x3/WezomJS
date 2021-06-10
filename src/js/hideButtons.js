import $ from "jquery";

function hideButtons() {
  $(".js-load-button").addClass("button--hiding");
  $(".js-more-button").addClass("button--hiding");
  $("body").addClass("loading");
}

export default hideButtons;