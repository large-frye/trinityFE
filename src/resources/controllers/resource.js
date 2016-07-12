(function() {
    'use strict';

    angular
        .module('trinity.resources.controllers.resource', [])
        .controller('resourceCtrl', ResourceController);

    ResourceController.$inject = ['ResourceService', '$log', 'resourceData'];
    function ResourceController(ResourceService, $log, resourceData) {
        var vm = this;
        vm.add = add;
        vm.getResources = getResources;
        vm.resources = resourceData.resources;
        vm.uploadFile = uploadFile;
        
        activate();

        ////////////////

        function activate() { 
        }

        function add() {
            if (vm.resource.item_type === 'file') {
                uploadResource();
            } else {
                saveResource();
            }
        }

        function saveResource() {
            // stub
        }

        function uploadResource() {
            return ResourceService.api().uploadResource(vm.formData, function(data) {
                vm.resources = data.resources;
                vm.resource.name = null;
                vm.file = null;
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

        function uploadFile() {
            var $file = angular.element('input[type="file"]');
            var fileChooser = $file[0];
            var files = fileChooser.files;
            var formData = new FormData();
            var inc = 0;

            for (var key in files) {
                if (files.hasOwnProperty(key)) {
                    formData.append(vm.resource.name, files[key]);
                }
                inc++;
            }

            formData.append('workorder_id', vm.workorder_id);
            vm.formData = formData;
        }

    }
})();