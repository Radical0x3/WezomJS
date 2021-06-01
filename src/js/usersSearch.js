import $ from "jquery";
import "select2/dist/js/select2.min";

import checkFailedResult from "./checkFailedResult";

function usersSearch(event) {
  event.preventDefault();
  
  const input = document.querySelector(".search-form__search");
  const field = $(".js-search-select").select2("data")[0].id;
  const inputValue = input.value.toUpperCase();
  const cards = document.querySelectorAll(".js-user-card:not(.js-hidden-by-filter)");
  
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
        headingSelector = ".js-user-fullname";
    }
    
    let heading = info.querySelector(headingSelector);
    let headingContent = heading.innerHTML.toUpperCase();
    
    if (headingContent.includes(inputValue)) {
      info.classList.remove("d-none");
    } else {
      info.classList.add("d-none");
    }
  });
  
  checkFailedResult();
}

export default usersSearch;
