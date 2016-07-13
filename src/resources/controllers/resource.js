(function() {
    'use strict';

    angular
        .module('trinity.resources.controllers.resource', [])
        .controller('resourceCtrl', ResourceController);

    ResourceController.$inject = ['ResourceService', '$log', 'resourceData', 'RESOURCE_TYPES', '$rootScope', '$modal'];
    function ResourceController(ResourceService, $log, resourceData, RESOURCE_TYPES, $rootScope, $modal) {
        var vm = this;
        vm.add = add;
        vm.getResources = getResources;
        vm.resources = resourceData.resources.resource;
        vm.otherResources = resourceData.resources.other;
        vm.uploadFile = uploadFile;
        vm.deleteResource = deleteResource;
        vm.saveResources = saveResources;
        vm.otherResource = {
            resource_type: RESOURCE_TYPES.OTHER
        };

        // Set constants to be used in view
        vm.resourceConstants = RESOURCE_TYPES;
        
        activate();

        ////////////////

        function activate() { 
        }

        function add(resource) {
            if (resource.item_type === 'file') {
                uploadResource(resource);
            } else {
                saveResource(resource);
            }
        }

        function saveResource(resource) {
            if (!vm.resource.resource_type)
                vm.resource.resource_type = RESOURCE_TYPES.RESOURCE;

            return ResourceService.api().saveResource(resource, function(data) {
                if (resource.resource_type === RESOURCE_TYPES.OTHER) {
                    vm.otherResources = data.resources;
                } else {
                    vm.resources = data.resources;
                }
            }, function(err) {
                $log.error(err);
            });
        }

        function saveResources(resourceType) {
            var resources = resourceType === RESOURCE_TYPES.OTHER ? vm.otherResources : vm.resources;
            for (var key in resources) {
                var resource = resources[key];
                saveResource(resource);
            }
        }

        function uploadResource(resource) {
            return ResourceService.api().uploadResource(vm.formData, function(data) {
                if (resource.resource_type === RESOURCE_TYPES.OTHER) {
                    vm.otherResources = data.resources.other;
                } else {
                    vm.resources = data.resources.resource;
                }

                resource.name = null;
                resource.file = null;
            }, function (err) {
                $log.error(err);
            });
        }

        function getResources() {
            return ResourceService.api().getResources(function(data) {
                vm.resources = data;
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
            var resource = resourceType === RESOURCE_TYPES.OTHER ? vm.otherResource : vm.resource;

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

        function deleteResource(resource, resourceType) {
            var scope = $rootScope.$new();

            var reorderModal = reorderModal || $modal({
                scope: scope,
                templateUrl: 'src/partials/modals/resources/delete-resource.html',
                controller: 'deleteResourceModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    deleteCallback: function () {
                        return function (resources) {
                            if (resourceType === RESOURCE_TYPES.OTHER) {
                                vm.otherResources = resources[RESOURCE_TYPES.OTHER];
                            } else {
                                vm.resources = resources[RESOURCE_TYPES.RESOURCE];
                            }
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