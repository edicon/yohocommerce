app.controller('ProductCtrl', ['Product', 'SubCategories', 'Categories', 'CustomerGroups', '$filter', '$state', '$scope', '$stateParams', 'FileReader',
  function (                    Product,   SubCategories,   Categories,   CustomerGroups,   $filter,   $state,   $scope,   $stateParams,   FileReader) {
    var productCtrl = this;

    productCtrl.categories = Categories.all;
    productCtrl.customerGroups = CustomerGroups.all;
    productCtrl.imageEntity =[];
    productCtrl.count = Product.getCount();
    productCtrl.product = {};

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
      productCtrl.productName = $stateParams.rowEntity.product_name;
      productCtrl.pid = $stateParams.rowEntity.$id;
      productCtrl.loadProduct(productCtrl.pid);
    } else {
      productCtrl.productName = 'New Product';
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
          theSpecial.special_price = productCtrl.special.special_price;
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

    productCtrl.nextProduct = function() {
      var key = productCtrl.productIndex + 1;
      if (key != productCtrl.count) {
        var pid = Product.getKey(key);
        productCtrl.loadProduct(pid);
      }
    }, function(error) {
      productCtrl.error = error;
    };

    productCtrl.backProduct = function() {
      var key = productCtrl.productIndex - 1;
      if (key < 0) key = 0
      var pid = Product.getKey(key);
      productCtrl.loadProduct(pid);
    }, function(error) {
      productCtrl.error = error;
    };

    productCtrl.firstProduct = function() {
      var key = 0;
      var pid = Product.getKey(key);
      productCtrl.loadProduct(pid);
    }, function(error) {
      productCtrl.error = error;
    };

    productCtrl.lastProduct = function() {
      var key = productCtrl.count - 1;
      var pid = Product.getKey(key);
      productCtrl.loadProduct(pid);
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
