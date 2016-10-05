/**
 * Created by jackie on 10/2/16.
 */

var DB = require('../schemaDb');
var League = DB.getLeagueModel();

module.exports =
    function displayLeagues(req , res){
        League.find({}, function(err , leagues){
            if(err) {
                console.log("Error : %s ",err);
            }

            var results = leagues.map(function (league){
                return {
                    id: league._id,
                    leagueName: league.leagueName,
                    leagueOwner: league.leagueOwner
                }
            });
            res.render('findLeagueView',
                {data: results,
                user: req.user});
        });

    };