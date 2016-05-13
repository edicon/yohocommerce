'use strict';

angular.module('CatalogsModule', [
  'ngAnimate',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ngMessages',
  'firebase',
  'ui.bootstrap',
  'ui.router',
  'ui.grid',
  'ui.grid.edit',
  'ui.grid.cellNav',
  'ui.grid.selection',
  'ui.tinymce',
  'ui.select',
  'ui.grid.rowEdit',
  'ngFileUpload'

])


.config(    ['$stateProvider',
    function( $stateProvider) {

      $stateProvider

          .state('admin.catalogs', {
              url: '/catalogs',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/catalogs/catalogs.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/catalogs/catalogs.html'
                  },
                  "list@admin.catalogs": {
                      controller: 'ProductsCtrl as productsCtrl',
                      templateUrl: 'admin/views/catalogs/products.html'
                  }
              }
          })
          .state('admin.catalogs.products', {
                url: '/products',
                params: {
                  tabEntity: null,
                },
                views: {
                    "header@admin": {
                        templateUrl: 'admin/views/catalogs/products.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/catalogs/catalogs.html'
                    },
                    "list@admin.catalogs.products": {
                        controller: 'ProductsCtrl as productsCtrl',
                        templateUrl: 'admin/views/catalogs/products.html'
                    }
                }
          })
          .state('admin.catalogs.featuredproducts', {
                url: '/featuredproducts',
                params: {
                  rowEntity: null,
                },
                views: {
                    "header@admin": {
                        templateUrl: 'admin/views/catalogs/featuredproducts.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/catalogs/catalogs.html'
                    },
                    "list@admin.catalogs.featuredproducts": {
                        controller: 'ProductsCtrl as productsCtrl',
                        templateUrl: 'admin/views/catalogs/featuredproducts.html'
                    }
                }
          })
          .state('admin.catalogs.product', {
                url: '/product',
                params: {
                  rowEntity: null,
                },
                views: {
                    "header@admin": {
                        templateUrl: 'admin/views/catalogs/product.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/catalogs/catalogs.html'
                    },
                    "list@admin.catalogs.product": {
                        controller: 'ProductCtrl as productCtrl',
                        templateUrl: 'admin/views/catalogs/product.html'
                    }
                }
          })
          .state('admin.catalogs.categories', {
                url: '/categories',
                params: {
                  tabEntity: null,
                },
                views: {
                    "header@admin": {
                        templateUrl: 'admin/views/catalogs/categories.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/catalogs/catalogs.html'
                    },
                    "list@admin.catalogs.categories": {
                        controller: 'CategoriesCtrl as categoriesCtrl',
                        templateUrl: 'admin/views/catalogs/categories.html'
                    }
                }
          })
          .state('admin.catalogs.categorybanners', {
                url: '/categorybanners',
                params: {
                  tabEntity: null,
                },
                views: {
                    "header@admin": {
                        templateUrl: 'admin/views/catalogs/categorybanners.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/catalogs/catalogs.html'
                    },
                    "list@admin.catalogs.categorybanners": {
                        controller: 'CategoriesCtrl as categoriesCtrl',
                        templateUrl: 'admin/views/catalogs/categorybanners.html'
                    }
                }
          })
          .state('admin.catalogs.subcategories', {
                url: '/subcategories',
                params: {
                  rowEntity: null,
                },
                views: {
                    "header@admin": {
                        templateUrl: 'admin/views/catalogs/subcategories.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/catalogs/catalogs.html'
                    },
                    "list@admin.catalogs.subcategories": {
                        controller: 'SubCategoriesCtrl as subCategoriesCtrl',
                        templateUrl: 'admin/views/catalogs/subcategories.html'
                    }
                }
          })
          .state('admin.catalogs.subcategory', {
                url: '/subcategory',
                params: {
                  rowEntity: null,
                },
                views: {
                    "header@admin": {
                        controller: 'SubCategoryCtrl as subCategoryCtrl',
                        templateUrl: 'admin/views/catalogs/subcategory.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/catalogs/catalogs.html'
                    },
                    "list@admin.catalogs.subcategory": {
                        controller: 'SubCategoryCtrl as subCategoryCtrl',
                        templateUrl: 'admin/views/catalogs/subcategory.html'
                    }
                }
          })
          .state('productList', {
                url: '/productList',
                controller: 'ProductsCtrl as productsCtrl',
                resolve: {
                    auth: function($state, Wow, Auth){
                      return Auth.$requireAuth().catch(function(){
                          $state.go('home');
                      });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
          })
          .state('prodInfo', {
                url: '/prodInfo',
                controller: 'ProductCtrl as productCtrl',
                resolve: {
                    auth: function($state, Wow, Auth){
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
          })
          .state('prodInventory', {
                url: '/prodInventory',
                controller: 'ProductCtrl as productCtrl',
                resolve: {
                    auth: function($state, Wow, Auth){
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
          })
          .state('prodDiscount', {
                url: '/prodDiscount',
                controller: 'ProductCtrl as productCtrl',
                resolve: {
                    auth: function($state, Wow, Auth){
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
          })
          .state('prodSpecial', {
                url: '/prodSpecial',
                controller: 'ProductCtrl as productCtrl',
                resolve: {
                    auth: function($state, Wow, Auth){
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
          })
          .state('prodReward', {
                url: '/prodReward',
                controller: 'ProductCtrl as productCtrl',
                resolve: {
                    auth: function($state, Wow, Auth){
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
          })
          .state('prodBannerImage', {
                url: '/prodBannerImage',
                controller: 'ProductCtrl as productCtrl',
                resolve: {
                    auth: function($state, Wow, Auth){
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
          })
          .state('prodThumbnails', {
                url: '/prodThumbnails',
                controller: 'ProductCtrl as productCtrl',
                resolve: {
                    auth: function($state, Wow, Auth){
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
          })

      }

])

.factory('Categories', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (         $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
            var ref = new Firebase(FirebaseUrl+'categories');
            var categories = $firebaseArray(ref.child(tid).orderByPriority());

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

                getFirstRecord: function() {
                    return categories.$keyAt(0);
                },

                getCount: function() {
                    return categories.length;
                },

                removeCategory: function(cid) {
                    return $firebaseObject(ref.child(tid).child(cid)).$remove();
                },

                addSubCount: function(obj) {
                    var theRef = new Firebase(FirebaseUrl+'categories/'+tid+'/'+obj.category_id);
                    return theRef.update({sub_count: obj.priority});
                },

                updateCategoryImage: function(obj) {
                    var theRef = new Firebase(FirebaseUrl+'categories/'+tid+'/'+obj.cid);
                    return theRef.update({category_banner_image: obj.url});
                },

                removeCategoryImage: function(cid) {
                    var theRef = new Firebase(FirebaseUrl+'categories/'+tid+'/'+cid);
                    return theRef.update({category_banner_image: null});
                },

                all: categories

            };

            return category;

      }

])

.factory('Product', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (      $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
            var ref = new Firebase(FirebaseUrl+'products');
            var products = $firebaseArray(ref.child(tid));

            var product = {

                addProduct: function(obj) {
                    return product.all.$add(obj).then(function(theRef) {
                        return theRef.key();
                    });
                },

                updateTaxGroup: function(obj) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+obj.pid);
                    return theRef.update( {product_tax_group_id: obj.gid, product_tax_group_name: obj.name} );
                },

                updateProductImage: function(obj) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+obj.pid);
                    return theRef.update( {product_image: obj.url} );
                },

                addThumbnail: function(obj) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+obj.pid+'/thumbnails');
                    return theRef.push( {thumbnail_image: obj.url} );
                },

                getProduct: function(pid) {
                    return $firebaseObject(ref.child(tid).child(pid));
                },

                getDiscounts: function(pid) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+pid+'/discounts');
                    return $firebaseArray(theRef);
                },

                addDiscount: function(obj) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+obj.pid+'/discounts');
                    return theRef.push({ discount_customer_group_name: obj.discount_customer_group_name, discount_customer_group_id: obj.discount_customer_group_id,
                        discount_product_quantity: obj.discount_product_quantity, discount_regular_price: obj.discount_regular_price, discount_price: obj.discount_price,
                        discount_start_date: obj.discount_start_date, discount_end_date: obj.discount_end_date });
                },

                removeDiscount: function(obj) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+obj.pid+'/discounts/'+obj.discountId);
                    return theRef.remove();
                },

                getSpecials: function(pid) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+pid+'/specials');
                    return $firebaseArray(theRef);
                },

                addSpecial: function(obj) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+obj.pid);
                    theRef.update( {special_customer_group_name: obj.special_customer_group_name, special_customer_group_id: obj.special_customer_group_id,
                        special_product_quantity: obj.special_product_quantity, special_price: obj.special_price, special_start_date: obj.special_start_date,
                        special_end_date: obj.special_end_date, special_date_added: Firebase.ServerValue.TIMESTAMP} );

                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+obj.pid+'/specials');
                    return theRef.push( {special_customer_group_name: obj.special_customer_group_name, special_customer_group_id: obj.special_customer_group_id,
                        special_product_quantity: obj.special_product_quantity, special_regular_price: obj.special_regular_price, special_price: obj.special_price,
                        special_start_date: obj.special_start_date, special_end_date: obj.special_end_date, special_date_added: Firebase.ServerValue.TIMESTAMP} );
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

                addView: function(pid) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+pid+'/views');
                    return theRef.push ({view_date: Firebase.ServerValue.TIMESTAMP});
                },

                getProductThumbnails: function(pid) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+pid+'/thumbnails');
                    return $firebaseArray(theRef);
                },

                removeProduct: function(obj) {
                    return $firebaseObject(ref.child(tid).child(obj.$id)).$remove();
                },

                removeProductImage: function(pid) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+pid);
                    return theRef.remove();
                },

                removeThumbnailImage: function(obj) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+obj.pid+'/thumbnails/'+obj.$id);
                    return theRef.remove();
                },

                all: products

            };

            return product;

      }

])

