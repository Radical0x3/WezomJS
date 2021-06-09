function getFiltersOperatorCode(users) {
  let arr = [];
  
  for (let user of users) {
    if (arr.indexOf(user.code) === -1) arr.push(user.code);
  }
  
  arr = arr.sort((a, b) => a > b ? 1 : -1);
  return arr;
}

export default getFiltersOperatorCode;