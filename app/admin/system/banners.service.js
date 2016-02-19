app.factory('Banners', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'banners');
    var banners = $firebaseArray(ref.child(tid));

    var banner = {

      getBanner: function(rowEntity) {
        return $firebaseObject(ref.child(tid).child(rowEntity.$id));
      },

      removeBanner: function(rowEntity) {
        return $firebaseObject(ref.child(tid).child(rowEntity.$id)).$remove();
      },

      all: banners

    };

    return banner;
  }
]);
