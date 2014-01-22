(function(angular, $){
  'use strict';
  
  angular.module('butcher').controller("NavButtonsCtrl", function($scope, $routeParams, $log) {
    $log.log("NavButtonsCtrl is running.");
    
    $scope.$routeParams = $routeParams;
    
  });

}(window.angular, window.jQuery));
