var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var auth = require('./routes/auth');
var category = require('./routes/category');
var post = require('./routes/post');

app.use(passport.initialize());

app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/post', post);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Create a connection to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/blog-app', {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(()=> console.log('Connection successful'))
.catch((err) => console.error(err));

module.exports = app;
