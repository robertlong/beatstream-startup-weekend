// Put any global variables/functions in here.
var App = angular.module("beatstream", ["firebase", 'angularMoment']);

var FirebaseRef = new Firebase('https://beatstream.firebaseio.com');

App.filter('reverse', function() {
      function toArray(list) {
         var k, out = [];
         if( list ) {
            if( angular.isArray(list) ) {
               out = list;
            }
            else if( typeof(list) === 'object' ) {
               for (k in list) {
                  if (list.hasOwnProperty(k)) { out.push(list[k]); }
               }
            }
         }
         return out;
      }
      return function(items) {
         return toArray(items).slice().reverse();
      };
   });

App.filter('toDate', function() {
  return function(item) {
     return new Date().setTime(item);
  };
});

$(document).ready(function() {
  $('#rdio-api').rdio(window.playbackToken);
});