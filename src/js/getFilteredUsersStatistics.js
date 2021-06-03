import $ from "jquery";

function getFilteredUsersStatistics() {
  const statistics = {
    users: {
      count: 0,
      male: 0,
      female: 0,
    },
    nationalities: {},
  };
  
  let cards = $(".js-user-card:not(.d-none)");
  cards.each((id, elem) => {
    let item = $(elem);
    const userNat = item.find(".js-user-nat").text();
    statistics.users.count++;
    statistics.users[`${item.find(".js-user-gender").text()}`]++;
    
    if (!statistics.nationalities.hasOwnProperty(userNat)) {
      statistics.nationalities[`${userNat}`] = 1;
    } else {
      statistics.nationalities[`${userNat}`]++;
    }
  });
  
  return statistics;
}

export default getFilteredUsersStatistics;
