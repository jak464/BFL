// this module returns score details and members of a selected league

var DB = require('../schemaDb');
var League = DB.getLeagueModel();

module.exports =
    function displayLeagueDetail(req, res) {
        var id = req.params.id;

        // once we have the scoring data, we also want to display
        // the league member Ids associated to that league and their score

        // query leaguePlayers by leagueId - display the player name and the score

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

