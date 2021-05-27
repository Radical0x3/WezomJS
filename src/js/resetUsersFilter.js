import $ from "jquery";

function resetUsersFilter() {
  const cards = document.querySelectorAll(".js-user-card");
  cards.forEach((item) => item.classList.remove("d-none"));

  $(".js-filter-select")
    .val($(".js-filter-select option:eq(0)").val())
    .trigger("change");

  document.querySelector(".js-statistics").classList.remove("d-none");
}

export default resetUsersFilter;
