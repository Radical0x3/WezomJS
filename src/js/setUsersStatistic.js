import Handlebars from "handlebars/dist/handlebars.min";

function setUsersStatistic(statistic) {
  const statisticSource =
    document.getElementById("statistic-template").innerHTML;
  const statisticTemplate = Handlebars.compile(statisticSource);
  const statisticNode = document.querySelector(".statistic");
  statistic.message =
    statistic.users.male == statistic.users.female
      ? "Males == Females"
      : statistic.users.male > statistic.users.female
      ? "Males > Females"
      : "Females > Males";

  if (!statisticNode) {
    document
      .querySelector(".container-fluid")
      .insertAdjacentHTML("afterend", statisticTemplate(statistic));
  } else {
    let nationalities = "";
    for (let [key, value] of Object.entries(statistic.nationalities)) {
      nationalities += `<p>${key}: ${value}</p>`;
    }

    statisticNode.children[0].querySelector(".statistic__value").textContent =
      statistic.users.count;
    statisticNode.children[1].querySelector(".statistic__value").textContent =
      statistic.users.male;
    statisticNode.children[2].querySelector(".statistic__value").textContent =
      statistic.users.female;
    statisticNode.children[3].querySelector(".statistic__value").textContent =
      statistic.message;
    statisticNode.children[4].querySelector(".statistic__value").innerHTML =
      nationalities;
  }
}

export default setUsersStatistic;
