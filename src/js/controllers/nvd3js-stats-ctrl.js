(function(angular){
  'use strict';
  
  angular.module('butcher').controller("Nvd3jsStatsCtrl", function($scope, $routeParams, $log) {
    $log.log("Nvd3jsStatsCtrl is running.");
    
    $scope.exampleData = [
      {
        "key": "Participating",
        "color": "#ff7f0e",
        "values" : [[1, 21], [2, 32], [3, 23], [4, 56], [5, 75], [6, 123], [7, 110], [8, 93], [9, 75]]
      },
      {
        "key": "Viewing",
        "color": "#5787b7",
        "values" : [[1, 31], [2, 42], [3, 27], [4, 87], [5, 127], [6, 134], [7, 127], [8, 127], [9, 90]]
      }
    ];
    
  });
  
}(window.angular));
