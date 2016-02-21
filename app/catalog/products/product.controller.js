app.controller('CatalogProductCtrl', ['$state', 'Product', 'Products', 'Orders', '$scope', '$stateParams', '$cookies',
  function (                           $state,   Product,   Products,   Orders,   $scope,   $stateParams,   $cookies) {
    var catalogProductCtrl = this;

    var pid = $stateParams.pid

    if (pid === null) {
      $state.go('catalog.home');
    } else {
      var product = Product.getProduct(pid);
        product.$loaded().then(function() {
          catalogProductCtrl.product = product;
      });
      var thumbnails = Product.getProductThumbnails(pid);
        thumbnails.$loaded().then(function() {
          catalogProductCtrl.thumbnails = thumbnails;
      });
    }

    catalogProductCtrl.goCategory = function(cid) {
      $state.go('catalog.category', {'cid': cid});
    };

    catalogProductCtrl.addOrder = function(pid) {
      console.log(pid)
      var theProduct = Products.getProduct(pid);
      theProduct.$loaded().then(function() {
        if (theProduct.product_special_price === undefined)
          theProduct.special_price = null;
        var theOrderId = $cookies.get('orderId');
        if (theOrderId === undefined) {
          Orders.addOrder().then(function(theRef) {
            theProduct.orderId = theRef;
            theProduct.product_quantity = 1;
            $cookies.put("orderId", theRef);
            Orders.addProduct(theProduct);
          });
        } else {
          theProduct.orderId = theOrderId;
          Orders.nextProduct(theProduct);
        }
    //    Cart.totalCart(theProduct.cartId);
      });
    };

}]);
