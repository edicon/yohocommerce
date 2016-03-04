uploader.onAfterAddingFile = function(item) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var max_size = 150;
        var tempImg = new Image();
        tempImg.src = reader.result;
        tempImg.onload = function () {
            if(this.width>max_size || this.height>max_size) {
                var canvas = document.createElement('canvas');
                canvas.width = max_size;
                canvas.height = max_size;
                var dimRatio = this.width / this.height;
                var padLeft = 0;
                var padTop = 0;
                if(dimRatio > 1) {
                    cropHeight = this.height;
                    cropWidth  = this.height;
                    padLeft = (this.width - this.height)/2;
                }
                if(dimRatio < 1) {
                    cropHeight = this.width;
                    cropWidth  = this.width;
                    padLeft = (this.height - this.width)/2;
                }

                document.body.appendChild(canvas);
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, padLeft, padTop, cropWidth, cropHeight, 0, 0, max_size, max_size);

                var dataURL = canvas.toDataURL("image/png", 1);
                //extract data from urlString
                var n = dataURL.indexOf(",");
                var data = dataURL.toString().substring(n+1);

                $scope.$apply(function () {
                    //check extension type
                    var ext = item.file.type.split("/")[1];
                    if (['jpg', 'jpeg', 'gif', 'png', 'pdf'].indexOf(ext) >= 0) {
                        $scope.user.avatar = dataURL;
                        var imgFile = b64toBlob(data,'image/png')
                        item._file = imgFile;
                        item.upload();
                    } else {
                        // invalid type
                    }
                });
            }
        };

    };
    reader.readAsDataURL(item._file);
};uploader.onAfterAddingFile = function(item) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var max_size = 150;
        var tempImg = new Image();
        tempImg.src = reader.result;
        tempImg.onload = function () {
            if(this.width>max_size || this.height>max_size) {
                var canvas = document.createElement('canvas');
                canvas.width = max_size;
                canvas.height = max_size;
                var dimRatio = this.width / this.height;
                var padLeft = 0;
                var padTop = 0;
                if(dimRatio > 1) {
                    cropHeight = this.height;
                    cropWidth  = this.height;
                    padLeft = (this.width - this.height)/2;
                }
                if(dimRatio < 1) {
                    cropHeight = this.width;
                    cropWidth  = this.width;
                    padLeft = (this.height - this.width)/2;
                }

                document.body.appendChild(canvas);
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, padLeft, padTop, cropWidth, cropHeight, 0, 0, max_size, max_size);

                var dataURL = canvas.toDataURL("image/png", 1);
                //extract data from urlString
                var n = dataURL.indexOf(",");
                var data = dataURL.toString().substring(n+1);

                $scope.$apply(function () {
                    //check extension type
                    var ext = item.file.type.split("/")[1];
                    if (['jpg', 'jpeg', 'gif', 'png', 'pdf'].indexOf(ext) >= 0) {
                        $scope.user.avatar = dataURL;
                        var imgFile = b64toBlob(data,'image/png')
                        item._file = imgFile;
                        item.upload();
                    } else {
                        // invalid type
                    }
                });
            }
        };

    };
    reader.readAsDataURL(item._file);
};
