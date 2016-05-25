/* global angular */

(function() {
'use strict';

    angular
        .module('trinity.controllers.inspections.admin.generate', [])
        .controller('adminInspectionReportGenerateCtrl', GenerateController);

    GenerateController.$inject = ['shared', '$routeParams'];
    function GenerateController(shared, $routeParams) {
        var vm = this;
        vm.options = shared.getInspectionSideBar($routeParams.id);
        
        activate();

        ////////////////

        function activate() { }
    }
})();