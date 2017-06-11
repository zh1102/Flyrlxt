var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session')

var index = require('./routes/index');
var login=require('./routes/login')
var sigin=require('./routes/sigin');
var operate=require('./routes/operate')
var upload=require('./routes/upload')
var changeOf = require('./routes/changeOf')
var lx=require('./routes/lx')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(express.favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//使用靠就这个中间件 seession
app.use(session({
	secret:'752068487',
	name:'zhapp', //这里是设置coonkie的name
	cookie:{maxAge:1000*60*60}, //设置maxAge是8000ms
	resave:false,
	saveUninitialized:true,
	secure:false
}))
	

app.use('/index', index);
app.use('/loginUp',login);
app.use('/register',sigin)
app.use('/operate',operate)
app.use('/upload',upload)
app.use('/lx',lx)
app.use('/changeOf',changeOf)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
app.listen('8005',function(){
	console.log('启动中....');
})
module.exports = app;
