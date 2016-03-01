app.factory('AlertService', ['$rootScope',
  function (                  $rootScope) {

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

}]);
