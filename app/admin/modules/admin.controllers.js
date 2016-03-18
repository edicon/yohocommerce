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
        { name: '', field: '$id', shown: false, cellTemplate: 'admin/catalogs/gridTemplates/editCategoryBanner.html',
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

app.controller('ProductCtrl', ['Product', 'SubCategories', 'Categories', 'CustomerGroups', '$filter', '$state', '$scope', '$stateParams', 'FileReader',
  function (                    Product,   SubCategories,   Categories,   CustomerGroups,   $filter,   $state,   $scope,   $stateParams,   FileReader) {
    var productCtrl = this;
    productCtrl.product = {};
    productCtrl.imageEntity =[];
    productCtrl.categories = Categories.all;
    productCtrl.customerGroups = CustomerGroups.all;
    productCtrl.totalCount = Product.getCount();

    productCtrl.tinymceOptions = {
      menubar:false,
      statusbar: false,
      theme: "modern",
      skin: 'light',
      height: 250
    };

    productCtrl.getSubCategories = function(cid) {
      var subCategories = SubCategories.getSubCategories(cid);
        subCategories.$loaded().then(function() {
          productCtrl.subCategories = subCategories;
      });
    };

    productCtrl.loadSubCategories = function() {
      productCtrl.getSubCategories(productCtrl.product.product_category_id);
    };

    productCtrl.saveCategory = function() {
      productCtrl.product.product_sub_category_id = null;
      var cat = Categories.getCategory(productCtrl.product.product_category_id);
        cat.$loaded().then(function() {
          productCtrl.product.product_category = cat.category_name;
          productCtrl.product.$save();
          productCtrl.loadSubCategories();
        });
    }, function(error) {
      productCtrl.error = error;
    };

    productCtrl.loadProduct = function(pid) {
      var theProduct = Product.getProduct(pid);
        theProduct.$loaded().then(function() {
          productCtrl.product = theProduct;
          productCtrl.regular_price = $filter('currency')(theProduct.product_price);
          productCtrl.productIndex = Product.getIndex(pid);
          if (theProduct.product_category_id)
            productCtrl.getSubCategories(theProduct.product_category_id);
            console.log(productCtrl.productIndex)
      });
      var thumbnails = Product.getProductThumbnails(pid);
        thumbnails.$loaded().then(function() {
          productCtrl.thumbnails = thumbnails;
      });
      var discounts = Product.getDiscounts(pid);
        discounts.$loaded().then(function() {
          productCtrl.gridDiscount.data = discounts;
      });
      var specials = Product.getSpecials(pid);
        specials.$loaded().then(function() {
          productCtrl.gridSpecial.data = specials;
      });
    };

    if ($stateParams.rowEntity != undefined) {
      productCtrl.pid = $stateParams.rowEntity.$id;
      productCtrl.loadProduct(productCtrl.pid);
    } else {
      productCtrl.product.pid = null;
    }

    productCtrl.featuredProducts = function() {
      $state.go('admin.catalogs.products', {'tabEntity': 1});
    };

    productCtrl.gridDiscount = {
      enableRowHeaderSelection: false,
      multiSelect: false,
      enableSorting: false,
      enableColumnMenus: false,
      columnDefs: [
        { name:'customerGroup', field: 'discount_customer_group_name', enableHiding: false },
        { name:'quantity', field: 'discount_product_quantity', width: 85, type: 'number', cellClass: 'grid-align-right', enableHiding: false },
        { name:'regularPrice', field: 'discount_regular_price', type: 'number', enableHiding: false, cellClass: 'grid-align-right' },
        { name:'discountPrice', field: 'discount_price', type: 'number', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'currency' },
        { name:'startDate', field: 'discount_start_date', type: 'date', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'date' },
        { name:'endDate', field: 'discount_end_date', type: 'date', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'date' },
        { name: ' ', field: '$id', cellTemplate:'admin/catalogs/gridTemplates/removeDiscount.html',
          width: 32, enableColumnMenu: false, enableCellEdit: false, enableFiltering: false }
      ]
    };

    productCtrl.addDiscount = function() {
      var theDiscount = {};
      var group = CustomerGroups.getGroup(productCtrl.discount.customer_group_id);
        group.$loaded().then(function() {
          theDiscount.pid = productCtrl.pid;
          theDiscount.discount_customer_group_id = productCtrl.discount.customer_group_id;
          theDiscount.discount_customer_group_name = group.group_name;
          theDiscount.discount_product_quantity = productCtrl.discount.product_quantity;
          theDiscount.discount_regular_price = productCtrl.regular_price;
          theDiscount.discount_price = productCtrl.discount.discount_price;
          theDiscount.discount_start_date = productCtrl.discount.start_date.toDateString();
          theDiscount.discount_end_date = productCtrl.discount.end_date.toDateString();
          Product.addDiscount(theDiscount);
          productCtrl.discount.customer_group_id = null;
          productCtrl.discount.product_quantity = null;
          productCtrl.discount.discount_price = null;
          productCtrl.discount.start_date = null;
          productCtrl.discount.end_date = null;
      });
    }, function(error) {
      customerCtrl.error = error;
    };

    productCtrl.removeDiscount = function(row) {
      var theDiscount = {};
      theDiscount.discountId = row.entity.$id;
      theDiscount.pid = productCtrl.pid;
      Product.removeDiscount(theDiscount);
    }, function(error) {
      productCtrl.error = error;
    };

    productCtrl.gridSpecial = {
      enableRowHeaderSelection: false,
      multiSelect: false,
      enableSorting: false,
      enableColumnMenus: false,
      columnDefs: [
        { name:'customerGroup', field: 'special_customer_group_name', enableHiding: false },
        { name:'quantity', field: 'special_product_quantity', width: 85, type: 'number', cellClass: 'grid-align-right', enableHiding: false },
        { name:'regularPrice', field: 'special_regular_price', type: 'number', enableHiding: false, cellClass: 'grid-align-right' },
        { name:'discountPrice', field: 'special_price', type: 'number', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'currency' },
        { name:'startDate', field: 'special_start_date', type: 'date', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'date' },
        { name:'endDate', field: 'special_end_date', type: 'date', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'date' },
        { name:'dateAdded', field: 'special_date_added', type: 'date', enableHiding: false, cellClass: 'grid-align-right', cellFilter: 'date' }
      ]
    };

    productCtrl.addSpecial = function() {
      var theSpecial = {};
      var group = CustomerGroups.getGroup(productCtrl.special.customer_group_id);
        group.$loaded().then(function() {
          theSpecial.pid = productCtrl.pid;
          theSpecial.special_customer_group_id = productCtrl.special.customer_group_id;
          theSpecial.special_customer_group_name = group.group_name;
          theSpecial.special_product_quantity = productCtrl.special.product_quantity;
          theSpecial.special_regular_price = productCtrl.regular_price;
          theSpecial.special_price = parseFloat(productCtrl.special.special_price);
          theSpecial.special_start_date = productCtrl.special.start_date.toDateString();
          theSpecial.special_end_date = productCtrl.special.end_date.toDateString();
          Product.addSpecial(theSpecial);
          productCtrl.special.customer_group_id = null;
          productCtrl.special.product_quantity = null;
          productCtrl.special.special_price = null;
          productCtrl.special.start_date = null;
          productCtrl.special.end_date = null;
      });
    }, function(error) {
      customerCtrl.error = error;
    };

    productCtrl.removeSpecial = function() {
      Product.removeSpecial(productCtrl.pid);
    }, function(error) {
      productCtrl.error = error;
    };

    productCtrl.getStatus = function() {
      if (productCtrl.product.product_status === "1") {
        productCtrl.product.product_status_id = 1;
      } else {
        productCtrl.product.product_status_id = 2;
      }
    };

    $scope.getBanner = function () {
      FileReader.readAsDataURL($scope.file, $scope).then(function(result) {
        productCtrl.imageEntity.imageSrc = result;
        productCtrl.imageEntity.pid = productCtrl.pid;
        Product.addProductImage(productCtrl.imageEntity);
      });
    };

    $scope.getThumbnail = function () {
      FileReader.readAsDataURL($scope.file, $scope).then(function(result) {
        productCtrl.imageEntity.imageSrc = result;
        productCtrl.imageEntity.pid = productCtrl.pid;
        Product.addThumbnailImage(productCtrl.imageEntity);
      });
    };

    productCtrl.addProduct = function() {
      productCtrl.getStatus();
      var cat = Categories.getCategory(productCtrl.product.product_category_id);
        cat.$loaded().then(function() {
          productCtrl.product.product_category = cat.category_name;
            Product.addProduct(productCtrl.product).then(function(pid) {
              productCtrl.loadProduct(pid);
          });
      });
    }, function(error) {
      productCtrl.error = error;
    };

    productCtrl.removeProductImage = function($id) {
      Product.removeProductImage($id);
    }, function(error) {
      productCtrl.error = error;
    };

    productCtrl.next = function() {
      var key = productCtrl.productIndex + 1;
      if (key != productCtrl.totalCount) {
        productCtrl.pid = Product.getKey(key);
        productCtrl.loadProduct(productCtrl.pid);
      }
    }, function(error) {
      productCtrl.error = error;
    };

    productCtrl.back = function() {
      var key = productCtrl.productIndex - 1;
      if (key < 0) key = 0
      productCtrl.pid = Product.getKey(key);
      productCtrl.loadProduct(productCtrl.pid);
    }, function(error) {
      productCtrl.error = error;
    };

    productCtrl.first = function() {
      productCtrl.loadProduct(0);
    }, function(error) {
      productCtrl.error = error;
    };

    productCtrl.last = function() {
      productCtrl.pid = Product.getKey(productCtrl.totalCount - 1);
      productCtrl.loadProduct(productCtrl.pid);
    }, function(error) {
      productCtrl.error = error;
    };

    productCtrl.removeThumbnailImage = function($id) {
      productCtrl.imageEntity.$id = $id;
      productCtrl.imageEntity.pid = productCtrl.pid;
      Product.removeThumbnailImage(productCtrl.imageEntity);
    }, function(error) {
      productCtrl.error = error;
    };

    productCtrl.saveProductStatus = function() {
      productCtrl.getStatus();
      productCtrl.product.$save();
    }, function(error) {
      productCtrl.error = error;
    };

}]);

app.directive("ngBannerSelect",function() {
  return {
    link: function($scope,el) {
      el.bind("change", function(e) {
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getBanner();
      })
    }
  }
})

app.directive("ngThumbnailSelect",function() {
  return {
    link: function($scope,el) {
      el.bind("change", function(e) {
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getThumbnail();
      })
    }
  }
})

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


app.controller('SubCategoriesCtrl', ['SubCategories', 'Categories', '$state', '$scope', '$stateParams', 'uiGridConstants', 'FileReader',
  function (                          SubCategories,   Categories,   $state,   $scope,   $stateParams,   uiGridConstants,   FileReader) {
    var subCategoriesCtrl = this;
    subCategoriesCtrl.imageEntity = [];
    subCategoriesCtrl.totalCount = Categories.getCount();

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
      if (key != subCategoriesCtrl.totalCount) {
        subCategoriesCtrl.cid = Categories.getKey(key);
        subCategoriesCtrl.loadCategory(subCategoriesCtrl.cid);
      }
    }, function(error) {
      subCategoriesCtrl.error = error;
    };

    subCategoriesCtrl.back = function() {
      var key = subCategoriesCtrl.subCategoriesIndex - 1;
      if (key < 0) key = 0
      subCategoriesCtrl.cid = Categories.getKey(key);
      subCategoriesCtrl.loadCategory(subCategoriesCtrl.cid);
    }, function(error) {
      subCategoriesCtrl.error = error;
    };

    subCategoriesCtrl.first = function() {
      var key = 0;
      subCategoriesCtrl.cid = Categories.getKey(0);
      subCategoriesCtrl.loadCategory(subCategoriesCtrl.cid);
    }, function(error) {
      subCategoriesCtrl.error = error;
    };

    subCategoriesCtrl.last = function() {
      var key = subCategoriesCtrl.count - 1;
      subCategoriesCtrl.cid = Categories.getKey(key);
      subCategoriesCtrl.loadCategory(subCategoriesCtrl.cid);
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

app.controller('AffiliateCtrl', ['Affiliate', 'Affiliates', 'Transactions', 'Countries', 'AlertService', '$state', '$scope', '$stateParams', '$http',
  function (                      Affiliate,   Affiliates,   Transactions,   Countries,   AlertService,   $state,   $scope,   $stateParams,   $http) {
  var affiliateCtrl = this;
  affiliateCtrl.affiliate = {};
  $scope.countries = Countries.all;
  $scope.transactions = Transactions.all;
  $scope.address = {};

  affiliateCtrl.refreshAddresses = function(address) {
    var params = {address: address, sensor: false};
    return $http.get(
      'http://maps.googleapis.com/maps/api/geocode/json',
      {params: params}
    ).then(function(response) {
      $scope.addresses = response.data.results
    });
  };

  affiliateCtrl.parseAddress = function(address) {
    var addressArray = address.split(", ");
    var regionArray = addressArray[2].split(" ");
    affiliateCtrl.affiliate.affiliate_address_street = addressArray[0];
    affiliateCtrl.affiliate.affiliate_address_city = addressArray[1];
    affiliateCtrl.affiliate.affiliate_address_postal_code = regionArray[1] + " " + regionArray[2];
    affiliateCtrl.affiliate.affiliate_address_region = regionArray[0];
    affiliateCtrl.affiliate.affiliate_address_country = addressArray[3];

    if (regionArray[2] == undefined) {
      affiliateCtrl.affiliate.affiliate_address_postal_code = regionArray[1];
    };

    if (regionArray[1] == undefined && regionArray[2] == undefined) {
      affiliateCtrl.affiliate.affiliate_address_postal_code = "n/a";
    };
  };

  affiliateCtrl.loadAffiliate = function(aid) {
    var theAffiliate = Affiliate.getAffiliate(aid);
      theAffiliate.$loaded().then(function() {
        affiliateCtrl.affiliate.affiliate_full_name = affiliateCtrl.affiliate.affiliate_first_name + ' ' + affiliateCtrl.affiliate.affiliate_last_name;
        affiliateCtrl.affiliate = theAffiliate;
        affiliateCtrl.affiliateIndex = Affiliate.getIndex(aid);
        affiliateCtrl.count = Affiliates.all.length;
    });
    var theTransactions = Transactions.getTransactions(aid);
      theTransactions.$loaded().then(function() {
      affiliateCtrl.gridTransactions.data = theTransactions;
   });
  };

  if ($stateParams.rowEntity != undefined) {
    affiliateCtrl.loadAffiliate($stateParams.rowEntity.$id);
    affiliateCtrl.aid = $stateParams.rowEntity.$id;
  } else {
    affiliateCtrl.aid = null;
  };

  affiliateCtrl.addAffiliate = function() {
    affiliateCtrl.affiliate.affiliate_full_name = affiliateCtrl.affiliate.affiliate_first_name + ' ' + affiliateCtrl.affiliate.affiliate_last_name;
      Affiliate.addAffiliate(affiliateCtrl.affiliate).then(function(aid) {
        affiliateCtrl.loadAffiliate(aid)
      });
    }, function(error) {
      AlertService.addError(error.message);
    };

    affiliateCtrl.addTransaction = function() {
      affiliateCtrl.transaction.aid = affiliateCtrl.aid;
      Transactions.addTransaction(affiliateCtrl.transaction);
    }, function(error) {
      affiliateCtrl.error = error;
    };

    affiliateCtrl.gridTransactions = {
      enableSorting: true,
      enableCellEditOnFocus: true,
      columnDefs: [
        { name:'dateAdded', field: 'transaction_date_added', width: '15%', type: 'date', enableHiding: false, cellClass: 'grid-align-left', enableCellEdit: false, cellFilter: 'date' },
        { name:'description', field: 'transaction_description', width: '70%', enableHiding: false },
        { name:'amount', field: 'transaction_amount', width: '15%', enableHiding: false, cellFilter: 'currency' },

      ]
    };

    affiliateCtrl.next = function() {
      if (affiliateCtrl.count > 0) {
        key = affiliateCtrl.affiliateIndex;
        if (key < affiliateCtrl.count - 1) {
          key = affiliateCtrl.affiliateIndex + 1;
          var aid = Affiliate.getKey(key);
          affiliateCtrl.loadAffiliate(aid);
        }
      }
    }, function(error) {
      affiliateCtrl.error = error;
    };

    affiliateCtrl.back = function() {
      var key = affiliateCtrl.affiliateIndex - 1;
      if (key < 0) key = 0
      var aid = Affiliate.getKey(key);
      affiliateCtrl.loadAffiliate(aid);
    }, function(error) {
      affiliateCtrl.error = error;
    };

    affiliateCtrl.first = function() {
      var key = 0;
      var aid = Affiliate.getKey(key);
      affiliateCtrl.loadAffiliate(aid);
    }, function(error) {
      affiliateCtrl.error = error;
    };

    affiliateCtrl.last = function() {
      var key = affiliateCtrl.count - 1;
      var aid = Affiliate.getKey(key);
      affiliateCtrl.loadAffiliate(aid);
    }, function(error) {
      affiliateCtrl.error = error;
    };

}]);

app.controller('AffiliatesCtrl', ['Affiliates', '$state', '$scope', '$stateParams',
  function (                       Affiliates,   $state,   $scope,   $stateParams) {
  var affiliatesCtrl = this;

  affiliatesCtrl.gridAffiliates = {
    showGridFooter: true,
    enableSorting: true,
    enableCellEditOnFocus: true,
    enableFiltering: true,
    data: Affiliates.all,
    columnDefs: [
      { name: '', field: '$id', shown: false, cellTemplate: 'admin/marketing/gridTemplates/editAffiliate.html',
        width: 35, enableColumnMenu: false, headerTooltip: 'Edit Affiliate', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
      { name:'affiliateName', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.affiliate_first_name}} {{row.entity.affiliate_last_name}}</div>',
       enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '25%' },
      { name:'phoneNumber', field: 'affiliate_phone', enableHiding: false, enableFiltering: false, enableCellEdit: false },
      { name:'email', field: 'affiliate_email', enableHiding: false, enableFiltering: false, width: '20%', enableCellEdit: false },
      { name:'affiliateCode', field: '$id', enableHiding: false, enableFiltering: false, enableCellEdit: false },
      { name:'status', field: 'affiliate_status', enableHiding: false, enableFiltering: true, width: '10%', enableCellEdit: false },
      { name: ' ', field: '$id', cellTemplate:'admin/marketing/gridTemplates/removeAffiliate.html',
        width: 35, enableColumnMenu: false, enableCellEdit: false, enableFiltering: false }
    ]
  };

  affiliatesCtrl.editAffiliate = function(row) {
    $state.go('admin.marketing.affiliate', {'rowEntity': row.entity});
  };

  affiliatesCtrl.removeAffiliate = function(row) {
    Affiliates.removeAffiliate(row.entity.$id);
  }, function(error) {
    affiliatesCtrl.error = error;
  };

}]);

app.controller('CouponsCtrl', ['Coupons', '$state', '$scope', '$stateParams',
  function (                    Coupons,   $state,   $scope,   $stateParams) {
    var couponsCtrl = this;
    couponsCtrl.allCoupons = Coupons.all;
    couponsCtrl.coupon = {};
    couponsCtrl.coupon.coupon_type = 'Percent';

  couponsCtrl.addCoupon = function() {
    Coupons.addCoupon(couponsCtrl.coupon);
    couponsCtrl.coupon.coupon_name = null;
    couponsCtrl.coupon.coupon_discount = null;
    couponsCtrl.coupon.coupon_type = null;
  }, function(error) {
    couponsCtrl.error = error;
  };

  couponsCtrl.gridCoupons = {
    enableSorting: true,
    enableCellEditOnFocus: true,
    data: Coupons.all,
    columnDefs: [
      { name:'couponName', field: 'coupon_name', width: '30%', enableHiding: false },
      { name:'discountAmount', field: 'coupon_discount', width: '20%', enableHiding: false, cellClass: 'grid-align-right' },
      { name:'type', field: 'coupon_type', width: '10%', enableHiding: false, cellClass: 'grid-align-right' },
      { name:'couponCode', field: '$id', enableHiding: false, cellClass: 'grid-align-right' },
      { name: ' ', field: '$id', cellTemplate:'admin/marketing/gridTemplates/removeCoupon.html',
        width: 35, enableCellEdit: false, enableColumnMenu: false }
    ]
  };

  couponsCtrl.updateType = function(type) {
    couponsCtrl.coupon.coupon_type = type;
  }, function(error) {
    couponsCtrl.error = error;
  };

  couponsCtrl.removeCoupon = function(row) {
    var theCoupon = {};
    theCoupon.couponId = row.entity.$id;
    Coupons.removeCoupon(theCoupon);
  }, function(error) {
    couponsCtrl.error = error;
  };

}]);

app.controller('CustomerCtrl', ['Customer', 'Customers', 'CustomerGroups', '$state', '$scope', '$stateParams',
  function (                     Customer,   Customers,   CustomerGroups,   $state,   $scope,   $stateParams) {
    var customerCtrl = this;
    customerCtrl.customer = {};
    customerCtrl.groups = CustomerGroups.all;
    customerCtrl.totalCount = Customers.all.length;

    customerCtrl.loadCustomer = function(cid) {
      var theCustomer = Customer.getCustomer(cid);
        theCustomer.$loaded().then(function() {
          customerCtrl.customer = theCustomer;
          customerCtrl.customerIndex = Customer.getIndex(cid);
          customerCtrl.defaultAddressTab = "active";
          customerCtrl.cid = cid;

      });
      var theAddresses = Customer.getAddresses(cid);
        theAddresses.$loaded().then(function() {
          customerCtrl.addresses = theAddresses;
      });
    };

    if ($stateParams.cid === null) {
      if ($stateParams.rowEntity != undefined) {
        customerCtrl.loadCustomer($stateParams.rowEntity.$id);
      } else {
        customerCtrl.customer.customer_full_name = 'New Customer';
        customerCtrl.cid = null;
      }
    } else {
      customerCtrl.loadCustomer($stateParams.cid);
    }

    customerCtrl.routeGroups = function() {
      $state.go('admin.sales.customers');
    };

    customerCtrl.getStatus = function() {
      if (customerCtrl.customer.customer_status === "1") {
        customerCtrl.customer.customer_status_id = 1;
      } else {
        customerCtrl.customer.customer_status_id = 2;
      }
    };

    customerCtrl.addCustomer = function() {
      customerCtrl.getStatus();
      var group = CustomerGroups.getGroup(customerCtrl.customer.customer_group_id);
        group.$loaded().then(function() {
          customerCtrl.customer.customer_address_count = 0;
          customerCtrl.customer.customer_group_name = group.group_name;
          customerCtrl.customer.customer_full_name = customerCtrl.customer.customer_first_name + ' ' + customerCtrl.customer.customer_last_name;
            Customer.addCustomer(customerCtrl.customer).then(function(cid) {
            customerCtrl.loadCustomer(cid);
          });
      });
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.getAddress = function(addressId) {
      var theAddress = Customer.getAddress(customerCtrl.cid, addressId);
        theAddress.$loaded().then(function() {
          customerCtrl.address = theAddress;
      });
    };

    customerCtrl.addAddress = function() {
      var theAddress = {};
      theAddress.cid = customerCtrl.cid;
      if (customerCtrl.customer.customer_address_count === 0) {
        theAddress.addressCount = 1;
        theAddress.priority = 1;
      } else {
        var cnt = customerCtrl.customer.customer_address_count + 1;
        theAddress.addressCount = cnt;
        theAddress.priority = cnt;
      }
      Customer.updateAddressCount(theAddress);
      Customer.addAddress(theAddress);
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.removeAddress = function(addressId) {
      var theAddress = {};
      theAddress.addressId = addressId;
      theAddress.cid = customerCtrl.cid;
      theAddress.addressCount = customerCtrl.customer.customer_address_count - 1;
      Customer.updateAddressCount(theAddress);
      Customer.removeAddress(theAddress);
      customerCtrl.defaultAddressTab = "active";
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.saveGroup = function() {
      var group = CustomerGroups.getGroup(customerCtrl.customer.customer_group_id);
        group.$loaded().then(function() {
          customerCtrl.customer.customer_group_name = group.group_name;
          customerCtrl.customer.$save();
        });
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.saveCustomerStatus = function() {
      customerCtrl.getStatus();
      customerCtrl.customer.$save();
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.next = function() {
      var key = customerCtrl.customerIndex + 1;
      if (key != customerCtrl.totalCount) {
        customerCtrl.cid = Customer.getKey(key);
        customerCtrl.loadCustomer(customerCtrl.cid);
      }
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.back = function() {
      var key = customerCtrl.customerIndex - 1;
      if (key < 0) key = 0
      customerCtrl.cid = Customer.getKey(key);
      customerCtrl.loadCustomer(customerCtrl.cid);
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.first = function() {
      customerCtrl.cid = Customer.getKey(0);
      customerCtrl.loadCustomer(customerCtrl.cid);
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.last = function() {
      customerCtrl.cid = Customer.getKey(customerCtrl.totalCount - 1);
      customerCtrl.loadCustomer(customerCtrl.cid);
    }, function(error) {
      customerCtrl.error = error;
    };

}]);

app.controller('CustomersCtrl', ['Customers', 'CustomerGroups','$state', '$scope', '$stateParams',
  function (                      Customers,   CustomerGroups,  $state,   $scope,   $stateParams) {
    var customersCtrl = this;
    customersCtrl.listButtons = true;
    customersCtrl.customersTabActive = "active";

    customersCtrl.showListBtns = function() {
      customersCtrl.listButtons = true;
    };

    customersCtrl.showFeatureBtns = function() {
      customersCtrl.listButtons = false;
    };

    if ($stateParams.tabEntity === 1) {
      customersCtrl.showFeatureBtns();
      customersCtrl.groupsTabActive = "active";
      customersCtrl.customersTabActive = "";
    }

    customersCtrl.gridCustomers = {
      showGridFooter: true,
      enableSorting: true,
      enableCellEditOnFocus: true,
      enableFiltering: true,
      data: Customers.all,
      columnDefs: [
        { name: '', field: '$id', shown: false, cellTemplate: 'admin/sales/gridTemplates/editCustomer.html',
          width: 34, enableColumnMenu: false, headerTooltip: 'Edit Customer', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
        { name:'customerName', field: 'customer_full_name', enableHiding: false, enableCellEdit: false, width: '30%' },
        { name:'email', field: 'customer_email', enableHiding: false, width: '20%', enableCellEdit: false },
        { name:'customerGroup', field: 'customer_group_name', enableHiding: false, width: '15%', enableCellEdit: false },
        { name: 'customer_status_id', displayName: 'Status', editableCellTemplate: 'ui-grid/dropdownEditor', width: '15%',
          cellFilter: 'mapStatus', editDropdownValueLabel: 'status', enableFiltering: false, editDropdownOptionsArray: [
            { id: 1, status: 'Enabled' },
            { id: 2, status: 'Disabled' }
          ]},
        { name:'dateAdded', field: 'customer_date_added', type: 'date', enableHiding: false, cellClass: 'grid-align-right', enableCellEdit: false, cellFilter: 'date' },
        { name: ' ', field: '$id', cellTemplate:'admin/sales/gridTemplates/removeCustomer.html',
          width: 32, enableColumnMenu: false, enableCellEdit: false, enableFiltering: false }
      ]
    };

    customersCtrl.gridGroups = {
      enableSorting: true,
      enableCellEditOnFocus: true,
      data: CustomerGroups.all,
      columnDefs: [
        { name:'groupName', field: 'group_name', width: '70%', enableHiding: false },
        { name:'menuOrder', field: '$priority', enableHiding: false },
        { name: ' ', field: '$id', cellTemplate:'admin/sales/gridTemplates/removeCustomerGroup.html',
          width: 32, enableCellEdit: false, enableColumnMenu: false }
      ]
    };

    customersCtrl.addGroup = function() {
      var n = customersCtrl.gridGroups.data.length;
      CustomerGroups.all.$add({ $priority: n+1, group_name: customersCtrl.groupName });
      customersCtrl.groupName = null;
    }, function(error) {
      customersCtrl.error = error;
    };

    customersCtrl.removeGroup = function(row) {
      CustomerGroups.removeGroup(row.entity.$id);
    }, function(error) {
      customersCtrl.error = error;
    };

    customersCtrl.removeCustomer = function(row) {
      Customers.removeCustomer(row.entity.$id);
    }, function(error) {
      customersCtrl.error = error;
    };

    customersCtrl.editCustomer = function(row) {
      $state.go('admin.sales.customer', {'rowEntity': row.entity});
    };

    customersCtrl.gridCustomers.onRegisterApi = function(gridCustomersApi) {
      $scope.gridCustomersApi = gridCustomersApi;
        gridCustomersApi.edit.on.afterCellEdit($scope, function(rowEntity, newValue, oldValue) {
          if (rowEntity.customer_status_id === undefined)
            rowEntity.customer_status_id = 2;
          if (newValue != oldValue) {
            var theCustomer = {};
            theCustomer.pid = rowEntity.$id;
            theCustomer.customer_status_id = rowEntity.customer_status_id;
            if (rowEntity.customer_status_id === 1)
              theCustomer.customer_status = "1";
            else
              theCustomer.customer_status = "2";
            Customers.saveCustomer(theCustomer);
          }
        }, function(error) {
          customersCtrl.error = error;
      });
    };

    customersCtrl.getRows = function(item) {
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

app.controller('GiftcardsCtrl', ['Giftcards', '$state', '$scope', '$stateParams',
  function (                      Giftcards,   $state,   $scope,   $stateParams) {
    var giftcardsCtrl = this;
    giftcardsCtrl.allGiftcards = Giftcards.all;
    giftcardsCtrl.giftcard = {};
    giftcardsCtrl.giftcard.giftcard_status = 'Unclaimed';

    giftcardsCtrl.addGiftcard = function() {
      Giftcards.addGiftcard(giftcardsCtrl.giftcard);
//      giftcardsCtrl.giftcard.giftcard_name = null;
      giftcardsCtrl.giftcard.giftcard_amount = null;
    }, function(error) {
      giftcardsCtrl.error = error;
    };

    giftcardsCtrl.removeGiftcard = function(row) {
      Giftcards.removeGiftcard(row.entity.$id);
    }, function(error) {
      giftcardsCtrl.error = error;
    };

    giftcardsCtrl.gridGiftcards = {
      enableSorting: true,
      enableCellEditOnFocus: true,
      enableFiltering: true,
      data: Giftcards.all,
      columnDefs: [
//        { name:'giftCardName', field: 'giftcard_name', width: '20%', enableHiding: false },
        { name:'giftCardCode', field: '$id', enableHiding: false, enableFiltering: false },
        { name:'amount', field: 'giftcard_amount', width: '15%', enableHiding: false, enableFiltering: false,
        cellClass: 'grid-align-right', cellFilter:'currency' },
        { name:'status', field: 'giftcard_status', width: '15%', enableHiding: false, enableFiltering: true,
        cellClass: 'grid-align-right' },
        { name: ' ', field: '$id', cellTemplate:'admin/sales/gridTemplates/removeGiftcard.html',
          width: 35, enableCellEdit: false, enableFiltering: false, enableColumnMenu: false }
      ]
    };

}]);

app.controller('OrdersCtrl', ['Orders', '$state', '$scope', '$stateParams',
  function (                   Orders,   $state,   $scope,   $stateParams) {
    var ordersCtrl = this;



}]);

app.controller('RecurringCtrl', ['Recurring', '$state', '$scope', '$stateParams',
  function (                      Recurring,   $state,   $scope,   $stateParams) {
    var recurringCtrl = this;



}]);

app.controller('ReturnsCtrl', ['Returns', '$state', '$scope', '$stateParams',
  function (                    Returns,   $state,   $scope,   $stateParams) {
    var returnsCtrl = this;



}]);

app.controller('BannerCtrl', ['Banner', '$state', '$scope', 'FileReader', '$stateParams',
  function (                   Banner,   $state,   $scope,   FileReader,   $stateParams) {
    var bannerCtrl = this;
    var imageEntity = [];
    bannerCtrl.bannerName = "Home Page Banner";
    bannerCtrl.bid = "1";
    bannerCtrl.myInterval = 5000;
    bannerCtrl.noWrapSlides = false;
    bannerCtrl.bannerArray = 'yes';

    bannerCtrl.defaultSlides = [ {
      image: "/images/carousel-default-image.png",
    },
    {
      image: "/images/carousel-default-image.png",
    },
    {
      image: "/images/carousel-default-image.png",
    }]

    bannerCtrl.bannerImages = Banner.getImages(bannerCtrl.bid);
      bannerCtrl.bannerImages.$loaded().then(function() {
        if (bannerCtrl.bannerImages.length === 0) {
          bannerCtrl.bannerArray = 'no';
          bannerCtrl.bannerImages = bannerCtrl.defaultSlides;
        }
    });

    bannerCtrl.removeImage = function($id) {
      imageEntity.$id = $id;
      imageEntity.bid = bannerCtrl.bid;
      Banner.removeImage(imageEntity);
      $state.reload(bannerCtrl.currentState);
    }, function(error) {
      bannerCtrl.error = error;
    };

    $scope.getFile = function () {
      console.log($scope.file)
      FileReader.readAsDataURL($scope.file, $scope).then(function(result) {
        imageEntity.imageSrc = result;
        imageEntity.bid = bannerCtrl.bid;
        Banner.addImage(imageEntity).then(function() {
          $state.reload(bannerCtrl.currentState);
//          bannerCtrl.bannerArray = 'yes';
        });
      });
    };

}]);

app.controller('LibraryCtrl', ['Upload', 'DreamFactoryFilesUrl', '$timeout', '$state', '$scope', '$stateParams',
  function (                    Upload,   DreamFactoryFilesUrl,   $timeout,   $state,   $scope,   $stateParams) {
    var libraryCtrl = this;

/*    $scope.uploadFiles = function(file, errFiles) {
      $scope.f = file;
      $scope.errFile = errFiles && errFiles[0];
        if (file) {
          file.upload = Upload.upload({
            url: 'http://ec2-54-187-192-104.us-west-2.compute.amazonaws.com/files/marketplace',
            data: {file: file}
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
              file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }
  }
  */

  $scope.uploadFiles = function (blob) {

    Upload.http({
        url: DreamFactoryFilesUrl,
        headers : {
            "Content-Type": "image/png",
            "X-File-Name": blob.name
        },
        processData: false,
        data: blob

    }).then(function (resp) {
        //$rootScope.$broadcast('camera.upload');
    }, function (resp) {
        //$rootScope.$broadcast('camera.upload');
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ');
    });
}


}]);

app.controller('StoreCtrl', ['Store', 'Stores', 'Transactions', 'Countries', 'AlertService', '$state', '$scope', '$stateParams', '$http',
  function (                  Store,   Stores,   Transactions,   Countries,   AlertService,   $state,   $scope,   $stateParams,   $http) {
  var storeCtrl = this;
  storeCtrl.store = {};
  $scope.countries = Countries.all;
  $scope.address = {};

  storeCtrl.refreshAddresses = function(address) {
    var params = {address: address, sensor: false};
    return $http.get(
      'http://maps.googleapis.com/maps/api/geocode/json',
      {params: params}
    ).then(function(response) {
      $scope.addresses = response.data.results
    });
  };

  storeCtrl.parseAddress = function(address) {
    var addressArray = address.split(", ");
    var regionArray = addressArray[2].split(" ");
    storeCtrl.store.store_address_street = addressArray[0];
    storeCtrl.store.store_address_city = addressArray[1];
    storeCtrl.store.store_address_postal_code = regionArray[1] + " " + regionArray[2];
    storeCtrl.store.store_address_region = regionArray[0];
    storeCtrl.store.store_address_country = addressArray[3];

    if (regionArray[2] == undefined) {
      storeCtrl.store.store_address_postal_code = regionArray[1];
    };

    if (regionArray[1] == undefined && regionArray[2] == undefined) {
      storeCtrl.store.store_address_postal_code = "n/a";
    };

  };

  storeCtrl.loadStore = function(sid) {
    var theStore = Store.getStore(sid);
      theStore.$loaded().then(function() {
        storeCtrl.store = theStore;
        storeCtrl.storeIndex = Store.getIndex(sid);
        storeCtrl.count = Stores.all.length;
    });
  };

  if ($stateParams.rowEntity != undefined) {
    storeCtrl.loadStore($stateParams.rowEntity.$id);
    storeCtrl.sid = $stateParams.rowEntity.$id;
  } else {
    storeCtrl.sid = null;
  };

  storeCtrl.addStore = function() {
      Store.addStore(storeCtrl.store).then(function(sid) {
        storeCtrl.loadStore(sid)
      });
    }, function(error) {
      AlertService.addError(error.message);
    };

    storeCtrl.next = function() {
      if (storeCtrl.count > 0) {
        key = storeCtrl.storeIndex;
        if (key < storeCtrl.count - 1) {
          key = storeCtrl.storeIndex + 1;
          var sid = Store.getKey(key);
          storeCtrl.loadStore(sid);
        }
      }
    }, function(error) {
      storeCtrl.error = error;
    };

    storeCtrl.back = function() {
      var key = storeCtrl.storeIndex - 1;
      if (key < 0) key = 0
      var sid = Store.getKey(key);
      storeCtrl.loadStore(sid);
    }, function(error) {
      storeCtrl.error = error;
    };

    storeCtrl.first = function() {
      var key = 0;
      var sid = Store.getKey(key);
      storeCtrl.loadStore(sid);
    }, function(error) {
      storeCtrl.error = error;
    };

    storeCtrl.last = function() {
      var key = storeCtrl.count - 1;
      var sid = Store.getKey(key);
      storeCtrl.loadStore(sid);
    }, function(error) {
      storeCtrl.error = error;
    };

}]);

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
      { name:'storeName', field: 'store_name',
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

app.controller('UserCtrl', ['Auth', 'Profile', 'Users', 'User', 'Customers', 'AlertService', 'md5', 'tid', '$scope', '$state', '$stateParams',
  function (                 Auth,   Profile,   Users,   User,   Customers,   AlertService,   md5,   tid,   $scope,   $state,   $stateParams) {
    var userCtrl = this;
    userCtrl.user = {};
    userCtrl.totalCount = Users.all.length;

    userCtrl.loadUser = function(uid) {
      var theUser = User.getUser(uid);
      theUser.$loaded().then(function() {
        userCtrl.user = theUser;
        userCtrl.user.uid = uid;
        userCtrl.userIndex = User.getIndex(uid);
        if (userCtrl.user.type === 'Customer') {
          var theCustomer = Customers.getCustomer(userCtrl.user.cid);
          theCustomer.$loaded().then(function() {
            userCtrl.customer = theCustomer;
          });
        }
      });
    };

    if ($stateParams.rowEntity != undefined) {
      userCtrl.loadUser($stateParams.rowEntity.$id);
    } else {
      userCtrl.user.uid = null;
      userCtrl.user.user_full_name = 'New User';
    }

    userCtrl.addProfile = function() {
      userCtrl.profile = Profile.getProfile(userCtrl.uid);
      userCtrl.profile.$loaded().then(function() {
        userCtrl.profile.emailHash = md5.createHash(userCtrl.user.email);
        userCtrl.profile.first_name = userCtrl.user.first_name;
        userCtrl.profile.last_name = userCtrl.user.last_name;
        userCtrl.profile.full_name = userCtrl.user.first_name+' '+userCtrl.user.last_name;
        userCtrl.profile.email = userCtrl.user.email;
        userCtrl.profile.type = userCtrl.user.type;
        userCtrl.profile.status = userCtrl.user.status;
        userCtrl.profile.tid = tid;
        userCtrl.profile.$save();
      });
    }, function(error) {
      AlertService.addError(error.message);
    };

    userCtrl.createUser = function() {
      userCtrl.user.email = userCtrl.user.email;
      userCtrl.user.password = 'S1mpleOne';
      Auth.$createUser(userCtrl.user).then(function(user) {
        userCtrl.uid = user.uid;
        userCtrl.addProfile();
      }, function(error) {
        AlertService.addError(error.message);
      });
    };

    userCtrl.goCustomer = function(cid) {
      $state.go('admin.sales.customer', {'cid': cid});
    };

    userCtrl.next = function() {
      var key = userCtrl.userIndex + 1;
      if (key != userCtrl.totalCount) {
        userCtrl.uid = User.getKey(key);
        userCtrl.loadUser(userCtrl.uid);
      }
    }, function(error) {
      userCtrl.error = error;
    };

    userCtrl.back = function() {
      var key = userCtrl.userIndex - 1;
      if (key < 0) key = 0
      userCtrl.uid = User.getKey(key);
      userCtrl.loadUser(userCtrl.uid);
    }, function(error) {
      userCtrl.error = error;
    };

    userCtrl.first = function() {
      userCtrl.uid = User.getKey(0);
      userCtrl.loadUser(userCtrl.uid);
    }, function(error) {
      userCtrl.error = error;
    };

    userCtrl.last = function() {
      userCtrl.uid = User.getKey(userCtrl.totalCount - 1);
      userCtrl.loadUser(userCtrl.uid);
    }, function(error) {
      userCtrl.error = error;
    };

}]);

app.controller('UsersCtrl', ['Users', '$state', '$scope',
  function (                  Users,   $state,   $scope) {
    var usersCtrl = this;

    usersCtrl.editUser = function(row) {
      $state.go('admin.system.user', {'rowEntity': row.entity});
    };

    usersCtrl.gridUsers = {
      enableSorting: true,
      enableCellEditOnFocus: true,
      data: Users.all,
      columnDefs: [
        { name: '', field: '$id', shown: false, cellTemplate: 'admin/system/gridTemplates/editUser.html',
          width: 34, enableColumnMenu: false, headerTooltip: 'Edit User' },
        { name:'firstName', field: 'first_name', enableHiding: false },
        { name:'lastName', field: 'last_name', enableHiding: false },
        { name:'email', field: 'email', width: '50%', enableHiding: false },
        { name:'type', field: 'type', enableHiding: false },
        { name:'status', field: 'status', enableHiding: false },
      ]
    };

}]);
