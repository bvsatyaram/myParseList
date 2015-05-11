var app = angular.module('myList', ['ngAnimate']);

app.config(function($sceProvider) {
    $sceProvider.enabled(false);
  });

app.controller('ItemController', ['$scope', function($scope) {
  $scope.items = [
    {title: "One",   done: false},
    {title: "Two",   done: false},
    {title: "Three", done: false}
  ];

  $scope.toggleItem = function(item) {
    item.done = !item.done;
  };

  $scope.deleteItem = function(item) {
    var itemIndex = $scope.items.indexOf(item);
    if(itemIndex > -1) {
      $scope.items.splice(itemIndex, 1);
    }
  }

  $scope.addItem = function() {
    var itemTitle = $scope.newItemTitle;
    if (itemTitle && itemTitle.trim().length) {  
      var newItem = {
        title: itemTitle.trim(),
        done: false
      };
      $scope.items.push(newItem);
    }
    $scope.newItemTitle = "";
  }
}]);