import $ from "jquery";

function resetUsersSearch() {
  const cards = $(".js-user-card:not(.js-hidden-by-filter)");
  cards.each((id, item) => $(item).removeClass("d-none"));
  
  $(".js-search-select")
    .val($(".js-search-select option:eq(0)").val())
    .trigger("change");
  
  const statisticsBlock = $(".js-statistics");
  statisticsBlock.length > 0 ? statisticsBlock.removeClass("d-none") : null;
}

export default resetUsersSearch;
