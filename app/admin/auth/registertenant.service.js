app.factory('Register', function($firebaseArray, $firebaseObject, FirebaseUrl) {
  var ref = new Firebase(FirebaseUrl+'tenants');
  var tenants = $firebaseArray(ref);

  var register = {

    getTenant: function(uid) {
      return tenants.$getRecord(uid)
    },

    all: tenants

  };

  return register;
});
