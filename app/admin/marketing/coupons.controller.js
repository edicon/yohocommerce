app.controller('CouponsCtrl', ['Coupons', '$state', '$scope', '$stateParams',
  function (                    Coupons,   $state,   $scope,   $stateParams) {
    var couponsCtrl = this;

    couponsCtrl.gridCoupons = {
      enableSorting: true,
      enableCellEditOnFocus: true,
      data: Coupons.all,
      columnDefs: [
        { name: '', field: '$id', shown: false, cellTemplate: 'admin/catalogs/gridTemplates/editSubCategoriesBtn.html',
          width: 34, enableColumnMenu: false, enableCellEdit: false, headerTooltip: 'Add Sub-categories' },
        { name:'categoryName', field: 'category_name', width: '70%', enableHiding: false },
        { name:'menuOrder', field: '$priority', enableHiding: false },
        { name:'subCount', field: 'sub_count', visible: false },
        { name: ' ', field: '$id', cellTemplate:'admin/catalogs/gridTemplates/removeCategoryBtn.html',
          width: 32, enableCellEdit: false, enableColumnMenu: false }
      ]
    };

}]);
