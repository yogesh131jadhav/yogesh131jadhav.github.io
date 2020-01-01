<!DOCTYPE html>
<html lang="en" ng-app="inventoryManagement" ng-controller="MainCtrl">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{{title}}: Admin Dashboard</title>
    <link rel="stylesheet" href="./assets/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="./assets/css/shared/style.css">
    <link rel="stylesheet" href="./assets/css/style.css">
    <link rel="shortcut icon" href="./assets/images/favicon.png" />
    <style>
      .inventoryTable .form-group {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div class="container-scroller">
      <!-- partial:partials/_navbar.html -->
      <nav class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
          <a class="navbar-brand brand-logo" href="index.html"><h3>{{inventoryManagementObject.profile.company}}</h3></a>
          <a class="navbar-brand brand-logo-mini" href="index.html"><img src="./assets/images/logo-mini.svg" alt="logo" /></a>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center">
          <ul class="navbar-nav">
            <li class="nav-item font-weight-semibold d-none d-lg-block">Help : {{inventoryManagementObject.profile.contact}}</li>
          </ul>
          <form class="ml-auto search-form d-none d-md-block" action="#">
            <div class="form-group">
              <input type="search" class="form-control">
            </div>
          </form>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown d-none d-xl-inline-block user-dropdown">
              <a class="nav-link dropdown-toggle" id="UserDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                <img class="img-xs rounded-circle" src="./assets/images/faces/face8.jpg" alt="Profile image"> </a>
              <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                <div class="dropdown-header text-center">
                  <img class="img-md rounded-circle" src="./assets/images/faces/face8.jpg" alt="Profile image">
                  <p class="mb-1 mt-3 font-weight-semibold">{{inventoryManagementObject.profile.company}}</p>
                  <p class="font-weight-light text-muted mb-0">{{inventoryManagementObject.profile.email}}</p>
                </div>
                <a class="dropdown-item">My Profile<span class="badge badge-pill badge-danger">1</span><i class="dropdown-item-icon ti-dashboard"></i></a>
                <a class="dropdown-item">Messages<i class="dropdown-item-icon ti-comment-alt"></i></a>
                <a class="dropdown-item">Activity<i class="dropdown-item-icon ti-location-arrow"></i></a>
                <a class="dropdown-item">FAQ<i class="dropdown-item-icon ti-help-alt"></i></a>
                <a class="dropdown-item">Sign Out<i class="dropdown-item-icon ti-power-off"></i></a>
              </div>
            </li>
          </ul>
          <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span class="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <!-- partial:partials/_sidebar.html -->
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
            <li class="nav-item nav-profile">
              <a href="#" class="nav-link">
                <div class="profile-image">
                  <!-- img class="img-xs rounded-circle" src="./assets/images/faces/face8.jpg" alt="profile image">
                  <div class="dot-indicator bg-success"></div -->
                </div>
                <div class="text-wrapper">
                  <p class="profile-name">{{inventoryManagementObject.profile.company}}</p>
                  <p class="designation">{{inventoryManagementObject.profile.fname}}</p>
                </div>
              </a>
            </li>
            <li class="nav-item nav-category">Main Menu</li>
            <li class="nav-item">
              <a class="nav-link" href="index.html">
                <i class="menu-icon typcn typcn-document-text"></i>
                <span class="menu-title">Dashboard</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="collapse" href="#inventory" aria-expanded="false" aria-controls="inventory">
                <i class="menu-icon typcn typcn-coffee"></i>
                <span class="menu-title">Inventory</span>
                <i class="menu-arrow"></i>
              </a>
              <div class="collapse" id="inventory">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item">
                    <a class="nav-link" href="pages/ui-features/buttons.html">Manage Inventory</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="pages/ui-features/dropdowns.html">Build Reports</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="collapse" href="#billing" aria-expanded="false" aria-controls="billing">
                <i class="menu-icon typcn typcn-coffee"></i>
                <span class="menu-title">Billing</span>
                <i class="menu-arrow"></i>
              </a>
              <div class="collapse" id="billing">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item">
                    <a class="nav-link" href="pages/ui-features/buttons.html">Manage Billing</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="pages/ui-features/dropdowns.html">Build Reports</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        <!-- partial -->
        <div class="main-panel">
          <div class="content-wrapper">
            <!-- Page Title Header Starts-->
            <div class="row page-title-header">
              <div class="col-12">
                <div class="page-header">
                  <h4 class="page-title">Dashboard</h4>
                  <div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                    <ul class="quick-links">
                      <li><a href="#">ICE Market data</a></li>
                      <li><a href="#">Own analysis</a></li>
                      <li><a href="#">Historic market data</a></li>
                    </ul>
                    <ul class="quick-links ml-auto">
                      <li><a href="#">Settings</a></li>
                      <li><a href="#">Analytics</a></li>
                      <li><a href="#">Watchlist</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-12 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <div class="container searchContainer">
                      <div class="row">
                        <div class="col-md-2">
                          <h2 class="mb-0">Inventory</h2>
                        </div>
                        <div class="col-md-8">
                          <div class="row">
                            <div class="form-group col-md-5">
                              <select class="custom-select my-1 mr-sm-2" ng-model="basicSearch.searchCriteriaSelect">
                                <option value="productName">Product Name</option>
                                <option value="brandName">Brand Name</option>
                                <option value="displayPricePerUnit">Price</option>
                              </select>
                            </div>
                            <div class="form-group col-md-7">
                              <input type="search" class="form-control" ng-model="basicSearch.searchCriteriaInput" placeholder="Enter Keyword For Search">
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <button type="button" class="btn btn-link" data-toggle="modal" data-target="#addInventory">Add Entry</button>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                    </div>
                    <div class="modal" id="addInventory">
                      <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h4 class="modal-title">Add Inventory Entry</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div class="modal-body">
                            <form class="forms-sample row">
                              <div class="col-4">
                                <div class="form-group">
                                  <label for="exampleInputEmail1">Brand</label>
                                  <input type="text" class="form-control" ng-model="addInventory.brandName" id="exampleInputEmail1">
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputPassword1">Product Name</label>
                                  <input type="text" class="form-control" ng-model="addInventory.productName" id="exampleInputPassword1">
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputEmail1">Quanitity</label>
                                  <input type="text" class="form-control" ng-model="addInventory.quanitity" id="exampleInputEmail1">
                                </div>
                              </div>
                              <div class="col-4">
                                <div class="form-group">
                                  <label for="exampleInputPassword1">Unit</label>
                                  <input type="text" class="form-control" ng-model="addInventory.unit" id="exampleInputPassword1">
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputEmail1">Minimum Quantity</label>
                                  <input type="text" class="form-control" ng-model="addInventory.minimumQuantity" id="exampleInputEmail1">
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputPassword1">Price Per Unit</label>
                                  <input type="text" class="form-control" ng-model="addInventory.pricePerUnit" id="exampleInputPassword1">
                                </div>
                              </div>
                              <div class="col-4">
                                <div class="form-group">
                                  <label for="exampleInputPassword1">Display Price Per Unit</label>
                                  <input type="text" class="form-control" ng-model="addInventory.displayPricePerUnit" id="exampleInputPassword1">
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputEmail1">Product Specification</label>
                                  <input type="text" class="form-control" ng-model="addInventory.productSpecification[0].spec" id="exampleInputEmail1">
                                </div>
                                <button ng-click="addInventoryFunction(addInventory)" class="btn btn-success mr-2">Submit</button>
                                <button class="btn btn-light">Cancel</button>
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="table-responsive inventoryTable">
                      <table class="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Sr No</th>
                            <th>Product Name</th>
                            <th>Brand Name</th>
                            <th>Available Quanitity</th>
                            <th>Price</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr ng-repeat="product in inventoryManagementObject.inventory | orderBy: basicSearch.searchCriteriaSelect | filter: basicSearch.searchCriteriaInput ">
                            <td>{{$index + 1}}</td>
                            <td>
                              <div class="form-group">
                                <input type="text" class="form-control" ng-model="product.productName" ng-disabled="product.viewRecord">
                              </div>
                            </td>
                            <td>
                              <div class="form-group">
                                <input type="text" class="form-control" ng-model="product.brandName" ng-disabled="product.viewRecord">
                              </div>
                            </td>
                            <td>
                              <div class="form-group">
                                <input type="text" class="form-control" ng-model="product.quanitity" ng-disabled="product.viewRecord">
                              </div>
                            </td>
                            <td>
                              <div class="form-group">
                                <input type="text" class="form-control" ng-model="product.displayPricePerUnit" ng-disabled="product.viewRecord">
                              </div>
                            </td>
                            <td>
                              <button class="btn btn-link" ng-click="handleFormEdit($index)" ng-if="product.viewRecord">Edit</button>
                              <button class="btn btn-link" ng-click="handleFormSave($index, product)" ng-if="!product.viewRecord">Save</button>
                              <button class="btn btn-link">Delete</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <div class="container searchContainer">
                      <div class="row">
                        <div class="col-md-3">
                          <h2 class="mb-0">Manage Stock</h2>
                        </div>
                        <div class="col-md-7">
                          <input type="search" class="form-control" ng-model="basicSearch.searchCriteriaInput" placeholder="Product Name">
                        </div>
                        <div class="col-md-2">
                          <button type="button" class="btn btn-link" data-toggle="modal" data-target="#addStock">Add Stock</button>
                        </div>
                      </div>
                    </div>
                    <div class="modal" id="addStock">
                      <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h4 class="modal-title">Add Stock Entry</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div class="modal-body">
                            <form class="forms-sample row">
                              <div class="col-4">
                                <div class="form-group">
                                  <label for="exampleInputEmail1">Brand</label>
                                  <input type="text" class="form-control" ng-model="addInventory.brandName" id="exampleInputEmail1">
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputPassword1">Product Name</label>
                                  <input type="text" class="form-control" ng-model="addInventory.productName" id="exampleInputPassword1">
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputEmail1">Quanitity</label>
                                  <input type="text" class="form-control" ng-model="addInventory.quanitity" id="exampleInputEmail1">
                                </div>
                              </div>
                              <div class="col-4">
                                <div class="form-group">
                                  <label for="exampleInputPassword1">Unit</label>
                                  <input type="text" class="form-control" ng-model="addInventory.unit" id="exampleInputPassword1">
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputEmail1">Minimum Quantity</label>
                                  <input type="text" class="form-control" ng-model="addInventory.minimumQuantity" id="exampleInputEmail1">
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputPassword1">Price Per Unit</label>
                                  <input type="text" class="form-control" ng-model="addInventory.pricePerUnit" id="exampleInputPassword1">
                                </div>
                              </div>
                              <div class="col-4">
                                <div class="form-group">
                                  <label for="exampleInputPassword1">Display Price Per Unit</label>
                                  <input type="text" class="form-control" ng-model="addInventory.displayPricePerUnit" id="exampleInputPassword1">
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputEmail1">Product Specification</label>
                                  <input type="text" class="form-control" ng-model="addInventory.productSpecification[0].spec" id="exampleInputEmail1">
                                </div>
                                <button ng-click="addInventoryFunction(addInventory)" class="btn btn-success mr-2">Submit</button>
                                <button class="btn btn-light">Cancel</button>
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="table-responsive inventoryTable">
                      <table class="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Sr No</th>
                            <th>Product Name</th>
                            <th>Brand Name</th>
                            <th>Available Quanitity</th>
                            <th>Price</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr ng-repeat="product in inventoryManagementObject.inventory | orderBy: basicSearch.searchCriteriaSelect | filter: basicSearch.searchCriteriaInput ">
                            <td>{{$index + 1}}</td>
                            <td>
                              <div class="form-group">
                                <input type="text" class="form-control" ng-model="product.productName" ng-disabled="product.viewRecord">
                              </div>
                            </td>
                            <td>
                              <div class="form-group">
                                <input type="text" class="form-control" ng-model="product.brandName" ng-disabled="product.viewRecord">
                              </div>
                            </td>
                            <td>
                              <div class="form-group">
                                <input type="text" class="form-control" ng-model="product.quanitity" ng-disabled="product.viewRecord">
                              </div>
                            </td>
                            <td>
                              <div class="form-group">
                                <input type="text" class="form-control" ng-model="product.displayPricePerUnit" ng-disabled="product.viewRecord">
                              </div>
                            </td>
                            <td>
                              <button class="btn btn-link" ng-click="handleFormEdit($index)" ng-if="product.viewRecord">Edit</button>
                              <button class="btn btn-link" ng-click="handleFormSave($index, product)" ng-if="!product.viewRecord">Save</button>
                              <button class="btn btn-link">Delete</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- content-wrapper ends -->
          <!-- partial:partials/_footer.html -->
          <footer class="footer">
            <div class="container-fluid clearfix">
              <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © 2019 <a href="http://www.bootstrapdash.com/" target="_blank">Bootstrapdash</a>. All rights reserved.</span>
              <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i class="mdi mdi-heart text-danger"></i>
              </span>
            </div>
          </footer>
          <!-- partial -->
        </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
    <script src="./assets/js/shared/vendor.bundle.base.js"></script>
    <script src="./assets/js/shared/vendor.bundle.addons.js"></script>
    <script src="./assets/js/shared/misc.js"></script>
    <script src="./assets/js/shared/dashboard.js"></script>
    <script src="./assets/js/shared/angular.min.js"></script>
    <script src="./assets/js/shared/script.js"></script>
    <!-- End custom js for this page-->
  </body>
</html>