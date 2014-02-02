(function(angular){
  'use strict';
  
  angular.module('butcher').controller("Nvd3jsStatsCtrl", function($scope, $routeParams, $log) {
    $log.log("Nvd3jsStatsCtrl is running.");
    
    $scope.exampleData = [
      {
        "key": "Posted",
        "color": "#ff7f0e",
        "values" : [[1, 21], [2, 32], [3, 23]]
      },
      {
        "key": "Viewed",
        "color": "#5787b7",
        "values" : [[1, 31], [2, 42], [3, 27]]
      }
    ];
    
  });
  
}(window.angular));
