'use strict';

angular.module('ReportsModule', [
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
    'ui.grid.importer'

])

.config(    ['$stateProvider',
    function( $stateProvider) {

      $stateProvider

          .state('admin.reports', {
              url: '/reports',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/salesorders.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
                  },
                  "list@admin.reports": {
                      controller: 'ReportsCtrl as reportsCtrl',
                      templateUrl: 'admin/views/reports/salesorders.html'
                  }
              }
          })
          .state('admin.reports.salesorders', {
              url: '/salesorders',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/salesorders.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
                  },
                  "list@admin.reports.salesorders": {
                      controller: 'ReportsCtrl as reportsCtrl',
                      templateUrl: 'admin/views/reports/salesorders.html'
                  }
              }
          })
          .state('admin.reports.salestaxes', {
              url: '/salestaxes',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/salestaxes.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
                  },
                  "list@admin.reports.salestaxes": {
                      controller: 'ReportsCtrl as reportsCtrl',
                      templateUrl: 'admin/views/reports/salestaxes.html'
                  }
              }
          })
          .state('admin.reports.salesshipping', {
              url: '/salesshipping',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/salesshipping.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
                  },
                  "list@admin.reports.salesshipping": {
                      controller: 'ReportsCtrl as reportsCtrl',
                      templateUrl: 'admin/views/reports/salesshipping.html'
                  }
              }
          })
          .state('admin.reports.salesreturns', {
              url: '/salesreturns',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/salesreturns.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
                  },
                  "list@admin.reports.salesreturns": {
                      controller: 'ReportsCtrl as reportsCtrl',
                      templateUrl: 'admin/views/reports/salesreturns.html'
                  }
              }
          })
          .state('admin.reports.salescoupons', {
              url: '/salescoupons',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/salescoupons.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
                  },
                  "list@admin.reports.salescoupons": {
                      controller: 'ReportsCtrl as reportsCtrl',
                      templateUrl: 'admin/views/reports/salescoupons.html'
                  }
              }
          })
          .state('admin.reports.productsviewed', {
              url: '/productsviewed',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/productsviewed.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
                  },
                  "list@admin.reports.productsviewed": {
                      controller: 'ReportsCtrl as reportsCtrl',
                      templateUrl: 'admin/views/reports/productsviewed.html'
                  }
              }
          })
          .state('admin.reports.productspurchased', {
              url: '/productspurchased',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/productspurchased.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
                  },
                  "list@admin.reports.productspurchased": {
                      controller: 'ReportsCtrl as reportsCtrl',
                      templateUrl: 'admin/views/reports/productspurchased.html'
                  }
              }
          })
          .state('admin.reports.customersonline', {
              url: '/customersonline',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/customersonline.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
                  },
                  "list@admin.reports.customersonline": {
                      controller: 'ReportsCtrl as reportsCtrl',
                      templateUrl: 'admin/views/reports/customersonline.html'
                  }
              }
          })
          .state('admin.reports.customersactivity', {
              url: '/customersactivity',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/customersactivity.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
                  },
                  "list@admin.reports.customersactivity": {
                      controller: 'ReportsCtrl as reportsCtrl',
                      templateUrl: 'admin/views/reports/customersactivity.html'
                  }
              }
          })
          .state('admin.reports.customersorders', {
              url: '/customersorders',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/customersorders.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
                  },
                  "list@admin.reports.customersorders": {
                      controller: 'ReportsCtrl as reportsCtrl',
                      templateUrl: 'admin/views/reports/customersorders.html'
                  }
              }
          })
          .state('admin.reports.customersrewards', {
              url: '/customersrewards',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/customersrewards.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
                  },
                  "list@admin.reports.customersrewards": {
                      controller: 'ReportsCtrl as reportsCtrl',
                      templateUrl: 'admin/views/reports/customersrewards.html'
                  }
              }
          })
          .state('admin.reports.customerscredit', {
              url: '/customerscredit',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/customerscredit.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
                  },
                  "list@admin.reports.customerscredit": {
                      controller: 'ReportsCtrl as reportsCtrl',
                      templateUrl: 'admin/views/reports/customerscredit.html'
                  }
              }
          })

  }


])

