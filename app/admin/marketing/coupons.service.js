app.factory('Coupons', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'coupons');
    var coupons = $firebaseArray(ref.child(tid).orderByPriority());

    var coupon = {
// method that calls the reference in firebase, adds object to coupon array
      addCoupon: function(theObj) {
// setting up the node in firebase
      var theRef = new Firebase(FirebaseUrl+'coupons/'+tid);
//pushes the reference to firebase and returns it back to the controller
        return theRef.push( {coupon_name: theObj.couponName,
          coupon_discount: theObj.couponDiscount} );
      },

// method that calls the reference in firebase, removes object from coupon array
      removeCoupon: function(theObj) {
// setting up the node in firebase
      var theRef = new Firebase(FirebaseUrl+'coupons/'+tid+'/'+theObj.couponId);
//pushes the reference to firebase and returns it back to the controller
      return theRef.remove();
      },

      all: coupons,

    };
    return coupon;
  }
]);
