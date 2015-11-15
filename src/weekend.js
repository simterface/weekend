// Weekend App Entry point

// Add styles
require('./styles/site.scss');
require('./lib/onepage-scroll/onepage-scroll.css');

// Add modules
var w = {}; // Window wraper for jquery plugin
var jQuery = require("jquery");
w.jQuery = jQuery;
// put w into window var required by plugin
require('imports?w=>window!./lib/onepage-scroll/jquery.onepage-scroll.min.js');

jQuery(document).ready(function() {
  // enable onepage scroll plugin
  jQuery(".main").onepage_scroll({
    sectionContainer: "section",
    easing: "ease",
    animationTime: 1000,
    pagination: false,
    updateUrl: false,
    loop: false,
    keyboard: true,
    responsiveFallback: false,
    direction: "vertical"
  });
});
