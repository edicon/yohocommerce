app.controller('CouponsCtrl', ['Coupons', '$state', '$scope', '$stateParams',
  function (                    Coupons,   $state,   $scope,   $stateParams) {
    var couponsCtrl = this;
    couponsCtrl.allCoupons = Coupons.all;

//called from coupons.html
    couponsCtrl.addCoupon = function() {
//console test to check if it's working
    console.log('gothere')
    var theCoupon = {};
    theCoupon.couponName = couponsCtrl.coupon_name;
    theCoupon.couponDiscount = couponsCtrl.coupon_discount;
//calling coupons service addCoupon
    Coupons.addCoupon(theCoupon);
  }, function(error) {
    couponsCtrl.error = error;
  };

//Coupons Grid Options
    couponsCtrl.gridCoupons = {
      enableSorting: true,
      enableCellEditOnFocus: true,
      data: Coupons.all,
      columnDefs: [
        { name:'coupon', field: 'coupon_name', width: '60%', enableHiding: false },
        { name:'discount', field: 'coupon_discount', width: '35%', enableHiding: false },
        { name: ' ', field: '$id', cellTemplate:'admin/marketing/gridTemplates/removeCoupon.html',
          width: 50, enableCellEdit: false, enableColumnMenu: false }
      ]
    };
//called from removeCoupon.html
    couponsCtrl.removeCoupon = function(row) {
//console test to check if it's working
    console.log('gothere')
      var theCoupon = {};
      theCoupon.couponName = couponsCtrl.coupon_name;
      theCoupon.couponDiscount = couponsCtrl.coupon_discount;
      Coupons.removeCoupon(theCoupon);
    }, function(error) {
      productCtrl.error = error;
    };

}]);
