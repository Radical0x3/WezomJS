import $ from "jquery";
import "select2/dist/js/select2.min";

import checkFailedResult from "./checkFailedResult";

function usersSearch() {
  const input = $(".search-form__search");
  const field = $(".js-search-select").select2("data")[0].id;
  const inputValue = input.val().toUpperCase();
  const cards = $(".js-user-card:not(.js-hidden-by-filter)");
  
  cards.each(function (index, elem) {
    let element = $(elem);
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
        headingSelector = ".js-user-fullname";
    }
    
    let heading = element.find(headingSelector);
    let headingContent = heading.text().toUpperCase();
    
    if (headingContent.includes(inputValue)) {
      element.removeClass("d-none");
    } else {
      element.addClass("d-none");
    }
  });
  
  checkFailedResult();
}

export default usersSearch;
