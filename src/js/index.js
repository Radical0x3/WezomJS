import "core-js/stable";
import "regenerator-runtime/runtime";
import $ from "jquery";
import "select2/dist/js/select2.min";

import changePagination from "./changePagination";
import changeUsersOnPage from "./changeUsersOnPage";
import checkFiltersOptionAvailability from "./checkFiltersOptionAvailability";
import createPagination from "./createPagination";
import disableSelectGroup from "./disableSelectGroup";
import enableAllSelectGroup from "./enableAllSelectGroup";
import fillUsersOperatorSelect from "./fillUsersOperatorSelect";
import getFilteredUsers from "./getFilteredUsers";
import getFiltersOptions from "./getFiltersOptions";
import getMoreUsers from "./getMoreUsers";
import getNewStatistics from "./getNewStatistics";
import getRandomNumber from "./getRandomNumber";
import initApp from "./initApp";
import getUsersData from "./getUsersData";
import moveFiltersNode from "./moveFiltersNode";
import {openPopup} from "./popup";
import {operatorsSelectHandlerForSelect, operatorsSelectHandlerForUnselect} from "./handlers/operatorsSelectHandlers";
import rebuildPagination from "./rebuildPagination";
import removeSearchFailedMessage from "./removeSearchFailedMessage";
import resetSortOptionsOrder from "./resetSortOptionsOrder";
import {searchFormHandlerForReset, searchFormHandlerForSearch} from "./handlers/searchFormHandlers";
import setUsersFilters from "./setUsersFilters";
import sortSelectHandler from "./handlers/sortSelectHandler";
import sortUsers from "./sortUsers";
import usersSearch from "./usersSearch";

import "./registerHandebarsParts";
import "../scss/style.scss";


// HTML HOT MODULE REPLACEMENT WHEN IT'S DEVELOPMENT MODE <--------------------
if (process.env.NODE_ENV === "development") {
  require("../html/index.html");
}

