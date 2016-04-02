'use strict';

angular.module('MarketingModule', [
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

.config(    ['$stateProvider', '$httpProvider',
    function( $stateProvider,   $httpProvider) {

      $stateProvider

          .state('admin.marketing', {
              url: '/marketing',
              views: {
                  "header@admin": {
                    templateUrl: 'admin/views/marketing/marketing.header.html'
                  },
                  "main@admin": {
                    templateUrl: 'admin/views/marketing/marketing.html'
                  },
                  "list@admin.marketing": {
                    controller: 'AffiliatesCtrl as affiliatesCtrl',
                    templateUrl: 'admin/views/marketing/affiliates.html'
                  }
              }
          })
          .state('admin.marketing.affiliates', {
              url: '/affiliates',
              params: {
                  rowEntity: null,
              },
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/marketing/affiliates.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/marketing/marketing.html'
                  },
                  "list@admin.marketing.affiliates": {
                      controller: 'AffiliatesCtrl as affiliatesCtrl',
                      templateUrl: 'admin/views/marketing/affiliates.html'
                  }
              }
          })
          .state('admin.marketing.affiliate', {
              url: '/affiliate',
              params: {
                  rowEntity: null,
              },
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/marketing/affiliate.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/marketing/marketing.html'
                  },
                  "list@admin.marketing.affiliate": {
                      controller: 'AffiliateCtrl as affiliateCtrl',
                      templateUrl: 'admin/views/marketing/affiliate.html'
                  }
              }
          })
          .state('admin.marketing.coupons', {
              url: '/coupons',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/marketing/coupons.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/marketing/marketing.html'
                  },
                  "list@admin.marketing.coupons": {
                      controller: 'CouponsCtrl as couponsCtrl',
                      templateUrl: 'admin/views/marketing/coupons.html'
                  }
              }
          })
          .state('admin.marketing.rewardpoints', {
              url: '/rewardpoints',
              views: {
                  "header@admin": {
                      templateUrl: 'admin/views/marketing/coupons.header.html'
                  },
                  "main@admin": {
                      templateUrl: 'admin/views/marketing/marketing.html'
                  },
                  "list@admin.marketing.rewardpoints": {
                      controller: 'RewardPointsCtrl as rewardPointsCtrl',
                      templateUrl: 'admin/views/marketing/rewardpoints.html'
                  }
              }
          })

      }

])

.factory('Affiliates', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (         $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'affiliates');
          var affiliates = $firebaseArray(ref.child(tid).orderByPriority());

          var affiliate = {

              removeAffiliate: function(aid) {
                  return $firebaseObject(ref.child(tid).child(aid)).$remove();
              },

              all: affiliates

          };

          return affiliate;

      }

])

.factory('Affiliate', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (        $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'affiliates');
          var affiliates = $firebaseArray(ref.child(tid).orderByPriority());

          var affiliate = {

              getAffiliate: function(aid) {
                  return $firebaseObject(ref.child(tid).child(aid));
              },

              addAffiliate: function(theObj) {
                  return affiliate.all.$add(theObj).then(function(postRef){
                      return postRef.key();
                  });
              },

              getIndex: function(aid) {
                  return affiliates.$indexFor(aid);
              },

              getKey: function(key) {
                  return affiliates.$keyAt(key);
              },

              getCount: function() {
                  return affiliates.length;
              },

            all: affiliates

          };

          return affiliate;

      }

])

.factory('Coupons', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (             $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
          var ref = new Firebase(FirebaseUrl+'coupons');
          var coupons = $firebaseArray(ref.child(tid).orderByPriority());

          var coupon = {

              addCoupon: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'coupons/'+tid);
                  return theRef.push(theObj);
              },

              removeCoupon: function(theObj) {
                  var theRef = new Firebase(FirebaseUrl+'coupons/'+tid+'/'+theObj.couponId);
                  return theRef.remove();
              },

              all: coupons,

          };

          return coupon;

      }

])

.factory('RewardPoints', ['$firebaseObject', 'FirebaseUrl', 'tid',
      function (           $firebaseObject,   FirebaseUrl,   tid) {
            var ref = new Firebase(FirebaseUrl+'reward_points');

            var rewardpoint = {

                addRewardPoints: function(theObj) {
                    var theRef = new Firebase(FirebaseUrl+'reward_points/'+tid);
                    return theRef.push(theObj);
                },

                getRewardPoints: function() {
                    var theRef = new Firebase(FirebaseUrl+'reward_points/'+tid);
                    return $firebaseObject(theRef);
                },

            };

            return rewardpoint;
      }

])

.factory('Transactions', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'tid',
      function (                  $firebaseArray,   $firebaseObject,   FirebaseUrl,   tid) {
            var ref = new Firebase(FirebaseUrl+'transactions');
            var transactions = $firebaseArray(ref.child(tid).orderByPriority());

            var transaction = {

                getTransactions: function(aid) {
                    var theRef = new Firebase(FirebaseUrl+'transactions/'+tid+'/'+aid);
                    return $firebaseArray(theRef);
                },

                addTransaction: function(theObj) {
                    theObj.transaction_date_added = Firebase.ServerValue.TIMESTAMP;
                        var theRef = new Firebase(FirebaseUrl+'transactions/'+tid+'/'+theObj.aid);
                        return theRef.push(theObj);
                },

                all: transactions,

            };

            return transaction;
      }

])

