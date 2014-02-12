/**
 * Created by nikunj on 2/12/14.
 */

function myFormSubmitCtrl($scope, $http) {
    $scope.dataToBeSent={};
    $scope.onFormSubmit = function() {
        $http({
            method : 'POST',
            url : '/fileupload/submit/',
            data : $scope.dataToBeSent,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
        }).success(function(data) {
                console.log(data);
                if (!data.success) {
                    // if not successful, bind errors to error variables
                    $scope.errorName = data.errors.name;
                    $scope.errorSuperhero = data.errors.superheroAlias;
                } else {
                    // if successful, bind success message to message
                    $scope.message = data.message;
                }
            });

    };
};
angular.module('MyModule').controller('myFormSubmitCtrl', myFormSubmitCtrl);

