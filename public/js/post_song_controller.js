function PostSongCtrl ($scope) {

  $scope.post = {
    song_id: null,
    artist:"",
    name:"",
    description: "",
    icon: ""
  };

  $scope.showModal = function() {
    $('#post-song-modal').modal();
  };

  $('#song-search').typeahead({
    name: 'songs',
    valueKey: 'title',
    remote: {
      url:'http://developer.echonest.com/api/v4/song/search?api_key=VQ4LFKF3YHXENH7AO&combined=%QUERY&sort=song_hotttnesss-desc&bucket=id:rdio-US&bucket=id:7digital-US&bucket=tracks&limit=true',
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

    $scope.post = {
      song: datum.tracks[0].foreign_id.split("rdio-US:track:")[1],
      artist: datum.artist_name,
      name: datum.title
    };

    for (var i = 0; i < datum.tracks.length; i++) {
      if (datum.tracks[i].catalog === "7digital-US") {
        $scope.post.icon = datum.tracks[i].release_image;
        break;
      }
    }

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