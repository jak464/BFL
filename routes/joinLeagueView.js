// this module will return a view for the league member to join a league.

var DB = require('../schemaDb');
var LeagueRules = DB.getLeagueRulesModel();

module.exports =
    function joinLeagues(req , res){
        var leagueId = req.params.id;

        LeagueRules.find({leagueId: leagueId}, function(err , leagueRules){
            if(err) {
                console.log("Error : %s ",err);
            }
            var results = leagueRules.map(function (leagueRule){
                return {
                    leagueRule: leagueRule.leagueRule,
                    rulePoints: leagueRule.rulePoints
                }
            });
            res.render('joinLeagueView',
                {data: results,
                 user: req.user,
                 id: leagueId});
        });

    };