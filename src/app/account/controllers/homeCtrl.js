/**
 * Created by andrewfrye on 1/19/16.
 */
(function() {
    angular.module('trinity.account.homeCtrl', [])

        .controller('homeCtrl', ['$scope', 'accountService', '$location',
            function($scope, accountService, $location) {

                accountService.workOrders({
                    id: 100,
                    id2: 200
                }, function(resp) {

                    console.log(resp);


                }, function(err) {
                    var errors = [401, 400];
                    console.log(err.status);
                    if (errors.indexOf(err.status) !== -1) {
                        $location.path('/sign-in');
                    }
                });
            }

        ])
})();
