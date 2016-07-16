(function() {
'use strict';

    angular
        .module('trintiy.services.inspections.workorderNote', ['ngResource'])
        .service('WorkorderNoteService', WorkorderNoteService);

    WorkorderNoteService.$inject = ['$resource', 'env'];
    function WorkorderNoteService($resource, env) {
        this.api = api;
        
        ////////////////

        function api() { 
            var pattern = '/:type/workorders/notes/:action/:id';
            var url = env.getEndpoint() + pattern;

            return $resource(url, {}, {
                getNotes: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin'
                    },
                    withCredentials: true
                },
                saveNote: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        action: 'save'
                    },
                    withCredentials: true
                },
                saveAlertNote: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'shared',
                        action: 'save'
                    },
                    withCredentials: true
                },
                deleteNotes: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        action: 'delete'
                    },
                    withCredentials: true
                }
            });
        }
    }
})();