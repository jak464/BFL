// this module will create the admin's league rules
// it will create the the rules associated with the league Id

var DB = require('../schemaDb');
var League = DB.getLeagueModel();
var LeagueRule = DB.getLeagueRulesModel();

module.exports =
    function createLeagueRules(req , res) {
        var i = 0;
        var ruleArray = [];

        // req.body will have 1 to many ruleName/rulePoints
        // loop through to push it to a rule array so we can create the league rule document for insertion
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
            // save the league rules and render the view when done
            ruleArray[i].save(function(err) {
                insertCounter++;
                if (insertCounter == numRules) {
                    res.render("homeView", {user: req.user});
                }
            });
        }

    }