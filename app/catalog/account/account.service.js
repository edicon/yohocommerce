app.factory('Account', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'customers');
    var customers = $firebaseArray(ref.child(tid));

    var customer = {

      all: customers

    };

  return customer;

}]);
