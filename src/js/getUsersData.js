import $ from "jquery";
import Handlebars from "handlebars/dist/handlebars.min";

import getUserTemplateContext from "./getUserTemplateContext";

function getUsersData(url, append = false) {
  const body = $("body");
  const button = $(".js-load-button");
  const moreButton = $(".js-more-button");
  let result = "";
  
  button.addClass("button--hiding");
  moreButton.addClass("button--hiding");
  body.addClass("loading");
  
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
      let targetRow = $(".js-users-row");
      
      if (targetRow.length > 0) {
        append ? targetRow.append(result) : targetRow.html(result);
      } else {
        const wrapper = $(document.createElement("div"));
        wrapper.addClass("row js-main-content mb-4");
        
        const col = $(document.createElement("div"));
        col.addClass("col js-users-col");
        
        const row = $(document.createElement("div"));
        row.addClass("row js-users-row");
        row.html(result);
        
        col.append(row);
        wrapper.append(col);
        $(".js-actions-row").before(wrapper);
      }
      
      return data;
    })
    .catch((e) => console.log("Error: ", e.message))
    .finally(() => {
      button.removeClass("button--hiding");
      moreButton.removeClass("button--hiding");
      body.removeClass("loading");
      moreButton.parent().removeClass("d-none");
    })
    .then((data) => {
      return data;
    });
  
  return new Promise(function (resolve) {
    resolve(usersData);
  });
}

export default getUsersData;
