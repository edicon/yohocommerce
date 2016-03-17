app.controller('CustomerCtrl', ['Customer', 'Customers', 'CustomerGroups', '$state', '$scope', '$stateParams',
  function (                     Customer,   Customers,   CustomerGroups,   $state,   $scope,   $stateParams) {
    var customerCtrl = this;
    customerCtrl.customer = {};
    customerCtrl.groups = CustomerGroups.all;
    customerCtrl.totalCount = Customers.all.length;

    customerCtrl.loadCustomer = function(cid) {
      var theCustomer = Customer.getCustomer(cid);
        theCustomer.$loaded().then(function() {
          customerCtrl.customer = theCustomer;
          customerCtrl.customerIndex = Customer.getIndex(cid);
          customerCtrl.defaultAddressTab = "active";
          customerCtrl.cid = cid;

      });
      var theAddresses = Customer.getAddresses(cid);
        theAddresses.$loaded().then(function() {
          customerCtrl.addresses = theAddresses;
      });
    };

    if ($stateParams.cid === null) {
      if ($stateParams.rowEntity != undefined) {
        customerCtrl.loadCustomer($stateParams.rowEntity.$id);
      } else {
        customerCtrl.customer.customer_full_name = 'New Customer';
        customerCtrl.cid = null;
      }
    } else {
      customerCtrl.loadCustomer($stateParams.cid);
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
            Customer.addCustomer(customerCtrl.customer).then(function(cid) {
            customerCtrl.loadCustomer(cid);
          });
      });
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.getAddress = function(addressId) {
      var theAddress = Customer.getAddress(customerCtrl.cid, addressId);
        theAddress.$loaded().then(function() {
          customerCtrl.address = theAddress;
      });
    };

    customerCtrl.addAddress = function() {
      var theAddress = {};
      theAddress.cid = customerCtrl.cid;
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
      theAddress.cid = customerCtrl.cid;
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
      var key = customerCtrl.customerIndex + 1;
      if (key != customerCtrl.totalCount) {
        customerCtrl.cid = Customer.getKey(key);
        customerCtrl.loadCustomer(customerCtrl.cid);
      }
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.back = function() {
      var key = customerCtrl.customerIndex - 1;
      if (key < 0) key = 0
      customerCtrl.cid = Customer.getKey(key);
      customerCtrl.loadCustomer(customerCtrl.cid);
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.first = function() {
      customerCtrl.cid = Customer.getKey(0);
      customerCtrl.loadCustomer(customerCtrl.cid);
    }, function(error) {
      customerCtrl.error = error;
    };

    customerCtrl.last = function() {
      customerCtrl.cid = Customer.getKey(customerCtrl.totalCount - 1);
      customerCtrl.loadCustomer(customerCtrl.cid);
    }, function(error) {
      customerCtrl.error = error;
    };

}]);
