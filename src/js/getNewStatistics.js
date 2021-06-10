import getFilteredUsersStatistics from "./getFilteredUsersStatistics";
import setUsersStatistics from "./setUsersStatistics";

function getNewStatistics(users, page, usersOnPage, toPage) {
  let neededUsers;
  if (!toPage) {
    neededUsers = page === 1 ? users.slice(0, usersOnPage) : users.slice((page - 1) * usersOnPage, page * usersOnPage);
  } else {
    neededUsers = users.slice((page - 1) * usersOnPage, toPage * usersOnPage);
  }
  
  const statistics = getFilteredUsersStatistics(neededUsers);
  setUsersStatistics(statistics);
}

export default getNewStatistics;