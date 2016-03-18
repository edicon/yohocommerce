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

app.factory('Product', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'products');
    var products = $firebaseArray(ref.child(tid));

    var product = {

      addProduct: function(theObj) {
        return product.all.$add(theObj).then(function(theRef) {
          return theRef.key();
        });
      },

      addProductImage: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+theObj.pid);
        return theRef.update( {product_image: theObj.imageSrc} );
      },

      addThumbnailImage: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+theObj.pid+'/thumbnails');
        return theRef.push( {thumbnail_image: theObj.imageSrc} );
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

      removeProduct: function(theObj) {
        return $firebaseObject(ref.child(tid).child(theObj.$id)).$remove();
      },

      removeProductImage: function(pid) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+pid);
        return theRef.remove();
      },

      removeThumbnailImage: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+theObj.pid+'/thumbnails/'+theObj.$id);
        return theRef.remove();
      },

      all: products

    };

  return product;

}]);

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

app.factory('Affiliate', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (               $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'affiliates');
    var affiliates = $firebaseArray(ref.child(tid).orderByPriority());

    var affiliate = {

      getAffiliate: function(aid) {
        return $firebaseObject(ref.child(tid).child(aid));
      },

      addAffiliate: function(theObj) {
      return affiliate.all.$add(theObj).then(function(postRef){
        return postRef.key();
        });
      },

      getIndex: function(aid) {
        return affiliates.$indexFor(aid);
      },

      getKey: function(key) {
        return affiliates.$keyAt(key);
      },

      getCount: function() {
        return affiliates.length;
      },

    all: affiliates
    };

    return affiliate;

}]);

app.factory('Affiliates', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (               $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'affiliates');
    var affiliates = $firebaseArray(ref.child(tid).orderByPriority());

    var affiliate = {

      removeAffiliate: function(aid) {
        return $firebaseObject(ref.child(tid).child(aid)).$remove();
      },

      all: affiliates

    };

    return affiliate;

}]);

app.factory('Coupons', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'coupons');
    var coupons = $firebaseArray(ref.child(tid).orderByPriority());

    var coupon = {

      addCoupon: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'coupons/'+tid);
        return theRef.push(theObj);
      },

      removeCoupon: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'coupons/'+tid+'/'+theObj.couponId);
        return theRef.remove();
      },

      all: coupons,

    };

    return coupon;

}]);

app.factory('Customer', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (              $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'customers');
    var customers = $firebaseArray(ref.child(tid).orderByPriority());

    var customer = {

      getCustomer: function(cid) {
        return $firebaseObject(ref.child(tid).child(cid));
      },

      addCustomer: function(theObj) {
        theObj.customer_date_added = Firebase.ServerValue.TIMESTAMP;
        return customer.all.$add(theObj).then(function(postRef) {
          return postRef.key();
        });
      },

      getAddresses: function(cid) {
        var addressRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+cid+'/addresses');
        return $firebaseArray(addressRef);
      },

      getAddress: function(cid, addressId) {
        var addressRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+cid+'/addresses/'+addressId);
        return $firebaseObject(addressRef);
      },

      addAddress: function(theObj) {
        var custRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theObj.cid+'/addresses');
        return custRef.push({ priority: theObj.priority });
      },

      updateAddressCount: function(theObj) {
        var custRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theObj.cid);
        return custRef.update( {customer_address_count: theObj.addressCount} );
      },

      recountAddresses: function(cid) {
        var data = $firebaseArray(ref.child(tid).child(cid).child("addresses").orderByChild("priority"));
        data.$loaded().then(function() {
          cnt = 1;
          for(i = 0; i < data.length; i++) {
            var addressRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+cid+'/addresses/'+data[i].$id);
            addressRef.update({ priority: cnt });
            cnt = cnt + 1;
          }
        });
      },

      removeAddress: function(theObj) {
        var custRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theObj.cid+'/addresses/'+theObj.addressId);
        custRef.remove();
        return customer.recountAddresses(theObj.cid);
      },

      getIndex: function(cid) {
        return customers.$indexFor(cid);
      },

      getKey: function(key) {
        return customers.$keyAt(key);
      },

      getCount: function() {
        return customers.length;
      },

      all: customers

    };

    return customer;
  }
]);

app.factory('Customers', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (               $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'customers');
    var customers = $firebaseArray(ref.child(tid).orderByPriority());

    var customer = {

      getCustomer: function(cid) {
        return $firebaseObject(ref.child(tid).child(cid));
      },

      removeCustomer: function(cid) {
        return $firebaseObject(ref.child(tid).child(cid)).$remove();
      },

      saveCustomer: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theObj.pid);
        return theRef.update({ customer_status_id: theObj.customer_status_id, customer_status: theObj.customer_status });
      },

      all: customers

    };

    return customer;

}]);

