/**
 * Created by andrewfrye on 1/19/16.
 */
(function() {
    angular.module('trinity.account.loginCtrl', [])

        .controller('loginCtrl', ['$scope', 'accountService', '$location', 'accountInfo', '$route',
            function($scope, accountService, $location, accountInfo, $route) {


                if ($route.current.$$route.originalPath === '/sign-out') {
                    localStorage.removeItem('token');
                    $location.path("/sign-in");
                }

                $scope.signIn = function() {
                    accountService.authenticate($scope.user, function(response) {
                        localStorage.setItem('token', response.token);
                        $location.path('/');
                        console.log("response %o", response);
                    }, function(err) {
                        console.log("error: %o", err);
                    });
                };


                $(function () {
                    $('input').iCheck({
                        checkboxClass: 'icheckbox_flat',
                        radioClass: 'iradio_flat',
                        increaseArea: '20%' // optional
                    });
                });
            }

        ])
})();