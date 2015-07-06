(function(angular, d3){
  'use strict';
  
  angular.module('butcher').controller("Nvd3jsStatsCtrl", function($scope, $routeParams, $log) {
    $log.log("Nvd3jsStatsCtrl is running.");
    
    // https://raw.githubusercontent.com/krispo/angular-nvd3/gh-pages/js/lineChart.js
    $scope.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 130,
          left: 80
        },
        x: function(d) {
          return d[0];
        },
        y: function(d) {
          return d[1];
        },
        useInteractiveGuideline: true,
        dispatch: {
          stateChange: function(e) {
            console.log("stateChange");
          },
          changeState: function(e) {
            console.log("changeState");
          },
          tooltipShow: function(e) {
            console.log("tooltipShow");
          },
          tooltipHide: function(e) {
            console.log("tooltipHide");
          }
        },
        xAxis: {
          axisLabel: 'X AXIS VALUE'
        },
        yAxis: {
          axisLabel: 'Y AXIS VALUE',
          tickFormat: function(d) {
            return d3.format('.02f')(d);
          },
          axisLabelDistance: 10
        },
        callback: function(chart) {
          console.log("!!! lineChart callback !!!");
        }
      },
      title: {
        enable: false,
        text: 'sample chart title'
      },
      subtitle: {
        enable: false,
        text: 'sample subtitle',
        css: {
          'text-align': 'center',
          'margin': '10px 13px 0px 7px'
        }
      },
      caption: {
        enable: false,
        html: 'some html',
        css: {
          'text-align': 'justify',
          'margin': '10px 13px 0px 7px'
        }
      }
    };
    
    
    
    
    $scope.exampleData = [
      {
        "key": "Participating",
        "color": "#ff7f0e",
        "values" : [[1, 21], [2, 32], [3, 23], [4, 56], [5, 75], [6, 123], [7, 110], [8, 93], [9, 75]]
      },
      {
        "key": "Viewing",
        "color": "#5787b7",
        "values" : [[1, 31], [2, 42], [3, 27], [4, 87], [5, 127], [6, 134], [7, 127], [8, 127], [9, 90]]
      }
    ];
    
  });
  
}(window.angular, window.d3));
