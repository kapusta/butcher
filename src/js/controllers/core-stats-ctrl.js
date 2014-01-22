// Proof of concept. PRs accepted.
(function(angular, $, document){
  'use strict';
  
  angular.module('butcher').controller("CoreStatsCtrl", function($scope, $log, $timeout, meat) {
    $log.log("CoreStatsCtrl is running.");
    
    // TODO: we'll get a better JSON format later
    var pop_bar_data = function(data) {
      var inc_totals = [];
      var inc_uniques = [];
      var out_totals = [];
      var out_uniques = [];
      
      for (var i = 0; i < 24; i++) {
        if (data[i].topic === "meatspace.incoming") {
          inc_totals.push(data[i].total);
          inc_uniques.push(data[i].uniques);
        }
        if (data[i].topic === "meatspace.outgoing") {
          out_totals.push(data[i].total);
          out_uniques.push(data[i].uniques);
        }
      }
      // Yeah this should be a directive, I/you (and I mean you, McGoogles) will get to that soon.
      // Probably should wrap all of peity() in a directive.
      $("#meatspace-incoming-total").peity("bar", { width: 200, height: 50 }).text(inc_totals.join(",")).change();
      $("#meatspace-incoming-uniques").peity("bar", { width: 200, height: 50 }).text(inc_uniques.join(",")).change();
      $("#meatspace-outgoing-total").peity("bar", { width: 200, height: 50 }).text(out_totals.join(",")).change();
      $("#meatspace-outgoing-uniques").peity("bar", { width: 200, height: 50 }).text(out_uniques.join(",")).change();
    };
    
    $scope.getMeat = function(refresh) {
      meat.get(
        $scope.restUrl + '/stats',
        false, // query params, if any
        true, // isArray
        function(obj) { // what to do when the GET is done
          $scope.core_stats = obj.data; // do something here
          pop_bar_data(obj.data);
        }
      );
    };
    
    $scope.getMeat(); // we could put this on a timer or whatever
    
  });

}(window.angular, window.jQuery));
