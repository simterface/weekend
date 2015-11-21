var $ = require('jquery');

module.exports = {
  show: () => {$('footer').find('.we-brand').removeClass('invisible');},
  hide: () => {$('footer').find('.we-brand').addClass('invisible');}
};
