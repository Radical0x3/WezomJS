function bodyLock(body, lockPadding) {
  let unlock = true;
  const lockPaddingValue =
    window.innerWidth - body.outerWidth() + "px";
  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.css("padding-right", `${lockPaddingValue}`);
    }
  }
  body.css("padding-right", `${lockPaddingValue}`);
  body.addClass("lock");
  
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, 200);
}

function bodyUnlock(body, lockPadding) {
  let unlock = true;
  setTimeout(function () {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.css("padding-right", "0px");
    }
    body.css("padding-right", "0px");
    body.removeClass("lock");
  }, 200);
  
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, 200);
}

export {
  bodyLock,
  bodyUnlock
};