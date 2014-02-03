function usersCtrl($scope, $http, $rootScope) {
    $scope.toBeSignUpUser = {};
    $scope.loggedInUser = {};
    $scope.loggedInUser.username = null;
    $scope.signUpErrors = null;
    $scope.toLogInUser = {};
    $scope.logInErrors = null;
    $scope.showSignUp = false;

    $scope.init = function () {
        $scope.viewUserDetails();
    };

    $scope.doSignUp = function () {
        $http.post('/users/', jQuery.param($scope.toBeSignUpUser),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }//to auto detect type
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

    $scope.doLogIn = function () {
        //$scope.toLogInUser.username=$scope.toBeSignUpUser.username;
        //$scope.toLogInUser.password=$scope.toBeSignUpUser.password1;
        $http.post('/users/login/' + $scope.toLogInUser.username + '/', jQuery.param($scope.toLogInUser),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }//to auto detect type
            }
        ).success(
            function (data, status, headers, config) {
                $scope.loggedInUser = data;
                $scope.toLogInUser = {};
                $scope.viewUserDetails();
            }
        ).error(function (data, status, headers, config) {
                $scope.logInErrors = data;
                console.log($scope.logInErrors.error.username);
                window.setTimeout(function () {
                    $scope.$apply(
                        function () {
                            $scope.logInErrors = null;
                        }
                    )
                }, 5000);
            });
    };

    $scope.viewUserDetails = function () {
        $http.get('/users/info').success(
            function (response) {
                $scope.loggedInUser.username = response.username;
                $rootScope.$broadcast('loginSuccessfulEvent');
            }
        ).error(
            function (response) {
                $scope.loggedInUser.username = null;
            }
        );
    };


    $scope.doLogOut = function () {
        $http.post('/users/logout/',
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }//to auto detect type
            }
        ).success(
            function (data, status, headers, config) {
                $scope.loggedInUser = data;  //loggedInUser logs out
                $rootScope.$broadcast('logoutSuccessfulEvent');
            }
        ).error(function (data, status, headers, config) {
                $scope.LogOutErrors = data;
                window.setTimeout(function () {
                    $scope.$apply(
                        function () {
                            $scope.LogOutErrors = null;
                        }
                    )
                }, 5000);
            });
    };
}
angular.module('myAngularApp').controller('usersCtrl', usersCtrl);
