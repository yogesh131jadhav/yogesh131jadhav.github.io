angular.module('inventoryManagement', [])
.controller('MainCtrl', function($scope,$http) {
  $scope.title = 'Admin Portal';
  $scope.addInventory = {};
  $scope.activePage = 'inventory';
  $http.get("./assets/stub/stub.json").then(function (response) {
    $scope.inventoryManagementObject = response.data.stores[0];
  });
  $scope.setPage = function(pageName) {
    $scope.activePage = pageName;
  }
});
