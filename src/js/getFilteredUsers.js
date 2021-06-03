import $ from "jquery";

import checkFailedResult from "./checkFailedResult";
import compareUserToFilter from "./compareUserToFilter";
import checkFiltersOptionAvailability from "./checkFiltersOptionAvailability";

function getFilteredUsers(opts) {
  const initialUsers = [...$(".js-user-card")];
  let filteredUsers = initialUsers;
  let tempUsers = [];
  
  for (let [key, value] of Object.entries(opts)) {
    if (value.length > 0) {
      for (let arr of value) {
        let res = filteredUsers.filter(item => {
          let valueArr = arr.split(",");
          let nodeValue = $(item).find(`.js-user-${key}`).text();
          
          return compareUserToFilter(nodeValue, valueArr);
        });
        tempUsers = [...tempUsers, ...res];
      }
      filteredUsers = tempUsers;
      tempUsers = [];
    }
  }
  
  for (let user of initialUsers) {
    filteredUsers.includes(user) ? $(user).removeClass("d-none js-hidden-by-filter") : $(user).addClass("d-none" +
      " js-hidden-by-filter");
  }
  
  checkFailedResult();
  
  return filteredUsers;
}

export default getFilteredUsers;