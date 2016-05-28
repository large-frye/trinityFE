(function() {
	'use strict';

	angular.module('shared.directives', [])

	.directive('navbar', ['accountService', 'UserFactory', '$location', function(accountService, UserFactory, $location) {
		return {
			restrict: 'E',
			scope: {
				user: '=',
				options: '='
			},
			link: function ($scope, elem, attrs) {
				// no content as of yet.
			},
			templateUrl: 'src/partials/shared/header.html'
		};
	}])

	.directive('sidebar', ['$location', '$route', function($location, $route) {
		return {
			restrict: 'E',
			scope: {
				options: '='
			},
			link: function ($scope, elem, attrs)  {
				$scope.activeLink = function(link) {
					return link === location.pathname + location.hash;
				};

				$scope.hide = function() {
	                if ($location.url().match(/account/) === null) {
	                    // Real bad, hack not a good idea
	                    angular.element('.content-wrapper')
	                        .addClass('no-margin-left');

	                    return;
	                }

	                return true;
	            };

				$scope.handleClick = function(disabled, $event) {
					if (disabled) {
						$event.preventDefault();
					}
				};
			},
			templateUrl: 'src/partials/shared/sidebar.html'
		};
	}])

	.directive('alacrityForm', [ function() {
		return {
			restrict: 'E',
			scope: {
				form: '=',
				outcomeType: '='
			},
			link: function($scope, elem, attrs) {

			},
			templateUrl: 'src/partials/shared/alacrity-form.html'
		};
	}])
	
	.directive('basicForm', ['$interval', 'formFactory', function($interval, formFactory) {
		return {
			restrict: 'E',
			scope: {
				form: '=',
				outcomeType: '='
			},
			link: function($scope, el, attrs) {
				$scope.windFraudInput = formFactory.getFraudInput();
				$scope.windRoofPeeledBack = formFactory.getRoofPeeledBack();
				$scope.hailInput = formFactory.getHailInput();
				$scope.hailSize = formFactory.getHailSize();
				$scope.metalDamage = formFactory.getMetalDamage();
				$scope.collateralDamages = formFactory.getCollateralDamages();
				
				var interval = $interval(function() {
					var $select = $('.select2-multiple');
					if ($select.length > 0) {
						$select.select2();
						$interval.cancel(interval);
					}
				}, 10);
			},
			templateUrl: 'src/partials/shared/basic-form.html'
		};
	}])

	.directive('datatable', ['$timeout', '$rootScope', function($timeout, $rootScope) {
		return {
			restrict: 'E',
			scope: {},
			transclude: true,
			link: function($scope, elem, attrs) {
				// Datatable init
				$(function() {

				});

				$rootScope.$on('DATA LOADED', function() {
					$timeout(function() {
						angular.element('#example1').DataTable({
							pagingType: 'full_numbers'
						});
					});
				});
			},
			template: '<ng-transclude></ng-transclude>'
		};
	}]);
})();
