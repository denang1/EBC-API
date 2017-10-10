var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const dbUtil = require('./utils/db/db-util');
const statsController = require('./controllers/statsController')(dbUtil);
const statsRouter = require('./routers/statsRouter')({statsController: statsController});
const riderController = require('./controllers/riderController')(dbUtil);
const riderRouter = require('./routers/riderRouter')({riderController});
const middleware = require('./middleware/index')({});

app.use(middleware.authenticateRequest);
app.use('/riders', riderRouter);
app.use('/stats', statsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
