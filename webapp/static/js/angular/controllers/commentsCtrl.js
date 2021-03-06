﻿function commentsCtrl($scope, $http) {
    $scope.featureEnabled = false;
    $scope.comments = [];
    $scope.commentToBePosted = {};
    $scope.errorForComments = null;
    $scope.errorWhileDelete = null;

    $scope.init = function () {
        //getLatestComments();
    };

    $scope.$on('loginSuccessfulEvent', function () {
        $scope.featureEnabled=true;
        getLatestComments();
    });

    $scope.$on('logoutSuccessfulEvent', function () {
        $scope.featureEnabled=false;
        $scope.comments = [];
    });

    function getLatestComments() {
        $http.get('/comments/').success(
            function (response) {
                $scope.comments = response.comments;
            }
        );
    }

    $scope.postComment = function () {
        $http.post('/comments/', jQuery.param($scope.commentToBePosted),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'    }
            }
        ).success(
            function (data, status, headers, config) {
                $scope.commentToBePosted.id = data.id;
                $scope.comments.unshift($scope.commentToBePosted);
                $scope.commentToBePosted = {};

            }
        ).error(function (data, status, headers, config) {
                console.log('error in post ' + data);
                $scope.errorForComments = data;
                window.setTimeout(function () {
                    $scope.$apply(
                        function () {
                            $scope.errorForComments = null;
                        }
                    )
                }, 5000);
            });
    };

    $scope.deleteThisComment = function (comment) {
        console.log(comment);
        $http.delete('/comments/' + comment.id + '/').success(
            function (data, status, headers, config) {
                comment.is_deleted = true;
            }
        ).error(function (data, status, headers, config) {
                $scope.errorWhileDelete = data;
                window.setTimeout(function () {
                    $scope.$apply(
                        function () {
                            $scope.errorWhileDelete = null;
                        }
                    )
                }, 5000);
            });
    };

}

angular.module('myAngularApp').controller('commentsCtrl', commentsCtrl);
