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
        width: 53, enableColumnMenu: false, headerTooltip: 'Edit Affiliate', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
      { name:'affiliateName', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.affiliate_first_name}} {{row.entity.affiliate_last_name}}</div>',
       enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '20%' },
      { name:'phoneNumber', field: 'affiliate_phone', enableHiding: false, enableFiltering: false, enableCellEdit: false, width: '15%' },
      { name:'email', field: 'affiliate_email', enableHiding: false, enableFiltering: false, width: '20%', enableCellEdit: false },
      { name:'affiliateCode', field: '$id', enableHiding: false, enableFiltering: false, width: '25%', enableCellEdit: false },
      { name:'status', field: 'affiliate_status', enableHiding: false, enableFiltering: true, width: '10%', enableCellEdit: false },
      { name: ' ', field: '$id', cellTemplate:'admin/marketing/gridTemplates/removeAffiliate.html',
        width: 53, enableColumnMenu: false, enableCellEdit: false, enableFiltering: false }
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
