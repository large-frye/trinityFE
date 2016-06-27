(function() {
    'use strict';

    angular
        .module('trinty.inspections.directives.workorderLog', [])
        .directive('workorderLog', WorkorderLog);

    WorkorderLog.$inject = ['WorkorderNoteService', 'UserFactory', 'WorkorderLoggerService'];
    function WorkorderLog() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: WorkorderLogCtrl,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                workorder: '='
            },
            templateUrl: 'src/partials/inspections/workorder-log.html'
        };
        return directive;
        
        function link(scope, element, attrs) { /* noop */ }
    }
    /* @ngInject */
    function WorkorderLogCtrl (WorkorderNoteService, UserFactory, WorkorderLoggerService) {
        var vm = this;
        vm.getNotes = getNotes;
        vm.saveNote = saveNote;
        vm.getLog = getLog;

        function activate() {
            getNotes();
        }

        activate();

        function getNotes() {
            return WorkorderNoteService.api().getNotes({
                id: vm.workorder.id
            }, function(data) {
                vm.workorderNotes = data.notes;
            }, function (err) {
                console.error(err);
            });
        }

        function getLog() {
            return WorkorderLoggerService.api().getLog({
                id: vm.workorder.id
            }, function(data) {
                vm.logs = data.logs;
            }, function(err) {
                console.error(err);
            });
        }

        function saveNote() {
            var profile = UserFactory.user.get().profile;
            vm.workorderNote.workorder_id = vm.workorder.id;
            vm.workorderNote.username = profile.first_name + ' ' + profile.last_name;

            WorkorderNoteService.api().saveNote({
                id: vm.workorder.id
            }, vm.workorderNote, function (data) {
                vm.workorderNotes = data.notes;
                vm.workorderNote = {};
                vm.alerts = alert.add({
                    title: 'Saved',
                    content: 'Saved Note',
                    type: 'success'
                }, 3000);
            }, function (err) {
                console.error(err);
            });
        }
    }
})();