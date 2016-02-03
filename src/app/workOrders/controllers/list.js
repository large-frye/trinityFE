/**
 * Created by frye on 9/19/15.
 */
(function () {
    var listWorkOrders = angular.module('trinity.workOrders.listCtrl', [])

    .controller('countsCtrl', ['$scope', 'workOrderService',
        function($scope, workOrderService) {

            $scope.timeFilters = ['Today', 'Yesterday', 'Tomorrow', 'This Week',
            'Next Week', 'Last Week', 'This Month', 'Next Month', 'Last Month',
            'This Year', 'Last Year'];

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

            workOrderService.counts(function(counts) {
                $scope.basic = counts.basic[0];
                $scope.expert = counts.expert[0];
            }, function(err) {
                console.log('[ERROR]: %s', err.message);
            });
        }
    ])
        .controller('listCtrl', ['$scope', 'workOrderService', '$routeParams', 'trinityFactory',
            function ($scope, workOrderService, $routeParams, trinityFactory) {
                var timeDelimiter = $routeParams.time;

                workOrderService.listByTime({
                    param1: timeDelimiter
                }, function (orders) {
                    console.log(orders);
                }, function (err) {
                    console.log("[ERROR]: %s",  err.message);
                });
            }
        ])


})();
