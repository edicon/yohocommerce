app.controller('AdminLoginCtrl', ['Auth', 'RegisterTenant', 'Profile', 'AlertService', 'md5', 'tid', '$state',
  function (                       Auth,   RegisterTenant,   Profile,   AlertService,   md5,   tid,   $state) {
    var adminLoginCtrl = this;
    adminLoginCtrl.tenant = {};
    adminLoginCtrl.user = {
      name: '',
      email: '',
      password: ''
    };

    adminLoginCtrl.login = function() {
      Auth.$authWithPassword(adminLoginCtrl.user).then(function (auth) {
        $state.go('admin.dashboard');
      }, function(error) {
        AlertService.addError(error.message);
      });
    };

    adminLoginCtrl.createProfile = function() {
      adminLoginCtrl.profile = Profile.getProfile(adminLoginCtrl.tenant.uid);
      adminLoginCtrl.profile.$loaded().then(function() {
        adminLoginCtrl.profile.emailHash = md5.createHash(adminLoginCtrl.user.email);
        if (adminLoginCtrl.user.name === '') {
          adminLoginCtrl.profile.name = adminLoginCtrl.user.email;
          adminLoginCtrl.profile.type = 'user';
          adminLoginCtrl.profile.tid = tid;
        } else {
          adminLoginCtrl.profile.name = adminLoginCtrl.tenant.name;
          adminLoginCtrl.profile.tid = adminLoginCtrl.tid;
          adminLoginCtrl.profile.type = 'tenant';
        }
        adminLoginCtrl.profile.$save();
        adminLoginCtrl.login();
      });
    }, function(error) {
      AlertService.addError(error.message);
    };

    adminLoginCtrl.registerTenant = function() {
      var domainCode = adminLoginCtrl.user.email.replace(/.*@/, "");
      var n = domainCode.indexOf(".");
      domainCode = domainCode.substring(0, n);
        Auth.$createUser(adminLoginCtrl.user).then(function (user) {
          adminLoginCtrl.tenant.uid = user.uid;
          adminLoginCtrl.tenant.name = adminLoginCtrl.user.name;
          adminLoginCtrl.tenant.domain = adminLoginCtrl.user.email.replace(/.*@/, "");
          adminLoginCtrl.tenant.domain_code = domainCode;
          adminLoginCtrl.tenant.invoice_number = 1;
          adminLoginCtrl.tenant.alert_count = 0;
          Register.all.$add(adminLoginCtrl.tenant).then(function(ref) {
            adminLoginCtrl.tid = ref.key();
            adminLoginCtrl.createProfile();
          })
        });
      }, function(error) {
        AlertService.addError(error.message);
      };

}]);
