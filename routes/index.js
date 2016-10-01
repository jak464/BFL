var express = require('express');
var router = express.Router();

// other modules
var createLeague = require("./createLeague");
var findLeague = require("./findLeague");
var manageLeague = require("./manageLeague");
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('homeView');
});

router.get('/createLeague', createLeague);
router.get('/findLeague', findLeague);
router.get('/manageLeague', ensureAuthenticated, manageLeague);

router.get('/login', function(req, res){
    res.render('loginView', { user: req.user });
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authenticating, Google will redirect the
//   user back to this application at /auth/google/return
router.get('/auth/google',
    passport.authenticate('google'),
    function(req, res) {
        res.redirect('/');
    });

// GET /auth/google/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/return',
    passport.authenticate('google'),
    function(req, res) {
        res.redirect('/manageLeague');
    });

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}