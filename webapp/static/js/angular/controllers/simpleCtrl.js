var SimpleApp = angular.module('SimpleApp', []);

function myController($scope) {
    $scope.users = [
			              {
			            	  name:"Mahesh",
							  description:"A geek",
							  age:"22"
			              },
			              {
			            	  name:"Ganesh",
							  description:"A nerd",
							  age:"25"
			              },
			              {
			            	  name:"Ramesh",
							  description:"A noob",
							  age:"27"
			              },
			              {
			            	  name:"Ketan",
							  description:"A psychopath",
							  age:"26"
			              },
			              {
			            	  name:"Niraj",
							  description:"Intellectual badass",
							  age:"29"
			              }
			            ];
}

SimpleApp.controller('myController',myController);