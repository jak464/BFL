// this module returns existing episodeScore details
// but will also allow the admin to input new episodeScore data into the form


var async = require('async')
var DB = require('../schemaDb');
var BachelorContestant = DB.getBachelorContestantModel();
var LeagueRule = DB.getLeagueRulesModel();
var Episode = DB.getEpisodeModel();
var EpisodeScore = DB.getEpisodeScoringModel();


module.exports = function getSetEpisodeScore(req, res) {

    var leagueId = req.params.leagueId;
    var episodeId = req.params.episodeId;
    var episodeNumber;
    var episodeScoreModel = [];
    var contestantsModel = [];
    var leagueRulesModel = [];


    async.series([
        // get all of the episode scores for the leagueID and the episodeId - this will return existing data
        function(callback) {
            EpisodeScore.find({episodeId: episodeId}, function (err, episodeScores) {
                if (err) {
                    console.log("Error : %s ", err);
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
        // returns the specific episode in context
        function(callback) {
            Episode.findOne({_id: episodeId}, function (err, episode) {
                if (err) {
                    console.log("Error : %s ", err);
                }
                episodeNumber = episode.episodeNumber;

                callback();
            });
        },
        // returns all of the contestants which will be used for new episode score forms
        function (callback) {
                BachelorContestant.find({}, function (err, contestants) {
                    if (err) return callback(err);

                    contestantsModel = contestants.map(function (contestant) {
                        return {
                            id: contestant._id,
                            name: contestant.name
                        };
                    });

                    callback();
                });
            },
            // returns all of the league rules which will be used for new episode score forms
            function (callback) {
                LeagueRule.find({leagueId: leagueId}, function (err, leagueRules) {
                    if (err) return callback(err);

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
            res.render('enterEpisodeScoreView', {
                episodeScores: episodeScoreModel,
                episodeNumber: episodeNumber,
                episodeId: episodeId,
                contestants: contestantsModel,
                leagueRules: leagueRulesModel,
                leagueId: leagueId,
                user: req.user
            });
        }
    );
};
