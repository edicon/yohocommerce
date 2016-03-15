app.controller('ExtensionsCtrl', ['$state', '$scope', '$stateParams',
  function (                       $state,   $scope,   $stateParams) {
  var extensionsCtrl = this;

  extensionsCtrl.gridModules = {
    showGridFooter: true,
    enableSorting: true,
    enableCellEditOnFocus: true,
    enableFiltering: true,
//    data: Modules.all,
    columnDefs: [
      { name: '', field: '$id', shown: false, cellTemplate: 'admin/extensions/gridTemplates/editModule.html',
        width: 35, enableColumnMenu: false, headerTooltip: 'Edit', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
      { name:'moduleName', field: 'module_name', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '50%' },
      { name: '', field: '$id', shown: false, cellTemplate: 'admin/extensions/gridTemplates/installModule.html',
        width: 35, enableColumnMenu: false, headerTooltip: 'Install', enableCellEdit: false, enableCellEdit: false, enableFiltering: false }

    ]
  };

  extensionsCtrl.gridShipping = {
    showGridFooter: true,
    enableSorting: true,
    enableCellEditOnFocus: true,
    enableFiltering: true,
//    data: Shipping.all,
    columnDefs: [
      { name: '', field: '$id', shown: false, cellTemplate: 'admin/extensions/gridTemplates/editShipper.html',
        width: 35, enableColumnMenu: false, headerTooltip: 'Edit', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
      { name:'shippingMethod', field: 'shipping_name', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '73%' },
      { name:'shippingStatus', field: 'shipping_status', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '20%' },
      { name: '', field: '$id', shown: false, cellTemplate: 'admin/extensions/gridTemplates/installShipper.html',
        width: 35, enableColumnMenu: false, headerTooltip: 'Install', enableCellEdit: false, enableCellEdit: false, enableFiltering: false }

    ]
  };

  extensionsCtrl.gridPayment = {
    showGridFooter: true,
    enableSorting: true,
    enableCellEditOnFocus: true,
    enableFiltering: true,
//    data: Payments.all,
    columnDefs: [
      { name: '', field: '$id', shown: false, cellTemplate: 'admin/extensions/gridTemplates/editShipper.html',
        width: 35, enableColumnMenu: false, headerTooltip: 'Edit', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
      { name:'paymentMethod', field: 'payment_name', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '73%' },
      { name:'paymentStatus', field: 'shipping_status', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '20%' },
      { name: '', field: '$id', shown: false, cellTemplate: 'admin/extensions/gridTemplates/installShipper.html',
        width: 35, enableColumnMenu: false, headerTooltip: 'Install', enableCellEdit: false, enableCellEdit: false, enableFiltering: false }

    ]
  };

  extensionsCtrl.gridFeeds = {
    showGridFooter: true,
    enableSorting: true,
    enableCellEditOnFocus: true,
    enableFiltering: true,
//    data: Payments.all,
    columnDefs: [
      { name: '', field: '$id', shown: false, cellTemplate: 'admin/extensions/gridTemplates/editFeed.html',
        width: 35, enableColumnMenu: false, headerTooltip: 'Edit', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
      { name:'feedName', field: 'feed_name', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '73%' },
      { name:'feedStatus', field: 'feed_status', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '20%' },
      { name: '', field: '$id', shown: false, cellTemplate: 'admin/extensions/gridTemplates/installFeed.html',
        width: 35, enableColumnMenu: false, headerTooltip: 'Install', enableCellEdit: false, enableCellEdit: false, enableFiltering: false }

    ]
  };

}
]);
