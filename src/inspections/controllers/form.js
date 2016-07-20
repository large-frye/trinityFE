/* global angular */

(function () {
    'use strict';

    angular
        .module('trinity.controllers.inspections.admin.form', [])
        .controller('adminInspectionCtrl', AdminInspectionController);

    AdminInspectionController.$inject = ['InspectionService', 'InspectionFactory', 'FormService', '$log', 'STATUSES', 'form', '$rootScope', '$modal',
        '$routeParams', 'shared', 'alert', 'FORM', 'UserFactory', 'FileService', '$interval'];

    function AdminInspectionController(InspectionService, InspectionFactory, FormService, $log, STATUSES, form, $rootScope, $modal
        , $routeParams, shared, alert, FORM, UserFactory, FileService, $interval) {
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
        vm.showAlertModal = showAlertModal;
        vm.refreshSelect2 = refreshSelect2;

        activate();

        ////////////////

        function activate() {
            getWorkorder(function () {
                getInspectionOutcomes();
                setForm();
            });
        }

        function getWorkorder(cb) {
            return InspectionService.get(({
                id: $routeParams.id
            }), function (data) {
                data.order.date_received = new Date(parseInt(data.order.date_received));
                data.order.date_of_inspection = new Date(parseInt(data.order.date_of_inspection));
                data.order.date_of_loss = new Date(parseInt(data.order.date_of_loss));
                data.order.date_of_last_contact = new Date(parseInt(data.order.date_of_last_contact));
                vm.workorder = data.order;
                vm.workorderStatus = getStatus();
                vm.auto_upgrade = vm.workorder.auto_upgrade ? 'Yes' : 'No';
                if (cb) cb();
            }, function (err) {
                $log.error(err);
            });
        }

        function getInspectionOutcomes() {
            return InspectionService.inspectionOutcomes(function (data) {
                vm.outcomes = data;
                vm.inspectionOutcome = setInspectionOutcome();
                setBillingTypes();
            }, function (err) {
                $log.error(err);
            });
        }

        function setBillingTypes() {
            vm.inspectionOutcome = setInspectionOutcome();
            vm.harnessCharge = setHarnessCharge();
            vm.tarpCharge = setTarpCharge();
        }

        function setInspectionOutcome() {
            return vm.outcomes.outcomes.filter(function (item) {
                return item.id === vm.workorder.inspection_outcome;
            })[0];
        }

        function setHarnessCharge() {
            return vm.outcomes.harnessCharges.filter(function (item) {
                if (vm.form.harness_charge) {
                    return item.amount === parseInt(vm.form.harness_charge, 10);
                }
            })[0];
        }

        function setTarpCharge() {
            return vm.outcomes.tarpCharges.filter(function (item) {
                if (vm.form.tarp_charge) {
                    return item.amount === parseInt(vm.form.tarp_charge, 10);
                }
            })[0];
        }

        function getStatus() {
            return STATUSES.filter(function (item) {
                return item.id && vm.workorder.status_id === item.id;
            })[0];
        }

        function setForm() {
            if (form.inspection) {
                vm.form = {};
                var inspectionItems = form.inspection;
                inspectionItems.forEach(function (item) {
                    vm.form[item.key] = item.value;

                    if (item.key.match(/array/) !== null) {
                        vm.form[item.key] = item.value.split(',');
                    }
                });
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

            for (var key in form) {
                var item = form[key];
                if (typeof item === 'object' && item.length) {
                    // Convert array to list
                    form[key] = item.toString();
                }
            }

            FormService.save(form).$promise.then(function (data) {
                saveWorkorder();
            }, function (err) {
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
            vm.uploadType = type;
            $file.click();
            if (cb) cb();
        }

        function uploadFile() {
            var $file = angular.element('input[type="file"]');
            var fileChooser = $file[0];
            var files = fileChooser.files;
            var formData = new FormData();
            var inc = 0;
            var user = UserFactory.user.get();

            for (var key in files) {
                if (files.hasOwnProperty(key)) {
                    formData.append('file_' + inc, files[key]);
                }
                inc++;
            }

            formData.append('workorderId', vm.workorder.id);
            formData.append('files3Name', vm.uploadType.toLowerCase() + '_' + vm.workorder.claim_num + '_' + vm.workorder.last_name);
            formData.append('username', user.profile.first_name + ' ' + user.profile.last_name);
            formData.append('uploadType', vm.uploadType);

            vm.loading = true;
            FileService.api().upload(formData).$promise.then(function (data) {
                vm.loading = false;
                vm.reloadNotes = true;
                $file.replaceWith($file.val('').clone(true));
            }, function (err) {
                $file.replaceWith($file.val('').clone(true));
                $log.log(err);
            });
        }

        function showModal(type) {
            var scope = $rootScope.$new();
            scope.url = vm.form[type];
            scope.name = type;
            scope.upload = function (type) {
                vm.upload(type, function () {
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
            // Added for logger service
            workorderCopy.updated_by = UserFactory.user.get().id;
            workorderCopy.date_of_inspection = new Date(workorderCopy.date_of_inspection).getTime();
            workorderCopy.date_received = new Date(workorderCopy.date_received).getTime();
            workorderCopy.date_of_loss = new Date(workorderCopy.date_of_loss).getTime();
            // inspection.requested_date_of_inspection = new Date(getDate() + ' ' + $scope.time).getTime();

            delete workorderCopy.inspection_val;

            return InspectionService.create(workorderCopy).$promise.then(function (data) {
                vm.alerts = alert.add({
                    title: 'Saved',
                    content: 'Saved',
                    type: 'success'
                }, FORM.SAVE_LENGTH);
            }, function (err) {
                $log.error(err);
            });
        }

        function showAlertModal() {
            var scope = $rootScope.$new();
            scope.alerts = ['alert_to_inspector', 'alert_from_inspector'];

            var modal = $modal({
                scope: scope,
                templateUrl: 'src/partials/modals/alerts/alert.html',
                controller: 'alertModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    callbackAlertCompleted: function () {
                        return function (data) {
                            vm.inspection = data.workorder;
                            vm.reloadNotes = true;
                        };
                    },
                    scope: function () {
                        return scope;
                    }
                },
                show: false
            });
            modal.$promise.then(modal.show);
        }

        function refreshSelect2() {
            var interval = $interval(function () {
                var $select = $('.select2-multiple');
                if ($select.length > 0) {
                    $select.select2();
                    $interval.cancel(interval);
                }
            }, 10);
        }
    }
})();