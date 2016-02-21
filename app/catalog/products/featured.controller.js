app.controller('CatalogFeaturedCtrl', ['$state', 'Carts', 'Products', '$scope', '$stateParams', '$cookies',
  function (                            $state,   Carts,   Products,   $scope,   $stateParams,   $cookies) {
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
        var theOrderId = $cookies.get('orderId');
        if (theOrderId === undefined) {
          Carts.addOrder().then(function(theRef) {
            theProduct.orderId = theRef;
            theProduct.product_quantity = 1;
            $cookies.put("orderId", theRef);
            Carts.addProduct(theProduct);
          });
        } else {
          theProduct.orderId = theOrderId;
          Carts.nextProduct(theProduct);
        }
    //    Cart.totalCart(theProduct.cartId);
      });
    };

}]);
