import $ from "jquery";
import Handlebars from "handlebars/dist/handlebars.min";

function setPagination(opts) {
  const paginationNode = $(".js-pagination-col");
  const pagination = Handlebars.partials["Pagination"](opts);
  
  if (paginationNode.length > 0) {
    paginationNode.html(pagination);
  } else {
    let paginationRow = $(document.createElement("div"));
    paginationRow.addClass("row");
    let paginationCol = $(document.createElement("div"));
    paginationCol.addClass("col-12 js-pagination-col");
    paginationCol.html(pagination);
    paginationRow.html(paginationCol);
    $(paginationRow).insertAfter(".js-main-content");
  }
}

export default setPagination;