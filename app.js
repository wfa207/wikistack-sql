var express = require('express');
var app = express();
var wikiRouter = require('./routes/wiki');
var swig = require('swig');
var models = require('./models');
var Page = models.Page;
var User = models.User;

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));


swig.setDefaults({cache: false});
app.use('/wiki', wikiRouter);

User.sync({ force: true })
.then(function () {
	return Page.sync( {force: true} );
})
.then(function () {
	app.listen(3001, function () {
		console.log('listening on ' + 3001);
	});
})
.catch(console.error);

// app.listen(1337, function() {
// 	console.log('Listening on', 1337);
// });