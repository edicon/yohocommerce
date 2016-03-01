app.factory('RegisterTenant', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (                    $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'tenants');
    var tenants = $firebaseArray(ref);

    var registertenant = {

      getTenant: function(uid) {
      return tenants.$getRecord(uid)
      },

      all: tenants

  };

  return registertenant;

}]);
