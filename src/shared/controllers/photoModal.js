(function() {
'use strict';

    angular
        .module('trinity.shared.controllers.photoModal', [])
        .controller('photoModalCtrl', PhotoModalCtrl);

    PhotoModalCtrl.$inject = ['$scope', 'methods'];
    function PhotoModalCtrl($scope, methods) {
        var vm = this;
        vm.getSubCategories = getSubCategories;
        vm.save = save;
        vm.photos = $scope.photos;
        vm.photosSelected = false;

        activate();

        ////////////////

        function activate() {
        }
        
        function getSubCategories(id, ref) {
            vm.children = methods.subCategories(id, ref);
        }
        
        function save() {
            methods.save();
        }
        
        $scope.$watch('photos', function(next, prev) {
            vm.photosSelected = false;
            vm.photos.forEach(function(photo) {
                if (photo.selected) {
                    vm.photosSelected = true;
                    return;
                }
            });
        }, []);
    }
})();