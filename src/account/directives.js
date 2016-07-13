/* global angular */
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
        }])
        
        .directive('countRowData', [ function() {
            return {
                restrict: 'EA',
                scope: {
                    items: '=',
                    itemType: '@',
                    newType: '@',
                    cancelledType: '@',
                    colHeader: '@'
                },
                link: function($scope, elem, attrs) {
                    $scope.ladderAssist = $scope.items[0][$scope.itemType];
                    $scope.ladderAssistWithReport = $scope.items[1][$scope.itemType];
                    $scope.expert = $scope.items[2][$scope.itemType];
                    $scope.cancelled = getCancelled; 
                    $scope.newToday = newToday;
                    $scope.getTotal = getTotal;
                    
                    function newToday() {
                        return $scope.items[0][$scope.newType] +
                            $scope.items[1][$scope.newType] +
                            $scope.items[2][$scope.newType]; 
                    }
                    
                    function getTotal() {
                        return $scope.ladderAssist + $scope.ladderAssistWithReport + $scope.expert;
                    }

                    function getCancelled() {
                        return $scope.items[0][$scope.cancelledType] +
                            $scope.items[1][$scope.cancelledType] +
                            $scope.items[2][$scope.cancelledType]; 
                    }
                },
                templateUrl: 'src/partials/shared/count-listings.html'
            };
        }]);
})();
