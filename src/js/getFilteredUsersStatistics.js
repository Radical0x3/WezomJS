function getFilteredUsersStatistics() {
  const statistics = {
    users: {
      count: 0,
      male: 0,
      female: 0,
    },
    nationalities: {},
  };

  let cards = document.querySelectorAll(".js-user-card:not(.d-none)");
  cards.forEach((item) => {
    const userNat = item.querySelector(".js-user-nat").textContent;
    statistics.users.count++;
    statistics.users[`${item.querySelector(".js-user-gender").textContent}`]++;

    if (!statistics.nationalities.hasOwnProperty(userNat)) {
      statistics.nationalities[`${userNat}`] = 1;
    } else {
      statistics.nationalities[`${userNat}`]++;
    }
  });

  return statistics;
}

export default getFilteredUsersStatistics;
