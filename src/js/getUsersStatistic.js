function getUsersStatistic(users) {
  const statisticContext = {
    users: {
      count: 0,
      male: 0,
      female: 0,
    },
    nationalities: {},
  };

  for (let user of users) {
    statisticContext.users.count++;
    statisticContext.users[`${user.gender}`]++;
    if (!statisticContext.nationalities.hasOwnProperty(user.nat)) {
      statisticContext.nationalities[`${user.nat}`] = 1;
    } else {
      statisticContext.nationalities[`${user.nat}`]++;
    }
  }

  return statisticContext;
}

export default getUsersStatistic;
