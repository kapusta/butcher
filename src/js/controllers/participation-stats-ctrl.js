(function(angular, $){
  'use strict';
  
  angular.module('butcher').controller("ParticipationStatsCtrl", function($scope, $routeParams, $log) {
    $log.log("ParticipationStatsCtrl is running.");
    
    // Hard coded example data, these data will be supplied by the REST api
    $scope.int = {};
    $scope.int.posters = 82;
    $scope.int.lurkers = 147;
    $scope.int.pRate =  ($scope.int.posters / ($scope.int.posters + $scope.int.lurkers) * 100).toFixed(2);
    
    $scope.fr = {};
    $scope.fr.posters = 32;
    $scope.fr.lurkers = 87;
    $scope.fr.pRate =  ($scope.fr.posters / ($scope.fr.posters + $scope.fr.lurkers) * 100).toFixed(2);
    
    
    
  });

}(window.angular, window.jQuery));
