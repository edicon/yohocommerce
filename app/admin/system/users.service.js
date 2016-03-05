app.factory('Users', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (           $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'profiles');
    var users = $firebaseArray(ref);

    var user = {

      getProfile: function(uid) {
        console.log(uid)
        return $firebaseObject(ref.child(uid));
      },

      all: users

  };

  return user;

}]);
