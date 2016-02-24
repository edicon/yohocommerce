app.controller('CouponsCtrl', ['Coupons', '$state', '$scope', '$stateParams',
  function (                    Coupons,   $state,   $scope,   $stateParams) {
    var couponsCtrl = this;
    couponsCtrl.allCoupons = Coupons.all;

//called from coupons.html
    couponsCtrl.addCoupon = function() {
//console test to check if it's working
    console.log('gothere')
//calling the object theCoupon with corresponding fields    
    var theCoupon = {};
    theCoupon.couponName = couponsCtrl.coupon_name;
    theCoupon.couponDiscount = couponsCtrl.coupon_discount;
//calling coupons.service.js addCoupon function
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
        { name:'couponName', field: 'coupon_name', width: '60%', enableHiding: false },
        { name:'discount', field: 'coupon_discount', width: '35%', enableHiding: false },
        { name: ' ', field: '$id', cellTemplate:'admin/marketing/gridTemplates/removeCoupon.html',
          width: 50, enableCellEdit: false, enableColumnMenu: false }
      ]
    };
//called from removeCoupon.html
    couponsCtrl.removeCoupon = function(row) {
      var theCoupon = {};
      theCoupon.couponId = row.entity.$id;
//calling coupons.service.js removeCoupon function to delete from firebase
      Coupons.removeCoupon(theCoupon);
    }, function(error) {
      productCtrl.error = error;
    };

}]);
