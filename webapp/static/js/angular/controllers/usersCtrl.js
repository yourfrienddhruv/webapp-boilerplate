function usersCtrl($scope, $http, $cookies) {
    $scope.toBeSignUpUser = {};
    $scope.loggedInUser = {};
    $scope.signUpErrors = null;
    $scope.toLogInUser = {};
    $scope.logInErrors = null;

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
            $scope.toLogInUser.username=$scope.toBeSignUpUser.username;
            $scope.toLogInUser.password=$scope.toBeSignUpUser.password1;
            $http.post('/users/login/'+$scope.toLogInUser.username +'/', jQuery.param($scope.toLogInUser),
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }//to auto detect type
                }
            ).success(
                function (data, status, headers, config) {
                    $scope.loggedInUser = data;
                    //show comments of this users
                }
            ).error(function (data, status, headers, config) {
                    $scope.LogInErrors = data;
                    window.setTimeout(function () {
                        $scope.$apply(
                            function () {
                                $scope.LogInErrors = null;
                            }
                        )
                    }, 5000);
                });
        };

    $scope.viewUserDetails= function() {
                $http.get('/users/info').success(
                    function (response) {
                        $scope.loggedInUser.username = response.username;
                    }
                );
            }

}

angular.module('myAngularApp').controller('usersCtrl', usersCtrl);
