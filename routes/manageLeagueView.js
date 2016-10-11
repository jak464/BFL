var async = requre('async')
var DB = require('../schemaDb');
var BachelorContestant = DB.getBachelorContestantModel();
var LeagueRule = DB.getLeagueRulesModel();
var League = DB.getLeagueModel();
var Episode = DB.getEpisodeModel();
var EpisodeScore = DB.getEpisodeScoringModel();

// select all rules, for all contestants for all episodes
module.exports = function manageLeague(req, res) {

    var leagueId;
    var contestantsModel;
    var episodes;
    var leagueRules;

    async.series([
            function (callback) {
                League.findOne({leagueOwner: req.user._id}, function (err, league) {
                    if (err) return callback(err);

                    leagueId = league._id;

                    callback();
                });
            }, function (callback) {
                Episode.find({leagueId: leagueId}, function (err, episodesResult) {
                    if (err) return callback(err);

                    episodes = episodesResult;

                    callback();
                });
            }, function (callback) {
                var episodeIds = episodes.map(function(e) {
                    return e._id;
                });

                EpisodeScore.find({episodeId: episodeIds}, function (err, scores) {

                    // we have the episode from the previous function
                    // now that we have the scores, we put the episode# on the score itself
                    // because we need the episode # to display on the UI.
                    // to do that we loop through the scores, add CREATING property called episodeNumber
                    // and set that equal to the particular episode that is equal to the episode iD on the score


                    // creating property called episodeNumber
                    // we populate this by searching the episodes that have the same episode as the score

                    scores = scores.map(function(score) {
                       score.episodeNumber = episodes.filter(function(e) {
                           return e._id = score.episodeId;
                       }).map(function(e) {
                           return e.episodeNumber;
                       })[0];
                    });

                    var episode;
                    for (var i = 0; i < episodes.length; i++) {
                        if (episodes[i].episodeId == 234234) {
                            episode = episodes[i];
                        }
                    }

                    // map of episode numbers and each array element will contain an array of episode scores
                    // so basically on UI, loop through episode map so you can loop through the numbres and
                    // within each number, loop through the episode scores
                    var episodeMap = [];
                    for (var score in scores) {
                        episodeMap[score.episodeNumber].push(score);
                    }
                    /*
                        episodeMap = [
                            1: [
                                {League Rule, Contestent, Episode Id},
                                {League Rule, Contestent, Episode Id}
                            ],
                            2: [{League Rule, Contestent, Episode Id}],
                            3: [{League Rule, Contestent, Episode Id}]
                        ];
                     */// when displaying on table - match up which rule ID to select, which contestant to select
                    // and umm so that's it

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
                LeagueRule.find({leagueId: leagueId}, function (err, leagueRules) {
                    if (err) return callback(err);

                    leagueRules = leagueRules.map(function (leagueRule) {
                        return {
                            leagueRule: leagueRule.leagueRule,
                            rulePoints: leagueRule.rulePoints
                        }
                    });

                });
            }], function (err) {
            res.render('manageLeagueView', {
                data: contestantsModel,
                user: req.user
            });
        }
    );
};
