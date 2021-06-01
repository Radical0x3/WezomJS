function getFiltersOptions(input, opts) {
  let filterOpts = opts;
  let key = input.parentNode.parentNode.dataset.field;
  let value = input.value;
  
  if (!input.checked) {
    filterOpts[key].splice(filterOpts[key].indexOf(value), 1);
  } else {
    filterOpts.hasOwnProperty(key) ? filterOpts[key].push(value) : filterOpts[key] = [value];
  }
  
  return filterOpts;
}

export default getFiltersOptions;