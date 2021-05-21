import Handlebars from "handlebars/dist/handlebars.min";
import getUserTemplateContext from "./getUserTemplateContext";

function getUsersData(url, button) {
  const body = document.querySelector("body");
  const source = document.getElementById("user-template").innerHTML;
  const template = Handlebars.compile(source);
  let result = "";

  button.classList.add("hiding");
  body.classList.add("loading");

  fetch(url)
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .then((data) => {
      for (let user of data.results) {
        let context = getUserTemplateContext(user);
        let item = template(context);
        result += item;
      }
    })
    .then(() => {
      document
        .querySelector(".js-button-container")
        .insertAdjacentHTML("beforebegin", result);
    })
    .catch((e) => console.log("Error: ", e.message))
    .finally(() => {
      button.classList.remove("hiding");
      body.classList.remove("loading");
    });
}

export default getUsersData;
