import $ from "jquery";

function enableAllSelectGroup(select) {
  let optionsList = $("option", select);

  $.each(optionsList, function (idx, item) {
    $(item).attr("disabled", false);
  });
}

export default enableAllSelectGroup;
