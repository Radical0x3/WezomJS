function getUsersStatistics(users) {
  const statistics = {
    users: {
      count: 0,
      male: 0,
      female: 0,
    },
    nationalities: {},
  };

  for (let user of users) {
    statistics.users.count++;
    statistics.users[`${user.gender}`]++;
    if (!statistics.nationalities.hasOwnProperty(user.nat)) {
      statistics.nationalities[`${user.nat}`] = 1;
    } else {
      statistics.nationalities[`${user.nat}`]++;
    }
  }

  return statistics;
}

export default getUsersStatistics;
