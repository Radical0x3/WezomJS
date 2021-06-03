import $ from "jquery";
import "select2/dist/js/select2.min";

import getFiltersOperatorCode from "./getFiltersOperatorCode";

function fillUsersOperatorSelect() {
  const data = getFiltersOperatorCode();
  const select = $(".js-operators-select");
  const selectedValues = select.val();
  
  select.empty().select2($.extend({}, {
    placeholder: "Choose an operator",
    data: data,
  }));
  
  select.val(selectedValues);
  select.trigger("change");
}

export default fillUsersOperatorSelect;