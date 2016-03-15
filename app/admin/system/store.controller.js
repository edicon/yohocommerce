app.controller('StoreCtrl', ['Store', 'Stores', 'Transactions', 'Countries', 'AlertService', '$state', '$scope', '$stateParams', '$http',
  function (                      Store,   Stores,   Transactions,   Countries,   AlertService,   $state,   $scope,   $stateParams,   $http) {
  var storeCtrl = this;
  storeCtrl.store = {};
  $scope.countries = Countries.all;
  $scope.transactions = Transactions.all;
  $scope.address = {};

  storeCtrl.refreshAddresses = function(address) {
    var params = {address: address, sensor: false};
    return $http.get(
      'http://maps.googleapis.com/maps/api/geocode/json',
      {params: params}
    ).then(function(response) {
      $scope.addresses = response.data.results
    });
  };

  storeCtrl.parseAddress = function(address) {
    var addressArray = address.split(", ");
    var regionArray = addressArray[2].split(" ");
    storeCtrl.store.store_address_street = addressArray[0];
    storeCtrl.store.store_address_city = addressArray[1];
    storeCtrl.store.store_address_postal_code = regionArray[1] + " " + regionArray[2];
    storeCtrl.store.store_address_region = regionArray[0];
    storeCtrl.store.store_address_country = addressArray[3];

    if (regionArray[2] == undefined) {
      storeCtrl.store.store_address_postal_code = regionArray[1];
    };

    if (regionArray[1] == undefined && regionArray[2] == undefined) {
      storeCtrl.store.store_address_postal_code = "n/a";
    };

  };

  storeCtrl.loadStore = function(sid) {
    var theStore = Store.getStore(sid);
      theStore.$loaded().then(function() {
        storeCtrl.store.store_full_name = storeCtrl.store.store_first_name + ' ' + storeCtrl.store.store_last_name;
        storeCtrl.store = theStore;
        storeCtrl.storeIndex = Store.getIndex(sid);
        storeCtrl.count = Stores.all.length;
    });
  };

  if ($stateParams.rowEntity != undefined) {
    storeCtrl.loadStore($stateParams.rowEntity.$id);
    storeCtrl.sid = $stateParams.rowEntity.$id;
  } else {
    storeCtrl.sid = null;
  };

  storeCtrl.addStore = function() {
      Store.addStore(storeCtrl.store).then(function(sid) {
        storeCtrl.loadStore(sid)
      });
    }, function(error) {
      AlertService.addError(error.message);
    };

    storeCtrl.next = function() {
      if (storeCtrl.count > 0) {
        key = storeCtrl.storeIndex;
        if (key < storeCtrl.count - 1) {
          key = storeCtrl.storeIndex + 1;
          var sid = Store.getKey(key);
          storeCtrl.loadStore(sid);
        }
      }
    }, function(error) {
      storeCtrl.error = error;
    };

    storeCtrl.back = function() {
      var key = storeCtrl.storeIndex - 1;
      if (key < 0) key = 0
      var sid = Store.getKey(key);
      storeCtrl.loadStore(sid);
    }, function(error) {
      storeCtrl.error = error;
    };

    storeCtrl.first = function() {
      var key = 0;
      var sid = Store.getKey(key);
      storeCtrl.loadStore(sid);
    }, function(error) {
      storeCtrl.error = error;
    };

    storeCtrl.last = function() {
      var key = storeCtrl.count - 1;
      var sid = Store.getKey(key);
      storeCtrl.loadStore(sid);
    }, function(error) {
      storeCtrl.error = error;
    };

}]);
