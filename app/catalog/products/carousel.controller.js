app.controller('CarouselCtrl', ['Banner',
  function (                     Banner) {
    var carouselCtrl = this;

    carouselCtrl.myInterval = 7000;
    carouselCtrl.noWrapSlides = false;

    carouselCtrl.defaultSlides = [
      { image: "/images/carousel-default-image.png" },
      { image: "/images/carousel-default-image.png" },
      { image: "/images/carousel-default-image.png" }
    ]

    carouselCtrl.bannerImages = Banner.getImages("1");
      carouselCtrl.bannerImages.$loaded().then(function() {
        if (carouselCtrl.bannerImages.length === 0) {
          carouselCtrl.bannerArray = 'no';

        }
    });

}]);
