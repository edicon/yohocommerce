app.factory('Countries', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (               $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'countries');
    var countries = $firebaseArray(ref);

    var country = {

      allCountries: countries

    };

  return country;

}]);
