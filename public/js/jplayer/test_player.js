$(document).ready(function(){
  $("#jquery_jplayer_1").jPlayer({
    ready: function () {
      $(this).jPlayer("setMedia", {
        title: "Test Elka",
        m4a: "/audio/test.m4a",
      });
    },
    cssSelectorAncestor: "#jp_container_1",
    swfPath: "/js/jplayer",
    supplied: "m4a",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: true,
    remainingDuration: true,
    toggleDuration: true
  });
});
