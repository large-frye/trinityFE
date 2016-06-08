/* global angular */

(function () {
    'use strict';

    angular
        .module('trinity.controllers.inspections.admin.photos', [])
        .controller('adminInspectionPhotoCtrl', PhotosController);

    PhotosController.$inject = ['shared', '$routeParams', 'photos', 'PhotoService', '$log'
        , '$rootScope', '$modal', '$scope'];
    function PhotosController(shared, $routeParams, photos, PhotoService, $log, $rootScope
        , $modal, $scope) {
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
        vm.selectAll = selectAll;
        vm.photosSelected = false;

        activate();

        ////////////////

        function activate() {
            getParentCategories();
            getSubCategories(1);
            reorderPhotos();
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

            for (var key in files) {
                if (files.hasOwnProperty(key)) {
                    formData.append('file_' + inc, files[key]);
                }
                inc++;
            }

            formData.append('workorder_id', vm.workorder_id);

            PhotoService.api().upload({
                action: vm.workorder_id
            }, formData).$promise.then(function (data) {
                vm.photos = data.categorizedPhotos;
                getParentPhotoSize(1);
                categorizePhotos();
            }, function (err) {
                $log.log(err);
            });
        }

        function getParentCategories() {
            PhotoService.api().getParentCategories(function (data) {
                vm.parentCategories = data.categories;
            }, function (err) {
                $log.log(err);
            });
        }

        function getSubCategories(id, ref) {
            return PhotoService.api().getSubCategories({
                parentCategory: id
            }, function (data) {
                if (ref) {
                    return data.categories;
                } else {
                    vm.subCategories = data.categories;
                }
            }, function (err) {
                $log.log(err);
            });
        }

        function clearSelected() {
            var allPhotos = vm.photos.all;
            var unCategorizedPhotos = vm.photos.notCategorized;

            allPhotos.forEach(function (photo) {
                unselectPhoto(photo);
            });

            unCategorizedPhotos.forEach(function (photo) {
                unselectPhoto(photo);
            });
        }

        function unselectPhoto(photo) {
            delete photo.selected;
            angular.element('.inspection-photos .selected').removeClass('selected');
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

        function getSelectedPhotos() {
            var photos = []
                , remove = []
                , keys = [];

            vm.photos.all.forEach(function (photo) {
                if (photo.selected) photos.push(photo);
            });

            vm.photos.notCategorized.forEach(function (photo) {
                if (photo.selected) photos.push(photo);
            });

            photos.forEach(function (photo, index) {
                if (keys.indexOf(photo.file_name) === -1) {
                    keys.push(photo.file_name);
                } else {
                    remove.push(index);
                }
            });

            remove.forEach(function (i, index) {
                if (index > 0) {
                    i--; // If sliced before the length of the array is length - 1 now 
                }
                photos.splice(i, 1);
            });

            return photos;
        }

        function showModal() {
            var scope = $rootScope.$new();
            scope.photos = getSelectedPhotos();
            scope.parents = vm.parentCategories;
            scope.children = [];

            var modal = modal || $modal({
                scope: scope,
                templateUrl: 'src/partials/modals/photos/categorize.html',
                controller: 'photoModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    methods: function () {
                        return {
                            subCategories: getSubCategories
                        };
                    },
                    setPhotos: function () {
                        return function (photos) {
                            save(photos);
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
                    for (var k in photos) {
                        noParents.push(photos[k]);
                    }
                }
            }
            return noParents;
        }

        function save(photos) {
            PhotoService.api().save({
                'photos': photos
            }, function (data) {
                console.log(data);
            }, function (err) {
                $log.error(err);
            });
        }

        function isPhotosSelected(photos) {
            var allPhotos = photos.all;
            var notCategorizedPhotos = photos.notCategorized;
            var selected = false;
            allPhotos.forEach(function (photo) {
                if (photo.selected) selected = true; return;
            });

            if (typeof notCategorizedPhotos !== 'undefined') {
                notCategorizedPhotos.forEach(function (photo) {
                    if (photo.selected) selected = true; return;
                });
            }

            return selected;
        }

        function selectAll() {
            var allPhotos = vm.photos.all;
            var notCategorizedPhotos = vm.photos.notCategorized;

            allPhotos.forEach(function getPhotos(photo) {
                photo.selected = true;
            });

            if (typeof notCategorizedPhotos !== 'undefined') {
                notCategorizedPhotos.forEach(function (photo) {
                    photo.selected = true;
                });
            }

        }

        function reorderPhotos() {
            vm.photos.all.sort(function (a, b) {
                if (a.label === null || a.label === '') {
                    return -1;
                } else if (b.label === null || b.label === '') {
                    return 1;
                } else {
                    return 0;
                }
            });
        }

        $scope.$watch('vm.photos', function (next, prev) {
            vm.photosSelected = isPhotosSelected(next);
        }, []);
    }
})();