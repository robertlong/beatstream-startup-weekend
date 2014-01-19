function PostSongCtrl ($scope) {

  $scope.post = {
    song_id: null,
    artist:"",
    name:"",
    description: "",
    icon: "http://placehold.it/400x400"
  };

  $scope.showModal = function() {
    $('#post-song-modal').modal();
  };

  $('#song-search').typeahead({
    name: 'songs',
    valueKey: 'name',
    rateLimitWait: 1000,
    remote: {
      url:'/api/search?query=%QUERY',
      filter: function(res) {
        return res.result.results;
      }
    },
    template: [
      '<div class="search-result">',
      '<img src="{{icon}}">{{name}} by {{artist}}</div>'
    ].join(''),
    engine: Hogan
  });

  $('#song-search').on('typeahead:selected', function (object, data) {
    $scope.post = {
      user: {
        id: CurrentUser.id,
        name: CurrentUser.name,
        avatar: CurrentUser.icon
      },
      song: data.key,
      artist: data.artist,
      name: data.name,
      icon: data.icon400,
      createdAt: Firebase.ServerValue.TIMESTAMP
    };
  });

  $scope.postSong = function() {
    console.log($scope.post);
    
    FirebaseRef.child('posts').push($scope.post);

    $scope.post = {
      song_id: null,
      artist:"",
      name:"",
      description: "",
      icon: ""
    };

    $('#post-song-modal').modal('hide');
  };

}