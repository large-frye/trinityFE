(function() {
'use strict';

    angular
        .module('trinity.controllers.settings.photos', [])
        .controller('photoSettingsCtrl', PhotoSettingsCtrl);

    PhotoSettingsCtrl.$inject = ['settings', 'UserFactory', 'PhotoService', '$log', '$modal'];
    function PhotoSettingsCtrl(settings, UserFactory, PhotoService, $log, $modal) {
        var vm = this;
        vm.settings = settings;
        vm.options = UserFactory.user.getNavOptions();
        vm.categoryType = 'Category 1';
        vm.getSubCategories = getSubCategories;
        vm.showCategory1 = showCategory1;
        vm.save = save;
        vm.addCategory = addCategory;

        activate();

        ////////////////

        function activate() { }
        
        function getSubCategories(id, ref) {
            vm.categoryType = 'Category 2';
            return PhotoService.api().getSubCategories({
                parentCategory: id
            }, function(data) {
                if (ref) {
                    return data.categories;
                } else {
                    if (!vm.settings.subCategories) {
                        vm.settings.subCategories = {};
                    }
                    vm.settings.subCategories[id] = data.categories;
                }
            }, function(err) {
                $log.log(err);
            });
        }
        
        function showCategory1() {
            delete vm.currentCategory;
            vm.categoryType = 'Category 1';
        }
        
        function save() {
            var saveObj = {
                categories: angular.copy(vm.settings.categories),
                subCategories: angular.copy(vm.settings.subCategories)
            };
            PhotoService.api().saveCategories(saveObj, function(data) {
                
            }, function(err) {
                $log.error(err);
            });
        }
        
        function addCategory() {
            
        }
    }
})();