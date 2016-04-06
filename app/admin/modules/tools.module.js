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

.config(    ['$stateProvider',
    function( $stateProvider) {

      $stateProvider

          .state('admin.tools', {
              url: '/tools',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/tools/tools.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/tools/tools.html'
                  },
                  "list@admin.tools": {
                      controller: 'ToolImportCtrl as toolImportCtrl',
                      templateUrl: 'admin/views/tools/import.products.html'
                  }
              }
          })
          .state('admin.tools.import-products', {
              url: '/tools/import-products',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/tools/import-products.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/tools/tools.html'
                  },
                  "list@admin.tools.import-products": {
                      controller: 'ToolImportCtrl as toolImportCtrl',
                      templateUrl: 'admin/views/tools/import.products.html'
                  }
              }
          })

      }

])

.controller('ToolImportCtrl', ['Products', '$scope',
      function (                Products,   $scope) {
          var toolImportCtrl = this;
          toolImportCtrl.data = [];
          $scope.data = [];

          $scope.gridOptions = {
              multiSelect: true,
              showGridFooter: true,
              enableGridMenu: true,
              enableSorting: false,
              enableColumnMenus: false,
              enableCellEditOnFocus: true,
              data: 'data',
              importerDataAddCallback: function ( grid, newObjects ) {
                $scope.data = $scope.data.concat( newObjects );
              },
              onRegisterApi: function(gridApi) {
                  $scope.gridApi = gridApi;
                  gridApi.rowEdit.on.saveRow($scope, function(rowEntity) {
                      Products.all.$add({$priority: rowEntity.Priority, product_name: rowEntity.Name, product_category: rowEntity.Category,
                        product_category_id: rowEntity.Categoryid, product_description: rowEntity.Description, product_image: 'Placeholder', product_price: rowEntity.Price,
                        product_status: rowEntity.Status, product_status_id: 1});
                  });
              }
          };

      }

])
