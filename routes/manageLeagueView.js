// this module will display the episode list for the league for the manage view page
// the admin clicks the episode from the view to enter details about the episode score

var async = require('async');
var DB = require('../schemaDb');
var League = DB.getLeagueModel();
var Episode = DB.getEpisodeModel();

module.exports = function displayEpisodeList(req, res) {

    var leagueId;
    var leagueName;
    var episodesModel = [];

    async.series([
            // get the league of the current user
            function (callback) {
                League.findOne({leagueOwner: req.user._id}, function (err, league) {
                    if (err) return callback(err);

                    leagueId = league._id;
                    leagueName = league.leagueName;
                    callback();
                });
                // get the episodes associated to the league
            }, function (callback) {
                Episode.find({leagueId: leagueId}, function (err, episodes) {
                    if (err) return callback(err);

                    episodesModel = episodes.map(function (episode) {
                        return {
                            id: episode._id,
                            episodeNumber: episode.episodeNumber
                        };
                    });

                    callback();
                });
            }], function (err) {
            // return the manageLeagueView displaying the episodes associated to the league
            res.render('manageLeagueView', {
                episodes: episodesModel,
                leagueId: leagueId,
                leagueName: leagueName,
                user: req.user
            });
        }
    );
};

/* League.findOne({leagueOwner: req.user._id}, function (err, league) {
 if(err) {
 console.log("Error : %s ",err);
 }
 var league = league.map(function (contestant){
 return {
 id: contestant._id,
 name: contestant.name,
 occupation: contestant.occupation,
 age: contestant.age,
 description: contestant.description
 }
 });
 res.render('draftPicksView',
 {data: results,
 user: req.user,
 leagueMemberId: leagueMemberId});

 }); */


/*
 // select all rules, for all contestants for all episodes
 module.exports = function manageLeague(req, res) {

 var leagueId;
 var leagueName;
 var contestantsModel = [];
 var episodes = [];
 var leagueRulesModel = [];
 var episodeMap = [];

 async.series([
 // get the league of the current user
 function (callback) {
 League.findOne({leagueOwner: req.user._id}, function (err, league) {
 if (err) return callback(err);

 leagueId = league._id;
 leagueName = league.leagueName;

 callback();
 });
 // use the league ID to get the associated episodes to the league
 }, function (callback) {
 Episode.find({leagueId: leagueId}, function (err, episodesResult) {
 if (err) return callback(err);

 episodes = episodesResult;
 for (var i in episodesResult) {
 episodeMap[episodesResult[i].episodeNumber] = [];
 }

 callback();
 });
 // get the episode score records for the episode where ep.epId = score.epId
 }, function (callback) {
 var episodeIds = episodes.map(function(e) {
 return e._id;
 });

 EpisodeScore.find({episodeId: {$in: episodeIds}}, function (err, scores) {

 // creating property called episodeNumber
 // we populate this by searching the episodes that have the same episode as the score
 scores = scores.map(function(score) {
 score.episodeNumber = episodes.filter(function(e) {
 return e._id = score.episodeId;
 }).map(function(e) {
 return e.episodeNumber;
 })[0];
 });

 // map of episode numbers and each array element will contain an array of episode scores
 // so basically on UI, loop through episode map so you can loop through the numbers and
 // within each number, loop through the episode scores
 for (var score in scores) {
 episodeMap[score.episodeNumber].push(score);
 }
 /* the structure of episode map will loop like
 episodeMap = [
 1: [
 {League Rule, Contestant, Episode Id},
 {League Rule, Contestent, Episode Id}
 ],
 2: [{League Rule, Contestent, Episode Id}],
 3: [{League Rule, Contestent, Episode Id}]
 ];
 */// when displaying on table - match up which rule ID to select, which contestant to select
// and umm so that's it
/*
 if (err) return callback(err);

 callback();
 });
 }, function (callback) {
 BachelorContestant.find({}, function (err, contestants) {
 if (err) return callback(err);

 contestantsModel = contestants.map(function (contestant) {
 return {
 id: contestant._id,
 name: contestant.name
 }
 });

 callback();
 });
 }, function (callback) {
 console.log(leagueId);

 LeagueRule.find({leagueId: leagueId}, function (err, leagueRules) {
 if (err) return callback(err);

 console.log(leagueRules);

 leagueRulesModel = leagueRules.map(function (leagueRule) {
 return {
 leagueRuleId: leagueRule._id,
 leagueRule: leagueRule.leagueRule,
 rulePoints: leagueRule.rulePoints
 }
 });

 callback();

 });
 }], function (err) {
 res.render('manageLeagueView', {
 contestants: contestantsModel,
 episodeRuleMap: episodeMap,
 leagueRules: leagueRulesModel,
 leagueId: leagueId,
 leagueName: leagueName,
 user: req.user
 });
 }
 );
 };
 */