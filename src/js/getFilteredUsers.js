import $ from "jquery";

import checkFailedResult from "./checkFailedResult";
import compareUserToFilter from "./compareUserToFilter";
import checkFiltersOptionAvailability from "./checkFiltersOptionAvailability";

function getFilteredUsers(opts, users) {
  let filteredUsers = [...users];
  let tempUsers = [];
  
  for (let [key, value] of Object.entries(opts)) {
    if (value.length > 0) {
      for (let arr of value) {
        let res = filteredUsers.filter(user => compareUserToFilter(user[`${key}`], arr.split(",")));
        tempUsers = [...tempUsers, ...res];
      }
      filteredUsers = tempUsers;
      tempUsers = [];
    }
  }
  
  checkFiltersOptionAvailability(filteredUsers);
  checkFailedResult(filteredUsers);
  
  return filteredUsers;
}

export default getFilteredUsers;