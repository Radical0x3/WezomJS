import compareUserToFilter from "./compareUserToFilter";

function checkFiltersOptionAvailability(filteredUsers) {
  const optionsGroup = [...document.querySelectorAll(".filters fieldset:not(:last-child)")];
  
  for (let group of optionsGroup) {
    let options = [...group.querySelectorAll("input:not(:checked)")];
    
    for (let opt of options) {
      let optValue = opt.value.split(",");
      let optTag = group.dataset.field;
      
      let res = filteredUsers.filter(item => {
        let nodeValue = item.querySelector(`.js-user-${optTag}`).textContent;
        
        return compareUserToFilter(nodeValue, optValue);
      });
      
      if (res.length === 0) {
        opt.setAttribute("disabled", true);
        opt.parentNode.classList.add("disabled");
      } else {
        opt.removeAttribute("disabled");
        opt.parentNode.classList.remove("disabled");
      }
    }
    
  }
}

export default checkFiltersOptionAvailability;