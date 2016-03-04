app.factory('Users', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (           $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'profiles');
    var users = $firebaseArray(ref);

    var user = {

      all: users

  };

  return user;

}]);
