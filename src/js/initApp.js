import $ from "jquery";

import getUserTemplateContext from "./getUserTemplateContext";

function initApp(url) {
  $(".js-load-button").addClass("button--hiding");
  $(".js-more-button").addClass("button--hiding");
  $("body").addClass("loading");
  
  return fetch(url)
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .then((data) => {
      let res = [];
      for (let user of data.results) {
        res.push(getUserTemplateContext(user));
      }
      return res;
    });
}

export default initApp;