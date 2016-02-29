app.controller('AccountCtrl', ['Account', 'Auth', 'Profile', 'AlertService', 'md5', 'tid', '$scope', '$state', '$http',
  function (                    Account,   Auth,   Profile,   AlertService,   md5,   tid,   $scope,   $state,   $http) {
    var accountCtrl = this;
    accountCtrl.user = {};
    $scope.address = {};

    $scope.refreshAddresses = function(address) {
      var params = {address: address, sensor: false};
      return $http.get(
        'http://maps.googleapis.com/maps/api/geocode/json',
        {params: params}
      ).then(function(response) {
        $scope.addresses = response.data.results
      });
    };

    accountCtrl.login = function() {
      Auth.$authWithPassword(accountCtrl.user).then(function (auth) {
        $state.go('catalog.account');
      }, function(error) {
        AlertService.addError(error.message);
      });
    };

    accountCtrl.createUser = function() {
      accountCtrl.user.email = accountCtrl.customer.customer_email;
      accountCtrl.user.password = accountCtrl.customer_password;
      Auth.$createUser(accountCtrl.user).then(function(uid) {
        accountCtrl.customer.uid = uid;
        accountCtrl.createProfile();
      }, function(error) {
        AlertService.addError(error.message);
      });
    };

    accountCtrl.createProfile = function() {
      var theProfile = Profile.getProfile(accountCtrl.customer.uid);
      theProfile.$loaded().then(function() {
        theProfile.emailHash = md5.createHash(authCtrl.user.email);
        theProfile.profile.name = accountCtrl.customer.first_name + ' ' + accountCtrl.customer.last_name;
        theProfile.profile.type = 'customer';
        theProfile.profile.tid = tid;
        theProfile.profile.$save();
        accountCtrl.login();
      });
    }, function(error) {
      AlertService.addError(error.message);
    };

    accountCtrl.registerCustomer = function() {
      accountCtrl.createUser();
    };

}]);
