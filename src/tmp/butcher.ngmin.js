(function (angular) {
  'use strict';
  var baseUrl = '/';
  var restUrl = 'http://nodejsisata.co:8080';
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
  var butcher = angular.module('butcher', [
      'ngRoute',
      'ui.bootstrap'
    ]);
  butcher.config([
    '$routeProvider',
    '$locationProvider',
    '$httpProvider',
    function ($routeProvider, $locationProvider, $httpProvider) {
      $locationProvider.html5Mode(true);
      $httpProvider.interceptors.push('intercept');
      $routeProvider.when(baseUrl, { templateUrl: baseUrl + 'partials/index.html' }).when(baseUrl + ':page', {
        templateUrl: function (params) {
          return baseUrl + 'partials/' + params.page + '.html';
        }
      }).otherwise({ redirectTo: baseUrl });
    }
  ]);
  butcher.run([
    '$routeParams',
    '$route',
    '$rootScope',
    '$http',
    '$location',
    '$timeout',
    '$log',
    function ($routeParams, $route, $rootScope, $http, $location, $timeout, $log) {
      $rootScope.baseUrl = baseUrl;
      $rootScope.restUrl = restUrl;
      $rootScope.alerts = [];
      $http.defaults.headers.get = { 'Content-Type': 'application/json' };
      $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        $location.replace().path($rootScope.baseUrl);
      });
      $rootScope.$on('$routeChangeStart', function (event, current, previous, rejection) {
        $rootScope.alerts = [];
      });
    }
  ]);
}(window.angular));(function (angular, document) {
  'use strict';
  angular.module('butcher').controller('AlertsCtrl', [
    '$scope',
    '$rootScope',
    '$log',
    function ($scope, $rootScope, $log) {
      $log.log('AlertsCtrl is running.');
      $scope.closeAlert = function (index) {
        $rootScope.alerts.splice(index, 1);
      };
      $scope.$watch(function () {
        return $rootScope.alerts;
      }, function () {
        $scope.alerts = $rootScope.alerts;
      });
    }
  ]);
}(window.angular, document));(function (angular, $, document) {
  'use strict';
  angular.module('butcher').controller('CoreStatsCtrl', [
    '$scope',
    '$log',
    '$timeout',
    'meat',
    function ($scope, $log, $timeout, meat) {
      $log.log('CoreStatsCtrl is running.');
      var pop_bar_data = function (data) {
        var inc_totals = [];
        var inc_uniques = [];
        var out_totals = [];
        var out_uniques = [];
        for (var i = 0; i < 24; i++) {
          if (data[i].topic === 'meatspace.incoming') {
            inc_totals.push(data[i].total);
            inc_uniques.push(data[i].uniques);
          }
          if (data[i].topic === 'meatspace.outgoing') {
            out_totals.push(data[i].total);
            out_uniques.push(data[i].uniques);
          }
        }
        $('#meatspace-incoming-total').peity('bar', {
          width: 200,
          height: 50
        }).text(inc_totals.join(',')).change();
        $('#meatspace-incoming-uniques').peity('bar', {
          width: 200,
          height: 50
        }).text(inc_uniques.join(',')).change();
        $('#meatspace-outgoing-total').peity('bar', {
          width: 200,
          height: 50
        }).text(out_totals.join(',')).change();
        $('#meatspace-outgoing-uniques').peity('bar', {
          width: 200,
          height: 50
        }).text(out_uniques.join(',')).change();
      };
      $scope.getMeat = function (refresh) {
        meat.get($scope.restUrl + '/stats', false, true, function (obj) {
          $scope.core_stats = obj.data;
          pop_bar_data(obj.data);
        });
      };
      $scope.getMeat();
    }
  ]);
}(window.angular, window.jQuery));(function (angular, document) {
  'use strict';
  angular.module('butcher').factory('intercept', [
    '$q',
    '$rootScope',
    '$log',
    function ($q, $rootScope, $log) {
      $log.log('intercept factory is running');
      var i = {};
      i.request = function (obj) {
        return obj || $q.when(obj);
      };
      i.requestError = function (obj) {
        return $q.reject(obj);
      };
      i.response = function (obj) {
        return obj || $q.when(obj);
      };
      i.responseError = function (obj) {
        var exists = false;
        var errors = angular.fromJson(obj.data);
        for (var i = 0; i < $rootScope.alerts.length; i++) {
          if ($rootScope.alerts[i].status === obj.status) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          $rootScope.alerts.push({
            'status': obj.status,
            'type': obj.status < 500 ? 'warning' : 'error',
            'msg': errors && errors.Errors ? errors.Errors : '',
            'url': obj.config.url ? obj.config.url : false,
            'count': 1
          });
        } else {
          $rootScope.alerts[i].count++;
        }
        $log.log('intercept factory caught an error: ' + obj.status);
        return $q.reject(obj);
      };
      return i;
    }
  ]);
}(window.angular, document));(function (angular, document) {
  'use strict';
  angular.module('butcher').factory('meat', [
    '$http',
    '$rootScope',
    '$log',
    function ($http, $rootScope, $log) {
      $log.log('meat factory is running');
      var meat = {};
      var timeout = 60000;
      meat.get = function (url, params, isArray, happy_meat, sad_meat) {
        return $http({
          'method': 'GET',
          'url': url,
          'params': params,
          'isArray': isArray,
          'timeout': timeout
        }).then(function (obj) {
          happy_meat(obj);
        }, function (obj) {
          if (sad_meat) {
            sad_meat(obj);
          }
        });
      };
      meat.read = meat.get;
      return meat;
    }
  ]);
}(window.angular, document));