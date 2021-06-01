import $ from "jquery";

function resetSortOptionsOrder(event, parent) {
  const element = $(event.params.data.element);
  const elementId = +element[0].dataset.optindex;
  
  element.detach();
  if (elementId === 1) {
    $(parent).prepend(element);
  } else if (elementId === $(parent).find(`option`).length + 1) {
    $(parent).append(element);
  } else {
    $(parent)
      .find(`option[data-optindex=${elementId - 1}]`)
      .after(element);
  }
}

export default resetSortOptionsOrder;
