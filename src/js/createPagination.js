import setPagination from "./setPagination";

function createPagination(id, max, activePages = []) {
  let start = id - 1 > 0 ? id - 1 : 1;
  let end = start + 4 <= max ? start + 4 : max;
  start = end - 4 > 0 ? end - 4 : 1;
  
  const opts = {
    first: +id === 1,
    last: +id === end,
    pages: []
  };
  
  for (let i = start; i <= end; i++) {
    opts.pages.push({active: i === +id || activePages.indexOf(i) > -1, value: i});
  }
  
  setPagination(opts);
}

export default createPagination;