.factory('Products', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (       $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
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

                addFeaturedProduct: function(obj) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+obj.$id);
                    return theRef.update({product_featured: true, product_featured_order: obj.order});
                },

                recountFeaturedProduct: function() {
                    var cnt = 1;
                    var data = $firebaseArray(ref.child(tid).orderByChild("product_featured").equalTo(true));
                    data.$loaded().then(function() {
                        for(var i = 0; i < data.length; i++) {
                            var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+data[i].$id);
                            theRef.update({ product_featured_order: cnt });
                            cnt = cnt + 1;
                        }
                    });
                },

                removeFeaturedProduct: function(obj) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+obj.$id);
                    theRef.update({ product_featured: null, product_featured_order: null });
                    return product.recountFeaturedProduct();
                },

                saveProduct: function(obj) {
                    var theRef = new Firebase(FirebaseUrl+'products/'+tid+'/'+obj.pid);
                    return theRef.update({ product_name: obj.product_name, product_price: obj.product_price,
                        product_category: obj.product_category, product_status_id: obj.product_status_id,
                        product_status: obj.product_status });
                },

                getProductsCount: function() {
                    return products;
                },

                all: products,

                allFeatured: featuredProducts

          };

          return product;

      }

])

.factory('SubCategories', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
            var ref = new Firebase(FirebaseUrl+'sub_categories');
            var subCategories = $firebaseArray(ref.child(tid).orderByPriority());

            var subCategory = {

                  addSubCategory: function(obj) {
                      var theRef = $firebaseArray(ref.child(tid));
                      return theRef.$add({$priority: obj.priority, category_id: obj.category_id, category_name: obj.category_name });
                  },

                  getSubCategories: function(cid) {
                      return $firebaseArray(ref.child(tid).orderByChild("category_id").equalTo(cid));
                  },

                  getSubCategory: function(sid) {
                      return $firebaseObject(ref.child(tid).child(sid));
                  },

                  removeSubCategory: function(obj) {
                      return $firebaseObject(ref.child(tid).child(obj.$id)).$remove();
                  },

                  updateSubCategoryImage: function(obj) {
                      var theRef = new Firebase(FirebaseUrl+'sub_categories/'+tid+'/'+obj.cid);
                      return theRef.update({category_banner_image: obj.url});
                  },

                  removeSubCategoryImage: function(cid) {
                      var theRef = new Firebase(FirebaseUrl+'sub_categories/'+tid+'/'+cid);
                      return theRef.update({category_banner_image: null});
                  },

                  all: subCategories

            };

            return subCategory;

      }

])

