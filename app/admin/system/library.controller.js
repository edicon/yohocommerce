app.controller('LibraryCtrl', ['Upload', '$timeout', '$state', '$scope', '$stateParams',
  function (                    Upload,   $timeout,   $state,   $scope,   $stateParams) {
    var libraryCtrl = this;

/*    $scope.uploadFiles = function(file, errFiles) {
      $scope.f = file;
      $scope.errFile = errFiles && errFiles[0];
        if (file) {
          file.upload = Upload.upload({
            url: 'http://ec2-54-187-192-104.us-west-2.compute.amazonaws.com/files/marketplace',
            data: {file: file}
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
              file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }
  }
  */

  $scope.uploadFiles = function (blob) {

    Upload.http({
        url: 'http://ec2-54-187-192-104.us-west-2.compute.amazonaws.com/files/marketplace',
        headers : {
            "Content-Type": "image/png",
            "X-File-Name": blob.name
        },
        processData: false,
        data: blob

    }).then(function (resp) {
        //$rootScope.$broadcast('camera.upload');
    }, function (resp) {
        //$rootScope.$broadcast('camera.upload');
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ');
    });
}


}]);
