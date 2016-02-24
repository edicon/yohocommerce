app.controller('ProductsCtrl', ['Products', 'Categories', '$state', '$scope', '$stateParams', 'uiGridConstants',
  function (                     Products,   Categories,   $state,   $scope,   $stateParams,   uiGridConstants) {
    var productsCtrl = this;
    productsCtrl.listButtons = true;
    $scope.file = {};
    productsCtrl.productTabActive = "active";

    productsCtrl.showListBtns = function() {
      productsCtrl.listButtons = true;
    };

    productsCtrl.showFeatureBtns = function() {
      productsCtrl.listButtons = false;
    };

    if ($stateParams.tabEntity === 1) {
      productsCtrl.showFeatureBtns();
      productsCtrl.featureTabActive = "active";
      productsCtrl.productTabActive = "";
    }

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
        { name: '', field: '$id', shown: false, cellTemplate: 'admin/catalogs/gridTemplates/editProduct.html',
          width: 34, enableColumnMenu: false, headerTooltip: 'Edit Product', enableCellEdit: false, enableFiltering: false },
        { name:'name', field: 'product_name', enableHiding: false, width: '40%' },
        { name:'category', field: 'product_category', enableHiding: false, width: '20%', enableCellEdit: false },
        { name: 'product_status_id', displayName: 'Status', editableCellTemplate: 'ui-grid/dropdownEditor', width: '15%',
          cellFilter: 'mapStatus', editDropdownValueLabel: 'status', enableFiltering: false, editDropdownOptionsArray: [
            { id: 1, status: 'Enabled' },
            { id: 2, status: 'Disabled' }
          ]},
        { name:'price', field: 'product_price', type: 'number', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'currency' },
        { name: ' ', field: '$id', cellTemplate:'admin/catalogs/gridTemplates/removeProduct.html',
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

}])

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
});
