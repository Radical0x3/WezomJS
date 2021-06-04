import $ from "jquery";

import setUsersAndPagination from "./setUsersAndPagination";

function changePagination(event, pagesCount, usersCount, usersOnPage, seed, filterOpts) {
  const targetItem = event.target.closest(".js-pagination-item");
  const activeItems = $(".js-pagination-item.active");
  const targetArrow = event.target.closest(".js-pagination-arrow:not(.pagination__arrow--disabled)");
  let page;
  
  if ($(targetItem).hasClass("active") && activeItems.length < 2) return;
  $(".js-search-input").val(null);
  
  if (targetItem) {
    page = +$(targetItem).text();
    const moreButton = $(".js-more-button");
    page === pagesCount ? moreButton.addClass("d-none") : moreButton.removeClass("d-none");
    
    return setUsersAndPagination(page, pagesCount, usersCount, usersOnPage, seed, filterOpts)
      .then(data => data);
  }
  
  if (targetArrow) {
    let action = $(targetArrow).data("page-action");
    page = +activeItems.eq(activeItems.length - 1).text();
    
    switch (action) {
      case "start":
        page = 1;
        break;
      case "end":
        page = pagesCount;
        break;
      case "prev":
        page = page - 1 > 0 ? page - 1 : 1;
        break;
      case "next":
        page = page + 1 <= pagesCount ? page + 1 : pagesCount;
        break;
      default:
        page = 1;
    }
    
    const moreButton = $(".js-more-button");
    page === pagesCount ? moreButton.addClass("d-none") : moreButton.removeClass("d-none");
    
    return setUsersAndPagination(page, pagesCount, usersCount, usersOnPage, seed, filterOpts)
      .then(data => data);
  }
}

export default changePagination;