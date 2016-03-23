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
                                // data.order.date_of_inspection = new Date(data.order.date_of_inspection);
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

                var inspector = {
                    home: {
                        items: ['$q', '$route', '$routeParams', 'workOrderService', 'UserFactory',
                            function($q, $route, $routeParams, workOrderService, UserFactory) {
                                var deferred = $q.defer();
                                var user = UserFactory.user.get();

                                workOrderService.inspectorDaily({
                                    param1: user.id
                                }, function(d) {
                                    for(var opt in d.orders) {
                                        for (var o in d.orders[opt]) {
                                            for (var k in d.orders[opt][o]) {
                                                var order = d.orders[opt][o];
                                                order.date_of_inspection = new Date(order.date_of_inspection);
                                            }
                                        }
                                    }
                                    deferred.resolve(d);
                                }, function(e) {
                                    console.log(e);
                                    deferred.resolve(d);
                                });

                                return deferred.promise;
                            }
                        ]
                    },
                    orders: {
                        items: ['$q', '$route', '$routeParams', 'UserFactory',
                            function($q, $route, $routeParams, UserFactory) {
                                var deferred = $q.defer();
                                var user = UserFactory.user.get();
                                deferred.resolve(user);
                                return deferred.promise;
                                // InspectorService.workorders({
                                //
                                // })
                            }
                        ]
                    }
                };

                $routeProvider

                .when('/admin', {
                    templateUrl: '/src/partials/account/admin.html',
                    controller: 'adminHomeCtrl',
                    resolve: countsResolver
                })

                .when('/inspector', {
                    templateUrl: '/src/partials/account/inspector.html',
                    controller: 'inspectorHomeCtrl',
                    resolve: inspector.home
                })

                .when('/admin/workorders/:type/:timeUnit', {
                    templateUrl: '/src/partials/workorders/list.html',
                    controller: 'listCtrl'
                })

                .when('/admin/inspections/new', {
                    templateUrl: '/src/partials/inspections/new.html',
                    controller: 'inspectionsCtrl',
                    resolve: inspectionResolver
                })

                .when('/admin/inspections/:id', {
                    templateUrl: '/src/partials/inspections/new.html',
                    controller: 'inspectionsCtrl',
                    resolve: inspectionResolver
                })

                .when('/admin/inspections/processing/:id', {
                    templateUrl: '/src/partials/inspections/processing.html',
                    controller: 'processingCtrl',
                    resolve: inspectionResolver
                })

                .when('/admin/inspections/form/:id', {
                    templateUrl: '/src/partials/inspections/form.html',
                    controller: 'formCtrl',
                    resolve: inspectionForm
                })

                .when('/admin/reports', {
                    templateUrl: '/src/partials/reports/list.html',
                    controller: 'reportCtrl',
                    resolve: report
                })

                .when('/admin/reports/:filter', {
                    templateUrl: '/src/partials/reports/list.html',
                    controller: 'reportCtrl',
                    resolve: report
                })

                // Authentication

                .when('/sign-in', {
                    templateUrl: '/src/partials/account/login.html',
                    controller: 'loginCtrl'
                })

                .when('/sign-out', {
                    templateUrl: '/src/partials/account/login.html',
                    controller: 'loginCtrl'
                })

                .otherwise({ redirectTo: '/admin' });
            }]
    );

    app.config(
        ["$httpProvider",
            function ($httpProvider) {
                $httpProvider.interceptors.push(['$q', '$location', 'UserFactory', '$rootScope',
                    function ($q, $location, UserFactory, $rootScope) {
                        return {
                            request: function (request) {
                                if (localStorage.getItem('token')) {
                                    request.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
                                }

                                return request;
                            },
                            responseError: function (rejection) {
                                if (rejection.status === 401 || rejection.status === 400) {
                                    $location.path('/sign-in');
                                    UserFactory.user.clear();
                                    localStorage.removeItem('user');
                                }
                                $rootScope.$broadcast('LOGOUT');

                                return $q.reject(rejection);
                            }
                        };
                    }]);
            }]
    );
})();