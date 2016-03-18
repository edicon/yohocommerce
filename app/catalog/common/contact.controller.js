app.controller('ContactCtrl', ['$scope', 'Catalog', 'Store',
  function (                    $scope,   Catalog,   Store) {
  var contactCtrl = this;
  console.log($scope)

  var tenant = Catalog.getTenant();
    tenant.$loaded().then(function() {
      contactCtrl.store = Store.getStore(tenant.default_store_id)
  });

}]);
