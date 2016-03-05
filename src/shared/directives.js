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
					return link.replace(/\/#/, '') === $route.current.$$route.originalPath;
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

				console.log('using this');

				$scope.handleClick = function(disabled, $event) {
					if (disabled) {
						$event.preventDefault();
					}
				};
			},
			templateUrl: 'src/partials/shared/sidebar.html'
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
