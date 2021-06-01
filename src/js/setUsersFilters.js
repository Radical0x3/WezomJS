import Handlebars from "handlebars/dist/handlebars.min";

function setUsersFilters() {
  const filtersContainer = document.querySelector(".js-users-filters");
  const filtersNode = Handlebars.partials["Filters"]();
  
  if (!filtersContainer) {
    const col = document.createElement("div");
    col.classList.add("col-2", "mt-3", "pr-3", "js-users-filters");
    col.innerHTML = filtersNode;
    document.querySelector(".js-main-content").insertBefore(col, document.querySelector(".js-users-col"));
  }
}

export default setUsersFilters;