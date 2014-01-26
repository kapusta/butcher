// Proof of concept. PRs accepted.
(function(angular, $, document){
  'use strict';
  
  angular.module('butcher').controller("TrafficStatsCtrl", function($scope, $log, $timeout, meat) {
    $log.log("TrafficStatsCtrl is running.");
    
    // Sample data format for bubble graph
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
        "name": "channel 1"
      }, {
        "counts": [
          [5, 1],
          [7, 3],
          [8, 4],
          [9, 17],
          [0, 10]
        ],
        "name": "channel 2"
      }, {
        "counts": [
          [1, 1],
          [3, 2],
          [5, 8],
          [7, 13],
          [10, 11]
        ],
        "name": "channel 3"
      }
    ];
    
    
    
    
    
    
    /* uncomment and use as needed when stats JSON data normalizes
    $scope.getMeat = function(refresh) {
      meat.get(
        $scope.restUrl + '/stats',
        false, // query params, if any
        true, // isArray
        function(obj) { // what to do when the GET is done
          $scope.traffic = obj.data; // do something here
        }
      );
    };
    
    $scope.getMeat(); // we could put this on a timer or whatever
    */
  });

}(window.angular, window.jQuery));
