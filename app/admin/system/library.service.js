app.factory('Library', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,  tid) {
    var ref = new Firebase(FirebaseUrl+'banner_images');

    var banner = {

      getImages: function(bid) {
        return $firebaseArray(ref.child(tid).child(bid));
      },

      addImage: function(imageEntity) {
        return $firebaseArray(ref.child(tid).child(imageEntity.bid)).$add({image: imageEntity.imageSrc});
      },

      removeImage: function(imageEntity) {
        return $firebaseObject(ref.child(tid).child(imageEntity.bid).child(imageEntity.$id)).$remove();
      }

    };

    return banner;

}]);
