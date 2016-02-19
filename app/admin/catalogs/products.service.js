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

      getProductSubCategory: function(subCid) {
        return $firebaseArray(ref.child(tid).orderByChild('product_sub_category_id').equalTo(subCid));
      },

      removeProduct: function(pid) {
        return $firebaseObject(ref.child(tid).child(pid)).$remove();
      },

      addFeaturedProduct: function(rowEntity) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+rowEntity.$id);
        return theRef.update({product_featured: true, product_featured_order: rowEntity.order});
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

      removeFeaturedProduct: function(rowEntity) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+rowEntity.$id);
        theRef.update({ product_featured: null, product_featured_order: null });
        return product.recountFeaturedProduct();
      },

      saveProduct: function(currentProduct) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+currentProduct.pid);
        return theRef.update({ product_name: currentProduct.product_name, product_price: currentProduct.product_price,
          product_category: currentProduct.product_category, product_status_id: currentProduct.product_status_id,
          product_status: currentProduct.product_status });
      },

      all: products,

      allFeatured: featuredProducts

    };

  return product;

}]);
