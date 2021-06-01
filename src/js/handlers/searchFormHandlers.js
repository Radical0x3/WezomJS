import getNewStatistics from "../getNewStatistics";
import removeSearchFailedMessage from "../removeSearchFailedMessage";
import resetUsersSearch from "../resetUsersSearch";

function searchFormHandlerForReset() {
  resetUsersSearch();
  getNewStatistics();
  removeSearchFailedMessage();
}

export {
  searchFormHandlerForReset
};