.controller('CategoriesCtrl', ['Categories', 'MediaLibrary', '$state', '$scope', '$stateParams',
        function (              Categories,   MediaLibrary,   $state,   $scope,   $stateParams) {
              var categoriesCtrl = this;
              categoriesCtrl.category = {};
              categoriesCtrl.urls = MediaLibrary.all;

              categoriesCtrl.tinymceOptions = {
                    menubar:false,
                    statusbar: false,
                    theme: "modern",
                    skin: 'light',
                    height: 350
              };

              categoriesCtrl.loadCategory = function(cid) {
                  var theCategory = Categories.getCategory(cid);
                        theCategory.$loaded().then(function() {
                              categoriesCtrl.category = theCategory;
                        });
              };

              if (categoriesCtrl.cid == undefined) {
                  var allCategories = Categories.all;
                        allCategories.$loaded().then(function() {
                              categoriesCtrl.cid = allCategories.$keyAt(0);
                              categoriesCtrl.loadCategory(allCategories.$keyAt(0));
                        });
              }

              categoriesCtrl.categoriesGridOpts = {
                    enableSorting: true,
                    enableCellEditOnFocus: true,
                    data: Categories.all,
                    columnDefs: [
                          { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/catalogs/gridTemplates/editSubCategories.html',
                            width: 34, enableColumnMenu: false, enableCellEdit: false, headerTooltip: 'Edit Sub-categories' },
                          { name:'categoryName', field: 'category_name', width: '70%', enableHiding: false },
                          { name:'menuOrder', field: '$priority', enableHiding: false },
                          { name:'subCount', field: 'sub_count', visible: false },
                          { name: ' ', field: '$id', cellTemplate:'admin/views/catalogs/gridTemplates/removeCategory.html',
                            width: 32, enableCellEdit: false, enableColumnMenu: false }
                    ]
              };

              categoriesCtrl.categoriesGridOpts.onRegisterApi = function(categoriesGridApi) {
                    $scope.categoriesGridApi = categoriesGridApi;
                            categoriesGridApi.edit.on.afterCellEdit($scope, function(rowEntity, newValue, oldValue) {
                                  if (newValue != oldValue) {
                                      var currentCategory = Categories.getCategory(rowEntity.$id);
                                      currentCategory.category_name = rowEntity.category_name;
                                      currentCategory.sub_count = rowEntity.sub_count;
                                      currentCategory.$priority = rowEntity.$priority;
                                      currentCategory.$save();
                                  }
                          }, function(error) {
                                categoriesCtrl.error = error;
                    });
              };

              categoriesCtrl.catagoryListGridOpts = {
                    enableRowHeaderSelection: false,
                    multiSelect: false,
                    enableSorting: false,
                    enableColumnMenus: false,
                    data: Categories.all,
                    columnDefs: [
                          { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/catalogs/gridTemplates/editCategoryBanner.html',
                            width: 34, enableColumnMenu: false, enableCellEdit: false, headerTooltip: 'Add Sub-categories' },
                          { name:'categoryName', field: 'category_name', enableHiding: false }
                    ]
              };

              categoriesCtrl.addCategory = function() {
                    var n = categoriesCtrl.categoriesGridOpts.data.length;
                        Categories.all.$add({$priority: n+1, category_name: categoriesCtrl.categoryName, sub_count: 0});
                        categoriesCtrl.categoryName = null;
              }, function(error) {
                    categoriesCtrl.error = error;
              };

              categoriesCtrl.removeCategory = function(row) {
                    Categories.removeCategory(row.entity.$id);
              }, function(error) {
                    categoriesCtrl.error = error;
              };

              categoriesCtrl.editSubCategory = function(row) {
                    $state.go('admin.catalogs.subcategories', {'rowEntity': row.entity});
              };

              categoriesCtrl.editCategoryBanner = function(row) {
                    categoriesCtrl.cid = row.entity.$id;
                    categoriesCtrl.loadCategory(row.entity.$id);
              };

              categoriesCtrl.removeCategoryImage = function(cid) {
                    Categories.removeCategoryImage(cid);
              }, function(error) {
                    productCtrl.error = error;
              };

              categoriesCtrl.updateCategoryImage = function (url) {
                    var obj = {};
                    obj.cid = categoriesCtrl.cid;
                    obj.url = url;
                    Categories.updateCategoryImage(obj);
              };

        }

])

