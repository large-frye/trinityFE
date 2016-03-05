/**
 * Created by frye on 9/19/15.
 */
(function () {
  angular.module('trinity.workOrders.directives', [])

    .directive('subheader', [function () {
      return {
        "restrict": "E",
        "scope"   : {
          "name": "@"
        },
        "link"    : function (scope) {
        },
        "template": '<md-content md-theme="light-blue" layout="row"><section><md-subheader class="md-primary">{{name}}</md-subheader></section></md-content>'
      }
    }])

    .directive('chart', [function () {
      return {
        "restrict": "E",
        "scope"   : {
          "data" : "=",
          "index": "@"
        },
        "link"    : function ($scope, element) {
          $scope.message = 'Loading';

          var queueData = setInterval(function () {

            if ($scope.data) {
              clearInterval(queueData);
              $scope.message = '';
              initD3();
            }

            function initD3() {
              (function (d3) {
                var dataset = [
                  {label: 'This Week', count: $scope.data.thisWeek},
                  {label: 'Last Week', count: $scope.data.lastWeek},
                  {label: 'Next Week', count: $scope.data.nextWeek}
                ];

                var color = d3.scale.category20b();

                var width       = 300,
                    height      = 300,
                    outerRadius = 100,
                    radius      = Math.min(width, height) / 2;

                var arc = d3.svg.arc()
                  .outerRadius(radius - 10)
                  .innerRadius(radius - 70)

                var pie = d3.layout.pie()
                  .sort(null)
                  .value(function (d) {
                    return d.count
                  })

                var svg = d3.select("#chart_" + $scope.index).append("svg")
                  .attr("width", width)
                  .attr("height", height)
                  .append("g")
                  .attr("transform", "translate(" + 1.5 * outerRadius + "," + 1.5 * outerRadius + ")");

                svg.append("circle")
                  .attr("cx", 0)
                  .attr("cy", 0)
                  .attr("r", 100)
                  .attr("fill", "#fff");

                var g = svg.selectAll(".arc")
                  .data(pie(dataset))
                  .enter()
                  .append("g")
                  .attr("class", "arc")
                  .on('mouseover', function (d, i) {
                    console.log(d, i);
                  });

                g.append("path")
                  .attr("d", arc)
                  .style("fill", function (d, i) {
                    return color(i)
                  })

                g.append("text")
                  .attr("transform", function (d) {
                    var c = arc.centroid(d),
                        x = c[0],
                        y = c[1],
                        // pythagorean theorem for hypotenuse
                        h = Math.sqrt(x * x + y * y);
                    return "translate(" + (x / h * labelr) + ',' +
                      (y / h * labelr) + ")";
                  })
                  .attr("text-anchor", "middle") //center the text on it's origin
                  .style("fill", "Purple")
                  .style("font", "bold 12px Arial")
                  .text(function (d) {
                    return d.data.label + "(" + d.data.count + ")";
                  })

              })(window.d3)
            }
          }, 50);
        },
        "template": '<div id="chart_{{index}}"></div>{{message}}'
      }
    }])
})();
