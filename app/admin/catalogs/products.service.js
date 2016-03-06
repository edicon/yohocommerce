app.factory('Products', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (              $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'products');
    var products = $firebaseArray(ref.child(tid));
    var featuredProducts = $firebaseArray(ref.child(tid).orderByChild("product_featured").equalTo(true));

    var product = {

      getProduct: function(pid) {
        return $firebaseObject(ref.child(tid).child(pid));
      },

      // called from public catalog
      getProductCategory: function(cid) {
        return $firebaseArray(ref.child(tid).orderByChild('product_category_id').equalTo(cid));
      },

      getProductSubCategory: function(sid) {
        return $firebaseArray(ref.child(tid).orderByChild('product_sub_category_id').equalTo(sid));
      },

      removeProduct: function(pid) {
        return $firebaseObject(ref.child(tid).child(pid)).$remove();
      },

      addFeaturedProduct: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+theObj.$id);
        return theRef.update({product_featured: true, product_featured_order: theObj.order});
      },

      recountFeaturedProduct: function() {
        var data = $firebaseArray(ref.child(tid).orderByChild("product_featured").equalTo(true));
        data.$loaded().then(function() {
          cnt = 1;
          for(i = 0; i < data.length; i++) {
            var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+data[i].$id);
            theRef.update({ product_featured_order: cnt });
            cnt = cnt + 1;
          }
        });
      },

      removeFeaturedProduct: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+theObj.$id);
        theRef.update({ product_featured: null, product_featured_order: null });
        return product.recountFeaturedProduct();
      },

      saveProduct: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+theObj.pid);
        return theRef.update({ product_name: theObj.product_name, product_price: theObj.product_price,
          product_category: theObj.product_category, product_status_id: theObj.product_status_id,
          product_status: theObj.product_status });
      },

      all: products,

      allFeatured: featuredProducts

    };

  return product;

}]);
