const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const stylus = require('stylus');
require('express-async-errors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const patchRouter = require('./routes/patch');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Stylus 기본값 설정
function compile(str, path) {
  return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .define('DEFAULT_FONT', 'NanumSquare')
      .define('SUB_FONT', 'Nanum Barun Gothic')
      .define('MOBILE_RESPONSIVE', new stylus.Parser('640px').peek().val)
      .define('TABLET_RESPONSIVE', new stylus.Parser('1024px').peek().val)
}

// Stylus 를 CSS 로 컴파일하는 미들웨어
app.use(stylus.middleware({
  src: path.join(__dirname, 'public'),
  force: true,
  compile: compile
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/patch', patchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(res.locals.error)

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
