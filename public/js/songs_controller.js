function SongsCtrl ($scope, $firebase) {
  $scope.songs = $firebase(FirebaseRef.child('posts'));

  $scope.play = function(songId, index) {
    SongState.songIndex = index;
    $("#rdio-api").rdio().play(songId);
  };
}