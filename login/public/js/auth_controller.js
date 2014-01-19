function AuthCtrl ($scope) {

  var auth = new FirebaseSimpleLogin(FirebaseRef, function(error, user) {
    if (error) {
      // an error occurred while attempting login
      console.log(error);
    } else if (user) {
      // user authenticated with Firebase
      console.log(user);
      user.avatar = "http://graph.facebook.com/" + user.id + "/picture";
      $scope.user = user;
      window.CurrentUser = user;
    } else {
      console.log('logged out');
      $scope.user = null;
      window.CurrentUser = null;
    }
    $scope.$apply();
  });

  $scope.login = function() {
    auth.login('facebook', {
      rememberMe: true
    });
  };

  $scope.logout = function() {
    auth.logout();
  };
}