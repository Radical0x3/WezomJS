import $ from "jquery";

function disableSelectGroup(event, target, disabled) {
  const selId = event.params.args.data.id;
  const group = $("option[value='" + selId + "']").data("groupid");

  let optionsList = $("option", target);
  $.each(optionsList, function (idx, item) {
    const itemGroupId = $(item).data("groupid");

    if (itemGroupId === group && $(item).val() !== selId) {
      $(item).attr("disabled", disabled);
    }
  });
}

export default disableSelectGroup;
