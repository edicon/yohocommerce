'use strict';

angular.module('MsgModule', [

])

.factory('Messages', function (){

            var messages = {
                  send_email_success: 'Reset Password E-Mail Sent',
                  save_password_success: 'New Password Saved',
                  passwords_dont_match: 'Passwords Do Not Match',
                  emails_dont_match: 'E-Mails Do Not Match',
                  invalid_coupon_code: 'Coupon Code is Invalid',
                  invalid_giftcard_code: 'Gift Card Code is Invalid',
                  invalid_points: 'Insufficient Reward Points Available',
                  login_disabled: 'Account is Disabled',
                  invalid_number: 'The Amount Entered is Invalid',
            };

            return messages;
      }
)

.factory('AlertService', ['$rootScope',
      function (           $rootScope) {

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
