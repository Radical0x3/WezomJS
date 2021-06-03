import $ from "jquery";

function getSeed(url) {
  $(".js-load-button").addClass("button--hiding");
  $(".js-more-button").addClass("button--hiding");
  $("body").addClass("loading");
  
  return fetch(url)
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .then((data) => data.info);
}

export default getSeed;