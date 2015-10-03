(function () {
  'use strict';
  angular.module('trinity.workOrders.services', ['ngResource'])
    .service('workOrderService', ['$resource',
      function ($resource) {
        return $resource('http://localhost:9000/workorders/:action/:param1/:param2', {
          "action": "@action"
        }, {
          "all": {
            "method": "GET",
            "headers": {
              "Accept": "application/json"
            },
            "params": {
              "action": "all"
            },
            "withCredentials": true,
            "isArray": true
          },
          "get": {
            "method": "GET",
            "headers": {
              "Accept": "application/json"
            },
            "params": {
              "action": "find"
            },
            "withCredentials": true
          },
          "counts": {
            "method": "GET",
            "headers": {
              "Accept": "application/json"
            },
            "params": {
              "action": "counts"
            },
            "withCredentials": true
          }
        })
      }
    ])
})()
