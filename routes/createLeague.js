// this module will create the admin's league
// it will create the 5 episodes and associate them with the league

var DB = require('../schemaDb');
var League = DB.getLeagueModel();
var Episode = DB.getEpisodeModel();

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
            
            for(var i = 1; i < 6; i ++ ) {
                var episode = new Episode({
                    leagueId: league._id,
                    episodeNumber: i
                })
                episode.save();
            }
            res.render('createLeagueRuleView', {
                user: req.user, 
                leagueId: league._id
            });
        });

    };
