app.controller('RegisterCtrl', ['Account', 'Auth', 'Profile', 'AlertService', 'Customer', 'md5', 'tid', '$scope', '$state',
  function (                     Account,   Auth,   Profile,   AlertService,   Customer,   md5,   tid,   $scope,   $state) {
    var registerCtrl = this;
    registerCtrl.user = {};
    $scope.countries = Account.allCountries;
//    $scope.profile = profile;

    registerCtrl.login = function() {
      Auth.$authWithPassword(registerCtrl.user).then(function (auth) {
        $state.go('admin.account');
      }, function(error) {
        AlertService.addError(error.message);
      });
    };

    registerCtrl.addCustomer = function() {
      registerCtrl.customer.customer_status_id = 1;
      registerCtrl.customer.customer_status = "1";
      registerCtrl.customer.customer_address_count = 0;
      Customer.addCustomer(registerCtrl.customer);
    }, function(error) {
      AlertService.addError(error.message);
    };

    registerCtrl.addProfile = function() {
      registerCtrl.customer.customer_full_name = registerCtrl.customer.customer_first_name + ' ' + registerCtrl.customer.customer_last_name;
      registerCtrl.profile = Profile.getProfile(registerCtrl.uid);
      registerCtrl.profile.$loaded().then(function() {
        registerCtrl.profile.emailHash = md5.createHash(registerCtrl.customer.customer_email);
        registerCtrl.profile.name = registerCtrl.customer.customer_full_name;
        registerCtrl.profile.type = 'customer';
        registerCtrl.profile.tid = tid;
        registerCtrl.profile.$save();
      });
    }, function(error) {
      AlertService.addError(error.message);
    };

    registerCtrl.createUser = function() {
      registerCtrl.user.email = registerCtrl.customer.customer_email;
      registerCtrl.user.password = registerCtrl.customer_password;
      Auth.$createUser(registerCtrl.user).then(function(user) {
        registerCtrl.uid = user.uid;
        registerCtrl.addProfile();
        registerCtrl.addCustomer();
        registerCtrl.login();
      }, function(error) {
        AlertService.addError(error.message);
      });
    };

    registerCtrl.registerCustomer = function() {
      registerCtrl.createUser();
    };

}]);
