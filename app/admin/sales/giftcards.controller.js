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
