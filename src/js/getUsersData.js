import $ from "jquery";
import Handlebars from "handlebars/dist/handlebars.min";

function getUsersData(users, page, usersOnPage, append = false) {
  let neededUsers = page === 1 ? users.slice(0, usersOnPage) : users.slice((page - 1) * usersOnPage, page * usersOnPage);
  const body = $("body");
  const button = $(".js-load-button");
  const moreButton = $(".js-more-button");
  let result = "";
  
  button.addClass("button--hiding");
  moreButton.addClass("button--hiding");
  body.addClass("loading");
  
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
  
  button.removeClass("button--hiding");
  moreButton.removeClass("button--hiding");
  body.removeClass("loading");
  moreButton.parent().removeClass("d-none");
}

export default getUsersData;
