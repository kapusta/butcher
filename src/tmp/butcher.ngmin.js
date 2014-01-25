(function (angular) {
  'use strict';
  var baseUrl = '/';
  var restUrl = 'http://nodejsisata.co:8080';
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
  var butcher = angular.module('butcher', [
      'ngRoute',
      'ui.bootstrap',
      'dkCircles'
    ]);
  butcher.config([
    '$routeProvider',
    '$locationProvider',
    '$httpProvider',
    function ($routeProvider, $locationProvider, $httpProvider) {
      $locationProvider.html5Mode(true);
      $httpProvider.interceptors.push('intercept');
      $routeProvider.when(baseUrl, { templateUrl: baseUrl + 'partials/about.html' }).when(baseUrl + ':page', {
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
}(window.angular, window.jQuery));(function (angular, $) {
  'use strict';
  angular.module('butcher').controller('NavButtonsCtrl', [
    '$scope',
    '$routeParams',
    '$log',
    function ($scope, $routeParams, $log) {
      $log.log('NavButtonsCtrl is running.');
      $scope.$routeParams = $routeParams;
    }
  ]);
}(window.angular, window.jQuery));(function (angular, $) {
  'use strict';
  angular.module('butcher').controller('ParticipationStatsCtrl', [
    '$scope',
    '$routeParams',
    '$log',
    function ($scope, $routeParams, $log) {
      $log.log('ParticipationStatsCtrl is running.');
      $scope.int = {};
      $scope.int.posters = 82;
      $scope.int.lurkers = 147;
      $scope.int.pRate = ($scope.int.posters / ($scope.int.posters + $scope.int.lurkers) * 100).toFixed(2);
      $scope.bubbleData = [
        {
          'counts': [
            [
              0,
              6
            ],
            [
              1,
              70
            ],
            [
              2,
              111
            ],
            [
              3,
              203
            ],
            [
              4,
              230
            ],
            [
              5,
              180
            ],
            [
              6,
              103
            ],
            [
              7,
              140
            ],
            [
              8,
              130
            ],
            [
              9,
              203
            ],
            [
              10,
              193
            ],
            [
              11,
              123
            ],
            [
              12,
              100
            ]
          ],
          'name': 'international'
        },
        {
          'counts': [
            [
              5,
              1
            ],
            [
              7,
              3
            ],
            [
              8,
              4
            ],
            [
              9,
              17
            ],
            [
              0,
              10
            ]
          ],
          'name': 'french'
        },
        {
          'counts': [
            [
              1,
              1
            ],
            [
              3,
              2
            ],
            [
              5,
              8
            ],
            [
              7,
              13
            ],
            [
              10,
              11
            ]
          ],
          'name': 'spanish'
        }
      ];
    }
  ]);
}(window.angular, window.jQuery));(function (angular, d3, $) {
  'use strict';
  angular.module('butcher').directive('bblGraph', [
    '$log',
    function ($log) {
      return {
        restrict: 'A',
        replace: false,
        scope: { bblData: '=' },
        link: function (scope, element, attrs) {
          var makeBubbles = function () {
            function truncate(str, maxLength, suffix) {
              if (str.length > maxLength) {
                str = str.substring(0, maxLength + 1);
                str = str.substring(0, Math.min(str.length, str.lastIndexOf(' ')));
                str = str + suffix;
              }
              return str;
            }
            var margin = {
                top: 20,
                right: 200,
                bottom: 0,
                left: 20
              };
            var width = parseInt(attrs.bblWidth, 10);
            var height = parseInt(attrs.bblHeight, 10);
            var start_time = parseInt(attrs.bblStartTime, 10);
            var end_time = parseInt(attrs.bblEndTime, 10);
            var c = d3.scale.category10();
            var x = d3.scale.linear().range([
                0,
                width
              ]).domain([
                start_time,
                end_time
              ]);
            var xAxis = d3.svg.axis().scale(x).orient('top');
            var svg = d3.select(element[0]).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            function mouseover() {
              var g = d3.select(this).node().parentNode;
              d3.select(g).selectAll('circle').style('display', 'none');
              d3.select(g).selectAll('text.value').style('display', 'block');
            }
            function mouseout() {
              var g = d3.select(this).node().parentNode;
              d3.select(g).selectAll('circle').style('display', 'block');
              d3.select(g).selectAll('text.value').style('display', 'none');
            }
            var xScale = d3.scale.linear().domain([
                start_time,
                end_time
              ]).range([
                0,
                width
              ]);
            svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + 0 + ')').call(xAxis);
            $.each(scope.bblData, function (j, v) {
              var g = svg.append('g').attr('class', 'journal');
              var circles = g.selectAll('circle').data(v['counts']).enter().append('circle');
              var text = g.selectAll('text').data(v['counts']).enter().append('text');
              var rScale = d3.scale.linear().domain([
                  0,
                  d3.max(v['counts'], function (d) {
                    return d[1];
                  })
                ]).range([
                  2,
                  9
                ]);
              circles.attr('cx', function (d, i) {
                return xScale(d[0]);
              }).attr('cy', j * 20 + 20).attr('r', function (d) {
                return rScale(d[1]);
              }).style('fill', function (d) {
                return c(j);
              });
              text.attr('y', j * 20 + 25).attr('x', function (d, i) {
                return xScale(d[0]) - 5;
              }).attr('class', 'value').text(function (d) {
                return d[1];
              }).style('fill', function (d) {
                return c(j);
              }).style('display', 'none');
              g.append('text').attr('y', j * 20 + 25).attr('x', width + 20).attr('class', 'label').text(truncate(v['name'], 30, '...')).style('fill', function (d) {
                return c(j);
              }).on('mouseover', mouseover).on('mouseout', mouseout);
            });
          };
          if (scope.bblData) {
            $log.log(scope.bblData);
            makeBubbles();
          } else {
            scope.$watch(function () {
              return scope.bblData;
            }, function (new_val, old_val, scope) {
              if (new_val) {
                makeBubbles();
              }
            });
          }
        }
      };
    }
  ]);
}(window.angular, window.d3, window.jQuery));(function (angular, document) {
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