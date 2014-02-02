(function(angular){
  'use strict';
  
  angular.module('butcher').controller("AlertsCtrl", function($scope, $rootScope, $log) {
    $log.log("AlertsCtrl is running.");
    
    $scope.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };
    
    ///////////////////////////////////////////////////////////////////////////
    // SET UP WATCHERS ////////////////////////////////////////////////////////
    
    // alerts can and will be pushed onto $rootScope from various other scopes.
    // Keep the alerts for this scope up to date with the $rootScope
    $scope.$watch(
      function() {
        return $rootScope.alerts;
      },
      function() {
        $scope.alerts = $rootScope.alerts;
      }
    );
    
    
  });
  
}(window.angular));
