app.factory('CustomerProfileCtrl', ['$state', 'md5', 'auth', 'profile',
  function (                         $state,   md5,   auth,   profile) {
    var customerProfileCtrl = this;

    customerProfileCtrl.profile = profile;

    profileCtrl.updateProfile = function() {
      customerProfileCtrl.profile.emailHash = md5.createHash(auth.password.email);
      customerProfileCtrl.profile.$save();
    };

}]);
