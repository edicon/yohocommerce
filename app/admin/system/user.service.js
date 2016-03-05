app.factory('User', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (          $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'profiles');
    var users = $firebaseArray(ref);

    var user = {

      getUser: function(uid) {
        return $firebaseObject(ref.child(uid));
      },

      removeUser: function(uid) {
        return $firebaseObject(ref.child(uid)).$remove();
      },

      saveUser: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'profiles/'+theObj.uid);
        return theRef.update(theObj);
      },

      getIndex: function(cid) {
        return users.$indexFor(cid);
      },

      getKey: function(key) {
        return users.$keyAt(key);
      },

      getCount: function() {
        return users.length;
      },

      all: users

    };

    return user;

}]);
