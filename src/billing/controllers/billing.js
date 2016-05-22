/**
 * Created by andrewfrye on 5/11/16.
 */
(function () {
    angular.module('trinity.controllers.billing', [])
        .controller('billingCtrl', BillingCtrl);

    BillingCtrl.$inject = ['billingData', 'UserService', '$log', 'BillingService'];

    function BillingCtrl(billingData, UserService, $log, BillingService) {
        var vm = this;
        vm.billing = billingData;
        vm.mileage = vm.mileage || {
            total: 0,
            billableMileage: 0,
            billable: 0
        };
        vm.getWeeklyInspections = getWeeklyInspections;
        vm.changeInspectorMiles = changeInspectorMiles;
        vm.changeAllInspectorMiles = changeAllInspectorMiles;
        vm.getInspectionsByInspector = getInspectionsByInspector;
        vm.incTotal = incTotal;

        ////////

        activate();

        function activate() {
            getInspectors();
            getWeeks();
        }

        function getInspectors() {
            return UserService.inspectors().$promise.then(function (data) {
                vm.inspectors = data.inspectors;
                return vm.inspectors;
            }, function (err) {
                $log.error(err);
            });
        }

        function getWeeks() {
            return BillingService.api().getWeeks(function (data) {
                var current = {};
                vm.weeks = data;
                data.forEach(function (item) {
                    if (item.current) {
                        current = item;    
                    }
                });
                
                if (current) {
                    vm.week = current;
                    getWeeklyInspections();
                }
                
                return vm.weeks;
            }, function (err) {
                $log.error(err);
            });
        }

        function getWeeklyInspections() {
            return BillingService.api().getWeeklyInspections({
                param: vm.week.start.replace(/\//g, '-'),
                param2: vm.week.end.replace(/\//g, '-'),
                param3: vm.billing.inspector && vm.billing.inspector.id || null
            }, function (data) {
                vm.inspections = data.inspections;
            }, function (err) {
                $log.error(err);
            });
        }

        function changeInspectorMiles() {

        }
 
        function changeAllInspectorMiles() {

        }

        function getInspectionsByInspector(id) {
            return BillingService.api().getInspectionsByInspector({
                param: vm.week.start.replace(/\//g, '-'),
                param2: vm.week.end.replace(/\//g, '-'),
                param3: id
            }, function(data) {
                vm.inspections = data.inspections;
            }, function(err) {
                $log.error(err);
            });
        }
        
        function incTotal(inc) {
            vm.mileage.total = 0;
            var exclude = ['total', 'billableMileage', 'billable'];
            for (var key in vm.mileage) {
                if (vm.mileage.hasOwnProperty(key) && exclude.indexOf(key) === -1) {
                    vm.mileage.total += vm.mileage[key];
                }
            }
            
            setBillableMileage();
            setBillable();
        }
        
        function setBillableMileage() {
            vm.mileage.billableMileage = vm.mileage.total - (vm.inspections.length * 100);
        }
        
        function setBillable() {
            vm.mileage.billable = vm.mileage.billableMileage * .5;
        }
    }
} ());