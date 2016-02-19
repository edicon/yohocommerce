app.factory('Recurring', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'recurring');
    var recurrings = $firebaseArray(ref.child(tid).orderByPriority());

    var recurring = {

      getRecurring: function(rid) {
        return $firebaseObject(ref.child(tid).child(oid));
      },

      all: recurrings

    };

    return recurring;
  }
]);
