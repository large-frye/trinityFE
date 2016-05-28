/* global angular */

(function() {
    'use strict';

    angular
        .module('trinity.controllers.inspections.admin.form', [])
        .controller('adminInspectionCtrl', AdminInspectionController);

    AdminInspectionController.$inject = ['InspectionService', 'InspectionFactory', 'FormService', '$log', 'STATUSES', 'form', '$rootScope', '$modal',
    '$routeParams', 'shared', 'alert'];
    
    function AdminInspectionController(InspectionService, InspectionFactory, FormService, $log, STATUSES, form, $rootScope, $modal, $routeParams, shared, alert) {
        var vm = this;
        vm.options = shared.getInspectionSideBar($routeParams.id);
        vm.listRoofConditions = InspectionFactory.roofConditions;
        
        // functions
        vm.setBillingTypes = setBillingTypes;
        vm.getStatus = getStatus;
        vm.addCondition = addCondition;
        vm.conditionExists = conditionExists;
        vm.save = save;
        vm.initUpload = initUpload;
        vm.upload = upload;
        vm.showModal = showModal;
        vm.uploadFile = uploadFile;
        vm.showBillingModal = showBillingModal;
        
        activate();

        ////////////////

        function activate() { 
            getWorkorder(function() {
                getInspectionOutcomes();
                setForm();    
            });
        }
        
        function getWorkorder(cb) {
            return InspectionService.get(({
                id: $routeParams.id
            }), function(data) {
                data.order.date_received = new Date(data.order.date_received);
                data.order.date_of_inspection = new Date(data.order.date_of_inspection);
                data.order.date_of_loss = new Date(data.order.date_of_loss);
                data.order.date_of_last_contact = new Date(data.order.date_of_last_contact);
                vm.workorder = data.order;
                vm.workorderStatus = getStatus();
                vm.auto_upgrade = vm.workorder.auto_upgrade ? 'Yes' : 'No';
                if (cb) cb();
            }, function(err) {
                $log.error(err);
            });
        }
        
        function getInspectionOutcomes() {
            return InspectionService.inspectionOutcomes(function(data) {
                vm.outcomes = data;
                vm.inspectionOutcome = setInspectionOutcome();
                setBillingTypes();
            }, function(err) {
                $log.error(err);
            });
        }
        
        function setBillingTypes() {
            vm.inspectionOutcome = setInspectionOutcome();
            vm.harnessCharge = setHarnessCharge();
            vm.tarpCharge = setTarpCharge();
        }
        
        function setInspectionOutcome() {
            return vm.outcomes.outcomes.filter(function(item) {
                return item.id === vm.workorder.inspection_outcome;
            })[0];
        }
        
        function setHarnessCharge() {
            return vm.outcomes.harnessCharges.filter(function(item) {
                if (vm.form.harness_charge) {
                    return item.amount === parseInt(vm.form.harness_charge, 10);
                }
            })[0];
        }
        
        function setTarpCharge() {
            return vm.outcomes.tarpCharges.filter(function(item) {
                if (vm.form.tarp_charge) {
                    return item.amount === parseInt(vm.form.tarp_charge, 10);
                }
            })[0];
        }
        
        function getStatus() {
            return STATUSES.filter(function(item) {
                return item.id && vm.workorder.status_id === item.id;
            })[0];
        }
        
        function setForm() {
            if (form.inspection) {
                vm.form = {};
                var inspectionItems = form.inspection;
                inspectionItems.forEach(function(item) {
                    vm.form[item.key] = item.value;
                    
                    if (item.key.match(/array/) !== null) {
                        vm.form[item.key] = item.value.split(',');
                    }
                });

                if (vm.form.roof_conditions) {
                    vm.form.roof_conditions = angular.fromJson(vm.form.roof_conditions);
                }
            } else {
                vm.form = form;
            }
        }
        
        function addCondition(condition, add) {
            vm.form.roof_conditions = vm.form.roof_conditions || [];
            if (add) {
                vm.form.roof_conditions.push(condition);
            } else {
                var index = vm.form.roof_conditions.indexOf(condition);
                vm.form.roof_conditions.splice(index, 1);
            }
        }
        
        function conditionExists(condition) { return vm.form.roof_conditions.indexOf(condition) !== -1; }
        
        function save() {
            var form = angular.copy(vm.form);
            form.workorder_id = vm.workorder.id;
            
            for(var key in form) {
                var item = form[key];
                if (typeof item === 'object' && item.length) {
                    // Convert array to list
                    form[key] = item.toString();
                }
            }
            
            FormService.save(form).$promise.then(function(data) {
                saveWorkorder();
            }, function(err) {
                $log.log(err);
            });
        }
        
        function initUpload($event, type) {
            if (!vm.form[type]) {
                vm.upload(type);
            } else {
                vm.showModal(type);
            }
            $event.preventDefault();
        }
        
        function upload(type, cb) {
            var $file = angular.element('input[type="file"]');
            vm.fileType = type;
            $file.click();
            if (cb) cb();
        }
        
        function showModal(type) {
            var scope = $rootScope.$new();
            scope.url = vm.form[type];
            scope.name = type;
            scope.upload = function(type) {
                vm.upload(type, function() {
                    modal.hide();
                });
            };

            var modal = modal || $modal({
                scope: scope,
                templateUrl: 'src/partials/modals/file-upload-confirmation.html',
                show: false
            });
            modal.$promise.then(modal.show);
        }
        
        function uploadFile() {
            var $file = angular.element('input[type=file]');
            var fileChooser = $file[0];
            var file = fileChooser.files[0];
            var formData = new FormData();

            formData.append('file', file);
            formData.append('workorder_id', vm.workorder.id);
            formData.append('key', vm.fileType);

            FormService.upload(formData).$promise.then(function(data) {
                vm.form[vm.fileType] = data.url;
            }, function(err) {
                $log.log(err);
            });
        }
        
        function showBillingModal() {
            
            var mv = $rootScope.$new();
            mv.lockBilling = lockBilling;
            mv.workorder = vm.workorder;
            
            var modal = modal || $modal({
                scope: mv,
                templateUrl: 'src/partials/modals/billing-locked-confirm.html',
                show: false
            });
            
            modal.$promise.then(modal.show);
        }
        
        function lockBilling(workorder) {
            if (workorder.billing_locked === 1) {
                workorder.billing_locked = 0;
            } else {
                vm.workorder.billing_locked = 1;
            }
            
            saveWorkorder();
        }
        
        function saveWorkorder() {
            var workorderCopy = angular.copy(vm.workorder);
            workorderCopy.date_of_inspection = new Date(workorderCopy.date_of_inspection).getTime();
            delete workorderCopy.inspection_val;
            
            return InspectionService.create(workorderCopy).$promise.then(function(data) {
                vm.alerts = alert.add({
                    title: 'Saved',
                    content: 'Saved',
                    type: 'success'
                }, 3000);
            }, function(err) {
                $log.error(err);
            });
        }
    }
})();