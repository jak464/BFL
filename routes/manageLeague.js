/**
 * Created by jackie on 10/11/16.
 */

var DB = require('../schemaDb');
var League = DB.getLeagueModel();
var Episode = DB.getEpisodeModel();
var BachelorContestant = DB.getBachelorContestantModel();
var LeagueRule = DB.getLeagueRulesModel();
var EpisodeScore = DB.getEpisodeScoringModel();


// here the goal is to save the episode scoring objects based on 
// what the admin entered
// they sent the contestant - rule in ONE row
// they are sending multiple rows
// how do we parse what they are sending and save it to the DB. 


// we need to loop through the managei objects and get 

// in order to get episode ID 
// loop through all the episodes that are returned from the fetch method



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
