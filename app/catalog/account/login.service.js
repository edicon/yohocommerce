app.factory('Login', ['$firebaseAuth', 'FirebaseUrl',
  function (          $firebaseAuth,   FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl);
    var login = $firebaseAuth(ref);

    return login;
  }
]);
