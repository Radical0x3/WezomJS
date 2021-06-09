import $ from "jquery";

import createPagination from "./createPagination";

function rebuildPagination(users, page = 1) {
  let newUsersCount = users.length;
  let newUsersOnPage = $(".js-users-to-show").val();
  newUsersOnPage = newUsersOnPage === "all" ? newUsersCount : newUsersOnPage;
  let newUsersPagesCount = Math.ceil(newUsersCount / newUsersOnPage);
  
  createPagination(page, newUsersPagesCount);
}

export default rebuildPagination;