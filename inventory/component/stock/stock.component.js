angular.module('inventoryManagement')
.component('stockComponent', {
  templateUrl: './component/stock/stock.component.html',
  bindings: {
     inventoryManagementObject: '<'
  },
  controller: function() {
    this.basicSearch = {
      'searchCriteriaInput': ''
    };
    this.editProductStockQantity = 0;
    this.showPopup = false;
    this.addStock = {};
    this.addStockFunction = function() {
      if(!this.addStock.stockID) {
        this.addStock.stockID = this.inventoryManagementObject.stock.length + 1;
        this.inventoryManagementObject.inventory[this.addStock.productID - 1].quanitity = parseInt(this.inventoryManagementObject.inventory[this.addStock.productID - 1].quanitity) + parseInt(this.addStock.qantity);
        this.inventoryManagementObject.stock.push(this.addStock);
      } else {
        this.inventoryManagementObject.inventory[this.addStock.productID - 1].quanitity = parseInt(this.inventoryManagementObject.inventory[this.addStock.productID - 1].quanitity) + parseInt(this.addStock.qantity) - this.editProductStockQantity;
      }
      this.closePopup();
    }
    this.setViewData = function(product) {
      this.addStock = product;
      this.addStock.recordAction = 'view';
      this.openPopup();
    }
    this.basicSearch = {
      "searchCriteriaSelect": "productName",
      "searchCriteriaInput": ""
    };
    this.handleFormEdit = function(product) {
      this.editProductStockQantity = product.qantity;
      this.addStock = product;
      this.addStock.recordAction = 'edit';
      this.openPopup();
    }
    this.closePopup = function() {
      this.showPopup = false;
    }
    this.openPopup = function() {
      this.showPopup = true;
    }
  }
});
