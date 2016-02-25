app.controller('RegisterCtrl', ['Register', 'Login', 'tid', '$scope', '$state', '$http',
  function (                     Register,   Login,   tid,   $scope,   $state,   $http) {
    var registerCtrl = this;
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

    registerCtrl.register = function() {
      var app = {};
      return Login.createUser(registerCtrl.user).then(function(user) {
        return Auth.login($scope.user).then(function() {
          user.username = $scope.user.username;
          user.profileType = 'customer';
          return Auth.createProfile(user).then(function() {
            app.email = user.email;
            app.tenantId = Auth.user.profile.tenantId;
            app.creator = Auth.user.profile.username;
            app.ownerId = Auth.user.uid;
            return Customer.createCustomer(app).then(function(customerId) {
              app.customerId = customerId;
              app.name = $scope.user.appname;
              return Auth.updateProfile(app).then(function() {
                return Account.createApp(app).then(function(appId) {
                  app.appId = appId;
                    return Project.createProject(app);
                });
              });
            });
          });
        }).then (function() {
          $location.path('/account/');
        });
      }, function (error) {
        $scope.error = error.toString();
      });
    };

}]);
