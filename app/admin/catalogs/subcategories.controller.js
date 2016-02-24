app.controller('SubCategoriesCtrl', ['SubCategories', 'Categories', '$state', '$scope', '$stateParams', 'uiGridConstants', 'FileReader',
  function (                          SubCategories,   Categories,   $state,   $scope,   $stateParams,   uiGridConstants,   FileReader) {
    var subCategoriesCtrl = this;
    subCategoriesCtrl.imageEntity = [];

    subCategoriesCtrl.tinymceOptions = {
      menubar:false,
      statusbar: false,
      theme: "modern",
      skin: 'light',
      height: 350
    };

    subCategoriesCtrl.loadSubCategory = function() {
      var subCategory = SubCategories.getSubCategory(subCategoriesCtrl.subCid);
        subCategory.$loaded().then(function() {
          subCategoriesCtrl.subCategory = subCategory;
      });
    };

    subCategoriesCtrl.loadSubCategories = function() {
      var subCategories = SubCategories.getSubCategories(subCategoriesCtrl.cid);
      subCategories.$loaded().then(function() {
        subCategoriesCtrl.subCategoriesGridOpts.data = subCategories;
        subCategoriesCtrl.subCategoriesGridListOpts.data = subCategories;
        subCategoriesCtrl.subCategoriesIndex = Categories.getIndex(subCategoriesCtrl.cid);
      });
    };

    subCategoriesCtrl.loadCategory = function(cid) {
      var category = Categories.getCategory(cid);
      category.$loaded().then(function() {
        subCategoriesCtrl.categoryName = category.category_name;
        subCategoriesCtrl.subCount = category.sub_count;
        subCategoriesCtrl.cid = category.$id;
        subCategoriesCtrl.loadSubCategories();
      });
    };

    if ($stateParams.rowEntity === null) {
      $state.go('admin.catalogs.categories');
    } else {
      subCategoriesCtrl.categoryName = $stateParams.rowEntity.category_name;
      subCategoriesCtrl.subCount = $stateParams.rowEntity.sub_count;
      subCategoriesCtrl.cid = $stateParams.rowEntity.$id;
      subCategoriesCtrl.count = Categories.getCount();
      subCategoriesCtrl.loadSubCategories(subCategoriesCtrl.cid);
    }

    subCategoriesCtrl.subCategoriesGridOpts = {
      enableSorting: true,
      enableCellEditOnFocus: true,
      columnDefs: [
        { name:'categoryName', displayName: 'Sub-Category Name', field: 'category_name', width: '70%', enableHiding: false },
        { name:'navigationOrder', field: '$priority', enableHiding: false,
          sort: {
            direction: uiGridConstants.ASC,
            priority: 0,
          }
        },
        { name: ' ', field: '$id', cellTemplate:'admin/catalogs/gridTemplates/removeSubCategory.html',
          width: 32, enableColumnMenu: false }
      ]
    };

    subCategoriesCtrl.subCategoriesGridOpts.onRegisterApi = function(subCategoriesGridApi) {
      $scope.subCategoriesGridApi = subCategoriesGridApi;
        subCategoriesGridApi.edit.on.afterCellEdit($scope, function(rowEntity, newValue, oldValue) {
          if (newValue != oldValue) {
            var currentSubCategory = SubCategories.getSubCategory(rowEntity.$id);
            currentSubCategory.$loaded().then(function() {
              currentSubCategory.category_name = rowEntity.category_name;
              currentSubCategory.$priority = rowEntity.$priority;
              currentSubCategory.$save();
            });
          }
        }, function(error) {
          subCategoriesCtrl.error = error;
      });
    };

    subCategoriesCtrl.subCategoriesGridListOpts = {
      enableRowHeaderSelection: false,
      multiSelect: false,
      enableSorting: false,
      enableColumnMenus: false,
      columnDefs: [
        { name: '', field: '$id', shown: false, cellTemplate: 'admin/catalogs/gridTemplates/editSubCategoryBanner.html',
          width: 34, enableColumnMenu: false, enableCellEdit: false },
        { name:'categoryName', field: 'category_name', enableHiding: false },
        { name:'navigationOrder', field: '$priority', visible: false,
          sort: {
            direction: uiGridConstants.ASC,
            priority: 0,
          }
        },
      ]
    };

    subCategoriesCtrl.subCategoryBanners = function() {
      subCategoriesCtrl.loadSubCategories();
      $state.go('admin.catalogs.categories', {'tabEntity': 1});
    };

    subCategoriesCtrl.addSubCategory = function() {
      var entity = {
        category_id: subCategoriesCtrl.cid,
        category_name: subCategoriesCtrl.subCategoryName
      };
      var currentCategory = SubCategories.getSubCategories(subCategoriesCtrl.cid);
      currentCategory.$loaded().then(function() {
        var currentLength = currentCategory.length;
        entity.priority = currentLength + 1;
        SubCategories.addSubCategory(entity).then(function() {
          Categories.addSubCount(entity);
            subCategoriesCtrl.subCategoryName = null;
        });
      });
    }, function(error) {
      subCategoriesCtrl.error = error;
    };

    subCategoriesCtrl.editSubCategoryBanner = function(row) {
      subCategoriesCtrl.subCid = row.entity.$id;
      subCategoriesCtrl.loadSubCategory();
    };

    subCategoriesCtrl.removeSubCategory = function(row) {
      SubCategories.removeSubCategory(row.entity);
    }, function(error) {
      subCategoriesCtrl.error = error;
    };

    subCategoriesCtrl.removeSubCategoryImage = function(cid) {
      SubCategories.removeSubCategoryImage(cid);
    }, function(error) {
      productCtrl.error = error;
    };

    subCategoriesCtrl.next = function() {
      var key = subCategoriesCtrl.subCategoriesIndex + 1;
      if (key != subCategoriesCtrl.count) {
        var cid = Categories.getKey(key);
        subCategoriesCtrl.loadCategory(cid);
      }
    }, function(error) {
      subCategoriesCtrl.error = error;
    };

    subCategoriesCtrl.back = function() {
      var key = subCategoriesCtrl.subCategoriesIndex - 1;
      if (key < 0) key = 0
      var cid = Categories.getKey(key);
      subCategoriesCtrl.loadCategory(cid);
    }, function(error) {
      subCategoriesCtrl.error = error;
    };

    subCategoriesCtrl.first = function() {
      var key = 0;
      var cid = Categories.getKey(key);
      subCategoriesCtrl.loadCategory(cid);
    }, function(error) {
      subCategoriesCtrl.error = error;
    };

    subCategoriesCtrl.last = function() {
      var key = subCategoriesCtrl.count - 1;
      var cid = Categories.getKey(key);
      subCategoriesCtrl.loadCategory(cid);
    }, function(error) {
      subCategoriesCtrl.error = error;
    };

    $scope.addSubCategoryBanner = function () {
      FileReader.readAsDataURL($scope.file, $scope).then(function(result) {
        subCategoriesCtrl.imageEntity.imageSrc = result;
        subCategoriesCtrl.imageEntity.subCid = subCategoriesCtrl.subCid;
        SubCategories.addSubCategoryImage(subCategoriesCtrl.imageEntity);
      });
    };

    subCategoriesCtrl.removeSubCategoryImage = function(subCid) {
      SubCategories.removeSubCategoryImage(subCid);
    }, function(error) {
      SubCategories.error = error;
    };

}]);

app.directive("ngSubCategoryBannerSelect",function() {
  return {
    link: function($scope,el) {
      el.bind("change", function(e) {
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.addSubCategoryBanner();
      })
    }
  }
})
