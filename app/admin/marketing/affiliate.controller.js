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
//corresoponding fields in the object, data will be saved in the node
    affiliateCtrl.affiliate.affiliate_full_name = affiliateCtrl.affiliate.affiliate_first_name + ' ' + affiliateCtrl.affiliate.affiliate_last_name;
//calling affiliate.service.js addAffiliate function
    Affiliate.addAffiliate(affiliateCtrl.affiliate)
    }, function(error) {
      affiliateCtrl.error = error;
    };

    affiliateCtrl.addTransaction = function() {
    Affiliate.addTransaction(affiliateCtrl.transaction);
    }, function(error) {
      affiliateCtrl.error = error;
    };

    affiliateCtrl.gridTransactions = {
      enableSorting: true,
      enableCellEditOnFocus: true,
//      data: Affiliate.all,
      columnDefs: [
        { name:'date', field: 'transaction_date', width: '10%', enableHiding: false },
        { name:'description', field: 'transaction_description', width: '70%', enableHiding: false },
        { name:'amount', field: 'transaction_amount', width: '20%', enableHiding: false, cellClass: 'grid-align-right' },

      ]
    };

  }
]);
