(function(angular) {
  "use strict"; // ECMA5 strict mode
  
	// These probably get moved out to a config file
  var baseUrl = "/";
  var restUrl = "http://nodejsisata.co:1983";
  
  // A utility function for capitalizing string
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
  
  var butcher = angular.module('butcher', ['ngRoute', 'ui.bootstrap', 'dkCircles', 'nvd3ChartDirectives']);
  
  // Configure the module.
  butcher.config(function($routeProvider, $locationProvider, $httpProvider) {
    
    $locationProvider.html5Mode(true); // Assume HTML5 compliant browser that has History API support.
    $httpProvider.interceptors.push('intercept'); // Add the interceptor to the $httpProvider.
    //$httpProvider.defaults.withCredentials = true; // maybe we'll need this later
    
    // ROUTES /////////////////////////////////////////////////////////////////
    $routeProvider
    .when(baseUrl, { // BASE ROUTE
      templateUrl: baseUrl + "partials/about.html",
    })
    .when(baseUrl + ":page", {
      templateUrl: function(params){
        return baseUrl + "partials/"+params.page+".html";
      }
    })
    .otherwise({redirectTo: baseUrl});
    
  }); // end .config()
  
  butcher.run(function($routeParams, $route, $rootScope, $http, $location, $timeout, $log) {
    
    // set up a few globals
    $rootScope.baseUrl = baseUrl;
    $rootScope.restUrl = restUrl;
    $rootScope.alerts = []; // see ./factories/intercept.js
    
    $http.defaults.headers.get  = {
      'Content-Type': 'application/json'
    };
    
    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
      $location.replace().path($rootScope.baseUrl);
    });
    
    $rootScope.$on("$routeChangeStart", function(event, current, previous, rejection) {
      $rootScope.alerts = [];
    });
    
  });

}(window.angular));
