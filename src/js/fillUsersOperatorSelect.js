import getFiltersOperatorCode from "./getFiltersOperatorCode";
import $ from "jquery";

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