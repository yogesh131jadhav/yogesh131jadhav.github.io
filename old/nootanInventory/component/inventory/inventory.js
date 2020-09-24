angular.module('skWholesale')
.component('inventory', {
  templateUrl: './component/inventory/inventory.html',
  controller: function($scope, $http, $timeout, $window) {
    $scope.activeAction = 'list';
    $scope.addUpdateRecord = function(action, item = null) {
      if(item) {
        $scope.inventoryForm = item;
      }
      $scope.activeAction = action;
    }
    $scope.fetchData = function() {
      $scope.inventoryResp = {
        inventoryList: $scope.getLocalStorage('nootan_inventory'),
        productList: $scope.getLocalStorage('nootan_products')
      };
    }
    $scope.addInventory = function(action, item = null) {
      $scope.resetNotification();
      if(action === 'add') {
        $scope.addInventoryToList();
      } else if(action === 'edit') {
        $scope.editInventoryToList();
      } else if(action === 'delete') {
        $scope.deleteInventoryToList(item);
      }
    }
    $scope.addInventoryToList = function() {
      let inventoryList = $scope.getLocalStorage('nootan_inventory');
      $scope.inventoryForm.inventoryID = 'inventory-' + Math.floor(Math.random() * 1000000 + 1000000);
      $scope.inventoryForm.deleteFlag = false;
      $scope.inventoryForm.insertedDate = new Date().getTime();
      $scope.inventoryResp.productList.forEach(product => {
        if(product.productID === $scope.inventoryForm.productID) {
          product.quantity = parseInt(product.quantity) + parseInt($scope.inventoryForm.quantity);
          product.pricePerUnit = $scope.inventoryForm.pricePerUnit;
          product.lastModified = new Date().getTime();
        }
      });
      inventoryList.push($scope.inventoryForm);
      $scope.addLocalStorage('nootan_inventory', inventoryList);
      $scope.addLocalStorage('nootan_products', $scope.inventoryResp.productList);
      $scope.inventoryResp.inventoryList = $scope.getLocalStorage('nootan_inventory');
      $scope.resetForm();
      $scope.addUpdateRecord('list');
    }
    $scope.editInventoryToList = function() {
      let inventoryList = $scope.getLocalStorage('nootan_inventory');
      inventoryList.forEach(inventory => {
        if(inventory.inventoryID === $scope.inventoryForm.inventoryID) {
          inventory.productID = $scope.inventoryForm.productID;
          inventory.quantity = $scope.inventoryForm.quantity;
          inventory.pricePerUnit = $scope.inventoryForm.pricePerUnit;
          $scope.addLocalStorage('nootan_inventory', inventoryList);
          $scope.inventoryResp.inventoryList = $scope.getLocalStorage('nootan_inventory');
        }
      });
      $scope.resetForm();
      $scope.addUpdateRecord('list');
    }
    $scope.deleteInventoryToList = function(inventoryForm) {
      let inventoryList = $scope.getLocalStorage('nootan_inventory');
      inventoryList.forEach(inventory => {
        if(inventory.inventoryID === inventoryForm.inventoryID) {
          inventory.deleteFlag = true;
          $scope.addLocalStorage('nootan_inventory', inventoryList);
          $scope.inventoryResp.inventoryList = $scope.getLocalStorage('nootan_inventory');
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
      $scope.inventoryForm = {
        'productID':'',
        'quantity': '',
        'pricePerUnit':'',
        'insertedDate': null
      };
    }
    $scope.fetchData();
    $scope.resetNotification();
    $scope.resetForm();
  }
});
