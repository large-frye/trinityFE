(function() {
    'use strict';

    angular
        .module('trinity.resources.controllers.trainingContent', [])
        .controller('trainingCtrl', TrainingController);

    TrainingController.$inject = ['ResourceService', '$log', 'contentData', 'RESOURCE_TYPES', '$rootScope', '$modal'];
    function TrainingController(ResourceService, $log, contentData, RESOURCE_TYPES, $rootScope, $modal) {
        var vm = this;
        vm.add = add;
        vm.trainingMaterials = contentData.resources[RESOURCE_TYPES.TRAINING_MATERIAL];
        vm.getResources = getResources;
        vm.uploadFile = uploadFile;
        vm.deleteTrainingMaterial = deleteTrainingMaterial;
        vm.saveTrainingMaterials = saveTrainingMaterials;

        activate();

        ////////////////

        function activate() { }

        function add(resource) {
            if (resource.item_type === 'file') {
                uploadResource(resource);
            } else {
                saveResource(resource);
            }
        }

        function saveResource(resource) {
            if (!vm.trainingMaterial.resource_type)
                vm.trainingMaterial.resource_type = RESOURCE_TYPES.TRAINING_MATERIAL;

            return ResourceService.api().saveResource(resource, function(data) {
                vm.trainingMaterials = data.resources;
            }, function(err) {
                $log.error(err);
            });
        }

        function saveTrainingMaterials(resourceType) {
            var resources = vm.trainingMaterials;
            for (var key in resources) {
                var resource = resources[key];
                saveResource(resource);
            }
        }

        function uploadResource(resource) {
            return ResourceService.api().uploadResource(vm.formData, function(data) {
                vm.trainingMaterials = data.resources[RESOURCE_TYPES.TRAINING_MATERIAL];
                resource.name = null;
                resource.file = null;
            }, function (err) {
                $log.error(err);
            });
        }

        function getResources() {
            return ResourceService.api().getResources(function(data) {
                vm.trainingMaterials = data;
            }, function(err) {
                $log.error(err);
            });
        }

        function uploadFile(resourceType) {
            var $file = angular.element('input[type="file"]');
            var fileChooser = $file[0];
            var files = fileChooser.files;
            var formData = new FormData();
            var inc = 0;
            var resource = vm.trainingMaterial;

            for (var key in files) {
                if (files.hasOwnProperty(key)) {
                    formData.append(resource.name, files[key]);
                }
                inc++;
            }

            formData.append('workorder_id', vm.workorder_id);
            formData.append('resource_type', resourceType);
            vm.formData = formData;
        }

        function deleteTrainingMaterial(resource, resourceType) {
            var scope = $rootScope.$new();

            var reorderModal = reorderModal || $modal({
                scope: scope,
                templateUrl: 'src/partials/modals/resources/delete-resource.html',
                controller: 'deleteResourceModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    deleteCallback: function () {
                        return function (resources) {
                            vm.trainingMaterials = resources[RESOURCE_TYPES.TRAINING_MATERIAL];
                        };
                    },
                    resource: function() {
                        return resource;
                    }
                },
                show: false
            });
            reorderModal.$promise.then(reorderModal.show);
        }
    }
})();
