app.controller('BannerCtrl', ['Banner', '$state', '$scope', 'FileReader', '$stateParams',
  function (                   Banner,   $state,   $scope,   FileReader,   $stateParams) {
    var bannerCtrl = this;
    var imageEntity = [];
    bannerCtrl.bannerName = "Home Page Banner";
    bannerCtrl.bid = "1";
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
