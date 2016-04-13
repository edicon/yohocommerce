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
            .state('admin.extensions.aws-s3', {
                url: '/aws-s3',
                views: {
                    "header@admin": {
                        templateUrl: 'admin/views/extensions/aws-s3.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/extensions/extensions.html'
                    },
                    "list@admin.extensions.aws-s3": {
                        controller: 'ModulesCtrl as modulesCtrl',
                        templateUrl: 'admin/views/extensions/aws-s3.html'
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

.factory('Modules', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (      $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'modules');
          var modules = $firebaseArray(ref.child(tid));

          var module = {

              addModule: function(obj) {
                  var theRef = new Firebase(FirebaseUrl+'modules/'+tid);
                  return theRef.push(obj);
              },

              getModule: function(id) {
                var theRef = new Firebase(FirebaseUrl+'modules/'+tid+'/'+id);
                return $firebaseObject(theRef);
              },

              removeModule: function(id) {
                  var theRef = new Firebase(FirebaseUrl+'modules/'+tid+'/'+id);
                  return theRef.remove();
              },

              updateS3: function(obj) {
                  var theRef = new Firebase(FirebaseUrl+'modules/'+tid+'/'+obj.mid+'/parameters/');
                  return theRef.update( {s3_url: obj.s3_url, access_key_id: obj.access_key_id, acl: obj.acl
                      success_redirect_url: obj.success_redirect_url, policy_key: obj.policy_key, signature_key: obj.signature_key} );
              },

              all: modules,

          };

          return module;

      }

])

.factory('ShippingOptions', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (              $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'shipping_options');
          var shippingoptions = $firebaseArray(ref.child(tid));

          var shippingoption = {

              addShippingOption: function(obj) {
                  var theRef = new Firebase(FirebaseUrl+'shipping_options/'+tid);
                  return theRef.push(obj);
              },

              removeShippingOption: function(id) {
                  var theRef = new Firebase(FirebaseUrl+'shipping_options/'+tid+'/'+id);
                  return theRef.remove();
              },

              all: shippingoptions,

          };

          return shippingoption;

      }

])

.controller('ExtensionsCtrl', ['ShippingOptions', 'Modules', '$state', '$scope', '$stateParams',
      function (                ShippingOptions,   Modules,   $state,   $scope,   $stateParams) {
          var extensionsCtrl = this;

          extensionsCtrl.gridModules = {
              showGridFooter: true,
              enableSorting: true,
              enableCellEditOnFocus: true,
              enableFiltering: true,
              data: Modules.all,
              columnDefs: [
                  { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/extensions/gridTemplates/editModule.html',
                    width: 35, enableColumnMenu: false, headerTooltip: 'Edit', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
                  { name:'moduleName', field: 'module_name', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '30%' },
                  { name:'moduleTemplate', field: 'module_template', enableHiding: false, enableFiltering: false, enableCellEdit: false },
                  { name: ' ', field: '$id', shown: false, cellTemplate: 'admin/views/extensions/gridTemplates/removeModule.html',
                    width: 35, enableColumnMenu: false, headerTooltip: 'Delete', enableCellEdit: false, enableCellEdit: false, enableFiltering: false }
              ]
          };

          extensionsCtrl.removeModule = function(row) {
                Modules.removeModule(row.entity.$id);
          }, function(error) {
                extensionsCtrl.error = error;
          };

          extensionsCtrl.addModule = function() {
                Modules.addModule(extensionsCtrl.module);
                extensionsCtrl.module_name = null;
                extensionsCtrl.module_template = null;
          }, function(error) {
                extensionsCtrl.error = error;
          };

          extensionsCtrl.editModule = function(row) {
                var theModule = Modules.getModule(row.entity.$id);
                    theModule.$loaded().then(function() {
                          $state.go('admin.extensions.' + theModule.module_template);
                    });
          };

          extensionsCtrl.addShippingOption = function() {
                ShippingOptions.addShippingOption(extensionsCtrl.shipping_option);
                extensionsCtrl.shipping_option.shipping_name = null;
                extensionsCtrl.shipping_option.shipping_cost = null;
          }, function(error) {
                extensionsCtrl.error = error;
          };

          extensionsCtrl.removeShippingOption = function(row) {
                ShippingOptions.removeShippingOption(row.entity.$id);
          }, function(error) {
                extensionsCtrl.error = error;
          };

          extensionsCtrl.gridShipping = {
                enableSorting: true,
                enableCellEditOnFocus: true,
                data: ShippingOptions.all,
                columnDefs: [
                      { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/extensions/gridTemplates/editShipper.html',
                        width: 35, enableColumnMenu: false, headerTooltip: 'Edit', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
                      { name:'ShippingMethod', field: 'shipping_name', enableHiding: false },
                      { name:'ShippingCost', field: 'shipping_cost', type: 'number', cellClass: 'grid-align-right', cellFilter: 'currency',enableHiding: false },
                      { name: ' ', field: '$id', cellTemplate:'admin/views/extensions/gridTemplates/removeShippingOption.html',
                        width: 35, enableCellEdit: false, enableColumnMenu: false }
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

.controller('ModulesCtrl', ['Modules', '$state', '$scope', '$stateParams',
      function (             Modules,   $state,   $scope,   $stateParams) {
          var modulesCtrl = this;

          modulesCtrl.updateLine = function() {
                Modules.updateS3(catalogCtrl.s3);
          }, function(error) {
                catalogCtrl.error = error;
          };

      }

])
