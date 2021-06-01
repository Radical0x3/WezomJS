import $ from "jquery";

function resetUsersSearch() {
  const cards = document.querySelectorAll(".js-user-card:not(.js-hidden-by-filter)");
  cards.forEach((item) => item.classList.remove("d-none"));

  $(".js-search-select")
    .val($(".js-search-select option:eq(0)").val())
    .trigger("change");

  const statisticsBlock = document.querySelector(".js-statistics");
  statisticsBlock ? statisticsBlock.classList.remove("d-none") : null;
}

export default resetUsersSearch;
