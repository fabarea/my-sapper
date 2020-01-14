import * as sapper from "@sapper/app";

import "./i18n.js";

sapper
  .start({
    target: document.querySelector("#sapper")
  })
  .then(() => {

    // SideNav Initialization
    $(".button-collapse").sideNav();

    new WOW().init();
  });
