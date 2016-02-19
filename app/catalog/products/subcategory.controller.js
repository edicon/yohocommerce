app.controller('CatalogSubCategoryCtrl', ['$state', 'Products', 'SubCategories', 'Categories', '$scope', '$stateParams',
  function (                                $state,   Products,   SubCategories,   Categories,   $scope,   $stateParams) {
    var catalogSubCategoryCtrl = this;
    var subCid = $stateParams.subCid;

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

    catalogSubCategoryCtrl.goCategory = function(cid) {
      $state.go('catalog.category', {'cid': cid});
    };

    catalogSubCategoryCtrl.goProduct = function(pid) {
      $state.go('catalog.product', {'pid': pid});
    };

}]);
