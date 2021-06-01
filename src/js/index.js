import "core-js/stable";
import "regenerator-runtime/runtime";
import $ from "jquery";
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

// HTML HOT MODULE REPLACEMENT WHEN IT'S DEVELOPMENT MODE <--------------------
if (process.env.NODE_ENV === "development") {
  require("../html/index.html");
}

document.addEventListener("DOMContentLoaded", function () {
  let filterOpts = {};
  
  const searchSelect = $(".js-search-select");
  const sortSelect = $(".js-sort-select");
  
  // INITIALIZE SELECT2 PLUGIN'S INSTANCES <--------------------
  searchSelect.select2();
  sortSelect.select2({
    placeholder: "Choose an option",
  });
  
  // LOAD USERS FROM RANDOMUSER.ME <--------------------
  document.querySelector(".js-button").addEventListener("click", function () {
    const url = `https://randomuser.me/api/?results=${getRandomNumber(1, 100)}`;
    getUsersData(url, this)
      .then((data) => {
        Object.entries(filterOpts).length > 0 ? getFilteredUsers(filterOpts) : null;
        getNewStatistics();
      })
      .then(() => {
        setUsersFilters();
      })
      .then(() => {
        const sortSelect = $(".js-sort-select").select2("data");
        sortSelect.length > 0 ? sortUsers() : null;
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
      });
  });
  
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
