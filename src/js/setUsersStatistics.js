import $ from "jquery";
import Handlebars from "handlebars/dist/handlebars.min";

import sortNationalitiesByFrequency from "./sortNationalitiesByFrequency";

function setUsersStatistics(statistics, show = true) {
  const statisticsNode = $(".statistics");
  const usersRow = $(".js-users-row");
  statistics.message =
    statistics.users.male === statistics.users.female
      ? "Males == Females"
      : statistics.users.male > statistics.users.female
      ? "Males > Females"
      : "Females > Males";
  statistics.nationalities = sortNationalitiesByFrequency(statistics);
  
  if (statisticsNode.length === 0 && usersRow.length > 0) {
    $(".js-actions-row").after(Handlebars.partials["Statistics"](statistics));
  } else if (statisticsNode.length > 0 && usersRow.length > 0) {
    let result = "";
    for (let nat of statistics.nationalities) {
      result += Handlebars.partials["NatsListItem"]({
        key: nat.key,
        value: nat.value,
      });
    }
    
    statisticsNode.children().eq(1).find(".statistics__value").text(statistics.users.count);
    statisticsNode.children().eq(2).find(".statistics__value").text(statistics.users.male);
    statisticsNode.children().eq(3).find(".statistics__value").text(statistics.users.female);
    statisticsNode.children().eq(4).find(".statistics__label").text(statistics.message);
    statisticsNode.children().eq(5).find(".nats-list").html(result);
  }
}

export default setUsersStatistics;
