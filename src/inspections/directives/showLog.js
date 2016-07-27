(function() {
    'use strict';

    angular
        .module('trinity.inspections.directives.showLog', [])
        .directive('showLog', ShowLog);

    ShowLog.$inject = [];
    function ShowLog() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: ShowLogCtrl,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                log: '='
            },
            template: '<strong>Updated by {{vm.log.updater.profile.first_name}} {{vm.log.updater.profile.last_name}} ' + 
            'on: {{vm.log.created_at}}</strong> <ul ng-if="vm.parts"><li ng-repeat="part in vm.parts" ng-bind-html="part"></li></ul></strong>'
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function ShowLogCtrl () {
        var vm = this;
        if (vm.log.message) {
            vm.parts = vm.log.message.split(';');
        }
    }
})();