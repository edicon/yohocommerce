'use strict';

var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
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
    'ui.grid.selection',
    'angular-md5',
    'ui.rdash',
    'filereader',
    'ui.tinymce',
    'ui.select',
    'ui.grid.importer',
    'ui.grid.rowEdit',
    'ngFileUpload'
  ])
  .constant('tid', '-K4zdSDMnu3vSyL069A1')
  .constant('FirebaseUrl', 'https://ecomengine.firebaseio.com/')
  .constant('DreamFactoryFilesUrl','https://ec2-54-187-192-104.us-west-2.compute.amazonaws.com/files/marketplace')
//  .constant('APP_API_KEY', 'b5cb82af7b5d4130f36149f90aa2746782e59a872ac70454ac188743cb55b0ba')

/*  .run(       ['$cookies', 'APP_API_KEY', '$http',
    function (  $cookies,   APP_API_KEY,   $http) {
      $http.defaults.headers.common['X-Dreamfactory-API-Key'] = APP_API_KEY;
  		$http.defaults.headers.common['X-DreamFactory-Session-Token'] = $cookies.session_token;
  		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  			$rootScope.isMobile = true;
  		}

  	}
  ])
*/
  .config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  })

  .directive("ngFileSelect",function() {
    return {
      link: function($scope,el) {
        el.bind("change", function(e) {
          $scope.file = (e.srcElement || e.target).files[0];
          $scope.getFile();
        })
      }
    }
  })
