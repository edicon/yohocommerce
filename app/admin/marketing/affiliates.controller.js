app.controller('AffiliatesCtrl', ['Affiliates', '$state', '$scope', '$stateParams',
  function (                       Affiliates,   $state,   $scope,   $stateParams) {
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
        width: 53, enableColumnMenu: false, headerTooltip: 'Edit Affiliate', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
      { name:'affiliateName', field: 'affiliate_full_name', enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '20%' },
      { name:'phoneNumber', field: 'affiliate_phone', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '15%' },
      { name:'email', field: 'affiliate_email', enableHiding: false, enableFiltering: false, width: '20%', enableCellEdit: false },
      { name:'affiliateCode', field: '$id', enableHiding: false, enableFiltering: false, width: '25%', enableCellEdit: false },
      { name:'status', field: 'affiliate_status', enableHiding: false, enableFiltering: true, width: '10%', enableCellEdit: false },
      { name: ' ', field: '$id', cellTemplate:'admin/marketing/gridTemplates/removeAffiliate.html',
        width: 53, enableColumnMenu: false, enableCellEdit: false, enableFiltering: false }
    ]
  };

//editAffiliate function at the start of the grid
  affiliatesCtrl.editAffiliate = function(row) {
    $state.go('admin.marketing.affiliate', {'rowEntity': row.entity});
    console.log(row.entity)
  };

//called from removeAffiliate.html
    affiliatesCtrl.removeAffiliate = function(row) {
//calling affiliates.service.js removeAffiliate function to delete from firebase
      Affiliates.removeAffiliate(row.entity.$id);
    }, function(error) {
      affiliatesCtrl.error = error;
    };

  }
]);
