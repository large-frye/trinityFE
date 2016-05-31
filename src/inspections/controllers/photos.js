/* global angular */

(function() {
'use strict';

    angular
        .module('trinity.controllers.inspections.admin.photos', [])
        .controller('adminInspectionPhotoCtrl', PhotosController);

    PhotosController.$inject = ['shared', '$routeParams', 'photos', 'PhotoService', '$log'
    , '$rootScope', '$modal'];
    function PhotosController(shared, $routeParams, photos, PhotoService, $log, $rootScope
    , $modal) {
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
        vm.categorizePhotos = categorizePhotos;
        
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
                vm.photos = data.categorizedPhotos;
                getParentPhotoSize(1);
                categorizePhotos();
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
        
        function getSubCategories(id, ref) {
            return PhotoService.api().getSubCategories({
                parentCategory: id
            }, function(data) {
                if (ref) {
                    return data.categories;
                } else {
                    vm.subCategories = data.categories;
                }
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
            if (typeof vm.photos[id] !== 'undefined') {
                vm.photos[id].length = 0;
                for (var key in vm.photos[id]) {
                    vm.photos[id].length++;
                }  
                return vm.photos[id].length;  
            }
            
            return 0;
        }
        
        function categorizePhotos() {
            showModal();
        }
        
        function showModal() {
            var scope = $rootScope.$new();
            scope.photos = getUnCategorizePhotos();
            scope.parents = vm.parentCategories;
            scope.children = [];

            var modal = modal || $modal({
                scope: scope,
                templateUrl: 'src/partials/modals/photos/categorize.html',
                controller: 'photoModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    methods: function() {
                        return {
                            subCategories: getSubCategories,
                            save: save
                        };
                    }
                },
                show: false
            });
            modal.$promise.then(modal.show);
        }
        
        function getUnCategorizePhotos() {
            var noParents = [];
            for (var key in vm.photos) {
                if (key === 'no_parent') {
                    var photos = vm.photos['no_parent'];
                    for(var k in photos) {
                        noParents.push(photos[k]);    
                    }
                }
            }
            return noParents;
        }
        
        function save() {
            PhotoService.save(vm.photos, function(data) {
                vm.photos = data.categorizedPhotos;
                getParentPhotoSize(1);
            }, function (err) {
                $log.error(err);
            });
        }
    }
})();