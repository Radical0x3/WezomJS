import "core-js/stable";
import "regenerator-runtime/runtime";
import $ from "jquery";
import Handlebars from "handlebars/dist/handlebars.min";
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
import getSeed from "./getSeed";
import getUsersData from "./getUsersData";
import getUsersStatistics from "./getUsersStatistics";
import moveFiltersNode from "./moveFiltersNode";
import {openPopup} from "./popup";
import {operatorsSelectHandlerForSelect, operatorsSelectHandlerForUnselect} from "./handlers/operatorsSelectHandlers";
import removeSearchFailedMessage from "./removeSearchFailedMessage";
import resetSortOptionsOrder from "./resetSortOptionsOrder";
import resetUsersFilters from "./resetUsersFilters";
import {searchFormHandlerForReset} from "./handlers/searchFormHandlers";
import setUsersAndPagination from "./setUsersAndPagination";
import setUsersFilters from "./setUsersFilters";
import sortUsers from "./sortUsers";
import usersSearch from "./usersSearch";

import "./registerHandebarsParts";
import "../scss/style.scss";

// HTML HOT MODULE REPLACEMENT WHEN IT'S DEVELOPMENT MODE <--------------------
if (process.env.NODE_ENV === "development") {
  require("../html/index.html");
}

document.addEventListener("DOMContentLoaded", function () {
  // GLOBAL SETTINGS <--------------------
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
  
  document.querySelector(".js-open-filters").addEventListener("click", () => openPopup(1));
  
  // LOAD USERS FROM RANDOMUSER.ME <--------------------
  document.querySelector(".js-load-button").addEventListener("click", function () {
    const url = `https://randomuser.me/api/?results=${getRandomNumber(1, 100)}`;
    getSeed(url).then(data => {
      seed = data.seed;
      usersCount = data.results;
      usersOnPage = $(".js-users-to-show").val();
      usersOnPage = usersOnPage === "all" ? usersCount : usersOnPage;
      pagesCount = Math.ceil(usersCount / usersOnPage);
      
      let results = usersCount / usersOnPage === 1 ? usersCount : usersOnPage;
      if (pagesCount === 1) {
        results = usersCount % usersOnPage === 0 ? usersOnPage : usersCount % usersOnPage;
        $(".js-more-button").addClass("d-none");
      } else {
        $(".js-more-button").removeClass("d-none");
      }
      
      return `https://randomuser.me/api/?page=1&results=${results}&seed=${seed}`;
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
        
        $(".js-pagination-col").on("click", (event) => changePagination(event, pagesCount, usersCount, usersOnPage, seed, filterOpts));
      });
  });
  
  document.querySelector(".js-more-button").addEventListener("click", () => getMoreUsers(pagesCount, usersCount, usersOnPage, seed, filterOpts));
  
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
    let prevUsersOnPage = usersOnPage;
    usersOnPage = isNaN(+event.target.value) ? usersCount : event.target.value;
    pagesCount = Math.ceil(usersCount / usersOnPage);
    
    changeUsersOnPage(usersOnPage, usersCount, prevUsersOnPage, pagesCount, filterOpts, seed);
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
});