app.factory('Returns', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'returns');
    var returns = $firebaseArray(ref.child(tid).orderByPriority());

    var returned = {

      getReturn: function(oid) {
        return $firebaseObject(ref.child(tid).child(oid));
      },

      all: returns

    };

    return returned;
  }
]);
