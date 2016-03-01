app.controller('LoginCtrl', ['Auth', 'AlertService', '$state',
  function (                  Auth,   AlertService,   $state) {
    var loginCtrl = this;
    loginCtrl.user = {};

    loginCtrl.login = function() {
      Auth.$authWithPassword(loginCtrl.user).then(function (auth) {
        $state.go('account.dashboard');
      }, function(error) {
        AlertService.addError(error.message);
      });
    };

}]);
