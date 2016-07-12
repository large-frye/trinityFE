(function () {
    'use strict';

    angular
        .module('trinity.shared.directives.progressBar', [])
        .directive('progressBar', ProgressBar);

    ProgressBar.$inject = [];
    function ProgressBar() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: ProgressBarController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                loading: '='
            },
            templateUrl: 'src/partials/shared/progress-bar.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function ProgressBarController() {
    }
})();