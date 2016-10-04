var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var passport = require('passport');
var GoogleOAuth2Strategy = require('passport-google-auth').Strategy;
var User = require('./schemaDb').getOwnerModel();

var app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// setup handlebars view engine
app.engine('handlebars',
    handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
var routes = require('./routes/index');
app.use('/', routes);

app.use(function(req, res) {
    res.status(404);
    res.render('404View');
});

// passport stuff
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new GoogleOAuth2Strategy({
        clientId: '196998886710-3ss4oknnivkch49uberej4ncsr0e9hj4.apps.googleusercontent.com',
        clientSecret: 'bNCsChLla_mkQqEeYGlCCNnE',
        callbackURL: 'http://localhost:3000/auth/google/return',
    },
    function(accessToken, refreshToken, profile, done) {
        // To keep the example simple, the user's Google profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Google account with a user record in your database,
        // and return that user instead.
        User.findOrCreate({emailAddress: profile.emails[0].value}, function(err, user) {
            done(null, user)
        })
    }
));

app.listen(3000, function(){
    console.log('http://localhost:3000');
});
