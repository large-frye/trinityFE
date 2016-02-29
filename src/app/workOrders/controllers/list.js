/**
 * Created by frye on 9/19/15.
 */
(function () {
    var listWorkOrders = angular.module('trinity.workOrders.listCtrl', [])

    .controller('countsCtrl', ['$scope', 'workOrderService', 'counts',
        function($scope, workOrderService, counts) {

            $scope.timeFilters = ['Today', 'Yesterday', 'Tomorrow', 'This Week',
            'Next Week', 'Last Week', 'This Month', 'Next Month', 'Last Month',
            'This Year', 'Last Year'];

            angular.element('.content-wrapper').addClass('no-margin-left');

            $scope.timeTypes = [{
                name: 'Ladder Assist',
                map: -1
            }, {
                name: 'Basic',
                map: 0
            }, {
                name: 'Expert'
            }, {
                name: 'Total Inspections'
            }, {
                name: 'New Orders'
            }, {
                name: 'Cancelled'
            }];

            $scope.basic = counts.basic[0];
            $scope.expert = counts.expert[0];

            // options
            $scope.options = [{
                parent: 'Inspections',
                children: [{
                    name: 'Overview & Stats', link: '/#/account'
                }, {
                    name: 'New Inspection', link: '/#/account/inspections/new'
                }],
                link: '/#/account'
            }];
        }
    ])
        .controller('listCtrl', ['$scope', 'workOrderService', '$routeParams', '$rootScope',
            function ($scope, workOrderService, $routeParams, $rootScope) {
                $scope.type = $routeParams.type.substring(0, 1).toUpperCase() + $routeParams.type.substring(1, $routeParams.type.length);
                $scope.timeUnit = $routeParams.timeUnit;

                workOrderService.listByTime({
                    param1: $routeParams.timeUnit,
                    param2: $routeParams.type
                }, function (data) {
                    $scope.orders = data.orders;
                    $rootScope.$broadcast('DATA LOADED');
                }, function (err) {
                    console.log("[ERROR]: %s",  err.message);
                });
            }
        ]);
})();
