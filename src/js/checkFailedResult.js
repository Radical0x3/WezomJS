import $ from "jquery";
import Handlebars from "handlebars/dist/handlebars.min";

function checkFailedResult() {
  const cardsDisplayed = $(".js-user-card:not(.d-none)");
  const searchFailedBlock = $(".js-search-failed");
  const usersRow = $(".js-users-row");
  const statisticsBlock = $(".js-statistics");
  
  if (cardsDisplayed.length > 0) {
    searchFailedBlock.length > 0 ? searchFailedBlock.remove() : null;
    statisticsBlock.length > 0 ? statisticsBlock.removeClass("d-none") : null;
  } else {
    usersRow.length > 0 && searchFailedBlock.length === 0 ? usersRow.append(Handlebars.partials["SearchFailed"]()) : null;
    statisticsBlock.length > 0 ? statisticsBlock.addClass("d-none") : null;
  }
}

export default checkFailedResult;