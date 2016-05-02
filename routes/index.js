var express = require('express');
var bodyParser = require('body-parser');
var router = express.router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.use(express.static('public'));

(function(obj) {
	obj.use('/', function(req, res, next) {
		console.log(req.method, req.url);
		next();
	});

	router.get('/', function(req, res, next) {
		res.render('index', {
			title: 'Wiki',
			content: 'Yo',
		});
	});

})(router);

module.exports = router;