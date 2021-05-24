import Handlebars from "handlebars/dist/handlebars.min";
import getUserTemplateContext from "./getUserTemplateContext";

function getUsersData(url, button) {
  const body = document.querySelector("body");
  let result = "";

  button.classList.add("hiding");
  body.classList.add("loading");

  const usersData = fetch(url)
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .then((data) => {
      for (let user of data.results) {
        let userItem = Handlebars.partials["User"](
          getUserTemplateContext(user)
        );
        result += userItem;
      }

      return data;
    })
    .then((data) => {
      let targetRow = document.querySelector(".js-users-row");

      if (targetRow) {
        targetRow.innerHTML = result;
      } else {
        const row = document.createElement("div");
        row.classList.add("row", "js-users-row");
        row.innerHTML = result;

        document
          .querySelector(".js-users-container")
          .insertBefore(row, document.querySelector(".js-actions-row"));
      }

      return data;
    })
    .catch((e) => console.log("Error: ", e.message))
    .finally(() => {
      button.classList.remove("hiding");
      body.classList.remove("loading");
    })
    .then((data) => {
      return data;
    });

  return new Promise(function (resolve) {
    resolve(usersData);
  });
}

export default getUsersData;
