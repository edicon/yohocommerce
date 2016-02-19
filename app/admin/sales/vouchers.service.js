app.factory('Vouchers', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'vouchers');
    var vouchers = $firebaseArray(ref.child(tid).orderByPriority());

    var voucher = {

      getVoucher: function(vid) {
        return $firebaseObject(ref.child(tid).child(vid));
      },

      all: orders

    };

    return voucher;
  }
]);
