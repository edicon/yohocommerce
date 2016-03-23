'use strict';

angular.module('CatalogModule', [
  'ngAnimate',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ngMessages',
  'firebase',
  'ui.bootstrap',
  'ui.router',
  'ui.select'

])


.config (    ['$stateProvider', '$urlRouterProvider',
    function (   $stateProvider,   $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('catalog', {
                url: '/',
                abstract: true,
                views: {
                    "": {
                        templateUrl: 'catalog/views/catalog.html'
                    }
                }
            })
            .state('catalog.home', {
                url: '',
                views: {
                    "header@catalog": {
                        controller: 'CatalogCtrl as catalogCtrl',
                        templateUrl: 'catalog/views/common/header.html'
                    },
                    "carousel@catalog": {
                        controller: 'CarouselCtrl as carouselCtrl',
                        templateUrl: 'catalog/views/common/carousel.html'
                    },
                    "featured@catalog": {
                        controller: 'CatalogFeaturedCtrl as catalogFeaturedCtrl',
                        templateUrl: 'catalog/views/products/featured.html'
                    },
                    "footer@catalog": {
                        templateUrl: 'catalog/views/common/footer.html'
                    }
                }
            })
            .state('catalog.contact', {
                url: 'contact',
                views: {
                    "header@catalog": {
                        controller: 'CatalogCtrl as catalogCtrl',
                        templateUrl: 'catalog/views/common/header.html'
                    },
                    "main@catalog": {
                        controller: 'ContactCtrl as contactCtrl',
                        templateUrl: 'catalog/views/common/contact.html'
                    },
                    "footer@catalog": {
                        templateUrl: 'catalog/views/common/footer.html'
                    }
                }
            })
            .state('catalog.login', {
                url: 'login',
                views: {
                    "header@catalog": {
                        controller: 'CatalogCtrl as catalogCtrl',
                        templateUrl: 'catalog/views/common/header.html'
                    },
                    "main@catalog": {
                        controller: 'AuthCtrl as authCtrl',
                        templateUrl: 'catalog/views/account/login.html'
                    },
                    "footer@catalog": {
                        templateUrl: 'catalog/views/common/footer.html'
                    }
                }
            })
            .state('catalog.register', {
                url: 'register',
                views: {
                    "header@catalog": {
                        controller: 'CatalogCtrl as catalogCtrl',
                        templateUrl: 'catalog/views/common/header.html'
                    },
                    "main@catalog": {
                        controller: 'RegisterCtrl as registerCtrl',
                        templateUrl: 'catalog/views/account/register.html'
                    },
                    "footer@catalog": {
                        templateUrl: 'catalog/views/common/footer.html'
                    }
                }
            })
            .state('catalog.category', {
                url: 'category',
                params: {
                  cid: null,
                },
                views: {
                    "header@catalog": {
                        controller: 'CatalogCtrl as catalogCtrl',
                        templateUrl: 'catalog/views/common/header.html'
                    },
                    "main@catalog": {
                        controller: 'CatalogCategoryCtrl as catalogCategoryCtrl',
                        templateUrl: 'catalog/views/products/category.html'
                    },
                    "footer@catalog": {
                        controller: 'CatalogCtrl as catalogCtrl',
                        templateUrl: 'catalog/views/common/footer.html'
                    }
                }
            })
            .state('catalog.subcategory', {
                url: 'subcategory',
                params: {
                  subCid: null,
                },
                views: {
                    "header@catalog": {
                        controller: 'CatalogCtrl as catalogCtrl',
                        templateUrl: 'catalog/views/common/header.html'
                    },
                    "main@catalog": {
                        controller: 'CatalogSubCategoryCtrl as catalogSubCategoryCtrl',
                        templateUrl: 'catalog/views/products/subcategory.html'
                    },
                    "footer@catalog": {
                        templateUrl: 'catalog/views/common/footer.html'
                    }
                }
            })
            .state('catalog.product', {
                url: 'product',
                params: {
                  pid: null,
                },
                views: {
                    "header@catalog": {
                        controller: 'CatalogCtrl as catalogCtrl',
                        templateUrl: 'catalog/views/common/header.html'
                    },
                    "main@catalog": {
                        controller: 'CatalogProductCtrl as catalogProductCtrl',
                        templateUrl: 'catalog/views/products/product.html'
                    },
                    "footer@catalog": {
                        templateUrl: 'catalog/views/common/footer.html'
                    }
                }
            })
            .state('adminlogin', {
                url: '/adminlogin',
                controller: 'AuthCtrl as authCtrl',
                templateUrl: 'catalog/views/admin/adminlogin.html'
            })
            .state('registertenant', {
                url: '/registertenant',
                controller: 'AuthCtrl as authCtrl',
                templateUrl: 'catalog/views/admin/registertenant.html'
            })

      }
])

