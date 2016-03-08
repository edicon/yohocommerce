app.controller('AccountAddressCtrl', ['Account',  'Countries', 'AlertService', 'Customer', 'tid', '$scope', 'profile',
  function (                           Account,    Countries,   AlertService,   Customer,   tid,   $scope,  profile) {
    var accountAddressCtrl = this;
    $scope.country = {};
    $scope.country.selected = {};
    accountAddressCtrl.profile = profile;
    $scope.countries = Countries.all;

    var theCustomer = Customer.getCustomer(accountAddressCtrl.profile.cid);
      theCustomer.$loaded().then(function() {
        accountAddressCtrl.customer = theCustomer;
        $scope.country.selected = accountAddressCtrl.customer.customer_country;
        console.log($scope)
    });

}]);
