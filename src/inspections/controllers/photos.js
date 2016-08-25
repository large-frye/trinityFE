/* global angular */

(function () {
    'use strict';

    angular
        .module('trinity.controllers.inspections.admin.photos', [])
        .controller('adminInspectionPhotoCtrl', PhotosController);

    PhotosController.$inject = ['shared', '$routeParams', 'photos', 'PhotoService', '$log'
        , '$rootScope', '$modal', '$scope', 'USER_TYPES', 'UserFactory', 'alert'];
    function PhotosController(shared, $routeParams, photos, PhotoService, $log, $rootScope
        , $modal, $scope, USER_TYPES, UserFactory, alert) {
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

        var FILE_SIZE_CHECK = 100;
        var MAX_FILE_UPLOAD_SIZE = 200;
        var TO_MB = 1000000;

        activate();

        ////////////////

        function activate() {
            getParentCategories();
            getSubCategories(1);
            getSidebarOptions();
            sortPhotos();
        }

        function getSidebarOptions() {
            if (UserFactory.user.get().appRole !== USER_TYPES.INSPECTOR) {
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

            // TODO: make a fn
            if (files.length > MAX_FILE_UPLOAD_SIZE) {
                vm.alerts = [{
                    title: 'Photos too big!',
                    content: ['The quantity of photos selected exceeds the limit ',
                    'of photos that can be uploaded at one time.  Please try to ',
                    'upload the photos in less than 200 at a time'].join('\n'),
                    type: 'danger'
                }];
                $scope.$apply();
                $file.replaceWith($file.val('').clone(true));
                return;
            }

            if (findFileSize(files) > FILE_SIZE_CHECK) {
                vm.alerts = [{
                    title: 'File size check!',
                    content: ['The combined sizes of the photos you are trying to ',
                    'upload is larger than expected.   In the future please reduce ',
                    'the size of the photos you take by adjusting your camera settings. ',
                    'This will shorten the amount of time it takes to upload these photos. ',
                    'If you have any questions on how to do this please contact ',
                    'the office.'].join('\n'),
                    type: 'danger'
                }];
                $scope.$apply();
                $file.replaceWith($file.val('').clone(true));
                return;
            }

            for (var key in files) {
                if (files.hasOwnProperty(key)) {
                    formData.append('file_' + inc, files[key]);
                }
                inc++;
            }

            formData.append('workorder_id', vm.workorder_id);

            vm.loading = true;
            vm.loadingMsg = "Loading...";
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
                            vm.loading = false;
                            vm.loadingMsg = 'Loading...';
                        };
                    },
                    getPhotos: function () {
                        return getSelectedPhotos();
                    },
                    setLoading: function() {
                      return function(loading, msg) {
                        vm.loading = loading;
                        vm.loadingMsg = msg;
                      };
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
            vm.loadingMsg = "Loading...";
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

        function findFileSize(files) {
            var size = 0;
            for(var i = 0; i < files.length; i++) {
                size += files[i].size;
            }
            return size / TO_MB;
        }

        $scope.$watch('vm.photos', function (next, prev) {
            vm.photosSelected = isPhotosSelected(next);
        }, []);
    }
})();
