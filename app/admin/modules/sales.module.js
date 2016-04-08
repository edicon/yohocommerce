'use strict';

angular.module('SalesModule', [
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

.config(    ['$stateProvider',
    function( $stateProvider) {

        $stateProvider

            .state('admin.sales', {
                url: '/sales',
                views: {
                    "header@admin": {
                          templateUrl: 'admin/views/sales/sales.header.html'
                    },
                    "main@admin": {
                          templateUrl: 'admin/views/sales/sales.html'
                    },
                    "list@admin.sales": {
                          controller: 'CustomersCtrl as customersCtrl',
                          templateUrl: 'admin/views/sales/customers.html'
                    }
                }
            })
            .state('admin.sales.orders', {
                url: '/orders',
                  views: {
                      "header@admin": {
                          templateUrl: 'admin/views/sales/orders.header.html'
                      },
                      "main@admin": {
                          templateUrl: 'admin/views/sales/sales.html'
                      },
                      "list@admin.sales.orders": {
                          controller: 'OrdersCtrl as ordersCtrl',
                          templateUrl: 'admin/views/sales/orders.html'
                      }
                }
            })
            .state('admin.sales.recurring', {
                  url: '/recurring',
                  views: {
                      "header@admin": {
                          templateUrl: 'admin/views/sales/recurring.header.html'
                      },
                      "main@admin": {
                          templateUrl: 'admin/views/sales/sales.html'
                      },
                      "list@admin.sales.recurring": {
                          controller: 'RecurringCtrl as recurringCtrl',
                          templateUrl: 'admin/views/sales/orders.html'
                      }
                  }
            })
            .state('admin.sales.returns', {
                  url: '/returns',
                  views: {
                      "header@admin": {
                          templateUrl: 'admin/views/sales/returns.header.html'
                      },
                      "main@admin": {
                          templateUrl: 'admin/views/sales/sales.html'
                      },
                      "list@admin.sales.returns": {
                          controller: 'ReturnsCtrl as returnsCtrl',
                          templateUrl: 'admin/views/sales/returns.html'
                      }
                  }
            })
            .state('admin.sales.customers', {
                  url: '/customers',
                  params: {
                    tabEntity: null,
                  },
                  views: {
                      "header@admin": {
                          templateUrl: 'admin/views/sales/customers.header.html'
                      },
                      "main@admin": {
                          templateUrl: 'admin/views/sales/sales.html'
                      },
                      "list@admin.sales.customers": {
                          controller: 'CustomersCtrl as customersCtrl',
                          templateUrl: 'admin/views/sales/customers.html'
                      }
                  }
            })
            .state('admin.sales.customergroups', {
                  url: '/customergroups',
                  params: {
                    tabEntity: null,
                  },
                  views: {
                      "header@admin": {
                          templateUrl: 'admin/views/sales/customergroups.header.html'
                      },
                      "main@admin": {
                          templateUrl: 'admin/views/sales/sales.html'
                      },
                      "list@admin.sales.customergroups": {
                          controller: 'CustomersCtrl as customersCtrl',
                          templateUrl: 'admin/views/sales/customergroups.html'
                      }
                  }
            })
            .state('admin.sales.giftcards', {
                  url: '/giftcards',
                  views: {
                      "header@admin": {
                          templateUrl: 'admin/views/sales/giftcards.header.html'
                      },
                      "main@admin": {
                          templateUrl: 'admin/views/sales/sales.html'
                      },
                      "list@admin.sales.giftcards": {
                          controller: 'GiftCardsCtrl as giftCardsCtrl',
                          templateUrl: 'admin/views/sales/giftcards.html'
                      }
                  }
            })
            .state('admin.sales.order', {
                url: '/order',
                views: {
                    "header@admin": {
                        templateUrl: 'admin/views/sales/order.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/sales/sales.html'
                    },
                    "list@admin.sales.order": {
                        controller: 'OrderCtrl as orderCtrl',
                        templateUrl: 'admin/views/sales/orders.html'
                    }
                }
            })
            .state('admin.sales.return', {
                  url: '/returns',
                  views: {
                      "header@admin": {
                          templateUrl: 'admin/views/sales/returns.header.html'
                      },
                      "main@admin": {
                          templateUrl: 'admin/views/sales/sales.html'
                      },
                      "list@admin.sales.return": {
                          controller: 'ReturnsCtrl as returnsCtrl',
                          templateUrl: 'admin/views/sales/returns.html'
                      }
                  }
            })
            .state('admin.sales.customer', {
                url: '/customer',
                params: {
                  rowEntity: null,
                  cid: null,
                },
                views: {
                    "header@admin": {
                        templateUrl: 'admin/views/sales/customer.header.html'
                    },
                    "main@admin": {
                        templateUrl: 'admin/views/sales/sales.html'
                    },
                    "list@admin.sales.customer": {
                        controller: 'CustomerCtrl as customerCtrl',
                        templateUrl: 'admin/views/sales/customer.html'
                    }
                }
            })
            .state('addressDefault', {
                url: '/addressDefault',
                controller: 'CustomersCtrl as customersCtrl',
                resolve: {
                    auth: function($state, Wow, Auth) {
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
            })
            .state('address1', {
                url: '/address1',
                controller: 'CustomersCtrl as customersCtrl',
                resolve: {
                    auth: function($state, Wow, Auth) {
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
            })
            .state('address2', {
                url: '/address2',
                controller: 'CustomersCtrl as customersCtrl',
                resolve: {
                    auth: function($state, Wow, Auth) {
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
            })
            .state('address3', {
                url: '/address3',
                controller: 'CustomersCtrl as customersCtrl',
                resolve: {
                    auth: function($state, Wow, Auth) {
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Wow, Auth){
                        return Auth.$requireAuth();
                    }
                }
            })
            .state('address4', {
                url: '/address4',
                controller: 'CustomersCtrl as customersCtrl',
                resolve: {
                    auth: function($state, Wow, Auth) {
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
            })
            .state('address5', {
                url: '/address5',
                controller: 'CustomersCtrl as customersCtrl',
                resolve: {
                    auth: function($state, Wow, Auth) {
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
            })
            .state('address6', {
                url: '/address6',
                controller: 'CustomersCtrl as customersCtrl',
                resolve: {
                    auth: function($state, Wow, Auth) {
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
            })
            .state('address7', {
                url: '/address7',
                controller: 'CustomersCtrl as customersCtrl',
                resolve: {
                    auth: function($state, Wow, Auth) {
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
            })
            .state('address8', {
                url: '/address8',
                controller: 'CustomersCtrl as customersCtrl',
                resolve: {
                    auth: function($state, Wow, Auth) {
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
            })
            .state('address9', {
                url: '/address9',
                controller: 'CustomersCtrl as customersCtrl',
                resolve: {
                    auth: function($state, Wow, Auth) {
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
            })
            .state('address10', {
                url: '/address10',
                controller: 'CustomersCtrl as customersCtrl',
                resolve: {
                    auth: function($state, Wow, Auth) {
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                      });
                    },
                    profile: function(Auth){
                        return Auth.$requireAuth();
                    }
                }
            })
      }

])

.factory('Customer', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (       $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'customers');
          var customers = $firebaseArray(ref.child(tid).orderByPriority());

          var customer = {

              getCustomer: function(cid) {
                  return $firebaseObject(ref.child(tid).child(cid));
              },

              addCustomer: function(theObj) {
                  theObj.customer_date_added = Firebase.ServerValue.TIMESTAMP;
                  return customer.all.$add(theObj).then(function(postRef) {
                      return postRef.key();
                  });
              },

              getAddresses: function(cid) {
                  var addressRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+cid+'/addresses');
                  return $firebaseArray(addressRef);
              },

              getAddress: function(cid, addressId) {
                  var addressRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+cid+'/addresses/'+addressId);
                  return $firebaseObject(addressRef);
              },

              addAddress: function(theObj) {
                  var custRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theObj.cid+'/addresses');
                  return custRef.push({ priority: theObj.priority });
              },

              updateAddressCount: function(theObj) {
                  var custRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theObj.cid);
                  return custRef.update( {customer_address_count: theObj.addressCount} );
              },

              recountAddresses: function(cid) {
                  var cnt = 1;
                  var data = $firebaseArray(ref.child(tid).child(cid).child("addresses").orderByChild("priority"));
                  data.$loaded().then(function() {
                      for(var i = 0; i < data.length; i++) {
                          var addressRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+cid+'/addresses/'+data[i].$id);
                          addressRef.update({ priority: cnt });
                          cnt = cnt + 1;
                      }
                  });
              },

              removeAddress: function(theObj) {
                  var custRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theObj.cid+'/addresses/'+theObj.addressId);
                  custRef.remove();
                  return customer.recountAddresses(theObj.cid);
              },

              getIndex: function(cid) {
                  return customers.$indexFor(cid);
              },

              getKey: function(key) {
                  return customers.$keyAt(key);
              },

              getCount: function() {
                  return customers.length;
              },

              all: customers

          };

          return customer;
      }

])

.factory('CustomerGroups', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
            var ref = new Firebase(FirebaseUrl+'customer_groups');
            var groups = $firebaseArray(ref.child(tid).orderByPriority());

            var group = {

                  getGroup: function(gid) {
                      return $firebaseObject(ref.child(tid).child(gid));
                  },

                  removeGroup: function(gid) {
                      return $firebaseObject(ref.child(tid).child(gid)).$remove();
                  },

                  all: groups

            };

            return group;

      }

])

.factory('Customers', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (        $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'customers');
          var customers = $firebaseArray(ref.child(tid).orderByPriority());

          var customer = {

              getCustomer: function(cid) {
                  return $firebaseObject(ref.child(tid).child(cid));
              },

              removeCustomer: function(cid) {
                  return $firebaseObject(ref.child(tid).child(cid)).$remove();
              },

              saveCustomer: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'customers/'+tid+'/'+theObj.pid);
                  return theRef.update({ customer_status_id: theObj.customer_status_id, customer_status: theObj.customer_status });
              },

              all: customers

          };

          return customer;

      }

])

.factory('GiftCards', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (        $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'giftcards');
          var giftcards = $firebaseArray(ref.child(tid).orderByPriority());

          var giftcard = {

              getCustomerGiftCard: function(theObj) {
                  return $firebaseArray(ref.child(tid).orderByChild("customer_email").equalTo(theObj.customer_email));

              },

              getGiftCard: function(gid) {
                  return $firebaseObject(ref.child(tid).child(gid));
              },

              addGiftCard: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'giftcards/'+tid);
                  return theRef.push(theObj);
              },

              removeGiftCard: function(gid) {
                  return $firebaseObject(ref.child(tid).child(gid)).$remove();
              },

              all: giftcards

          };

          return giftcard;
      }

])

