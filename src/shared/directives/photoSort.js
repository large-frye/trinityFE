/* global angular */
/* global $ */

(function() {
    'use strict';

    angular
        .module('trinity.shared.directives.photoSort', [])
        .directive('photoSort', PhotoSort);

    PhotoSort.$inject = ['$routeParams', 'PhotoService', '$log'];
    function PhotoSort() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: PhotoSortController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                photos: '=',
                label: '=',
                parentId: '=',
                subParentId: '=',
                clicked: '='
            },
            templateUrl: 'src/partials/shared/sort-photos.html'
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function PhotoSortController ($scope, $element, $routeParams, PhotoService, $log) {
        var vm = this
        , $list;

        function orderPhotos() {
            var $items = Array.prototype.slice.call(angular.element($element.children().children()));
            $items.forEach(function(item, index) {
                var photoId = $(item).data('labelId');
                addDisplayOrder(photoId, index);
            });
        }

        function addDisplayOrder(photoId, order) {
            var photo = vm.photos[vm.label.id].filter(function(item) {
                return item.id === photoId;
            })[0];
            photo.display_order = order;
            return;
        }

        $scope.$watch('vm.clicked', function(current, next) {
            if (typeof current != 'undefined') {
                // getPhotos(vm.label.id, vm.label.name);
                // Need to hide all other photos that be open
                $list = angular.element($element.children());
                $list.sortable({
                    stop: function(e, ui) {
                        orderPhotos();
                    }
                });
                $('.photo-sortable').hide();
                $element.children().show();
            }
        });
    }
})();