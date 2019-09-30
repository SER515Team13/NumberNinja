const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

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

/*
 Below the the server code to control email sending to user
*/
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send(
    'Number Ninja'
  );
});

app.post('/sendmail', (req, res) => {
  console.log('request came');
  let currentUser = req.body;
  sendMail(currentUser, info => {
    console.log('The mail has been sent and the message id is ${info.messageId}');
    res.send(info);
  });
});

async function sendMail(currentUser, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptionsAccepted = {
    from: "'Number Ninja'<numberninjateam13@gmail.com>", // sender address
    to: currentUser.email, // list of receivers
    subject: 'Welcome to Number Ninja !!!', // Subject line
    html: `<h1>Hi ${currentUser.name}</h1><br>
    <h4>Thanks for joining us</h4>
    <h4>~ Number Ninja Admin Team</h4>`
  };

  let mailOptionsRejected = {
    from: "'Number Ninja'<numberninjateam13@gmail.com>", // sender address
    to: currentUser.email, // list of receivers
    subject: 'We are Sorry !!!', // Subject line
    html: `<h1>Hi ${currentUser.name}</h1><br>
    <h4>You have not be authorized for requested role. Thanks for trying, Hope to see you again.</h4>
    <h4>~ Number Ninja Admin Team</h4>`
  };

  // send mail with defined transport object
  let info = currentUser.requestAccepted ? await transporter.sendMail(mailOptionsAccepted) : await transporter.sendMail(mailOptionsRejected);

  callback(info);
}