app.factory('CustomerGroups', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (                  $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'customer_groups');
    var groups = $firebaseArray(ref.child(tid).orderByPriority());

    var group = {

      getGroup: function(gid) {
        return $firebaseObject(ref.child(tid).child(gid));
      },

      removeGroup: function(gid) {
        return $firebaseObject(ref.child(tid).child(gid)).$remove();
      },

      all: groups

    };

    return group;

}]);
