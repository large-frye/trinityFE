(function () {
    'use strict';

    angular
        .module('trinity.inspections.directives.deleteNotes', [])
        .directive('deleteNotes', DeleteNotes);

    DeleteNotes.$inject = [];
    function DeleteNotes() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: ControllerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                deleteNote: '='
            },
            template: '<ul><li ng-repeat="deleteNote in vm.deleteNotes">{{deleteNote}}</li></ul>'
        };
        return directive;

        function link(scope, element, attrs) { /* noop */ }
    }
    /* @ngInject */
    function ControllerController($scope) {
        var vm = this;
        $scope.$watch('vm.deleteNote', function (prev, next) {
            if (prev === true) {
                setTimeout(function() {
                    console.log(angular.element('.scroll-box .delete-note'));
                });
            }
                
        });
    }
})();