.controller('SubCategoriesCtrl', ['SubCategories', 'Categories', '$state', '$scope', '$stateParams', 'uiGridConstants',
        function (                 SubCategories,   Categories,   $state,   $scope,   $stateParams,   uiGridConstants) {
              var subCategoriesCtrl = this;

              subCategoriesCtrl.loadSubCategories = function() {
                  var subCategories = SubCategories.getSubCategories(subCategoriesCtrl.cid);
                        subCategories.$loaded().then(function() {
                              subCategoriesCtrl.subCategoriesGrid.data = subCategories;
                              subCategoriesCtrl.subCategoriesIndex = Categories.getIndex(subCategoriesCtrl.cid);
                        });
              };

              subCategoriesCtrl.loadCategory = function(cid) {
                  var category = Categories.getCategory(cid);
                        category.$loaded().then(function() {
                              subCategoriesCtrl.categoryName = category.category_name;
                              subCategoriesCtrl.subCount = category.sub_count;
                              subCategoriesCtrl.cid = category.$id;
                              subCategoriesCtrl.loadSubCategories();
                        });
              };

              if ($stateParams.rowEntity === null) {
                      $state.go('admin.catalogs.categories');
              } else {
                      subCategoriesCtrl.category_name = $stateParams.rowEntity.category_name;
                      subCategoriesCtrl.cid = $stateParams.rowEntity.$id;
                      subCategoriesCtrl.loadSubCategories(subCategoriesCtrl.cid);
              }

              subCategoriesCtrl.subCategoriesGrid = {
                    enableSorting: true,
                    enableCellEditOnFocus: true,
                    columnDefs: [
                          { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/catalogs/gridTemplates/editSubCategory.html',
                            width: 34, enableColumnMenu: false, enableCellEdit: false, headerTooltip: 'Edit Sub-Category Banner' },
                          { name:'categoryName', displayName: 'Sub-Category Name', field: 'category_name', width: '70%', enableHiding: false },
                          { name:'navigationOrder', field: '$priority', enableHiding: false,
                                sort: {
                                  direction: uiGridConstants.ASC,
                                  priority: 0,
                                }
                          },
                          { name: ' ', field: '$id', cellTemplate:'admin/views/catalogs/gridTemplates/removeSubCategory.html',
                                width: 32, enableColumnMenu: false }
                    ]
              };

              subCategoriesCtrl.subCategoriesGrid.onRegisterApi = function(subCategoriesGridApi) {
                    $scope.subCategoriesGridApi = subCategoriesGridApi;
                          subCategoriesGridApi.edit.on.afterCellEdit($scope, function(rowEntity, newValue, oldValue) {

                                if (newValue != oldValue) {
                                      var currentSubCategory = SubCategories.getSubCategory(rowEntity.$id);
                                          currentSubCategory.$loaded().then(function() {
                                                currentSubCategory.category_name = rowEntity.category_name;
                                                currentSubCategory.$priority = rowEntity.$priority;
                                                currentSubCategory.$save();
                                          });
                                }

                      }, function(error) {
                            subCategoriesCtrl.error = error;
                      });
              };

              subCategoriesCtrl.addSubCategory = function() {
                    var entity = {
                        category_id: subCategoriesCtrl.cid,
                        category_name: subCategoriesCtrl.subCategoryName
                    };
                    var currentCategory = SubCategories.getSubCategories(subCategoriesCtrl.cid);
                          currentCategory.$loaded().then(function() {
                                var currentLength = currentCategory.length;
                                entity.priority = currentLength + 1;
                                      SubCategories.addSubCategory(entity).then(function() {
                                            Categories.addSubCount(entity);
                                                subCategoriesCtrl.subCategoryName = null;
                                      });
                          });

              }, function(error) {
                    subCategoriesCtrl.error = error;
              };

              subCategoriesCtrl.editSubCategory = function(row) {
                    row.entity.categoryName = subCategoriesCtrl.category_name;
                    $state.go('admin.catalogs.subcategory', {'rowEntity': row.entity});
              };

              subCategoriesCtrl.removeSubCategory = function(row) {
                    SubCategories.removeSubCategory(row.entity);
              }, function(error) {
                    subCategoriesCtrl.error = error;
              };

              subCategoriesCtrl.next = function() {
                    var key = subCategoriesCtrl.subCategoriesIndex + 1;

                    if (key != subCategoriesCtrl.totalCount) {
                          subCategoriesCtrl.cid = Categories.getKey(key);
                          subCategoriesCtrl.loadCategory(subCategoriesCtrl.cid);
                    }

              }, function(error) {
                    subCategoriesCtrl.error = error;
              };

              subCategoriesCtrl.back = function() {
                    var key = subCategoriesCtrl.subCategoriesIndex - 1;

                    if (key < 0) key = 0
                          subCategoriesCtrl.cid = Categories.getKey(key);

                    subCategoriesCtrl.loadCategory(subCategoriesCtrl.cid);

              }, function(error) {
                    subCategoriesCtrl.error = error;
              };

              subCategoriesCtrl.first = function() {
                    var key = 0;
                    subCategoriesCtrl.cid = Categories.getKey(0);
                    subCategoriesCtrl.loadCategory(subCategoriesCtrl.cid);
              }, function(error) {
                    subCategoriesCtrl.error = error;
              };

              subCategoriesCtrl.last = function() {
                    var key = subCategoriesCtrl.count - 1;
                    subCategoriesCtrl.cid = Categories.getKey(key);
                    subCategoriesCtrl.loadCategory(subCategoriesCtrl.cid);

              }, function(error) {
                    subCategoriesCtrl.error = error;
              };

        }

])

