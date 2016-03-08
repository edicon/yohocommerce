app.controller('UserCtrl', ['Auth', 'Profile', 'Users', 'User', 'Customers', 'AlertService', 'md5', 'tid', '$scope', '$state', '$stateParams',
  function (                 Auth,   Profile,   Users,   User,   Customers,   AlertService,   md5,   tid,   $scope,   $state,   $stateParams) {
    var userCtrl = this;
    userCtrl.user = {};

    userCtrl.loadUser = function(uid) {
      var theUser = User.getUser(uid);
      theUser.$loaded().then(function() {
        userCtrl.user = theUser;
        userCtrl.user.uid = uid;
        userCtrl.userIndex = User.getIndex(uid);
        userCtrl.count = Users.all.length;
        if (userCtrl.user.type === 'customer') {
          var theCustomer = Customers.getCustomer(userCtrl.user.cid);
          theCustomer.$loaded().then(function() {
            userCtrl.customer = theCustomer;
          });
        }
      });
    };

    if ($stateParams.rowEntity != undefined) {
      userCtrl.loadUser($stateParams.rowEntity.$id);
    } else {
      userCtrl.user.uid = null;
      userCtrl.user.user_full_name = 'New User';
    }

    userCtrl.addProfile = function() {
      userCtrl.profile = Profile.getProfile(userCtrl.uid);
      userCtrl.profile.$loaded().then(function() {
        userCtrl.profile.emailHash = md5.createHash(userCtrl.user.email);
        userCtrl.profile.first_name = userCtrl.user.first_name;
        userCtrl.profile.last_name = userCtrl.user.last_name;
        userCtrl.profile.full_name = userCtrl.user.first_name+' '+userCtrl.user.last_name;
        userCtrl.profile.email = userCtrl.user.email;
        userCtrl.profile.type = userCtrl.user.type;
        userCtrl.profile.status = userCtrl.user.status;
        userCtrl.profile.tid = tid;
        userCtrl.profile.$save();
      });
    }, function(error) {
      AlertService.addError(error.message);
    };

    userCtrl.createUser = function() {
      userCtrl.user.email = userCtrl.user.email;
      userCtrl.user.password = 'S1mpleOne';
      Auth.$createUser(userCtrl.user).then(function(user) {
        userCtrl.uid = user.uid;
        userCtrl.addProfile();
      }, function(error) {
        AlertService.addError(error.message);
      });
    };

    userCtrl.goCustomer = function(cid) {
      $state.go('admin.sales.customer', {'cid': cid});
    };

    userCtrl.next = function() {
      if (userCtrl.count > 0) {
        key = userCtrl.userIndex;
        if (key < userCtrl.count - 1) {
          key = userCtrl.userIndex + 1;
          var uid = User.getKey(key);
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
