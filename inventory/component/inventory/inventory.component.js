angular.module('inventoryManagement')
.component('inventoryComponent', {
  templateUrl: './component/inventory/inventory.component.html',
  bindings: {
     inventoryManagementObject: '<'
  },
  controller: function() {
    this.basicSearch = {
      'searchCriteriaInput': ''
    };
    this.showPopup = false;
    this.addInventory = {};
    this.addInventoryFunction = function() {
      if(!this.addInventory.itemID) {
        this.addInventory.itemID = this.inventoryManagementObject.inventory.length + 1;
        this.inventoryManagementObject.inventory.push(this.addInventory);
      }
      this.closePopup();
    }
    this.setViewData = function(product) {
      this.addInventory = product;
      this.addInventory.recordAction = 'view';
      this.openPopup();
    }
    this.basicSearch = {
      "searchCriteriaSelect": "productName",
      "searchCriteriaInput": ""
    };
    this.handleFormEdit = function(product) {
      this.addInventory = product;
      this.addInventory.recordAction = 'edit';
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