.controller('AffiliateCtrl', ['Affiliate', 'Affiliates', 'Transactions', 'Countries', 'AlertService', '$state', '$scope', '$stateParams', '$http',
        function (             Affiliate,   Affiliates,   Transactions,   Countries,   AlertService,   $state,   $scope,   $stateParams,   $http) {
              var affiliateCtrl = this;
              affiliateCtrl.affiliate = {};
              $scope.countries = Countries.all;
              $scope.transactions = Transactions.all;
              $scope.address = {};

              affiliateCtrl.refreshAddresses = function(address) {
                  var params = {address: address, sensor: false};
                  return $http.get(
                      'http://maps.googleapis.com/maps/api/geocode/json',
                      {params: params}
                  ).then(function(response) {
                      $scope.addresses = response.data.results
                  });
              };

              affiliateCtrl.parseAddress = function(address) {
                    var addressArray = address.split(", ");
                    var regionArray = addressArray[2].split(" ");
                    affiliateCtrl.affiliate.affiliate_address_street = addressArray[0];
                    affiliateCtrl.affiliate.affiliate_address_city = addressArray[1];
                    affiliateCtrl.affiliate.affiliate_address_postal_code = regionArray[1] + " " + regionArray[2];
                    affiliateCtrl.affiliate.affiliate_address_region = regionArray[0];
                    affiliateCtrl.affiliate.affiliate_address_country = addressArray[3];

                    if (regionArray[2] == undefined) {
                          affiliateCtrl.affiliate.affiliate_address_postal_code = regionArray[1];
                    };

                    if (regionArray[1] == undefined && regionArray[2] == undefined) {
                          affiliateCtrl.affiliate.affiliate_address_postal_code = "n/a";
                    };
              };

              affiliateCtrl.loadAffiliate = function(aid) {
                    var theAffiliate = Affiliate.getAffiliate(aid);
                          theAffiliate.$loaded().then(function() {
                                affiliateCtrl.affiliate.affiliate_full_name = affiliateCtrl.affiliate.affiliate_first_name + ' ' + affiliateCtrl.affiliate.affiliate_last_name;
                                affiliateCtrl.affiliate = theAffiliate;
                                affiliateCtrl.affiliateIndex = Affiliate.getIndex(aid);
                                affiliateCtrl.count = Affiliates.all.length;
                          });

                    var theTransactions = Transactions.getTransactions(aid);
                        theTransactions.$loaded().then(function() {
                              affiliateCtrl.gridTransactions.data = theTransactions;
                        });
              };

              if ($stateParams.rowEntity != undefined) {
                    affiliateCtrl.loadAffiliate($stateParams.rowEntity.$id);
                    affiliateCtrl.aid = $stateParams.rowEntity.$id;
              } else {
                    affiliateCtrl.aid = null;
              };

              affiliateCtrl.addAffiliate = function() {
                    affiliateCtrl.affiliate.affiliate_full_name = affiliateCtrl.affiliate.affiliate_first_name + ' ' + affiliateCtrl.affiliate.affiliate_last_name;
                        Affiliate.addAffiliate(affiliateCtrl.affiliate).then(function(aid) {
                            affiliateCtrl.loadAffiliate(aid)
                        });

              }, function(error) {
                    AlertService.addError(error.message);
              };

              affiliateCtrl.addTransaction = function() {
                    affiliateCtrl.transaction.aid = affiliateCtrl.aid;
                    Transactions.addTransaction(affiliateCtrl.transaction);

              }, function(error) {
                    affiliateCtrl.error = error;
              };

              affiliateCtrl.gridTransactions = {
                    enableSorting: true,
                    enableCellEditOnFocus: true,
                    columnDefs: [
                          { name:'dateAdded', field: 'transaction_date_added', width: '15%', type: 'date', enableHiding: false, cellClass: 'grid-align-left',
                              enableCellEdit: false, cellFilter: 'date' },
                          { name:'description', field: 'transaction_description', width: '70%', enableHiding: false },
                          { name:'amount', field: 'transaction_amount', width: '15%', enableHiding: false, cellFilter: 'currency' },

                    ]
              };

              affiliateCtrl.next = function() {

                    if (affiliateCtrl.count > 0) {
                          key = affiliateCtrl.affiliateIndex;

                            if (key < affiliateCtrl.count - 1) {
                                  key = affiliateCtrl.affiliateIndex + 1;
                                  var aid = Affiliate.getKey(key);
                                  affiliateCtrl.loadAffiliate(aid);
                            }
                    }

              }, function(error) {
                    affiliateCtrl.error = error;
              };

              affiliateCtrl.back = function() {
                    var key = affiliateCtrl.affiliateIndex - 1;

                    if (key < 0) key = 0
                          var aid = Affiliate.getKey(key);

                    affiliateCtrl.loadAffiliate(aid);

              }, function(error) {
                    affiliateCtrl.error = error;
              };

              affiliateCtrl.first = function() {
                    var key = 0;
                    var aid = Affiliate.getKey(key);
                    affiliateCtrl.loadAffiliate(aid);

              }, function(error) {
                    affiliateCtrl.error = error;
              };

                affiliateCtrl.last = function() {
                    var key = affiliateCtrl.count - 1;
                    var aid = Affiliate.getKey(key);
                    affiliateCtrl.loadAffiliate(aid);

              }, function(error) {
                    affiliateCtrl.error = error;
              };

        }

])

