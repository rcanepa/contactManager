angular.module('ContactsApp')
	.factory('Contact', function($resource){
		return $resource('/api/Contact/:id', { id: '@id'}, { 
			'update': { method: 'PUT' }
		});
	});