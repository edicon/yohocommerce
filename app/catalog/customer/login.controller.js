app.controller('LoginCtrl', ['Login', 'tid', '$state',
  function (                  Login,   tid,   $state) {
    var loginCtrl = this;

    loginCtrl.login = function() {
      Login.$authWithPassword(loginCtrl.user).then(function (auth) {
        $state.go('catalog.customer');
      }, function(error) {
        loginCtrl.error = error;
      });
    };

}]);
