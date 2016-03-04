app.controller('ToolImportCtrl', ['Products', '$scope',
  function (                       Products,   $scope) {
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

}])
