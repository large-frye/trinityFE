(function () {
    'use strict';

    angular
        .module('trinity.directives.inspections.timePicker', [])
        .directive('timePicker', TimePicker);

    TimePicker.$inject = ['$timeout'];
    function TimePicker($timeout) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: TimePickerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                date: '=',
                time: '='
            },
            template: '<input type="text" class="form-control" ng-model="vm.time" name="time" class="timepicker">'
        };
        return directive;

        function link(scope, element, attrs) { }
    }
    /* @ngInject */
    function TimePickerController($scope, $element, $attrs, $timeout) {
        var vm = this;
        var delTime = false; 

        function activate() {
            vm.time = getTime();

            $timeout(function () {
                $element.timepicker({
                    defaultTime: vm.time
                }).on('changeTime.timepicker', checkTime);
            }, 100);

            function checkTime(e) {
                // Give some time to see the final value
                if (!delTime) {
                    vm.time = e.time.value;
                    $scope.$apply();
                }

                if (delTime)
                    delTime = false;
            }

            $element.on('keyup', function(e) {
                delTime = false;
                if (e.keyCode === 8 || e.keyCode === 46)
                    delTime = true;
            });

            // vm.date = getDate();

            // $element.datepicker({
            //     autoclose: true
            // }).on('changeDate', function (e) {
            //     vm.date = e.date;
            //     vm.date = getDate();
            //     $scope.$apply();
            // });
        }

        function getTime() {
            if (!vm.date) {
                return;
            }
            vm.time = new Date(vm.date);
            return getHour() + ':' + getMinutes() + ' ' + getMeridian();
        }

        function getHour() {
            var hour = vm.time.getHours();
            if (hour > 12) {
                hour = hour - 12;
            }
            return hour > 9 ? hour.toString() : '0' + hour;
        }

        function getMinutes() {
            var minutes = vm.time.getMinutes();
            return minutes > 9 ? minutes.toString() : '0' + minutes;
        }

        function getMeridian() {
            return new Date(vm.date).getHours() < 12 ? 'AM' : 'PM';
        }

        activate();

    }
})();