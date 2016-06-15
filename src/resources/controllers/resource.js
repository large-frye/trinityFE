(function() {
    'use strict';

    angular
        .module('trinity.resources.controllers.resource', [])
        .controller('resourceCtrl', ResourceController);

    ResourceController.$inject = [];
    function ResourceController() {
        var vm = this;


        activate();

        ////////////////

        function activate() { }
    }
})();