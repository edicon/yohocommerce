app.factory('Coupons', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'coupons');
    var coupons = $firebaseArray(ref.child(tid).orderByPriority());

    var coupon = {

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

      all: coupons,

    };

    return coupon;
  }
]);
