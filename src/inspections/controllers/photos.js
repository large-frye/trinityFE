/* global angular */

(function () {
    'use strict';

    angular
        .module('trinity.controllers.inspections.admin.photos', [])
        .controller('adminInspectionPhotoCtrl', PhotosController);

    PhotosController.$inject = ['shared', '$routeParams', 'photos', 'PhotoService', '$log'
        , '$rootScope', '$modal', '$scope', 'USER_TYPES', 'UserFactory'];
    function PhotosController(shared, $routeParams, photos, PhotoService, $log, $rootScope
        , $modal, $scope, USER_TYPES, UserFactory) {
        var vm = this;
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
        vm.deleteAll = deleteAll;
        vm.deleteSelected = deleteSelected;
        vm.photosSelected = false;
        vm.reorderModal = reorderModal;
        vm.createPhotosZip = createPhotosZip;

        activate();

        ////////////////

        function activate() {
            getParentCategories();
            getSubCategories(1);
            getSidebarOptions();
            sortPhotos();
        }

        function getSidebarOptions() {
            if (UserFactory.user.get().appRole === USER_TYPES.ADMIN) {
                vm.options = shared.getInspectionSideBar($routeParams.id);
            } else {
                vm.options = shared.getInspectorInspectionBar($routeParams.id);
            }
            
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
            
            vm.loading = true;
            PhotoService.api().upload({
                action: vm.workorder_id
            }, formData).$promise.then(function (data) {
                vm.loading = false;
                vm.photos = data.categorizedPhotos;
                getParentPhotoSize(1);
                sortPhotos();
            }, function (err) {
                $log.log(err);
            });
        }

        function getParentCategories() {
            return PhotoService.api().getParentCategories({
                id: vm.workorder_id
            }, function (data) {
                vm.parentCategories = data.categories;
            }, function (err) {
                $log.log(err);
            });
        }

        function getSubCategories(id, ref, forceNoWorker) {
            return PhotoService.api().getSubCategories({
                parentCategory: id,
                id: vm.workorder_id
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
            // var unCategorizedPhotos = vm.photos.notCategorized;

            allPhotos.forEach(function (photo) {
                unselectPhoto(photo);
            });

            // unCategorizedPhotos.forEach(function (photo) {
            //     unselectPhoto(photo);
            // });
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

            if (typeof vm.photos.notCategorized !== 'undefined') {
                vm.photos.notCategorized.forEach(function (photo) {
                    if (photo.selected) photos.push(photo);
                });
            }

            photos.forEach(function (photo, index) {
                if (keys.indexOf(photo.file_name) === -1) {
                    keys.push(photo.file_name);
                } else {
                    remove.push(index);
                }
            });

            remove.forEach(function (i, index) {
                if (index > 0) i -= index;
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
                            sortPhotos();
                        };
                    },
                    callbackPhotos: function() {
                        return function() {
                            clearSelected();
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
                // Unselect all
                clearSelected();
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

        function selectNewPhotos() {
            var allPhotos = vm.photos.all;
            var notCategorizedPhotos = vm.photos.notCategorized;

            allPhotos.forEach(function getPhotos(photo) {
                if (photo.recently_upload) {
                    photo.selected = true;
                    delete photo.recently_upload;
                }
            });

            if (typeof notCategorizedPhotos !== 'undefined') {
                notCategorizedPhotos.forEach(function (photo) {
                    if (photo.recently_upload) {
                        photo.selected = true;
                        delete photo.recently_upload;
                    }
                });
            }
        }

        function sortPhotos() {
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

        function deleteAll() {
            selectAll();
            var scope = $rootScope.$new();
            scope.photos = getSelectedPhotos();
            var deleteModal = deleteModal || $modal({
                scope: scope,
                templateUrl: 'src/partials/modals/photos/confirm-delete.html',
                controller: 'photoModalDeleteCtrl',
                controllerAs: 'vm',
                resolve: {
                    callbackPhotos: function () {
                        return function (photos) {
                            if (photos) {
                                vm.photos = photos.categorizedPhotos;
                            }
                            clearSelected();
                            sortPhotos();
                        };
                    },
                    getPhotos: function () {
                        return getSelectedPhotos();
                    }
                },
                show: false
            });
            deleteModal.$promise.then(deleteModal.show);
        }

        function deleteSelected() {
            var scope = $rootScope.$new();

            var deleteModal = deleteModal || $modal({
                scope: scope,
                templateUrl: 'src/partials/modals/photos/confirm-delete.html',
                controller: 'photoModalDeleteCtrl',
                controllerAs: 'vm',
                resolve: {
                    callbackPhotos: function () {
                        return function (photos) {
                            if (photos) {
                                vm.photos = photos.categorizedPhotos;
                            }
                            clearSelected();
                            sortPhotos();
                        };
                    },
                    getPhotos: function () {
                        return getSelectedPhotos();
                    }
                },
                show: false
            });
            deleteModal.$promise.then(deleteModal.show);
        }

        function reorderModal() {
            var scope = $rootScope.$new();
            scope.parentCategories = getParentCategories();
            scope.workorderId = vm.workorder_id;

            var reorderModal = reorderModal || $modal({
                scope: scope,
                templateUrl: 'src/partials/modals/photos/reorder.html',
                controller: 'photoModalReorderCtrl',
                controllerAs: 'vm',
                resolve: {
                    callbackPhotos: function () {
                        return function () {
                            // TODO: add alert
                        };
                    },
                    parentCategories: function() {
                        return vm.parentCategories;
                    },
                    methods: function () {
                        return {
                            subCategories: getSubCategories,
                            parentCategories: getParentCategories
                        };
                    }
                },
                show: false
            });
            reorderModal.$promise.then(reorderModal.show);
        }

        function createPhotosZip() {
            vm.loading = !vm.loading;
            return PhotoService.api().createPhotosZip({
                workorderId: vm.workorder_id
            }, function(data) {
                vm.loading = !vm.loading;
                var $anchor = document.createElement('a');
                $anchor.setAttribute('href', data.file);
                $anchor.click();
            }, function(err) {
                $log.error(err);
            });
        }

        $scope.$watch('vm.photos', function (next, prev) {
            vm.photosSelected = isPhotosSelected(next);
        }, []);
    }
})();