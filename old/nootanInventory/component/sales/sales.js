angular.module('skWholesale')
.component('sales', {
  templateUrl: './component/sales/sales.html',
  controller: function($scope, $http, $timeout, $window) {
    $scope.activeAction = 'list';
    $scope.totalSaleCost = 0;
    $scope.addUpdateRecord = function(action, item = null) {
      if(item) {
        $scope.saleForm = item;
      }
      $scope.activeAction = action;
    }
    $scope.fetchData = function() {
      $scope.inventoryResp = {
        productList: $scope.getLocalStorage('nootan_products'),
        customerList: $scope.getLocalStorage('nootan_customers'),
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
    $scope.addCustomer = function() {
      let customerList = $scope.getLocalStorage('nootan_customers');
      $scope.saleForm.customerID = 'cust-' + Math.floor(Math.random() * 1000000 + 1000000);
      $scope.customerForm.customerID = $scope.saleForm.customerID;
      customerList.push($scope.customerForm);
      $scope.addLocalStorage('nootan_customers', customerList);
      $scope.inventoryResp.customerList = $scope.getLocalStorage('nootan_customers');
    }
    $scope.editSaleToList = function() {
      let saleList = $scope.getLocalStorage('nootan_sales');
      saleList.forEach(product => {
        if(product.productID === $scope.saleForm.productID) {
          product.name = $scope.saleForm.name;
          product.description = $scope.saleForm.description;
          $scope.addLocalStorage('nootan_sales', saleList);
          $scope.inventoryResp.saleList = $scope.getLocalStorage('nootan_sales');
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
        notificationType: null,
        notificationMessage: null
      };
    }
    $scope.resetForm = function() {
      $scope.saleForm = {
        customerID: '',
        transactionMode: '',
        transactionDate: new Date().getTime(),
        transaction: [{
          'productID':'',
          'quantity': 0,
          'pricePerUnit': 0
        }]
      };
      $scope.customerForm = {
        'customerID': '',
        'customerName': '',
        'customerNumber': '',
        'customerAddress': ''
      };
    }
    $scope.getDate = function(dateTime) {
      date = new Date(dateTime);
      return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }
    $scope.setProductPrice = function(index) {
      $scope.saleForm.transaction[index].quantity = 0;
      $scope.saleForm.transaction[index].pricePerUnit = 0;
      let count = 0;
      $scope.saleForm.transaction.map(transaction => {
        if(transaction.productID === $scope.saleForm.transaction[index].productID) {
          count++;
        }
      });
      $scope.inventoryResp.productList.map(product => {
        if(product.productID === $scope.saleForm.transaction[index].productID) {
          if(count === 1) {
            $scope.saleForm.transaction[index].pricePerUnit = product.pricePerUnit;
            $scope.addSaleRow();
          } else {
            $scope.addSaleRow();
            $scope.setError('You will not able to add Same product twice.');
          }
        }
      });
    }
    $scope.validateQuantity = function(index) {
      $scope.inventoryResp.productList.map(product => {
        if(product.productID === $scope.saleForm.transaction[index].productID) {
          $scope.addSaleRow();
          $scope.resetNotification();
          if(product.quantity < $scope.saleForm.transaction[index].quantity) {
            $scope.setError('Product quantity will not more than Inventory. For now quantity will be based on Inventory.');
            $scope.saleForm.transaction[index].quantity = product.quantity;
          }
        }
      });
      $scope.calculateTotal();
    }
    $scope.calculateTotal = function() {
      $scope.totalSaleCost = 0;
      $scope.saleForm.transaction.map(transact => {
        $scope.totalSaleCost = $scope.totalSaleCost + transact.quantity * transact.pricePerUnit;
      });
    }
    $scope.addSaleRow = function() {
      var index = $scope.saleForm.transaction.length - 1;
      if($scope.saleForm.transaction[index].productID && $scope.saleForm.transaction[index].quantity && $scope.saleForm.transaction[index].pricePerUnit) {
        $scope.saleForm.transaction.push({
          'productID':'',
          'quantity': 0,
          'pricePerUnit': 0
        });
      }
    }
    $scope.scrollTop = function() {
      $window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    $scope.setError = function(msg) {
      $scope.notificationStatus = {
        notificationType: 'danger',
        notificationMessage: msg
      };
      $scope.scrollTop();
    }
    $scope.removeEntry = function(index) {
      $scope.saleForm.transaction.splice(index, 1)
    }
    $scope.addSaleToList = function() {
      // Insert Customer record
      if ($scope.saleForm.customerID === 'other') {
        $scope.addCustomer();
      }
      // Insert Sales record
      let saleList = $scope.getLocalStorage('nootan_sales');
      $scope.clearEmptyFields($scope.saleForm.transaction, ['productID','quantity','pricePerUnit']);
      $scope.minimizeProductQuantity();
      saleList.push($scope.saleForm);
      $scope.addLocalStorage('nootan_sales', saleList);
      $scope.inventoryResp.saleList = $scope.getLocalStorage('nootan_sales');
      $scope.resetForm();
      $scope.addUpdateRecord('list');
    }
    $scope.minimizeProductQuantity = function() {
      $scope.saleForm.transaction.map(transaction => {
        $scope.inventoryResp.productList.map(product => {          
          if(transaction.productID === product.productID) {
            product.quantity = parseInt(product.quantity) - parseInt(transaction.quantity);
            product.lastModified = new Date().getTime();
          }
        })
      });
      $scope.addLocalStorage('nootan_products', $scope.inventoryResp.productList);
    }
    $scope.clearEmptyFields = function(items, attributes) {
      items.map((item, index) => {
        if(item['productID'] === '' && item['quantity'] === 0 && item['pricePerUnit'] === 0) {
           items.splice(index, 1);
        }
      })
    }
    $scope.fetchData();
    $scope.resetNotification();
    $scope.resetForm();
  }
});
