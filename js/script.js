angular.module('skWholesale', [])
.controller('MainCtrl', function($scope, $http, $timeout, $window) {
  $scope.activePage = 1;
  $scope.singleProductDetail = null;
  $scope.showPage = false;
  $scope.mobileNavClass = false;
  $scope.title = 'Product List';
  $scope.selectedBrand = null;
  $scope.selectedBrandBreadCrumb = [];
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
      case 'Branding':
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
  $scope.handleMobileNav = function() {
    $scope.mobileNavClass = $scope.mobileNavClass ? false : true;
  }
  $scope.toggleBrandNavClass = function(brand, index) {
    $scope.handleBreadCrumbArray(brand, index);
    if(brand.subItem && brand.subItem.length && brand.subItem[0].subItem && brand.subItem[0].subItem.length) {
      brand.toggleClass = brand.toggleClass ? false : true;
    } else {
      $scope.setSelectedBrand(brand);
    }
  }
  $scope.setSelectedBrand = function(setBrandObject) {
    $scope.handleBreadCrumbArray(setBrandObject, 2);
    $scope.selectedBrand = setBrandObject;
  }
  $scope.handleBreadCrumbArray = function(brand, index) {
    $scope.selectedBrandBreadCrumb.splice(index + 1);
    // $scope.selectedBrandBreadCrumb.push({"breadCrumb": brand.title});
    if($scope.selectedBrandBreadCrumb.indexOf(brand.title) === -1) {
      if($scope.selectedBrandBreadCrumb[index]) {
        $scope.selectedBrandBreadCrumb[index] = brand.title;
      } else {
        $scope.selectedBrandBreadCrumb.push(brand.title);
      }
    }
  }
});

/*
 * 1: Home page
 * 2: Product List page
 * 3: Product Details page
 * 4: About Us page
 */
