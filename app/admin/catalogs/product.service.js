app.factory('Product', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'products');
    var products = $firebaseArray(ref.child(tid));

    var product = {

      addOrder: function(theObj) {
        console.log('got here')
      },

      addProduct: function(newProduct) {
        return product.all.$add(newProduct).then(function(theRef) {
          return theRef.key();
        });
      },

      addProductImage: function(imageEntity) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+imageEntity.pid);
        return theRef.update( {product_image: imageEntity.imageSrc} );
      },

      addThumbnailImage: function(imageEntity) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+imageEntity.pid+'/thumbnails');
        return theRef.push( {thumbnail_image: imageEntity.imageSrc} );
      },

      getProduct: function(pid) {
        return $firebaseObject(ref.child(tid).child(pid));
      },

      getDiscounts: function(pid) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+pid+'/discounts');
        return $firebaseArray(theRef);
      },

      addDiscount: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+theObj.pid+'/discounts');
        return theRef.push({ discount_customer_group_name: theObj.discount_customer_group_name, discount_customer_group_id: theObj.discount_customer_group_id,
          discount_product_quantity: theObj.discount_product_quantity, discount_regular_price: theObj.discount_regular_price, discount_price: theObj.discount_price,
          discount_start_date: theObj.discount_start_date, discount_end_date: theObj.discount_end_date });
      },

      removeDiscount: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+theObj.pid+'/discounts/'+theObj.discountId);
        return theRef.remove();
      },

      getSpecials: function(pid) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+pid+'/specials');
        return $firebaseArray(theRef);
      },

      addSpecial: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+theObj.pid);
        theRef.update( {special_customer_group_name: theObj.special_customer_group_name, special_customer_group_id: theObj.special_customer_group_id,
          special_product_quantity: theObj.special_product_quantity, special_price: theObj.special_price, special_start_date: theObj.special_start_date,
          special_end_date: theObj.special_end_date, special_date_added: Firebase.ServerValue.TIMESTAMP} );

        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+theObj.pid+'/specials');
        return theRef.push( {special_customer_group_name: theObj.special_customer_group_name, special_customer_group_id: theObj.special_customer_group_id,
          special_product_quantity: theObj.special_product_quantity, special_regular_price: theObj.special_regular_price, special_price: theObj.special_price,
          special_start_date: theObj.special_start_date, special_end_date: theObj.special_end_date, special_date_added: Firebase.ServerValue.TIMESTAMP} );
      },

      removeSpecial: function(pid) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+pid);
        theRef.update( {special_customer_group_name: null, special_customer_group_id: null, special_product_quantity: null, special_price: null,
          special_start_date: null, special_end_date: null, special_date_added: null} );
      },

      getIndex: function(pid) {
        return products.$indexFor(pid);
      },

      getKey: function(key) {
        return products.$keyAt(key);
      },

      getCount: function() {
        return products.length;
      },

      getProductThumbnails: function(pid) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+pid+'/thumbnails');
        return $firebaseArray(theRef);
      },

      removeProduct: function(rowEntity) {
        return $firebaseObject(ref.child(tid).child(rowEntity.$id)).$remove();
      },

      removeProductImage: function(pid) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+pid);
        return theRef.remove();
      },

      removeThumbnailImage: function(imageEntity) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+imageEntity.pid+'/thumbnails/'+imageEntity.$id);
        return theRef.remove();
      },

      all: products

    };

  return product;

}]);
