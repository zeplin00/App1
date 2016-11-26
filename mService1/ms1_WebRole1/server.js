// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var MongoStore = require('connect-mongo')(session);

var httpsOnly = function(req, res, next) {

    // This is a hack.
    // Fix to correctly set: req.headers['x-forwarded-proto'] and req.headers['x-forwarded-for']

    if(req.headers['x-arr-ssl'] || req.headers['x-iisnode-https'] === 'on') {
      // This is an https connection. Call the next handler
      next();
    } else {
      // This is an http connection. Redirect if this is not development
      if (process.env.NODE_ENV && process.env.NODE_ENV != 'development') {
        return res.redirect(301, 'https://' + req.get('host') + req.url);
      } else {
        next();
      }
    }
};

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// Redirect http connections
app.use(httpsOnly);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
     url: configDB.sessionUrl
    }),
    secret: 'arandommseeedforsigningggcookiessss'
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
