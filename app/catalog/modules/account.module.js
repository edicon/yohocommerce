'use strict';

angular.module('AccountModule', [
  'ngAnimate',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ngMessages',
  'firebase',
  'ui.bootstrap',
  'ui.router',
  'ui.select'

])

.config (    ['$stateProvider', '$urlRouterProvider',
    function ( $stateProvider,   $urlRouterProvider) {

        $urlRouterProvider.otherwise('/account');

        $stateProvider
            .state('account', {
                url: '/account',
                abstract: true,
                views: {
                    "": {
                        controller: 'AccountCtrl as accountCtrl',
                        templateUrl: 'catalog/views/account/account.html'
                    }
                },
                resolve: {
                    auth: function($state, Auth) {
                        return Auth.$requireAuth().catch(function() {
                            $state.go('catalog.home');
                        });
                    },
                    profile: function($state, Profile, Auth) {
                        return Auth.$requireAuth().then(function(auth) {
                            return Profile.getProfile(auth.uid).$loaded().then(function(response) {
                                if (response.type != 'Customer')
                                    $state.go('catalog.home');
                                else
                                    return response;
                            });
                        });
                    }
                }
          })
          .state('account.detail', {
              url: '',
              views: {
                  "accountHeader@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/header.html'
                  },
                  "accountNav@account": {
                      templateUrl: 'catalog/views/account/accountnav.html'
                  },
                  "accountDetail@account": {
                      controller: 'AccountAddressCtrl as accountAddressCtrl',
                      templateUrl: 'catalog/views/account/accountaddress.html'
                  },
                  "accountFooter@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/footer.html'
                  },
              }
          })
          .state('account.address', {
              url: '/address',
              views: {
                  "accountHeader@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/header.html'
                  },
                  "accountNav@account": {
                      templateUrl: 'catalog/views/account/accountnav.html'
                  },
                  "accountDetail@account": {
                      controller: 'AccountAddressCtrl as accountAddressCtrl',
                      templateUrl: 'catalog/views/account/accountaddress.html'
                  },
                  "accountFooter@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/footer.html'
                  }
              }
          })
          .state('account.orders', {
              url: '/orders',
              views: {
                  "accountHeader@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/header.html'
                  },
                  "accountNav@account": {
                      templateUrl: 'catalog/views/account/accountnav.html'
                  },
                  "accountDetail@account": {
                      controller: 'AccountCtrl as accountCtrl',
                      templateUrl: 'catalog/views/account/orders.html'
                  },
                  "accountFooter@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/footer.html'
                  }
              }
          })
          .state('account.transactions', {
              url: '/transactions',
              views: {
                  "accountHeader@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/header.html'
                  },
                  "accountNav@account": {
                      templateUrl: 'catalog/views/account/accountnav.html'
                  },
                  "accountDetail@account": {
                      controller: 'AccountTransactionsCtrl as accountTransactionsCtrl',
                      templateUrl: 'catalog/views/account/transactions.html'
                  },
                  "accountFooter@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/footer.html'
                  }
              }
          })
          .state('account.rewardpoints', {
              url: '/rewardpoints',
              views: {
                  "accountHeader@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/header.html'
                  },
                  "accountNav@account": {
                      templateUrl: 'catalog/views/account/accountnav.html'
                  },
                  "accountDetail@account": {
                      controller: 'AccountRewardPointsCtrl as accountRewardPointsCtrl',
                      templateUrl: 'catalog/views/account/rewardpoints.html'
                  },
                  "accountFooter@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/footer.html'
                  }
            }
          })
          .state('account.giftcard', {
              url: '/giftcard',
              views: {
                  "accountHeader@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/header.html'
                  },
                  "accountNav@account": {
                      templateUrl: 'catalog/views/account/accountnav.html'
                  },
                  "accountDetail@account": {
                      controller: 'AccountGiftCardCtrl as accountGiftCardCtrl',
                      templateUrl: 'catalog/views/account/giftcard.html'
                  },
                  "accountFooter@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/footer.html'
                  }
              }
          })
          .state('account.password', {
              url: '/password',
              views: {
                  "accountHeader@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/header.html'
                  },
                  "accountNav@account": {
                      templateUrl: 'catalog/views/account/accountnav.html'
                  },
                  "accountDetail@account": {
                      controller: 'AccountPasswordCtrl as accountPasswordCtrl',
                      templateUrl: 'catalog/views/account/password.html'
                  },
                  "accountFooter@account": {
                      controller: 'CatalogCtrl as catalogCtrl',
                      templateUrl: 'catalog/views/common/footer.html'
                  }
              }
          })

      }

])

