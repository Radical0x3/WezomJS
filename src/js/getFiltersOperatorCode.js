function getFiltersOperatorCode() {
  let arr = [];
  document.querySelectorAll(".js-user-card:not(.js-hidden-by-filter)").forEach(item => {
    let code = item.querySelector(".js-user-code").textContent;
    
    if (arr.indexOf(code) === -1) arr.push(code);
  });
  
  arr = arr.sort((a, b) => a > b ? 1 : -1);
  return arr;
}

export default getFiltersOperatorCode;