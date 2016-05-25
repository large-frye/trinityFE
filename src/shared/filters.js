(function() {
'use strict';

   /* Filters */
    angular.module('trinity.filters.shared', [])
        .filter('outcomeType', function () {
            return function (outcomeType) {
                switch (outcomeType) {
                    case 0: {
                        return 'Basic Inspection';
                    }
                    case 1: {
                        return 'Expert Inspection';
                    }
                    case 2: {
                        return 'Engineer Report';   
                    }
                    case 3: {
                        return 'Allstate (NCT) Ladder Assist';
                    }
                    case 4: {
                        return 'Allstate (Alacrity) Ladder Assist';
                    }
                    case 5: {
                        return 'Ladder Assist';
                    }
                }
            };
        })
        
        .filter('showMeta', function() {
            return function(array, search) {
                if (typeof array !== 'undefined') {
                    return array.filter(function(item) {
                        return item.key === search;
                    })[0].value;   
                } else {
                    return 'No data';
                }
            };
        })
        .filter('newOrders', function() {
            return function(items) {
                console.log(items);     
            };
        })
        .filter('cancelledOrders', function() {
            return function(items) {
                console.log(items);     
            };
        })
        .filter('replace', function() {
            return function(str, match, replace) {
                return str.replace(match, replace);      
            };
        });
})();