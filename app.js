var createError = require('http-errors');
var express = require('express');
var methodOverride = require('method-override');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


//Automatic mongo connect/disconnect
require('./app_api/models/db');

var routes = require('./app_server/routes/index');
// var usersRouter = require('./app_server/routes/index');
var apiRouter = require('./app_api/routes/index');

var app = express();

app.use(bodyParser.json());
app.use(methodOverride('_method'));
// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/api', apiRouter);
app.use('/', routes);
// app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
