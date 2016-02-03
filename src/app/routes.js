/**
 * Created by frye on 9/23/15.
 */
(function () {
    var app = angular.module('routes', [])

    app.config(
        ['$routeProvider',
            function ($routeProvider) {
                var resolver = {
                    daily: ["$route", "$q", "workOrderService", "trinityFactory", function ($route, $q, workOrderService, trinityFactory) {
                        var deferred = $q.defer();
                        workOrderService.daily({
                            "param1": "day",
                            "param2": $route.current.params.type,
                            "param3": $route.current.params.interval,
                            "param4": "0",
                            "param5": $route.current.params.id
                        }, function (data) {
                            trinityFactory.sidebar = true;
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
                })

                .when('/admin/workorders', {
                    templateUrl: 'app/workOrders/partials/list.html',
                    controller: 'listCtrl'
                })

                .when("/admin/workorders/daily/:type/:id/:interval", {
                    templateUrl: "/app/workOrders/partials/daily/basic.html",
                    controller: "dateCtrl",
                    resolve: resolver
                })

                .when('/', {
                    templateUrl: '/src/app/account/partials/home.html',
                    controller: 'homeCtrl'
                })

                .when('/account', {
                    templateUrl: '/src/app/workOrders/partials/counts.html',
                    controller: 'countsCtrl'
                })

                .when('/account/workorders/:time', {
                    templateUrl: '/src/app/workOrders/partials/list.html',
                    controller: 'listCtrl'
                })

                    .when('/sign-in', {
                        templateUrl: '/src/app/account/partials/login.html',
                        controller: 'loginCtrl'
                    })

                    .when('/sign-out', {
                        templateUrl: '/src/app/account/partials/login.html',
                        controller: 'loginCtrl'
                    })

                .otherwise({ redirectTo: '/' });
            }]
    )

    app.config(
        ["$httpProvider",
            function ($httpProvider) {
                $httpProvider.interceptors.push(["$q",
                    function ($q) {
                        return {
                            request: function (request) {
                                if (localStorage.getItem('token')) {
                                    request.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
                                }
                                return request;
                            }
                        }
                    }])
            }]
    )
})();