.controller('SubCategoryCtrl', ['SubCategories', 'MediaLibrary', '$state', '$scope', '$stateParams',
      function (                 SubCategories,   MediaLibrary,   $state,   $scope,   $stateParams) {
              var subCategoryCtrl = this;
              subCategoryCtrl.urls = MediaLibrary.all;

              subCategoryCtrl.tinymceOptions = {
                    menubar:false,
                    statusbar: false,
                    theme: "modern",
                    skin: 'light',
                    height: 350
              };

              if ($stateParams.rowEntity != null) {
                    subCategoryCtrl.categoryName = $stateParams.rowEntity.categoryName;
                    var subCategory = SubCategories.getSubCategory($stateParams.rowEntity.$id);
                          subCategory.$loaded().then(function() {
                                subCategoryCtrl.subCategory = subCategory;
                                subCategoryCtrl.cid = subCategory.$id;
                          });
              } else {
                    $state.go('admin.catalogs.categories');
              }

              subCategoryCtrl.cancelSubCategory = function(cid) {
                    var obj = {};
                    obj.$id = cid;
                    obj.category_name = subCategoryCtrl.categoryName;
                    $state.go('admin.catalogs.subcategories', {'rowEntity': obj});
              }

              subCategoryCtrl.removeSubCategoryImage = function(cid) {
                    SubCategories.removeSubCategoryImage(cid);
              }, function(error) {
                    subCategoryCtrl.error = error;
              };

              subCategoryCtrl.updateSubCategoryImage = function (url) {
                    var obj = {};
                    obj.cid = subCategoryCtrl.cid;
                    obj.url = url;
                    SubCategories.updateSubCategoryImage(obj);
              };

              subCategoryCtrl.removeSubCategoryImage = function(cid) {
                    SubCategories.removeSubCategoryImage(cid);
              }, function(error) {
                    subCategoryCtrl.error = error;
              };

      }
])


