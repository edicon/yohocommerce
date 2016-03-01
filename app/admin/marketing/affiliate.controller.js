app.controller('AffiliateCtrl', ['Affiliate', 'Affiliates', 'Countries', '$state', '$scope', '$http',
  function (                      Affiliate,   Affiliates,   Countries,   $state,   $scope,   $http) {
  var affiliateCtrl = this;
  $scope.countries = Countries.all;
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

  console.log(affiliateCtrl.currentState)
  console.log($scope)

//function called from affiliate.html
  affiliateCtrl.addAffiliate = function() {
//console test to check if it's working
  console.log(affiliateCtrl.affiliate)
//calling the object theAffiliate with corresponding field

//corresoponding fields in theAffiliate object, data will be saved in the node
    affiliateCtrl.affiliate.affiliate_full_name = affiliateCtrl.affiliate.affiliate_first_name + ' ' + affiliateCtrl.affiliate.affiliate_last_name;
//    theAffiliate.affiliateEmail = affiliateCtrl.affiliate_email;
    console.log('theAffiliate')
//calling affiliate.service.js addAffiliate function
    Affiliate.addAffiliate(affiliateCtrl.affiliate);
    }, function(error) {
      affiliateCtrl.error = error;
    };




  }
]);
