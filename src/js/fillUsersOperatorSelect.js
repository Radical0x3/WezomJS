import $ from "jquery";
import "select2/dist/js/select2.min";

import getFiltersOperatorCode from "./getFiltersOperatorCode";

function fillUsersOperatorSelect(users) {
  const data = getFiltersOperatorCode(users);
  const select = $(".js-operators-select");
  const selectedValues = select.val();
  
  select.empty().select2($.extend({}, {
    data: data,
  }));
  
  select.val(selectedValues);
  select.trigger("change");
}

export default fillUsersOperatorSelect;