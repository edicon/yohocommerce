'use strict';

var app = angular.module('app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'angular-md5',
    'ui.rdash',

    'CatalogModule',
    'AccountModule',

    'AdminModule',
    'CatalogsModule',
    'DashboardModule',
    'ExtensionsModule',
    'MarketingModule',
    'SalesModule',
    'SystemModule',
    'ToolsModule'
])

.constant('tid', '-K4zdSDMnu3vSyL069A1')
.constant('FirebaseUrl', 'https://ecomengine.firebaseio.com/')
.constant('InstanceUrl','http://ec2-54-187-192-104.us-west-2.compute.amazonaws.com/')
.constant('AppApiKey', '7a54306df6dbc1cb4d5c627a5993e6c61f4f56e6dcb3a403cda55b2d73a1f3d7')

.run(         ['$cookies', '$http', 'AppApiKey',
    function (  $cookies,   $http,   AppApiKey) {
//      $http.defaults.headers.common['X-Dreamfactory-API-Key'] = AppApiKey;
  		$http.defaults.headers.common['X-DreamFactory-Session-Token'] = $cookies.session_token;
  	}
])

.config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
})

.factory('AlertService', ['$rootScope',
      function (           $rootScope) {

          /* controller examples

          alertService.addSuccess('Successfully saved the record!');
          alertService.addError('Failed to connect to the server');
          alertService.addError('Validation Errors', [
            'First Name is required',
            'Last Name is required']);

          */


        	 var visible = false;
          	var service = {
            		addError: addError,
            		addWarning: addWarning,
            		addSuccess: addSuccess,
            		addInfo: addInfo,
            		closeAlert: closeAlert,
            		closeAlertIdx: closeAlertIdx,
            		clear: clear,
            		get: get
          	};

          	$rootScope.alerts = [];
          	$rootScope.dismissAll = function() {
          		  hide();
          	}

        	  return service;

          	function addError(msg, msgList) {
          		  return add('danger', msg, msgList);
          	}

          	function addWarning(msg, msgList) {
          		  return add('warning', msg, msgList);
          	}

          	function addSuccess(msg, msgList) {
          		  return add('success', msg, msgList);
          	}

          	function addInfo(msg, msgList) {
          		  return add('info', msg, msgList);
          	}

          	function add(type, msg, msgList) {
            		var a = $rootScope.alerts.push({
              			type: type,
              			msg: msg,
              			msgs: msgList,
              			close: function() {
              				    return closeAlert(this);
              			}
            		});

            		if (!visible) {
            			show();
            		}

          		  return a;
          	}

          	function closeAlert(alert) {
          		  return closeAlertIdx($rootScope.alerts.indexOf(alert));
          	}

          	function closeAlertIdx(index) {
            		if (visible && $rootScope.alerts.length == 1) {
              			hide();
              			return;
          		}

          		return $rootScope.alerts.splice(index, 1);
          	}

          	function show() {
            		$('#messageContainer').toggleClass('in');
            		visible = true;
          	}

          	function hide() {
            		$('#messageContainer').toggleClass('in');
            		clear();
            		visible = false;
          	}

          	function clear(){
          		  $rootScope.alerts = [];
          	}

          	function get() {
          		  return $rootScope.alerts;
          	}

      }

])

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
