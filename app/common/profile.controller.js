app.factory('ProfileCtrl', ['$state', 'md5', 'auth', 'profile',
  function (                 $state,   md5,   auth,   profile) {
    var profileCtrl = this;

    profileCtrl.profile = profile;

    profileCtrl.updateProfile = function() {
      adminProfileCtrl.profile.emailHash = md5.createHash(auth.password.email);
      adminProfileCtrl.profile.$save();
    };

}]);
