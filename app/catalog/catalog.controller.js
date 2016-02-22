app.controller('CatalogCtrl', ['Catalog', 'CartOrders', '$scope', '$state', '$cookies',
  function (                    Catalog,   CartOrders,   $scope,   $state,   $cookies) {
    var catalogCtrl = this;
    catalogCtrl.categories = Catalog.all;
    catalogCtrl.subPulldowns = Catalog.pulldown;
    catalogCtrl.subCategories = Catalog.allMenus;

    catalogCtrl.getCartTotals = function(theCartId) {
      var cartTotals = Catalog.getCart(theCartId);
      cartTotals.$loaded().then(function() {
        catalogCtrl.cartTotals = cartTotals;
        var theOrderId = $cookies.get('orderId');
        if (theOrderId !== undefined) {
          var theOrder = CartOrders.getOrder(theOrderId)
          theOrder.$loaded().then(function() {
            catalogCtrl.order = theOrder;
          });
        }
      });
    };

    var theCartId = $cookies.get('cartId');
    if (theCartId === undefined) {
      Catalog.addCart().then(function(theRef) {
        $cookies.put("cartId", theRef);
        theCartId = $cookies.get('cartId');
        catalogCtrl.getCartTotals(theCartId);
      });
    } else {
      catalogCtrl.getCartTotals(theCartId);
    }

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
