app.controller('CatalogFeaturedCtrl', ['$state', 'Cart', 'Products', '$scope', '$stateParams', '$cookies',
  function (                            $state,   Cart,   Products,   $scope,   $stateParams,   $cookies) {
    var catalogFeaturedCtrl = this;
    catalogFeaturedCtrl.featuredProducts = Products.allFeatured;

    catalogFeaturedCtrl.goProduct = function(pid) {
      $state.go('catalog.product', {'pid': pid});
    };

    catalogFeaturedCtrl.addToCart = function(pid) {
      var theProduct = Products.getProduct(pid);
      theProduct.$loaded().then(function() {
        if (theProduct.product_special_price === undefined)
          theProduct.special_price = null;
        var theCartId = $cookies.get('cartId');
        if (theCartId === undefined) {
          Cart.addCart().then(function(theRef) {
            theProduct.cartId = theRef;
            theProduct.product_quantity = 1;
            $cookies.put("cartId", theRef);
            Cart.addProduct(theProduct);
          });
        } else {
          theProduct.cartId = theCartId;
          Cart.nextProduct(theProduct);
        }
    //    Cart.totalCart(theProduct.cartId);
      });
    };

/*
    catalogFeaturedCtrl.addToCart = function(pid) {
      var theProduct = Products.getProduct(pid);
      theProduct.$loaded().then(function() {
        var theCart = {
          items: [{
            product_id: theProduct.$id, product_name: theProduct.product_name, product_quantity: theProduct.product_quantity = 1,
            product_regular_price: theProduct.product_price, product_special_price: theProduct.special_price, product_image: theProduct.product_image
          }]
        };
        console.log(theCart)
        localStorageService.set("cart", theCart);
      });
    };





        if (localStorageService.length() === 0) {
          localStorageService.set("cart", theCart);
          console.log(localStorageService.keys())
          console.log(localStorageService.get(theProduct.$id))

        } else {
//          localStorageService.set(theProduct.$id, theCart);
//          console.log(localStorageService.get(cart))
  //        var currentProductId = (localStorageService.get(theProduct.$id))
//          console.log(currentProductId)
//          localStorageService.clearAll();
          var data = localStorageService.get("cart");
          console.log(data);
          cnt = 1;
          for(i = 0; i < data.length; i++) {
            if (theProduct.$id === data[i].product_id)
            console.log('got here')
  //              data[i].product_quantity = data[i].product_quantity + 1;
              else
//                theObj.product_quantity = 1;
//              cart.addProduct(theObj);
              cnt = cnt + 1;
            }
        }

      });
    };
/*        } else {
          var data = $cookies.get("cart", catalogFeaturedCtrl.cart.items);
          cnt = 1;
          for(i = 0; i < data.length; i++) {
            if (theProduct.$id === data[i].product_id)
                theObj.product_quantity = data[i].product_quantity + 1;
              else
                theObj.product_quantity = 1;
              cart.addProduct(theObj);
              cnt = cnt + 1;
            }
          theProduct.cartId = theCartId;
          Cart.nextProduct(theProduct);
        }
      });
    };
*/
/*    catalogFeaturedCtrl.addToCart = function(pid) {
      var theProduct = Products.getProduct(pid);
      theProduct.$loaded().then(function() {
        var theCartId = $cookies.get('cartId');
        if (theCartId === undefined) {
          Cart.addCart().then(function(theRef) {
            theProduct.cartId = theRef;
            theProduct.product_quantity = 1;
            $cookies.put("cartId", theRef);
            Cart.addProduct(theProduct);
          });
        } else {
          theProduct.cartId = theCartId;
          Cart.nextProduct(theProduct);
        }
      });
    };
*/

}]);
