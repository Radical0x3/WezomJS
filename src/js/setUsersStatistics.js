import Handlebars from "handlebars/dist/handlebars.min";
import sortNationalitiesByFrequency from "./sortNationalitiesByFrequency";

function setUsersStatistics(statistics, show = true) {
  const statisticsNode = document.querySelector(".statistics");
  statistics.message =
    statistics.users.male === statistics.users.female
      ? "Males == Females"
      : statistics.users.male > statistics.users.female
      ? "Males > Females"
      : "Females > Males";
  statistics.nationalities = sortNationalitiesByFrequency(statistics);

  if (!statisticsNode && document.querySelector(".js-users-row")) {
    document
      .querySelector(".js-actions-row")
      .insertAdjacentHTML(
        "afterend",
        Handlebars.partials["Statistics"](statistics)
      );
  } else if (statisticsNode && document.querySelector(".js-users-row")) {
    let result = "";
    for (let nat of statistics.nationalities) {
      result += Handlebars.partials["NatsListItem"]({
        key: nat.key,
        value: nat.value,
      });
    }

    statisticsNode.children[1].querySelector(".statistics__value").textContent =
      statistics.users.count;
    statisticsNode.children[2].querySelector(".statistics__value").textContent =
      statistics.users.male;
    statisticsNode.children[3].querySelector(".statistics__value").textContent =
      statistics.users.female;
    statisticsNode.children[4].querySelector(".statistics__label").textContent =
      statistics.message;
    statisticsNode.children[5].querySelector(".nats-list").innerHTML = result;
  }
}

export default setUsersStatistics;
