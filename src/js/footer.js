var $ = require('jquery');

module.exports = {
  showBrand: () => {$('footer').find('.we-brand').removeClass('invisible');},
  hideBrand: () => {$('footer').find('.we-brand').addClass('invisible');}
};
