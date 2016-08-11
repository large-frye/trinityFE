(function() {
	'use strict';

	angular
		.module('trinity.shared.services.setting', [])
		.service('SettingService', SettingService);

	SettingService.$inject = ['$resource', 'env'];

	function SettingService($resource, env) {
		var url = env.getEndpoint() + '/admin/settings/:opt/:action';
		this.api = api;

		function api() {
			return $resource(url, {}, {
				bulkUpload: {
					method: 'POST',
					headers: {
						'Content-Type': undefined
					},
					params: {
						opt: 'categories',
						action: 'bulk-upload'
					},
					withCredentials: true
				},
				createExcel: {
					method: 'GET',
					headers: {
						'Conent-Type': 'application/json'
					},
					params: {
						opt: 'categories',
						action: 'create-excel'
					},
					withCredentials: true
				}
			});
		}

	}
})();
