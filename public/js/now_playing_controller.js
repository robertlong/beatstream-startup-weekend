function NowPlayingCtrl ($scope) {

  // Docs availible here: http://www.eyecon.ro/bootstrap-slider/
  $('.volume-slider').slider();

  $scope.play = function() {
    Rdio.play('a171827');
  };

}