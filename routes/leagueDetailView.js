// this module returns score details and members of a selected league

var DB = require('../schemaDb');
var League = DB.getLeagueModel();
var LeagueMember = DB.getLeagueMemberModel();
var LeagueRule = DB.getLeagueRulesModel();


var async = require('async')

module.exports =
    function displayLeagueDetail(req, res) {
        var id = req.params.id;
        var leagueMemberModel = [];
        var leagueRulesModel = [];
        var leagueName;
        var leagueOwner;

        // query leaguePlayers by leagueId - display the player name and the score
        async.series([
                // get the league
                function (callback) {
                    League.findById(id, function (err, league) {
                        if (err)
                            console.log("Error Selecting : %s ", err);
                        if (!league) {
                            return res.render('404View');
                        }
                        else {
                            leagueName = league.leagueName;
                            leagueOwner = league.leagueOwner;
                        }
                    });
                    callback();

                },
                // returns all of the league rules
                function (callback) {
                    LeagueRule.find({leagueId: id}, function (err, leagueRules) {
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
                },
                // get the league members associated to the league
                function (callback) {
                    LeagueMember.find({leagueId: id}, function (err, leagueMembers) {
                        if (err) return callback(err);

                        leagueMemberModel = leagueMembers.map(function (leagueMember) {
                            return {
                                leagueMemberName: leagueMember.leagueMemberName,
                                leagueMemberScore: leagueMember.leagueMemberScore
                            };
                        });

                        callback();
                    }).sort({leagueMemberScore: 'descending'});
                }], function (err) {
                res.render('leagueDetailView', {
                    leagueMembers: leagueMemberModel,
                    leagueName: leagueName,
                    leagueOwner: leagueOwner,
                    leagueRules: leagueRulesModel,
                    user: req.user
                });
            }
        );
    };

