app.controller('AffiliateCtrl', ['Affiliate', 'Transactions', 'Countries', '$state', '$scope', '$stateParams', '$http',
  function (                      Affiliate,   Transactions,   Countries,   $state,   $scope,   $stateParams,   $http) {
  var affiliateCtrl = this;
  $scope.countries = Countries.all;
  $scope.transactions = Transactions.all;
  $scope.address = {};

  affiliateCtrl.affiliate = {};

  console.log($scope);

  $scope.refreshAddress = function(address) {
    var params = {address: address, sensor: false};
    return $http.get(
      'http://maps.googleapis.com/maps/api/geocode/json',
      {params: params}
    ).then(function(response) {
      $scope.transactions = response.data.results
    });
  };

  affiliateCtrl.loadAffiliate = function(aid) {
    var theAffiliate = Affiliate.getAffiliate(aid);
      theAffiliate.$loaded().then(function() {
        affiliateCtrl.affiliate = theAffiliate;
        console.log($scope);
    });
    var theTransactions = Transactions.getTransactions(aid);
      theTransactions.$loaded().then(function() {
      affiliateCtrl.gridTransactions.data = theTransactions;
   });
  };

  if ($stateParams.rowEntity != undefined) {
    affiliateCtrl.loadAffiliate($stateParams.rowEntity.$id);
    affiliateCtrl.aid = $stateParams.rowEntity.$id;
  } else {
    affiliateCtrl.affiliate.affiliate_full_name = 'New Affiliate';
    affiliateCtrl.aid = null;
  };


//function called from affiliate.html
    affiliateCtrl.addAffiliate = function() {
//corresoponding fields in the object, data will be saved in the node
    affiliateCtrl.affiliate.affiliate_full_name = affiliateCtrl.affiliate.affiliate_first_name + ' ' + affiliateCtrl.affiliate.affiliate_last_name;
//calling affiliate.service.js addAffiliate function
    Affiliate.addAffiliate(affiliateCtrl.affiliate).then(function(aid) {
      affiliateCtrl.loadAffiliate(aid)
    });
    }, function(error) {
      affiliateCtrl.error = error;
    };

    affiliateCtrl.addTransaction = function() {
      affiliateCtrl.transaction.aid = affiliateCtrl.aid;
      Transactions.addTransaction(affiliateCtrl.transaction);
    }, function(error) {
      affiliateCtrl.error = error;
    };

    affiliateCtrl.gridTransactions = {
      enableSorting: true,
      enableCellEditOnFocus: true,
      columnDefs: [
        { name:'dateAdded', field: 'transaction_date_added', type: 'date', enableHiding: false, cellClass: 'grid-align-right', enableCellEdit: false, cellFilter: 'date' },
    //    { name:'date', field: 'transaction_date_added', type: 'date', width: '10%', enableHiding: false },
        { name:'description', field: 'transaction_description', width: '70%', enableHiding: false },
        { name:'amount', field: 'transaction_amount', width: '20%', enableHiding: false, cellClass: 'grid-align-right' },

      ]
    };
console.log($scope);
  }
]);
