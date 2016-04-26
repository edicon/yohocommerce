'use strict';

angular.module('DashboardModule', [
  'ngAnimate',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ngMessages',
  'firebase',
  'ui.bootstrap',
  'ui.router',
  'ui.grid',
  'ui.grid.edit',
  'ui.grid.cellNav',
  'ui.grid.selection'

])

.controller('DashboardCtrl', ['Orders', 'Customers', 'Products', 'tid', '$scope', '$state',
    function(                  Orders,   Customers,   Products,   tid,   $scope,   $state) {
        var dashboardCtrl = this;

        var theOrders = Orders.getOrdersCount();
            theOrders.$loaded().then(function() {
                dashboardCtrl.theOrders = theOrders;
                dashboardCtrl.theOrders.count = theOrders.length;
            });

        var theCustomers = Customers.getCustomersCount();
            theCustomers.$loaded().then(function() {
                dashboardCtrl.theCustomers = theCustomers;
                dashboardCtrl.theCustomers.count = theCustomers.length;
            });

        var theProducts = Products.getProductsCount();
            theProducts.$loaded().then(function() {
                dashboardCtrl.theProducts = theProducts;
                dashboardCtrl.theProducts.count = theProducts.length;
            });

        dashboardCtrl.gridOrders = {
              enableSorting: false,
              enableColumnMenus: false,
              enableCellEditOnFocus: false,
              enableFiltering: false,
              enableHiding: false,
              data: Orders.all,
              columnDefs: [
                    { name:'dateAdded', field: 'create_date', sort: { direction: 'desc' }, cellFilter: 'date',  width: '22%' },
                    { name:'orderCode', field: '$id' },
                    { name:'orderTotal', field: 'total', width: '20%',
                        cellClass: 'grid-align-right', cellFilter:'currency' }
              ]
        };

        dashboardCtrl.gridActivity = {
              enableSorting: false,
              enableColumnMenus: false,
              enableCellEditOnFocus: false,
              enableFiltering: false,
              enableHiding: false,
            //  data: Orders.all,
              columnDefs: [
                    { name:'activity', field: 'activity', width: '20%' },
                    { name:'username', field: '$id' },
                    { name:'role', field: 'type', width: '20%' },
              ]
        };

}]);
