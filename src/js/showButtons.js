import $ from "jquery";

function showButtons() {
  $(".js-load-button").removeClass("button--hiding");
  $(".js-more-button").removeClass("button--hiding");
  $("body").removeClass("loading");
  $(".js-more-button").parent().removeClass("d-none");
}

export default showButtons;