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
    valueKey: 'title',
    remote: {
      url:'http://developer.echonest.com/api/v4/song/search?api_key=VQ4LFKF3YHXENH7AO&combined=%QUERY&sort=song_hotttnesss-desc&bucket=id:rdio-US&bucket=tracks&limit=true',
      filter: function(res) {
        console.log(res.response.songs);
        return res.response.songs;
      }
    },
    template: [
      '<div class="search-result">{{title}}</div>'
    ].join(''),
    engine: Hogan
  });

  $('#song-search').on('typeahead:selected', function (object, datum) {

    console.log()

    $scope.post = {
      user: {
        id: CurrentUser.id,
        name: CurrentUser.name,
        avatar: "http://graph.facebook.com/" + CurrentUser.id + "/picture"
      },
      song: datum.tracks[0].foreign_id.split("rdio-US:track:")[1],
      artist: datum.artist_name,
      name: datum.title,
      icon: "http://placehold.it/400x400"
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