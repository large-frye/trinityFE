/* global angular */

(function() {
    'use strict';

    angular
        .module('trinity.controllers.inspections.admin.form', [])
        .controller('adminInspectionCtrl', AdminInspectionController);

    AdminInspectionController.$inject = ['InspectionService', 'InspectionFactory', 'FormService', '$log', 'STATUSES', 'form', '$rootScope', '$modal',
    '$routeParams', 'shared'];
    function AdminInspectionController(InspectionService, InspectionFactory, FormService, $log, STATUSES, form, $rootScope, $modal, $routeParams, shared) {
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
                if (cb) cb();
            }, function(err) {
                $log.error(err);
            });
        }
        
        function getInspectionOutcomes() {
            return InspectionService.inspectionOutcomes(function(data) {
                vm.outcomes = data;
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
            var outcomeId = vm.workorder.inspection_outcome;
            
            switch (outcomeId) {
            case '0':
                return 'Basic Inspection';
            case '1':
                return 'Expert Inspection';
            case '5':
                return 'Ladder Assist';
            }
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
                if (item.id) {
                    return item.id = vm.workorder.status_id;    
                }
            })[0];
        }
        
        function setForm() {
            if (form.inspection) {
                vm.form = {};
                var inspectionItems = form.inspection;
                inspectionItems.forEach(function(item) {
                    vm.form[item.key] = item.value;
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
            FormService.save(form).$promise.then(function(data) {
                $log.log(data);
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
    }
})();