/* global angular */

(function() {
'use strict';

    angular
        .module('trinity.controllers.inspections.admin.photos', [])
        .controller('adminInspectionPhotoCtrl', PhotosController);

    PhotosController.$inject = ['shared', '$routeParams', 'photos', 'PhotoService', '$log'];
    function PhotosController(shared, $routeParams, photos, PhotoService, $log) {
        var vm = this;
        vm.options = shared.getInspectionSideBar($routeParams.id);
        vm.photos = photos.photos.categorizedPhotos;
        vm.uploadPhotos = uploadPhotos;
        vm.workorder_id = $routeParams.id;
        vm.uploadFile = uploadFile;
        vm.getParentCategories = getParentCategories;
        vm.getSubCategories = getSubCategories;
        
        console.log(vm);
        
        activate();

        ////////////////

        function activate() { 
            getParentCategories();
        }
        
        function uploadPhotos() {
            var $file = angular.element('input[type="file"]');
            $file.click();
        }
        
        function uploadFile() {
            var $file = angular.element('input[type="file"]');
            var fileChooser = $file[0];
            var file = fileChooser.files[0];
            var formData = new FormData();
            
            formData.append('file', file);
            formData.append('workorder_id', vm.workorder_id);
            
            PhotoService.api().upload({
                action: vm.workorder_id
            }, formData).$promise.then(function(data) {
                vm.photos = data.photos;
            }, function(err) {
                $log.log(err);
            });
        }
        
        function getParentCategories() {
            PhotoService.api().getParentCategories(function(data) {
                vm.parentCategories = data.categories;
            }, function(err) {
                $log.log(err);
            });
        }
        
        function getSubCategories(id) {
            PhotoService.api().getSubCategories({
                parentCategory: id
            }, function(data) {
                vm.subCategories = data.categories;
            }, function(err) {
                $log.log(err);
            });
        }
    }
})();