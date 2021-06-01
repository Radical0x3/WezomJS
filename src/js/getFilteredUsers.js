import checkFailedResult from "./checkFailedResult";
import compareUserToFilter from "./compareUserToFilter";
import checkFiltersOptionAvailability from "./checkFiltersOptionAvailability";

function getFilteredUsers(opts) {
  const initialUsers = [...document.querySelectorAll(".js-user-card")];
  let filteredUsers = initialUsers;
  let tempUsers = [];
  
  for (let [key, value] of Object.entries(opts)) {
    if (value.length > 0) {
      for (let arr of value) {
        let res = filteredUsers.filter(item => {
          let valueArr = arr.split(",");
          let nodeValue = item.querySelector(`.js-user-${key}`).textContent;
          
          return compareUserToFilter(nodeValue, valueArr);
        });
        tempUsers = [...tempUsers, ...res];
      }
      filteredUsers = tempUsers;
      tempUsers = [];
    }
  }
  
  for (let user of initialUsers) {
    filteredUsers.includes(user) ? user.classList.remove("d-none", "js-hidden-by-filter") : user.classList.add("d-none", "js-hidden-by-filter");
  }
  
  checkFailedResult();
  
  return filteredUsers;
}

export default getFilteredUsers;