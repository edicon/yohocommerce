app.controller('CouponsCtrl', ['Coupons', '$state', '$scope', '$stateParams',
  function (                    Coupons,   $state,   $scope,   $stateParams) {
    var couponsCtrl = this;
    couponsCtrl.categoryTabActive = "active";
    couponsCtrl.firstCategory = Categories.firstCategory;
    couponsCtrl.category = {};
    couponsCtrl.imageEntity =[];

    couponsCtrl.loadCategory = function(cid) {
      var theCategory = Categories.getCategory(cid);
        theCategory.$loaded().then(function() {
          couponsCtrl.category = theCategory;
      });
    };

    couponsCtrl.getFirstCategory = function(cid) {
      var theCategory = couponsCtrl.firstCategory[0];
      couponsCtrl.cid = theCategory.$id;
      couponsCtrl.loadCategory(couponsCtrl.cid);
    };

    if ($stateParams.tabEntity === 1) {
      couponsCtrl.bannerTabActive = "active";
      couponsCtrl.categoryTabActive = "";
      couponsCtrl.getFirstCategory();
    }

    couponsCtrl.categoriesGridOpts = {
      enableSorting: true,
      enableCellEditOnFocus: true,
      data: Categories.all,
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

    couponsCtrl.categoriesGridOpts.onRegisterApi = function(categoriesGridApi) {
      $scope.categoriesGridApi = categoriesGridApi;
        categoriesGridApi.edit.on.afterCellEdit($scope, function(rowEntity, newValue, oldValue) {
          if (newValue != oldValue) {
            var currentCategory = Categories.getCategory(rowEntity.$id);
            currentCategory.category_name = rowEntity.category_name;
            currentCategory.sub_count = rowEntity.sub_count;
            currentCategory.$priority = rowEntity.$priority;
            currentCategory.$save();
          }
        }, function(error) {
          couponsCtrl.error = error;
      });
    };

}]);
