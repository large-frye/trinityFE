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
                        function ($q, workOrderService, UserFactory, $rootScope, $location) {
                            var deferred = $q.defer();

                            showSidebar();

                            // Pre-loading direct-chat-contacts-open
                            $rootScope.$broadcast('PRELOAD_COUNTS');

                            workOrderService.counts(function (data) {
                                UserFactory.user.set(angular.fromJson(localStorage.getItem('user')));
                                deferred.resolve(data);
                            }, function (err) {
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
                    inspection: ['$q', 'InspectionService', '$route', '$routeParams', '$location', '$window',
                        function ($q, InspectionService, $route, $routeParams, $location, $window) {
                            var deferred = $q.defer();
                            var id = $route.current.params.id;

                            showSidebar();

                            if (id) {
                                InspectionService.get({
                                    id: id
                                }).$promise.then(function (data) {
                                    workorderView($location);
                                    // data.order.date_of_inspection = new Date(parseInt(data.order.date_of_inspection));
                                    // data.order.date_received = new Date(data.order.date_received);
                                    // data.order.date_of_inspection = new Date(data.order.date_of_inspection);
                                    // data.order.date_of_loss = new Date(data.order.date_of_loss);
                                    // data.order.date_of_last_contact = new Date(data.order.date_of_last_contact);
                                    document.title = 'Trinity - (' + data.order.first_name + ' ' + data.order.last_name + ')';
                                    deferred.resolve(data);
                                }, function (err) {
                                    deferred.resolve(err);
                                });
                            } else {
                                deferred.resolve({
                                    order: {
                                        auto_upgrade: 'unknown',
                                        has_tarp: 'unknown',
                                        estimate_requested: 'unknown',
                                        is_reinspection: 'unknown',
                                        trinity_reinspection: 'unknown',
                                        install_tarp: 'unknown',
                                        scope_interior: 'unknown',
                                        adjuster_present: 'unknown'
                                    }
                                });
                            }

                            return deferred.promise;
                        }]
                };
                var report = {
                    report: ['$q', '$route', '$routeParams', 'reportService',
                        function ($q, $route, $routeParams, reportService) {
                            var deferred = $q.defer();
                            var filter = $route.current.params.filter;
                            var type = $route.current.params.type;

                            showSidebar();

                            if (filter && type) {
                                reportService.byStatus({
                                    sub: filter,
                                    sub2: type
                                }).$promise.then(function (data) {
                                    deferred.resolve(data);
                                }, function (err) {
                                    deferred.resolve(err);
                                });
                            } else if (filter) {
                                reportService.byStatus({
                                    sub: filter,
                                    sub2: 'all'
                                }).$promise.then(function (data) {
                                    deferred.resolve(data);
                                }, function (err) {
                                    deferred.resolve(err);
                                });
                            } else {
                                reportService.get().$promise.then(function (data) {
                                    deferred.resolve(data);
                                }, function (err) {
                                    deferred.resolve(err);
                                });
                            }

                            return deferred.promise;
                        }]
                };
                var inspectionForm = {
                    form: ['$q', '$route', '$routeParams', 'InspectionService', '$location',
                        function ($q, $route, $routeParams, InspectionService, $location) {
                            var deferred = $q.defer();

                            showSidebar();

                            InspectionService.inspectionForm({
                                id: $route.current.params.id
                            }).$promise.then(function (data) {
                                workorderView($location);
                                if (data.inspection.length > 0) {
                                    deferred.resolve(data);
                                } else {
                                    deferred.resolve({});
                                }
                            }, function (err) {
                                deferred.resolve(err);
                            });

                            return deferred.promise;
                        }]
                };
                var billing = { billingData: ['$q', '$route', '$routeParams', 'UserFactory', BillingResolve] };
                var generate = { generateData: ['$q', '$route', '$routeParams', 'UserFactory', 'InspectionService', GenerateResolve] };
                var photo = { photos: ['$q', '$route', '$routeParams', 'UserFactory', 'PhotoService', '$log', '$location', PhotosResolve] };
                var invoice = { invoiceData: ['$q', '$route', '$routeParams', 'UserFactory', InvoiceResolve] };
                var settings = {
                    photos: { settingsData: ['$q', '$route', '$routeParams', 'UserFactory', 'PhotoService', '$log', PhotoSettingsResolve] }
                };
                var inspector = {
                    home: {
                        items: ['$q', '$route', '$routeParams', 'workOrderService', 'UserFactory',
                            function ($q, $route, $routeParams, workOrderService, UserFactory) {
                                var deferred = $q.defer();
                                var user = UserFactory.user.get();

                                hideSidebar();

                                workOrderService.inspectorDaily({
                                    param1: user.id
                                }, function (d) {
                                    for (var opt in d.orders) {
                                        for (var o in d.orders[opt]) {
                                            for (var k in d.orders[opt][o]) {
                                                var order = d.orders[opt][o];
                                                order.date_of_inspection = new Date(order.date_of_inspection);
                                            }
                                        }
                                    }
                                    deferred.resolve(d);
                                }, function (e) {
                                    console.log(e);
                                    deferred.reject({ error: 'data failed to load' });
                                });

                                return deferred.promise;
                            }
                        ]
                    },
                    orders: {
                        items: ['$q', '$route', '$routeParams', 'UserFactory',
                            function ($q, $route, $routeParams, UserFactory) {
                                var deferred = $q.defer();
                                var user = UserFactory.user.get();
                                deferred.resolve(user);
                                showSidebar();
                                return deferred.promise;
                                // InspectorService.workorders({
                                //
                                // })
                            }
                        ]
                    },
                    reports: {
                        items: ['$q', '$route', '$routeParams', 'inspectorReportService', 'UserFactory',
                            function ($q, $route, $routeParams, inspectorReportService, UserFactory) {
                                var deferred = $q.defer();
                                var filter = $route.current.params.status;

                                if (!filter) {
                                    filter = 'all';
                                }

                                showSidebar();

                                inspectorReportService.get({
                                    action: filter,
                                    sub: UserFactory.user.get().id
                                }).$promise.then(function (data) {
                                    deferred.resolve(data);
                                }, function (err) {
                                    deferred.reject(err);
                                });

                                return deferred.promise;
                            }]
                    },
                    inspections: {
                        inspection: ['$q', '$route', 'inspectorInspectionService', 'UserFactory', '$log',
                            function ($q, $route, inspectorInspectionService, UserFactory, $log) {
                                var deferred = $q.defer();
                                var id = $route.current.params.id;

                                if (id) {
                                    inspectorInspectionService.get({
                                        userId: UserFactory.user.get().id,
                                        id: id
                                    }, function (data) {
                                        if (data.order.length) {
                                            deferred.resolve(data.order[0]);
                                        }
                                    }, function (err) {
                                        $log.error(err);
                                    });

                                    showSidebar();

                                } else {
                                    deferred.resolve({
                                        auto_upgrade: false,
                                        has_tarp: false,
                                        estimate_requested: false
                                    });

                                    hideSidebar();
                                }

                                return deferred.promise;
                            }]
                    }
                };

                var resources = { resourceData: ['$q', '$route', '$routeParams', 'UserFactory', 'ResourceService', '$log', 'RESOURCE_TYPES', ResourceResolve] };
                var training = {
                    content: { contentData: ['$q', '$route', '$routeParams', 'UserFactory', 'ResourceService', '$log', 'RESOURCE_TYPES', TrainingResolve] },
                    videos: { videoData: ['$q', '$route', '$routeParams', 'UserFactory', 'ResourceService', '$log', 'RESOURCE_TYPES', TrainingVideoResolve] },
                    officeVideos: { officeVideoData: ['$q', '$route', '$routeParams', 'UserFactory', TrainingVideoResolve] }
                };
                var profile = { userData: ['$q', '$route', '$routeParams', 'UserFactory', '$log', ProfileResolve] };
                var users = { userData: ['$q', '$route', '$routeParams', 'UserFactory', '$log', 'accountService', UsersResolve] };
                var userResolve = { user: ['$q', '$route', '$routeParams', 'UserFactory', '$log', 'accountService', UserResolve] };

                function PhotosResolve($q, $route, $routeParams, UserFactory, PhotoService, $log, $location) {
                    var defer = $q.defer();
                    var user = UserFactory.user.get();
                    showSidebar();

                    PhotoService.api().getPhotos({
                        type: 'shared',
                        route: 'photos',
                        action: $route.current.params.id
                    }, function (data) {
                        defer.resolve({
                            photos: data
                        });
                        workorderView($location);
                    }, function (err) {
                        $log.error(err);
                    });

                    return defer.promise;
                }

                /**
                 *
                 * @param $q
                 * @param $route
                 * @param $routeParams
                 * @param UserFactory
                 * @constructor
                 */
                function BillingResolve($q, $route, $routeParams, UserFactory) {
                    var defer = $q.defer();
                    var user = UserFactory.user.get();
                    hideSidebar();

                    defer.resolve({
                        id: 123
                    });
                    return defer.promise;
                }

                /**
                 *
                 * @param $q
                 * @param $route
                 * @param $routeParams
                 * @param UserFactory
                 * @constructor
                 */
                function GenerateResolve($q, $route, $routeParams, UserFactory, InspectionService) {
                    var defer = $q.defer();
                    var user = UserFactory.user.get();
                    var id = $route.current.params.id;

                    showSidebar();

                    defer.resolve({});
                    
                    return defer.promise;
                }

                /**
                 *
                 * @param $q
                 * @param $route
                 * @param $routeParams
                 * @param UserFactory
                 * @constructor
                 */
                function InvoiceResolve($q, $route, $routeParams, UserFactory) {
                    var defer = $q.defer();
                    var user = UserFactory.user.get();
                    showSidebar();

                    defer.resolve({
                        id: $route
                    });
                    return defer.promise;
                }

                /**
                 * Resolves photo settings for an admin.
                 * @param $q
                 * @param $route
                 * @param $routeParams
                 * @param UserFactory
                 * @param PhotoService
                 * @param $log
                 * @constructor
                 */
                function PhotoSettingsResolve($q, $route, $routeParams, UserFactory, PhotoService, $log) {
                    var defer = $q.defer();
                    var user = UserFactory.user.get();
                    hideSidebar();

                    PhotoService.api().getParentCategories({
                        id: -1
                    }, function (data) {
                        defer.resolve(data);
                    }, function (err) {
                        $log.error(err);
                    });

                    return defer.promise;
                }

                /**
                 * Resolves resource content for an admin.
                 * @param $q
                 * @param $route
                 * @param $routeParams
                 * @param UserFactory
                 * @constructor
                 */
                function ResourceResolve($q, $route, $routeParams, UserFactory, ResourceService, $log, RESOURCE_TYPES) {
                    var defer = $q.defer();
                    var user = UserFactory.user.get();
                    hideSidebar();

                    var types = [RESOURCE_TYPES.RESOURCE, RESOURCE_TYPES.OTHER];

                    ResourceService.api().getResources({
                        types: types
                    }, function (data) {
                        defer.resolve(data);
                    }, function (err) {
                        $log.error(err);
                    });

                    return defer.promise;
                }

                /**
                 * Resolves training content for an admin.
                 * @param $q
                 * @param $route
                 * @param $routeParams
                 * @param UserFactory
                 * @constructor
                 */
                function TrainingResolve($q, $route, $routeParams, UserFactory, ResourceService, $log, RESOURCE_TYPES) {
                    var defer = $q.defer();
                    var user = UserFactory.user.get();
                    hideSidebar();

                    var types = [RESOURCE_TYPES.TRAINING_MATERIAL];

                    ResourceService.api().getResources({
                        types: types
                    }, function (data) {
                        defer.resolve(data);
                    }, function (err) {
                        $log.error(err);
                    });

                    return defer.promise;
                }

                /**
                 * Resolves video content for an admin.
                 * @param $q
                 * @param $route
                 * @param $routeParams
                 * @param UserFactory
                 * @constructor
                 */
                function TrainingVideoResolve($q, $route, $routeParams, UserFactory, ResourceService, $log, RESOURCE_TYPES) {
                    var defer = $q.defer();
                    var user = UserFactory.user.get();

                    var types = [RESOURCE_TYPES.TRAINING_VIDEO];

                    ResourceService.api().getResources({
                        types: types
                    }, function (data) {
                        hideSidebar();
                        defer.resolve(data);
                    }, function (err) {
                        $log.error(err);
                    });

                    return defer.promise;
                }

                function ProfileResolve($q, $route, $routeParams, UserFactory, $log) {
                    var defer = $q.defer();
                    var user = UserFactory.user.get();
                    hideSidebar();
                    defer.resolve(user);
                    return defer.promise;
                }

                function UsersResolve($q, $route, $routeParams, UserFactory, $log, accountService) {
                    var defer = $q.defer();
                    var user = UserFactory.user.get();

                    accountService.users(function (data) {
                        hideSidebar();
                        defer.resolve(data);
                    }, function (err) {
                        $log.error(err);
                    });

                    return defer.promise;
                }

                function UserResolve($q, $route, $routeParams, UserFactory, $log, accountService) {
                    var defer = $q.defer();
                    var user = UserFactory.user.get();
                    var id = $route.current.params.id;

                    if (id === 'new') {
                        defer.resolve({});
                        hideSidebar();
                    } else {
                        accountService.user({
                            id: $route.current.params.id
                        }, function (data) {
                            hideSidebar();
                            defer.resolve(data);
                        }, function (err) {
                            $log.error(err);
                        });
                    }

                    return defer.promise;
                }

                $routeProvider
                    .when('/admin', {
                        templateUrl: '/src/partials/account/admin.html',
                        controller: 'adminHomeCtrl',
                        resolve: countsResolver
                    })
                    .when('/inspector', {
                        templateUrl: '/src/partials/account/inspector.html',
                        controller: 'inspectorAccountCtrl',
                        controllerAs: 'vm',
                        resolve: inspector.home
                    })
                    .when('/inspector/reports', {
                        templateUrl: '/src/partials/reports/inspector/reports.html',
                        controller: 'inspectorReportCtrl',
                        controllerAs: 'vm',
                        resolve: inspector.reports
                    })
                    .when('/inspector/reports/:status', {
                        templateUrl: '/src/partials/reports/inspector/reports.html',
                        controller: 'inspectorReportCtrl',
                        controllerAs: 'vm',
                        resolve: inspector.reports
                    })
                    .when('/inspector/inspections/new', {
                        templateUrl: '/src/partials/inspections/inspector/edit.html',
                        controller: 'inspector.inspectionsCtrl',
                        controllerAs: 'vm',
                        resolve: inspector.inspections
                    })
                    .when('/inspector/inspections/:id', {
                        templateUrl: '/src/partials/inspections/inspector/details.html',
                        controller: 'inspector.formCtrl',
                        controllerAs: 'vm',
                        resolve: inspector.inspections
                    })

                    .when('/inspector/inspections/photos/:id', {
                        templateUrl: '/src/partials/inspections/photos.html',
                        controller: 'adminInspectionPhotoCtrl',
                        controllerAs: 'vm',
                        resolve: photo
                    })

                    .when('/inspector/resources', {
                        templateUrl: '/src/partials/resources/resources.html',
                        controller: 'resourceCtrl',
                        controllerAs: 'vm',
                        resolve: resources
                    })
                    .when('/inspector/resources/training-material', {
                        templateUrl: '/src/partials/resources/training.html',
                        controller: 'trainingCtrl',
                        controllerAs: 'vm',
                        resolve: training.content
                    })
                    .when('/inspector/resources/training-videos', {
                        templateUrl: '/src/partials/resources/training-videos.html',
                        controller: 'trainingVideoCtrl',
                        controllerAs: 'vm',
                        resolve: training.videos
                    })
                    .when('/inspector/resources/office-training-videos', {
                        templateUrl: '/src/partials/resources/office-training-videos.html',
                        controller: 'trainingVideoCtrl',
                        controllerAs: 'vm',
                        resolve: training.officeVideos
                    })

                    .when('/admin/billing', {
                        templateUrl: '/src/partials/billing/billing.html',
                        controller: 'billingCtrl',
                        controllerAs: 'vm',
                        resolve: billing
                    })
                    .when('/inspector/billing', {
                        templateUrl: '/src/partials/billing/billing.html',
                        controller: 'billingCtrl',
                        controllerAs: 'vm',
                        resolve: billing
                    })

                    // Admin routes
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
                        controller: 'adminProcessingCtrl',
                        controllerAs: 'vm',
                        resolve: inspectionResolver
                    })
                    .when('/admin/inspections/form/:id', {
                        templateUrl: '/src/partials/inspections/form.html',
                        controller: 'adminInspectionCtrl',
                        controllerAs: 'vm',
                        resolve: inspectionForm
                    })
                    .when('/admin/inspections/photos/:id', {
                        templateUrl: '/src/partials/inspections/photos.html',
                        controller: 'adminInspectionPhotoCtrl',
                        controllerAs: 'vm',
                        resolve: photo
                    })
                    .when('/admin/inspections/generate/:id', {
                        templateUrl: '/src/partials/inspections/generate.html',
                        controller: 'adminInspectionReportGenerateCtrl',
                        controllerAs: 'vm',
                        resolve: generate
                    })
                    .when('/admin/inspections/invoice/:id', {
                        templateUrl: '/src/partials/inspections/invoice.html',
                        controller: 'adminInspectionInvoiceCtrl',
                        controllerAs: 'vm',
                        resolve: invoice
                    })
                    .when('/admin/reports', {
                        templateUrl: '/src/partials/reports/list.html',
                        controller: 'adminReportCtrl',
                        controllerAs: 'vm',
                        resolve: report
                    })
                    .when('/admin/reports/:filter', {
                        templateUrl: '/src/partials/reports/list.html',
                        controller: 'adminReportCtrl',
                        controllerAs: 'vm',
                        resolve: report
                    })
                    .when('/admin/reports/:filter/:type', {
                        templateUrl: '/src/partials/reports/list.html',
                        controller: 'adminReportCtrl',
                        controllerAs: 'vm',
                        resolve: report
                    })
                    .when('/admin/settings/photos', {
                        templateUrl: '/src/partials/settings/photos.html',
                        controller: 'photoSettingsCtrl',
                        controllerAs: 'vm',
                        resolve: settings.photos
                    })
                    .when('/admin/resources', {
                        templateUrl: '/src/partials/resources/resources.html',
                        controller: 'resourceCtrl',
                        controllerAs: 'vm',
                        resolve: resources
                    })
                    .when('/admin/resources/training-material', {
                        templateUrl: '/src/partials/resources/training.html',
                        controller: 'trainingCtrl',
                        controllerAs: 'vm',
                        resolve: training.content
                    })
                    .when('/admin/resources/training-videos', {
                        templateUrl: '/src/partials/resources/training-videos.html',
                        controller: 'trainingVideoCtrl',
                        controllerAs: 'vm',
                        resolve: training.videos
                    })
                    .when('/admin/resources/office-training-videos', {
                        templateUrl: '/src/partials/resources/office-training-videos.html',
                        controller: 'trainingVideoCtrl',
                        controllerAs: 'vm',
                        resolve: training.officeVideos
                    })
                    .when('/admin/users', {
                        templateUrl: '/src/partials/account/users.html',
                        controller: 'usersCtrl',
                        controllerAs: 'vm',
                        resolve: users
                    })
                    .when('/admin/users/edit/:id', {
                        templateUrl: '/src/partials/account/users/edit.html',
                        controller: 'usersEditCtrl',
                        controllerAs: 'vm',
                        resolve: userResolve
                    })

                    // Account
                    .when('/account/profile', {
                        templateUrl: '/src/partials/account/profile.html',
                        controller: 'profileCtrl',
                        controllerAs: 'vm',
                        resolve: profile
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
        ['$httpProvider',
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
                                    $rootScope.$broadcast('LOGOUT');
                                }

                                return $q.reject(rejection);
                            }
                        };
                    }]);
            }]
    );

    function hideSidebar() {
        angular.element('.content-wrapper').addClass('no-sidebar');
    }

    function showSidebar() {
        var $el = angular.element('.content-wrapper');
        $el.removeClass('margin-left');
        $el.removeClass('no-margin-left');
        $el.removeClass('no-sidebar');
        $el.css({
            'margin-left': '230px'
        });
    }

    function workorderView($location) {
        var isWorkorderView = localStorage.getItem('workorderView');
        if (isWorkorderView) {
            $('.navbar').hide();
        }
    }
})();


