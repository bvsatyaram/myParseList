Parse.initialize("qPFxn2BzjIB5WkMJBLy1k9TiHaeeLI4fYs8O4OqY", "dSkyiLadGpXd5oHavBlyZaJ0z3xLsSeLWKnb7iHE");

var app = angular.module('myList', ['ngAnimate']);

app.config(function($sceProvider) {
  $sceProvider.enabled(false);
});

app.controller('ItemController', ['$scope', function($scope) {
  $scope.items = [];

  $scope.fetchItems = function() {
    $scope.items = [];
    var Task = Parse.Object.extend("Task");
    var query = new Parse.Query(Task);
    // query.equalTo("playerName", "Dan Stemkoski");
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) { 
          var item = results[i];
          $scope.items.push({
            title: item.get('title'),
            done: item.get('done'),
            parseId: item.id
          });
        }
        $('#itemsLoading').hide();
        $scope.$apply();
      }
    });
  };

  $scope.fetchItems();

  $scope.toggleItem = function(item) {
    $scope.currentItem = item;
    $scope.currentItem.done = !$scope.currentItem.done;

    var Task = Parse.Object.extend("Task");
    var query = new Parse.Query(Task);
    query.get(item.parseId, {
      success: function(item) {
        item.set("done", $scope.currentItem.done);
        item.save();
      }
    });
  };

  $scope.deleteItem = function(item) {
    var itemIndex = $scope.items.indexOf(item);
    if(itemIndex > -1) {
      $scope.items.splice(itemIndex, 1);
    }
    var Task = Parse.Object.extend("Task");
    var query = new Parse.Query(Task);
    query.get(item.parseId, {
      success: function(item) {
        item.destroy();
      }
    });
  };

  $scope.addItem = function() {
    var itemTitle = $scope.newItemTitle;
    if (itemTitle && itemTitle.trim().length) {  
      // Append +newItem+ to +$scope.items+
      itemTitle = itemTitle.trim();
      var newItem = {
        title: itemTitle,
        done: false
      };
      $scope.items.push(newItem);
      $scope.newItemTitle = "";

      // Add +newItem+ to parse data
      var Task = Parse.Object.extend("Task");
      var task = new Task();

      task.set("title", itemTitle);
      task.set("done", false);

      task.save(null, {
        success: function(task) {
          var newItem = $scope.items[$scope.items.length - 1];
          newItem.parseId = task.id;
          $scope.$apply();
        }
      });
    }
  }
}]);