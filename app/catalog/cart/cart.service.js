app.factory('Cart', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (          $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'carts');
    var carts = $firebaseArray(ref.child(tid));

    var cart = {

      addCart: function(theObj) {
        return carts.$add().then(function(theRef) {
          return theRef.key();
        });
      },

      /* product ID is used as node ID (theObj.$id) on cart array */
      addProduct: function(theObj) {
        console.log(theObj)
        var theRef = new Firebase(FirebaseUrl+'carts/'+tid+'/'+theObj.cartId+'/'+theObj.$id);
        theRef.update( {product_id: theObj.$id, product_name: theObj.product_name, product_regular_price: theObj.product_price,
          product_quantity: theObj.product_quantity, product_special_price: theObj.special_price, product_image: theObj.product_image,
          cart_update_date: Firebase.ServerValue.TIMESTAMP} );
      },

      nextProduct: function(theObj) {
        var data = $firebaseArray(ref.child(tid).child(theObj.cartId));
        data.$loaded().then(function() {
          cnt = 1;
          for(i = 0; i < data.length; i++) {
            if (theObj.$id === data[i].$id)
              theObj.product_quantity = data[i].product_quantity + 1;
            else
              theObj.product_quantity = 1;
            cart.addProduct(theObj);
            cnt = cnt + 1;
          }
        });
      },

      all: carts

    };

  return cart;

}]);
