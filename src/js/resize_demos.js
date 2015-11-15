var $ = require('jquery');

let getSectionSize = function(section) {
  let h = $(section).height();
  let w = $(section).width();
  return {
    height: h > 0 ? h : 0,
    width: w > 0 ? w : 0
  };
};

let setContainerSize = function(mainSize, otherSize) {
  // mainSize - size of the first containers
  // otherSize - size of the other containers
  $('.we-demo .we-demo-wrapper').css('width', mainSize.width + 'px');
  let containers = $('.we-demo .we-demo-container');
  containers.first().css({
    "width": mainSize.width + "px",
    "height": mainSize.height + "px"
  });
  containers.slice(1).css({
    "width": otherSize.width + "px",
    "height": otherSize.height + "px"
  });
};

module.exports = function() {
  // TODO: implement layout parameter
  // layout: prominent (1+2), equal (3)
  // implement prominent layout (default for large screens);
  const KH = 13.5; // layout height aspect ratio
  const KW = 16; // layout width aspect ratio
  let section = $('.we-demo');
  let sectionSize = getSectionSize(section);
  let widthUnit = Math.round(sectionSize.width/KW);
  let heightUnit = Math.round(sectionSize.height/KH);
  let scaleByHeight = widthUnit > heightUnit;

  let mainContainerSize = {};
  let otherContainerSize = {};

  if(scaleByHeight) {
    mainContainerSize.height = Math.round(sectionSize.height*2/3);
    mainContainerSize.width = Math.round(mainContainerSize.height* 16/9);
  } else {
    mainContainerSize.width = sectionSize.width;
    mainContainerSize.height = Math.round(mainContainerSize.width* 9/16);
  }
  otherContainerSize.width = mainContainerSize.width/2;
  otherContainerSize.height = mainContainerSize.height/2;
  setContainerSize(mainContainerSize, otherContainerSize);
};
