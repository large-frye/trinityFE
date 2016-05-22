/* global angular */

(function() {
'use strict';

    angular
        .module('trinity.controllers.inspections.admin.photos', [])
        .controller('adminInspectionPhotoCtrl', PhotosController);

    PhotosController.$inject = ['shared', '$routeParams'];
    function PhotosController(shared, $routeParams) {
        var vm = this;
        vm.options = shared.getInspectionSideBar($routeParams.id);
        
        activate();

        ////////////////

        function activate() { }
    }
})();