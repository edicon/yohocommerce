app.factory('Categories', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (                $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'categories');
    var categories = $firebaseArray(ref.child(tid).orderByPriority());
    var first = $firebaseArray(ref.child(tid).orderByPriority().limitToFirst(1));

    var category = {

      getCategory: function(id) {
        return $firebaseObject(ref.child(tid).child(id));
      },

      getIndex: function(cid) {
        return categories.$indexFor(cid);
      },

      getKey: function(key) {
        return categories.$keyAt(key);
      },

      getCount: function() {
        return categories.length;
      },

      removeCategory: function(id) {
        return $firebaseObject(ref.child(tid).child(id)).$remove();
      },

      addSubCount: function(entity) {
        var theRef = new Firebase(FirebaseUrl+'categories/'+tid+'/'+entity.category_id);
        return theRef.update({sub_count: entity.priority});
      },

      addCategoryImage: function(imageEntity) {
        var theRef = new Firebase(FirebaseUrl+'categories/'+tid+'/'+imageEntity.cid);
        return theRef.update({category_banner_image: imageEntity.imageSrc});
      },

      removeCategoryImage: function(cid) {
        var theRef = new Firebase(FirebaseUrl+'categories/'+tid+'/'+cid);
        return theRef.update({category_banner_image: null});
      },

      all: categories,

      firstCategory: first

    };

    return category;
  }
]);
