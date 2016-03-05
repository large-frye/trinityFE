/**
 * Created by andrewfrye on 1/20/16.
 */
(function() {
    angular.module('trinity.account.directives', [])

        .directive('login', ['accountService', function(accountService) {
            return {
                restrict: 'E',
                scope: {},
                link: function($scope, elem, attrs) {

                    $scope.signIn = function() {
                        accountService.authenticate($scope.user, function(response) {
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
                },
                templateUrl: 'src/app/account/partials/login.html'
            };
        }]);
})();
