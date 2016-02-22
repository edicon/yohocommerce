app.controller('CatalogCtrl', ['Catalog', 'CartOrders', '$scope', '$state', '$cookies',
  function (                    Catalog,   CartOrders,   $scope,   $state,   $cookies) {
    var catalogCtrl = this;
    catalogCtrl.categories = Catalog.all;
    catalogCtrl.subPulldowns = Catalog.pulldown;
    catalogCtrl.subCategories = Catalog.allMenus;

    catalogCtrl.getTotals = function() {
      var cartTotals = Catalog.getCart($cookies.get('cartId'));
        cartTotals.$loaded().then(function() {
          catalogCtrl.cartTotals = cartTotals;
      });
    };

    if ($cookies.get('cartId') === undefined) {
      Catalog.addCart().then(function(theRef) {
        $cookies.put("cartId", theRef);
        catalogCtrl.getTotals();
      });
    } else {
      catalogCtrl.getTotals();
    }

    catalogCtrl.getOrder = function() {
      var theOrder = CartOrders.getOrder($cookies.get('orderId'))
      theOrder.$loaded().then(function() {
        catalogCtrl.order = theOrder;
        console.log($scope)
      });
    };

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
