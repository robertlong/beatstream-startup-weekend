function NowPlayingCtrl ($scope, $firebase) {
	var nowPlaying = false;

	$scope.song = {
		icon: "",
		name: "",
		artist: ""
	};

  var posts = [];

  var postsRef = FirebaseRef.child('posts');
  var curSong = null;

  postsRef.on('child_added', function(snapshot) {
    if (curSong === null) {
      curSong = 0;
      $('#rdio-api').bind('ready.rdio', function() {
        $("#rdio-api").rdio().play(snapshot.val().song);
      });
    }

    posts.push(snapshot.val());
  });

  $('#rdio-api').bind('playingTrackChanged.rdio', function(e, playingTrack, sourcePosition) {
    $scope.song = playingTrack;
    setTimeout(function(){ $scope.$apply();});
  });

  // Docs availible here: http://www.eyecon.ro/bootstrap-slider/
  $('.volume-slider').slider({
    max: 100,
    value: 50,
    slide: function(event, ui) {
      var volume = ui.value;
      console.log(volume);
      $("#rdio-api").rdio().setVolume(volume/100);
    }
  });

  $scope.play = function() {
    if (!nowPlaying) {
      $("#rdio-api").rdio().play(posts[curSong].song);
      nowPlaying = true;
    }
    else {
      $("#rdio-api").rdio().play();
    }
    $('.glyphicon-play').hide();
    $('.glyphicon-pause').show();
  };

  $scope.pause = function() {
    $("#rdio-api").rdio().pause(posts[curSong].song);
    $('.glyphicon-pause').hide();
    $('.glyphicon-play').show();
  };

  $scope.next = function() {
    curSong++;
    console.log(posts[curSong].song);
    $("#rdio-api").rdio().play(posts[curSong].song);
  };

  $scope.previous = function() {
    if (curSong > 0) {
      curSong--;
    }

    $("#rdio-api").rdio().play(posts[curSong].song);
  };
}