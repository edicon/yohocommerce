'use strict';

angular.module('app')
  .config (    ['$stateProvider', '$urlRouterProvider',
    function (   $stateProvider,   $urlRouterProvider) {

    $urlRouterProvider.otherwise('/account');

    $stateProvider
      .state('account', {
        url: '/account',
        abstract: true,
        views: {
          "": {
            controller: 'AccountCtrl as accountCtrl',
            templateUrl: 'catalog/account/account.html'
          }
        },
        resolve: {
          auth: function($state, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('catalog.home');
            });
          },
          profile: function(Profile, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Profile.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('account.dashboard', {
        url: '',
        views: {
          "accountHeader@account": {
            controller: 'CatalogCtrl as catalogCtrl',
            templateUrl: 'catalog/common/header.html'
          },
          "accountMenu@account": {
            controller: 'AccountCtrl as accountCtrl',
            templateUrl: 'catalog/account/dashboard.html'
          },
          "accountDetail@account": {
            controller: 'AccountCtrl as accountCtrl',
            templateUrl: 'catalog/account/accountinfo.html'
          },
          "accountFooter@account": {
            controller: 'CatalogCtrl as catalogCtrl',
            templateUrl: 'catalog/common/footer.html'
          }
        }
      })
      .state('account.orders', {
        url: 'orders',
        views: {
          "accountHeader@account": {
            controller: 'CatalogCtrl as catalogCtrl',
            templateUrl: 'catalog/common/header.html'
          },
          "accountMenu@account": {
            controller: 'AccountCtrl as accountCtrl',
            templateUrl: 'catalog/account/dashboard.html'
          },
          "accountDetail@account": {
            controller: 'AccountCtrl as accountCtrl',
            templateUrl: 'catalog/account/orders.html'
          },
          "accountFooter@account": {
            controller: 'CatalogCtrl as catalogCtrl',
            templateUrl: 'catalog/common/footer.html'
          }
        }
      })
      .state('account.transactions', {
        url: 'security',
        views: {
          "accountHeader@account": {
            controller: 'CatalogCtrl as catalogCtrl',
            templateUrl: 'catalog/common/header.html'
          },
          "accountMenu@account": {
            controller: 'AccountCtrl as accountCtrl',
            templateUrl: 'catalog/account/dashboard.html'
          },
          "accountDetail@account": {
            controller: 'AccountCtrl as accountCtrl',
            templateUrl: 'catalog/account/transactions.html'
          },
          "accountFooter@account": {
            controller: 'CatalogCtrl as catalogCtrl',
            templateUrl: 'catalog/common/footer.html'
          }
        }
      })
      .state('account.rewardpoints', {
        url: 'security',
        views: {
          "accountHeader@account": {
            controller: 'CatalogCtrl as catalogCtrl',
            templateUrl: 'catalog/common/header.html'
          },
          "accountMenu@account": {
            controller: 'AccountCtrl as accountCtrl',
            templateUrl: 'catalog/account/dashboard.html'
          },
          "accountDetail@account": {
            controller: 'AccountCtrl as accountCtrl',
            templateUrl: 'catalog/account/rewardpoints.html'
          },
          "accountFooter@account": {
            controller: 'CatalogCtrl as catalogCtrl',
            templateUrl: 'catalog/common/footer.html'
          }
        }
      })
      .state('account.coupons', {
        url: 'security',
        views: {
          "accountHeader@account": {
            controller: 'CatalogCtrl as catalogCtrl',
            templateUrl: 'catalog/common/header.html'
          },
          "accountMenu@account": {
            controller: 'AccountCtrl as accountCtrl',
            templateUrl: 'catalog/account/dashboard.html'
          },
          "accountDetail@account": {
            controller: 'AccountCtrl as accountCtrl',
            templateUrl: 'catalog/account/coupons.html'
          },
          "accountFooter@account": {
            controller: 'CatalogCtrl as catalogCtrl',
            templateUrl: 'catalog/common/footer.html'
          }
        }
      })
      .state('account.security', {
        url: 'security',
        views: {
          "accountHeader@account": {
            controller: 'CatalogCtrl as catalogCtrl',
            templateUrl: 'catalog/common/header.html'
          },
          "accountMenu@account": {
            controller: 'AccountCtrl as accountCtrl',
            templateUrl: 'catalog/account/dashboard.html'
          },
          "accountDetail@account": {
            controller: 'AccountCtrl as accountCtrl',
            templateUrl: 'catalog/account/security.html'
          },
          "accountFooter@account": {
            controller: 'CatalogCtrl as catalogCtrl',
            templateUrl: 'catalog/common/footer.html'
          }
        }
      })

}])