.controller('ProductCtrl', ['Product', 'Products', 'SubCategories', 'Categories', 'CustomerGroups', 'TaxGroups', 'MediaLibrary', '$filter', '$state', '$scope', '$stateParams',
      function (             Product,   Products,   SubCategories,   Categories,   CustomerGroups,   TaxGroups,   MediaLibrary,   $filter,   $state,   $scope,   $stateParams) {
              var productCtrl = this;
              productCtrl.product = {};
              productCtrl.categories = Categories.all;
              productCtrl.customerGroups = CustomerGroups.all;
              productCtrl.taxGroups = TaxGroups.all;
              productCtrl.totalCount = Products.all.length;
              productCtrl.urls = MediaLibrary.all;

              productCtrl.tinymceOptions = {
                  menubar:false,
                  statusbar: false,
                  theme: "modern",
                  skin: 'light',
                  height: 250
              };

              productCtrl.getSubCategories = function(cid) {
                    var subCategories = SubCategories.getSubCategories(cid);
                    subCategories.$loaded().then(function() {
                          productCtrl.subCategories = subCategories;
                    });
              };

              productCtrl.loadSubCategories = function() {
                    productCtrl.getSubCategories(productCtrl.product.product_category_id);
              };

              productCtrl.saveCategory = function() {
                    productCtrl.product.product_sub_category_id = null;
                        var cat = Categories.getCategory(productCtrl.product.product_category_id);
                        cat.$loaded().then(function() {
                              productCtrl.product.product_category = cat.category_name;
                              productCtrl.product.$save();
                              productCtrl.loadSubCategories();
                        });

              }, function(error) {
                    productCtrl.error = error;
              };

              productCtrl.updateProduct = function() {
                if (productCtrl.pid != null)
                    productCtrl.product.$save();
              }, function(error) {
                    storeCtrl.error = error;
              };

              productCtrl.loadProduct = function(pid) {
                    var theProduct = Product.getProduct(pid);
                        theProduct.$loaded().then(function() {
                              productCtrl.product = theProduct;
                              productCtrl.regular_price = $filter('currency')(theProduct.product_price);
                              productCtrl.productIndex = Product.getIndex(pid);

                              if (theProduct.product_category_id)
                                    productCtrl.getSubCategories(theProduct.product_category_id);
                        });

                    var thumbnails = Product.getProductThumbnails(pid);
                        thumbnails.$loaded().then(function() {
                            productCtrl.thumbnails = thumbnails;
                    });

                    var discounts = Product.getDiscounts(pid);
                        discounts.$loaded().then(function() {
                            productCtrl.gridDiscount.data = discounts;
                    });

                    var specials = Product.getSpecials(pid);
                        specials.$loaded().then(function() {
                            productCtrl.gridSpecial.data = specials;
                    });
              };

              if ($stateParams.rowEntity != undefined) {
                    productCtrl.pid = $stateParams.rowEntity.$id;
                    productCtrl.loadProduct(productCtrl.pid);
              } else {
                    productCtrl.product.pid = null;
              }

              productCtrl.gridDiscount = {
                    enableRowHeaderSelection: false,
                    multiSelect: false,
                    enableSorting: false,
                    enableColumnMenus: false,
                    columnDefs: [
                          { name:'customerGroup', field: 'discount_customer_group_name', enableHiding: false },
                          { name:'quantity', field: 'discount_product_quantity', width: 85, type: 'number', cellClass: 'grid-align-right', enableHiding: false },
                          { name:'regularPrice', field: 'discount_regular_price', type: 'number', enableHiding: false, cellClass: 'grid-align-right' },
                          { name:'discountPrice', field: 'discount_price', type: 'number', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'currency' },
                          { name:'startDate', field: 'discount_start_date', type: 'date', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'date' },
                          { name:'endDate', field: 'discount_end_date', type: 'date', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'date' },
                          { name: ' ', field: '$id', cellTemplate:'admin/views/catalogs/gridTemplates/removeDiscount.html',
                              width: 32, enableColumnMenu: false, enableCellEdit: false, enableFiltering: false }
                    ]
              };

              productCtrl.addDiscount = function() {
                    var theDiscount = {};
                    var group = CustomerGroups.getGroup(productCtrl.discount.customer_group_id);
                          group.$loaded().then(function() {
                                theDiscount.pid = productCtrl.pid;
                                theDiscount.discount_customer_group_id = productCtrl.discount.customer_group_id;
                                theDiscount.discount_customer_group_name = group.group_name;
                                theDiscount.discount_product_quantity = productCtrl.discount.product_quantity;
                                theDiscount.discount_regular_price = productCtrl.regular_price;
                                theDiscount.discount_price = productCtrl.discount.discount_price;
                                theDiscount.discount_start_date = productCtrl.discount.start_date.toDateString();
                                theDiscount.discount_end_date = productCtrl.discount.end_date.toDateString();
                                Product.addDiscount(theDiscount);
                                productCtrl.discount.customer_group_id = null;
                                productCtrl.discount.product_quantity = null;
                                productCtrl.discount.discount_price = null;
                                productCtrl.discount.start_date = null;
                                productCtrl.discount.end_date = null;
                      });

              }, function(error) {
                    customerCtrl.error = error;
              };

              productCtrl.removeDiscount = function(row) {
                    var theDiscount = {};
                          theDiscount.discountId = row.entity.$id;
                          theDiscount.pid = productCtrl.pid;
                          Product.removeDiscount(theDiscount);

              }, function(error) {
                    productCtrl.error = error;
              };

              productCtrl.gridSpecial = {
                    enableRowHeaderSelection: false,
                    multiSelect: false,
                    enableSorting: false,
                    enableColumnMenus: false,
                    columnDefs: [
                          { name:'customerGroup', field: 'special_customer_group_name', enableHiding: false },
                          { name:'quantity', field: 'special_product_quantity', width: 85, type: 'number', cellClass: 'grid-align-right', enableHiding: false },
                          { name:'regularPrice', field: 'special_regular_price', type: 'number', enableHiding: false, cellClass: 'grid-align-right' },
                          { name:'discountPrice', field: 'special_price', type: 'number', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'currency' },
                          { name:'startDate', field: 'special_start_date', type: 'date', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'date' },
                          { name:'endDate', field: 'special_end_date', type: 'date', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'date' },
                          { name:'dateAdded', field: 'special_date_added', type: 'date', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'date' }
                    ]
              };

              productCtrl.addSpecial = function() {
                    var theSpecial = {};
                    var group = CustomerGroups.getGroup(productCtrl.special.customer_group_id);
                          group.$loaded().then(function() {
                                theSpecial.pid = productCtrl.pid;
                                theSpecial.special_customer_group_id = productCtrl.special.customer_group_id;
                                theSpecial.special_customer_group_name = group.group_name;
                                theSpecial.special_product_quantity = productCtrl.special.product_quantity;
                                theSpecial.special_regular_price = productCtrl.regular_price;
                                theSpecial.special_price = parseFloat(productCtrl.special.special_price);
                                theSpecial.special_start_date = productCtrl.special.start_date.toDateString();
                                theSpecial.special_end_date = productCtrl.special.end_date.toDateString();
                                Product.addSpecial(theSpecial);
                                productCtrl.special.customer_group_id = null;
                                productCtrl.special.product_quantity = null;
                                productCtrl.special.special_price = null;
                                productCtrl.special.start_date = null;
                                productCtrl.special.end_date = null;
                      });

              }, function(error) {
                customerCtrl.error = error;
              };

              productCtrl.removeSpecial = function() {
                    Product.removeSpecial(productCtrl.pid);

              }, function(error) {
                    productCtrl.error = error;
              };

              productCtrl.getStatus = function() {
                    if (productCtrl.product.product_status === "1")
                        productCtrl.product.product_status_id = 1;

                    else
                        productCtrl.product.product_status_id = 2;
              };

              productCtrl.updateProductImage = function (url) {
                    var obj = {};
                    obj.pid = productCtrl.pid;
                    obj.url = url;
                    Product.updateProductImage(obj);
              };

              productCtrl.addThumbnail = function (url) {
                    var obj = {};
                    obj.pid = productCtrl.pid;
                    obj.url = url;
                    Product.addThumbnail(obj);
              };

              productCtrl.addProduct = function() {
                    productCtrl.getStatus();
                    var cat = Categories.getCategory(productCtrl.product.product_category_id);
                          cat.$loaded().then(function() {
                              productCtrl.product.product_category = cat.category_name;
                                    Product.addProduct(productCtrl.product).then(function(pid) {
                                        productCtrl.loadProduct(pid);
                              });
                    });

              }, function(error) {
                    productCtrl.error = error;
              };

              productCtrl.updateTaxGroup = function() {
                    var obj = {};
                    var theGroup = TaxGroups.getTaxGroup(productCtrl.product.product_tax_group_id);
                          theGroup.$loaded().then(function() {
                                obj.pid = productCtrl.pid;
                                obj.gid = theGroup.$id;
                                obj.name = theGroup.group_name;
                                Product.updateTaxGroup(obj);
                          });
              }, function(error) {
                    productCtrl.error = error;
              };

              productCtrl.removeProductImage = function($id) {
                    Product.removeProductImage($id);

              }, function(error) {
                    productCtrl.error = error;
              };

              productCtrl.next = function() {
                    var key = productCtrl.productIndex + 1;
                      if (key != productCtrl.totalCount) {
                            productCtrl.pid = Product.getKey(key);
                            productCtrl.loadProduct(productCtrl.pid);
                      }

              }, function(error) {
                    productCtrl.error = error;
              };

              productCtrl.back = function() {
                    var key = productCtrl.productIndex - 1;

                    if (key < 0) key = 0
                          productCtrl.pid = Product.getKey(key);

                    productCtrl.loadProduct(productCtrl.pid);

              }, function(error) {
                    productCtrl.error = error;
              };

              productCtrl.first = function() {
                    productCtrl.pid = Product.getKey(0);
                    productCtrl.loadProduct(productCtrl.pid);

              }, function(error) {
                    productCtrl.error = error;
              };

              productCtrl.last = function() {
                    productCtrl.pid = Product.getKey(productCtrl.totalCount - 1);
                    productCtrl.loadProduct(productCtrl.pid);

              }, function(error) {
                    productCtrl.error = error;
              };

              productCtrl.removeThumbnailImage = function($id) {
                    productCtrl.imageEntity = {};
                    productCtrl.imageEntity.$id = $id;
                    productCtrl.imageEntity.pid = productCtrl.pid;
                    Product.removeThumbnailImage(productCtrl.imageEntity);

              }, function(error) {
                    productCtrl.error = error;
              };

              productCtrl.saveProductStatus = function() {
                    productCtrl.getStatus();
                    productCtrl.product.$save();

              }, function(error) {
                    productCtrl.error = error;
              };

        }

])

