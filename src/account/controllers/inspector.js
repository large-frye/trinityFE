(function() {
'use strict';

    angular
        .module('trinity.account.controllers.inspector', [])
        .controller('inspectorAccountCtrl', InspectorAccountController);

    InspectorAccountController.$inject = ['items', '$location'];
    function InspectorAccountController(items, $location) {
        var vm = this;
        vm.items = items.orders;
        vm.openInspection = openInspection;

        activate();

        ////////////////

        function activate() { }
        
        function openInspection(id) {
            $location.path('/inspector/inspections/' + id);
        }
    }
})();