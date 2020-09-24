angular.module('skWholesale')
.component('sales', {
  templateUrl: './component/sales/sales.html',
  controller: function($scope, $http, $timeout, $window) {
    $scope.activeAction = 'list';         // list, add, edit
    $scope.addUpdateRecord = function(action, item = null) {
      if(item) {
        $scope.saleForm = item;
      }
      $scope.activeAction = action;
    }
    $scope.fetchData = function() {
      $scope.inventoryResp = {
        saleList: $scope.getLocalStorage('nootan_sales')
      };
    }
    $scope.addSale = function(action, item = null) {
      $scope.resetNotification();
      if(action === 'add') {
        $scope.addSaleToList();
      } else if(action === 'edit') {
        $scope.editSaleToList();
      } else if(action === 'delete') {
        $scope.deleteSaleToList(item);
      }
    }
    $scope.addSaleToList = function() {
      let saleList = $scope.getLocalStorage('nootan_sales');
      $scope.saleForm.saleID = 'prod-' + Math.floor(Math.random() * 1000000 + 1000000);
      $scope.saleForm.deleteFlag = false;
      $scope.saleForm.quantity = 0;
      $scope.saleForm.pricePerUnit = 0;
      $scope.saleForm.insertedDate = new Date().getTime();
      $scope.saleForm.lastModified = new Date().getTime();
      saleList.push($scope.saleForm);
      $scope.addLocalStorage('nootan_sales', saleList);
      $scope.inventoryResp.saleList = $scope.getLocalStorage('nootan_sales');
      $scope.resetForm();
      $scope.addUpdateRecord('list');
    }
    $scope.editSaleToList = function() {
      let saleList = $scope.getLocalStorage('nootan_sales');
      saleList.forEach(product => {
        if(product.productID === $scope.saleForm.productID) {
          product.name = $scope.saleForm.name;
          product.description = $scope.saleForm.description;
          $scope.addLocalStorage('nootan_sales', saleList);
          $scope.inventoryResp.saleList = $scope.getLocalStorage('nootan_sales');
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
    $scope.deleteSaleToList = function(saleForm) {
      let saleList = $scope.getLocalStorage('nootan_sales');
      saleList.forEach(product => {
        if(product.saleID === saleForm.saleID) {
          product.deleteFlag = true;
          $scope.addLocalStorage('nootan_sales', saleList);
          $scope.inventoryResp.saleList = $scope.getLocalStorage('nootan_sales');
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
      $scope.saleForm = [{
        'productID':'',
        'quantity': 0,
        'pricePerUnit': 0
      }];
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
