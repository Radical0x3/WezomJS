import "core-js/stable";
import "regenerator-runtime/runtime";

import "../scss/style.scss";

// Html Hot Module Replacement when development mode
if (process.env.NODE_ENV === "development") {
  require("../html/index.html");
}

window.onload = function () {
  const button = document.querySelector(".load-button");
  button.addEventListener("click", function () {
    const number = getRandomNumber(1, 100);
    const url = `https://randomuser.me/api/?results=${number}`;
    const body = document.querySelector("body");
    const targetRow = document.querySelector(".row");
    let result = "";

    this.classList.add("hiding");
    body.classList.add("loading");

    // Load users data from public API
    fetch(url)
      .then((response) => {
        return response.ok ? response.json() : Promise.reject(res);
      })
      .then((data) => {
        for (let user of data.results) {
          let item = `
        <div class="col-xxl-2 col-lg-3 col-md-4 col-m-6 col-12 my-3 js-user-card">
          <div class="user">
            <div class="user__top">
              <div class="avatar avatar_rounded">
                <a href="/" class="avatar__link">
                  <div class="avatar-holder"></div>
                  <img
                  src="${user.picture.large}"
                  alt="user avatar"
                  class="avatar__img"
                  />
                </a>
              </div>
              <a href="/" class="user__fullname" title="${user.name.first} ${
            user.name.last
          }">${user.name.first} ${user.name.last}</a>
              <div class="user__gender">${user.gender}</div>
            </div>
            <div class="user__bottom">
              <div class="user__item link">
                <span class="link__desc">Phone number:</span>
                <a class="link__body" href="tel:${user.cell.replace(
                  /[()-\s]/g,
                  ""
                )}">${user.cell}</a>
              </div>
              <div class="user__item link">
                <span class="link__desc">Email:</span>
                <a class="link__body" href="mailto:${user.email}"
                  >${user.email}</a
                >
              </div>
              <div class="user__item user__address">
                Address: ${user.location.state} ${user.location.city} ${
            user.location.street.name
          } ${user.location.street.number}
              </div>
              <div class="user__item user__birthday">Birthday: ${
                user.dob.date.split("T")[0]
              }</div>
              <div class="user__item user__reg-date">
                Registration date: ${user.registered.date.split("T")[0]}
              </div>
            </div>
          </div>
        </div>
        `;
          result += item;
        }
      })
      .then(() => {
        document
          .querySelector(".js-load-button")
          .insertAdjacentHTML("beforebegin", result);
      })
      .catch((e) => console.log("Error: ", e.message))
      .finally(() => {
        this.classList.remove("hiding");
        body.classList.remove("loading");
      });
  });
};

// Get rangom number from min to max inclusive
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