.controller('ProductsCtrl', ['Products', 'Categories', '$state', '$scope', '$stateParams', 'uiGridConstants',
      function (              Products,   Categories,   $state,   $scope,   $stateParams,   uiGridConstants) {
            var productsCtrl = this;
            productsCtrl.listButtons = true;
            $scope.file = {};

            productsCtrl.showListBtns = function() {
                  productsCtrl.listButtons = true;
            };

            productsCtrl.showFeatureBtns = function() {
                  productsCtrl.listButtons = false;
            };

            if ($stateParams.tabEntity === 1)
                  productsCtrl.showFeatureBtns();

            productsCtrl.rowArray = [
                  {id: 1, name: '350 px', px: 350},
                  {id: 2, name: '500 px', px: 500},
                  {id: 3, name: '750 px', px: 750},
            ];

            productsCtrl.gridProducts = {
                  showGridFooter: true,
                  enableSorting: true,
                  enableCellEditOnFocus: true,
                  enableFiltering: true,
                  data: Products.all,
                  columnDefs: [
                        { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/catalogs/gridTemplates/editProduct.html',
                            width: 34, enableColumnMenu: false, headerTooltip: 'Edit Product', enableCellEdit: false, enableFiltering: false },
                        { name:'name', field: 'product_name', enableHiding: false, width: '40%' },
                        { name:'category', field: 'product_category', enableHiding: false, width: '20%', enableCellEdit: false },
                        { name: 'product_status_id', displayName: 'Status', editableCellTemplate: 'ui-grid/dropdownEditor', width: '15%',
                            cellFilter: 'mapStatus', editDropdownValueLabel: 'status', enableFiltering: false, editDropdownOptionsArray: [
                              { id: 1, status: 'Enabled' },
                              { id: 2, status: 'Disabled' }
                            ]},
                        { name:'price', field: 'product_price', type: 'number', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'currency' },
                        { name: ' ', field: '$id', cellTemplate:'admin/views/catalogs/gridTemplates/removeProduct.html',
                            width: 32, enableColumnMenu: false, enableCellEdit: false, enableFiltering: false }
                  ]
            };

            productsCtrl.selectProducts = {
                  enableRowHeaderSelection: false,
                  multiSelect: false,
                  enableSorting: true,
                  enableFiltering: true,
                  data: Products.all,
                  columnDefs: [
                        { name: '', field: '$id', shown: false, width: 34, enableColumnMenu: false, enableCellEdit: false, enableFiltering: false,
                        cellTemplate: '<div class="ui-grid-cell-contents" align="center"><a tooltip-placement="right" uib-tooltip="Add Featured"><i class="fa fa-plus-circle"></i></a></div>' },
                        { name:'name', field: 'product_name', enableHiding: false, width: '40%' },
                        { name:'category', field: 'product_category', enableHiding: false },
                        { name:'price', field: 'product_price', type: 'number', width: 100, enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'currency' }
                  ]
            };

            productsCtrl.featuredProducts = {
                  enableRowHeaderSelection: false,
                  multiSelect: false,
                  enableSorting: false,
                  enableColumnMenus: false,
                  data: Products.allFeatured,
                  columnDefs: [
                        { name: '', field: '$id', shown: false, width: 34, enableColumnMenu: false, enableCellEdit: false, enableFiltering: false,
                            cellTemplate: '<div class="ui-grid-cell-contents" align="center"><a tooltip-placement="right" uib-tooltip="Remove Featured"><i class="fa fa-minus-circle text-danger"></i></a></div>' },
                        { name:'name', field: 'product_name', enableHiding: false },
                        { name:'category', field: 'product_category', enableHiding: false },
                        { name:'price', field: 'product_price', type: 'number', width: 85, enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'currency' },
                        { name:'order', field: 'product_featured_order', width: 65, enableHiding: false, cellClass: 'grid-align-right',
                              sort: {
                                direction: uiGridConstants.ASC,
                                priority: 0,
                              },
                        }
                  ]
            };

            productsCtrl.removeProduct = function(row) {
                  Products.removeProduct(row.entity.$id);
            }, function(error) {
                  productsCtrl.error = error;
            };

            productsCtrl.editProduct = function(row) {
                  $state.go('admin.catalogs.product', {'rowEntity': row.entity});
            };

            productsCtrl.gridProducts.onRegisterApi = function(gridProductsApi) {
                  $scope.gridProductsApi = gridProductsApi;
                        gridProductsApi.edit.on.afterCellEdit($scope, function(rowEntity, newValue, oldValue) {

                            if (rowEntity.product_price === undefined)
                                  rowEntity.product_price = null;

                            if (rowEntity.product_category === undefined)
                                  rowEntity.product_category = null;

                            if (rowEntity.product_status_id === undefined)
                                  rowEntity.product_status_id = 2;

                            if (newValue != oldValue) {
                                  var currentProduct = {}
                                  currentProduct.pid = rowEntity.$id;
                                  currentProduct.product_name = rowEntity.product_name;
                                  currentProduct.product_price = rowEntity.product_price;
                                  currentProduct.product_category = rowEntity.product_category;
                                  currentProduct.product_status_id = rowEntity.product_status_id;

                                    if (rowEntity.product_status_id === 1)
                                          currentProduct.product_status = "1";
                                    else
                                          currentProduct.product_status = "2";

                                    Products.saveProduct(currentProduct);
                            }

                      }, function(error) {
                            productsCtrl.error = error;
                  });
            };

            productsCtrl.selectProducts.onRegisterApi = function(selectProductsApi) {
                  $scope.selectProductsApi = selectProductsApi;
                        selectProductsApi.selection.on.rowSelectionChanged($scope, function(row) {
                              var rowEntity = row.entity;
                              var count = Products.allFeatured.length;
                              rowEntity.order = count+1;
                              Products.addFeaturedProduct(rowEntity);

                        }, function(error) {
                              productsCtrl.error = error;
                    });
            };

            productsCtrl.featuredProducts.onRegisterApi = function(featureProductsApi) {
                  $scope.featureProductsApi = featureProductsApi;
                        featureProductsApi.selection.on.rowSelectionChanged($scope, function(row) {
                              Products.removeFeaturedProduct(row.entity);

                        }, function(error) {
                              productsCtrl.error = error;
                  });
            };

            productsCtrl.getRows = function(item) {
                  angular.element(document.getElementsByClassName('grid')[0]).css('height', item.px + 'px');
            };

      }
])

.filter('mapStatus', function() {
    var statusHash = {
        1: 'Enabled',
        2: 'Disabled'
    };

    return function(input) {
        if (!input){
            return '';
        } else {
            return statusHash[input];
        }
    };
})
