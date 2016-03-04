app.controller('CouponsCtrl', ['Coupons', '$state', '$scope', '$stateParams',
  function (                    Coupons,   $state,   $scope,   $stateParams) {
    var couponsCtrl = this;
    couponsCtrl.allCoupons = Coupons.all;

  couponsCtrl.addCoupon = function() {
    Coupons.addCoupon(couponsCtrl.coupon);
    couponsCtrl.coupon.coupon_name = null;
    couponsCtrl.coupon.coupon_discount = null;
    couponsCtrl.coupon.coupon_type_id = null;
  }, function(error) {
    couponsCtrl.error = error;
  };

  couponsCtrl.gridCoupons = {
    enableSorting: true,
    enableCellEditOnFocus: true,
    data: Coupons.all,
    columnDefs: [
      { name:'couponName', field: 'coupon_name', width: '35%', enableHiding: false },
      { name:'couponCode', field: '$id', width: '35%', enableHiding: false },
      { name:'discount', field: 'coupon_discount', width: '15%', enableHiding: false, cellClass: 'grid-align-right' },
      { name:'type', field: 'coupon_type', width: '10%', enableHiding: false, cellClass: 'grid-align-right' },
      { name: ' ', field: '$id', cellTemplate:'admin/marketing/gridTemplates/removeCoupon.html',
        width: 50, enableCellEdit: false, enableColumnMenu: false }
    ]
  };

  couponsCtrl.removeCoupon = function(row) {
    var theCoupon = {};
    theCoupon.couponId = row.entity.$id;
    Coupons.removeCoupon(theCoupon);
  }, function(error) {
    couponsCtrl.error = error;
  };

}]);
