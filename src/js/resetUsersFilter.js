function resetUsersFilter() {
  const cards = document.querySelectorAll(".js-user-card");
  cards.forEach((item) => item.classList.remove("d-none"));
}

export default resetUsersFilter;