.factory('Orders', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (     $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'orders');
          var orders = $firebaseArray(ref.child(tid).orderByPriority());

          var order = {

              getOrder: function(oid) {
                  return $firebaseObject(ref.child(tid).child(oid));
              },

              all: orders

          };

          return order;

      }

])

.factory('Returns', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (            $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'returns');
          var returns = $firebaseArray(ref.child(tid).orderByPriority());

          var returned = {

              getReturn: function(oid) {
                  return $firebaseObject(ref.child(tid).child(oid));
              },

              all: returns

          };

          return returned;

      }

])

.controller('CustomerCtrl', ['Customer', 'GiftCards', 'Customers', 'CustomerGroups', '$state', '$scope', '$stateParams',
      function (              Customer,   GiftCards,   Customers,   CustomerGroups,   $state,   $scope,   $stateParams) {
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
                      var theGiftCard = GiftCards.getCustomerGiftCard(customerCtrl.customer);
                          theGiftCard.$loaded().then(function() {
                          customerCtrl.gridGiftCard.data = theGiftCard;
                          });
                  });
              var theAddresses = Customer.getAddresses(cid);
                  theAddresses.$loaded().then(function() {
                      customerCtrl.addresses = theAddresses;
                  });

          };

          if ($stateParams.rowEntity != undefined) {
                customerCtrl.loadCustomer($stateParams.rowEntity.$id);
          } else {
                customerCtrl.cid = null;
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

          customerCtrl.gridGiftCard = {
              enableSorting: true,
              enableCellEditOnFocus: true,
              enableFiltering: true,
              columnDefs: [
                  { name:'giftCardCode', field: '$id', enableHiding: false, enableFiltering: false },
                  { name:'amount', field: 'giftcard_amount', width: '20%', enableHiding: false, enableFiltering: false,
                  cellClass: 'grid-align-right', cellFilter:'currency' },
                  { name:'status', field: 'giftcard_status', width: '25%', enableHiding: false, enableFiltering: true,
                  cellClass: 'grid-align-right' },
              ]
          };

          customerCtrl.updateCustomer = function() {
            if (customerCtrl.cid != null)
                customerCtrl.customer.$save();
          }, function(error) {
                storeCtrl.error = error;
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

      }

])

