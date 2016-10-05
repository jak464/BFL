/**
 * Created by jackie on 10/4/16.
 */


var DB = require('../schemaDb');
var League = DB.getLeagueModel();

// this is where i want to display all the members and the score

module.exports =
    function displayLeagueDetail(req, res) {
        var id = req.params.id;

        League.findById(id, function (err, league){
            if(err)
                console.log("Error Selecting : %s ", err);
            if (!league) {
                return res.render('404View');
            }
            else {
                res.render('leagueDetailView', {
                    leagueName: league.leagueName,
                    leagueOwner: league.leagueOwner,
                    user: req.user
                });
            }
        });
    };

