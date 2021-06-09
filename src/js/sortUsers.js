import $ from "jquery";
import "select2/dist/js/select2.min";

function sortUsers(users) {
  const opts = $(".js-sort-select").select2("data");
  
  const sortedUsers = users.sort((curr, next) => {
    for (let opt of opts) {
      let [type, order] = opt.id.split("-");
      const currentUser = curr[`${type}`].toUpperCase();
      const nextUser = next[`${type}`].toUpperCase();
      
      if (order === "asc") {
        if (currentUser === nextUser) continue;
        return currentUser > nextUser ? 1 : -1;
      } else if (order === "desc") {
        if (currentUser === nextUser) continue;
        return currentUser < nextUser ? 1 : -1;
      }
    }
  });
  
  return sortedUsers;
}

export default sortUsers;
