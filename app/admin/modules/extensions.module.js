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
                        templateUrl: 'admin/views/extensions/extensionlist.html'
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
                        controller: 'ExtensionCtrl as extensionCtrl',
                        templateUrl: 'admin/views/extensions/aws-s3.html'
                    }
                }
            })

      }

])

.factory('Extensions', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (      $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'extensions');
          var extensions = $firebaseArray(ref.child(tid));

          var extension = {

              addExtension: function(obj) {
                  var theRef = new Firebase(FirebaseUrl+'extensions/'+tid);
                  return theRef.push(obj);
              },

              getExtension: function(id) {
                  var theRef = new Firebase(FirebaseUrl+'extensions/'+tid+'/'+id);
                  return $firebaseObject(theRef);
              },

              removeExtension: function(id) {
                  var theRef = new Firebase(FirebaseUrl+'extensions/'+tid+'/'+id);
                  return theRef.remove();
              },

              getS3: function() {
                  var theRef = new Firebase(FirebaseUrl+'extensions/'+tid+'/aws-s3/');
                  return $firebaseObject(theRef);
              },

              updateS3: function(obj) {
                  var theRef = new Firebase(FirebaseUrl+'extensions/'+tid+'/aws-s3/');
                  return theRef.update(obj);
  //                return theRef.update( {s3_url: obj.s3_url, access_key_id: obj.access_key_id, acl: obj.acl,
  //                    success_redirect_url: obj.success_redirect_url, policy_key: obj.policy_key, signature_key: obj.signature_key} );
              },

              all: extensions

          };

          return extension;

      }

])

.controller('ExtensionsCtrl', ['Extensions', '$state', '$scope',
      function (                Extensions,   $state,   $scope) {
            var extensionsCtrl = this;

            extensionsCtrl.gridExtensions = {
                showGridFooter: true,
                enableSorting: true,
                enableCellEditOnFocus: true,
                enableFiltering: true,
                data: Extensions.all,
                columnDefs: [
                    { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/extensions/gridTemplates/editExtension.html',
                      width: 35, enableColumnMenu: false, headerTooltip: 'Edit', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
                    { name:'extensionName', field: 'extension_name', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '30%' },
                    { name:'extensionTemplate', field: 'extension_template', enableHiding: false, enableFiltering: false, enableCellEdit: false },
                    { name: ' ', field: '$id', shown: false, cellTemplate: 'admin/views/extensions/gridTemplates/removeExtension.html',
                      width: 35, enableColumnMenu: false, headerTooltip: 'Delete', enableCellEdit: false, enableCellEdit: false, enableFiltering: false }
                ]
            };

            extensionsCtrl.removeExtension = function(row) {
                  ExtensionsCtrl.removeExtension(row.entity.$id);
            }, function(error) {
                  extensionsCtrl.error = error;
            };

            extensionsCtrl.addExtension = function() {
                  Extensions.addExtension(extensionsCtrl.extension);
                  extensionsCtrl.extension_name = null;
                  extensionsCtrl.extension_template = null;
            }, function(error) {
                  extensionsCtrl.error = error;
            };

            extensionsCtrl.editExtension = function(row) {
                  var theExtension = Extensions.getExtension(row.entity.$id);
                      theExtension.$loaded().then(function() {
                            $state.go('admin.extensions.' + theExtension.extension_template);
                      });
            };

            extensionsCtrl.updateExtension = function() {
                  Extensions.updateS3(extensionsCtrl.s3);
            }, function(error) {
                  extensionsCtrl.error = error;
            };

      }

])

.controller('ExtensionCtrl', ['Extensions',
      function (               Extensions) {
            var extensionCtrl = this;

            var s3 = Extensions.getS3();
                s3.$loaded().then(function() {
                    extensionCtrl.s3 = s3;
                });

            extensionCtrl.updateS3 = function() {
                  Extensions.updateS3(extensionCtrl.s3);
            }, function(error) {
                  extensionCtrl.error = error;
            };

      }

])
