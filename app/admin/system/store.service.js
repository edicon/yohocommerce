app.factory('Store', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (           $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'stores');
    var stores = $firebaseArray(ref.child(tid).orderByPriority());

    var store = {

      getStore: function(sid) {
        return $firebaseObject(ref.child(tid).child(sid));
      },

      addStore: function(theObj) {
      return store.all.$add(theObj).then(function(postRef){
        return postRef.key();
        });
      },

      getIndex: function(sid) {
        return stores.$indexFor(sid);
      },

      getKey: function(key) {
        return stores.$keyAt(key);
      },

      getCount: function() {
        return stores.length;
      },

    all: stores
    };

    return store;

}]);
