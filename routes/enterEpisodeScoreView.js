var async = require('async')
var DB = require('../schemaDb');
var BachelorContestant = DB.getBachelorContestantModel();
var LeagueRule = DB.getLeagueRulesModel();
var League = DB.getLeagueModel();
var Episode = DB.getEpisodeModel();
var EpisodeScore = DB.getEpisodeScoringModel();

// select the rules, contestant score for the specific episode ID
/* the structure of episode map will loop like
 episodeScore is like =
 {League Rule, Contestant, Episode Id},
 {League Rule, Contestant, Episode Id} */
module.exports = function getSetEpisodeScore(req, res) {

    // need to return existing data
    // but also need to return drop downs for contestant and league rules for new inputted data.

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


















     /*



    ])


        res.render('enterEpisodeScoreView',
            {episodeScores: episodeScoreModel,
             user: req.user,});
    });
}

    var leagueName;
    var contestantsModel = [];
    var episodes = [];
    var leagueRulesModel = [];
    var episodeMap = [];

    async.series([
            // get the episode score
            function (callback) {
                EpisodeScore.findOne({episodeId: req.params.episodeId}, function (err, episodeScores) {
                    if (err) return callback(err);

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


                // question michael - do i even need that map anymore now that i have the individual episode
                // i dont really need the episode number anymore i dont believe

                
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
                    // and umm so that's it */

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



/*




 */