.factory('Catalog', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (      $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'categories');
          var categories = $firebaseArray(ref.child(tid).orderByPriority());

          var subRef = new Firebase(FirebaseUrl+'sub_categories');
          var subCategories = $firebaseArray(subRef.child(tid).orderByChild('category_id'));
          var pulldownCategories = $firebaseArray(subRef.child(tid).orderByChild('category_id'));

          var cartRef = new Firebase(FirebaseUrl+'carts');
          var carts = $firebaseArray(cartRef.child(tid));

          var catalog = {

              addCart: function() {
                  return carts.$add({items: 0, total: 0}).then(function(theRef) {
                      return theRef.key();
                  });
              },

              getCart: function(cid) {
                  return $firebaseObject(cartRef.child(tid).child(cid));
              },

              all: categories,

              pulldown: pulldownCategories,

              allMenus: subCategories

          };

          return catalog;

      }

])

.factory('Profile', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (      $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'profiles');
          var profiles = $firebaseArray(ref);

          var profile = {

              getProfile: function(uid) {
                  return $firebaseObject(ref.child(uid));
              },

              getGravatar: function(uid) {
                  return '//www.gravatar.com/avatar/' + profiles.$getRecord(uid).emailHash;
              },

              all: profiles

          };

          return profile;

      }

])

.factory('Auth', ['$firebaseAuth', 'FirebaseUrl',
      function (   $firebaseAuth,   FirebaseUrl) {
          var ref = new Firebase(FirebaseUrl);
          var auth = $firebaseAuth(ref);

          return auth;

      }

])

.factory('Register', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (       $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'countries');
          var countries = $firebaseArray(ref);

            var register = {

              allCountries: countries

            };

            return register;

      }

])

.factory('CartOrders', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (         $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'orders');
          var cartorders = $firebaseArray(ref.child(tid));

          var cartorder = {

              getOrder: function(oid) {
                  return $firebaseArray(ref.child(tid).child(oid));
              },

              addOrder: function(theObj) {
                  return cartorders.$add().then(function(theRef) {
                      return theRef.key();
                  });
              },

              updateOrder: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'orders/'+tid+'/'+theObj.oid+'/'+theObj.$id);

                  if (theObj.items === 0)
                      return theRef.remove();
                  else
                      return theRef.update( {product_quantity: theObj.product_quantity, update_date: Firebase.ServerValue.TIMESTAMP} );

              },


              updateCart: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'carts/'+tid+'/'+theObj.cid);

                  if (theObj.items === 0)
                      return theRef.remove();
                   else
                      return theRef.update( {items: theObj.items, total: theObj.total, update_date: Firebase.ServerValue.TIMESTAMP} );

              },

              addProduct: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'orders/'+tid+'/'+theObj.oid+'/'+theObj.$id);
                  theRef.update( {product_id: theObj.$id, product_name: theObj.product_name, product_regular_price: theObj.product_price,
                      product_quantity: theObj.product_quantity, product_special_price: theObj.special_price, product_image: theObj.product_image,
                      order_status: 'cart', order_update_date: Firebase.ServerValue.TIMESTAMP} );
              },

              removeProduct: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'orders/'+tid+'/'+theObj.oid+'/'+theObj.pid);
                  return theRef.remove();
              },

              nextProduct: function(theObj) {
                  var cnt = 1;
                  var i = 0;
                  var data = $firebaseArray(ref.child(tid).child(theObj.oid));
                  data.$loaded().then(function() {
                        for(i = 0; i < data.length; i++) {

                            if (theObj.$id === data[i].$id)
                                theObj.product_quantity = data[i].product_quantity + 1;
                            else
                                theObj.product_quantity = 1;

                            cartorder.addProduct(theObj);
                            cnt = cnt + 1;
                        }
                  });
              },

              all: cartorders

          };

          return cartorder;

      }

])

.factory('Countries', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl',
      function (        $firebaseArray,   $firebaseObject,   FirebaseUrl) {
            var ref = new Firebase(FirebaseUrl+'countries');
            var countries = $firebaseArray(ref);

            var country = {

              all: countries
            };

            return country;

      }

])

