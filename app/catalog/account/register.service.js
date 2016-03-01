app.factory('Register', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (              $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'countries');
    var countries = $firebaseArray(ref);

    var register = {

      allCountries: countries

    };

  return register;

}]);
