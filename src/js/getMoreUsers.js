import $ from "jquery";

import getNewStatistics from "./getNewStatistics";
import getUsersData from "./getUsersData";
import rebuildPagination from "./rebuildPagination";

function getMoreUsers(users, fromPage, pagesCount, usersCount, usersOnPage) {
  let activePages = $(".js-pagination-item.active");
  let page = +activePages.eq(activePages.length - 1).data("pageId");
  
  if (page < pagesCount) {
    page++;
    getUsersData(users, page, usersOnPage, true);
    
    $(`.js-pagination-item[data-page-id=${page}]`).addClass("active");
    let activeLength = $(".js-pagination-item.active");
    let firsActive = +activeLength.eq(0).data("pageId");
    let lastActive = +activeLength.eq(activeLength.length - 1).data("pageId");
    const pagesArray = [];
    
    for (let i = firsActive; i <= lastActive; i++) {
      pagesArray.push(i);
    }
    
    getNewStatistics(users, fromPage, usersOnPage, lastActive);
    
    if (lastActive <= pagesCount) {
      rebuildPagination(users, page, pagesArray);
    }
  }
}

export default getMoreUsers;