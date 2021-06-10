import $ from "jquery";

import createPagination from "./createPagination";

function rebuildPagination(users, page = 1, pagesArray = []) {
  let newUsersCount = users.length;
  let newUsersOnPage = $(".js-users-to-show").val();
  newUsersOnPage = newUsersOnPage === "all" ? newUsersCount : newUsersOnPage;
  let newUsersPagesCount = Math.ceil(newUsersCount / newUsersOnPage);
  
  createPagination(page, newUsersPagesCount, pagesArray);
  
  if (page === newUsersPagesCount) {
    $(".js-more-button").addClass("d-none");
  } else {
    $(".js-more-button").removeClass("d-none");
  }
}

export default rebuildPagination;