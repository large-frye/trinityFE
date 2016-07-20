/* global angular */

(function() {
'use strict';

    angular
        .module('trinity.controllers.inspections.admin.generate', [])
        .controller('adminInspectionReportGenerateCtrl', GenerateController);

    GenerateController.$inject = ['shared', '$routeParams', 'generateData'];
    function GenerateController(shared, $routeParams, generateData) {
        var vm = this;
        vm.options = shared.getInspectionSideBar($routeParams.id);
        vm.generateReport = generateReport;
        
        activate();

        ////////////////

        function activate() { }

        function generateReport() {
            var $a = document.createElement('a');
            $a.setAttribute('href', generateData.pdfUrl);
            $a.click();
        }
    }
})();