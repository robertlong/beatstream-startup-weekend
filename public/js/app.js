// Put any global variables/functions in here.
var App = angular.module("beatstream", ["firebase"]);

var FirebaseRef = new Firebase('https://beatstream.firebaseio.com');

$(document).ready(function() {
  $('#rdio-api').rdio('GAlNi78J_____zlyYWs5ZG02N2pkaHlhcWsyOWJtYjkyN2xvY2FsaG9zdEbwl7EHvbylWSWFWYMZwfc=');
  window.Rdio = $("#rdio-api").rdio();
});