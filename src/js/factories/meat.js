(function(angular, document){
  'use strict';
  // Please see ./intercept.js for the functions that intercept these connections (outbound AND inbound). 
  
  angular.module('butcher').factory('meat', ['$http', '$rootScope', '$log', function($http, $rootScope, $log) {
    $log.log("meat factory is running");
    
    var meat = {};
    var timeout = 60000; // timeout in milliseconds
    
    meat.get = function(url, params, isArray, successCallback, failureCallback) {
      return $http({ // return for the sake of the promise
        'method': 'GET',
        'url': url, // this can't have a query string on it
        'params': params, // an object literal
        'isArray': isArray,
        'timeout': timeout
      })
      .then(
        // success
        function(obj) { 
          if (successCallback) {
            return successCallback(obj);
          } else {
            return obj; 
          }
        },
        // fail
        function(obj) { 
          if(failureCallback) { 
            return failureCallback(obj);
          } else {
            return obj;
          }
        }
      );
    };
    
    meat.read = meat.get; // map "get" to "read"
    
    return meat;
  }]);
  
}(window.angular, document));
