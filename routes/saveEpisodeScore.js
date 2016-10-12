// save episode score - epId, leagueRule, contestant
// once episode scoring is saved --> we update contestant score with epId
// once we save contestant score, take where leaguePlayers in that league have draftPick.contestant = contestantScore

var async = require('async')
var DB = require('../schemaDb');
var EpisodeScore = DB.getEpisodeScoringModel();
var BachelorContestant = DB.getBachelorContestantModel();
var ContestantScore = DB.getContesantScoreModel();
var LeagueRule = DB.getLeagueRulesModel();
var League = DB.getLeagueModel();
var Episode = DB.getEpisodeModel();

module.exports = function saveEpisodeScore(req, res) {

    // these two params come from the UI
    var leagueId = req.params.leagueId;
    var episodeId = req.params.episodeId;

    var episodeScoreModel = [];
    var contestantsModel = [];
    var leagueRulesModel = [];

    async.series([
            function(callback) {
                EpisodeScore.find({episodeId: req.params.episodeId}, function (err, episodeScores) {
                    if (err) {
                        console.log("Error : %s ", err);
                    }


                    // if an episode score episode exists already - then we update the values
                    // is there any way to make this read only and only return read only data so we don't have to deal with
                    // need to find where contestant = contestant then update. this seems like a really bad idea



                    // if an episode score does not exist for the episode Id, we create episode score documents
                    if(!episodeScores) {
                        // loop through selectBoxContestant & selectBoxLeagueRule
                        // push it to an array
                        // create the objects
                        // after the objects are created
                        // we need to aggregate by the contestant and update contestant score for the episode id
                        // after we update the contestant score, we need to update the leaguePlayer score based on their draft picks
                    }


                    episodeScoreModel = episodeScores.map(function (episodeScore) {
                        return {
                            id: episodeScore._id,
                            episodeId: episodeScore.episodeId,
                            leagueRule: episodeScore.leagueRule,
                            contestant: episodeScore.contestant
                        }
                    });
                    callback();
                });
            },
            function (callback) {
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
                leagueRules: leagueRulesModel,
                leagueId: leagueId,
                user: req.user
            });
        }
    );
};

