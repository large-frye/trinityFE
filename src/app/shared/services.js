/**
 * Created by frye on 9/21/15.
 */
(function () {
  'use strict';
  angular.module('shared.services', ['ngResource'])
    .service('trinityFactory', ['$resource',
      function () {
        return {
          "sidebar": false
        }
      }
    ])
})()
