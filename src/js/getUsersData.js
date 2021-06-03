import Handlebars from "handlebars/dist/handlebars.min";

import getUserTemplateContext from "./getUserTemplateContext";

function getUsersData(url, append = false) {
  const body = document.querySelector("body");
  const button = document.querySelector(".js-load-button");
  let result = "";
  
  button.classList.add("button--hiding");
  document.querySelector(".js-more-button").classList.add("button--hiding");
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
        append ? targetRow.insertAdjacentHTML("beforeend", result) : targetRow.innerHTML = result;
      } else {
        const wrapper = document.createElement("div");
        wrapper.classList.add("row", "js-main-content", "mb-4");
        
        const col = document.createElement("div");
        col.classList.add("col", "js-users-col");
        
        const row = document.createElement("div");
        row.classList.add("row", "js-users-row");
        row.innerHTML = result;
        
        col.append(row);
        wrapper.append(col);
        
        document
          .querySelector(".js-users-container")
          .insertBefore(wrapper, document.querySelector(".js-actions-row"));
      }
      
      return data;
    })
    .catch((e) => console.log("Error: ", e.message))
    .finally(() => {
      button.classList.remove("button--hiding");
      document.querySelector(".js-more-button").classList.remove("button--hiding");
      body.classList.remove("loading");
      document.querySelector(".js-more-button").parentNode.classList.remove("d-none");
    })
    .then((data) => {
      return data;
    });
  
  return new Promise(function (resolve) {
    resolve(usersData);
  });
}

export default getUsersData;
