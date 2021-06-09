import $ from "jquery";

import setUsersAndPagination from "./setUsersAndPagination";

function changeUsersOnPage(users, page, usersOnPage, prevUsersOnPage, pagesCount) {
  let newPage = page;
  
  newPage = usersOnPage > prevUsersOnPage ? newPage / (usersOnPage / prevUsersOnPage) : prevUsersOnPage / usersOnPage * newPage;
  newPage = newPage < 1 ? 1 : Math.ceil(newPage);
  newPage = newPage > pagesCount ? pagesCount : newPage;
  
  const moreButton = $(".js-more-button");
  newPage === pagesCount ? moreButton.addClass("d-none") : moreButton.removeClass("d-none");
  setUsersAndPagination(users, newPage, users.length, usersOnPage);
  return newPage;
}

export default changeUsersOnPage;