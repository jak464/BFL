/**
 * Created by jackie on 10/4/16.
 */
var DB = require('../schemaDb');
var Contestant = DB.getBachelorContestantModel();

module.exports =
    function displayLeagues(req , res){
        var leagueMemberId = req.params.memberId;

        Contestant.find({}, function(err , contestants){
            if(err) {
                console.log("Error : %s ",err);
            }
            var results = contestants.map(function (contestant){
                return {
                    name: contestant.name,
                    occupation: contestant.occupation,
                    age: contestant.age,
                    description: contestant.description
                }
            });
            res.render('draftPicksView',
                    {data: results,
                    user: req.user,
                    leagueMemberId: leagueMemberId});
        });

    };