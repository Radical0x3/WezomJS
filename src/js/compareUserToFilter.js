function compareUserToFilter(node, value) {
  if (value.length === 1) {
    return node === value[0];
  }
  
  if (Number.isInteger(+value[0])) {
    return +node >= +value[0] && +node <= +value[1];
  }
  
  if (value[0] === "under") {
    return +node < +value[1];
  } else if (value[0] === "over") {
    return +node > +value[1];
  }
}

export default compareUserToFilter;