(function() {
    'use strict';

    angular
        .module('trinity.directives.inspections.photoSelect', [])
        .directive('photoSelect', PhotoSelect);

    PhotoSelect.$inject = [];
    function PhotoSelect() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: PhotoSelectController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                photo: '='
            },
            templateUrl: 'src/partials/inspections/photo.html'
        };
        return directive;
        
        function link(scope, element, attrs) {}
    }
    /* @ngInject */
    function PhotoSelectController () {
        var vm = this;
        
        vm.selectPhoto = selectPhoto;
        
        function selectPhoto() {
            
        }
    }
})();