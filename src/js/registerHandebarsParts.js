import Handlebars from "handlebars/dist/handlebars.min";

// Register handlebars user partial
const userSource = document.getElementById("user-template").innerHTML;
const userTemplate = Handlebars.compile(userSource);
Handlebars.registerPartial("User", userTemplate);

// Register handlebars statistics partial
const statisticsSource = document.getElementById(
  "statistics-template"
).innerHTML;
const statisticsTemplate = Handlebars.compile(statisticsSource);
Handlebars.registerPartial("Statistics", statisticsTemplate);

// Register handlebars natsListItem partial
const natsListItemSource =
  document.getElementById("nats-list-item-template").innerHTML;
const natsListItemTemplate = Handlebars.compile(natsListItemSource);
Handlebars.registerPartial("NatsListItem", natsListItemTemplate);

// Register handlebars searchFailed partial
const searchFailedSource = document.getElementById("search-failed-template").innerHTML;
const searchFailedTemplate = Handlebars.compile(searchFailedSource);
Handlebars.registerPartial("SearchFailed", searchFailedTemplate);

// Register handlebars searchFailed partial
const filtersSource = document.getElementById("filters-template").innerHTML;
const filtersTemplate = Handlebars.compile(filtersSource);
Handlebars.registerPartial("Filters", filtersTemplate);

// Register handlebars searchFailed partial
const paginationSource = document.getElementById("pagination-template").innerHTML;
const paginationTemplate = Handlebars.compile(paginationSource);
Handlebars.registerPartial("Pagination", paginationTemplate);