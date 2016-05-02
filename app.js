var express = require('express');
var app = express();
var makesRouter = require('./routes');
var swig = require('swig');

app.engine('html', swig.renderFile());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({cache: false});
app.use('/', makesRouter);

app.listen(1337, function() {
	console.log('Listening on', 1337);
});

