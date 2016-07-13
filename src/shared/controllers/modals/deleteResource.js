(function() {
'use strict';

    angular
        .module('trinity.shared.controllers.modals.deleteResource', [])
        .controller('deleteResourceModalCtrl', DeleteResourceModalController);

    DeleteResourceModalController.$inject = ['deleteCallback', 'resource', 'ResourceService', '$log', '$scope'];
    function DeleteResourceModalController(deleteCallback, resource, ResourceService, $log, $scope)  {
        var vm = this;
        vm.resource = resource;
        vm.deleteResource = deleteResource;
        vm.close = close;

        activate();

        ////////////////

        function activate() { /* noop */ }

        function deleteResource() {
            ResourceService.api().deleteResource({
                sub: vm.resource.id
            }, function(data) {
                vm.close();
                deleteCallback(data.resources);
            }, function (err) {
                $log.error(err);
            });
        }

        function close() {
            $scope.$hide();
        }
    }
})();