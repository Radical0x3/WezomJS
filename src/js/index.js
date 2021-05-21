import "core-js/stable";
import "regenerator-runtime/runtime";

import getRandomNumber from "./getRandomNumber";
import getUsersData from "./getUsersData";

import "../scss/style.scss";

// Html Hot Module Replacement when development mode
if (process.env.NODE_ENV === "development") {
  require("../html/index.html");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".js-button").addEventListener("click", function () {
    const url = `https://randomuser.me/api/?results=${getRandomNumber(1, 100)}`;
    getUsersData(url, this);
  });
});
