app.controller('LibraryCtrl', ['Library', '$scope', 'FileReader',
  function (                    Library,   $scope,   FileReader) {
    var libraryCtrl = this;
    var images = Library.all;
    images.$loaded().then(function() {
      libraryCtrl.myImages = images;
    });

    console.log($scope)

    $scope.getFile = function () {
      console.log('got here')
      $scope.progress = 0;
      FileReader.readAsDataURL($scope.file, $scope).then(function(result) {
        $scope.imageSrc = result;
        console.log($scope.imageSrc)
        Library.all.$add({image: $scope.imageSrc})
      });
    };

    $scope.$on("fileProgress", function(e, progress) {
      $scope.progress = progress.loaded / progress.total;
    });

}]);
