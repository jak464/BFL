/**
 * Created by jackie on 10/2/16.
 */
var DB = require('../schemaDb');
var League = DB.getLeagueModel();
var LeagueRule = DB.getLeagueRulesModel();

module.exports =
    function createLeagueRules(req , res) {
        var i = 0;
        var ruleArray = [];

        while(true) {
            var leagueRule = null;
            var rulePoints = null;

            if(i == 0) {
                leagueRule = req.body.ruleName;
                rulePoints = req.body.rulePoints;
            }
            else {
                leagueRule = req.body["ruleName"+i];
                rulePoints = req.body["rulePoints"+i]
            }

            if(leagueRule || rulePoints) {
                ruleArray.push(new LeagueRule({leagueRule: leagueRule, rulePoints: rulePoints, leagueId: req.params.leagueId}));
                i++;
            }
            else {
                break;
            }
        }

        var insertCounter = 0;
        var numRules = ruleArray.length;
        for(var i in ruleArray) {
            ruleArray[i].save(function(err) {
                insertCounter++;
                if (insertCounter == numRules) {
                    res.render("homeView", {user: req.user});
                }
            });
        }

    }
// run through all the parameters and get them 2 at a time

/**
 * var arr = // array of objects;
 res = [];

 arr.forEach(function (item) {
    item.save(function (err) {
        res.push(err);
        if (res.length === arr.length)
        {
            // Done
        }
    });
});
 */
