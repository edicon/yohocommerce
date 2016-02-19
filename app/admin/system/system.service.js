app.factory('Stores', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var refStores = new Firebase(FirebaseUrl+'stores'+'tid');
    var stores = $firebaseArray(refStores);

    var system = {

      getStore: function(tid) {
        return $firebaseObject(ref.child(tid));
      },

      all: stores

    };

    return system;
  }
]);
