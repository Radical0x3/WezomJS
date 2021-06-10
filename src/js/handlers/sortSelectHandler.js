import $ from "jquery";

import getUsersData from "../getUsersData";
import getNewStatistics from "../getNewStatistics";
import sortUsers from "../sortUsers";
import usersSearch from "../usersSearch";

function sortSelectHandler(filteredUsers, sortedUsers, page, usersOnPage) {
  let newSortedUsers = [];
  let newFoundUsers = usersSearch(filteredUsers, usersOnPage);
  $(".js-sort-select").select2("data").length > 0 ? newSortedUsers = sortUsers(newFoundUsers) : newSortedUsers = [...newFoundUsers];
  getUsersData(newSortedUsers, page, usersOnPage);
  getNewStatistics(newSortedUsers, page, usersOnPage);
  
  return [newFoundUsers, newSortedUsers];
}

export default sortSelectHandler;