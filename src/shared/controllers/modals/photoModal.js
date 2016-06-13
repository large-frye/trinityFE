(function () {
    'use strict';

    angular
        .module('trinity.shared.controllers.modals.photoModal', [])
        .controller('photoModalCtrl', PhotoModalCtrl);

    PhotoModalCtrl.$inject = ['$scope', 'methods', 'setPhotos', 'callbackPhotos'];
    function PhotoModalCtrl($scope, methods, setPhotos, callbackPhotos) {
        var vm = this;
        vm.getSubCategories = getSubCategories;
        vm.parentId = $scope.parentId;
        vm.save = save;
        vm.photos = $scope.photos;
        vm.photosSelected = false;
        vm.parentCategories = $scope.parents;
        vm.setSelected = setSelected;
        vm.setParentId = setParentId;
        vm.setSubParentId = setSubParentId;
        vm.deleteCategory1 = deleteCategory1;
        vm.deleteCategory2 = deleteCategory2;
        vm.close = close;

        activate();

        ////////////////

        function activate() {
        }

        function getSubCategories(id, ref) {
            vm.children = methods.subCategories(id, ref);
        }

        function setSelected(category) {
            vm.photos.forEach(function (photo) {
                photo.label = category.name;
                vm.labelSelected = true;
            });
        }

        function save() {
            setPhotos(vm.photos);
        }

        function setParentId(id) {
            vm.photos.forEach(function (photo) {
                photo.parent_id = id;
            });
        }

        function setSubParentId(id) {
            vm.photos.forEach(function (photo) {
                photo.sub_parent_id = id;
            });
        }

        function deleteCategory1() {
            delete vm.category1;
            delete vm.labelSelected;
        }
        function deleteCategory2() {
            vm.getSubCategories(vm.category1.id, true);
            delete vm.category2;
            delete vm.labelSelected;
            resetLabels();
        }

        function resetLabels() {
            vm.photos.forEach(function (photo) {
                photo.label = null;
            });
        }

        function close() {
            $scope.$hide();
            callbackPhotos();
        }

        // $scope.$watch('photos', function(next, prev) {
        //     vm.photosSelected = false;
        //     vm.photos.forEach(function(photo) {
        //         if (photo.selected) {
        //             vm.photosSelected = true;
        //             return;
        //         }
        //     });
        // }, []);
    }
})();