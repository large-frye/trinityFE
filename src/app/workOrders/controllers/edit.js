/**
 * Created by frye on 9/21/15.
 */
/**
 * Created by frye on 9/19/15.
 */
(function () {
  var listWorkOrders = angular.module('trinity.workOrders.editCtrl', [])

    .controller('editCtrl', ['$scope', 'workOrderService', '$routeParams', 'trinityFactory',
      function ($scope, workOrderService, $routeParams, trinityFactory) {

        trinityFactory.sidebar = true;

        console.log(trinityFactory);

        $scope.helloWorld = 'Hello World!';

        workOrderService.all({
          "param1": 0,
          "param2": 2
        }, function (resp) {
          console.log(resp);
          $scope.workOrders = resp;
        }, function (error) {
          console.log(error);
        });

        // Find a work order
        workOrderService.get({
          "param1": $routeParams.id
        }, function (resp) {
          $scope.workOrder = resp;
        }, function (error) {
          console.log(error);
        })
      }
    ])
})();

