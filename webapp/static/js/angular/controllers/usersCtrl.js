function usersCtrl($scope, $http, $cookies) {
    $scope.toBeSignUpUser = {};
    $scope.loggedInUser = null;
    $scope.signUpErrors = null;

    /*$scope.init = function () {
     //not required
     };*/

    $scope.doSignUp = function () {
        $http.post('/users/', jQuery.param($scope.toBeSignUpUser),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
        ).success(
            function (data, status, headers, config) {
                $scope.loggedInUser = data;
                //show comments of this users
            }
        ).error(function (data, status, headers, config) {
                $scope.signUpErrors = data;
                window.setTimeout(function () {
                    $scope.$apply(
                        function () {
                            $scope.signUpErrors = null;
                        }
                    )
                }, 5000);
            });
    };

}

angular.module('myAngularApp').controller('usersCtrl', usersCtrl);
