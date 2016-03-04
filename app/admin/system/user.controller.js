app.controller('UserCtrl', ['Auth', 'Users', 'AlertService', 'md5', 'tid', '$scope', '$state', '$stateParams',
  function (                 Auth,   Users,   AlertService,   md5,   tid,   $scope,   $state,   $stateParams) {
    var userCtrl = this;
    userCtrl.user = {};
//    userCtrl.roles = UserRoles.all;

    userCtrl.loadUser = function(uid) {
      var theObj = User.getUser(uid);
        theObj.$loaded().then(function() {
          userCtrl.user = theObj;
          userCtrl.userIndex = User.getIndex(uid);
//          userCtrl.custId = custId;
          userCtrl.count = Users.all.length;
      });
    };

    if ($stateParams.rowEntity != undefined) {
      userCtrl.loadUser($stateParams.rowEntity.$id);
    } else {
      userCtrl.user.user_full_name = 'New User';
//      userCtrl.custId = null;
    }

    userCtrl.next = function() {
      if (userCtrl.count > 0) {
        key = userCtrl.customerIndex;
        if (key < userCtrl.count - 1) {
          key = userCtrl.customerIndex + 1;
          var custId = Customer.getKey(key);
          userCtrl.loadCustomer(custId);
        }
      }
    }, function(error) {
      userCtrl.error = error;
    };

    userCtrl.back = function() {
      var key = userCtrl.customerIndex - 1;
      if (key < 0) key = 0
      var custId = Customer.getKey(key);
      userCtrl.loadCustomer(custId);
    }, function(error) {
      userCtrl.error = error;
    };

    userCtrl.first = function() {
      var key = 0;
      var custId = Customer.getKey(key);
      userCtrl.loadCustomer(custId);
    }, function(error) {
      userCtrl.error = error;
    };

    userCtrl.last = function() {
      var key = userCtrl.count - 1;
      var custId = Customer.getKey(key);
      userCtrl.loadCustomer(custId);
    }, function(error) {
      userCtrl.error = error;
    };

}]);
