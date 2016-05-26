/**
 * Created by andrewfrye on 5/11/16.
 */
(function () {
    angular.module('trinity.controllers.billing', [])
        .controller('billingCtrl', BillingCtrl);

    BillingCtrl.$inject = ['billingData', 'UserService', '$log', 'BillingService', '$window'
    , 'alert', 'UserFactory', '$interval'];

    function BillingCtrl(billingData, UserService, $log, BillingService, $window, alert
    , UserFactory, $interval) {
        var vm = this;
        var user = UserFactory.user.get();
        vm.billing = billingData;
        vm.mileage = vm.mileage || {
            total: 0,
            billable_mileage: 0,
            billable: 0
        };
        vm.getWeeklyInspections = getWeeklyInspections;
        vm.changeInspectorMiles = changeInspectorMiles;
        vm.changeAllInspectorMiles = changeAllInspectorMiles;
        vm.getInspectionsByInspector = getInspectionsByInspector;
        vm.incTotal = incTotal;
        vm.print = print;
        vm.lockMiles = lockMiles;
        vm.save = save;
        vm.getMileage = getMileage;
        vm.userRole = user.appRole;

        ////////

        activate();

        function activate() {
            getWeeks();
            
            if (vm.userRole !== 'inspector') {
                getInspectors();
            } else {
                vm.billing.inspector = user;
                
                // check lock
                checkLock();
                autoLockCheck();    
            }
        }
        
        function checkLock() {
            return BillingService.api().getInspectorLock({
                param2: user.id
            }, function(data) {
                vm.billing.inspector.profile.is_miles_locked = data.lockedState;  
            }, function(err) {
                $log.error(err);
            });
        }
        
        function autoLockCheck() {
            $interval(function() {
                checkLock();
            }, 60000);
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
                vm.meta = data.meta;
                getInspectionTotals();
                
                if (vm.billing.inspector) {
                    getMileage();
                }
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
                getInspectionTotals();
                getMileage();
            }, function(err) {
                $log.error(err);
            });
        }
        
        function incTotal(inc) {
            if (vm.mileage) {
                vm.mileage.total = 0;
            } else {
                vm.mileage = {
                    total: 0
                };
            }
            var exclude = ['total', 'billable_mileage', 'billable', 'inspector_id', 'week'
            , 'created_at', 'updated_at', 'id'];
            for (var key in vm.mileage) {
                if (vm.mileage.hasOwnProperty(key) && exclude.indexOf(key) === -1) {
                    vm.mileage.total += vm.mileage[key];
                }
            }
            
            setBillableMileage();
            setBillable();
        }
        
        function setBillableMileage() {
            vm.mileage.billable_mileage = 0;
            if (vm.mileage.total !== 0) {
                vm.mileage.billable_mileage = vm.mileage.total - (vm.inspections.length * 100);    
            }
        }
        
        function setBillable() {
            vm.mileage.billable = vm.mileage.billable_mileage * .5;
        }
        
        function getInspectionTotals() {
            vm.inspections.forEach(function(inspection) {
                inspection.chargeTotal = 0;
                var meta = vm.meta[inspection.id];
                if (typeof meta !== 'undefined') {
                    meta.forEach(function(item) {
                        inspection.chargeTotal += parseInt(item.value, 10); 
                    });
                }
            });
        }
        
        function print() {
            $window.print();
        }
        
        function lockMiles() {
            return BillingService.api().lock({
                param2: vm.billing.inspector.id
            }, function(data) {
                vm.billing.inspector.profile.is_miles_locked = data.lockedState;
            }, function(err) {
                $log.error(err);
            });
        }
        
        /**
         * 
         */
        function save() {
            vm.mileage.week = urlDecodeWeek();
            vm.mileage.inspector_id = vm.billing.inspector.id;
            BillingService.api().saveMileage(vm.mileage, function(data) {
                vm.mileage = data.mileage;
                incTotal();
                vm.alerts = alert.add({
                    title: 'Saved',
                    content: 'Saved',
                    type: 'success'
                }, 3000);
            }, function(err) {
                $log.error(err);
            });
        }
        
        /**
         * 
         */
        function getMileage() {
            // add this for tracking in mileage table
            vm.mileage.inspector_id = vm.billing.inspector.id;
            var url = BillingService.endpoint + '/shared/billing/mileage/' + vm.mileage.inspector_id + '/' + urlDecodeWeek();
            
            // get mileage for user and current week
            BillingService.getMileage(url).then(
                function(httpResponse) {
                    vm.mileage = httpResponse.data.mileage[0];
                    incTotal();
                }, function(err) {
                    $log.error(err);
                }
            );
        }
        
        function urlDecodeWeek() {
            return vm.week.name.replace(/\//g, '-').replace(/ /g, '');
        }
    }
} ());