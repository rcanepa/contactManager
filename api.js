var express = require('express'),
	Bourne = require('bourne'),
	bodyParser = require('body-parser'),
	db = new Bourne('data.json'),
	router = express.Router();

// use -> middleware
router
	.use(function(req, res, next){ // to assign an userId if no user was logged in
		if (!req.user) req.user = { id: 1 };
		next();
	})
	.use(bodyParser.json())
	.route('/contact')
		.get(function(req, res){
			db.find({ userId: parseInt(req.user.id, 10)}, function(err, data){
				console.log(data);
				res.json(data);
			});
		})
		.post(function(req, res){
			var contact = req.body;
			contact.userId = req.user.id;
			db.insert(contact, function(err, data){
				res.json(data);
			});

		});

router
	.param('id', function(req, res, next){ // middleware store a query for future reuse
		req.dbQuery = { id: parseInt(req.params.id, 10) };
	})
	.route('/contact/:id')
		.get(function(req, res){
			db.findOne(req.dbQuery, function(err, data){
				res.json(data);
			});
		})
		.put(function(req, res){
			var contact = req.body;
			delete contact.$promise;
			delete contact.$resolved;
			db.update(req.dbQuery, function(err, data){
				res.json(data[0]);
			});
		})
		.delete(function(req, res){
			db.delete(req.dbQuery, function(){
				res.json(null);
			})
		});

module.exports = router;