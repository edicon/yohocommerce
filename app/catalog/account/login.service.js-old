app.factory('AccountLogin', ['$firebaseAuth', 'FirebaseUrl',
  function (                  $firebaseAuth,   FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl);
    var auth = $firebaseAuth(ref);

var login = {

    createUser: function(user) {
      return auth.$createUser({ email: user.email, password: user.password });
    },

    login: function(user) {
      return auth.$login('password', user);
    },

    logout: function() {
      auth.$logout();
    },

  };

  return login;

}]);
