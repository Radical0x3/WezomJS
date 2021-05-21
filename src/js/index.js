import "core-js/stable";
import "regenerator-runtime/runtime";
import Handlebars from "handlebars/dist/handlebars.min";

import getRandomNumber from "./getRandomNumber";
import getUsersData from "./getUsersData";
import getUsersStatistic from "./getUsersStatistic";
import setUsersStatistic from "./setUsersStatistic";

import "../scss/style.scss";

// Html Hot Module Replacement when development mode
if (process.env.NODE_ENV === "development") {
  require("../html/index.html");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".js-button").addEventListener("click", function () {
    const url = `https://randomuser.me/api/?results=${getRandomNumber(1, 100)}`;
    getUsersData(url, this).then((data) => {
      const statistic = getUsersStatistic(data.results);
      setUsersStatistic(statistic);
    });
  });
});
