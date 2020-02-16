angular.module('skWholesale')
.component('products', {
  templateUrl: './component/products/products.html',
  controller: function($scope, $http, $timeout, $window) {
    $scope.activeAction = 'list';         // list, add, edit
    $scope.addUpdateRecord = function(action, item = null) {
      if(item) {
        $scope.productForm = item;
      }
      $scope.activeAction = action;
    }
    $scope.fetchData = function() {
      /*$http.get("./stub/stub.json").then(function (response) {
        $scope.inventoryResp = response.data;
      });*/
      $scope.inventoryResp = {
        productList: $scope.getLocalStorage('nootan_products')
      };
    }
    $scope.addProduct = function(action, item = null) {
      $scope.resetNotification();
      if(action === 'add') {
        $scope.addProductToList();
      } else if(action === 'edit') {
        $scope.editProductToList();
      } else if(action === 'delete') {
        $scope.deleteProductToList(item);
      }
    }
    $scope.addProductToList = function() {
      let productList = $scope.getLocalStorage('nootan_products');
      $scope.productForm.productID = 'prod-' + Math.floor(Math.random() * 1000000 + 1000000);
      $scope.productForm.deleteFlag = false;
      $scope.productForm.quantity = 0;
      $scope.productForm.pricePerUnit = 0;
      $scope.productForm.insertedDate = new Date().getTime();
      $scope.productForm.lastModified = new Date().getTime();
      productList.push($scope.productForm);
      $scope.addLocalStorage('nootan_products', productList);
      $scope.inventoryResp.productList = $scope.getLocalStorage('nootan_products');
      $scope.resetForm();
      $scope.addUpdateRecord('list');
    }
    $scope.editProductToList = function() {
      let productList = $scope.getLocalStorage('nootan_products');
      productList.forEach(product => {
        if(product.productID === $scope.productForm.productID) {
          product.name = $scope.productForm.name;
          product.description = $scope.productForm.description;
          $scope.addLocalStorage('nootan_products', productList);
          $scope.inventoryResp.productList = $scope.getLocalStorage('nootan_products');
        } else {
          /*$scope.notificationStatus = {
            notificationType: 'danger',
            notificationMessage: 'Wrong Data. Data can not Edit.'
          };*/
        }
      });
      $scope.resetForm();
      $scope.addUpdateRecord('list');
    }
    $scope.deleteProductToList = function(productForm) {
      let productList = $scope.getLocalStorage('nootan_products');
      productList.forEach(product => {
        if(product.productID === productForm.productID) {
          product.deleteFlag = true;
          $scope.addLocalStorage('nootan_products', productList);
          $scope.inventoryResp.productList = $scope.getLocalStorage('nootan_products');
        } else {
          $scope.notificationStatus = {
            notificationType: 'danger',
            notificationMessage: 'Wrong Data. Data can not Delete.'
          };
        }
      });
      $scope.resetForm();
      $scope.addUpdateRecord('list');
    }
    $scope.addLocalStorage = function(classification, details) {
      return $window.localStorage.setItem(classification, JSON.stringify(details));
    }
    $scope.getLocalStorage = function(classification) {
      if ($window.localStorage.getItem(classification) === null) {
        $window.localStorage.setItem(classification, '[]');
      }
      return JSON.parse($window.localStorage.getItem(classification));
    }
    $scope.isViewMode = function() {
      return $scope.activeAction === 'view';
    }
    $scope.resetNotification = function() {
      $scope.notificationStatus = {
        notificationType: null,   // danger, warning, info, success
        notificationMessage: null
      };
    }
    $scope.resetForm = function() {
      $scope.productForm = {
        'name':'',
        'description':'',
        'quantity': 0,
        'pricePerUnit': 0,
        'insertedDate': null,
        'lastModified': null
      };
    }
    $scope.getDate = function(dateTime) {
      date = new Date(dateTime);
      return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }
    $scope.fetchData();
    $scope.resetNotification();
    $scope.resetForm();
  }
});
