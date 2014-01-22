(function(angular, $){
  'use strict';
  
  angular.module('butcher').controller("ParticipationStatsCtrl", function($scope, $routeParams, $log) {
    $log.log("ParticipationStatsCtrl is running.");
    
    $scope.int = {};
    $scope.int.posters = 82;
    $scope.int.lurkers = 147;
    
    $scope.int.pRate =  ($scope.int.posters / ($scope.int.posters + $scope.int.lurkers) * 100).toFixed(2);
    
    
  });

}(window.angular, window.jQuery));
