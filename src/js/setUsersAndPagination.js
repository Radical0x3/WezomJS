import $ from "jquery";

import createPagination from "./createPagination";
import getNewStatistics from "./getNewStatistics";
import getFilteredUsers from "./getFilteredUsers";
import getUsersData from "./getUsersData";
import sortUsers from "./sortUsers";

function setUsersAndPagination(page, pagesCount, usersCount, usersOnPage, seed, filterOpts) {
  createPagination(page, pagesCount);
  
  let results;
  if (usersOnPage < usersCount) {
    results = usersOnPage;
  } else {
    results = usersCount;
  }
  if (page === pagesCount) {
    results = usersCount % results > 0 ? usersCount % results : results;
  }
  
  const users = getUsersData(`https://randomuser.me/api/?page=${page}&results=${results}&seed=${seed}`)
    .then((data) => {
      Object.entries(filterOpts).length > 0 ? getFilteredUsers(filterOpts) : null;
      $(".js-sort-select").select2("data").length > 0 ? sortUsers() : null;
      getNewStatistics();
      
      return [...$(".js-user-card")];
    });
  
  return users;
}

export default setUsersAndPagination;