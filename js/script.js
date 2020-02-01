angular.module('skWholesale', [])
.controller('MainCtrl', function($scope, $http, $timeout, $window) {
  $scope.activePage = 1;
  $scope.singleProductDetail = null;
  $scope.showPage = false;
  $scope.mobileNavClass = false;
  $scope.title = 'Product List';
  $scope.selectedBrand = null;
  $scope.toggleBrandDropdownClass = null;
  $scope.selectedBrandBreadCrumb = [];
  $http.get("./stub/stub.json").then(function (response) {
    $timeout(() => {
      $scope.showPage = true;
    }, 2000);
    $scope.skDetails = response.data;
  });
  $scope.handlePageChange = function(menu, product = null) {
    $scope.scrollTop();
    $scope.mobileNavClass = false;
    $scope.title = 'Product List';
    switch(menu) {
      case 'Home':
        return $scope.activePage = 1;
      case 'Product':
        return $scope.activePage = 2;
      case 'Branding':
        $scope.title = menu;
        $scope.skDetails.branding[0].toggleClass = true;
        $scope.handleBreadCrumbArray($scope.skDetails.branding[0], 0);
        $scope.setSelectedBrand($scope.skDetails.branding[0]);
        return $scope.activePage = 5;
      default:
        return $scope.activePage = 1;
    }
  }
  $scope.productDetailsPage = function(product) {
    $scope.scrollTop();
    $scope.title = $scope.singleProductDetail.title;
    $scope.activePage = 3;
    $scope.singleProductDetail = product;
  }
  $scope.aboutUsPage = function() {
    $scope.scrollTop();
    $scope.title = 'About Us';
    $scope.activePage = 4;
  }
  $scope.handleMobileNav = function() {
    $scope.mobileNavClass = $scope.mobileNavClass ? false : true;
  }
  $scope.toggleBrandNavClass = function(brand, index) {
    $scope.toggleBrandDropdownClass = null;
    $scope.handleBreadCrumbArray(brand, index);
    $scope.resetToggleClass($scope.skDetails.branding);
    if(brand.subItem && brand.subItem.length) {
      brand.toggleClass = true;
    }
    $scope.setSelectedBrand(brand);
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
    $scope.scrollTop();
  }
  $scope.scrollTop = function() {
    $window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  $scope.resetToggleClass = function(brand) {
    brand.toggleClass = false;
    if(brand.subItem && brand.subItem.length) {
      brand.subItem.map(singleBrand => {
        singleBrand.toggleClass = false;
        if(singleBrand.subItem && singleBrand.subItem.length) {
          $scope.resetToggleClass(singleBrand);
        }
      })
    } else {
      brand.map(singleBrand => {
        singleBrand.toggleClass = false;
        if(singleBrand.subItem && singleBrand.subItem.length) {
          $scope.resetToggleClass(singleBrand);
        }
      })
    }
  }
  $scope.toggleDropdownClass = function(param) {
    if(param) {
      $scope.toggleBrandDropdownClass = null;
    } else {
      $scope.toggleBrandDropdownClass = 'open';
    }
  }
});

/*
 * 1: Home page
 * 2: Product List page
 * 3: Product Details page
 * 4: About Us page
 */
