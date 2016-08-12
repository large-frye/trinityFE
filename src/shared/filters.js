(function() {
	'use strict';

	var NEW_INSPECTION = 1;
	var CALLED_PH = 2;
	var ALERT = 3;
	var SCHEDULED = 4;
	var SENT = 5;
	var INVOICED = 6;
	var NEW_PICKUP = 7;
	var RESCHEDULE = 8;
	var IN_PROCESS = 9;
	var ON_HOLD = 10;
	var INSPECTION_COMPLETED = 11;
	var PRE_INVOICE = 12;
	var INSPECTOR_ATTENTION_REQUIRED = 13;
	var OFFICE_ATTENTION_REQUIRED = 14;
	var CLOSED = 15;
	var CANCELLED = 16;
	var CLOSED_CANCELLED = 17;
	var INSPECTED = 18;
	var REPORTING = 19;
	var INVOICE_ALACRITY = 20;
	var INVOICING = 21;

	/* Filters */
	angular.module('trinity.filters.shared', [])
		.filter('outcomeType', function() {
			return function(outcomeType) {
				switch (outcomeType) {
					case 0:
						{
							return 'Basic Inspection';
						}
					case 1:
						{
							return 'Expert Inspection';
						}
					case 2:
						{
							return 'Engineer Report';
						}
					case 3:
						{
							return 'Allstate (NCT) Ladder Assist';
						}
					case 4:
						{
							return 'Allstate (Alacrity) Ladder Assist';
						}
					case 5:
						{
							return 'Ladder Assist';
						}
				}
			};
		})

	.filter('customAlert', function() {
		return function(alert) {
			if (typeof alert === 'undefined')
				return alert;

			var alerts = alert.split('_');
			var end = '';
			alerts.forEach(function(item) {
				end += item.substr(0, 1).toUpperCase() + item.substr(1, item.length) + ' ';
			});
			return end.substr(0, end.length - 1);
		};
	})

	.filter('inspectionType', function() {
		return function(type) {
			switch (type) {
				case 0:
					return 'Ladder Assist w/ Report';
				case 1:
					return 'Expert Inspection';
				case 5:
					return 'Ladder Assist';
			}
		};
	})

	.filter('getStatus', function() {
		return function(status) {
			console.log(status);
			if (typeof status === 'undefined')
				return status;



			switch (status) {
        case NEW_INSPECTION:
          return 'New Inspection';
        case CALLED_PH:
          return 'Called PH';
        case ALERT:
          return 'Alert';
        case SCHEDULED:
          return 'Scheduled';
        case SENT:
          return 'Sent';
        case INVOICED:
          return 'Invoiced';
        case NEW_PICKUP:
          return 'New Pickup';
        case RESCHEDULE:
          return 'Reschedule';
        case IN_PROCESS:
          return 'In Process';
        case ON_HOLD:
          return 'On Hold';
        case INSPECTION_COMPLETED:
          return 'Inspection Completed';
        case PRE_INVOICE:
          return 'Pre-Invoice';
      	case INSPECTOR_ATTENTION_REQUIRED:
          return 'Inspector Attention Required';
      	case OFFICE_ATTENTION_REQUIRED:
          return 'Office Attention Required';
      	case CLOSED:
          return 'Closed';
      	case CANCELLED:
          return 'Cancelled';
      	case CLOSED_CANCELLED:
          return 'Closed Cancelled';
      	case INSPECTED:
          return 'Inspected';
      	case REPORTING:
          return 'Reporting';
      	case INVOICE_ALACRITY:
          return 'Invoice Alacrity';
      	case INVOICING:
          return 'Invoicing';
			}
		};
	})

	.filter('showMeta', function() {
			return function(array, search) {
				if (typeof array !== 'undefined') {
					var data = array.filter(function(item) {
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
				var regex = new RegExp(match, 'g');
				return str.replace(regex, replace);
			};
		})

	.filter('genReportLink', function() {
		return function(str, type) {
			console.log(str, type);
			return str;
		};
	})

	.filter('customOrder', function() {
		return function(items, order) {
			if (typeof items !== 'undefined') {
				items.sort(function(a, b) {
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
		return function(str, item, field) {
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
