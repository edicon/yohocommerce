app.controller('AccountCtrl', ['Auth', '$state', 'profile',
  function (                    Auth,   $state,  profile) {
    var accountCtrl = this;
    accountCtrl.profile = profile;
    accountCtrl.authInfo = Auth.$getAuth();

    accountCtrl.logout = function() {
      Auth.$unauth();
      $state.go('catalog.home');
    };

}]);

app.controller('AccountAddressCtrl', ['Account',  'Countries', 'AlertService', 'Customer', 'tid', '$scope', 'profile',
  function (                           Account,    Countries,   AlertService,   Customer,   tid,   $scope,  profile) {
    var accountAddressCtrl = this;
    $scope.country = {};
    $scope.country.selected = {};
    accountAddressCtrl.profile = profile;
    $scope.countries = Countries.all;

    var theCustomer = Customer.getCustomer(accountAddressCtrl.profile.cid);
      theCustomer.$loaded().then(function() {
        accountAddressCtrl.customer = theCustomer;
        $scope.country.selected = accountAddressCtrl.customer.customer_country;
        console.log($scope)
    });

}]);

app.controller('LoginCtrl', ['Auth', 'AlertService', '$state',
  function (                  Auth,   AlertService,   $state) {
    var loginCtrl = this;
    loginCtrl.user = {};

    loginCtrl.login = function() {
      Auth.$authWithPassword(loginCtrl.user).then(function (auth) {
        $state.go('account.detail');
      }, function(error) {
        AlertService.addError(error.message);
      });
    };

}]);

app.controller('RegisterCtrl', ['Account', 'Auth', 'Profile', 'AlertService', 'Customer', 'md5', 'tid', '$scope', '$state',
  function (                     Account,   Auth,   Profile,   AlertService,   Customer,   md5,   tid,   $scope,   $state) {
    var registerCtrl = this;
    registerCtrl.user = {};
    registerCtrl.cid = {};
    $scope.countries = Account.allCountries;

    registerCtrl.login = function() {
      Auth.$authWithPassword(registerCtrl.user).then(function (auth) {
        $state.go('account.detail');
      }, function(error) {
        AlertService.addError(error.message);
      });
    };

    registerCtrl.addCustomer = function() {
      registerCtrl.customer.customer_status_id = 1;
      registerCtrl.customer.customer_status = "1";
      registerCtrl.customer.customer_address_count = 0;
      registerCtrl.customer.customer_country = registerCtrl.customer.customer_country.name;
      Customer.addCustomer(registerCtrl.customer).then(function(custId) {
        registerCtrl.cid = custId;
        registerCtrl.addProfile();
      });
    }, function(error) {
      AlertService.addError(error.message);
    };

    registerCtrl.addProfile = function() {
      registerCtrl.profile = Profile.getProfile(registerCtrl.uid);
      registerCtrl.profile.$loaded().then(function() {
        registerCtrl.profile.emailHash = md5.createHash(registerCtrl.customer.customer_email);
        registerCtrl.profile.first_name = registerCtrl.customer.customer_first_name;
        registerCtrl.profile.last_name = registerCtrl.customer.customer_last_name;
        registerCtrl.profile.email = registerCtrl.customer.customer_email;
        registerCtrl.profile.type = 'Customer';
        registerCtrl.profile.status = 'Enabled';
        registerCtrl.profile.cid = registerCtrl.cid;
        registerCtrl.profile.tid = tid;
        registerCtrl.profile.$save();
        registerCtrl.login();
      });
    }, function(error) {
      AlertService.addError(error.message);
    };

    registerCtrl.createUser = function() {
      registerCtrl.user.email = registerCtrl.customer.customer_email;
      registerCtrl.user.password = registerCtrl.customer_password;
      Auth.$createUser(registerCtrl.user).then(function(user) {
        registerCtrl.uid = user.uid;
        registerCtrl.addCustomer();
      }, function(error) {
        AlertService.addError(error.message);
      });
    };

    registerCtrl.registerCustomer = function() {
      registerCtrl.createUser();
    };

}]);

app.controller('CarouselCtrl', ['Banner',
  function (                     Banner) {
    var carouselCtrl = this;

    carouselCtrl.myInterval = 7000;
    carouselCtrl.noWrapSlides = false;

    carouselCtrl.defaultSlides = [
      { image: "/images/carousel-default-image.png" },
      { image: "/images/carousel-default-image.png" },
      { image: "/images/carousel-default-image.png" }
    ]
/* removed until file upload working
    carouselCtrl.bannerImages = Banner.getImages("1");
      carouselCtrl.bannerImages.$loaded().then(function() {
        if (carouselCtrl.bannerImages.length === 0) {
          carouselCtrl.bannerArray = 'no';

        }
    });
*/
}]);

app.controller('CatalogCategoryCtrl', ['$state', 'Products', 'Categories', '$scope', '$stateParams',
  function (                            $state,   Products,   Categories,   $scope,   $stateParams) {
    var catalogCategoryCtrl = this;
    var cid = $stateParams.cid

    if (cid === null) {
      $state.go('catalog.home');
    } else {
      var category = Categories.getCategory(cid);
        category.$loaded().then(function() {
          catalogCategoryCtrl.category = category;
          var products = Products.getProductCategory(cid);
            products.$loaded().then(function() {
              catalogCategoryCtrl.products = products;
          });
      });
    }

    catalogCategoryCtrl.goProduct = function(pid) {
      $state.go('catalog.product', {'pid': pid});
    };

}]);

