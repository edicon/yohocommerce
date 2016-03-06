app.factory('SubCategories', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (                   $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'sub_categories');
    var subCategories = $firebaseArray(ref.child(tid).orderByPriority());

    var subCategory = {

      addSubCategory: function(theObj) {
        var theRef = $firebaseArray(ref.child(tid));
        return theRef.$add({$priority: theObj.priority, category_id: theObj.category_id, category_name: theObj.category_name });
      },

      getSubCategories: function(cid) {
        return $firebaseArray(ref.child(tid).orderByChild("category_id").equalTo(cid));
      },

      getSubCategory: function(sid) {
        return $firebaseObject(ref.child(tid).child(sid));
      },

      removeSubCategory: function(theObj) {
        return $firebaseObject(ref.child(tid).child(theObj.$id)).$remove();
      },

      addSubCategoryImage: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'sub_categories/'+tid+'/'+theObj.subCid);
        return theRef.update({category_banner_image: theObj.imageSrc});
      },

      removeCategoryImage: function(sid) {
        var theRef = new Firebase(FirebaseUrl+'aub_categories/'+tid+'/'+sid);
        return theRef.update({category_banner_image: null});
      },

      all: subCategories

    };

    return subCategory;

}]);
