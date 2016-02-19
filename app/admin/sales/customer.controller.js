app.controller('CustomerCtrl', ['Customer', 'Customers', 'CustomerGroups', '$state', '$scope', '$stateParams',
  function (                     Customer,   Customers,   CustomerGroups,   $state,   $scope,   $stateParams) {
    var customerCtrl = this;

    customerCtrl.customer = {};
    customerCtrl.groups = CustomerGroups.all;

    customerCtrl.loadCustomer = function(custId) {
      var theCustomer = Customer.getCustomer(custId);
        theCustomer.$loaded().then(function() {
          customerCtrl.customer = theCustomer;
          customerCtrl.customerIndex = Customer.getIndex(custId);
          customerCtrl.defaultAddressTab = "active";
          customerCtrl.custId = custId;
          customerCtrl.count = Customers.all.length;
      });
      var theAddresses = Customer.getAddresses(custId);
        theAddresses.$loaded().then(function() {
          customerCtrl.addresses = theAddresses;
      });
    };

    if ($stateParams.rowEntity != undefined) {
      customerCtrl.loadCustomer($stateParams.rowEntity.$id);
    } else {
      customerCtrl.customer.customer_full_name = 'New Customer';
      customerCtrl.custId = null;
    }

    customerCtrl.routeGroups = function() {
      $state.go('admin.sales.customers');
    };

    customerCtrl.getStatus = function() {
      if (customerCtrl.customer.customer_status === "1") {
        customerCtrl.customer.customer_status_id = 1;
      } else {
        customerCtrl.customer.customer_status_id = 2;
      }
    };

    customerCtrl.addCustomer = function() {
      customerCtrl.getStatus();
      var group = CustomerGroups.getGroup(customerCtrl.customer.customer_group_id);
        group.$loaded().then(function() {
          customerCtrl.customer.customer_address_count = 0;
          customerCtrl.customer.customer_group_name = group.group_name;
          customerCtrl.customer.customer_full_name = customerCtrl.customer.customer_first_name + ' ' + customerCtrl.customer.customer_last_name;
            Customer.addCustomer(customerCtrl.customer).then(function(custId) {
            customerCtrl.loadCustomer(custId);
          });
      });
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.getAddress = function(addressId) {
      var theAddress = Customer.getAddress(customerCtrl.custId, addressId);
        theAddress.$loaded().then(function() {
          customerCtrl.address = theAddress;
      });
    };

    customerCtrl.addAddress = function() {
      var theAddress = {};
      theAddress.custId = customerCtrl.custId;
      if (customerCtrl.customer.customer_address_count === 0) {
        theAddress.addressCount = 1;
        theAddress.priority = 1;
      } else {
        var cnt = customerCtrl.customer.customer_address_count + 1;
        theAddress.addressCount = cnt;
        theAddress.priority = cnt;
      }
      Customer.updateAddressCount(theAddress);
      Customer.addAddress(theAddress);
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.removeAddress = function(addressId) {
      var theAddress = {};
      theAddress.addressId = addressId;
      theAddress.custId = customerCtrl.custId;
      theAddress.addressCount = customerCtrl.customer.customer_address_count - 1;
      Customer.updateAddressCount(theAddress);
      Customer.removeAddress(theAddress);
      customerCtrl.defaultAddressTab = "active";
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.saveGroup = function() {
      var group = CustomerGroups.getGroup(customerCtrl.customer.customer_group_id);
        group.$loaded().then(function() {
          customerCtrl.customer.customer_group_name = group.group_name;
          customerCtrl.customer.$save();
        });
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.saveCustomerStatus = function() {
      customerCtrl.getStatus();
      customerCtrl.customer.$save();
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.next = function() {
      if (customerCtrl.count > 0) {
        key = customerCtrl.customerIndex;
        if (key < customerCtrl.count - 1) {
          key = customerCtrl.customerIndex + 1;
          var custId = Customer.getKey(key);
          customerCtrl.loadCustomer(custId);
        }
      }
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.back = function() {
      var key = customerCtrl.customerIndex - 1;
      if (key < 0) key = 0
      var custId = Customer.getKey(key);
      customerCtrl.loadCustomer(custId);
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.first = function() {
      var key = 0;
      var custId = Customer.getKey(key);
      customerCtrl.loadCustomer(custId);
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.last = function() {
      var key = customerCtrl.count - 1;
      var custId = Customer.getKey(key);
      customerCtrl.loadCustomer(custId);
    }, function(error) {
      customerCtrl.error = error;
    };

console.log($scope)

}]);
