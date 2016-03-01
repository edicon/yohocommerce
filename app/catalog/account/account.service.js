app.factory('Account', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'countries');
    var countries = $firebaseArray(ref);

    var account = {

      allCountries: countries

    };

  return account;

}]);
