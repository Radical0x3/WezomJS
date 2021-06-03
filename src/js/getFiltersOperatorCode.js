import $ from "jquery";

function getFiltersOperatorCode() {
  let arr = [];
  $(".js-user-card:not(.d-none)").each((id, elem) => {
    let code = $(elem).find(".js-user-code").text();
    if (arr.indexOf(code) === -1) arr.push(code);
  });
  
  arr = arr.sort((a, b) => a > b ? 1 : -1);
  return arr;
}

export default getFiltersOperatorCode;