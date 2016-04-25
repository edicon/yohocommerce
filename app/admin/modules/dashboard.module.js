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









}]);
