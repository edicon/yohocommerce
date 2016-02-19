app.controller('BannersCtrl', ['Banners', '$state', '$scope',
  function (                    Banners,   $state,   $scope) {
    var bannersCtrl = this;

    bannersCtrl.currentState = $state.current.name;
    console.log(bannersCtrl.currentState)

    bannersCtrl.gridOpts = {
      enableSorting: true,
      enableCellEditOnFocus: true,
      data: Banners.all,
      columnDefs: [
        { name: '', field: '$id', shown: false, cellTemplate: 'admin/system/gridTemplates/editBannerBtn.html',
          width: 34, enableColumnMenu: false, headerTooltip: 'Add Banners' },
        { name:'bannerName', field: 'banner_name', width: '70%', enableHiding: false },
        { name:'bannerLocation', field: 'banner_location', enableHiding: false },
        { name:'bannerStatus', field: 'banner_status', enableHiding: false },
        { name: ' ', field: '$id', cellTemplate:'admin/system/gridTemplates/deleteBannerBtn.html',
          width: 32, enableColumnMenu: false }
      ]
    };

    bannersCtrl.newBanner = function() {
      Banners.all.$add({ banner_name: bannersCtrl.bannerName, banner_status: bannersCtrl.bannerStatus });
      bannersCtrl.bannerName = null;
    }, function(error) {
      bannersCtrl.error = error;
    };

    bannersCtrl.deleteCatagory = function(row) {
      Banners.removeBanner(row.entity);
    }, function(error) {
      bannersCtrl.error = error;
    };

    bannersCtrl.editCatagory = function(row) {
      if ($state.current.name === 'admin.system.banners')
        $state.go('admin.system.banner', {'rowEntity': row.entity});
    };

    bannersCtrl.gridOpts.onRegisterApi = function(gridApi) {
      $scope.gridApi = gridApi;
        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, newValue, oldValue) {
          if (newValue != oldValue) {
            var currentBanner = Banners.getBanner(rowEntity);
            currentBanner.banner_name = rowEntity.banner_name;
            currentBanner.banner_status = rowEntity.banner_status;
            currentBanner.$save();
          }
        }, function(error) {
          bannersCtrl.error = error;
      });
    };
  }
]);

app.controller('DefaultBannersCtrl', ['Banners', '$state', '$scope',
  function (                           Banners,   $state,   $scope) {

    var defaultData = [{
      $id: "1",
      banner_name: "Home Page Banner (Top)",
      banner_location: "Home Page",
      banner_status: "Enabled"
    },
    {
      $id: "2",
      banner_name: "Home Page Vendor Banner (Footer)",
      banner_location: "Home Page",
      banner_status: "Enabled"
    }];

    $scope.gridOpts = {
      minRowsToShow: 2,
      enableSorting: false,
      enableColumnMenus: false,
      data: defaultData,
      columnDefs: [
        { name: '', field: '$id', shown: false, cellTemplate: 'admin/system/gridTemplates/editHomeBannersBtn.html',
          width: 34, enableColumnMenu: false, headerTooltip: 'Add Banners' },
        { name:'defaultHomePageBanners', field: 'banner_name', width: '70%', enableHiding: false, enableSorting: false },
        { name:'bannerLocation', field: 'banner_location', enableHiding: false, enableSorting: false },
        { name:'bannerStatus', field: 'banner_status', enableHiding: false, enableSorting: false }
      ]
    };

    $scope.editBanner = function(row) {
      console.log(row.entity)
      if ($state.current.name === 'admin.system.banners')
        $state.go('admin.system.banner', {'rowEntity': row.entity});
    };
      console.log($scope)

  }
]);
