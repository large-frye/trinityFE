/**
 * Created by frye on 9/23/15.
 */
(function () {
    var app = angular.module('routes', []);

    app.config(
        ['$routeProvider',
            function ($routeProvider) {

                var countsResolver = {
                    counts: ['$q', 'workOrderService', 'UserFactory', '$rootScope', '$location',
                        function($q, workOrderService, UserFactory, $rootScope, $location) {
                            var deferred = $q.defer();

                            // Pre-loading direct-chat-contacts-open
                            $rootScope.$broadcast('PRELOAD_COUNTS');

                            workOrderService.counts(function(data) {
                                UserFactory.user.set(angular.fromJson(localStorage.getItem('user')));
                                deferred.resolve(data);
                            }, function(err) {
                                UserFactory.user.clear();
                                $rootScope.$broadcast('LOGOUT');
                                $location.path('/sign-in');
                                deferred.resolve(err);
                            });

                            return deferred.promise;
                        }
                    ]
                };

                $routeProvider

                .when('/account', {
                    templateUrl: '/src/app/workOrders/partials/counts.html',
                    controller: 'countsCtrl',
                    resolve: countsResolver
                })

                .when('/account/workorders/:type/:timeUnit', {
                    templateUrl: '/src/app/workOrders/partials/list.html',
                    controller: 'listCtrl'
                })

                .when('/account/inspections/new', {
                    templateUrl: '/src/app/inspections/partials/new.html',
                    controller: 'inspectionsCtrl'
                })

                .when('/sign-in', {
                    templateUrl: '/src/app/account/partials/login.html',
                    controller: 'loginCtrl'
                })

                .when('/sign-out', {
                    templateUrl: '/src/app/account/partials/login.html',
                    controller: 'loginCtrl'
                })

                .otherwise({ redirectTo: '/account' });
            }]
    );

    app.config(
        ["$httpProvider",
            function ($httpProvider) {
                $httpProvider.interceptors.push(['$q', '$location',
                    function ($q, $location) {
                        return {
                            request: function (request) {
                                if (localStorage.getItem('token')) {
                                    request.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
                                }

                                return request;
                            },
                            responseError: function (rejection) {
                                if (rejection.status === 401) {
                                    $location.path('/sign-in');
                                }

                                return $q.reject(rejection);
                            }
                        };
                    }]);
            }]
    );
})();
