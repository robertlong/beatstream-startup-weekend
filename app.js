var express = require('express'),
    passport = require('passport'),
    util = require('util'),
    RdioStrategy = require('passport-rdio').Strategy,
    Rdio = require('./lib/rdio');

var RDIO_API_KEY = "k4aq4c3qmxtda3kcr7n585e4";
var RDIO_SHARED_SECRET = "R8dzhymNy8";

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Rdio profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the RdioStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Rdio profile), and
//   invoke a callback with a user object.
passport.use(new RdioStrategy({
    consumerKey: RDIO_API_KEY,
    consumerSecret: RDIO_SHARED_SECRET,
    callbackURL: "/auth/rdio/callback"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      profile.token = token;
      profile.secret = tokenSecret;

      // To keep the example simple, the user's Rdio profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Rdio account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

var app = express.createServer();

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

// GET /auth/rdio
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Rdio authentication will involve redirecting
//   the user to rdio.com.  After authorization, Rdio will redirect the user
//   back to this application at /auth/rdio/callback
app.get('/auth/rdio',
  passport.authenticate('rdio'),
  function(req, res){
    // The request will be redirected to Rdio for authentication, so this
    // function will not be called.
});

// GET /auth/rdio/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/rdio/callback',
  passport.authenticate('rdio', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/api/search', apiEnsureAuthenticated, function(req, res) {
  console.log(req.user);

  var rdio = new Rdio([RDIO_API_KEY, RDIO_SHARED_SECRET],[req.user.token, req.user.secret]);

  rdio.call('search', {
    query: req.param('query'),
    types: 'Track'
  }, function(err, data){
    if (err) {
      res.send({error: err});
    } else {
      res.send(data);
    }
  });
});

app.listen(process.env.PORT || 3000);

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

function apiEnsureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send({error: 'Not Authenticated'});
}