.controller('CustomersCtrl', ['Customers', 'CustomerGroups','$state', '$scope', '$stateParams',
      function (               Customers,   CustomerGroups,  $state,   $scope,   $stateParams) {
          var customersCtrl = this;
          customersCtrl.listButtons = true;

          customersCtrl.showListBtns = function() {
                customersCtrl.listButtons = true;
          };

          customersCtrl.showFeatureBtns = function() {
                customersCtrl.listButtons = false;
          };

          if ($stateParams.tabEntity === 1)
                customersCtrl.showFeatureBtns();

          customersCtrl.gridCustomers = {
                showGridFooter: true,
                enableSorting: true,
                enableCellEditOnFocus: true,
                enableFiltering: true,
                data: Customers.all,
                columnDefs: [
                      { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/sales/gridTemplates/editCustomer.html',
                        width: 34, enableColumnMenu: false, headerTooltip: 'Edit Customer', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
                      { name:'customerName', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.customer_first_name}} {{row.entity.customer_last_name}}</div>',
                       enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '25%' },
                      { name:'email', field: 'customer_email', enableHiding: false, width: '20%', enableCellEdit: false },
                      { name:'customerGroup', field: 'customer_group_name', enableHiding: false, width: '15%', enableCellEdit: false },
                      { name: 'customer_status_id', displayName: 'Status', editableCellTemplate: 'ui-grid/dropdownEditor', width: '15%',
                            cellFilter: 'mapStatus', editDropdownValueLabel: 'status', enableFiltering: false, editDropdownOptionsArray: [
                              { id: 1, status: 'Enabled' },
                              { id: 2, status: 'Disabled' }
                            ]},
                      { name:'dateAdded', field: 'customer_date_added', type: 'date', enableHiding: false, cellClass: 'grid-align-right',
                            enableCellEdit: false, cellFilter: 'date' },
                      { name: ' ', field: '$id', cellTemplate:'admin/views/sales/gridTemplates/removeCustomer.html',
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
                      { name: ' ', field: '$id', cellTemplate:'admin/views/sales/gridTemplates/removeCustomerGroup.html',
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

      }

])

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
})

.controller('GiftCardsCtrl', ['GiftCards', '$state', '$scope', '$stateParams',
      function (               GiftCards,   $state,   $scope,   $stateParams) {
          var giftCardsCtrl = this;
          giftCardsCtrl.allGiftcards = GiftCards.all;
          giftCardsCtrl.giftcard = {};
          giftCardsCtrl.giftcard.giftcard_status = 'Unclaimed';

          giftCardsCtrl.addGiftcard = function() {
                Giftcards.addGiftcard(giftCardsCtrl.giftcard);
                giftCardsCtrl.giftcard.customer_email = null;
                giftCardsCtrl.giftcard.giftcard_amount = null;

          }, function(error) {
                giftCardsCtrl.error = error;
          };

          giftCardsCtrl.removeGiftCard = function(row) {
                Giftcards.removeGiftCard(row.entity.$id);

          }, function(error) {
                giftCardsCtrl.error = error;
          };

          giftCardsCtrl.gridGiftCards = {
                enableSorting: true,
                enableCellEditOnFocus: true,
                enableFiltering: true,
                data: GiftCards.all,
                columnDefs: [
                      { name:'giftCardCode', field: '$id', enableHiding: false, enableFiltering: false },
                      { name:'customerEmail', field: 'customer_email',  width: '35%', enableHiding: false, enableFiltering: false },
                      { name:'amount', field: 'giftcard_amount', width: '15%', enableHiding: false, enableFiltering: false,
                          cellClass: 'grid-align-right', cellFilter:'currency' },
                      { name:'status', field: 'giftcard_status', width: '15%', enableHiding: false, enableFiltering: true,
                          cellClass: 'grid-align-right' },
                      { name: ' ', field: '$id', cellTemplate:'admin/views/sales/gridTemplates/removeGiftcard.html',
                          width: 35, enableCellEdit: false, enableFiltering: false, enableColumnMenu: false }
                ]
          };

      }
])

.controller('OrdersCtrl', ['Orders', '$state', '$scope', '$stateParams',
      function (            Orders,   $state,   $scope,   $stateParams) {
          var ordersCtrl = this;

      }

])

.controller('RecurringCtrl', ['Recurring', '$state', '$scope', '$stateParams',
      function (               Recurring,   $state,   $scope,   $stateParams) {
          var recurringCtrl = this;

      }

])

.controller('ReturnsCtrl', ['Returns', '$state', '$scope', '$stateParams',
      function (             Returns,   $state,   $scope,   $stateParams) {
          var returnsCtrl = this;

      }

])
