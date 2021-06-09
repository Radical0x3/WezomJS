import $ from "jquery";

import createPagination from "./createPagination";
import fillUsersOperatorSelect from "./fillUsersOperatorSelect";
import getFilteredUsers from "./getFilteredUsers";
import getNewStatistics from "./getNewStatistics";
import getUsersData from "./getUsersData";
import setUsersFilters from "./setUsersFilters";
import sortUsers from "./sortUsers";

function getMoreUsers(users, pagesCount, usersCount, usersOnPage, filterOpts) {
  let activePages = $(".js-pagination-item.active");
  let page = +activePages.eq(activePages.length - 1).data("pageId");
  
  if (page < pagesCount) {
    page++;
    
    return getUsersData(users, page, usersOnPage, true)
      .then(() => {
        Object.entries(filterOpts).length > 0 ? getFilteredUsers(filterOpts) : null;
        setUsersFilters();
        fillUsersOperatorSelect();
        $(".js-sort-select").select2("data").length > 0 ? sortUsers() : null;
        getNewStatistics();
      })
      .then(() => {
        $(`.js-pagination-item[data-page-id=${page}]`).addClass("active");
        let activeLength = $(".js-pagination-item.active");
        let firsActive = +activeLength.eq(0).data("pageId");
        let lastActive = +activeLength.eq(activeLength.length - 1).data("pageId");
        
        const pagesArray = [];
        for (let i = firsActive; i <= lastActive; i++) {
          pagesArray.push(+i);
        }
        
        if (lastActive <= pagesCount) {
          createPagination(lastActive, pagesCount, pagesArray);
        }
        
        if (lastActive === pagesCount) {
          $(".js-more-button").addClass("d-none");
        } else {
          $(".js-more-button").removeClass("d-none");
        }
        
        return [...$(".js-user-card")];
      });
  }
}

export default getMoreUsers;