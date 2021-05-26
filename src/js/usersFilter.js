import $ from "jquery";
import Handlebars from "handlebars/dist/handlebars.min";

function usersFilter(event) {
  event.preventDefault();

  const input = document.querySelector(".filters-form__search");
  const field = $(".js-filter-select").select2("data")[0].id;
  const inputValue = input.value.toUpperCase();
  const cards = document.querySelectorAll(".js-user-card");

  cards.forEach(function getMatch(info) {
    let headingSelector;

    switch (field) {
      case "fullName":
        headingSelector = ".js-user-fullname";
        break;
      case "mobile":
        headingSelector = ".js-user-tel";
        break;
      case "email":
        headingSelector = ".js-user-email";
        break;
      default:
        headingSelector = ".user__fullname";
    }

    let heading = info.querySelector(headingSelector);
    let headingContent = heading.innerHTML.toUpperCase();

    if (headingContent.includes(inputValue)) {
      info.classList.remove("d-none");
    } else {
      info.classList.add("d-none");
    }
  });

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

export default usersFilter;
