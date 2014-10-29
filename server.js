var express = require('express'),
	api = require('./api.js'),
	app = express();

app
	.use(express.static('./public'))
	.use('/api', api) // using the api from api.js
	.get('*', function(req, res){
		res.sendfile('public/main.html');
	})
	.listen(3000);