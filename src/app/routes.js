/**
 * Created by frye on 9/23/15.
 */
(function () {
    var app = angular.module('routes', [])

    app.config(
        ['$routeProvider',
            function ($routeProvider) {
                var resolver = {
                    daily: ["$route", "$q", "workOrderService", function ($route, $q, workOrderService) {
                        var deferred = $q.defer();
                        workOrderService.daily({
                            "param1": "day",
                            "param2": $route.current.params.type,
                            "param3": $route.current.params.interval,
                            "param4": "0",
                            "param5": $route.current.params.id
                        }, function (data) {
                            deferred.resolve(data);
                        }, function (error) {
                            window.console && console.log(error);
                            deferred.resolve(error);
                        });

                        return deferred.promise;
                    }]
                };

                $routeProvider.when('/admin/workorders/edit/:id', {
                    templateUrl: 'app/workOrders/partials/edit.html',
                    controller: 'editCtrl'
                });

                $routeProvider.when('/admin/workorders', {
                    templateUrl: 'app/workOrders/partials/list.html',
                    controller: 'listCtrl'
                });

                $routeProvider.when("/admin/workorders/daily/:type/:id/:interval", {
                    templateUrl: "/app/workOrders/partials/daily/basic.html",
                    controller: "dateCtrl",
                    resolve: resolver
                });
            }]
    )

    app.config(
        ["$httpProvider",
            function ($httpProvider) {
                $httpProvider.interceptors.push(["$q",
                    function ($q) {
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
