app.controller('CatalogCategoryCtrl', ['$state', 'Products', 'Categories', '$scope', '$stateParams',
  function (                            $state,   Products,   Categories,   $scope,   $stateParams) {
    var catalogCategoryCtrl = this;
    var cid = $stateParams.cid

    if (cid === null) {
      $state.go('catalog.home');
    } else {
      var category = Categories.getCategory(cid);
        category.$loaded().then(function() {
          catalogCategoryCtrl.category = category;
          var products = Products.getProductCategory(cid);
            products.$loaded().then(function() {
              catalogCategoryCtrl.products = products;
          });
      });
    }

    catalogCategoryCtrl.goProduct = function(pid) {
      $state.go('catalog.product', {'pid': pid});
    };

}]);
