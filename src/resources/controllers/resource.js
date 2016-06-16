(function() {
    'use strict';

    angular
        .module('trinity.resources.controllers.resource', [])
        .controller('resourceCtrl', ResourceController);

    ResourceController.$inject = [];
    function ResourceController() {
        var vm = this;
        vm.add = add;
        
        activate();

        ////////////////

        function activate() { }

        function add() {
            console.log(vm);
        }

    }
})();