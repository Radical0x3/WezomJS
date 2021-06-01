import $ from "jquery";
import getFilteredUsers from "../getFilteredUsers";
import getFilteredUsersStatistics from "../getFilteredUsersStatistics";
import setUsersStatistics from "../setUsersStatistics";

function operatorsSelectHandlerForSelect(event, filterOpts) {
  let key = $(event.params.data.element.parentNode).parent().data("field");
  let value = event.params.data.id;
  filterOpts.hasOwnProperty(key) ? filterOpts[key].push(value) : filterOpts[key] = [value];
  
  getFilteredUsers(filterOpts);
  
  const statistics = getFilteredUsersStatistics();
  setUsersStatistics(statistics);
}

function operatorsSelectHandlerForUnselect(event, filterOpts) {
  let key = $(event.params.data.element.parentNode).parent().data("field");
  let value = event.params.data.id;
  filterOpts[key].splice(filterOpts[key].indexOf(value), 1);
  
  getFilteredUsers(filterOpts);
  
  const statistics = getFilteredUsersStatistics();
  setUsersStatistics(statistics);
}

export {
  operatorsSelectHandlerForSelect,
  operatorsSelectHandlerForUnselect
};