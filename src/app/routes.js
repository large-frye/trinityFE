/**
 * Created by frye on 9/23/15.
 */
(function () {
  var app = angular.module('routes', [])

  app.config(
    ['$routeProvider',
      function ($routeProvider) {
        $routeProvider.when('/admin/workorders/edit/:id', {
          templateUrl: 'app/workOrders/partials/edit.html',
          controller: 'editCtrl'
        })

        $routeProvider.when('/admin/workorders', {
          templateUrl: 'app/workOrders/partials/list.html',
          controller: 'listCtrl'
        })
      }]
  )

  app.config(
    ["$httpProvider",
    function ($httpProvider) {
        $httpProvider.interceptors.push(["$q",
        function($q) {
          return {
            request: function (request) {
              console.log(request);
              return request || $q.when(request);
            }
          }
        }])
    }]
  )
})()
