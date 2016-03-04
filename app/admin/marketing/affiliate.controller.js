app.controller('AffiliateCtrl', ['Affiliate', 'Affiliates', 'Transactions', 'Countries', 'AlertService', '$state', '$scope', '$stateParams', '$http',
  function (                      Affiliate,   Affiliates,   Transactions,   Countries,   AlertService,   $state,   $scope,   $stateParams,   $http) {
  var affiliateCtrl = this;
  $scope.countries = Countries.all;
  $scope.transactions = Transactions.all;
  $scope.address = {};

  affiliateCtrl.affiliate = {};

  affiliateCtrl.refreshAddresses = function(address) {
    var params = {address: address, sensor: false};
    return $http.get(
      'http://maps.googleapis.com/maps/api/geocode/json',
      {params: params}
    ).then(function(response) {
      $scope.addresses = response.data.results
    });
  };

  affiliateCtrl.parseAddress = function(address) {
    var addressArray = address.split(", ");
    var regionArray = addressArray[2].split(" ");
    affiliateCtrl.affiliate.affiliate_address_street = addressArray[0];
    affiliateCtrl.affiliate.affiliate_address_city = addressArray[1];
    affiliateCtrl.affiliate.affiliate_address_postal_code = regionArray[1] + " " + regionArray[2];
    affiliateCtrl.affiliate.affiliate_address_region = regionArray[0];
    affiliateCtrl.affiliate.affiliate_address_country = addressArray[3];

    if (regionArray[2] == undefined) {
      affiliateCtrl.affiliate.affiliate_address_postal_code = regionArray[1];
    };

    if (regionArray[1] == undefined && regionArray[2] == undefined) {
      affiliateCtrl.affiliate.affiliate_address_postal_code = "n/a";
    };
  };

  affiliateCtrl.loadAffiliate = function(aid) {
    var theAffiliate = Affiliate.getAffiliate(aid);
      theAffiliate.$loaded().then(function() {
        affiliateCtrl.affiliate.affiliate_full_name = affiliateCtrl.affiliate.affiliate_first_name + ' ' + affiliateCtrl.affiliate.affiliate_last_name;
        affiliateCtrl.affiliate = theAffiliate;
        affiliateCtrl.affiliateIndex = Affiliate.getIndex(aid);
        affiliateCtrl.count = Affiliates.all.length;
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
//    affiliateCtrl.affiliate.affiliate_full_name = 'New Affiliate';
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
      AlertService.addError(error.message);
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
        { name:'description', field: 'transaction_description', width: '70%', enableHiding: false },
        { name:'amount', field: 'transaction_amount', width: '20%', enableHiding: false, cellClass: 'grid-align-right' },

      ]
    };

    affiliateCtrl.next = function() {
      if (affiliateCtrl.count > 0) {
        key = affiliateCtrl.affiliateIndex;
        if (key < affiliateCtrl.count - 1) {
          key = affiliateCtrl.affiliateIndex + 1;
          var aid = Affiliate.getKey(key);
          affiliateCtrl.loadAffiliate(aid);
        }
      }
    }, function(error) {
      affiliateCtrl.error = error;
    };

    affiliateCtrl.back = function() {
      var key = affiliateCtrl.affiliateIndex - 1;
      if (key < 0) key = 0
      var aid = Affiliate.getKey(key);
      affiliateCtrl.loadAffiliate(aid);
    }, function(error) {
      affiliateCtrl.error = error;
    };

    affiliateCtrl.first = function() {
      var key = 0;
      var aid = Affiliate.getKey(key);
      affiliateCtrl.loadAffiliate(aid);
    }, function(error) {
      affiliateCtrl.error = error;
    };

    affiliateCtrl.last = function() {
      var key = affiliateCtrl.count - 1;
      var aid = Affiliate.getKey(key);
      affiliateCtrl.loadAffiliate(aid);
    }, function(error) {
      affiliateCtrl.error = error;
    };



  }
]);
