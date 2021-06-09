import getFilteredUsersStatistics from "./getFilteredUsersStatistics";
import setUsersStatistics from "./setUsersStatistics";

function getNewStatistics(users, page, usersOnPage) {
  const neededUsers = page === 1 ? users.slice(0, usersOnPage) : users.slice((page - 1) * usersOnPage, page * usersOnPage);
  const statistics = getFilteredUsersStatistics(neededUsers);
  setUsersStatistics(statistics);
}

export default getNewStatistics;