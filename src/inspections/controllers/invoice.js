/* global angular */

(function() {
'use strict';

    angular
        .module('trinity.controllers.inspections.admin.invoice', [])
        .controller('adminInspectionInvoiceCtrl', InvoiceController);

    InvoiceController.$inject = ['shared', '$routeParams'];
    function InvoiceController(shared, $routeParams) {
        var vm = this;
        vm.options = shared.getInspectionSideBar($routeParams.id);

        activate();

        ////////////////

        function activate() { }
    }
})();