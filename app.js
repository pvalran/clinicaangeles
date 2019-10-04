var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* authenticate
*  var passport   = require('passport')
*  var session    = require('express-session')
*  var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

npm i -S express sequelize mysql2
npm i -S body-parser cookie-parser cors express-validator
npm i -S jsonwebtoken bcrypt
npm i -D typescript @types/bcrypt @types/body-parser @types/cookie-parser @types/cors @types/es6-promise @types/express @types/express-validator @types/jsonwebtoken @types/node @types/sequelize
npm i -g npx

*/



var agendaRtr = require('./routes/agenda');
var catmasterRtr = require('./routes/catmaster');
var consultaRtr = require('./routes/consulta');
var direccionRtr = require('./routes/direccion');
var medicamentoRtr = require('./routes/medicamento');
var personaRtr = require('./routes/persona');
var recetaRtr = require('./routes/receta');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/agenda',agendaRtr);
app.use('/api/catmaster',catmasterRtr);
app.use('/api/consulta',consultaRtr);
app.use('/api/direccion',direccionRtr);
app.use('/api/medicamento',medicamentoRtr);
app.use('/api/persona',personaRtr);
app.use('/api/receta',recetaRtr);


/*app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});*/

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
