app.factory('Library', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'image_library');
    var images = $firebaseArray(ref.child(tid));

    var image = {

      getImage: function(rowEntity) {
        return $firebaseObject(ref.child(tid).child(rowEntity.$id));
      },

      removeImage: function(rowEntity) {
        return $firebaseObject(ref.child(tid).child(rowEntity.$id)).$remove();
      },

      all: images

    };

    return image;
  }
]);