$(document).ready(function () {
  // GLOBAL SETTINGS <--------------------
  let filterOpts = {};
  let usersCount = 0;
  let usersOnPage = 0;
  let pagesCount = 0;
  let page = 1;
  let fromPage = 1;
  
  let defaultUsers = [];
  let filteredUsers = [];
  let foundUsers = [];
  let sortedUsers = [];
  
  const searchSelect = $(".js-search-select");
  const sortSelect = $(".js-sort-select");
  const usersToShowSelect = $(".js-users-to-show");
  
  // INITIALIZE SELECT2 PLUGIN'S INSTANCES <--------------------
  searchSelect.select2();
  sortSelect.select2();
  usersToShowSelect.select2();
  
  $(".js-open-filters").on("click", () => openPopup(1));
  
  // LOAD USERS FROM RANDOMUSER.ME <--------------------
  $(".js-load-button").on("click", function () {
    const url = `https://randomuser.me/api/?results=${getRandomNumber(1, 100)}`;
    initApp(url).then(data => {
      defaultUsers = data;
      filteredUsers = data;
      foundUsers = data;
      sortedUsers = data;
    }).then(() => {
      Object.entries(filterOpts).length > 0 ? filteredUsers = getFilteredUsers(filterOpts, defaultUsers) : null;
      foundUsers = [...filteredUsers];
      $(".js-sort-select").select2("data").length > 0 ? sortedUsers = sortUsers(foundUsers) : sortedUsers = [...foundUsers];
      $(".js-search-row").removeClass("d-none");
    })
      .then(() => {
        usersCount = sortedUsers.length;
        usersOnPage = $(".js-users-to-show").val();
        usersOnPage = usersOnPage === "all" ? usersCount : usersOnPage;
        
        getUsersData(sortedUsers, page, usersOnPage);
      })
      .then(() => {
        setUsersFilters();
        moveFiltersNode();
        checkFiltersOptionAvailability(sortedUsers);
        getNewStatistics(sortedUsers, page, usersOnPage);
      })
      .then(() => {
        pagesCount = Math.ceil(usersCount / usersOnPage);
        createPagination(1, pagesCount);
      })
      .then(() => {
        $(".js-search-input").val(null);
        $(".js-statistics").removeClass("d-none");
        const loadMore = $(".js-more-button");
        usersCount > usersOnPage ? loadMore.removeClass("d-none") : loadMore.addClass("d-none");
        fillUsersOperatorSelect(sortedUsers);
      })
      .then(() => {
        // FILTERS FORM HANDLERS <--------------------
        const filtersForm = $(".js-filters-form");
        filtersForm.on("click", function (e) {
          const targetInput = e.target.closest("input");
          
          if (targetInput) {
            filterOpts = getFiltersOptions(targetInput, filterOpts);
            filteredUsers = getFilteredUsers(filterOpts, defaultUsers);
            
            foundUsers = usersSearch(filteredUsers, usersOnPage);
            sortedUsers = sortUsers(foundUsers);
            getUsersData(sortedUsers, page, usersOnPage);
            getNewStatistics(sortedUsers, page, usersOnPage);
            fillUsersOperatorSelect(sortedUsers);
            rebuildPagination(sortedUsers, page);
          }
        });
        filtersForm.on("reset", function () {
          filteredUsers = [...defaultUsers];
          foundUsers = usersSearch(filteredUsers, usersOnPage);
          sortedUsers = sortUsers(foundUsers);
          getUsersData(sortedUsers, page, usersOnPage);
          getNewStatistics(sortedUsers, page, usersOnPage);
          rebuildPagination(sortedUsers, page);
          removeSearchFailedMessage();
          
          operatorsSelect.val(null).trigger("change");
          filterOpts = {};
          fillUsersOperatorSelect(filteredUsers);
        });
        
        // OPERATORS SELECT HANDLERS <--------------------
        const operatorsSelect = $(".js-operators-select");
        operatorsSelect.on("select2:select", (event) => {
          filteredUsers = operatorsSelectHandlerForSelect(event, sortedUsers, page, usersOnPage, filterOpts);
        });
        operatorsSelect.on("select2:unselect", (event) => {
          filteredUsers = operatorsSelectHandlerForUnselect(event, sortedUsers, page, usersOnPage, filterOpts);
        });
        
        // PAGINATION HANDLERS <--------------------
        $(".js-pagination-col").on("click", (event) => {
          changePagination(event, sortedUsers, pagesCount, usersCount, usersOnPage, filterOpts);
          fromPage = +$(".js-pagination-item.active").eq(0).data("pageId");
        });
      });
  });
  
  $(".js-more-button").on("click", () => {
    getMoreUsers(sortedUsers, fromPage, pagesCount, usersCount, usersOnPage);
  });
  
  $(window).on("resize", moveFiltersNode);
  
  // SEARCH SELECT HANDLERS <--------------------
  searchSelect.on("select2:select", () => {
    foundUsers = searchFormHandlerForSearch(sortedUsers, page, usersOnPage);
    sortedUsers = [...foundUsers];
  });
  sortSelect.on("select2:selecting", (event) => disableSelectGroup(event, this, true));
  sortSelect.on("select2:select", function (event) {
    const element = $(event.params.data.element);
    element.detach();
    $(this).append(element);
    $(this).trigger("change");
    
    [foundUsers, sortedUsers] = sortSelectHandler(filteredUsers, sortedUsers, page, usersOnPage);
  });
  sortSelect.on("select2:unselecting", (event) => disableSelectGroup(event, this, false));
  sortSelect.on("select2:unselect", function (event) {
    resetSortOptionsOrder(event, this);
    [foundUsers, sortedUsers] = sortSelectHandler(filteredUsers, sortedUsers, page, usersOnPage);
  });
  sortSelect.on("change", function (event) {
    event.ok ? enableAllSelectGroup(sortSelect) : null;
  });

// USERS TO SHOW SELECT HANDLERS <--------------------
  usersToShowSelect.on("change", function (event) {
    let prevUsersOnPage = usersOnPage;
    usersOnPage = isNaN(+event.target.value) ? usersCount : +event.target.value;
    pagesCount = Math.ceil(usersCount / usersOnPage);
    page = changeUsersOnPage(sortedUsers, page, usersOnPage, prevUsersOnPage, pagesCount);
  });

// SEARCH FORM HANDLERS <--------------------
  const searchForm = $(".js-search-form");
  searchForm.on("keyup", () => {
    [foundUsers, sortedUsers] = searchFormHandlerForSearch(filteredUsers, page, usersOnPage);
  });
  searchForm.on("search", () => {
    searchFormHandlerForReset(sortedUsers, page, usersOnPage);
  });
  searchForm.on("reset", () => {
    foundUsers = [...filteredUsers];
    sortedUsers = [...foundUsers];
    searchFormHandlerForReset(sortedUsers, page, usersOnPage);
    sortSelect.val(null).trigger({
      type: "change",
      ok: true,
    });
  });
  searchForm.on("submit", event => event.preventDefault());
});