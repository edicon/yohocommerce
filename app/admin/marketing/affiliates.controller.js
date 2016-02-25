app.controller('AffiliatesCtrl', ['Affiliates', '$state', '$scope',
  function (                      Affiliates,   $state,   $scope) {
  var affiliatesCtrl = this;
  affiliatesCtrl.currentState = $state.current.name;
  console.log(affiliatesCtrl.currentState)

  console.log($scope)

//grid settings for affiliates.html
  affiliatesCtrl.gridAffiliates = {
    showGridFooter: true,
    enableSorting: true,
    enableCellEditOnFocus: true,
    enableFiltering: true,
    data: Affiliates.all,
    columnDefs: [
      { name: '', field: '$id', shown: false, cellTemplate: 'admin/marketing/gridTemplates/editAffiliate.html',
        width: 50, enableColumnMenu: false, headerTooltip: 'Edit Affiliate', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
      { name:'affiliateName', field: 'affiliate_full_name', enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '30%' },
      { name:'email', field: 'affiliate_email', enableHiding: false, enableFiltering: false, width: '20%', enableCellEdit: false },
      { name:'affiliateCode', field: '$id', enableHiding: false, enableFiltering: false, width: '20%', enableCellEdit: false },
      { name: 'customer_status_id', displayName: 'Status', editableCellTemplate: 'ui-grid/dropdownEditor', width: '20%',
        cellFilter: 'mapStatus', editDropdownValueLabel: 'status', enableFiltering: false, editDropdownOptionsArray: [
          { id: 1, status: 'Enabled' },
          { id: 2, status: 'Disabled' }
        ]},
      { name: ' ', field: '$id', cellTemplate:'admin/marketing/gridTemplates/removeAffiliate.html',
        width: 50, enableColumnMenu: false, enableCellEdit: false, enableFiltering: false }
    ]
  };

//editAffiliate function at the start of the grid
  affiliatesCtrl.editAffiliate = function(row) {
    console.log(gotaffiliate)
    $state.go('admin.marketing.affiliate', {'rowEntity': row.entity});
  };

  }
]);
