app.controller('UsersCtrl', ['Users', '$state', '$scope', '$stateParams',
  function (                  Users,   $state,   $scope,   $stateParams) {
    var usersCtrl = this;

    usersCtrl.editUser = function(row) {
      $state.go('admin.system.user', {'rowEntity': row.entity});
    };

    usersCtrl.gridOpts = {
      enableSorting: true,
      enableCellEditOnFocus: true,
      data: Users.all,
      columnDefs: [
        { name: '', field: '$id', shown: false, cellTemplate: 'admin/system/gridTemplates/editUser.html',
          width: 34, enableColumnMenu: false, headerTooltip: 'Edit User' },
        { name:'email', field: 'email', width: '70%', enableHiding: false },
        { name:'type', field: 'type', enableHiding: false },
        { name:'status', field: 'status', enableHiding: false },
      ]
    };

}]);
