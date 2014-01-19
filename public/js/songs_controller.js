function SongsCtrl ($scope, $firebase) {
  $scope.songs = $firebase(FirebaseRef.child('posts'));

  $scope.play = function(songId) {
    $("#rdio-api").rdio().play(songId);
  };
}