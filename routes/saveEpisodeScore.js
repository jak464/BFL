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

    var leagueId = req.params.leagueId;
    var episodeId = req.params.episodeId;

    var episodeScoreModel = [];
    var contestantsModel = [];
    var leagueRulesModel = [];

    console.log(req.body);

    async.series([
            function(callback) {

                var i = 1;
                var episodeScoringArray = [];

                // req.body will have 1 to many ruleName/rulePoints
                // loop through to push it to a rule array so we can create the league rule document for insertion
                while(true) {
                    var contestant = null;
                    var leagueRule = null;


                    contestant = req.body["contestants"+i];
                    leagueRule = req.body["leagueRules"+i]


                    if(contestant || leagueRule) {
                        episodeScoringArray.push(new EpisodeScore({episodeId: episodeId, leagueRule: leagueRule, contestant: contestant}));
                        i++;
                    }
                    else {
                        break;
                    }
                }

                var insertCounter = 0;
                console.log(episodeScoringArray);
                for(var i in episodeScoringArray) {
                        // save the episode scoring document and render the view when done
                        episodeScoringArray[i].save(function(err) {
                        insertCounter++;
                    });
                }
                episodeScoreModel = episodeScoringArray;

                callback();

            }

        // GO FROM EPISODE SCORING --> then you need to select ALL of the contestant.
        // i think that you should...... uh......sigh.......uhmm......ok......so you save all the episode scores
        // i think you have to select all the league rules based on the leagueRuleId and then using that
        // you have to loop through the ...... episodeScoringTable and like.... create the contestant score object
        // based off of the ........ episodeId
        // why is

        // you basically need to do an IN MEMORY JOIN OF LeagueRule and Episode Scoring based on LeagueRuleId

        // once you have that, you can like loop through that combined object, rule points on this and um......
        // build up this object so its like........ for each episodeId and each contestantId, add on the rule points that you get.
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
                    console.log('The leagueId ' + leagueId);

                    console.log('The leagueRulesModel ' + leagueRulesModel);


                    var leagueRuleIdToPoints = [];
                    for (var i in leagueRulesModel) {
                        console.log('i  ' + i);
                        console.log('leagueRUleModel subbi ' + leagueRulesModel[i].leagueRuleId);
                        console.log('leagueRUleModel rule points ' + leagueRulesModel[i].rulePoints);
                        leagueRuleIdToPoints[leagueRulesModel[i].leagueRuleId] = leagueRulesModel[i].rulePoints;
                    }

                    console.log('The leagueRuleIdToPoints ' + leagueRuleIdToPoints[leagueRulesModel[0].leagueRuleId]);

                    // join leagueRuleModels and episodeScoring
                    episodeScoreModel = episodeScoreModel.map(function(episode) {
                        episode.rulePoints = leagueRuleIdToPoints[episode.leagueRule];
                        return episode;
                    });
                    console.log('The ep score model ' + episodeScoreModel[0]);


                    var contestantScores = [];
                    for (var i in episodeScoreModel) {
                        if (!contestantScores[episodeScoreModel[i].contestant]) {
                            contestantScores[episodeScoreModel[i].contestant] = episodeScoreModel[i].rulePoints;
                        } else {
                            contestantScores[episodeScoreModel[i].contestant] += episodeScoreModel[i].rulePoints;
                        }
                    }
                    console.log('contestantSCores' + contestantScores);


                    var contestantScoreModel = [];
                    for (var i in contestantScores) {
                        contestantScoreModel.push(new ContestantScore({
                            contestantScore: contestantScores[i],
                            contestantId: i,
                            episodeId: episodeId
                        }));
                    }

                    console.log('contestantScoreModel' + contestantScoreModel);


                    for (var i in contestantScoreModel) {
                        contestantScoreModel[i].save();
                    }

                    callback();

                });
            }], function (err) {
            res.render('homeView', {
                contestants: contestantsModel,
                leagueRules: leagueRulesModel,
                leagueId: leagueId,
                user: req.user
            });
        }
    );
};

