/*
note: refresh produces this error: TypeError: Cannot read property 'Banner_name' of null
due to deriving the Banner entity through the "state.go call" from catagories controller (lines 40 & 42 )
*/
app.controller('BannerCtrl', ['Banner', '$state', '$scope', 'FileReader', '$stateParams',
  function (                   Banner,   $state,   $scope,   FileReader,   $stateParams) {
    var bannerCtrl = this;
    var imageEntity = [];
    bannerCtrl.bannerName = $stateParams.rowEntity.banner_name;
    bannerCtrl.bid = $stateParams.rowEntity.$id;
    bannerCtrl.currentState = $state.current.name;
    bannerCtrl.myInterval = 5000;
    bannerCtrl.noWrapSlides = false;
    bannerCtrl.bannerArray = 'yes';

    bannerCtrl.defaultSlides = [ {
      image: "/images/carousel-default-image.png",
    },
    {
      image: "/images/carousel-default-image.png",
    },
    {
      image: "/images/carousel-default-image.png",
    }]

    bannerCtrl.bannerImages = Banner.getImages(bannerCtrl.bid);
      bannerCtrl.bannerImages.$loaded().then(function() {
        if (bannerCtrl.bannerImages.length === 0) {
          bannerCtrl.bannerArray = 'no';
          bannerCtrl.bannerImages = bannerCtrl.defaultSlides;
        }
    });

    bannerCtrl.removeImage = function($id) {
      imageEntity.$id = $id;
      imageEntity.bid = bannerCtrl.bid;
      Banner.removeImage(imageEntity);
      $state.reload(bannerCtrl.currentState);
    }, function(error) {
      bannerCtrl.error = error;
    };

    $scope.getFile = function () {
      console.log($scope.file)
      FileReader.readAsDataURL($scope.file, $scope).then(function(result) {
        imageEntity.imageSrc = result;
        imageEntity.bid = bannerCtrl.bid;
        Banner.addImage(imageEntity).then(function() {
          $state.reload(bannerCtrl.currentState);
//          bannerCtrl.bannerArray = 'yes';
        });
      });
    };

}]);
