(function(){
  function WeekendPlayer(jplayerId, jpAncestorId) {
    this._jpSelector = '#'+jplayerId;
    this._jpAncestorSelector = '#'+jpAncestorId;
  }

  WeekendPlayer.prototype.init = function () {
    var self = this;
    this._playlist = new Playlist();
    this._jplayer = $(this._jpSelector).jPlayer({
      ready: this.loadFirst.bind(this),
      ended: this.playNext.bind(this),
      cssSelectorAncestor: self._jpAncestorSelector,
      swfPath: '/js/jplayer',
      supplied: 'm4a',
      useStateClassSkin: true,
      autoBlur: false,
      smoothPlayBar: true,
      keyEnabled: true,
      remainingDuration: true,
      toggleDuration: true
    });
  };

  WeekendPlayer.prototype.loadFirst = function () {
    this.loadTrack(0);
  };

  WeekendPlayer.prototype.loadTrack = function (index) {
    var media = this._playlist.getMedia(index);
    if (!media) {
      this._jplayer.jPlayer('setMedia', {
        m4a: 'not_found.m4a',
        title: 'Media not found'
      });
      this._playlist.setCurrent();
      console.error('[WeekendPlayer] Media not found');
      return false;
    }
    this._jplayer.jPlayer('setMedia', media);
    // NOTE: May be it have to be done when song is played
    this._playlist.setCurrent(index);
    return true;
  };

  WeekendPlayer.prototype.playTrack = function (index) {
    if (!this.loadTrack(index))
      this._jplayer.jPlayer('stop');
    else
      this._jplayer.jPlayer('play', 0);
  };

  WeekendPlayer.prototype.playNext = function () {
    var i = this._playlist.getNextIndex();
    console.log('Playing next song, i:', i);
    this.playTrack(i);
  };

  WeekendPlayer.prototype.onSelectTrackInPlaylist = function (event) {
    event.preventDefault();
    var src = $(event.currentTarget).attr('href');
    var index = this._playlist.getTrackIndex(src);
    if(index !== null) this.playTrack(index);
  };

  function Playlist() {

    var extractMedia = function (songItem) {
        var item = $(songItem);
        if (!item) return;
        return {
          m4a: item.find('.we-play-song').attr('href'),
          title: item.find('.we-song-title').text()
        }
    };

    var playlist = [];
    // 1. Read songs from page
    var songItems = $('.we-playlist-container .we-playlist-item').filter(function(){
      // filter out songs without source
      return !!($(this).find('.we-play-song').attr('href'));
    });
    // 2. Create playlist object for each found song
    songItems.each(function(index) {
      playlist.push({
        index: index,
        media: extractMedia(this),
        item: this //html list item with current song
      });
    });
    this._tracks = playlist;
  }

  Playlist.prototype.getMedia = function (index) {
    if (!this.checkIndex(index)) return null;
    // return new object because jPlayer('setMedia') corrupts m4a field if object passed directly;
    return {
      m4a: this._tracks[index].media.m4a,
      title: this._tracks[index].media.title
    };
  };

  Playlist.prototype.getItem = function (index) {
    if (!this.checkIndex(index)) return null;
    return this._tracks[index].item;
  };

  Playlist.prototype.setCurrent = function (index) {
    if(this._currentTrack) {
      this.updateStyle(this._currentTrack.index, 'default');
    }

    if (!this.checkIndex(index)) {
      this._currentTrack = undefined;
      return;
    }

    this._currentTrack = this._tracks[index];
    this.updateStyle(index, 'playing');
  };

  Playlist.prototype.checkIndex = function (i) {
    // NOTE: May be it's worth check if i is Number
    var res = i > -1 && i < this._tracks.length;
    if (!res) {
      console.error('[Playlist] Bad index request. I = ', i);
    }
    return res;
  };

  Playlist.prototype.getTrackIndex = function (src) {
    var index = -1;
    if(src) {
      for (var i = 0; i < this._tracks.length; i++) {
        if (this._tracks[i].media.m4a !== src) continue;
        index = i;
        break;
      }
    }
    return index;
  };

  Playlist.prototype.updateStyle = function (index, style) {
    var item = this._tracks[index].item;
    var PLAYING_ICON_CLASS = 'glyphicon-headphones',
        DEFAULT_ICON_CLASS = 'glyphicon-play';

    switch (style) {
      case 'default':
        // set default styling for playlist item
        $(item).find('.we-play-icon').removeClass(PLAYING_ICON_CLASS).addClass(DEFAULT_ICON_CLASS);
        break;
      case 'playing':
        // set playing styling for playlist item
        $(item).find('.we-play-icon').removeClass(DEFAULT_ICON_CLASS).addClass(PLAYING_ICON_CLASS);
        break;
      default:
        console.warn('[Playlist] Failed to update item style');
        return;
    }
  };

  Playlist.prototype.getNextIndex = function () {
    if (!this._currentTrack) return 0;
    var i = this._currentTrack.index+1;
    if (i > this._tracks.length-1) return 0;
    else return i;
  };
  $(document).ready(function(){
    var player = new WeekendPlayer('jquery_jplayer', 'jp_container');
    player.init();

    $('a.we-play-song').click(player.onSelectTrackInPlaylist.bind(player));
  });
})();
