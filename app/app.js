'use strict';

var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
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
    'angular-md5',
    'ui.rdash',
    'filereader',
    'ui.tinymce',
    'ui.select',
    'ui.grid.importer',
    'ui.grid.rowEdit'
  ])
  .constant('FirebaseUrl', 'https://ecomengine.firebaseio.com/')
  .constant('tid', '-K4zdSDMnu3vSyL069A1')

  .config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  })

  .directive("ngFileSelect",function() {
    return {
      link: function($scope,el) {
        el.bind("change", function(e) {
          $scope.file = (e.srcElement || e.target).files[0];
          $scope.getFile();
        })
      }
    }
  })
