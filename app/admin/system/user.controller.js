app.controller('UserCtrl', ['Auth', 'Users', 'User', 'AlertService', 'md5', 'tid', '$scope', '$state', '$stateParams',
  function (                 Auth,   Users,   User,   AlertService,   md5,   tid,   $scope,   $state,   $stateParams) {
    var userCtrl = this;
    userCtrl.user = {};
//    userCtrl.roles = UserRoles.all;

    userCtrl.loadUser = function(uid) {
      var theObj = User.getUser(uid);
      theObj.$loaded().then(function() {
        userCtrl.user = theObj;
        userCtrl.userIndex = User.getIndex(uid);
        userCtrl.count = Users.all.length;
      });
    };

    if ($stateParams.rowEntity != undefined) {
      userCtrl.loadUser($stateParams.rowEntity.$id);
    } else {
      userCtrl.user.user_full_name = 'New User';
    }

    userCtrl.goCustomer = function(cid) {
      $state.go('admin.sales.customer', {'cid': cid});
    };

    userCtrl.next = function() {
      if (userCtrl.count > 0) {
        key = userCtrl.userIndex;
        if (key < userCtrl.count - 1) {
          key = userCtrl.userIndex + 1;
          var uid= User.getKey(key);
          userCtrl.loadUser(uid);
        }
      }
    }, function(error) {
      userCtrl.error = error;
    };

    userCtrl.back = function() {
      var key = userCtrl.userIndex - 1;
      if (key < 0) key = 0
      var uid = User.getKey(key);
      userCtrl.loadUser(uid);
    }, function(error) {
      userCtrl.error = error;
    };

    userCtrl.first = function() {
      var key = 0;
      var uid = User.getKey(key);
      userCtrl.loadUser(uid);
    }, function(error) {
      userCtrl.error = error;
    };

    userCtrl.last = function() {
      var key = userCtrl.count - 1;
      var uid = User.getKey(key);
      userCtrl.loadUser(uid);
    }, function(error) {
      userCtrl.error = error;
    };

}]);
