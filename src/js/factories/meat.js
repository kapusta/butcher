(function(angular, document){
  'use strict';
  // Please see ./intercept.js for the functions that intercept these connections (outbound AND inbound). 
  
  angular.module('butcher').factory('meat', ['$http', '$rootScope', '$log', function($http, $rootScope, $log) {
    $log.log("meat factory is running");
    
    var meat = {};
    var timeout = 60000; // timeout in milliseconds
    
    meat.get = function(url, params, isArray, happy_meat, sad_meat) { // sad_meat is an optional function to execute if there was a failure
      return $http({ // return for the sake of the promise
        'method': 'GET',
        'url': url, // this can't have a query string on it
        'params': params, // an object literal
        'isArray': isArray,
        'timeout': timeout
      })
      .then(
        function(obj) { happy_meat(obj); }, // Success
        function(obj) { if(sad_meat) { sad_meat(obj); } } // Fails via intercept.js, but you can also send in a fail func
      );
    };
    
    meat.read = meat.get; // map "get" to "read"
    
    return meat;
  }]);
  
}(window.angular, document));
