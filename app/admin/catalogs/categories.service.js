app.factory('Categories', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (                $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'categories');
    var categories = $firebaseArray(ref.child(tid).orderByPriority());
    var first = $firebaseArray(ref.child(tid).orderByPriority().limitToFirst(1));

    var category = {

      getCategory: function(cid) {
        return $firebaseObject(ref.child(tid).child(cid));
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

      removeCategory: function(cid) {
        return $firebaseObject(ref.child(tid).child(cid)).$remove();
      },

      addSubCount: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'categories/'+tid+'/'+theObj.category_id);
        return theRef.update({sub_count: theObj.priority});
      },

      addCategoryImage: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'categories/'+tid+'/'+theObj.cid);
        return theRef.update({category_banner_image: theObj.imageSrc});
      },

      removeCategoryImage: function(cid) {
        var theRef = new Firebase(FirebaseUrl+'categories/'+tid+'/'+cid);
        return theRef.update({category_banner_image: null});
      },

      all: categories,

      firstCategory: first

    };

    return category;

}]);