.service('LoginHelper', ['$http', '$q', '$cookies', '$rootScope', 'InstanceUrl',
      function (          $http,   $q,   $cookies,   $rootScope,   InstanceUrl) {
    		      this.initiate = function (options) {
    			    var deferred = $q.defer();

            			$http.post(InstanceUrl+'api/v2/user/session/', options).then(function (result) {
              				$http.defaults.headers.common['X-DreamFactory-Session-Token'] = result.data.session_token;
              				$cookies.session_token = result.data.session_token;

              				$rootScope.user = result.data;

              				try {
              				      window.localStorage.user = JSON.stringify(result.data);
              				} catch (e) { }

             		      deferred.resolve();
            			}, deferred.reject);

            			return deferred.promise;
        		};
	     }
])


.service('CartHelper', ['Catalog', 'CartOrders', 'Products', '$cookies',
      function (         Catalog,   CartOrders,   Products,   $cookies) {
    		      this.initiate = function (pid) {

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

      }

])

.controller('CatalogCtrl', ['Catalog', 'CartOrders', 'Products', '$scope', '$state', '$cookies',
      function (             Catalog,   CartOrders,   Products,   $scope,   $state,   $cookies) {
          var catalogCtrl = this;
          $scope.product = {};
          catalogCtrl.categories = Catalog.all;
          catalogCtrl.subPulldowns = Catalog.pulldown;
          catalogCtrl.subCategories = Catalog.allMenus;

          catalogCtrl.addCart = function() {
              Catalog.addCart().then(function(theRef) {
                  $cookies.put("cartId", theRef);
                  catalogCtrl.getTotals();
              });
          };

          catalogCtrl.getTotals = function() {
              var cartTotals = Catalog.getCart($cookies.get('cartId'));
                  cartTotals.$loaded().then(function() {
                      catalogCtrl.cartTotals = cartTotals;
                  });
          };

          if ($cookies.get('cartId') === undefined)
              catalogCtrl.addCart();
          else
              catalogCtrl.getTotals();

          catalogCtrl.getOrder = function() {
              var theOrder = CartOrders.getOrder($cookies.get('orderId'))
                theOrder.$loaded().then(function() {
                    catalogCtrl.order = theOrder;
                });
          };

          catalogCtrl.removeProduct = function(pid) {
              var theOrder = {};
              var productPrice = {};
              var theCart = {};
              theOrder.pid = pid;
              theCart.cid = $cookies.get('cartId');
              theOrder.oid = $cookies.get('orderId');
              var theProduct = Products.getProduct(pid);
                theProduct.$loaded().then(function() {

                    if (theProduct.special_price != null)
                        productPrice = theProduct.special_price;
                    else
                        productPrice = theProduct.product_price;

                    var cartTotals = Catalog.getCart(theCart.cid);
                      cartTotals.$loaded().then(function() {
                          theCart.total = cartTotals.total - productPrice;
                          theCart.items = cartTotals.items - 1;
                          CartOrders.updateCart(theCart);
                          CartOrders.removeProduct(theOrder);

                              if (theCart.items === 0) {
                                    $cookies.remove('cartId');
                                    $cookies.remove('orderId');
                                    catalogCtrl.addCart();
                              }
                      });
                });

          }, function(error) {
              catalogCtrl.error = error;
          };

          catalogCtrl.goCategory = function(cid) {
              $state.go('catalog.category', {'cid': cid});
          };

          catalogCtrl.goSubCategory = function(subCid) {
              $state.go('catalog.subcategory', {'subCid': subCid});
          };

          catalogCtrl.goProduct = function(pid) {
              $state.go('catalog.product', {'pid': pid});
          };

          catalogCtrl.findProduct = function() {
              $state.go('catalog.product', {'pid': $scope.product.selected.$id});
          };

      }

])

.controller('AuthCtrl', ['Auth', 'AlertService', 'Tenant', 'LoginHelper', 'md5', 'tid', '$state',
      function (          Auth,   AlertService,   Tenant,   LoginHelper,   md5,   tid,   $state) {
          var authCtrl = this;
          authCtrl.tenant = {};
          authCtrl.user = {};

          authCtrl.adminLogin = function() {
              Auth.$authWithPassword(authCtrl.user).then(function(auth) {
                authCtrl.tenant = Tenant.getInstanceCredentials();
                  authCtrl.tenant.$loaded().then(function() {
                      LoginHelper.initiate({
                          email: authCtrl.tenant.dreamfactory_email,
                          password: authCtrl.tenant.dreamfactory_password
                      })

                  }).then(function() {
                      $state.go('admin.dashboard');
                  });
              }, function(error) {
                  AlertService.addError(error.message);
              });
          };

          authCtrl.accountLogin = function() {
              Auth.$authWithPassword(authCtrl.user).then(function (auth) {
                  $state.go('account.detail');

              }, function(error) {
                  AlertService.addError(error.message);
              });
          };

      }

])

.controller('RegisterCtrl', ['Account', 'Auth', 'Profile', 'AlertService', 'Customer', 'md5', 'tid', '$scope', '$state',
      function (              Account,   Auth,   Profile,   AlertService,   Customer,   md5,   tid,   $scope,   $state) {
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

      }

])

.controller('RegisterTenantCtrl', ['Auth', 'Profile', 'AlertService', 'Tenant', 'md5', 'tid', '$state',
      function (                    Auth,   Profile,   AlertService,   Tenant,   md5,   tid,   $state) {
          var registerTenantCtrl = this;
          registerTenantCtrl.tenant = {};

          registerTenantCtrl.createProfile = function() {
              authCtrl.profile = Profile.getProfile(registerTenantCtrl.tenant.uid);
                authCtrl.profile.$loaded().then(function() {
                    registerTenantCtrl.profile.emailHash = md5.createHash(registerTenantCtrl.user.email);
                    registerTenantCtrl.profile.name = registerTenantCtrl.tenant.name;
                    registerTenantCtrl.profile.tid = registerTenantCtrl.tid;
                    registerTenantCtrl.profile.type = 'Tenant';
                    registerTenantCtrl.profile.$save();
                    registerTenantCtrl.login();
                });

          }, function(error) {

              AlertService.addError(error.message);
          };

          authCtrl.registerTenant = function() {
              var domainCode = registerTenantCtrl.user.email.replace(/.*@/, "");
              var n = domainCode.indexOf(".");
                domainCode = domainCode.substring(0, n);
                    Auth.$createUser(registerTenantCtrl.user).then(function (user) {
                        registerTenantCtrl.tenant.uid = user.uid;
                        registerTenantCtrl.tenant.first_name = authCtrl.user.first_name;
                        registerTenantCtrl.tenant.last_name = authCtrl.user.last_name;
                        registerTenantCtrl.tenant.domain = authCtrl.user.email.replace(/.*@/, "");
                        registerTenantCtrl.tenant.domain_code = domainCode;
                            Tenant.all.$add(registerTenantCtrl.tenant).then(function(ref) {
                                authCtrl.tid = ref.key();
                                authCtrl.createProfile();
                            })
                    });

            }, function(error) {

              AlertService.addError(error.message);
            };

      }

])



.controller('ContactCtrl', ['Tenant', 'Store',
      function (             Tenant,   Store) {
          var contactCtrl = this;

          var tenant = Tenant.getStoreTenant();
              tenant.$loaded().then(function() {
                contactCtrl.store = Store.getStore(tenant.default_store_id)
          });
//auto resizing comment box.
      $(document)
  		    .one('focus.textarea', '.autoExpand', function(){
  			       var savedValue = this.value;
  			          this.value = '';
  			          this.baseScrollHeight = this.scrollHeight;
  			          this.value = savedValue;
  		    })
  		    .on('input.textarea', '.autoExpand', function(){
  			       var minRows = this.getAttribute('data-min-rows')|0, rows;
  			          this.rows = minRows;
                  console.log(this.scrollHeight , this.baseScrollHeight);
  			          rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
  			          this.rows = minRows + rows;
  		    });

      }

])

.controller('CarouselCtrl', ['Banner',
      function (              Banner) {
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
      }

])

.controller('CatalogCategoryCtrl', ['Products', 'Categories', 'CartHelper', '$state', '$stateParams',
      function (                     Products,   Categories,   CartHelper,   $state,   $stateParams) {
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

          catalogCategoryCtrl.addOrder = function(pid) {
              CartHelper.initiate(pid);
          };

      }

])

.controller('CatalogFeaturedCtrl', ['CartHelper', 'Products', '$state',
      function (                     CartHelper,   Products,   $state) {
          var catalogFeaturedCtrl = this;
          catalogFeaturedCtrl.featuredProducts = Products.allFeatured;

          catalogFeaturedCtrl.goProduct = function(pid) {
              $state.go('catalog.product', {'pid': pid});
          };

          catalogFeaturedCtrl.addOrder = function(pid) {
              CartHelper.initiate(pid);
          };

      }

])

.controller('CatalogProductCtrl', ['$state', 'Product', 'CartHelper', '$stateParams',
<<<<<<< HEAD
      function (                    $state,   Product,   CartHelper,  $stateParams) {
=======
      function (                    $state,   Product,   CartHelper,   $stateParams) {
>>>>>>> master
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
              CartHelper.initiate(pid);
          };

      }

])

.controller('CatalogSubCategoryCtrl', ['CartHelper', 'Products', 'SubCategories', 'Categories', '$state', '$stateParams',
      function (                        CartHelper,   Products,   SubCategories,   Categories,   $state,   $stateParams) {
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
              CartHelper.initiate(pid);
          };

      }

])
