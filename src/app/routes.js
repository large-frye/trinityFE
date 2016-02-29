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

                var inspectionResolver = {
                    inspection: ['$q', 'InspectionService', '$route', '$routeParams',
                    function($q, InspectionService, $route, $routeParams) {
                        var deferred = $q.defer();
                        var id = $route.current.params.id;

                        if (id) {
                            InspectionService.get({
                                id: id
                            }).$promise.then(function(data) {
                                data.order.date_received = new Date(data.order.date_received);
                                data.order.date_of_inspection = new Date(data.order.date_of_inspection);
                                data.order.date_of_loss = new Date(data.order.date_of_loss);
                                data.order.date_of_last_contact = new Date(data.order.date_of_last_contact);
                                deferred.resolve(data);
                            }, function(err) {
                                deferred.resolve(err);
                            });
                        } else {
                            deferred.resolve({
                                auto_upgrade: false,
                                has_tarp: false,
                                estimate_requested: false
                            });
                        }

                        return deferred.promise;
                    }]
                };

                var report = {
                    report: ['$q', '$route', '$routeParams', 'reportService',
                        function($q, $route, $routeParams, reportService) {
                            var deferred = $q.defer();
                            var filter = $route.current.params.filter;

                            if (filter) {
                                reportService.byStatus({
                                    sub: filter
                                }).$promise.then(function(data) {
                                    deferred.resolve(data);
                                }, function(err) {
                                    deferred.resolve(err);
                                });
                            } else {
                                reportService.get().$promise.then(function(data) {
                                    deferred.resolve(data);
                                }, function(err) {
                                    deferred.resolve(err);
                                });
                            }

                            return deferred.promise;
                        }]
                };

                var inspectionForm = {
                    form: ['$q', '$route', '$routeParams', 'InspectionService',
                        function($q, $route, $routeParams, InspectionService) {
                            var deferred = $q.defer();
                            InspectionService.inspectionForm({
                                id: $route.current.params.id
                            }).$promise.then(function(data) {
                                if (data.inspection.length > 0) {
                                    deferred.resolve(data);
                                } else {
                                    deferred.resolve({});
                                }
                            }, function(err) {
                                deferred.resolve(err);
                            });

                            return deferred.promise;
                        }]
                };

                $routeProvider

                .when('/admin', {
                    templateUrl: '/src/app/workOrders/partials/counts.html',
                    controller: 'countsCtrl',
                    resolve: countsResolver
                })

                .when('/admin/workorders/:type/:timeUnit', {
                    templateUrl: '/src/app/workOrders/partials/list.html',
                    controller: 'listCtrl'
                })

                .when('/admin/inspections/new', {
                    templateUrl: '/src/app/inspections/partials/new.html',
                    controller: 'inspectionsCtrl',
                    resolve: inspectionResolver
                })

                .when('/admin/inspections/:id', {
                    templateUrl: '/src/app/inspections/partials/new.html',
                    controller: 'inspectionsCtrl',
                    resolve: inspectionResolver
                })

                .when('/admin/inspections/processing/:id', {
                    templateUrl: '/src/app/inspections/partials/processing.html',
                    controller: 'processingCtrl',
                    resolve: inspectionResolver
                })

                .when('/admin/inspections/form/:id', {
                    templateUrl: '/src/app/inspections/partials/form.html',
                    controller: 'formCtrl',
                    resolve: inspectionForm
                })

                .when('/admin/reports', {
                    templateUrl: '/src/app/reports/partials/list.html',
                    controller: 'reportCtrl',
                    resolve: report
                })

                .when('/admin/reports/:filter', {
                    templateUrl: '/src/app/reports/partials/list.html',
                    controller: 'reportCtrl',
                    resolve: report
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
