import $ from "jquery";

import checkFailedResult from "../checkFailedResult";
import fillUsersOperatorSelect from "../fillUsersOperatorSelect";
import getNewStatistics from "../getNewStatistics";
import getUsersData from "../getUsersData";
import rebuildPagination from "../rebuildPagination";
import removeSearchFailedMessage from "../removeSearchFailedMessage";
import sortUsers from "../sortUsers";
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
  let newFoundUsers = usersSearch(users, usersOnPage);
  let newSortedUsers = [];
  $(".js-sort-select").select2("data").length > 0 ? newSortedUsers = sortUsers(newFoundUsers) : newSortedUsers = [...newFoundUsers];
  fillUsersOperatorSelect(newSortedUsers);
  getUsersData(newSortedUsers, page, usersOnPage);
  getNewStatistics(newSortedUsers, page, usersOnPage);
  rebuildPagination(newSortedUsers);
  
  const loadMore = $(".js-more-button");
  newSortedUsers.length > usersOnPage ? loadMore.removeClass("d-none") : loadMore.addClass("d-none");
  
  return [newFoundUsers, newSortedUsers];
}

export {
  searchFormHandlerForReset,
  searchFormHandlerForSearch
};