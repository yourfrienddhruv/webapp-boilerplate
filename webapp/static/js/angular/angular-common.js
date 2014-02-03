var myAngularApp = angular.module('myAngularApp', ['ngCookies']);

myAngularApp.config(function ($interpolateProvider, $httpProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
    $httpProvider.defaults.xsrfCookieName='csrftoken';
    $httpProvider.defaults.xsrfHeaderName='X-CSRFToken';
});

/*
myAngularApp.run(function ($http) {
    $http.get('/comments/csrf/').
        success(
        function (response) {
            $http.defaults.headers.common['X-CSRFToken'] = response.substr(55, 32);
        }
    );
});*/

/*
 myAngularApp.directive('ngIf', function () {
 return {
 link: function (scope, element, attrs) {
 if (scope.$eval(attrs.ngIf)) {
 // remove '<div ng-if...></div>'
 element.replaceWith(element.children())
 } else {
 element.replaceWith(' ')
 }
 }
 }

 });
 myAngularApp.directive('ngFile', function () {
 return {
 scope: {
 file: '='
 },
 link: function (scope, el, attrs) {
 el.bind('change', function (event) {
 var files = event.target.files;
 var file = files[0];
 scope.file = file ? file : undefined;
 scope.$apply();
 });
 }
 };
 });
 myAngularApp.directive('backButton', function () {
 return {
 restrict: 'A',
 link: function (scope, element, attrs) {
 element.bind('click', goBack);
 function goBack() {
 history.back();
 scope.$apply();
 }
 }
 }
 });
 */
/*
 myAngularApp.factory('safeApply', [function($rootScope) {
 return function($scope, fn) {
 var phase = $scope.$root.$$phase;
 if(phase == '$apply' || phase == '$digest') {
 if (fn) {
 $scope.$eval(fn);
 }
 } else {
 if (fn) {
 $scope.$apply(fn);
 } else {
 $scope.$apply();
 }
 }
 }
 }]);*/
