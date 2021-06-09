import $ from "jquery";
import "select2/dist/js/select2.min";

import checkFailedResult from "./checkFailedResult";

function usersSearch(users, usersOnPage) {
  const loadMore = $(".js-more-button");
  const input = $(".search-form__search");
  const field = $(".js-search-select").select2("data")[0].id;
  const inputValue = input.val().toUpperCase();
  
  const filteredUsers = users.filter(user => {
    let heading;
    switch (field) {
      case "tel":
        heading = user.cell.edited.toUpperCase();
        break;
      default:
        heading = user[`${field}`].toUpperCase();
    }
    return heading.includes(inputValue);
  });
  
  filteredUsers.length > usersOnPage ? loadMore.removeClass("d-none") : loadMore.addClass("d-none");
  
  checkFailedResult(filteredUsers);
  return filteredUsers;
}

export default usersSearch;
