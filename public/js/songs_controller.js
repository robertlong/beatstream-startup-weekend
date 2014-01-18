function SongsCtrl ($scope) {
  $scope.songs = [
    {
      name: "Song Name",
      artist: "Artist",
      description: "This song is awesome!",
      user: {
        name: "Test User"
      }
    }
  ];
}