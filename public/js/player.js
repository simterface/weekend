var player;

function onClickPlaylink(event) {
  event.preventDefault();
  var src = event.currentTarget.href;
  var title = $(this).find('.we-song-title').text();
  // TODO: Ensure that player is ready before setting media;
  player.jPlayer('setMedia', {
    m4a: src,
    title: title
  });

  player.jPlayer('play', 0);

  // TODO: Switch current song status icon
}

function getPlaylist() {
  var playlist = [];
  // 1. Read songs from page
  var songItems = $('.we-playlist-container .we-playlist-item').filter(function(){
    // filter out songs without source
    return !!($(this).find('.we-play-song').attr('href'));
  });
  // 2. Create playlist object for each found song
  songItems.each(function() {
    playlist.push({
      src: $(this).find('.we-play-song').attr('href'),
      title: $(this).find('.we-song-title').text()
    });
  });
  return playlist.length > 0 ? playlist : null;
}


$(document).ready(function(){
  player = $('#jquery_jplayer').jPlayer({
    ready: function () {
      var pl = getPlaylist();
      if (pl !== null) {
        $(this).jPlayer('setMedia', {
          title: pl[0].title,
          m4a: pl[0].src
        });
      } else {
          console.error('WE [Player]: Failed to get playlist');
      }
    },
    cssSelectorAncestor: '#jp_container',
    swfPath: '/js/jplayer',
    supplied: 'm4a',
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: true,
    remainingDuration: true,
    toggleDuration: true
  });

  $('a.we-play-song').click(onClickPlaylink);
});
