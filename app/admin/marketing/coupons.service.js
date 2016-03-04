app.factory('Coupons', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'coupons');
    var coupons = $firebaseArray(ref.child(tid).orderByPriority());

    var coupon = {

      addCoupon: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'coupons/'+tid);
        return theRef.push(theObj);
      },

      removeCoupon: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'coupons/'+tid+'/'+theObj.couponId);
        return theRef.remove();
      },

      all: coupons,

    };
    
    return coupon;

}]);
