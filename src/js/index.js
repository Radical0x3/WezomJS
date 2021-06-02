import "core-js/stable";
import "regenerator-runtime/runtime";
import $ from "jquery";
import Handlebars from "handlebars/dist/handlebars.min";
import "select2/dist/js/select2.min";

import checkFiltersOptionAvailability from "./checkFiltersOptionAvailability";
import disableSelectGroup from "./disableSelectGroup";
import enableAllSelectGroup from "./enableAllSelectGroup";
import fillUsersOperatorSelect from "./fillUsersOperatorSelect";
import getFilteredUsers from "./getFilteredUsers";
import getFiltersOptions from "./getFiltersOptions";
import getNewStatistics from "./getNewStatistics";
import getRandomNumber from "./getRandomNumber";
import getUsersData from "./getUsersData";
import getUsersStatistics from "./getUsersStatistics";
import {operatorsSelectHandlerForSelect, operatorsSelectHandlerForUnselect} from "./handlers/operatorsSelectHandlers";
import removeSearchFailedMessage from "./removeSearchFailedMessage";
import resetSortOptionsOrder from "./resetSortOptionsOrder";
import resetUsersFilters from "./resetUsersFilters";
import {searchFormHandlerForReset} from "./handlers/searchFormHandlers";
import setUsersFilters from "./setUsersFilters";
import sortUsers from "./sortUsers";
import usersSearch from "./usersSearch";

import "./registerHandebarsParts";

import "../scss/style.scss";
import {closePopup, openPopup} from "./popup";
import moveFiltersNode from "./moveFiltersNode";
import getUserTemplateContext from "./getUserTemplateContext";
import setPagination from "./setPagination";
import createPagination from "./createPagination";
import getSeed from "./getSeed";

// HTML HOT MODULE REPLACEMENT WHEN IT'S DEVELOPMENT MODE <--------------------
if (process.env.NODE_ENV === "development") {
  require("../html/index.html");
}

