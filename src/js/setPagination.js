import $ from "jquery";
import Handlebars from "handlebars/dist/handlebars.min";

function setPagination(opts) {
  const paginationNode = $(".js-pagination-col");
  const pagination = Handlebars.partials["Pagination"](opts);
  
  if (paginationNode.length > 0) {
    paginationNode.html(pagination);
  } else {
    let paginationRow = $(document.createElement("div"));
    paginationRow.addClass("row mb-3");
    let paginationCol = $(document.createElement("div"));
    paginationCol.addClass("col-12 js-pagination-col");
    opts.pages.length < 2 ? paginationCol.addClass("d-none") : paginationCol.removeClass("d-none");
    paginationCol.html(pagination);
    paginationRow.html(paginationCol);
    $(paginationRow).insertAfter(".js-main-content");
  }
  
  if (opts.pages.length < 2) {
    paginationNode.addClass("d-none");
  } else {
    paginationNode.removeClass("d-none");
  }
}

export default setPagination;