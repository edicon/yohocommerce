app.controller('CouponsCtrl', ['Coupons', '$state', '$scope', '$stateParams',
  function (                    Coupons,   $state,   $scope,   $stateParams) {
    var couponsCtrl = this;
    couponsCtrl.allCoupons = Coupons.all;
    couponsCtrl.coupon = {};
    couponsCtrl.coupon.coupon_type = 'Percent';

  couponsCtrl.addCoupon = function() {
    Coupons.addCoupon(couponsCtrl.coupon);
    couponsCtrl.coupon.coupon_name = null;
    couponsCtrl.coupon.coupon_discount = null;
    couponsCtrl.coupon.coupon_type = null;
  }, function(error) {
    couponsCtrl.error = error;
  };

  couponsCtrl.gridCoupons = {
    enableSorting: true,
    enableCellEditOnFocus: true,
    data: Coupons.all,
    columnDefs: [
      { name:'couponName', field: 'coupon_name', width: '30%', enableHiding: false },
      { name:'discountAmount', field: 'coupon_discount', width: '20%', enableHiding: false, cellClass: 'grid-align-right' },
      { name:'type', field: 'coupon_type', width: '10%', enableHiding: false, cellClass: 'grid-align-right' },
      { name:'couponCode', field: '$id', enableHiding: false, cellClass: 'grid-align-right' },
      { name: ' ', field: '$id', cellTemplate:'admin/marketing/gridTemplates/removeCoupon.html',
        width: 35, enableCellEdit: false, enableColumnMenu: false }
    ]
  };

  couponsCtrl.updateType = function(type) {
    couponsCtrl.coupon.coupon_type = type;
  }, function(error) {
    couponsCtrl.error = error;
  };

  couponsCtrl.removeCoupon = function(row) {
    var theCoupon = {};
    theCoupon.couponId = row.entity.$id;
    Coupons.removeCoupon(theCoupon);
  }, function(error) {
    couponsCtrl.error = error;
  };

}]);
