angular.module('skWholesale', [])
.controller('MainCtrl', function($scope, $http, $timeout, $window) {
  $scope.activePage = 'Dashboard';
  $http.get("./stub/stub.json").then(function (response) {
    $timeout(() => {
      $scope.showPage = true;
    }, 2000);
    $scope.inventoryResp = response.data;
  });
  $scope.handlePageChange = function(menu, product = null) {
    $scope.scrollTop();
    $scope.title = 'Product List';
    $scope.activePage = menu;
  }
  $scope.scrollTop = function() {
    $window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  $scope.checkForActiveNag = function(nav, selectedNav) {
    return nav === selectedNav ? true : false;
  }
});
