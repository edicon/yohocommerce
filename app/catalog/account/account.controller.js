app.controller('AccountCtrl', ['Auth', '$state', 'profile',
  function (                    Auth,   $state,  profile) {
    var accountCtrl = this;
    accountCtrl.profile = profile;
    accountCtrl.authInfo = Auth.$getAuth();

    accountCtrl.logout = function() {
      Auth.$unauth();
      $state.go('catalog.home');
    };

}]);
