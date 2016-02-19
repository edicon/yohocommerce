app.factory('SubCategories', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (                   $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'sub_categories');
    var subCategories = $firebaseArray(ref.child(tid).orderByPriority());

    var subCategory = {

      addSubCategory: function(entity) {
        var theRef = $firebaseArray(ref.child(tid));
        return theRef.$add({$priority: entity.priority, category_id: entity.category_id, category_name: entity.category_name });
      },

      getSubCategories: function(cid) {
        return $firebaseArray(ref.child(tid).orderByChild("category_id").equalTo(cid));
      },

      getSubCategory: function(subCid) {
        return $firebaseObject(ref.child(tid).child(subCid));
      },

      removeSubCategory: function(rowEntity) {
        return $firebaseObject(ref.child(tid).child(rowEntity.$id)).$remove();
      },

      addSubCategoryImage: function(imageEntity) {
        var theRef = new Firebase(FirebaseUrl+'sub_categories/'+tid+'/'+imageEntity.subCid);
        return theRef.update({category_banner_image: imageEntity.imageSrc});
      },

      removeCategoryImage: function(subCid) {
        var theRef = new Firebase(FirebaseUrl+'aub_categories/'+tid+'/'+subCid);
        return theRef.update({category_banner_image: null});
      },

      all: subCategories

    };

    return subCategory;
  }
]);
