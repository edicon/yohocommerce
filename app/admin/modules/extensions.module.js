'use strict';

angular.module('ExtensionsModule', [
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
    'ui.grid.selection'

])

.config(    ['$stateProvider', '$httpProvider',
    function( $stateProvider,   $httpProvider) {

      $stateProvider

          .state('admin.extensions', {
              url: '/extensions',
                  views: {
                    "header@admin": {
                        templateUrl: 'admin/views/extensions/extensions.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/extensions/extensions.html'
                    },
                    "list@admin.extensions": {
                        controller: 'ExtensionsCtrl as extensionsCtrl',
                        templateUrl: 'admin/views/extensions/modules.html'
                    }
                }
            })
            .state('admin.extensions.modules', {
                url: '/modules',
                views: {
                    "header@admin": {
                        templateUrl: 'admin/views/extensions/modules.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/extensions/extensions.html'
                    },
                    "list@admin.extensions.modules": {
                        controller: 'ExtensionsCtrl as extensionsCtrl',
                        templateUrl: 'admin/views/extensions/modules.html'
                    }
                }
            })
            .state('admin.extensions.shipping', {
                url: '/shipping',
                views: {
                    "header@admin": {
                        templateUrl: 'admin/views/extensions/shipping.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/extensions/extensions.html'
                    },
                    "list@admin.extensions.shipping": {
                        controller: 'ExtensionsCtrl as extensionsCtrl',
                        templateUrl: 'admin/views/extensions/shipping.html'
                    }
                }
            })
            .state('admin.extensions.payment', {
                url: '/payment',
                views: {
                    "header@admin": {
                        templateUrl: 'admin/views/extensions/payment.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/extensions/extensions.html'
                    },
                    "list@admin.extensions.payment": {
                        controller: 'ExtensionsCtrl as extensionsCtrl',
                        templateUrl: 'admin/views/extensions/payment.html'
                    }
                }
            })
            .state('admin.extensions.feeds', {
                url: '/feeds',
                views: {
                    "header@admin": {
                        templateUrl: 'admin/views/extensions/feeds.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/extensions/extensions.html'
                    },
                    "list@admin.extensions.feeds": {
                        controller: 'ExtensionsCtrl as extensionsCtrl',
                        templateUrl: 'admin/views/extensions/feeds.html'
                    }
                }
            })

      }

])

.controller('ExtensionsCtrl', ['$state', '$scope', '$stateParams',
      function (                $state,   $scope,   $stateParams) {
          var extensionsCtrl = this;

          extensionsCtrl.gridModules = {
              showGridFooter: true,
              enableSorting: true,
              enableCellEditOnFocus: true,
              enableFiltering: true,
          //    data: Modules.all,
              columnDefs: [
                  { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/extensions/gridTemplates/editModule.html',
                    width: 35, enableColumnMenu: false, headerTooltip: 'Edit', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
                  { name:'moduleName', field: 'module_name', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '50%' },
                  { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/extensions/gridTemplates/installModule.html',
                    width: 35, enableColumnMenu: false, headerTooltip: 'Install', enableCellEdit: false, enableCellEdit: false, enableFiltering: false }

              ]
          };

          extensionsCtrl.gridShipping = {
              showGridFooter: true,
              enableSorting: true,
              enableCellEditOnFocus: true,
              enableFiltering: true,
          //    data: Shipping.all,
              columnDefs: [
                  { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/extensions/gridTemplates/editShipper.html',
                    width: 35, enableColumnMenu: false, headerTooltip: 'Edit', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
                  { name:'shippingMethod', field: 'shipping_name', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '73%' },
                  { name:'shippingStatus', field: 'shipping_status', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '20%' },
                  { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/extensions/gridTemplates/installShipper.html',
                    width: 35, enableColumnMenu: false, headerTooltip: 'Install', enableCellEdit: false, enableCellEdit: false, enableFiltering: false }

              ]
          };

          extensionsCtrl.gridPayment = {
              showGridFooter: true,
              enableSorting: true,
              enableCellEditOnFocus: true,
              enableFiltering: true,
          //    data: Payments.all,
              columnDefs: [
                  { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/extensions/gridTemplates/editShipper.html',
                    width: 35, enableColumnMenu: false, headerTooltip: 'Edit', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
                  { name:'paymentMethod', field: 'payment_name', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '73%' },
                  { name:'paymentStatus', field: 'shipping_status', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '20%' },
                  { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/extensions/gridTemplates/installShipper.html',
                    width: 35, enableColumnMenu: false, headerTooltip: 'Install', enableCellEdit: false, enableCellEdit: false, enableFiltering: false }

              ]
          };

          extensionsCtrl.gridFeeds = {
              showGridFooter: true,
              enableSorting: true,
              enableCellEditOnFocus: true,
              enableFiltering: true,
          //    data: Payments.all,
              columnDefs: [
                  { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/extensions/gridTemplates/editFeed.html',
                    width: 35, enableColumnMenu: false, headerTooltip: 'Edit', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
                  { name:'feedName', field: 'feed_name', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '73%' },
                  { name:'feedStatus', field: 'feed_status', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '20%' },
                  { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/extensions/gridTemplates/installFeed.html',
                    width: 35, enableColumnMenu: false, headerTooltip: 'Install', enableCellEdit: false, enableCellEdit: false, enableFiltering: false }

              ]
          };

      }

])
