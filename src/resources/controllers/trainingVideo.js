/**
 * Created by andrewfrye on 6/14/16.
 */
(function() {
    'use strict';

    angular
        .module('trinity.resources.controllers.trainingVideo', [])
        .controller('trainingVideoCtrl', TrainingVideoController);

    TrainingVideoController.$inject = ['ResourceService', '$log', 'videoData', 'RESOURCE_TYPES', '$rootScope', '$modal', 'USER_TYPES', 'UserFactory'];
    function TrainingVideoController(ResourceService, $log, videoData, RESOURCE_TYPES, $rootScope, $modal, USER_TYPES, UserFactory) {
        var vm = this;
        vm.add = add;
        vm.trainingVideos = videoData.resources[RESOURCE_TYPES.TRAINING_VIDEO];
        vm.getResources = getResources;
        vm.uploadFile = uploadFile;
        vm.deleteTrainingVideo = deleteTrainingVideo;
        vm.saveTrainingVideos = saveTrainingVideos;
        vm.userTypes = USER_TYPES;
        vm.userRole = UserFactory.user.get().appRole;

        console.log(vm.userRole);

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
            if (!vm.trainingVideo.resource_type)
                vm.trainingVideo.resource_type = RESOURCE_TYPES.TRAINING_VIDEO;

            return ResourceService.api().saveResource(resource, function(data) {
                vm.trainingVideos = data.resources;
            }, function(err) {
                $log.error(err);
            });
        }

        function saveTrainingVideos(resourceType) {
            var resources = vm.trainingVideos;
            for (var key in resources) {
                var resource = resources[key];
                saveResource(resource);
            }
        }

        function uploadResource(resource) {
            return ResourceService.api().uploadResource(vm.formData, function(data) {
                vm.trainingVideos = data.resources[RESOURCE_TYPES.TRAINING_VIDEO];
                resource.name = null;
                resource.file = null;
            }, function (err) {
                $log.error(err);
            });
        }

        function getResources() {
            return ResourceService.api().getResources(function(data) {
                vm.trainingVideos = data;
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
            var resource = vm.trainingVideo;

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

        function deleteTrainingVideo(resource, resourceType) {
            var scope = $rootScope.$new();

            var reorderModal = reorderModal || $modal({
                scope: scope,
                templateUrl: 'src/partials/modals/resources/delete-resource.html',
                controller: 'deleteResourceModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    deleteCallback: function () {
                        return function (resources) {
                            vm.trainingVideos = resources[RESOURCE_TYPES.TRAINING_VIDEO];
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