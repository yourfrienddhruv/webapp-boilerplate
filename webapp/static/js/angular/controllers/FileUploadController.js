/**
 * Created by nikunj on 2/11/14.
 */

//angular.module('myApp', ['angularFileUpload']);

function myFileUploadCtrl($scope, $upload, $http) {
    $scope.statusOnSuccess=null;
    $scope.errorWhileSubmit=null;
    $scope.jsonData=null;
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
                console.log("Status :"+data.success);
                $scope.statusOnSuccess="File uploaded sucessfully.";
                window.setTimeout(function () {
                    $scope.$apply(
                        function () {
                            $scope.statusOnSuccess = null;
                        }
                    )
                }, 5000);
            }).error(function (data, status, headers, config) {
                console.log("Error :"+data.message+" "+data.error+" "+status);
                $scope.errorWhileSubmit = data.message;
                window.setTimeout(function () {
                    $scope.$apply(
                        function () {
                            $scope.errorWhileSubmit = null;
                        }
                    )
                }, 5000);
            });
        }
    }
    var callDialog = function(dialog, callback) {
        dialog.addEventListener('change', function() {
            var result = dialog.files;
            console.log("File Name :"+result);
            callback(result);
        }, false);
        dialog.click();
    };
    $scope.openFile = function(callback, multiple, acceptTypes) {
        var dialog = document.createElement('input');
        dialog.type = 'file';
        if (multiple === true) {
            dialog.multiple = 'multiple';
        }
        if (angular.isArray(acceptTypes)) {
            dialog.accept = acceptTypes.join(',');
        } else if (angular.isString(acceptTypes)) {
            dialog.accept = acceptTypes;
        }
        callDialog(dialog, $scope.onFileSelect);
    };

    $scope.getJSON= function(){
        $http.get('/fileupload/getJSON/').success(
            function (response) {
                $scope.jsonData = response;
            }
        );
    };
};


angular.module('MyModule').controller('myFileUploadCtrl', myFileUploadCtrl);

