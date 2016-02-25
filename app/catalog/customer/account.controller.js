app.controller('AccountCtrl', ['Account', 'AccountLogin', 'AccountProfile', 'md5', 'tid', '$scope', '$state', '$http',
  function (                    Account,   AccountLogin,   AccountProfile,   md5,   tid,   $scope,   $state,   $http) {
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
      AccountLogin.$authWithPassword(accountCtrl.user).then(function (auth) {
        $state.go('catalog.account');
      }, function(error) {
        authCtrl.error = error;
      });
    };

    accountCtrl.createProfile = function() {
      var theProfile = CustomerProfile.getProfile(accountCtrl.customer.uid);
      theProfile.$loaded().then(function() {
        theProfile.emailHash = md5.createHash(authCtrl.user.email);
        theProfile.profile.name = accountCtrl.customer.first_name + ' ' + accountCtrl.customer.last_name;
        theProfile.profile.type = 'customer';
        theProfile.profile.tid = tid;
        theProfile.profile.$save();
        accountCtrl.login();
      });
    }, function(error) {
      accountCtrl.error = error;
    };

    accountCtrl.registerCustomer = function() {
      accountCtrl.user.email = accountCtrl.customer.customer_email;
      accountCtrl.user.password = accountCtrl.customer_password;
      return Login.createUser(accountCtrl.user).then(function(uid) {
        accountCtrl.customer.uid = uid;
        Account.all.$add(accountCtrl.customer).then(function(ref) {
          accountCtrl.createProfile();
        })
      });
    }, function(error) {
      accountCtrl.error = error;
    };

}]);
