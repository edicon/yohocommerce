app.controller('ProductsCtrl', ['Products', 'Catagories', '$state', '$scope', '$stateParams', 'FileReader',
  function (                     Products,   Catagories,   $state,   $scope,   $stateParams,   FileReader) {
    var productsCtrl = this;
    productsCtrl.listButtons = true;
    $scope.file = {};
    productsCtrl.productTabActive = "active";

    productsCtrl.showListBtns = function() {
      productsCtrl.listButtons = true;
      productsCtrl.featureButtons = false;
    };

    productsCtrl.showFeatureBtns = function() {
      productsCtrl.featureButtons = true;
      productsCtrl.listButtons = false;
    };

    if ($stateParams.tabEntity === 1) {
      productsCtrl.showFeatureBtns();
      productsCtrl.featureTabActive = "active";
      productsCtrl.productTabActive = "";
    }

    productsCtrl.gridOpts = {
      enableRowSelection: true,
      enableSelectAll: true,
      selectionRowHeaderWidth: 35,
      enableSorting: true,
      enableCellEditOnFocus: true,
      data: Products.all,
      columnDefs: [
        { name: '', field: '$id', shown: false, cellTemplate: 'admin/catalogs/gridTemplates/editProductBtn.html',
          width: 34, enableColumnMenu: false, headerTooltip: 'Edit Product', enableCellEdit: false },
  //      { name: 'productImage', shown: false, cellTemplate: 'admin/catalogs/gridTemplates/productImage.html',
  //        width: 34, enableColumnMenu: false, enableCellEdit: false},
        { name:'productName', field: 'product_name', enableHiding: false, width: '40%' },
        { name:'productCatagory', field: 'product_catagory', enableHiding: false, width: '20%' },
  //    can't get the filter working to map the proper id and name
  //      { name: 'catagory_id', displayName: 'Catagory', editableCellTemplate: 'ui-grid/dropdownEditor',
  //        editDropdownValueLabel: 'catagory_name', editDropdownRowEntityOptionsArrayPath: 'catagories', width: '20%' },

        { name: 'product_status_id', displayName: 'Status', editableCellTemplate: 'ui-grid/dropdownEditor', width: '15%',
          cellFilter: 'mapStatus', editDropdownValueLabel: 'status', editDropdownOptionsArray: [
            { id: 1, status: 'Enabled' },
            { id: 2, status: 'Disabled' }
          ]},
        { name:'price', field: 'product_price', enableHiding: false },
        { name: ' ', field: '$id', cellTemplate:'admin/catalogs/gridTemplates/removeProductBtn.html',
          width: 32, enableColumnMenu: false, enableCellEdit: false }
      ]
    };


/* build the data for the catagory pulldown
    var data = Products.all;
    var cats = Catagories.all;
    data.$loaded().then(function() {
      for(i = 0; i < data.length; i++) {
        data[i].catagories = Catagories.all;
        for(x = 0; x < data[i].catagories.length; x++) {
          console.log(data[i].catagories[x].$id)
          data[i].catagories[x]["id"] = data[i].catagories[x]["catagory_id"]
        }
        x = 0;
      }
      productsCtrl.gridOpts.data = data;
    });
*/
    productsCtrl.removeProduct = function(row) {
      Products.removeProduct(row.entity);
    }, function(error) {
      ProductsCtrl.error = error;
    };

    productsCtrl.editProduct = function(row) {
      $state.go('admin.catalogs.product', {'rowEntity': row.entity});
    };

    productsCtrl.gridOpts.onRegisterApi = function(gridApi) {
      $scope.gridApi = gridApi;
        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, newValue, oldValue) {
          if (rowEntity.product_price === undefined)
            rowEntity.product_price = null;
          if (newValue != oldValue) {
            var currentProduct = Products.getProduct(rowEntity);
            currentProduct.product_name = rowEntity.product_name;
            currentProduct.product_price = rowEntity.product_price;
//            currentProduct.product_catagory_id = rowEntity.catagory_id; - this row came from the catagory puldown
            currentProduct.product_status_id = rowEntity.product_status_id;
            if (rowEntity.product_status_id === 1)
              currentProduct.product_status = "1";
            else {
              currentProduct.product_status = "2";
            }
            console.log(currentProduct)
            currentProduct.$save();
          }
        }, function(error) {
          ProductsCtrl.error = error;
      });
    };

}])
/*
.filter('mapCatagory', function() {
  var catagoryHash = {
    1: 'dfssdf'
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return catagoryHash[input];
    }
  };
})
*/
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
