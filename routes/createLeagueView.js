// this module returns a view for the admin to
// create a league. An admin can only have one league
// so if one exists already, then it renders a view that tells
// the admin they already have a view and they should go to manage it

var DB = require('../schemaDb');
var League = DB.getLeagueModel();

module.exports =
    function createLeague(req , res){
        League.find({leagueOwner: req.user._id}, function(err, leagues) {
            if(err) {
                console.log("Error : %s ", err);
            }

            var results = leagues.map(function (league){
                return {
                    id: league._id
                }
            });
            console.log(!results.length);
            if(results.length == 0) {
                res.render('createLeagueView', {
                    user: req.user});
            }
            else {
                res.render('leagueAlreadyCreatedView', {
                    user: req.user});
            }
        })
    };
