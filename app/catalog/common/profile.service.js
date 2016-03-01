app.factory('Profile', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'profiles');
    var profiles = $firebaseArray(ref);

    var profile = {

      getProfile: function(uid) {
        return $firebaseObject(ref.child(uid));
      },

      getGravatar: function(uid) {
        return '//www.gravatar.com/avatar/' + profiles.$getRecord(uid).emailHash;
      },

      all: profiles

  };

  return profile;

}]);
