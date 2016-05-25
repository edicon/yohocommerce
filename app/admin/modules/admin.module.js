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
                  profile: function($state, Profile, Auth){
                      return Auth.$requireAuth().then(function(auth){
                          return Profile.getProfile(auth.uid).$loaded().then(function(response) {
                              if (response.type === 'Customer')
                                  $state.go('catalog.home');
                              else
                                  return response;
                          });
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

          .state('admin.profile', {
              url: '/profile',
              views: {
                "header@admin": {
                    templateUrl: 'admin/views/users/profile.header.html'
                },
                "main@admin": {
                    controller: 'ProfileCtrl as profileCtrl',
                    templateUrl: 'admin/views/users/profile.html'
                  }
              }
          })

          .state('admin.password', {
              url: '/profile',
              views: {
                "header@admin": {
                    templateUrl: 'admin/views/users/password.header.html'
                },
                "main@admin": {
                    controller: 'ProfileCtrl as profileCtrl',
                    templateUrl: 'admin/views/users/password.html'
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

.controller('ProfileCtrl', ['Auth', 'AlertService', 'Messages', '$scope', '$state', '$cookieStore', 'profile',
      function (             Auth,   AlertService,   Messages,   $scope,   $state,   $cookieStore,   profile) {
          var profileCtrl = this;
          var mobileView = 992;
          profileCtrl.profile = profile;

          profileCtrl.updateProfile = function() {
                profileCtrl.profile.$save();
          }, function(error) {
                profileCtrl.error = error;
          };

          profileCtrl.forgotPassword = function() {
              Auth.$resetPassword({
                  email: profileCtrl.profile.email
                  }).then(function() {
                      AlertService.addSuccess(Messages.send_email_success);
                      $state.go('catalog.home');
                  }).catch(function(error) {
                      console.error("Error: ", error);
                  });
          };

          profileCtrl.newPassword = function() {
              if (profileCtrl.profile.new_password == profileCtrl.profile.confirm_new_password){
                Auth.$changePassword({
                    email: profileCtrl.profile.email,
                    oldPassword: profileCtrl.profile.password,
                    newPassword: profileCtrl.profile.new_password
                    }).then(function() {
                        AlertService.addSuccess(Messages.save_password_success);
                        profileCtrl.profile.password = null;
                        profileCtrl.profile.new_password = null;
                        profileCtrl.profile.confirm_new_password = null;
                    }).catch(function(error) {
                        console.error("Error: ", error);
                    });
              } else {
                  AlertService.addError(Messages.passwords_dont_match);
              };
          };

      }

])
