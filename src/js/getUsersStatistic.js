function getUsersstatistics(users) {
  const statisticsContext = {
    users: {
      count: 0,
      male: 0,
      female: 0,
    },
    nationalities: {},
  };

  for (let user of users) {
    statisticsContext.users.count++;
    statisticsContext.users[`${user.gender}`]++;
    if (!statisticsContext.nationalities.hasOwnProperty(user.nat)) {
      statisticsContext.nationalities[`${user.nat}`] = 1;
    } else {
      statisticsContext.nationalities[`${user.nat}`]++;
    }
  }

  return statisticsContext;
}

export default getUsersstatistics;
