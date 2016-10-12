/**
 * Created by jackie on 10/2/16.
 */
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
            
            if(results.length < 0) {
                res.render('createLeagueView', {
                    user: req.user});
            }
            else {
                res.render('leagueAlreadyCreatedView', {
                    user: req.user});
            }
        })
    };
