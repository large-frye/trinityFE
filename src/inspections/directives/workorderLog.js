(function() {
    'use strict';

    angular
        .module('trinty.inspections.directives.workorderLog', [])
        .directive('workorderLog', WorkorderLog);

    WorkorderLog.$inject = ['WorkorderNoteService', 'UserFactory', 'WorkorderLoggerService', 'alert', 'FileService', '$log'];
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
                workorder: '=',
                reloadNotes: '='
            },
            templateUrl: 'src/partials/inspections/workorder-log.html'
        };
        return directive;
        
        function link(scope, element, attrs) { /* noop */ }
    }
    /* @ngInject */
    function WorkorderLogCtrl ($scope, WorkorderNoteService, UserFactory, WorkorderLoggerService, alert, FileService, $log) {
        var vm = this;
        vm.getNotes = getNotes;
        vm.saveNote = saveNote;
        vm.getLog = getLog;
        vm.queueDeletedNotes = queueDeletedNotes;
        vm.deleteNotes = deleteNotes;

        function activate() {
            getNotes();
            getWorkorderFiles();
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

        function queueDeletedNotes(note) {
            if (typeof vm.deletedNotes === 'undefined') {
                vm.deletedNotes = {};
                vm.deletedNotes[note.id] = note;
                vm.deletedNotes.length = 1;
            } else if (typeof vm.deletedNotes[note.id] === 'undefined') {
                vm.deletedNotes[note.id] = note;
                vm.deletedNotes.length++;
            } else if (vm.deletedNotes[note.id]) {
                for(var key in vm.deletedNotes) {
                    var deleteNote = vm.deletedNotes[key];
                    if (deleteNote.id === note.id) {
                        delete vm.deletedNotes[key];
                        vm.deletedNotes.length--;
                    }
                }
            }
        }

        function deleteNotes() {
            return WorkorderNoteService.api().deleteNotes({
                notes: vm.deletedNotes
            }, function(data) {
                vm.workorderNotes = data.notes;
                vm.deletedNotes = {};
            }, function(err) {
                console.error(err);
            });
        }

        function getWorkorderFiles() {
			return FileService.api().getFiles({
				id: vm.workorder.id
			}, function(data) {
				vm.workorderFiles = data.workorderFiles;
			}, function(err) {
				$log.error(err);
			});
		}

        $scope.$watch('vm.reloadNotes', function(prev, next) {
            getNotes();
            getWorkorderFiles();
            vm.reloadNotes = false;
        }, []);
    }
})();