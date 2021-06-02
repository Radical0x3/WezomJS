import $ from "jquery";

function moveFiltersNode() {
  let filtersNode = $(".filters");
  
  if (filtersNode.length > 0) {
    if (window.innerWidth <= 992) {
      $(".js-popup .popup__container").append(filtersNode);
    } else {
      $(".js-users-filters").append(filtersNode);
    }
  }
}

export default moveFiltersNode;