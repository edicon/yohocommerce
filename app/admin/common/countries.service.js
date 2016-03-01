app.factory('Countries', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl',
  function (               $firebaseArray,   $firebaseObject,   FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl+'countries');
    var countries = $firebaseArray(ref);

    var country = {

      all: countries
    };

  return country;

}]);
