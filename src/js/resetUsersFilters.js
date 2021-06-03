import $ from "jquery";

function resetUsersFilters() {
  const cards = $(".js-user-card");
  cards.each((id, item) => $(item).removeClass("d-none js-hidden-by-filter"));
  
  const statisticsBlock = $(".js-statistics");
  statisticsBlock.length > 0 ? statisticsBlock.removeClass("d-none") : null;
}

export default resetUsersFilters;