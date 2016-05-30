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
        vm.clearSelected = clearSelected;
        vm.getParentPhotoSize = getParentPhotoSize;
        
        activate();

        ////////////////

        function activate() { 
            getParentCategories();
            getSubCategories(1);
        }
        
        function uploadPhotos() {
            var $file = angular.element('input[type="file"]');
            $file.click();
        }
        
        function uploadFile() {
            var $file = angular.element('input[type="file"]');
            var fileChooser = $file[0];
            var files = fileChooser.files;
            var formData = new FormData();
            var inc = 0;
            
            for(var key in files) {
                if (files.hasOwnProperty(key)) {
                    formData.append('file_' + inc, files[key]);    
                }
                inc++;
            }
            
            formData.append('workorder_id', vm.workorder_id);
            
            PhotoService.api().upload({
                action: vm.workorder_id
            }, formData).$promise.then(function(data) {
                vm.photos = data.photos;
                getParentPhotoSize(1);
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
        
        function clearSelected() {
            for (var key in vm.photos) {
                var photo = vm.photos[key];
                delete photo.selected;
                angular.element('.inspection-photos .selected').removeClass('selected');
            }
        }
        
        function getParentPhotoSize(id) {
            if (vm.photos[id]) {
                vm.photos[id].length = 0;
                for (var key in vm.photos[id]) {
                    vm.photos[id].length++;
                }  
                return vm.photos[id].length;  
            }
            
            return 0;
        }
    }
})();