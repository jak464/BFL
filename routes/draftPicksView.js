// this module will return a view for the league member
// to draft their 5 league picks
// it returns the contestants for selection

var DB = require('../schemaDb');
var Contestant = DB.getBachelorContestantModel();

module.exports =
    function draftPicksView(req , res){
        var leagueMemberId = req.params.memberId;

        Contestant.find({}, function(err , contestants){
            if(err) {
                console.log("Error : %s ",err);
            }
            var results = contestants.map(function (contestant){
                return {
                    id: contestant._id,
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