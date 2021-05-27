import "core-js/stable";
import "regenerator-runtime/runtime";
import Handlebars from "handlebars/dist/handlebars.min";
import $ from "jquery";
import "select2/dist/js/select2.min";

import disableSelectGroup from "./disableSelectGroup";
import enableAllSelectGroup from "./enableAllSelectGroup";
import getFilteredUsersStatistics from "./getFilteredUsersStatistics";
import getRandomNumber from "./getRandomNumber";
import getUsersData from "./getUsersData";
import getUsersStatistics from "./getUsersStatistics";
import resetSortOptionsOrder from "./resetSortOptionsOrder";
import resetUsersFilter from "./resetUsersFilter";
import setUsersStatistics from "./setUsersStatistics";
import sortUsers from "./sortUsers";
import usersFilter from "./usersFilter";

import "../scss/style.scss";

// Html Hot Module Replacement when development mode
if (process.env.NODE_ENV === "development") {
  require("../html/index.html");
}

document.addEventListener("DOMContentLoaded", function () {
  const filterSelect = $(".js-filter-select");
  const sortSelect = $(".js-sort-select");

  filterSelect.select2();
  sortSelect.select2({
    placeholder: "Choose an option",
  });

  filterSelect.on("select2:select", usersFilter);

  sortSelect.on("select2:selecting", function (event, f, g) {
    disableSelectGroup(event, this, true);
  });

  sortSelect.on("select2:select", function (event) {
    const element = $(event.params.data.element);

    element.detach();
    $(this).append(element);
    $(this).trigger("change");

    sortUsers();
  });

  // Select2 Event handler for unselecting an item
  sortSelect.on("select2:unselecting", function (event) {
    disableSelectGroup(event, this, false);
  });

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

  document.querySelector(".js-button").addEventListener("click", function () {
    const url = `https://randomuser.me/api/?results=${getRandomNumber(1, 100)}`;
    getUsersData(url, this)
      .then((data) => {
        const statistic = getUsersStatistics(data.results);
        setUsersStatistics(statistic);
      })
      .then(() => {
        const target = $(".js-sort-select").select2("data");
        if (target.length > 0) {
          sortUsers();
        }
      })
      .then(() => {
        document.querySelector(".js-search-input").value = null;
        document.querySelector(".js-statistics").classList.remove("d-none");
      });
  });

  const form = document.querySelector(".js-filters-form");
  form.addEventListener("keyup", (event) => {
    usersFilter(event);

    const statistics = getFilteredUsersStatistics();
    setUsersStatistics(statistics);
  });

  form.addEventListener("search", () => {
    resetUsersFilter();

    const statistics = getFilteredUsersStatistics();
    setUsersStatistics(statistics);

    const searchFailed = document.querySelector(".js-search-failed");
    searchFailed ? searchFailed.remove() : null;
  });

  form.addEventListener("reset", () => {
    resetUsersFilter();

    const statistics = getFilteredUsersStatistics();
    setUsersStatistics(statistics);

    const searchFailed = document.querySelector(".js-search-failed");
    searchFailed ? searchFailed.remove() : null;

    sortSelect.val(null).trigger({
      type: "change",
      ok: true,
    });
  });

  form.addEventListener("submit", submit);

  // Register handlebars user's partial
  const userSource = document.getElementById("user-template").innerHTML;
  const userTemplate = Handlebars.compile(userSource);
  Handlebars.registerPartial("User", userTemplate);

  // Register handlebars statistics' partial
  const statisticsSource = document.getElementById(
    "statistics-template"
  ).innerHTML;
  const statisticsTemplate = Handlebars.compile(statisticsSource);
  Handlebars.registerPartial("Statistics", statisticsTemplate);

  // Register handlebars natsListItem's partial
  const natsListItemSource =
    document.getElementById("nats-list-item").innerHTML;
  const natsListItemTemplate = Handlebars.compile(natsListItemSource);
  Handlebars.registerPartial("NatsListItem", natsListItemTemplate);

  // Register handlebars natsListItem's partial
  const searchFailedSource = document.getElementById("search-failed").innerHTML;
  const searchFailedTemplate = Handlebars.compile(searchFailedSource);
  Handlebars.registerPartial("SearchFailed", searchFailedTemplate);

  function submit(event) {
    event.preventDefault();
  }
});
