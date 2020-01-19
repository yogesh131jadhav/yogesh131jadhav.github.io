angular.module('skWholesale', [])
.controller('MainCtrl', function($scope, $http, $timeout, $window) {
  $scope.activePage = 1;
  $scope.singleProductDetail = null;
  $scope.showPage = false;
  $scope.title = 'Product List';
  $http.get("./stub/stub.json").then(function (response) {
    $timeout(() => {
      $scope.showPage = true;
    }, 2000);
    $scope.skDetails = response.data;
  });
  $scope.handlePageChange = function(menu, product = null) {
    $window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    $scope.title = 'Product List';
    switch(menu) {
      case 'Home':
        return $scope.activePage = 1;
      case 'Product':
        return $scope.activePage = 2;
      case 'Item Classification':
        $scope.title = menu;
        return $scope.activePage = 5;
      default:
        return $scope.activePage = 1;
    }
  }
  $scope.productDetailsPage = function(product) {
    $window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    $scope.title = $scope.singleProductDetail.title;
    $scope.activePage = 3;
    $scope.singleProductDetail = product;
  }
  $scope.aboutUsPage = function() {
    $window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    $scope.title = 'About Us';
    $scope.activePage = 4;
  }
});

/*
 * 1: Home page
 * 2: Product List page
 * 3: Product Details page
 * 4: About Us page
 */
