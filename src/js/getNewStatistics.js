import getFilteredUsersStatistics from "./getFilteredUsersStatistics";
import setUsersStatistics from "./setUsersStatistics";

function getNewStatistics() {
  const statistics = getFilteredUsersStatistics();
  setUsersStatistics(statistics);
}

export default getNewStatistics;