/**
 * Created by jackie on 10/1/16.
 */

var DB = require('../schemaDb');
var League = DB.getLeagueModel();

module.exports =
    function createLeague(req , res){

        var league = new League({
            leagueName: req.body.leagueName,
            leagueOwner: req.user._id
        });

        league.save(function (err, league){
            if(err) {
                console.log("Error: %s ", err);
            }
            res.render('createLeagueRuleView', {
                user: req.user, 
                leagueId: league._id
            });
        });

    };
