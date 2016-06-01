(function () {
    'use strict';

    angular
        .module('trinity.directives.inspections.datePicker', [])
        .directive('datePicker', DatePicker);

    var $el = null;

    DatePicker.$inject = [];
    function DatePicker() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: DatePickerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                date: '='
            },
            template: '<input type="text" class="form-control" ng-model="vm.date" name="date" class="datepicker">'
        };
        return directive;

        function link(scope, element, attrs) { }
    }
    /* @ngInject */
    function DatePickerController($scope, $element, $attrs) {
        var vm = this;

        function activate() {
            vm.date = getDate();
            
            $element.datepicker({
                autoclose: true
            }).on('changeDate', function (e) {
                vm.date = e.date;
                vm.date = getDate();
                $scope.$apply();
            });
        }
        
        function getDate() {
            if (!vm.date) {
                return;
            }
            
            vm.date = new Date(vm.date);
            return getMonth() + '/' + getDay() + '/' + vm.date.getFullYear();
        }
        
        function getMonth() {
            var month = vm.date.getMonth() + 1;
            return month > 9 ? month.toString() : '0' + month;
        }
        
        function getDay() {
            var day = vm.date.getDate();
            return day > 9 ? day.toString() : '0' + day;
        }

        activate();

    }
})();