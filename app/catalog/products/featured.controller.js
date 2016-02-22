app.controller('CatalogFeaturedCtrl', ['$state', 'Catalog', 'CartOrders', 'Products', '$scope', '$stateParams', '$cookies',
  function (                            $state,   Catalog,   CartOrders,   Products,   $scope,   $stateParams,   $cookies) {
    var catalogFeaturedCtrl = this;
    catalogFeaturedCtrl.featuredProducts = Products.allFeatured;

    catalogFeaturedCtrl.goProduct = function(pid) {
      $state.go('catalog.product', {'pid': pid});
    };

    catalogFeaturedCtrl.addOrder = function(pid) {
      var theProduct = Products.getProduct(pid);
      theProduct.$loaded().then(function() {
        if (theProduct.special_price === undefined)
          theProduct.special_price = null;
        var cid = $cookies.get('cartId');
        var oid = $cookies.get('orderId');
        if (oid === undefined) {
          CartOrders.addOrder().then(function(theRef) {
            theProduct.oid = theRef;
            theProduct.product_quantity = 1;
            $cookies.put("orderId", theRef);
            CartOrders.addProduct(theProduct);
          });
        } else {
          theProduct.oid = oid;
          CartOrders.nextProduct(theProduct);
        }
        var theCart = Catalog.getCart(cid);
        theCart.$loaded().then(function() {
          theCart.items = theCart.items + 1;
          if (theProduct.special_price != null)
            theCart.total = theCart.total + theProduct.special_price;
          else
            theCart.total = theCart.total + theProduct.product_price;
          theCart.cid = cid;
          CartOrders.updateCart(theCart);
        });
      });
    };

}]);
