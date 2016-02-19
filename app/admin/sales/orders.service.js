app.factory('Orders', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'orders');
    var orders = $firebaseArray(ref.child(tid).orderByPriority());

    var order = {

      getOrder: function(oid) {
        return $firebaseObject(ref.child(tid).child(oid));
      },

      all: orders

    };

    return order;
  }
]);
