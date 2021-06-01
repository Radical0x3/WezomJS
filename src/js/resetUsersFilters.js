function resetUsersFilters() {
  const cards = document.querySelectorAll(".js-user-card");
  cards.forEach((item) => item.classList.remove("d-none", "js-hidden-by-filter"));
  
  const statisticsBlock = document.querySelector(".js-statistics");
  statisticsBlock ? statisticsBlock.classList.remove("d-none") : null;
}

export default resetUsersFilters;