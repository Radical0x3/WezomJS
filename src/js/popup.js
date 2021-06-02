import $ from "jquery";
import {bodyLock, bodyUnlock} from "./toggleBodyLock";

const body = $("body");
const lockPadding = $(".lock-padding");

function openPopup(id) {
  bodyLock(body, lockPadding);
  $(`.js-popup[data-id-popup="${id}"]`).fadeIn(300);
}

function closePopup() {
  bodyUnlock(body, lockPadding);
  $(".js-popup").fadeOut(300);
}

$(".js-popup__close").click(closePopup);

$(".js-btn-popup").click(function (e) {
  e.preventDefault();
  let popupIndex = $(this).attr("href");
  openPopup(popupIndex);
});

$(".js-popup").click(function (e) {
  let popup = $(".js-popup__wrap");
  if (!popup.is(e.target) && popup.has(e.target).length === 0) {
    closePopup();
  }
});

export {
  openPopup,
  closePopup
};