(function () {
    'use strict';

    angular
        .module('trinity.controllers.shared.addCategory', [])
        .controller('addCategoryCtrl', AddCategoryController);

    AddCategoryController.$inject = ['$scope', 'CategoryService', '$log', 'categorySaved'];
    function AddCategoryController($scope, CategoryService, $log, categorySaved) {
        var vm = this;
        vm.parentCategories = $scope.parentCategories;
        vm.getParents = getParents;
        vm.category = {};
        vm.saveCategory = saveCategory;
        vm.emptyObject = emptyObject;

        activate();

        ////////////////

        function activate() {
            getParents();
        }

        function getParents() {
            CategoryService.api().getParentCategories(function (data) {
                vm.parents = data.categories;
            }, function (err) {
                $log.log(err);
            });
        }

        function saveCategory() {
            // check parents to see if they exist
            vm.category.parent_id = 0;

            if (vm.parentCategories.category1) vm.category.parent_id = vm.parentCategories.category1.id;
            if (vm.parentCategories.category2) vm.category.parent_id = vm.parentCategories.category2.id;

            CategoryService.api().saveCategory(vm.category, function (data) {
                categorySaved(data);
            }, function (err) {
                $log.log(err);
            });
        }

        function emptyObject(obj) {
            for(var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    return false;
                }
                return true;
            }
        }

    }
})();