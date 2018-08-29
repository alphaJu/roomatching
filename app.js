var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var evalRouter = require('./routes/eval');
var infoRouter = require('./routes/information');
var messageRouter = require('./routes/message');
var mainRouter = require('./routes/main');
var zzimRouter = require('./routes/zzim');
var matchingRouter = require('./routes/matching');
var recommendRouter = require('./routes/recommend');

//var php = require('express-php');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine('php', phpExpress.engine);
//app.set('view engine', 'php');
//app.all(/.+\.php$/, phpExpress.router);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(cookieParser());
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/index', indexRouter);
app.use('/customer', usersRouter);
app.use('/eval', evalRouter);
app.use('/information', infoRouter);
app.use('/message', messageRouter);
app.use('/zzim', zzimRouter);
app.use('/matching', matchingRouter);
app.use('/recommend', recommendRouter);
app.use('/', mainRouter);

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
//  res.render('error');
});

module.exports = app;
