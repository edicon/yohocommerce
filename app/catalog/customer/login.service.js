app.factory('Login', ['$firebaseAuth', 'FirebaseUrl',
  function (          $firebaseAuth,   FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl);
    var auth = $firebaseAuth(ref);

var login = {

    register: function(user) {
      return auth.$createUser(user.email, user.password);
    },

  };

  return login;

}]);
