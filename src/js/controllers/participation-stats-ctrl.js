(function(angular, $){
  'use strict';
  
  angular.module('butcher').controller("ParticipationStatsCtrl", function($scope, $routeParams, $log) {
    $log.log("ParticipationStatsCtrl is running.");
    
    $scope.int = {};
    $scope.int.posters = 82;
    $scope.int.lurkers = 147;
    
    $scope.int.pRate =  ($scope.int.posters / ($scope.int.posters + $scope.int.lurkers) * 100).toFixed(2);
    
    $scope.bubbleData = [
      {
        "counts": [
          [0, 6],
          [1, 70],
          [2, 111],
          [3, 203],
          [4, 230],
          [5, 180],
          [6, 103],
          [7, 140],
          [8, 130],
          [9, 203],
          [10, 193],
          [11, 123],
          [12, 100]
        ],
        "name": "international"
      }, {
        "counts": [
          [5, 1],
          [7, 3],
          [8, 4],
          [9, 17],
          [0, 10]
        ],
        "name": "french"
      }, {
        "counts": [
          [1, 1],
          [3, 2],
          [5, 8],
          [7, 13],
          [10, 11]
        ],
        "name": "spanish"
      }
    ];
    
    
  });

}(window.angular, window.jQuery));