.controller('ReportsCtrl', ['Orders', '$state', '$scope', '$stateParams',
        function (           Orders,   $state,   $scope,   $stateParams) {
              var reportsCtrl = this;

              reportsCtrl.gridOrders = {
                    enableSorting: true,
                    enableCellEditOnFocus: false,
                    enableFiltering: true,
            //        data: Orders.all,
                    columnDefs: [
                          { name:'dateStart', field: 'date_start',enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '15%' },
                          { name:'dateEnd', field: 'date_end', enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '15%' },
                          { name:'orderCode', field: '$id', enableHiding: false, enableFiltering: false, enableCellEdit: false },
                          { name:'status', field: 'order_status', enableHiding: false, enableFiltering: true, width: '10%', enableCellEdit: false },
                          { name:'tax', field: 'order_tax', enableHiding: false, enableFiltering: true, width: '10%', enableCellEdit: false },
                          { name:'total', field: 'order_total', enableHiding: false, enableFiltering: true, width: '10%', enableCellEdit: false },
                    ]
              };

              reportsCtrl.gridTaxes = {
                    enableSorting: true,
                    enableCellEditOnFocus: false,
                    enableFiltering: true,
            //        data: Orders.all,
                    columnDefs: [
                          { name:'dateStart', field: 'date_start',enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '15%' },
                          { name:'dateEnd', field: 'date_end', enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '15%' },
                          { name:'taxName', field: 'tax_name', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'orders', field: 'order_count', enableHiding: false, enableFiltering: false, width: '15%', enableCellEdit: false },
                          { name:'total', field: 'order_total', enableHiding: false, enableFiltering: false, width: '15%', enableCellEdit: false },
                    ]
              };

              reportsCtrl.gridShipping = {
                    enableSorting: true,
                    enableCellEditOnFocus: false,
                    enableFiltering: true,
            //        data: Orders.all,
                    columnDefs: [
                          { name:'dateStart', field: 'date_start',enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '15%' },
                          { name:'dateEnd', field: 'date_end', enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '15%' },
                          { name:'shippingName', field: 'shipping_name', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'orders', field: 'order_count', enableHiding: false, enableFiltering: false, width: '15%', enableCellEdit: false },
                    ]
              };

              reportsCtrl.gridReturns = {
                    enableSorting: true,
                    enableCellEditOnFocus: false,
                    enableFiltering: true,
            //        data: Orders.all,
                    columnDefs: [
                          { name:'dateStart', field: 'date_start',enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '15%' },
                          { name:'dateEnd', field: 'date_end', enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '15%' },
                          { name:'returns', field: 'return_count', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                    ]
              };

              reportsCtrl.gridCoupons = {
                    enableSorting: true,
                    enableCellEditOnFocus: false,
                    enableFiltering: true,
            //        data: Orders.all,
                    columnDefs: [
                          { name:'couponName', field: 'coupon_name', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'couponCode', field: '$id', enableHiding: false, enableFiltering: false, enableCellEdit: false },
                          { name:'orders', field: 'order_count', enableHiding: false, enableFiltering: true, width: '15%', enableCellEdit: false },
                          { name:'total', field: 'order_total', enableHiding: false, enableFiltering: true, width: '15%', enableCellEdit: false },
                    ]
              };

              reportsCtrl.gridViewed = {
                    enableSorting: true,
                    enableCellEditOnFocus: false,
                    enableFiltering: true,
            //        data: Orders.all,
                    columnDefs: [
                          { name:'productName', field: 'product_name', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'views', field: 'view_count', enableHiding: false, enableFiltering: true, width: '15%', enableCellEdit: false },
                          { name:'percent', field: 'view_percent', enableHiding: false, enableFiltering: false, width: '15%', enableCellEdit: false },
                    ]
              };

              reportsCtrl.gridPurchased = {
                    enableSorting: true,
                    enableCellEditOnFocus: false,
                    enableFiltering: true,
            //        data: Orders.all,
                    columnDefs: [
                          { name:'customerName', field: 'customer_name', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'quantity', field: 'purchase_count', enableHiding: false, enableFiltering: false, width: '15%', enableCellEdit: false },
                          { name:'total', field: 'purchase_total', enableHiding: false, enableFiltering: false, width: '15%', enableCellEdit: false },
                    ]
              };

              reportsCtrl.gridOnline = {
                    enableSorting: true,
                    enableCellEditOnFocus: false,
                    enableFiltering: true,
            //        data: Orders.all,
                    columnDefs: [
                          { name:'iP', field: 'customer_ip', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'customerName', field: 'customer_name', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'lastPageVisited', field: 'last_page_visited', enableHiding: false, enableFiltering: false, width: '15%', enableCellEdit: false },
                          { name:'referer', field: 'customer_referer', enableHiding: false, enableFiltering: false, width: '15%', enableCellEdit: false },
                          { name:'lastClick', field: 'last_click', enableHiding: false, enableFiltering: false, width: '15%', enableCellEdit: false },
                          { name:'action', field: 'action', enableHiding: false, enableFiltering: false, width: '15%', enableCellEdit: false },
                    ]
              };

              reportsCtrl.gridActivity = {
                    enableSorting: true,
                    enableCellEditOnFocus: false,
                    enableFiltering: true,
            //        data: Orders.all,
                    columnDefs: [
                          { name:'comment', field: 'customer_activity', enableHiding: false, enableFiltering: false, enableCellEdit: false },
                          { name:'iP', field: 'customer_ip', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'dateAdded', field: 'activity_date', enableHiding: false, enableFiltering: true, width: '15%', enableCellEdit: false },
                    ]
              };

              reportsCtrl.gridCustomerOrders = {
                    enableSorting: true,
                    enableCellEditOnFocus: false,
                    enableFiltering: true,
            //        data: Orders.all,
                    columnDefs: [
                          { name:'customerName', field: 'customer_name', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'Email', field: 'customer_email', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'customerGroup', field: 'customer_group', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'status', field: 'customer_status', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'orders', field: 'customer_orders', enableHiding: false, enableFiltering: false, width: '10%', enableCellEdit: false },
                          { name:'products', field: 'customer_products', enableHiding: false, enableFiltering: false, width: '10%', enableCellEdit: false },
                          { name:'total', field: 'customer_total', enableHiding: false, enableFiltering: false, width: '10%', enableCellEdit: false },
                    ]
              };

              reportsCtrl.gridRewards = {
                    enableSorting: true,
                    enableCellEditOnFocus: false,
                    enableFiltering: true,
            //        data: Orders.all,
                    columnDefs: [
                          { name:'customerName', field: 'customer_name', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'Email', field: 'customer_email', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'customerGroup', field: 'customer_group', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'status', field: 'customer_status', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'rewardPoints', field: 'customer_rewards', enableHiding: false, enableFiltering: false, enableCellEdit: false },
                          { name:'orders', field: 'customer_orders', enableHiding: false, enableFiltering: false, width: '10%', enableCellEdit: false },
                          { name:'total', field: 'customer_total', enableHiding: false, enableFiltering: false, width: '10%', enableCellEdit: false },
                    ]
              };

              reportsCtrl.gridCredit = {
                    enableSorting: true,
                    enableCellEditOnFocus: false,
                    enableFiltering: true,
            //        data: Orders.all,
                    columnDefs: [
                          { name:'customerName', field: 'customer_name', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'Email', field: 'customer_email', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'customerGroup', field: 'customer_group', enableHiding: false, enableFiltering: true, enableCellEdit: false },
                          { name:'status', field: 'customer_status', enableHiding: false, enableFiltering: true, width: '15%', enableCellEdit: false },
                          { name:'total', field: 'customer_credit_total', enableHiding: false, enableFiltering: false, width: '10%', enableCellEdit: false },
                    ]
              };

        }

])
