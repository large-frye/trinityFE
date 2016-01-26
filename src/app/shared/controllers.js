/**
 * Created by frye on 9/21/15.
 */
(function () {
  'use strict';

  var app = angular.module('shared.controllers', [])

    .controller('toolBarCtrl', ['$scope',
      function ($scope) {

        $scope.items = [{
          "name": "Inspections",
          "children": [{
            "name": "Overview & Stats",
          }, {
            "name": "New Inspection"
          }, {
            "name": "Reports"
          }]
        }, {
          "name": "Reports"
        }, {
          "name": "Calendars"
        }, {
          "name": "Maps"
        }, {
          "name": "Resources",
          "children": [
            {
              "name": "Resources",
            }, {
              "name": "Training Material",

            }, {
              "name": "Training Videos"
            }
          ]
        }]
      }])

    .controller('sideBarCtrl', ['$scope', 'trinityFactory', '$location',
      function ($scope, trinityFactory, $location) {
        $scope.$on('$routeChangeSuccess', function (event, current, previous) {
          setTimeout(function () {
            $scope.sidebar = trinityFactory.sidebar;
            $scope.$apply();
          }, 1);
        });
      }]);
})();
