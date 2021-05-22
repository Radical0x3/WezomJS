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
      document
        .querySelector(".js-button-container")
        .insertAdjacentHTML("beforebegin", result);

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
