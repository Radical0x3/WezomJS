import $ from "jquery";
import Handlebars from "handlebars/dist/handlebars.min";

import hideButtons from "./hideButtons";
import showButtons from "./showButtons";

function getUsersData(users, page, usersOnPage, append = false) {
  let neededUsers = page === 1 ? users.slice(0, usersOnPage) : users.slice((page - 1) * usersOnPage, page * usersOnPage);
  let result = "";
  hideButtons();
  
  for (let user of neededUsers) {
    result += Handlebars.partials["User"](user);
  }
  
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
  
  showButtons();
}

export default getUsersData;
