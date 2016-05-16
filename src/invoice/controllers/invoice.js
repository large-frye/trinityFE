/**
 * Created by andrewfrye on 5/11/16.
 */
(function() {
    angular.module('trinity.controllers.invoice', [])
        .controller('invoiceCtrl', InvoiceCtrl);

    InvoiceCtrl.$inject = ['invoice', 'UserService', '$log', 'InvoiceService'];

    function InvoiceCtrl(invoice, UserService, $log, InvoiceService) {
        var vm = this;
        vm.invoice = invoice;
        vm.getWeeklyInvoices = getWeeklyInvoices;
        vm.changeInspectorMiles = changeInspectorMiles;
        vm.changeAllInspectorMiles = changeAllInspectorMiles;
        vm.getInvoiceByInspector = getInvoiceByInspector;
        
        ////////
        
        activate();
        
        function activate() {
            getInspectors();
            getWeeks(); 
        }
        
        function getInspectors() {
            return UserService.inspectors().$promise.then(function(data) {
                vm.inspectors = data.inspectors;
                return vm.inspectors;
            }, function(err) {
                $log.error(err);
            });
        }
        
        function getWeeks() {
            return InvoiceService.api().getWeeks(function(data) {
                vm.weeks = data;
                var date = new Date();
                
                // set vm.week to current week
                vm.weeks.forEach(function(current) {
                    var month = parseInt(current.name.substring())
                    var begin = parseInt(current.name.substring(3, 5), 10);
                    var end = parseInt(current.name.substring(16, 18), 10);
                    
                    console.log(date.getDate());
                })
                
                
                return vm.weeks;
            }, function(err) {
                $log.error(err);
            })
        }

        function getWeeklyInvoices() {
            return [];
        }

        function changeInspectorMiles() {

        }

        function changeAllInspectorMiles() {

        }

        function getInvoiceByInspector() {
            console.log(vm.invoice);
        }
    }
}());