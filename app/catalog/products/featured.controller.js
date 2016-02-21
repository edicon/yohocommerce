app.controller('CatalogFeaturedCtrl', ['$state', 'CartOrders', 'Products', '$scope', '$stateParams', '$cookies',
  function (                            $state,   CartOrders,   Products,   $scope,   $stateParams,   $cookies) {
    var catalogFeaturedCtrl = this;
    catalogFeaturedCtrl.featuredProducts = Products.allFeatured;

    catalogFeaturedCtrl.goProduct = function(pid) {
      $state.go('catalog.product', {'pid': pid});
    };

    catalogFeaturedCtrl.addOrder = function(pid) {
      var theProduct = Products.getProduct(pid);
      theProduct.$loaded().then(function() {
        if (theProduct.product_special_price === undefined)
          theProduct.special_price = null;
        theProduct.cart_id = $cookies.get('cartId');
        var theOrderId = $cookies.get('orderId');
        if (theOrderId === undefined) {
          CartOrders.addOrder().then(function(theRef) {
            theProduct.orderId = theRef;
            theProduct.product_quantity = 1;
            $cookies.put("orderId", theRef);
            CartOrders.addProduct(theProduct);
          });
        } else {
          theProduct.orderId = theOrderId;
          CartOrders.nextProduct(theProduct);
        }
      });
    };

}]);
