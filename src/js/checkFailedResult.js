import Handlebars from "handlebars/dist/handlebars.min";

function checkFailedResult() {
  const cardsDisplayed = document.querySelectorAll(
    ".js-user-card:not(.d-none)"
  );
  const searchFailedBlock = document.querySelector(".js-search-failed");
  const usersRow = document.querySelector(".js-users-row");
  const statisticsBlock = document.querySelector(".js-statistics");
  
  if (cardsDisplayed.length > 0) {
    searchFailedBlock ? searchFailedBlock.remove() : null;
    statisticsBlock ? statisticsBlock.classList.remove("d-none") : null;
  } else {
    usersRow && !searchFailedBlock
      ? usersRow.insertAdjacentHTML(
      "beforeend",
      Handlebars.partials["SearchFailed"]()
      )
      : null;
    statisticsBlock ? statisticsBlock.classList.add("d-none") : null;
  }
}

export default checkFailedResult;