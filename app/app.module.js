'use strict';

var app = angular.module('app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'angular-md5',
    'ui.rdash',
    'ngFileUpload',

    'CatalogModule',
    'AccountModule',

    'AdminModule',
    'CatalogsModule',
    'DashboardModule',
    'ExtensionsModule',
    'MarketingModule',
    'SalesModule',
    'SystemModule',
    'ToolsModule',
    'ReportsModule'
])

.constant('tid', '-K4zdSDMnu3vSyL069A1')
.constant('FirebaseUrl', 'https://ecomengine.firebaseio.com/')

.config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
})

/*.factory('httpInterceptor', ['$location', '$q', '$injector', 'InstanceUrl',
    function (                $location,   $q,   $injector,   InstanceUrl) {

  		    return {

      			     request: function (config) {
        				// Append instance url before every api call
              				if (config.url.indexOf('/api/v2') > -1) {
              				      config.url = InstanceUrl + config.url;
              				};

              				// delete x-dreamfactory-session-token header if login
              				if (config.method.toLowerCase() === 'post' && config.url.indexOf('/api/v2/user/session') > -1) {
              					     delete config.headers['X-DreamFactory-Session-Token'];
              				}

              				console.log(config);

              				return config;
      			     },

          			responseError: function (result) {

          				// If status is 401 or 403 with token blacklist error then redirect to login
          				if (result.status === 401 || (result.status === 403 && result.data.error.message.indexOf('token') > -1)) {
          					$location.path('/login');
          				}

          				var $mdToast = $injector.get('$mdToast');
          				$mdToast.show($mdToast.simple().content('Error: ' + result.data.error.message));

          				return $q.reject(result);
          			}
  		    };

      }

])*/

.factory('Messages', function (){

            var messages = {
                  send_email_success: 'Reset Password E-Mail Sent',
                  save_password_success: 'New Password Saved',
                  passwords_dont_match: 'Passwords Do Not Match',
                  emails_dont_match: 'E-Mails Do Not Match',
                  invalid_coupon_code: 'Coupon Code is Invalid',
                  invalid_giftcard_code: 'Gift Card Code is Invalid',
                  invalid_points: 'Insufficient Reward Points Available',
            };

            return messages;
      }
)

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

                if (type == 'success') {
                    window.setTimeout(function() {
                        if ($rootScope.alerts.length === 1 && $rootScope.alerts[0].type === 'success') hide();
                    }, 3000);
                }

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
