function NowPlayingCtrl ($scope, $firebase) {
	var nowPlaying = false;

	$scope.song = {
		icon: "",
		name: "",
		artist: ""
	};

  var posts = [];

  var postsRef = FirebaseRef.child('posts');

  SongState.songIndex = null;

  

  postsRef.on('value', function(data) {
    posts = _.sortBy(data.val(), function(post) {
      return post.createdAt;
    }).reverse();

    if (SongState.songIndex === null) {
      SongState.songIndex = 0;
      $('#rdio-api').bind('ready.rdio', function() {
        $("#rdio-api").rdio().play(posts[SongState.songIndex].song);
      });
    }
  });

  $('#rdio-api').bind('playingTrackChanged.rdio', function(e, playingTrack, sourcePosition) {
    $scope.song = playingTrack;
    SongState.playing = true;
    setTimeout(function(){ $scope.$apply();});
  });

  $('#rdio-api').bind('playStateChanged.rdio', function(e, playState) {
    if (playState === 0) {
      $('.glyphicon-play').show();
      $('.glyphicon-pause').hide();
    } else {
      $('.glyphicon-play').hide();
      $('.glyphicon-pause').show();
    }
  });

  // Docs availible here: http://www.eyecon.ro/bootstrap-slider/
  $('.volume-slider').slider({
    max: 100,
    value: 50,
    slide: function(event, ui) {
      var volume = ui.value;
      $("#rdio-api").rdio().setVolume(volume/100);
    }
  });

  $scope.play = function() {
    if (!SongState.playing) {
      $("#rdio-api").rdio().play(posts[SongState.songIndex].song);
    }
    else {
      $("#rdio-api").rdio().play();
    }
  };

  $scope.pause = function() {
    $("#rdio-api").rdio().pause(posts[SongState.songIndex].song);
  };

  $scope.next = function() {
    if (SongState.songIndex < posts.length - 1) {
      SongState.songIndex++;
    }

    $('html, body').animate({
        scrollTop: $(".song-card").eq(SongState.songIndex).offset().top - $('#nav').height() - 20
    }, 1000);
    
    $("#rdio-api").rdio().play(posts[SongState.songIndex].song);
  };

  $scope.previous = function() {
    if (SongState.songIndex > 0) {
      SongState.songIndex--;
    }

    $('html, body').animate({
        scrollTop: $(".song-card").eq(SongState.songIndex).offset().top - $('#nav').height() - 20
    }, 1000);

    $("#rdio-api").rdio().play(posts[SongState.songIndex].song);
  };
}