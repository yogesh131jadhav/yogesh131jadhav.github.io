angular.module('plunker', [])
.controller('MainCtrl', function($scope, $http) {
  $scope.name = 'World';
  callPersonalJson($scope, $http);
});

function callPersonalJson($scope, $http) {
	$http.get("stub/personalDetails.json").then(function (response) {
        $scope.projectDetails = response.data;
    });
}