.controller('AffiliatesCtrl', ['Affiliates', '$state', '$scope', '$stateParams',
        function (              Affiliates,   $state,   $scope,   $stateParams) {
              var affiliatesCtrl = this;

              affiliatesCtrl.gridAffiliates = {
                    showGridFooter: true,
                    enableSorting: true,
                    enableCellEditOnFocus: true,
                    enableFiltering: true,
                    data: Affiliates.all,
                    columnDefs: [
                          { name: '', field: '$id', shown: false, cellTemplate: 'admin/views/marketing/gridTemplates/editAffiliate.html',
                            width: 35, enableColumnMenu: false, headerTooltip: 'Edit Affiliate', enableCellEdit: false, enableCellEdit: false, enableFiltering: false },
                          { name:'affiliateName', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.affiliate_first_name}} {{row.entity.affiliate_last_name}}</div>',
                           enableHiding: false, enableFiltering: true, enableCellEdit: false, width: '25%' },
                          { name:'phoneNumber', field: 'affiliate_phone', enableHiding: false, enableFiltering: false, enableCellEdit: false },
                          { name:'email', field: 'affiliate_email', enableHiding: false, enableFiltering: false, width: '20%', enableCellEdit: false },
                          { name:'affiliateCode', field: '$id', enableHiding: false, enableFiltering: false, enableCellEdit: false },
                          { name:'status', field: 'affiliate_status', enableHiding: false, enableFiltering: true, width: '10%', enableCellEdit: false },
                          { name: ' ', field: '$id', cellTemplate:'admin/views/marketing/gridTemplates/removeAffiliate.html',
                            width: 35, enableColumnMenu: false, enableCellEdit: false, enableFiltering: false }
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

        }

])

.controller('CouponsCtrl', ['Coupons', '$state', '$scope', '$stateParams',
        function (           Coupons,   $state,   $scope,   $stateParams) {
              var couponsCtrl = this;
              couponsCtrl.allCoupons = Coupons.all;
              couponsCtrl.coupon = {};
              couponsCtrl.coupon.coupon_type = 'Percent';

              couponsCtrl.addCoupon = function() {
                    Coupons.addCoupon(couponsCtrl.coupon);
                    couponsCtrl.coupon.coupon_name = null;
                    couponsCtrl.coupon.coupon_discount = null;
                    couponsCtrl.coupon.coupon_type = null;

              }, function(error) {
                    couponsCtrl.error = error;
              };

              couponsCtrl.gridCoupons = {
                    enableSorting: true,
                    enableCellEditOnFocus: true,
                    data: Coupons.all,
                    columnDefs: [
                          { name:'couponName', field: 'coupon_name', width: '30%', enableHiding: false },
                          { name:'discountAmount', field: 'coupon_discount', width: '20%', enableHiding: false, cellClass: 'grid-align-right' },
                          { name:'type', field: 'coupon_type', width: '10%', enableHiding: false, cellClass: 'grid-align-right' },
                          { name:'couponCode', field: '$id', enableHiding: false, cellClass: 'grid-align-right' },
                          { name: ' ', field: '$id', cellTemplate:'admin/views/marketing/gridTemplates/removeCoupon.html',
                            width: 35, enableCellEdit: false, enableColumnMenu: false }
                    ]
              };

              couponsCtrl.updateType = function(type) {
                    couponsCtrl.coupon.coupon_type = type;
              }, function(error) {
                    couponsCtrl.error = error;
              };

              couponsCtrl.removeCoupon = function(row) {
                    var theCoupon = {};
                    theCoupon.couponId = row.entity.$id;
                    Coupons.removeCoupon(theCoupon);
              }, function(error) {
                    couponsCtrl.error = error;
              };

        }

])

.controller('RewardPointsCtrl', ['RewardPoints',
        function (                RewardPoints) {
              var rewardPointsCtrl = this;
              rewardPointsCtrl.reward_points = {};

              var thePoints = RewardPoints.getRewardPoints();
                    thePoints.$loaded().then(function() {
                        rewardPointsCtrl.reward_points = thePoints;
                    });

              rewardPointsCtrl.updateRewardPoints = function() {
                    rewardPointsCtrl.reward_points.$save();
              }, function(error) {
                    rewardPointsCtrl.error = error;
              };

        }

])
