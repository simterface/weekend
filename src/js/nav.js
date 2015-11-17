var $ = require('jquery');

var getNav = function() {
  return $('.we-nav');
};

var resetActive = function() {
  let activeSection = getNav().children('li.active');
  if (activeSection.length > 0) {
    activeSection.removeClass('active');
  }
};

var setActive = function(index) {
  resetActive();
  let i = Number(index);
  if(i>=0) {
    getNav().children(`[data-sectionindex="${i}"]`).addClass('active');
  } else {
    console.warn('Wrong section index');
  }
}

module.exports = {
    resetActive: resetActive,
    setActive: setActive
};
