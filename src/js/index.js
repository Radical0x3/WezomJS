import "core-js/stable";
import "regenerator-runtime/runtime";
import Handlebars from "handlebars/dist/handlebars.min";

import getRandomNumber from "./getRandomNumber";
import getUsersData from "./getUsersData";
import getUsersStatistics from "./getUsersStatistics";
import setUsersStatistics from "./setUsersStatistics";

import "../scss/style.scss";

// Html Hot Module Replacement when development mode
if (process.env.NODE_ENV === "development") {
  require("../html/index.html");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".js-button").addEventListener("click", function () {
    const url = `https://randomuser.me/api/?results=${getRandomNumber(1, 100)}`;
    getUsersData(url, this).then((data) => {
      const statistic = getUsersStatistics(data.results);
      setUsersStatistics(statistic);
    });
  });

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
});
