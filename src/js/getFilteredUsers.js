import checkFiltersOptionAvailability from "./checkFiltersOptionAvailability";
import compareUserToFilter from "./compareUserToFilter";

function getFilteredUsers(opts, users) {
  let filteredUsers = [...users];
  let tempUsers = [];
  console.log("OPTS: ", opts);
  for (let [key, value] of Object.entries(opts)) {
    if (value.length > 0) {
      for (let arr of value) {
        let res = filteredUsers.filter(user => compareUserToFilter(user[`${key}`], arr.split(",")));
        tempUsers = [...tempUsers, ...res];
      }
      filteredUsers = [...tempUsers];
      tempUsers = [];
    }
  }
  
  checkFiltersOptionAvailability(filteredUsers);
  return filteredUsers;
}

export default getFilteredUsers;