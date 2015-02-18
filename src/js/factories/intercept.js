// Adapted from: https://gist.github.com/gnomeontherun/5678505

(function(angular, document){
  'use strict';
  
  angular.module('butcher').factory('intercept', ['$q', '$rootScope', '$log', function($q, $rootScope, $log) {
    $log.log("intercept factory is running");
    
    var i = {};
    
    i.request = function(obj) {
      // Access to lots of great stuff in here...
      // obj.headers (object), obj.method (string), obj.url (string), obj.withCredentials (boolean)
      //$log.log("intercept: request");
      //$log.log(obj);
      // transform the response here if you need to, the request config is in config
      return obj || $q.when(obj);
    };
    
    i.requestError = function(obj) { // a failed request
      //$log.log("intercept: requestError");
      //$log.log(obj);
      return $q.reject(obj);
    };
    
    i.response = function(obj) { // a succuesful response
      //$log.log("intercept: response");
      //$log.log(obj);
      // transform the response here if you need to, the deserialize JSON is in obj.data
      return obj || $q.when(obj);
    };
    
    i.responseError = function(obj) { // a failed response
      
      var exists = false; // We want to check for an error type that is already being reported in the UI (don't flood the UI please!)
      
      var errors = angular.fromJson(obj.data);
      
      // go thru the alerts and make sure the one we just got isn't already there
      for (var i = 0; i < $rootScope.alerts.length; i++) {
        if ($rootScope.alerts[i].status === obj.status) {
          exists = true;
          break;
        }
      }
      if (!exists) { // ignore the zeros for now
        $rootScope.alerts.push({
          'status': obj.status, // not used in the ui, used to de-dup
          'type': (obj.status < 500) ? 'warning' : 'error',
          'msg': (errors && errors.Errors) ? errors.Errors : "",
          'url': (obj.config.url) ? (obj.config.url) : false,
          'count': 1
        });
      } else {
        $rootScope.alerts[i].count++; 
      }
      
      $log.log("intercept factory caught an error: " + obj.status);
      //$log.log(obj); // this object is handed to $http and .then() fires with the object
      return $q.reject(obj);
    };
    
    return i;
    
  }]);
  
}(window.angular, document));
