(function() {
'use strict';

    angular
        .module('trinity.shared.controllers.photoModal', [])
        .controller('photoModalCtrl', PhotoModalCtrl);

    PhotoModalCtrl.$inject = ['$scope', 'methods', 'setPhotos'];
    function PhotoModalCtrl($scope, methods, setPhotos) {
        var vm = this;
        vm.getSubCategories = getSubCategories;
        vm.save = save;
        vm.photos = $scope.photos;
        vm.photosSelected = false;
        vm.parentCategories = $scope.parents;
        vm.setSelected = setSelected;

        activate();

        ////////////////

        function activate() {
        }
        
        function getSubCategories(id, ref) {
            vm.children = methods.subCategories(id, ref);
        }
        
        function setSelected(category) {
            vm.photos.forEach(function(photo) {
                photo.label = category.name;
                vm.labelSelected = true;
            });
        }
        
        function save() {
            setPhotos(vm.photos);
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