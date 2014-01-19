function SongsCtrl ($scope, $firebase) {
  $scope.songs = $firebase(FirebaseRef.child('posts'));
}