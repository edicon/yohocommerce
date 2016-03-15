'use strict';

angular.module('app')
  .config (    ['$stateProvider', '$urlRouterProvider',
    function (   $stateProvider,   $urlRouterProvider) {

      $urlRouterProvider.otherwise('/admin');

      $stateProvider
        .state('admin', {
          url: '/admin',
          abstract: true,
          views: {
            "": {
              controller: 'AdminCtrl as adminCtrl',
              templateUrl: 'admin/admin.html'
            }
          },
          resolve: {
            auth: function($state, Auth){
              return Auth.$requireAuth().catch(function(){
                $state.go('catalog.home');
              });
            },
            profile: function(Profile, Auth){
              return Auth.$requireAuth().then(function(auth){
                return Profile.getProfile(auth.uid).$loaded();
              });
            }
          }
        })
        .state('admin.dashboard', {
          url: '',
          views: {
            "main@admin": {
              controller: 'DashboardCtrl as dashboardCtrl',
              templateUrl: 'admin/dashboard/admin.dashboard.html'
            }
          }
        })
        // start catalog main page
        .state('admin.catalogs', {
          url: '/catalogs',
          views: {
            "header@admin": {
              templateUrl: 'admin/catalogs/products.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/catalogs/catalogs.html'
            },
            "list@admin.catalogs": {
              controller: 'ProductsCtrl as productsCtrl',
              templateUrl: 'admin/catalogs/products.html'
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
              templateUrl: 'admin/catalogs/products.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/catalogs/catalogs.html'
            },
            "list@admin.catalogs.products": {
              controller: 'ProductsCtrl as productsCtrl',
              templateUrl: 'admin/catalogs/products.html'
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
              templateUrl: 'admin/catalogs/product.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/catalogs/catalogs.html'
            },
            "list@admin.catalogs.product": {
              controller: 'ProductCtrl as productCtrl',
              templateUrl: 'admin/catalogs/product.html'
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
              templateUrl: 'admin/catalogs/categories.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/catalogs/catalogs.html'
            },
            "list@admin.catalogs.categories": {
              controller: 'CategoriesCtrl as categoriesCtrl',
              templateUrl: 'admin/catalogs/categories.html'
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
              templateUrl: 'admin/catalogs/subcategories.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/catalogs/catalogs.html'
            },
            "list@admin.catalogs.subcategories": {
              controller: 'SubCategoriesCtrl as subCategoriesCtrl',
              templateUrl: 'admin/catalogs/subcategories.html'
            }
          }
        })
        // end catalog main page
        // start sales main menu
        .state('admin.sales', {
          url: '/sales',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/sales.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/sales/sales.html'
            },
            "list@admin.sales.orders": {
              controller: 'OrdersCtrl as ordersCtrl',
              templateUrl: 'admin/sales/orders.html'
            }
          }
        })
        .state('admin.sales.orders', {
          url: '/orders',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/orders.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/sales/sales.html'
            },
            "list@admin.sales.orders": {
              controller: 'OrdersCtrl as ordersCtrl',
              templateUrl: 'admin/sales/orders.html'
            }
          }
        })
        .state('admin.sales.recurring', {
          url: '/recurring',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/recurring.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/sales/sales.html'
            },
            "list@admin.sales.recurring": {
              controller: 'RecurringCtrl as recurringCtrl',
              templateUrl: 'admin/sales/orders.html'
            }
          }
        })
        .state('admin.sales.returns', {
          url: '/returns',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/returns.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/sales/sales.html'
            },
            "list@admin.sales.returns": {
              controller: 'ReturnsCtrl as returnsCtrl',
              templateUrl: 'admin/sales/returns.html'
            }
          }
        })
        .state('admin.sales.customers', {
          url: '/customers',
          params: {
            tabEntity: null,
          },
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/customers.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/sales/sales.html'
            },
            "list@admin.sales.customers": {
              controller: 'CustomersCtrl as customersCtrl',
              templateUrl: 'admin/sales/customers.html'
            }
          }
        })
        .state('admin.sales.giftcards', {
          url: '/giftcards',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/giftcards.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/sales/sales.html'
            },
            "list@admin.sales.giftcards": {
              controller: 'GiftcardsCtrl as giftcardsCtrl',
              templateUrl: 'admin/sales/giftcards.html'
            }
          }
        })
        .state('admin.sales.order', {
          url: '/order',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/order.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/sales/sales.html'
            },
            "list@admin.sales.order": {
              controller: 'OrderCtrl as orderCtrl',
              templateUrl: 'admin/sales/orders.html'
            }
          }
        })
        .state('admin.sales.return', {
          url: '/returns',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/returns.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/sales/sales.html'
            },
            "list@admin.sales.return": {
              controller: 'ReturnsCtrl as returnsCtrl',
              templateUrl: 'admin/sales/returns.html'
            }
          }
        })
        .state('admin.sales.customer', {
          url: '/customer',
          params: {
            rowEntity: null,
            cid: null,
          },
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/customers.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/sales/sales.html'
            },
            "list@admin.sales.customer": {
              controller: 'CustomerCtrl as customerCtrl',
              templateUrl: 'admin/sales/customer.html'
            }
          }
        })
        // end sales main menu
        // start marketing main menu

        .state('admin.marketing', {
          url: '/marketing',
          views: {
            "header@admin": {
              templateUrl: 'admin/marketing/marketing.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/marketing/marketing.html'
            },
            "list@admin.marketing": {
              controller: 'AffiliatesCtrl as affiliatesCtrl',
              templateUrl: 'admin/marketing/affiliates.html'
            }
          }
        })
        .state('admin.marketing.affiliates', {
          url: '/affiliates',
          params: {
            rowEntity: null,
          },
          views: {
            "header@admin": {
              templateUrl: 'admin/marketing/affiliates.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/marketing/marketing.html'
            },
            "list@admin.marketing.affiliates": {
              controller: 'AffiliatesCtrl as affiliatesCtrl',
              templateUrl: 'admin/marketing/affiliates.html'
            }
          }
        })
        .state('admin.marketing.coupons', {
          url: '/coupons',
          views: {
            "header@admin": {
              templateUrl: 'admin/marketing/coupons.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/marketing/marketing.html'
            },
            "list@admin.marketing.coupons": {
              controller: 'CouponsCtrl as couponsCtrl',
              templateUrl: 'admin/marketing/coupons.html'
            }
          }
        })
        .state('admin.marketing.affiliate', {
          url: '/affiliate',
          params: {
            rowEntity: null,
          },
          views: {
            "header@admin": {
              templateUrl: 'admin/marketing/affiliate.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/marketing/marketing.html'
            },
            "list@admin.marketing.affiliate": {
              controller: 'AffiliateCtrl as affiliateCtrl',
              templateUrl: 'admin/marketing/affiliate.html'
            }
          }
        })
        // end marketing main menu
        // start extensions menu items
        .state('admin.extensions', {
            url: '/extensions',
            views: {
              "header@admin": {
                templateUrl: 'admin/extensions/extensions.header.html'
              },
              "main@admin": {
                templateUrl: 'admin/extensions/extensions.html'
              },
              "list@admin.extensions": {
                controller: 'ExtensionsCtrl as extensionsCtrl',
                templateUrl: 'admin/extensions/modules.html'
              }
            }
          })
          .state('admin.extensions.modules', {
            url: '/modules',
            views: {
              "header@admin": {
                templateUrl: 'admin/extensions/modules.header.html'
              },
              "main@admin": {
                templateUrl: 'admin/extensions/extensions.html'
              },
              "list@admin.extensions.modules": {
                controller: 'ExtensionsCtrl as extensionsCtrl',
                templateUrl: 'admin/extensions/modules.html'
              }
            }
          })
          .state('admin.extensions.shipping', {
            url: '/shipping',
            views: {
              "header@admin": {
                templateUrl: 'admin/extensions/shipping.header.html'
              },
              "main@admin": {
                templateUrl: 'admin/extensions/extensions.html'
              },
              "list@admin.extensions.shipping": {
                controller: 'ExtensionsCtrl as extensionsCtrl',
                templateUrl: 'admin/extensions/shipping.html'
              }
            }
          })
          .state('admin.extensions.payment', {
            url: '/payment',
            views: {
              "header@admin": {
                templateUrl: 'admin/extensions/payment.header.html'
              },
              "main@admin": {
                templateUrl: 'admin/extensions/extensions.html'
              },
              "list@admin.extensions.payment": {
                controller: 'ExtensionsCtrl as extensionsCtrl',
                templateUrl: 'admin/extensions/payment.html'
              }
            }
          })
          .state('admin.extensions.feeds', {
            url: '/feeds',
            views: {
              "header@admin": {
                templateUrl: 'admin/extensions/feeds.header.html'
              },
              "main@admin": {
                templateUrl: 'admin/extensions/extensions.html'
              },
              "list@admin.extensions.feeds": {
                controller: 'ExtensionsCtrl as extensionsCtrl',
                templateUrl: 'admin/extensions/feeds.html'
              }
            }
          })
        // end extensions menu
        // start system menu
        .state('admin.system', {
          url: '/system',
          views: {
            "header@admin": {
              templateUrl: 'admin/system/system.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/system/system.html'
            },
            "list@admin.system": {
              controller: 'UsersCtrl as usersCtrl',
              templateUrl: 'admin/system/users.html'
            }
          }
        })
        .state('admin.system.users', {
          url: '/users',
          views: {
            "header@admin": {
              templateUrl: 'admin/system/users.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/system/system.html'
            },
            "list@admin.system.users": {
              controller: 'UsersCtrl as usersCtrl',
              templateUrl: 'admin/system/users.html'
            }
          }
        })
        .state('admin.system.user', {
          url: '/user',
          params: {
            rowEntity: null,
          },
          views: {
            "header@admin": {
              templateUrl: 'admin/system/user.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/system/system.html'
            },
            "list@admin.system.user": {
              controller: 'UserCtrl as userCtrl',
              templateUrl: 'admin/system/user.html'
            }
          }
        })
        .state('admin.system.library', {
          url: '/library',
          views: {
            "header@admin": {
              templateUrl: 'admin/system/library.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/system/system.html'
            },
            "list@admin.system.library": {
              controller: 'LibraryCtrl as libraryCtrl',
              templateUrl: 'admin/system/library.html'
            }
          }
        })
        .state('admin.system.stores', {
          url: '/stores',
          params: {
            rowEntity: null,
          },
          views: {
            "header@admin": {
              templateUrl: 'admin/system/stores.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/system/system.html'
            },
            "list@admin.system.stores": {
              controller: 'StoresCtrl as storesCtrl',
              templateUrl: 'admin/system/stores.html'
            }
          }
        })
        .state('admin.system.store', {
          url: '/store',
          params: {
            rowEntity: null,
          },
          views: {
            "header@admin": {
              templateUrl: 'admin/system/store.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/system/system.html'
            },
            "list@admin.system.store": {
              controller: 'StoreCtrl as storeCtrl',
              templateUrl: 'admin/system/store.html'
            }
          }
        })
        .state('admin.system.banner', {
          url: '/banner',
          params: {
            rowEntity: null,
          },
          views: {
            "header@admin": {
              templateUrl: 'admin/system/banner.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/system/system.html'
            },
            "list@admin.system.banner": {
              controller: 'BannerCtrl as bannerCtrl',
              templateUrl: 'admin/system/banner.html'
            }
          }
        })
        // end system menu
        // start tools menu
        .state('admin.tools', {
          url: '/tools',
          views: {
            "header@admin": {
              templateUrl: 'admin/tools/tools.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/tools/tools.html'
            },
            "list@admin.tools": {
              controller: 'ToolImportCtrl as toolImportCtrl',
              templateUrl: 'admin/tools/import.products.html'
            }
          }
        })
        .state('admin.tools.import-products', {
          url: '/tools/import-products',
          views: {
            "header@admin": {
              templateUrl: 'admin/tools/import-products.header.html'
            },
            "main@admin": {
              templateUrl: 'admin/tools/tools.html'
            },
            "list@admin.tools.import-products": {
              controller: 'ToolImportCtrl as toolImportCtrl',
              templateUrl: 'admin/tools/import.products.html'
            }
          }
        })
        // end tools menu

        .state('admin.reports', {
          url: '',
          views: {
            "menu@admin": {
              controller: 'ReportsCtrl as reportsCtrl',
              templateUrl: 'admin/reports/reports.html'
            }
          }
        })
        .state('profile', {
          url: '/profile',
          controller: 'ProfileCtrl as profileCtrl',
          templateUrl: 'admin/users/profile.html',
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

        // start of product bootstrap tabs states Wow variable replaces Users service
        // for soem reason the onpage link needs a second service name in addition to Auth

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
        .state('productFeatured', {
          url: '/productFeatured',
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

        // end of product bootstrap tab states

        // start of categories bootstrap tab states

        .state('categoryList', {
          url: '/categoryList',
          controller: 'CategoriesCtrl as categoriesCtrl',
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
        .state('categoryBanners', {
          url: '/categoryBanners',
          controller: 'CategoriesCtrl as categoriesCtrl',
          resolve: {
            auth: function($state, Wow, Auth) {
              return Auth.$requireAuth().catch(function(){
                $state.go('home');
              });
            },
            profile: function(Auth){
              return Auth.$requireAuth();
            }
          }
        })

        // end of categories bootstrap tab state

        // start of sub-categories bootstrap tab states

        .state('subCats', {
          url: '/subCats',
          controller: 'SubCategoriesCtrl as subCategoriesCtrl',
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
        .state('subBanners', {
          url: '/subBanners',
          controller: 'SubCategoriesCtrl as subCategoriesCtrl',
          resolve: {
            auth: function($state, Wow, Auth) {
              return Auth.$requireAuth().catch(function(){
                $state.go('home');
              });
            },
            profile: function(Auth){
              return Auth.$requireAuth();
            }
          }
        })

        // end of sub-categories bootstrap tab state

        // start of customer bootstrap tab states

        .state('addressDefault', {
          url: '/addressDefault',
          controller: 'CustomersCtrl as customersCtrl',
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
        .state('address1', {
          url: '/address1',
          controller: 'CustomersCtrl as customersCtrl',
          resolve: {
            auth: function($state, Wow, Auth) {
              return Auth.$requireAuth().catch(function(){
                $state.go('home');
              });
            },
            profile: function(Auth){
              return Auth.$requireAuth();
            }
          }
        })
        .state('address2', {
          url: '/address2',
          controller: 'CustomersCtrl as customersCtrl',
          resolve: {
            auth: function($state, Wow, Auth) {
              return Auth.$requireAuth().catch(function(){
                $state.go('home');
              });
            },
            profile: function(Auth){
              return Auth.$requireAuth();
            }
          }
        })
        .state('address3', {
          url: '/address3',
          controller: 'CustomersCtrl as customersCtrl',
          resolve: {
            auth: function($state, Wow, Auth) {
              return Auth.$requireAuth().catch(function(){
                $state.go('home');
              });
            },
            profile: function(Wow, Auth){
              return Auth.$requireAuth().then(function(auth){
                return Wow.getProfile(auth.uid).$loaded();
              });
            }
          }
        })
        .state('address4', {
          url: '/address4',
          controller: 'CustomersCtrl as customersCtrl',
          resolve: {
            auth: function($state, Wow, Auth) {
              return Auth.$requireAuth().catch(function(){
                $state.go('home');
              });
            },
            profile: function(Auth){
              return Auth.$requireAuth();
            }
          }
        })
        .state('address5', {
          url: '/address5',
          controller: 'CustomersCtrl as customersCtrl',
          resolve: {
            auth: function($state, Wow, Auth) {
              return Auth.$requireAuth().catch(function(){
                $state.go('home');
              });
            },
            profile: function(Auth){
              return Auth.$requireAuth();
            }
          }
        })
        .state('address6', {
          url: '/address6',
          controller: 'CustomersCtrl as customersCtrl',
          resolve: {
            auth: function($state, Wow, Auth) {
              return Auth.$requireAuth().catch(function(){
                $state.go('home');
              });
            },
            profile: function(Auth){
              return Auth.$requireAuth();
            }
          }
        })
        .state('address7', {
          url: '/address7',
          controller: 'CustomersCtrl as customersCtrl',
          resolve: {
            auth: function($state, Wow, Auth) {
              return Auth.$requireAuth().catch(function(){
                $state.go('home');
              });
            },
            profile: function(Auth){
              return Auth.$requireAuth();
            }
          }
        })
        .state('address8', {
          url: '/address8',
          controller: 'CustomersCtrl as customersCtrl',
          resolve: {
            auth: function($state, Wow, Auth) {
              return Auth.$requireAuth().catch(function(){
                $state.go('home');
              });
            },
            profile: function(Auth){
              return Auth.$requireAuth();
            }
          }
        })
        .state('address9', {
          url: '/address9',
          controller: 'CustomersCtrl as customersCtrl',
          resolve: {
            auth: function($state, Wow, Auth) {
              return Auth.$requireAuth().catch(function(){
                $state.go('home');
              });
            },
            profile: function(Auth){
              return Auth.$requireAuth();
            }
          }
        })
        .state('address10', {
          url: '/address10',
          controller: 'CustomersCtrl as customersCtrl',
          resolve: {
            auth: function($state, Wow, Auth) {
              return Auth.$requireAuth().catch(function(){
                $state.go('home');
              });
            },
            profile: function(Auth){
              return Auth.$requireAuth();
            }
          }
        })

        // end of customer bootstrap tab state

}])
