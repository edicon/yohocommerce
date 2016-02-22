app.controller('CatalogCtrl', ['Catalog', 'CartOrders', '$scope', '$state', '$cookies',
  function (                    Catalog,   CartOrders,   $scope,   $state,   $cookies) {
    var catalogCtrl = this;
    catalogCtrl.categories = Catalog.all;
    catalogCtrl.subPulldowns = Catalog.pulldown;
    catalogCtrl.subCategories = Catalog.allMenus;

    var theCartId = $cookies.get('cartId');
    if (theCartId === undefined) {
      Catalog.addCart().then(function(theRef) {
        $cookies.put("cartId", theRef);
      });
    }
    var cartId = $cookies.get('cartId');
    var cartTotals = Catalog.getCart(cartId)
      cartTotals.$loaded().then(function() {
        catalogCtrl.cartTotals = cartTotals;
        var oid = $cookies.get('orderId');
        var theOrder = CartOrders.getOrder(oid)
          theOrder.$loaded().then(function() {
            catalogCtrl.order = theOrder;
            console.log($scope)
        });
    });

    catalogCtrl.goCategory = function(cid) {
      $state.go('catalog.category', {'cid': cid});
    };

    catalogCtrl.goSubCategory = function(subCid) {
      $state.go('catalog.subcategory', {'subCid': subCid});
    };

    catalogCtrl.goProduct = function(pid) {
      console.log(pid)
      $state.go('catalog.product', {'pid': pid});
    };

}]);
