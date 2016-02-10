(function() {
	'use strict';

	angular.module('shared.directives', [])

	.directive('navbar', ['accountService', 'UserFactory', function(accountService, UserFactory) {
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			link: function ($scope, elem, attrs) {

				// Make sure user is still validated
				accountService.signIn(function(data) {
					console.log(data);

				}, function(err) {
					if ($scope.user) {
						localStorage.removeItem('user');
						UserFactory.user.clear();
					}
				});

			},
			templateUrl: 'src/app/shared/partials/header.html'
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
						console.log('here');
	                    // Real bad, hack not a good idea
	                    angular.element('.content-wrapper')
	                        .addClass('no-margin-left');

	                    return;
	                }

	                return true;
	            };
			},
			templateUrl: 'src/app/shared/partials/sidebar.html'
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
		}
	}])
})();
