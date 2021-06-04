import $ from "jquery";
import "select2/dist/js/select2.min";

function sortUsers(defaultUsers) {
  const elements = defaultUsers || $(".js-user-card");
  const opts = $(".js-sort-select").select2("data");
  const targetRow = $(".js-users-row");
  let result = "";
  
  if (targetRow.length === 0) return;
  
  const sortedUsers = [...elements].sort((curr, next) => {
    for (let opt of opts) {
      let [type, order] = opt.id.split("-");
      const currNode = $(curr).find(`.user__${type}`).text().toUpperCase();
      const nextNode = $(next).find(`.user__${type}`).text().toUpperCase();
      
      if (order === "asc") {
        if (currNode === nextNode) continue;
        return currNode > nextNode ? 1 : -1;
      } else if (order === "desc") {
        if (currNode === nextNode) continue;
        return currNode < nextNode ? 1 : -1;
      }
    }
  });
  
  for (let user of sortedUsers) {
    result += user.outerHTML;
  }
  
  targetRow.html(result);
}

export default sortUsers;
