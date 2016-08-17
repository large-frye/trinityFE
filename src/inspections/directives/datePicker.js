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
            template: '<input type="text" class="form-control" ng-model="vm.selectedDate" name="date" class="datepicker">'
        };
        return directive;

        function link(scope, element, attrs) { }
    }
    /* @ngInject */
    function DatePickerController($scope, $element, $attrs) {
        var vm = this;
        var inc = 0;

        function activate() {
            vm.selectedDate = getDate(new Date(vm.date));

            setTimeout(function() {
                var $datePicker = $element.datepicker({
                    autoclose: true
                }).on('changeDate', function (e) {
                    vm.date = e.date;
                    $scope.$apply();
                }).on('show', function(e) {
                    // hack to move the element below the input
                    $('.datepicker').css('margin-top', '30px');
                }, 10);
            });
        }
        
        function getDate(date) {
            // if (!vm.date) {
            //     return;
            // }
            //
            // vm.date = new Date(vm.date);
            return getMonth(date) + '/' + getDay(date) + '/' + date.getFullYear();

        }
        
        function getMonth(date) {
            var month = date.getMonth() + 1;
            return month > 9 ? month.toString() : '0' + month;
        }
        
        function getDay(date) {
            var day = date.getDate();
            return day > 9 ? day.toString() : '0' + day;
        }

        activate();

        $scope.$watch('vm.date', function(prev, next) {
            // if (typeof prev === 'number')
               //  vm.date = getDate();
        });

    }
})();