.factory('GiftCard', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (       $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'giftcards');

          var giftcard = {

              getGiftCard: function(theObj) {
                  return $firebaseArray(ref.child(tid).orderByChild("customer_email").equalTo(theObj.email));
              },
          };

          return giftcard;
      }

])

.factory('UsersOnlineLog', ['$firebaseObject', 'FirebaseUrl', 'tid',
    function (               $firebaseObject,   FirebaseUrl,   tid) {
        var ref = new Firebase(FirebaseUrl+'logs/'+tid+'/current_customers_online');

        var log = {

              getOnlineCount: function() {
                  return $firebaseObject(ref);
              },

              updateOnlineCount: function(count) {
                  return ref.update({ current_count: count });
              },

        };

        return log;

    }

])

.factory('TheOrders', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (        $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'orders');
          var orders = $firebaseArray(ref.child(tid).orderByPriority());

          var order = {

              getCustomerOrder: function(id) {
                  return $firebaseArray(ref.child(tid).orderByChild("customer_id").equalTo(id));
              },

          };

          return order;

      }

])

.controller('AccountCtrl', ['Auth', 'TheCustomer', 'AlertService', 'UsersOnlineLog', '$state', 'profile',
    function (               Auth,   TheCustomer,   AlertService,   UsersOnlineLog,   $state,   profile) {
        var accountCtrl = this;
            accountCtrl.profile = profile;

            var theCustomer = TheCustomer.getCustomer(accountCtrl.profile.cid);
                theCustomer.$loaded().then(function() {
                    accountCtrl.customer = theCustomer;
                    TheCustomer.addLog(theCustomer.$id);
                    var theCount = UsersOnlineLog.getOnlineCount();
                        theCount.$loaded().then(function() {
                            if (theCount.$value == null)
                                theCount.current_count = 0;

                            theCount.current_count = theCount.current_count + 1;
                            UsersOnlineLog.updateOnlineCount(theCount.current_count);
                        });
                });

            accountCtrl.logout = function() {
                var theCount = UsersOnlineLog.getOnlineCount();
                    theCount.$loaded().then(function() {
                        if (theCount.$value == null)
                            theCount.current_count = 0;
                        else
                            theCount.current_count = theCount.current_count - 1;

                        if (theCount.current_count < 0)
                            theCount.current_count = 0;

                        UsersOnlineLog.updateOnlineCount(theCount.current_count);
                  });
                  Auth.$unauth();
                  $state.go('catalog.home');
          };

      }

])

.controller('AccountAddressCtrl', ['AlertService', 'TheCustomer', 'tid', '$scope', 'profile',
      function (                    AlertService,   TheCustomer,   tid,   $scope,   profile) {
          var accountAddressCtrl = this;
          $scope.country = {};
          $scope.country.selected = {};
          accountAddressCtrl.profile = profile;

          var theCustomer = TheCustomer.getCustomer(accountAddressCtrl.profile.cid);
              theCustomer.$loaded().then(function() {
                  accountAddressCtrl.customer = theCustomer;
                  $scope.country.selected = accountAddressCtrl.customer.customer_country;
              });

      }

])

