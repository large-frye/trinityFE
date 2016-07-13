/* global angular */

(function () {
    'use strict';

    angular
        .module('trinity.controllers.settings.photos', [])
        .controller('photoSettingsCtrl', PhotoSettingsCtrl);

    PhotoSettingsCtrl.$inject = ['UserFactory', 'PhotoService', '$log', '$modal', 'alert', '$rootScope', 'CategoryService', 'settingsData'];
    function PhotoSettingsCtrl(UserFactory, PhotoService, $log, $modal, alert, $rootScope, CategoryService, settingsData) {
        var vm = this;
        vm.settings = settingsData;
        vm.options = UserFactory.user.getNavOptions();
        vm.categoryType = 'Category 1';
        vm.getSubCategories = getSubCategories;
        vm.showCategory1 = showCategory1;
        vm.showCategory2 = showCategory2;
        vm.save = save;
        vm.addCategory = addCategory;
        vm.deleteCategory = deleteCategory;

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
            delete vm.parentCat1;
        }

        function showCategory2() {
            delete vm.category2;
            vm.categoryType = 'Category 2';
            delete vm.parentCat2;
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

        function addCategory() {
            var scope = $rootScope.$new();
            scope.parentCategories = {
                category1: vm.parentCat1,
                category2: vm.parentCat2
            };

            var modal = modal || $modal({
                scope: scope,
                templateUrl: 'src/partials/modals/settings/add-category.html',
                controller: 'addCategoryCtrl',
                controllerAs: 'vm',
                show: false,
                resolve: {
                    categorySaved: function() {
                        return function(data) {
                            if (!vm.parentCat1) {
                                getCategories();
                            }
                            else if (vm.parentCat1 && !vm.parentCat2) {
                                getSubCategories(vm.parentCat1.id, 2);
                            } else if (vm.parentCat1 && vm.parentCat2) {
                                getSubCategories(vm.parentCat2.id, 3);
                            }
                        };
                    }   
                }
            });
            modal.$promise.then(modal.show);
        }

        function deleteCategory(id, categoryType) {
            return CategoryService.api().deleteCategory({
                id: id
            }, function() { // We do not need any data to return.
                switch (categoryType) {
                    case 1:
                        getCategories();
                        break;
                    case 2: 
                        getSubCategories(vm.parentCat1.id, 2);
                        break;
                    case 3:
                        getSubCategories(vm.parentCat2.id, 3);
                        break;
                }
            }, function(err) {
                $log.error(err);
            });
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