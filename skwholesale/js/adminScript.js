angular.module('skWholesale', [])
.controller('MainCtrl', function($scope, $http, $timeout, $window, $rootScope, $location) {
  $scope.activePage = 'Dashboard';
  $scope.mobileNavClass = false;
  $scope.key = $location.hash();
  $rootScope.userEmail = atob($scope.key);
  $scope.userProfile = false;
  $scope.toggleUserProfile = function() {
    $scope.userProfile = $scope.userProfile ? false : true;
  }
  if(!$rootScope.userEmail) {
    $window.location.href = './login.html';
  }
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
  $scope.handleMobileNav = function() {
    $scope.mobileNavClass = $scope.mobileNavClass ? false : true;
  }
  $scope.logout = function() {
    $rootScope.userEmail = null;
    $window.location.href = './login.html';
  }
});
