import $ from "jquery";
import compareUserToFilter from "./compareUserToFilter";

function checkFiltersOptionAvailability() {
  const optionsGroup = [...$(".filters fieldset:not(:last-child)")];
  
  for (let group of optionsGroup) {
    let users = [...$(".js-user-card:not(.js-hidden-by-filter)")];
    let options = [...$(group).find("input:not(:checked)")];
    let optionsChecked = $(group).find("input:checked");
    let res = [];
    
    if (optionsChecked.length > 0) continue;
    
    for (let opt of options) {
      opt = $(opt);
      let optValue = opt.val().split(",");
      let optTag = $(group).data("field");
      
      let temp = users.filter(item => {
        let nodeValue = $(item).find(`.js-user-${optTag}`).text();
        
        return compareUserToFilter(nodeValue, optValue);
      });
      res = [...res, ...temp];
      
      if (temp.length === 0) {
        opt.attr("disabled", true);
        opt.parent().addClass("disabled");
      } else {
        opt.removeAttr("disabled");
        opt.parent().removeClass("disabled");
      }
    }
  }
}

export default checkFiltersOptionAvailability;