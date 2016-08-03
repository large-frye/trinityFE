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

        .filter('inspectionType', function() {
            return function(type) {
                switch(type) {
                    case 0:
                        return 'Ladder Assist w/ Report';
                    case 1:
                        return 'Expert Inspection';
                    case 5:
                        return 'Ladder Assist';
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
        })

        .filter('dateField', ['$filter', function($filter) {
            return function (str, item, field) {
                if (typeof str === 'undefined')
                    return str;

                if (field.key.match(/date/) !== null) {
                    var date = new Date(item[field.key]);

                    if (isNaN(date.getTime())) {
                        date = new Date(item[field.key].replace(' ', 'T'));
                    }
                    var filteredDate = $filter('date')(date, 'MMM dd, yyyy');
                    
                    if (filteredDate.match(/1969/) !== null)
                        return '';

                    return filteredDate;
                }

                return str;
            };
        }])

        .filter('ucFirst', function() {
            return function(str) {
                if (typeof str === 'undefined' || str === null)
                    return str;

                return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
             };
        });
})();
