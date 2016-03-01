app.controller('AuthCtrl', ['Auth', 'RegisterTenant', 'Profile', 'AlertService', 'md5', 'tid', '$state',
  function (                 Auth,   RegisterTenant,   Profile,   AlertService,   md5,   tid,   $state) {
    var authCtrl = this;
    authCtrl.tenant = {};
    authCtrl.user = {
      name: '',
      email: '',
      password: ''
    };

    authCtrl.login = function() {
      Auth.$authWithPassword(authCtrl.user).then(function(auth) {
        $state.go('admin.dashboard');
      }, function(error) {
        AlertService.addError(error.message);
      });
    };

    authCtrl.createProfile = function() {
      authCtrl.profile = Profile.getProfile(authCtrl.tenant.uid);
      authCtrl.profile.$loaded().then(function() {
        authCtrl.profile.emailHash = md5.createHash(authCtrl.user.email);
        authCtrl.profile.name = authCtrl.tenant.name;
        authCtrl.profile.tid = authCtrl.tid;
        authCtrl.profile.type = 'tenant';
        authCtrl.profile.$save();
        authCtrl.login();
      });
    }, function(error) {
      AlertService.addError(error.message);
    };

    authCtrl.registerTenant = function() {
      var domainCode = authCtrl.user.email.replace(/.*@/, "");
      var n = domainCode.indexOf(".");
      domainCode = domainCode.substring(0, n);
        Auth.$createUser(authCtrl.user).then(function (user) {
          authCtrl.tenant.uid = user.uid;
          authCtrl.tenant.name = authCtrl.user.name;
          authCtrl.tenant.domain = authCtrl.user.email.replace(/.*@/, "");
          authCtrl.tenant.domain_code = domainCode;
          authCtrl.tenant.invoice_number = 1;
          authCtrl.tenant.alert_count = 0;
          RegisterTenant.all.$add(authCtrl.tenant).then(function(ref) {
            authCtrl.tid = ref.key();
            authCtrl.createProfile();
          })
        });
      }, function(error) {
        AlertService.addError(error.message);
      };

}]);
