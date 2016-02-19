app.controller('CatalogProductCtrl', ['$state', 'Product', '$scope', '$stateParams',
  function (                           $state,   Product,   $scope,   $stateParams) {
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

}]);
