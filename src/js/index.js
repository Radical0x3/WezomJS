import "core-js/stable";
import "regenerator-runtime/runtime";

import "../scss/style.scss";

if (process.env.NODE_ENV === "development") {
  require("../html/index.html");
}

const button = document.querySelector(".load-button");
button.addEventListener("click", function () {
  const number = getRandomNumber(1, 100);
  const url = `https://randomuser.me/api/?results=${number}`;
  const body = document.querySelector("body");
  const targetRow = document.querySelector(".row");
  let result = "";

  this.classList.add("hiding");
  body.classList.add("loading");

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let user of data.results) {
        let item = `
        <div class="col-xxl-2 col-lg-3 col-md-4 col-m-6 col-12 my-3 js-user-card">
          <div class="user">
            <div class="user__top">
              <div class="avatar avatar_rounded">
                <div class="avatar-holder"></div>
                <img
                src="${user.picture.large}"
                alt="user avatar"
                class="avatar__img"
                />
              </div>
              <div class="user__fullname">${user.name.first} ${
          user.name.last
        }</div>
              <div class="user__gender">${user.gender}</div>
            </div>

            <div class="user__bottom">
              <div class="user__item link">
                <span class="link__desc">Phone number:</span>
                <a class="link__body" href="tel:${user.cell.replace(
                  /[()-]/g,
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
      const usersCount = document.querySelectorAll(".js-user-card").length;

      usersCount > 0
        ? document
            .querySelector(".js-load-button")
            .insertAdjacentHTML("beforebegin", result)
        : targetRow.insertAdjacentHTML("afterbegin", result);

      this.classList.remove("hiding");
      body.classList.remove("loading");
    });
});

// Get rangom number from min to max inclusive
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
