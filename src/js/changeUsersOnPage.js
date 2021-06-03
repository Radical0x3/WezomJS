import $ from "jquery";

import setUsersAndPagination from "./setUsersAndPagination";

function changeUsersOnPage(usersOnPage, usersCount, prevUsersOnPage, pagesCount, filterOpts, seed) {
  let page = +$(".js-pagination-item.active").eq(0).text();
  
  if (usersOnPage < usersCount) {
    page = usersOnPage > prevUsersOnPage ? page / (usersOnPage / prevUsersOnPage) : prevUsersOnPage / usersOnPage * page;
    page = page < 1 ? 1 : Math.ceil(page);
    page = page > pagesCount ? pagesCount : page;
  }
  
  const moreButton = $(".js-more-button");
  page === pagesCount ? moreButton.addClass("d-none") : moreButton.removeClass("d-none");
  
  setUsersAndPagination(page, pagesCount, usersCount, usersOnPage, seed, filterOpts);
}

export default changeUsersOnPage;