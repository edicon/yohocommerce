app.controller('CustomersCtrl', ['Customers', 'CustomerGroups','$state', '$scope', '$stateParams',
  function (                      Customers,   CustomerGroups,  $state,   $scope,   $stateParams) {
    var customersCtrl = this;

    customersCtrl.listButtons = true;
    customersCtrl.customersTabActive = "active";

    customersCtrl.showListBtns = function() {
      customersCtrl.listButtons = true;
    };

    customersCtrl.showFeatureBtns = function() {
      customersCtrl.listButtons = false;
    };

    if ($stateParams.tabEntity === 1) {
      customersCtrl.showFeatureBtns();
      customersCtrl.groupsTabActive = "active";
      customersCtrl.customersTabActive = "";
    }

    customersCtrl.gridCustomers = {
      showGridFooter: true,
      enableSorting: true,
      enableCellEditOnFocus: true,
      enableFiltering: true,
      data: Customers.all,
      columnDefs: [
        { name: '', field: '$id', shown: false, cellTemplate: 'admin/sales/gridTemplates/editCustomer.html',
          width: 34, enableColumnMenu: false, headerTooltip: 'Edit Customer', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
        { name:'customerName', field: 'customer_full_name', enableHiding: false, enableCellEdit: false, width: '30%' },
        { name:'email', field: 'customer_email', enableHiding: false, width: '20%', enableCellEdit: false },
        { name:'customerGroup', field: 'customer_group_name', enableHiding: false, width: '15%', enableCellEdit: false },
        { name: 'customer_status_id', displayName: 'Status', editableCellTemplate: 'ui-grid/dropdownEditor', width: '15%',
          cellFilter: 'mapStatus', editDropdownValueLabel: 'status', enableFiltering: false, editDropdownOptionsArray: [
            { id: 1, status: 'Enabled' },
            { id: 2, status: 'Disabled' }
          ]},
        { name:'dateAdded', field: 'customer_date_added', type: 'date', enableHiding: false, cellClass: 'grid-align-right', enableCellEdit: false, cellFilter: 'date' },
        { name: ' ', field: '$id', cellTemplate:'admin/sales/gridTemplates/removeCustomer.html',
          width: 32, enableColumnMenu: false, enableCellEdit: false, enableFiltering: false }
      ]
    };

    customersCtrl.gridGroups = {
      enableSorting: true,
      enableCellEditOnFocus: true,
      data: CustomerGroups.all,
      columnDefs: [
        { name:'groupName', field: 'group_name', width: '70%', enableHiding: false },
        { name:'menuOrder', field: '$priority', enableHiding: false },
        { name: ' ', field: '$id', cellTemplate:'admin/sales/gridTemplates/removeCustomerGroup.html',
          width: 32, enableCellEdit: false, enableColumnMenu: false }
      ]
    };

    customersCtrl.addGroup = function() {
      var n = customersCtrl.gridGroups.data.length;
      CustomerGroups.all.$add({ $priority: n+1, group_name: customersCtrl.groupName });
      customersCtrl.groupName = null;
    }, function(error) {
      customersCtrl.error = error;
    };

    customersCtrl.removeGroup = function(row) {
      CustomerGroups.removeGroup(row.entity.$id);
    }, function(error) {
      customersCtrl.error = error;
    };

    customersCtrl.removeCustomer = function(row) {
      Customers.removeCustomer(row.entity.$id);
    }, function(error) {
      customersCtrl.error = error;
    };

    customersCtrl.editCustomer = function(row) {
      $state.go('admin.sales.customer', {'rowEntity': row.entity});
    };

    customersCtrl.gridCustomers.onRegisterApi = function(gridCustomersApi) {
      $scope.gridCustomersApi = gridCustomersApi;
        gridCustomersApi.edit.on.afterCellEdit($scope, function(rowEntity, newValue, oldValue) {
          if (rowEntity.customer_status_id === undefined)
            rowEntity.customer_status_id = 2;
          if (newValue != oldValue) {
            var theCustomer = {};
            theCustomer.pid = rowEntity.$id;
            theCustomer.customer_status_id = rowEntity.customer_status_id;
            if (rowEntity.customer_status_id === 1)
              theCustomer.customer_status = "1";
            else
              theCustomer.customer_status = "2";
            Customers.saveCustomer(theCustomer);
          }
        }, function(error) {
          customersCtrl.error = error;
      });
    };

    customersCtrl.getRows = function(item) {
      angular.element(document.getElementsByClassName('grid')[0]).css('height', item.px + 'px');
    };

}])

.filter('mapStatus', function() {
  var statusHash = {
    1: 'Enabled',
    2: 'Disabled'
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return statusHash[input];
    }
  };
});
