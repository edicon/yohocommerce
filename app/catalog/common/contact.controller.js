app.controller('ContactCtrl', ['$scope', 'Catalog', 'Store',
  function (                    $scope,   Catalog,   Store) {
  var contactCtrl = this;
  console.log($scope)

  var tenant = Catalog.getTenant();
    tenant.$loaded().then(function() {
      contactCtrl.store = Store.getStore(tenant.default_store_id)
  });



/*
  var ref = new Firebase("https://ecomengine.firebaseio.com/stores/");

   contactCtrl.store = $firebaseObject(ref.child('-K4zdSDMnu3vSyL069A1').child('-KCvkHlN5w6PS9QTgR4R'));

console.log($scope);
*/


}
]);