.controller('AccountTransactionsCtrl', ['TheOrders', 'AlertService', 'tid', '$scope', 'profile',
      function (                         TheOrders,   AlertService,   tid,   $scope,   profile) {
          var accountTransactionsCtrl = this;

          var theTransaction = TheOrders.getCustomerOrder(profile.cid);
              theTransaction.$loaded().then(function(){
                  accountTransactionsCtrl.gridTransactions.data = theTransaction;
          });

          accountTransactionsCtrl.gridTransactions = {
              enableSorting: true,
              enableCellEditOnFocus: true,
              enableFiltering: true,
              columnDefs: [
                  { name:'orderDate', field: 'create_date', width:'15%', enableHiding: false, enableFiltering: false, cellFilter:'date:"longDate"' },
                  { name:'orderID', field: 'order_id', enableHiding: false, enableFiltering: false },
                  { name:'orderTotal', field: 'total', width:'15%', cellClass:'grid-align-right', enableHiding: false, enableFiltering: false },
              ]
          };

      }

])

.controller('AccountRewardPointsCtrl', ['Auth', 'TheCustomer', 'AlertService', 'UsersOnlineLog', '$state', 'profile',
    function (                           Auth,   TheCustomer,   AlertService,   UsersOnlineLog,   $state,   profile) {
        var accountRewardPointsCtrl = this;

            var theCustomer = TheCustomer.getCustomer(profile.cid);
                theCustomer.$loaded().then(function() {
                    accountRewardPointsCtrl.customer = theCustomer;
                    if (accountRewardPointsCtrl.customer.reward_points == undefined) {
                        accountRewardPointsCtrl.customer.reward_points = 0;
                      };
                });

      }

])

.controller('AccountGiftCardCtrl', ['GiftCard', 'AlertService', 'tid', '$scope', 'profile',
      function (                     GiftCard,   AlertService,   tid,   $scope,   profile) {
          var accountGiftCardCtrl = this;

          var theGiftCard = GiftCard.getGiftCard(profile);
              theGiftCard.$loaded().then(function() {
                accountGiftCardCtrl.gridGiftCards.data = theGiftCard;
          });

          accountGiftCardCtrl.gridGiftCards = {
              enableSorting: true,
              enableCellEditOnFocus: true,
              enableFiltering: true,
              columnDefs: [
                  { name:'giftCardCode', field: '$id', enableHiding: false, enableFiltering: false },
                  { name:'amount', field: 'giftcard_amount', width: '15%', enableHiding: false, enableFiltering: false,
                  cellClass: 'grid-align-right', cellFilter:'currency' },
                  { name:'status', field: 'giftcard_status', width: '15%', enableHiding: false, enableFiltering: true,
                  cellClass: 'grid-align-right' },
              ]
          };

      }

])

.controller('AccountPasswordCtrl', ['Auth', 'TheCustomer', 'AlertService', 'Messages', 'tid', 'profile',
      function (                     Auth,   TheCustomer,   AlertService,   Messages,   tid,   profile) {
          var accountPasswordCtrl = this;
          accountPasswordCtrl.profile = profile;

          var theCustomer = TheCustomer.getCustomer(accountPasswordCtrl.profile.cid);
              theCustomer.$loaded().then(function() {
                  accountPasswordCtrl.customer = theCustomer;
          });


          accountPasswordCtrl.forgotPassword = function() {
              Auth.$resetPassword({
                  email: accountPasswordCtrl.customer.customer_email
                  }).then(function() {
                      AlertService.addSuccess(Messages.send_email_success);
                      $state.go('catalog.home');
                  }).catch(function(error) {
                      console.error("Error: ", error);
                  });
          };

          accountPasswordCtrl.newPassword = function() {
              if (accountPasswordCtrl.customer.customer_new_password == accountPasswordCtrl.customer.confirm_new_password){
                Auth.$changePassword({
                    email: accountPasswordCtrl.customer.customer_email,
                    oldPassword: accountPasswordCtrl.customer.customer_password,
                    newPassword: accountPasswordCtrl.customer.customer_new_password
                    }).then(function() {
                        AlertService.addSuccess(Messages.save_password_success);
                        accountPasswordCtrl.customer.customer_password = null;
                        accountPasswordCtrl.customer.customer_new_password = null;
                        accountPasswordCtrl.customer.confirm_new_password = null;
                    }).catch(function(error) {
                        console.error("Error: ", error);
                    });
              } else {
                  AlertService.addError(Messages.passwords_dont_match);
              };
          };
      }

])
