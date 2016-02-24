app.controller('CategoriesCtrl', ['Categories', '$state', '$scope', '$stateParams','FileReader',
  function (                       Categories,   $state,   $scope,   $stateParams,  FileReader) {
    var categoriesCtrl = this;
    categoriesCtrl.categoryTabActive = "active";
    categoriesCtrl.firstCategory = Categories.firstCategory;
    categoriesCtrl.category = {};
    categoriesCtrl.imageEntity =[];

    categoriesCtrl.tinymceOptions = {
      menubar:false,
      statusbar: false,
      theme: "modern",
      skin: 'light',
      height: 350
    };

    categoriesCtrl.loadCategory = function(cid) {
      var theCategory = Categories.getCategory(cid);
        theCategory.$loaded().then(function() {
          categoriesCtrl.category = theCategory;
      });
    };

    categoriesCtrl.getFirstCategory = function(cid) {
      var theCategory = categoriesCtrl.firstCategory[0];
      categoriesCtrl.cid = theCategory.$id;
      categoriesCtrl.loadCategory(categoriesCtrl.cid);
    };

    if ($stateParams.tabEntity === 1) {
      categoriesCtrl.bannerTabActive = "active";
      categoriesCtrl.categoryTabActive = "";
      categoriesCtrl.getFirstCategory();
    }

    categoriesCtrl.categoriesGridOpts = {
      enableSorting: true,
      enableCellEditOnFocus: true,
      data: Categories.all,
      columnDefs: [
        { name: '', field: '$id', shown: false, cellTemplate: 'admin/catalogs/gridTemplates/editSubCategories.html',
          width: 34, enableColumnMenu: false, enableCellEdit: false, headerTooltip: 'Add Sub-categories' },
        { name:'categoryName', field: 'category_name', width: '70%', enableHiding: false },
        { name:'menuOrder', field: '$priority', enableHiding: false },
        { name:'subCount', field: 'sub_count', visible: false },
        { name: ' ', field: '$id', cellTemplate:'admin/catalogs/gridTemplates/removeCategory.html',
          width: 32, enableCellEdit: false, enableColumnMenu: false }
      ]
    };

    categoriesCtrl.categoriesGridOpts.onRegisterApi = function(categoriesGridApi) {
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
          categoriesCtrl.error = error;
      });
    };

    categoriesCtrl.catagoryListGridOpts = {
      enableRowHeaderSelection: false,
      multiSelect: false,
      enableSorting: false,
      enableColumnMenus: false,
      data: Categories.all,
      columnDefs: [
        { name: '', field: '$id', shown: false, cellTemplate: 'admin/catalogs/gridTemplates/editCategoryBannerBtn.html',
          width: 34, enableColumnMenu: false, enableCellEdit: false, headerTooltip: 'Add Sub-categories' },
        { name:'categoryName', field: 'category_name', enableHiding: false }
      ]
    };

    categoriesCtrl.addCategory = function() {
      var n = categoriesCtrl.categoriesGridOpts.data.length;
      Categories.all.$add({$priority: n+1, category_name: categoriesCtrl.categoryName, sub_count: 0});
      categoriesCtrl.categoryName = null;
    }, function(error) {
      categoriesCtrl.error = error;
    };

    categoriesCtrl.removeCategory = function(row) {
      Categories.removeCategory(row.entity.$id);
    }, function(error) {
      categoriesCtrl.error = error;
    };

    categoriesCtrl.editCategory = function(row) {
      $state.go('admin.catalogs.subcategories', {'rowEntity': row.entity});
    };

    categoriesCtrl.editCategoryBanner = function(row) {
      categoriesCtrl.cid = row.entity.$id;
      categoriesCtrl.loadCategory(row.entity.$id);
    };

    categoriesCtrl.removeCategoryImage = function(cid) {
      Categories.removeCategoryImage(cid);
    }, function(error) {
      productCtrl.error = error;
    };

    $scope.getCategoryBanner = function () {
      FileReader.readAsDataURL($scope.file, $scope).then(function(result) {
        categoriesCtrl.imageEntity.imageSrc = result;
        categoriesCtrl.imageEntity.cid = categoriesCtrl.cid;
        Categories.addCategoryImage(categoriesCtrl.imageEntity);
      });
    };

}]);

app.directive("ngCategoryBannerSelect",function() {
  return {
    link: function($scope,el) {
      el.bind("change", function(e) {
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getCategoryBanner();
      })
    }
  }
})
