import fillUsersOperatorSelect from "../fillUsersOperatorSelect";
import getNewStatistics from "../getNewStatistics";
import removeSearchFailedMessage from "../removeSearchFailedMessage";
import resetUsersSearch from "../resetUsersSearch";

function searchFormHandlerForReset() {
  resetUsersSearch();
  getNewStatistics();
  removeSearchFailedMessage();
  fillUsersOperatorSelect();
}

export {
  searchFormHandlerForReset
};