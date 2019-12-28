angular.module('skWholesaler', [])
.controller('MainCtrl', function($scope, $http, $timeout, $window) {
  $scope.activePage = 1;
  $scope.singleProductDetail = null;
  $scope.showPage = false;
  $http.get("./stub/stub.json").then(function (response) {
    $timeout(() => {
      $scope.showPage = true;
    }, 2000);
    $scope.skDetails = response.data;
  });
  $scope.handlePageChange = function(menu, product = null) {
    $window.scrollTo(0, 0);
    return menu === 'Home' ? $scope.activePage = 1 : $scope.activePage = 2;
  }
  $scope.productDetailsPage = function(product) {
    $scope.activePage = 3;
    $scope.singleProductDetail = product;
  }
});