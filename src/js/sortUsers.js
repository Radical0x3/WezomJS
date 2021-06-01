import $ from "jquery";
import "select2/dist/js/select2.min";

function sortUsers() {
  const elements = document.querySelectorAll(".js-user-card");
  const opts = $(".js-sort-select").select2("data");
  const targetRow = document.querySelector(".js-users-row");
  let result = "";

  if (!targetRow) return;

  const sortedUsers = [...elements].sort((curr, next) => {
    for (let opt of opts) {
      let [type, order] = opt.id.split("-");
      const currNode = curr
        .querySelector(`.user__${type}`)
        .textContent.toUpperCase();
      const nextNode = next
        .querySelector(`.user__${type}`)
        .textContent.toUpperCase();

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

  document.querySelector(".js-users-row").innerHTML = result;
}

export default sortUsers;