app.controller('CatalogFeaturedCtrl', ['$state', 'Catalog', 'CartOrders', 'Products', '$scope', '$stateParams', '$cookies',
  function (                            $state,   Catalog,   CartOrders,   Products,   $scope,   $stateParams,   $cookies) {
    var catalogFeaturedCtrl = this;
    catalogFeaturedCtrl.featuredProducts = Products.allFeatured;

    catalogFeaturedCtrl.goProduct = function(pid) {
      $state.go('catalog.product', {'pid': pid});
    };

    catalogFeaturedCtrl.addOrder = function(pid) {
      var theProduct = Products.getProduct(pid);
      theProduct.$loaded().then(function() {
        if (theProduct.special_price === undefined)
          theProduct.special_price = null;
        if ($cookies.get('orderId') === undefined) {
          CartOrders.addOrder().then(function(theRef) {
            theProduct.oid = theRef;
            theProduct.product_quantity = 1;
            $cookies.put("orderId", theRef);
            CartOrders.addProduct(theProduct);
          });
        } else {
          theProduct.oid = $cookies.get('orderId');
          CartOrders.nextProduct(theProduct);
        }
        var theCart = Catalog.getCart($cookies.get('cartId'));
        theCart.$loaded().then(function() {
          theCart.items = theCart.items + 1;
          if (theProduct.special_price != null)
            theCart.total = theCart.total + theProduct.special_price;
          else
            theCart.total = theCart.total + theProduct.product_price;
          theCart.cid = $cookies.get('cartId');
          CartOrders.updateCart(theCart);
        });
      });
    };

}]);

app.controller('CatalogProductCtrl', ['$state', 'Product', 'Products', 'CartOrders', '$scope', '$stateParams', '$cookies',
  function (                           $state,   Product,   Products,   CartOrders,   $scope,   $stateParams,   $cookies) {
    var catalogProductCtrl = this;

    var pid = $stateParams.pid

    if (pid === null) {
      $state.go('catalog.home');
    } else {
      var product = Product.getProduct(pid);
        product.$loaded().then(function() {
          catalogProductCtrl.product = product;
      });
      var thumbnails = Product.getProductThumbnails(pid);
        thumbnails.$loaded().then(function() {
          catalogProductCtrl.thumbnails = thumbnails;
      });
    }

    catalogProductCtrl.goCategory = function(cid) {
      $state.go('catalog.category', {'cid': cid});
    };

    catalogProductCtrl.addOrder = function(pid) {
      var theProduct = Products.getProduct(pid);
      theProduct.$loaded().then(function() {
        if (theProduct.product_special_price === undefined)
          theProduct.special_price = null;
        var theOrderId = $cookies.get('orderId');
        if (theOrderId === undefined) {
          Carts.addOrder().then(function(theRef) {
            theProduct.orderId = theRef;
            theProduct.product_quantity = 1;
            $cookies.put("orderId", theRef);
            Carts.addProduct(theProduct);
          });
        } else {
          theProduct.orderId = theOrderId;
          Carts.nextProduct(theProduct);
        }
    //    Cart.totalCart(theProduct.cartId);
      });
    };

}]);

app.controller('CatalogSubCategoryCtrl', ['$state', 'Catalog', 'CartOrders', 'Products', 'SubCategories', 'Categories', '$scope', '$stateParams', '$cookies',
  function (                               $state,   Catalog,   CartOrders,   Products,   SubCategories,   Categories,   $scope,   $stateParams,   $cookies) {
    var catalogSubCategoryCtrl = this;
    var subCid = $stateParams.subCid;

    catalogSubCategoryCtrl.goCategory = function(cid) {
      $state.go('catalog.category', {'cid': cid});
    };

    catalogSubCategoryCtrl.goProduct = function(pid) {
      $state.go('catalog.product', {'pid': pid});
    };

    if (subCid === null) {
      $state.go('catalog.home');
    } else {
      var subCategory = SubCategories.getSubCategory(subCid);
        subCategory.$loaded().then(function() {
          catalogSubCategoryCtrl.subCategory = subCategory;
          var category = Categories.getCategory(catalogSubCategoryCtrl.subCategory.category_id);
            category.$loaded().then(function() {
              catalogSubCategoryCtrl.category = category;
              var products = Products.getProductSubCategory(subCid);
                products.$loaded().then(function() {
                  catalogSubCategoryCtrl.products = products;
                });
            });
        });
    }

    catalogSubCategoryCtrl.addOrder = function(pid) {
      var theProduct = Products.getProduct(pid);
      theProduct.$loaded().then(function() {
        if (theProduct.special_price === undefined)
          theProduct.special_price = null;
        if ($cookies.get('orderId') === undefined) {
          CartOrders.addOrder().then(function(theRef) {
            theProduct.oid = theRef;
            theProduct.product_quantity = 1;
            $cookies.put("orderId", theRef);
            CartOrders.addProduct(theProduct);
          });
        } else {
          theProduct.oid = $cookies.get('orderId');
          CartOrders.nextProduct(theProduct);
        }
        var theCart = Catalog.getCart($cookies.get('cartId'));
        theCart.$loaded().then(function() {
          theCart.items = theCart.items + 1;
          if (theProduct.special_price != null)
            theCart.total = theCart.total + theProduct.special_price;
          else
            theCart.total = theCart.total + theProduct.product_price;
          theCart.cid = $cookies.get('cartId');
          CartOrders.updateCart(theCart);
        });
      });
    };

}]);
