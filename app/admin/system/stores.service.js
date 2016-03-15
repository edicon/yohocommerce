app.factory('Stores', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'stores');
    var stores = $firebaseArray(ref.child(tid).orderByPriority());

    var store = {

      removeStore: function(sid) {
        return $firebaseObject(ref.child(tid).child(sid)).$remove();
      },

      all: stores

    };

    return store;

}]);
