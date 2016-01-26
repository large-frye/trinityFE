(function() {
    angular.module("trinity.workOrders.dateCtrl", [])

        .controller("dateCtrl", ["$scope", "workOrderService", "daily", "$route", "trinityFactory",
            function($scope, workOrderService, daily, $route, trinityFactory) {

                $scope.workorders = daily;

                // Current daily type (0 = today, 1 = tomorrow, -1 = yesterday)
                $scope.types = ["basic", "expert", "total"];
                $scope.daily = [{
                    id: "0",
                    name: "today"
                }, {
                    id: "1",
                    name: "tomorrow"
                }, {
                    id: "-1",
                    name: "yesterday"
                }];
                $scope.type = $scope.types.filter(function(item) {
                    return item === $route.current.params.type;
                })[0];
                $scope.daily = $scope.daily.filter(function(item) {
                    return item.id === $route.current.params.interval;
                })[0];

                // Add extra to start counter at 1.
                // TODO: Turn this in db call.
                $scope.statuses = ["", "New", "Called PH", "Alert", "Scheduled", "Sent", "Invoiced"];
            }
        ])
})();