/**
 * Created by frye on 9/19/15.
 */
(function () {
    var listWorkOrders = angular.module('trinity.workOrders.listCtrl', [])


        .controller('listCtrl', ['$scope', 'workOrderService', '$routeParams', 'trinityFactory',
            function ($scope, workOrderService, $routeParams, trinityFactory) {

                trinityFactory.sidebar = false;

                workOrderService.all({
                    param1: 0,
                    param2: 15000
                }, function (orders) {
                    console.log(orders);
                }, function () {

                });

                workOrderService.counts().$promise.then(
                    function (resp) {
                        $scope.counts = resp;
                    }, function (error) {
                        window.console && console.log(error);
                    });


            }
        ])


})();
