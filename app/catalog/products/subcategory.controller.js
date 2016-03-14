app.controller('CatalogSubCategoryCtrl', ['$state', 'Catalog', 'CartOrders', 'Products', 'SubCategories', 'Categories', '$scope', '$stateParams', '$cookies',
  function (                               $state,   Catalog,   CartOrders,   Products,   SubCategories,   Categories,   $scope,   $stateParams,   $cookies) {
    var catalogSubCategoryCtrl = this;
    var subCid = $stateParams.subCid;

    catalogSubCategoryCtrl.goCategory = function(cid) {
      $state.go('catalog.category', {'cid': cid});
    };

    catalogSubCategoryCtrl.goProduct = function(pid) {
      $state.go('catalog.product', {'pid': pid});
    };

    if (subCid === null) {
      $state.go('catalog.home');
    } else {
      var subCategory = SubCategories.getSubCategory(subCid);
        subCategory.$loaded().then(function() {
          catalogSubCategoryCtrl.subCategory = subCategory;
          var category = Categories.getCategory(catalogSubCategoryCtrl.subCategory.category_id);
            category.$loaded().then(function() {
              catalogSubCategoryCtrl.category = category;
              var products = Products.getProductSubCategory(subCid);
                products.$loaded().then(function() {
                  catalogSubCategoryCtrl.products = products;
                });
            });
        });
    }

    catalogSubCategoryCtrl.addOrder = function(pid) {
      var theProduct = Products.getProduct(pid);
      theProduct.$loaded().then(function() {
        if (theProduct.special_price === undefined)
          theProduct.special_price = null;
        if ($cookies.get('orderId') === undefined) {
          CartOrders.addOrder().then(function(theRef) {
            theProduct.oid = theRef;
            theProduct.product_quantity = 1;
            $cookies.put("orderId", theRef);
            CartOrders.addProduct(theProduct);
          });
        } else {
          theProduct.oid = $cookies.get('orderId');
          CartOrders.nextProduct(theProduct);
        }
        var theCart = Catalog.getCart($cookies.get('cartId'));
        theCart.$loaded().then(function() {
          theCart.items = theCart.items + 1;
          if (theProduct.special_price != null)
            theCart.total = theCart.total + theProduct.special_price;
          else
            theCart.total = theCart.total + theProduct.product_price;
          theCart.cid = $cookies.get('cartId');
          CartOrders.updateCart(theCart);
        });
      });
    };


}]);
