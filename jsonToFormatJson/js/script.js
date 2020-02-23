angular.module('jsonToFormatJSON',[])
.controller('MainCtrl', function($scope){
  $scope.flag = 'JSON';   //(JSON | SUBMITJSON | FORMATJSON)
  $scope.notification = {
    errorType: 'danger',
    errorMsg: ''
  }
  $scope.jsonToFormat = '';
  $scope.validateJSON = {};
  $scope.submitJSON = function(jsonFormat) {
    console.log(jsonFormat);
    $scope.validateJSON = JSON.parse(jsonFormat);
    $scope.flag = 'SUBMITJSON';
  }
  $scope.updateJSON = function() {
    console.log($scope.validateJSON);
    $scope.flag = 'FORMATJSON';
  }
});
