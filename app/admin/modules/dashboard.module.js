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

.factory('Log', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
    function (    $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
        var ref = new Firebase(FirebaseUrl+'logs');
        var logs = $firebaseArray(ref.child(tid).orderByPriority());

        var log = {

              getOnlineCount: function() {
                  return $firebaseObject(ref.child(tid).orderByChild("peopleOnline"));
              },

              updateOnlineCount: function(count) {
                  var theRef = new Firebase(FirebaseUrl+'logs/'+tid);
                  return theRef.update({ peopleOnline: count });
              },

              all: logs

        };

        return log;

    }

])

.controller('DashboardCtrl', ['Orders', 'Customers', 'Products', 'Log', 'tid', '$scope', '$state',
    function(                  Orders,   Customers,   Products,   Log,   tid,   $scope,   $state) {
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

        var customersOnline = Log.getOnlineCount();
            customersOnline.$loaded().then(function(){
            dashboardCtrl.onlineCount = customersOnline.peopleOnline;
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
