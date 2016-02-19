app.factory('Profile', function($firebaseArray, $firebaseObject, FirebaseUrl) {
  var ref = new Firebase(FirebaseUrl+'profiles');
//  var allProfiles = $firebaseArray(ref);

  var profiles = {

    createProfile: function(profile) {
      return $firebaseArray(ref.child(tenantId)).$add(profile);
    },

    getProfile: function(uid) {
      return $firebaseObject(ref.child(uid));
    },

    getGravatar: function(uid) {
      return '//www.gravatar.com/avatar/' + allUsers.$getRecord(uid).emailHash;
    }

  };

  return profiles;
});
