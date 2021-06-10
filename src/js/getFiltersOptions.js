import $ from "jquery";

function getFiltersOptions(input, opts) {
  let filterOpts = opts;
  let key = $(input).parents("fieldset").data("field");
  let value = $(input).val();
  
  if (!input.checked) {
    filterOpts[key].splice(filterOpts[key].indexOf(value), 1);
  } else {
    if (filterOpts.hasOwnProperty(key)) {
      !filterOpts[key].includes(value) ? filterOpts[key].push(value) : null;
    } else {
      filterOpts[key] = [value];
    }
  }
  
  return filterOpts;
}

export default getFiltersOptions;