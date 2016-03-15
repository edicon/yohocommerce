app.controller('StoresCtrl', ['Stores', '$state', '$scope', '$stateParams',
  function (                   Stores,   $state,   $scope,   $stateParams) {
  var storesCtrl = this;

  storesCtrl.gridStores = {
    showGridFooter: false,
    enableSorting: true,
    enableCellEditOnFocus: false,
    enableFiltering: false,
    data: Stores.all,
    columnDefs: [
      { name: '', field: '$id', shown: false, cellTemplate: 'admin/system/gridTemplates/editStore.html',
        width: 35, enableColumnMenu: false, headerTooltip: 'Edit Store' },
      { name:'storeName', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.store_name}}</div>',
       enableHiding: false, enableSorting: false, width: '40%' },
      { name:'storeUrl', field: 'store_url', enableHiding: false, enableSorting: false },
      { name: ' ', field: '$id', cellTemplate:'admin/system/gridTemplates/removeStore.html',
        width: 35, enableColumnMenu: false, headerTooltip: 'Delete Store' }
    ]
  };

  storesCtrl.editStore = function(row) {
    $state.go('admin.system.store', {'rowEntity': row.entity});
  };

  storesCtrl.removeStore = function(row) {
    Stores.removeStore(row.entity.$id);
  }, function(error) {
    storesCtrl.error = error;
  };

}]);
