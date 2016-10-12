// this module returns the complete list of bachelor fantasy leagues
// so that the user will have the ability to join the league in the view

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