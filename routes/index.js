var express = require('express');
var router = express.Router();

// other modules
var createLeague = require("./createLeague");
var createLeagueView = require("./createLeagueView");
var createLeagueRules = require("./createLeagueRules");
var createLeagueRulesView = require("./createLeagueRulesView");
var findLeague = require("./findLeague");
var findLeagueView = require("./findLeagueView");
var manageLeagueView = require("./manageLeagueView");
var loginView = require("./loginView");
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('homeView', {user: req.user});
});

router.get('/createLeagueView', createLeagueView);
router.post('/createLeague', createLeague);
router.get('/createLeagueRuleView', ensureAuthenticated, createLeagueRulesView);
router.post('/createLeagueRules', createLeagueRules);
router.get('/findLeagueView', findLeagueView);
router.get('/findLeague', findLeague);
router.get('/manageLeagueView', ensureAuthenticated, manageLeagueView);
router.get('/loginView', loginView);


//router.get('/login', function(req, res){
//    res.render('loginView', { user: req.user });
//});

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
        res.render('homeView', { user: req.user });
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