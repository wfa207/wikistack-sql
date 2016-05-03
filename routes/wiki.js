var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

(function(obj) {
	obj.get('/users', function(req, res, next) {

	});

	obj.get('/', function(req, res, next) {
		Page.findAll()
		.then(function(result) {
			console.log(result);
			res.render('index', {
				wikis: result,
			});
		}).catch(next);
	});

	obj.post('/', function(req, res, next) {
		// STUDENT ASSIGNMENT:
		// add definitions for `title` and `content`

		var page = Page.build({
			title: req.body.title,
			content: req.body.content,
			status: req.body.status || Page.status.defaultValue,
		});

		var user = User.build({
			name: req.body.name,
			email: req.body.email,
		});

		user.save();

		// STUDENT ASSIGNMENT:
		// make sure we only redirect *after* our save is complete!
		// note: `.save` returns a promise or it can take a callback.
		page.save()

		.then(function(result) {
			console.log(res.json(result));
		});
	});

	// res.redirect('/wiki/add');
	// });

	obj.get('/add', function(req, res, next) {
		res.render('addpage');
	});

	obj.get('/:title', function(req, res, next) {
		var title = req.params.title;
		Page.findOne({
			where: {
				title: title
			}
		}).then(function(result) {
			res.render('wikipage', {
				title: result.title,
				content: result.content,
				date: result.date,
			});
		}).catch(next);
	});


})(router);

module.exports = router;