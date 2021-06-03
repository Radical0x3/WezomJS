import $ from "jquery";
import Handlebars from "handlebars/dist/handlebars.min";

function setUsersFilters() {
  const filtersContainer = $(".js-users-filters");
  const filtersNode = Handlebars.partials["Filters"]();
  
  if (filtersContainer.length === 0) {
    const col = $(document.createElement("div"));
    col.addClass("col-xxl-2 col-lg-3 d-lg-block d-none mt-3 pr-3 js-users-filters");
    col.html(filtersNode);
    $(".js-users-col").before(col);
  }
}

export default setUsersFilters;