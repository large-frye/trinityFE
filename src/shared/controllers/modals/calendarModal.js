(function() {
'use strict';

    angular
        .module('trinity.shared.controllers.modals.calendarModal', [])
        .controller('calendarCtrl', CalendarController);

    CalendarController.$inject = ['data', '$log', '$routeParams', 'UserFactory', '$scope'];
    function CalendarController(data, $log, $routeParams, UserFactory, $scope) {
        var vm = this;
        var user = UserFactory.user.get();
        vm.data = data;
        vm.close = close;
        
        activate();

        ////////////////

        function activate() { }

        function close() { $scope.$hide(); }
    }
})();