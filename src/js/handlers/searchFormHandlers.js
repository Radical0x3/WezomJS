import fillUsersOperatorSelect from "../fillUsersOperatorSelect";
import getNewStatistics from "../getNewStatistics";
import getUsersData from "../getUsersData";
import removeSearchFailedMessage from "../removeSearchFailedMessage";

import $ from "jquery";
import rebuildPagination from "../rebuildPagination";
import usersSearch from "../usersSearch";

function searchFormHandlerForReset(users, page, usersOnPage) {
  getUsersData(users, page, usersOnPage);
  getNewStatistics(users, page, usersOnPage);
  removeSearchFailedMessage();
  fillUsersOperatorSelect(users);
  rebuildPagination(users);
  
  $(".js-search-select")
    .val($(".js-search-select option:eq(0)").val())
    .trigger("change");
  
  const loadMore = $(".js-more-button");
  users.length > usersOnPage ? loadMore.removeClass("d-none") : loadMore.addClass("d-none");
}

function searchFormHandlerForSearch(users, page, usersOnPage) {
  let foundUsers = usersSearch(users, usersOnPage);
  fillUsersOperatorSelect(foundUsers);
  getUsersData(foundUsers, page, usersOnPage);
  getNewStatistics(foundUsers, page, usersOnPage);
  rebuildPagination(foundUsers);
  
  return foundUsers;
}

export {
  searchFormHandlerForReset,
  searchFormHandlerForSearch
};