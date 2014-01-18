function NowPlayingCtrl ($scope) {

	$scope.song = {
		icon: "",
		name: "",
		artist: ""
	};

	$('#rdio-api').bind('playingTrackChanged.rdio', function(e, playingTrack, sourcePosition) {
		$scope.song = playingTrack;
		$scope.$apply();
	})

  // Docs availible here: http://www.eyecon.ro/bootstrap-slider/
  $('.volume-slider').slider({
  	max: 100,
  	value: 50,
  	slide: function(event, ui) {
  		var volume = ui.value;
  		console.log(volume);
  		Rdio.setVolume(volume/100);
  	}
  });

  $scope.play = function() {
    Rdio.play('a171827', {
    	initialPosition: 5
    });
  };

  $scope.pause = function() {
  	Rdio.pause('a171827');
  };

  $scope.next = function() {
  	Rdio.next();
  };

  $scope.previous = function() {
  	Rdio.previous();
  };
}