function PostSongCtrl ($scope) {
  $scope.showModal = function() {
    $('#post-song-modal').modal();
  };

  $('#song-search').typeahead({
    name: 'songs',
    valueKey: 'id',
    remote: {
      url:'http://developer.echonest.com/api/v4/song/search?api_key=VQ4LFKF3YHXENH7AO&combined=%QUERY&bucket=id:rdio-US&bucket=tracks&limit=true',
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
      console.log(datum);
  });
}