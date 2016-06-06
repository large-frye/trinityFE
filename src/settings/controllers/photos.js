(function () {
    'use strict';

    angular
        .module('trinity.controllers.settings.photos', [])
        .controller('photoSettingsCtrl', PhotoSettingsCtrl);

    PhotoSettingsCtrl.$inject = ['settings', 'UserFactory', 'PhotoService', '$log', '$modal', 'alert', '$rootScope', 'CategoryService'];
    function PhotoSettingsCtrl(settings, UserFactory, PhotoService, $log, $modal, alert, $rootScope, CategoryService) {
        var vm = this;
        vm.settings = settings;
        vm.options = UserFactory.user.getNavOptions();
        vm.categoryType = 'Category 1';
        vm.getSubCategories = getSubCategories;
        vm.showCategory1 = showCategory1;
        vm.showCategory2 = showCategory2;
        vm.save = save;
        vm.addCategory = addCategory;

        activate();

        ////////////////

        function activate() { 
        }

        function getSubCategories(id, type, ref) {
            vm.categoryType = 'Category ' + type;
            return PhotoService.api().getSubCategories({
                parentCategory: id
            }, function (data) {
                if (ref) {
                    return data.categories;
                } else {
                    if (!vm.settings.subCategories) {
                        vm.settings.subCategories = {};
                    }
                    vm.settings.subCategories[id] = data.categories;
                }
            }, function (err) {
                $log.log(err);
            });
        }

        function showCategory1() {
            delete vm.category1;
            vm.categoryType = 'Category 1';
        }

        function showCategory2() {
            delete vm.category2;
            vm.categoryType = 'Category 2';
        }

        function save() {
            var saveObj = {
                categories: angular.copy(vm.settings.categories),
                subCategories: angular.copy(vm.settings.subCategories)
            };
            PhotoService.api().saveCategories(saveObj, function (data) {
                vm.alerts = alert.add({
                    title: 'Saved',
                    content: 'Saved',
                    type: 'success'
                }, 3000);
            }, function (err) {
                $log.error(err);
            });
        }

        function addCategory(cat1, cat2) {
            var scope = $rootScope.$new();
            // scope.parentId = parentId;

            var modal = modal || $modal({
                scope: scope,
                templateUrl: 'src/partials/modals/settings/add-category.html',
                controller: 'addCategoryCtrl',
                controllerAs: 'vm',
                show: false,
                resolve: {
                    categorySaved: function() {
                        return function(data) {
                            getCategories();
                        };
                    }   
                }
            });
            modal.$promise.then(modal.show);
        }
        
        function getCategories() {
            return PhotoService.api().getParentCategories(function(data) {
                vm.settings = data;
            }, function(err) {
                $log.error(err);
            });
        }
    }
})();