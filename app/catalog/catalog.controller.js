app.controller('CatalogCtrl', ['Auth', 'Catalog', 'Banner', 'Categories', '$scope', '$state',
  function (                    Auth,   Catalog,   Banner,   Categories,   $scope,   $state) {
    var catalogCtrl = this;
    catalogCtrl.categories = Catalog.all;
    catalogCtrl.subPulldowns = Catalog.pulldown;
    catalogCtrl.subCategories = Catalog.allMenus;
//    catalogCtrl.cart = $cookieStore.get('cart');

    console.log($scope)

    catalogCtrl.myInterval = 7000;
    catalogCtrl.noWrapSlides = false;

    catalogCtrl.defaultSlides = [
      { image: "/images/carousel-default-image.png" },
      { image: "/images/carousel-default-image.png" },
      { image: "/images/carousel-default-image.png" }
    ]

    catalogCtrl.bannerImages = Banner.getImages("1");
      catalogCtrl.bannerImages.$loaded().then(function() {
        if (catalogCtrl.bannerImages.length === 0) {
          catalogCtrl.bannerArray = 'no';
          catalogCtrl.bannerImages = catalogCtrl.defaultSlides;
        }
    });


    catalogCtrl.goCategory = function(cid) {
      $state.go('catalog.category', {'cid': cid});
    };

    catalogCtrl.goSubCategory = function(subCid) {
      $state.go('catalog.subcategory', {'subCid': subCid});
    };

}]);
