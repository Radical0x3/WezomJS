import getNewStatistics from "./getNewStatistics";
import getUsersData from "./getUsersData";
import rebuildPagination from "./rebuildPagination";

function setUsersAndPagination(users, page, usersCount, usersOnPage) {
  getUsersData(users, page, usersOnPage);
  getNewStatistics(users, page, usersOnPage);
  rebuildPagination(users, page);
}

export default setUsersAndPagination;