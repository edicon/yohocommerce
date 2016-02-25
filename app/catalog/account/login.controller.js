app.controller('LoginCtrl', ['AccountLogin', 'tid', '$state',
  function (                  AccountLogin,   tid,   $state) {
    var loginCtrl = this;

    loginCtrl.login = function() {
      AccountLogin.$authWithPassword(loginCtrl.user).then(function (auth) {
        $state.go('catalog.account');
      }, function(error) {
        loginCtrl.error = error;
      });
    };

}]);
