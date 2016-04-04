'use strict';

angular.module('ToolsModule', [
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

.config(    ['$stateProvider', '$httpProvider',
    function( $stateProvider,   $httpProvider) {

      $stateProvider

          .state('admin.reports', {
              url: '/reports',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/reports/reports.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/reports/reports.html'
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

        }

])
