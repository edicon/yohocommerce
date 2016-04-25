'use strict';

angular.module('AdminModule', [
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

.config (    ['$stateProvider', '$urlRouterProvider',
    function ( $stateProvider,   $urlRouterProvider) {

      $urlRouterProvider.otherwise('/admin');

      $stateProvider

          .state('admin', {
              url: '/admin',
              abstract: true,
              views: {
                "": {
                  controller: 'AdminCtrl as adminCtrl',
                  templateUrl: 'admin/views/admin.html'
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
          .state('admin.dashboard', {
              url: '',
              views: {
                  "main@admin": {
                      controller: 'DashboardCtrl as dashboardCtrl',
                      templateUrl: 'admin/views/dashboard/dashboard.html'
                  }
              }
          })

          .state('profile', {
              url: '/profile',
              controller: 'ProfileCtrl as profileCtrl',
              templateUrl: 'admin/views/users/profile.html',
              resolve: {
                  auth: function($state, Wow, Auth){
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

.controller('AdminCtrl', ['Auth', '$scope', '$state', '$cookieStore', 'profile',
      function (           Auth,   $scope,   $state,   $cookieStore,   profile) {
          var adminCtrl = this;
          var mobileView = 992;
          adminCtrl.profile = profile;

          if (adminCtrl.profile.type === "customer")
              $state.go('account.dashboard');

          $scope.showChilds = function(item){
              item.active = !item.active;
          };

          if (adminCtrl.profile.type === "Admin" || adminCtrl.profile.type === "Tenant") {

              $scope.items = [
                  {link: ".dashboard", name: "Dashboard", icon: "menu-icon fa fa-tachometer",},
                  {link: ".catalogs", name: "Catalogs", icon: "menu-icon fa fa-tags",},
                  {link: ".sales", name: "Sales", icon: "menu-icon fa fa-shopping-cart",},
                  {link: ".marketing", name: "Marketing", icon: "menu-icon fa fa-share-alt",},
                  {link: ".extensions", name: "Extensions", icon: "menu-icon fa fa-puzzle-piece",},
                  {link: ".system", name: "System", icon: "menu-icon fa fa-gear",},
                  {link: ".tools", name: "Tools", icon: "menu-icon fa fa-wrench",},
                  {link: ".reports", name: "Reports", icon: "menu-icon fa fa-bar-chart",}
              ];
          }

          if (adminCtrl.profile.type === "Sales") {
              $scope.items = [
                  {link: ".dashboard", name: "Dashboard", icon: "menu-icon fa fa-tachometer",},
                  {link: ".catalogs", name: "Catalogs", icon: "menu-icon fa fa-tags",},
                  {link: ".sales", name: "Sales", icon: "menu-icon fa fa-shopping-cart",},
                  {link: ".marketing", name: "Marketing", icon: "menu-icon fa fa-share-alt",}
              ];
          }

          $scope.getWidth = function() {
              return window.innerWidth;
          };

          $scope.$watch($scope.getWidth, function(newValue, oldValue) {

              if (newValue >= mobileView) {

                  if (angular.isDefined($cookieStore.get('toggle'))) {
                      $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
                  } else {
                      $scope.toggle = true;
                  }

              } else {
                  $scope.toggle = false;
              }
          });

          window.onresize = function() {
              $scope.$apply();
          };

          $scope.toggleSidebar = function() {
              $scope.toggle = !$scope.toggle;
              $cookieStore.put('toggle', $scope.toggle);
          };

          $scope.logout = function() {
              Auth.$unauth();
              $state.go('catalog.home');
          };

      }

])
