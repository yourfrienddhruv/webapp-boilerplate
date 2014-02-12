/**
 * Created by nikunj on 2/11/14.
 */

//angular.module('myApp', ['angularFileUpload']);

function myFileUploadCtrl($scope, $upload) {
    $scope.onFileSelect = function ($files) {
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: '/fileupload/upload/', //upload.php script, node.js route, or servlet url
                data: {myObj: $scope.myModelObj},
                file: file
            }).progress(function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {
                // file is uploaded successfully
                console.log(data);
            });
        }
    }
};


angular.module('MyModule').controller('myFileUploadCtrl', myFileUploadCtrl);