app.factory('Giftcards', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'giftcards');
    var giftcards = $firebaseArray(ref.child(tid).orderByPriority());

    var giftcard = {

      addGiftcard: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'giftcards/'+tid);
        return theRef.push(theObj);
      },

      removeGiftcard: function(gid) {
        return $firebaseObject(ref.child(tid).child(gid)).$remove();
      },

      all: giftcards

    };

    return giftcard;
  }
]);

app.factory('Orders', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'orders');
    var orders = $firebaseArray(ref.child(tid).orderByPriority());

    var order = {

      getOrder: function(oid) {
        return $firebaseObject(ref.child(tid).child(oid));
      },

      all: orders

    };

    return order;
  }
]);

app.factory('Recurring', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'recurring');
    var recurrings = $firebaseArray(ref.child(tid).orderByPriority());

    var recurring = {

      getRecurring: function(rid) {
        return $firebaseObject(ref.child(tid).child(oid));
      },

      all: recurrings

    };

    return recurring;
  }
]);

app.factory('Returns', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'returns');
    var returns = $firebaseArray(ref.child(tid).orderByPriority());

    var returned = {

      getReturn: function(oid) {
        return $firebaseObject(ref.child(tid).child(oid));
      },

      all: returns

    };

    return returned;
  }
]);

app.factory('Banner', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,  tid) {
    var ref = new Firebase(FirebaseUrl+'banner_images');

    var banner = {

      getImages: function(bid) {
        return $firebaseArray(ref.child(tid).child(bid));
      },

      addImage: function(imageEntity) {
        return $firebaseArray(ref.child(tid).child(imageEntity.bid)).$add({image: imageEntity.imageSrc});
      },

      removeImage: function(imageEntity) {
        return $firebaseObject(ref.child(tid).child(imageEntity.bid).child(imageEntity.$id)).$remove();
      }

    };

    return banner;
  }
]);

app.factory('Library', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,  tid) {
    var ref = new Firebase(FirebaseUrl+'banner_images');

    var banner = {

      getImages: function(bid) {
        return $firebaseArray(ref.child(tid).child(bid));
      },

      addImage: function(imageEntity) {
        return $firebaseArray(ref.child(tid).child(imageEntity.bid)).$add({image: imageEntity.imageSrc});
      },

      removeImage: function(imageEntity) {
        return $firebaseObject(ref.child(tid).child(imageEntity.bid).child(imageEntity.$id)).$remove();
      }

    };

    return banner;

}]);

app.factory('Store', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (           $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'stores');
    var stores = $firebaseArray(ref.child(tid).orderByPriority());

    var store = {

      getStore: function(sid) {
        return $firebaseObject(ref.child(tid).child(sid));
      },

      addStore: function(theObj) {
      return store.all.$add(theObj).then(function(postRef){
        return postRef.key();
        });
      },

      getIndex: function(sid) {
        return stores.$indexFor(sid);
      },

      getKey: function(key) {
        return stores.$keyAt(key);
      },

      getCount: function() {
        return stores.length;
      },

    all: stores

    };

    return store;

}]);

app.factory('Stores', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'stores');
    var stores = $firebaseArray(ref.child(tid).orderByPriority());

    var store = {

      removeStore: function(sid) {
        return $firebaseObject(ref.child(tid).child(sid)).$remove();
      },

      all: stores

    };

    return store;

}]);

app.factory('User', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (          $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'profiles');
    var users = $firebaseArray(ref);

    var user = {

      getUser: function(uid) {
        return $firebaseObject(ref.child(uid));
      },

      removeUser: function(uid) {
        return $firebaseObject(ref.child(uid)).$remove();
      },

      saveUser: function(theObj) {
        var theRef = new Firebase(FirebaseUrl+'profiles/'+theObj.uid);
        return theRef.update(theObj);
      },

      getIndex: function(cid) {
        return users.$indexFor(cid);
      },

      getKey: function(key) {
        return users.$keyAt(key);
      },

      getCount: function() {
        return users.length;
      },

      all: users

    };

    return user;

}]);

app.factory('Users', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
  function (           $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
    var ref = new Firebase(FirebaseUrl+'profiles');
    var users = $firebaseArray(ref);

    var user = {

      getProfile: function(uid) {
        console.log(uid)
        return $firebaseObject(ref.child(uid));
      },

      all: users

  };

  return user;

}]);
