/**
 * Created by frye on 9/21/15.
 */
(function (angular) {

    'use strict';

    angular.module('shared.services', ['ngResource'])

            .service('UserFactory', [function () {
            return {
                user: {
                    set: function (user) {
                        this.user = user;
                    },
                    get: function () {
                        return this.user;
                    },
                    clear: function () {
                        this.user = '';
                    }
                }
            };
        }
            ]
            );

}(angular));
