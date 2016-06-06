(function () {
    'use strict';

    angular
        .module('trinity.controllers.shared.addCategory', [])
        .controller('addCategoryCtrl', AddCategoryController);

    AddCategoryController.$inject = ['$scope', 'CategoryService', '$log', 'categorySaved'];
    function AddCategoryController($scope, CategoryService, $log, categorySaved) {
        var vm = this;
        vm.parentId = $scope.parentId;
        vm.getParents = getParents;
        vm.category = {};
        vm.saveCategory = saveCategory;

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
            CategoryService.api().saveCategory(vm.category, function (data) {
                categorySaved(data);
            }, function (err) {
                $log.log(err);
            });
        }

    }
})();