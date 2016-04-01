var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/the-handiest');

var routes = require('./routes/all');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

console.log(routes.getTodo);

app.get('/', routes.index);
app.get('/todo', routes.getTodo);
app.post('/todo', routes.postTodo);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function () {
    console.log('App listening at port ' + app.get('port'));
});
