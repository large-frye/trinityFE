(function () {
    'use strict';

    angular
        .module('trinity.shared.controllers.modals.photoModalReorder', [])
        .controller('photoModalReorderCtrl', PhotoModalReorderController);

    PhotoModalReorderController.$inject = ['$scope', 'PhotoService', 'callbackPhotos', 'methods', 'parentCategories', '$routeParams', '$log'];
    function PhotoModalReorderController($scope, PhotoService, callbackPhotos, methods, parentCategories, $routeParams, $log) {
        var vm = this;
        vm.parentCategories = parentCategories;
        vm.getSubCategories = getSubCategories;
        vm.getLabels = getLabels;
        vm.save = save;
        vm.getPhotos = getPhotos;
        vm.photos = vm.photos || [];

        vm.close = close;

        activate();

        ////////////////

        function activate() {
            if (!vm.parentCategories) {
                getParentCategories();
            }
        }

        function getParentCategories() {
            return PhotoService.api().getParentCategories({
                id: $scope.workorderId
            }, function (data) {
                vm.parentCategories = data.categories;
            }, function (err) {
                $log.error(err);
            });
        }

        function getSubCategories(id, ref) {
            vm.children = [];
            vm.children[id] = methods.subCategories(id, ref);
        }

        function getLabels(id, ref) {
            vm.labels = [];
            vm.labels[id] = methods.subCategories(id, ref, -1);
        }

        function getPhotos(labelId, labelName) {
            PhotoService.api().getLabeledPhotos({
                workorderId: $routeParams.id,
                parentId: vm.parentId,
                subParentId: vm.subParentId,
                labelName: labelName
            }, function (data) {
                if (!vm.photos[labelId]) {
                    vm.photos[labelId] = data.photos;
                }
            }, function (err) {
                $log.log(err);
            });
        }

        function close() {
            $scope.$hide();
        }

        function save() {
            PhotoService.api().save({
                photos: vm.photos
            }, function (data) {
                $scope.$hide();
                callbackPhotos();
            }, function (err) {
                $log.error(err);
            });
        }
    }
})();