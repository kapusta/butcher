(function(angular, d3, $) {
  /* jshint validthis: true */
  "use strict"; // ECMA5 strict mode
  
  angular.module('butcher').directive("bblGraph", ['$log', function($log){
    return {
      restrict: "A",
      replace: false,
      scope: {
        bblData: '='
      },
      link: function(scope, element, attrs) {
        
        var makeBubbles = function() {
          // Adapted from http://neuralengr.com/asifr/journals/journals_optogenetic.html
          
          function truncate(str, maxLength, suffix) {
            if(str.length > maxLength) {
              str = str.substring(0, maxLength + 1);
              str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
              str = str + suffix;
            }
            return str;
          }
          
          var margin = {top: 20, right: 200, bottom: 0, left: 20};
          var width = parseInt(attrs.bblWidth, 10);
          var height = parseInt(attrs.bblHeight, 10);
          var start_time = parseInt(attrs.bblStartTime, 10);
          var end_time = parseInt(attrs.bblEndTime, 10);
            
          var c = d3.scale.category10();
          
          var x = d3.scale.linear().range([0, width]).domain([start_time, end_time]);
            
          var xAxis = d3.svg.axis().scale(x).orient("top");
            
          var svg = d3
            .select(element[0])
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
          function mouseover() {
            var g = d3.select(this).node().parentNode;
            d3.select(g).selectAll("circle").style("display","none");
            d3.select(g).selectAll("text.value").style("display","block");
          }
          
          function mouseout() {
            var g = d3.select(this).node().parentNode;
            d3.select(g).selectAll("circle").style("display","block");
            d3.select(g).selectAll("text.value").style("display","none");
          }
          
          var xScale = d3.scale.linear()
            .domain([start_time, end_time])
            .range([0, width]);
            
          svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + 0 + ")").call(xAxis);
          
          $.each(scope.bblData, function(j, v) {
            
            var g = svg.append("g").attr("class","journal");
            
            var circles = g.selectAll("circle")
              .data(v['counts'])
              .enter()
              .append("circle");
              
            var text = g.selectAll("text")
              .data(v['counts'])
              .enter()
              .append("text");
              
            var rScale = d3.scale.linear()
              .domain([0, d3.max(v['counts'], function(d) { return d[1]; })])
              .range([2, 9]);
              
            circles
              .attr("cx", function(d, i) { return xScale(d[0]); })
              .attr("cy", j*20+20)
              .attr("r", function(d) { return rScale(d[1]); })
              .style("fill", function(d) { return c(j); });
              
            text
              .attr("y", j*20+25)
              .attr("x",function(d, i) { return xScale(d[0])-5; })
              .attr("class","value")
              .text(function(d){ return d[1]; })
              .style("fill", function(d) { return c(j); })
              .style("display","none");
              
            g.append("text")
              .attr("y", j*20+25)
              .attr("x",width+20)
              .attr("class","label")
              .text(truncate(v['name'],30,"..."))
              .style("fill", function(d) { return c(j); })
              .on("mouseover", mouseover)
              .on("mouseout", mouseout);
          });
          
          // /////////////////////////////////////////////////////////////
        };
        
        if (scope.bblData) {
          $log.log(scope.bblData);
          makeBubbles();
        } else {  // If the percentage value isn't here yet (because ajax)
          scope.$watch(
            function() {
              return scope.bblData;
            },
            function(new_val, old_val, scope) {
              if (new_val) {
                makeBubbles();
              }
            }
          );
        }
      }
    };
  }]);

}(window.angular, window.d3, window.jQuery));