document.addEventListener("DOMContentLoaded", function () {
  let filterOpts = {};
  let seed = "";
  let usersCount = 0;
  let usersOnPage = 0;
  let pagesCount = 0;
  
  const searchSelect = $(".js-search-select");
  const sortSelect = $(".js-sort-select");
  const usersToShowSelect = $(".js-users-to-show");
  
  // INITIALIZE SELECT2 PLUGIN'S INSTANCES <--------------------
  searchSelect.select2({
    placeholder: "Search by field",
  });
  sortSelect.select2({
    placeholder: "Sort option",
  });
  usersToShowSelect.select2();
  
  document.querySelector(".js-open-filters").addEventListener("click", function () {
    openPopup(1);
  });
  
  // LOAD USERS FROM RANDOMUSER.ME <--------------------
  document.querySelector(".js-button").addEventListener("click", function () {
    const url = `https://randomuser.me/api/?results=${getRandomNumber(1, 100)}`;
    getSeed(url).then(data => {
      seed = data.seed;
      usersCount = data.results;
      usersOnPage = $(".js-users-to-show").val();
      pagesCount = Math.ceil(usersCount / usersOnPage);
      console.log(usersCount);
      
      return `https://randomuser.me/api/?page=1&results=${1 === pagesCount ? usersCount % usersOnPage : usersOnPage}&seed=${seed}`;
    }).then((dataUrl) => getUsersData(dataUrl))
      .then((data) => {
        Object.entries(filterOpts).length > 0 ? getFilteredUsers(filterOpts) : null;
        getNewStatistics();
        $(".js-search-row").removeClass("d-none");
      })
      .then(() => {
        setUsersFilters();
        moveFiltersNode();
      })
      .then(() => {
        createPagination(1, pagesCount);
        $(".js-sort-select").select2("data").length > 0 ? sortUsers() : null;
      })
      .then(() => {
        document.querySelector(".js-search-input").value = null;
        document.querySelector(".js-statistics").classList.remove("d-none");
        fillUsersOperatorSelect();
      })
      .then(() => {
        // FILTERS FORM HANDLERS <--------------------
        const filtersForm = document.querySelector(".js-filters-form");
        filtersForm.addEventListener("click", function (e) {
          const targetInput = e.target.closest("input");
          if (targetInput) {
            filterOpts = getFiltersOptions(targetInput, filterOpts);
            let filteredUsers = getFilteredUsers(filterOpts);
            // checkFiltersOptionAvailability(filteredUsers);
          }
          
          !e.target.closest(".select2") ? fillUsersOperatorSelect() : null;
          getNewStatistics();
        });
        filtersForm.addEventListener("reset", function () {
          resetUsersFilters();
          getNewStatistics();
          removeSearchFailedMessage();
          
          operatorsSelect.val(null).trigger("change");
          filterOpts = {};
          fillUsersOperatorSelect();
        });
        
        // OPERATORS SELECT HANDLERS <--------------------
        const operatorsSelect = $(".js-operators-select");
        operatorsSelect.on("select2:select", (event) => operatorsSelectHandlerForSelect(event, filterOpts));
        operatorsSelect.on("select2:unselect", (event) => operatorsSelectHandlerForUnselect(event, filterOpts));
        
        const paginationNode = $(".js-pagination-col");
        paginationNode.on("click", function (event) {
          const targetItem = event.target.closest(".pagination__item");
          const targetPrev = event.target.closest(".js-page-prev:not(.pagination__arrow--disabled)");
          const targetNext = event.target.closest(".js-page-next:not(.pagination__arrow--disabled)");
          const targetFirst = event.target.closest(".js-page-first:not(.pagination__arrow--disabled)");
          const targetLast = event.target.closest(".js-page-last:not(.pagination__arrow--disabled)");
          let page;
          
          if (targetItem) {
            page = +$(targetItem).text();
            createPagination(page, pagesCount);
            getUsersData(`https://randomuser.me/api/?page=${page}&results=${page === pagesCount ? usersCount % usersOnPage : usersOnPage}&seed=${seed}`)
              .then((data) => {
                Object.entries(filterOpts).length > 0 ? getFilteredUsers(filterOpts) : null;
                $(".js-sort-select").select2("data").length > 0 ? sortUsers() : null;
                getNewStatistics();
              });
          } else if (targetPrev || targetNext || targetFirst || targetLast) {
          
          } else {
            let activePages = $(".js-pagination-item.active");
            let currentPage = activePages.eq(activePages.length - 1).text();
          }
        });
      });
  });
  
  $(window).on("resize", moveFiltersNode);
  
  // SEARCH SELECT HANDLERS <--------------------
  searchSelect.on("select2:select", usersSearch);
  sortSelect.on("select2:selecting", (event) => disableSelectGroup(event, this, true));
  sortSelect.on("select2:select", function (event) {
    const element = $(event.params.data.element);
    element.detach();
    
    $(this).append(element);
    $(this).trigger("change");
    sortUsers();
  });
  sortSelect.on("select2:unselecting", (event) => disableSelectGroup(event, this, false));
  sortSelect.on("select2:unselect", function (event) {
    resetSortOptionsOrder(event, this);
    
    const target = $(event.target).select2("data");
    if (target.length > 0) {
      sortUsers();
    }
  });
  sortSelect.on("change", function (event) {
    event.ok ? enableAllSelectGroup(sortSelect) : null;
  });
  
  // USERS TO SHOW SELECT HANDLERS <--------------------
  usersToShowSelect.on("change", function (event) {
    usersOnPage = isNaN(+event.target.value) ? usersCount : usersOnPage;
    pagesCount = Math.ceil(usersCount / usersOnPage);
    
    let page = $(".js-pagination-item.active").eq(0).text();
    createPagination(page, pagesCount);
    getUsersData(`https://randomuser.me/api/?page=${page}&results=${page === pagesCount ? usersCount % usersOnPage : usersOnPage}&seed=${seed}`)
      .then(() => {
        Object.entries(filterOpts).length > 0 ? getFilteredUsers(filterOpts) : null;
        $(".js-sort-select").select2("data").length > 0 ? sortUsers() : null;
        getNewStatistics();
      });
  });
  
  // SEARCH FORM HANDLERS <--------------------
  const searchForm = document.querySelector(".js-search-form");
  searchForm.addEventListener("keyup", (event) => {
    usersSearch(event);
    getNewStatistics();
  });
  searchForm.addEventListener("search", searchFormHandlerForReset);
  searchForm.addEventListener("reset", () => {
    searchFormHandlerForReset();
    sortSelect.val(null).trigger({
      type: "change",
      ok: true,
    });
  });
  searchForm.addEventListener("submit", event => event.preventDefault());
  
  $(".btn1").on("click", function () {
    test1(3, 13); // 2 3 4 5 6
    test1(11, 13); // 9 10 11 12 13
    test1(13, 13); // 9 10 11 12 13
  });
  
  $(".btn2").on("click", function () {
    test2(4, 5, 13, [2, 3]); // 2 3 4
    test2(5, 5, 13, [3, 4]); // 5
  });
});


function test2(i, currentMax, max, active) {
  if (i > currentMax - 1) {
    currentMax = createPagination(i, max);
    test2(i, currentMax, max, []);
  } else {
    active.push(i);
  }
}