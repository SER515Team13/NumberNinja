var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();

const MongoDBConnectionString = 'mongodb+srv://Sukhpreet:Sukhpreet@numberninjadatabase-xl9uv.mongodb.net/UsersDB?retryWrites=true&w=majority'; 
const CorsOrigin = 'http://localhost:4200';

// Connect to MongoDB database using mongoose
mongoose.connect(MongoDBConnectionString);
mongoose.connection.once('open', function() {
  console.log('Connection to database has been made!');
}).on('error', function(error) {
  console.log('Connection error: ',error);
})

// Use cross origin resource sharing
app.use(cors({
  origin: CorsOrigin
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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