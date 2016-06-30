(function () {
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

        .filter('showMeta', function () {
            return function (array, search) {
                if (typeof array !== 'undefined') {
                    var data = array.filter(function (item) {
                        return item.key === search;
                    })[0];

                    if (typeof data !== 'undefined') {
                        return data.value;
                    } else {
                        return 'No data';
                    }
                } else {
                    return 'No data';
                }
            };
        })
        .filter('newOrders', function () {
            return function (items) {
                console.log(items);
            };
        })
        .filter('cancelledOrders', function () {
            return function (items) {
                console.log(items);
            };
        })
        .filter('replace', function () {
            return function (str, match, replace) {
                var regex = new RegExp(match, 'g');
                return str.replace(regex, replace);
            };
        })

        .filter('genReportLink', function() {
            return function (str, type) {
                console.log(str, type);
                return str;
            };
        })

        .filter('customOrder', function () {
            return function (items, order) {
                if (typeof items !== 'undefined') {
                    items.sort(function (a, b) {
                        if (a.display_order > b.display_order) {
                            return 1;
                        }
                        if (b.display_order > a.display_order || (a.display_order === null || b.display_order === null)) {
                            return -1;
                        }

                        return 0;
                    });
                }
                return items;
            };
        });
})();