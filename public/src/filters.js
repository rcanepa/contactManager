angular.module('ContactsApp')
	.filter('labelCase', function(){
		return function(input){
			input = input.replace(/([A-Z])/g, ' $1'); // pick an uppercased letter an put an empty space before it
			return input[0].toUpperCase() + input.slice(1);
		};
	});