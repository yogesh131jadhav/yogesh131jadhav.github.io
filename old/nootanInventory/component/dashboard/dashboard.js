angular.module('skWholesale')
.component('dashboard', {
  templateUrl: './component/dashboard/dashboard.html',
  bindings: {
    activePage: '='
  },
  controller: function($scope, $http, $timeout, $window) {
    $scope.fetchData = function() {
      $http.get("./stub/stub.json").then(function (response) {
        $scope.inventoryResp = response.data;
      });
    }
    $scope.fetchData();
  }
});