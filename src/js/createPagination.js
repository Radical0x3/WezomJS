import setPagination from "./setPagination";

function createPagination(id, max) {
  let start = id - 1 > 0 ? id - 1 : 1; // 2; 10; 2;
  let end = start + 4 <= max ? start + 4 : max; // 6; 13; 3;
  start = end - 4 > 0 ? end - 4 : 1;
  
  const opts = {
    first: +id === 1,
    last: +id === end,
    pages: []
  };
  
  for (let i = start; i <= end; i++) {
    opts.pages.push({active: i === +id, value: i});
  }
  setPagination(opts);
  return end;
}

export default createPagination;