// save episode score that was passed from the enterEpisodeScoreView screen
// when we have the episode score, create contestantScore for the episode based on the leagueRule and Points
// once we save contestant score, take where leaguePlayers in that league have draftPick.contestant = contestantScore

var async = require('async')
var DB = require('../schemaDb');
var EpisodeScore = DB.getEpisodeScoringModel();
//var BachelorContestant = DB.getBachelorContestantModel();
var ContestantScore = DB.getContestantScoreModel();
var LeagueRule = DB.getLeagueRulesModel();
//var League = DB.getLeagueModel();
//var Episode = DB.getEpisodeModel();
var LeagueMember = DB.getLeagueMemberModel();
var DraftPicks = DB.getDraftPickModel();


module.exports = function saveEpisodeScore(req, res) {

    var leagueId = req.params.leagueId;
    var episodeId = req.params.episodeId;

    var episodeScoreModel = [];
    var contestantsModel = [];
    var leagueRulesModel = [];
    var leagueMembersModel = [];
    var contestantScores = [];
    var leagueMemberIds = [];
    var draftPicksModel = [];

    console.log(req.body);

    async.series([
            function (callback) {

                var i = 1;
                var episodeScoringArray = [];

                // req.body will have 1 to many contestant/leagueRules
                // loop through to push it to a episodeScoring array so we can save that to the database
                while (true) {
                    var contestant = null;
                    var leagueRule = null;

                    contestant = req.body["contestants" + i];
                    leagueRule = req.body["leagueRules" + i]

                    if (contestant || leagueRule) {
                        episodeScoringArray.push(new EpisodeScore({
                            episodeId: episodeId,
                            leagueRule: leagueRule,
                            contestant: contestant
                        }));
                        i++;
                    }
                    else {
                        break;
                    }
                }

                var insertCounter = 0;
                //console.log(episodeScoringArray);
                for (var i in episodeScoringArray) {
                    episodeScoringArray[i].save(function (err) {
                        insertCounter++;
                    });
                }
                episodeScoreModel = episodeScoringArray;

                callback();

            }
            // perform an in memory join of leagueRule and episodeScoring based on LeagueRuleId so that we can get the points to calculate contestant score
            , function (callback) {

            LeagueRule.find({leagueId: leagueId}, function (err, leagueRules) {
                if (err) return callback(err);

                leagueRulesModel = leagueRules.map(function (leagueRule) {
                    return {
                        leagueRuleId: leagueRule._id,
                        leagueRule: leagueRule.leagueRule,
                        rulePoints: leagueRule.rulePoints
                    }
                });

                // create an array of leagueRuleId as the index, and the rule points as the value
                var leagueRuleIdToPoints = [];
                for (var i in leagueRulesModel) {
                    leagueRuleIdToPoints[leagueRulesModel[i].leagueRuleId] = leagueRulesModel[i].rulePoints;
                }

                // join leagueRuleModels and episodeScoring and add an additional property of rulePoints
                episodeScoreModel = episodeScoreModel.map(function (episode) {
                    episode.rulePoints = leagueRuleIdToPoints[episode.leagueRule];
                    return episode;
                });

                // iterate through episodeScoreModel to populate the contestantScore array
                // for each unique contestant, we want to to store the cumulative score in the array's value
                contestantScores = [];
                for (var i in episodeScoreModel) {
                    if (!contestantScores[episodeScoreModel[i].contestant]) {
                        contestantScores[episodeScoreModel[i].contestant] = episodeScoreModel[i].rulePoints;
                    } else {
                        contestantScores[episodeScoreModel[i].contestant] += episodeScoreModel[i].rulePoints;
                    }
                }

                // we have the contestantScore array now, so now we can use that to iterate through the
                // array to use the values to populate a new array of contestantScoreModels that we will save to the database
                var contestantScoreModel = [];
                for (var i in contestantScores) {
                    contestantScoreModel.push(new ContestantScore({
                        contestantScore: contestantScores[i],
                        contestantId: i,
                        episodeId: episodeId
                    }));
                }

                // iterate through the contestantScoreModel array to save the contestantScoreModel documents
                for (var i in contestantScoreModel) {
                    contestantScoreModel[i].save();
                }

                callback();

            });
        },
        // return all league members associated to the league
        function (callback) {
            LeagueMember.find({leagueId: leagueId}, function (err, leagueMembers) {
                if (err) return callback(err);

                leagueMembersModel = leagueMembers;

                // create an array with leagueMember Ids which we will use when querying for draft picks
                leagueMemberIds = leagueMembersModel.map(function(leagueMember) {
                   return leagueMember._id;
                });

                callback();

            });
        },
        // return all the draft picks associated with the leagueMemberIds
        // use the draftPicks[] array to set the contestantScores
        // then use draftPicks to join leagueMember schema by leagueMemberId to set the playerScore based on contestantScore
        function (callback) {
            var draftPicks = [];

            DraftPicks.find({'leagueMemberId': { $in : leagueMemberIds}}, function (err, draftPicks) {
                if (err) {
                    console.log(err);
                    return callback(err);
                }

                draftPicksModel = draftPicks.map(function (draftPick) {
                    return {
                        contestantId: draftPick.contestantId,
                        leagueMemberId: draftPick.leagueMemberId
                    };
                });

                var draftPicks = draftPicksModel;

                // loop through draft picks, add an additional attribute of contestantScore
                // by using contestantScore[] array which has index of contestantId, and value of score
                draftPicks = draftPicks.map(function (draftPick) {
                    draftPick.contestantScore = contestantScores[draftPick.contestantId];
                    draftPick.leagueMemberId = draftPick.leagueMemberId;
                    return draftPick;
                });

                // iterate through all the league members, and then loop through draftPicks
                // if leagueMembers.leagueMemberId is equal to draftPicks.leagueMemberId,
                // then we add the contestantScore to the leagueMemberScore
                for ( var i in leagueMembersModel) {
                    for(var j in draftPicks) {
                        if(leagueMembersModel[i]._id == draftPicks[j].leagueMemberId) {
                            leagueMembersModel[i].leagueMemberScore += draftPicks[j].contestantScore;
                        }
                    }
                }



                callback();

            });
        },
         // now we need to save leagueMembersModel with the new leagueMemberScore
        function (callback) {
            for (var i in leagueMembersModel) {

                // since we're using i in an asynchronous function, we have to capture the value of i in an anonymous function
                // so that it keeps it's value
                (function(index) {
                    LeagueMember.findById(leagueMembersModel[index]._id, function(err, leagueMember) {
                        leagueMember.leagueMemberScore = leagueMembersModel[index].leagueMemberScore;
                        leagueMember.save();
                    });
                })(i);

            }

            callback();
        }
    ], function (err) {
            res.render('homeView', {
                contestants: contestantsModel,
                leagueRules: leagueRulesModel,
                leagueId: leagueId,
                user: req.user
            });
        }
    );
};

