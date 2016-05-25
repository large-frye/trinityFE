/* global angular */

(function(angular) { angular.module('trinity.inspections', [
	'trinity.inspections.controllers.inspect',
	'trinity.controllers.admin.processing',
	'trinity.inspections.services',
	'trinity.controllers.inspections.admin.form',
	'trinity.controllers.inspections.admin.photos',
	'trinity.controllers.inspections.admin.generate',
	'trinity.controllers.inspections.admin.invoice'
]);}(angular));
