import $ from "jquery";

import getFilteredUsers from "../getFilteredUsers";
import getNewStatistics from "../getNewStatistics";
import getUsersData from "../getUsersData";
import rebuildPagination from "../rebuildPagination";

function operatorsSelectHandlerForSelect(event, users, page, usersOnPage, filterOpts) {
  let key = $(event.params.data.element.parentNode).parent().data("field");
  let value = event.params.data.id;
  filterOpts.hasOwnProperty(key) ? filterOpts[key].push(value) : filterOpts[key] = [value];
  
  return operatorsSelectHandlerGeneral(users, page, usersOnPage, filterOpts);
}

function operatorsSelectHandlerForUnselect(event, users, page, usersOnPage, filterOpts) {
  let key = $(event.params.data.element.parentNode).parent().data("field");
  let value = event.params.data.id;
  filterOpts[key].splice(filterOpts[key].indexOf(value), 1);
  
  return operatorsSelectHandlerGeneral(users, page, usersOnPage, filterOpts);
}

function operatorsSelectHandlerGeneral(users, page, usersOnPage, filterOpts) {
  let newUsers = getFilteredUsers(filterOpts, users);
  getUsersData(newUsers, page, usersOnPage);
  getNewStatistics(newUsers, page, usersOnPage);
  rebuildPagination(newUsers, page);
  
  const moreButton = $(".js-more-button");
  newUsers.length > usersOnPage ? moreButton.removeClass("d-none") : moreButton.addClass("d-none");
  return newUsers;
}

export {
  operatorsSelectHandlerForSelect,
  operatorsSelectHandlerForUnselect
};