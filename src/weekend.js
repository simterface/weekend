// Weekend App Entry point

// Add styles
require('./styles/site.scss');
require('./lib/onepage-scroll/onepage-scroll.css');

// Add modules
var w = {}; // Window wraper for jquery plugin
var $ = require("jquery");
w.jQuery = $;
// put w into window var required by plugin
require('imports?w=>window!./lib/onepage-scroll/jquery.onepage-scroll.min.js');

var navController = require('./js/nav.js');
var footerController = require('./js/footer.js');

var resizeDemos = require('./js/resize_demos.js');

$(document).ready(function() {
  // enable onepage scroll plugin
  $(".main").onepage_scroll({
    sectionContainer: "section",
    easing: "ease",
    animationTime: 1000,
    pagination: false,
    updateUrl: false,
    loop: false,
    keyboard: true,
    responsiveFallback: false,
    direction: "vertical",
    beforeMove: index => {
      navController.resetActive();
    },
    afterMove: index => {
      navController.setActive(index);
      if (index > 1) {
        footerController.showBrand();
      } else {
        footerController.hideBrand();
      }
    }
  });

  // add navbar click handlers
  $(".we-section-nav").click(event => {
    event.preventDefault();
    let sectionIndex = +$(event.currentTarget).attr("data-sectionindex");
    if (!sectionIndex || typeof sectionIndex !== 'number') {
      console.warn(`Section index not defined`);
    } else {
      $(".main").moveTo(sectionIndex);
    }
  });

  resizeDemos();
});
