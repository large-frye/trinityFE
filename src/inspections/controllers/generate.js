/* global angular */

(function() {
'use strict';

    angular
        .module('trinity.controllers.inspections.admin.generate', [])
        .controller('adminInspectionReportGenerateCtrl', GenerateController);

    GenerateController.$inject = ['shared', '$routeParams', 'InspectionService'];
    function GenerateController(shared, $routeParams, InspectionService) {
        var vm = this;
        vm.options = shared.getInspectionSideBar($routeParams.id);
        vm.generateReport = generateReport;
        vm.loading = false;
        
        activate();

        ////////////////

        function activate() { }

        function generateReport() {
            vm.loading = true;
            vm.loadingMessage = 'Creating report...';
            
            InspectionService.generate({
                id: $routeParams.id
            }, function(data) {
                vm.loading = false;
                var $a = document.createElement('a');
                $a.setAttribute('target', '_blank');
                $a.setAttribute('href', data.pdfUrl);
                $a.click();
            }, function(err) {
                console.error(err);
            });

            
        }
    }
})();