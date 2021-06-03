import $ from "jquery";

import fillUsersOperatorSelect from "../fillUsersOperatorSelect";
import getFilteredUsers from "../getFilteredUsers";
import getNewStatistics from "../getNewStatistics";

function operatorsSelectHandlerForSelect(event, filterOpts) {
  let key = $(event.params.data.element.parentNode).parent().data("field");
  let value = event.params.data.id;
  filterOpts.hasOwnProperty(key) ? filterOpts[key].push(value) : filterOpts[key] = [value];
  
  getFilteredUsers(filterOpts);
  getNewStatistics();
  fillUsersOperatorSelect();
}

function operatorsSelectHandlerForUnselect(event, filterOpts) {
  let key = $(event.params.data.element.parentNode).parent().data("field");
  let value = event.params.data.id;
  filterOpts[key].splice(filterOpts[key].indexOf(value), 1);
  
  getFilteredUsers(filterOpts);
  getNewStatistics();
  fillUsersOperatorSelect();
}

export {
  operatorsSelectHandlerForSelect,
  operatorsSelectHandlerForUnselect
};