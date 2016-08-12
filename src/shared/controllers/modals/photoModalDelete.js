(function() {
'use strict';

    angular
        .module('trinity.shared.controllers.modals.photoModalDelete', [])
        .controller('photoModalDeleteCtrl', PhotoModalDeleteController);

    PhotoModalDeleteController.$inject = ['$scope', 'PhotoService', 'callbackPhotos', 'getPhotos' ,'$routeParams', '$log',
    'setLoading'];
    function PhotoModalDeleteController($scope, PhotoService, callbackPhotos, getPhotos, $routeParams, $log, setLoading) {

        // Look at a later time but this scope is not translating correctly.

        var vm = this;
        vm.photos = getPhotos;
        vm.deletePhotos = deletePhotos;
        vm.close = close;

        activate();

        ////////////////

        function activate() { }

        function deletePhotos() {
          $scope.$hide();
          setLoading(true, 'Deleting photo(s)...');
            PhotoService.api().delete({
                workorderId: $routeParams.id
            }, { photos: vm.photos }, function(data) {
                callbackPhotos(data);
            }, function(err) {
                $log.error(err);
            });
        }

        function close() {
            $scope.$hide();
            callbackPhotos();
        }
    }
})();
