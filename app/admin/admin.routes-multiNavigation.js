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
            "main@admin": {
              templateUrl: 'admin/catalogs/catalogs.html'
            },
            "list@admin.catalogs": {
              templateUrl: 'admin/catalogs/admin.products.html'
            }
          }
        })
        .state('admin.catalogs.products', {
          url: '/products',
          views: {
            "main@admin": {
              controller: 'ProductCtrl as productCtrl',
              templateUrl: 'admin/catalogs/catalogs.html'
            },
            "list@admin.catalogs.products": {
              controller: 'ProductCtrl as productCtrl',
              templateUrl: 'admin/catalogs/admin.products.html'
            }
          }
        })
        .state('admin.catalogs.product', {
          url: '/product',
          views: {
            "main@admin": {
              controller: 'ProductCtrl as productCtrl',
              templateUrl: 'admin/catalogs/catalogs.html'
            },
            "list@admin.catalogs.product": {
              controller: 'ProductCtrl as productCtrl',
              templateUrl: 'admin/catalogs/admin.product.html'
            }
          }
        })
        .state('admin.catalogs.categories', {
          url: '/categories',
          views: {
            "main@admin": {
              controller: 'CategoriesCtrl as categoriesCtrl',
              templateUrl: 'admin/catalogs/catalogs.html'
            },
            "list@admin.catalogs.categories": {
              controller: 'CategoriesCtrl as categoriesCtrl',
              templateUrl: 'admin/catalogs/categories.html'
            }
          }
        })
        .state('admin.catalogs.category', {
          url: '/category',
          params: {
            rowEntity: null,
          },
          views: {
            "main@admin": {
              controller: 'CategoryCtrl as categoryCtrl',
              templateUrl: 'admin/catalogs/catalogs.html'
            },
            "list@admin.catalogs.category": {
              controller: 'CategoryCtrl as categoryCtrl',
              templateUrl: 'admin/catalogs/category.html'
            }
          }
        })
        .state('admin.catalogs.vendors', {
          url: '/vendors',
          views: {
            "main@admin": {
              controller: 'VendorCtrl as vendorCtrl',
              templateUrl: 'admin/catalogs/catalogs.html'
            },
            "list@admin.catalogs.vendors": {
              controller: 'VendorCtrl as vendorCtrl',
              templateUrl: 'admin/catalogs/admin.vendors.html'
            }
          }
        })
        .state('admin.catalogs.vendor', {
          url: '/vendor',
          views: {
            "main@admin": {
              controller: 'VendorCtrl as vendorCtrl',
              templateUrl: 'admin/catalogs/catalogs.html'
            },
            "list@admin.catalogs.vendor": {
              controller: 'VendorCtrl as vendorCtrl',
              templateUrl: 'admin/catalogs/admin.vendor.html'
            }
          }
        })
        // end catalog main page
        // start catalog menu items
        .state('admin.products', {
          url: '/products',
          views: {
            "header@admin": {
              templateUrl: 'admin/catalogs/admin.products.header.html'
            },
            "main@admin": {
              controller: 'ProductCtrl as productCtrl',
              templateUrl: 'admin/catalogs/admin.products.html'
            }
          }
        })
        .state('admin.products.product', {
          url: '/product',
          views: {
            "header@admin": {
              templateUrl: 'admin/catalogs/admin.product.header.html'
            },
            "main@admin": {
              controller: 'ProductCtrl as productCtrl',
              templateUrl: 'admin/catalogs/admin.product.html'
            }
          }
        })
        .state('admin.categories', {
          url: '/categories',
          views: {
            "header@admin": {
              templateUrl: 'admin/catalogs/categories.header.html'
            },
            "main@admin": {
              controller: 'CategoriesCtrl as categoriesCtrl',
              templateUrl: 'admin/catalogs/categories.html'
            }
          }
        })
        .state('admin.categories.category', {
          url: '/category',
          params: {
            rowEntity: null,
          },
          views: {
            "header@admin": {
              templateUrl: 'admin/catalogs/category.header.html'
            },
            "main@admin": {
              controller: 'CategoryCtrl as categoryCtrl',
              templateUrl: 'admin/catalogs/category.html'
            }
          }
        })
        .state('admin.vendors', {
          url: '/vendors',
          views: {
            "header@admin": {
              templateUrl: 'admin/catalogs/admin.vendors.header.html'
            },
            "main@admin": {
              controller: 'AdminCatalogCtrl as adminCatalogCtrl',
              templateUrl: 'admin/catalogs/admin.vendors.html'
            }
          }
        })
        .state('admin.vendors.vendor', {
          url: '/vendor',
          views: {
            "header@admin": {
              templateUrl: 'admin/catalogs/admin.vendor.header.html'
            },
            "main@admin": {
              controller: 'AdminCatalogCtrl as adminCatalogCtrl',
              templateUrl: 'admin/catalogs/admin.vendor.html'
            }
          }
        })
        // end catalog menu items
        // start sales main menu
        .state('admin.sales', {
          url: '/sales',
          views: {
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.sales.html'
            },
            "list@admin.sales": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.orders.html'
            }
          }
        })
        .state('admin.sales.orders', {
          url: '/orders',
          views: {
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.sales.html'
            },
            "list@admin.sales.orders": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.orders.html'
            }
          }
        })
        .state('admin.sales.returns', {
          url: '/returns',
          views: {
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.sales.html'
            },
            "list@admin.sales.returns": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.returns.html'
            }
          }
        })
        .state('admin.sales.customers', {
          url: '/customers',
          views: {
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.sales.html'
            },
            "list@admin.sales.customers": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.customers.html'
            }
          }
        })
        .state('admin.sales.vouchers', {
          url: '/vouchers',
          views: {
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.sales.html'
            },
            "list@admin.sales.vouchers": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.vouchers.html'
            }
          }
        })
        .state('admin.sales.order', {
          url: '/order',
          views: {
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.sales.html'
            },
            "list@admin.sales.order": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.orders.html'
            }
          }
        })
        .state('admin.sales.return', {
          url: '/return',
          views: {
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.sales.html'
            },
            "list@admin.sales.return": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.returns.html'
            }
          }
        })
        .state('admin.sales.customer', {
          url: '/customer',
          views: {
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.sales.html'
            },
            "list@admin.sales.customer": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.customers.html'
            }
          }
        })
        .state('admin.sales.voucher', {
          url: '/voucher',
          views: {
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.sales.html'
            },
            "list@admin.sales.voucher": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.vouchers.html'
            }
          }
        })
        // end sales main menu
        // start sales menu items
        .state('admin.orders', {
          url: '/orders',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/admin.orders.header.html'
            },
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.orders.html'
            }
          }
        })
        .state('admin.orders.order', {
          url: '/order',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/admin.order.header.html'
            },
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.order.html'
            }
          }
        })
        .state('admin.returns', {
          url: '/returns',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/admin.returns.header.html'
            },
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.returns.html'
            }
          }
        })
        .state('admin.returns.return', {
          url: '/return',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/admin.return.header.html'
            },
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.return.html'
            }
          }
        })
        .state('admin.customers', {
          url: '/customers',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/admin.customers.header.html'
            },
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.customers.html'
            }
          }
        })
        .state('admin.customers.customer', {
          url: '/customer',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/admin.customer.header.html'
            },
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.customer.html'
            }
          }
        })
        .state('admin.vouchers', {
          url: '/vouchers',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/admin.vouchers.header.html'
            },
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.vouchers.html'
            }
          }
        })
        .state('admin.vouchers.voucher', {
          url: '/voucher',
          views: {
            "header@admin": {
              templateUrl: 'admin/sales/admin.voucher.header.html'
            },
            "main@admin": {
              controller: 'SalesCtrl as salesCtrl',
              templateUrl: 'admin/sales/admin.voucher.html'
            }
          }
        })
        // end sales menu items
        // start marketing main menu
        .state('admin.marketing', {
          url: '/marketing',
          views: {
            "main@admin": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.marketing.html'
            },
            "list@admin.marketing": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.affiliates.html'
            }
          }
        })
        .state('admin.marketing.affiliates', {
          url: '/affiliates',
          views: {
            "main@admin": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.marketing.html'
            },
            "list@admin.marketing.affiliates": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.affiliates.html'
            }
          }
        })
        .state('admin.marketing.coupons', {
          url: '/coupons',
          views: {
            "main@admin": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.marketing.html'
            },
            "list@admin.marketing.coupons": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.coupons.html'
            }
          }
        })
        .state('admin.marketing.affiliate', {
          url: '/affiliate',
          views: {
            "main@admin": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.marketing.html'
            },
            "list@admin.marketing.affiliate": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.affiliate.html'
            }
          }
        })
        .state('admin.marketing.coupon', {
          url: '/coupon',
          views: {
            "main@admin": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.marketing.html'
            },
            "list@admin.marketing.coupon": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.coupon.html'
            }
          }
        })
        // end marketing main menu
        // start marketing menu items
        .state('admin.affiliates', {
          url: '/affiliates',
          views: {
            "header@admin": {
              templateUrl: 'admin/marketing/admin.affiliates.header.html'
            },
            "main@admin": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.affiliates.html'
            }
          }
        })
        .state('admin.affiliates.affiliate', {
          url: '/affiliate',
          views: {
            "header@admin": {
              templateUrl: 'admin/marketing/admin.affiliate.header.html'
            },
            "main@admin": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.affiliate.html'
            }
          }
        })
        .state('admin.coupons', {
          url: '/coupons',
          views: {
            "header@admin": {
              templateUrl: 'admin/marketing/admin.coupons.header.html'
            },
            "main@admin": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.coupons.html'
            }
          }
        })
        .state('admin.coupons.coupon', {
          url: '/coupon',
          views: {
            "header@admin": {
              templateUrl: 'admin/marketing/admin.coupon.header.html'
            },
            "main@admin": {
              controller: 'MarketingCtrl as marketingCtrl',
              templateUrl: 'admin/marketing/admin.coupon.html'
            }
          }
        })
        // end marketing menu items
        // start extensions menu items
        .state('admin.extensions', {
          url: '',
          views: {
            "main@admin": {
              controller: 'ExtensionsCtrl as extensionsCtrl',
              templateUrl: 'admin/extensions/admin.extensions.html'
            }
          }
        })
        // end extensions menu items
        // start system main menu
        .state('admin.system', {
          url: '/system',
          views: {
            "main@admin": {
              controller: 'SystemCtrl as systemCtrl',
              templateUrl: 'admin/system/admin.system.html'
            },
            "list@admin.system": {
              controller: 'SystemCtrl as systemCtrl',
              templateUrl: 'admin/system/admin.stores.html'
            }
          }
        })

        .state('admin.store', {
          url: '',
          views: {
            "main@admin": {
              controller: 'SystemCtrl as systemCtrl',
              templateUrl: 'admin/system/admin.store.html'
            }
          }

        })
        .state('admin.reports', {
          url: '',
          views: {
            "main@admin": {
              controller: 'ReportsCtrl as reportsCtrl',
              templateUrl: 'admin/reports/admin.reports.html'
            }
          }

        })

      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'admin/users/profile.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('home');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      });
    }
])
