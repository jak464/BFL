// this module will save a league member
// to a league that they have selected to join
// it will redirect them to draft their picks for the league they just joined

var DB = require('../schemaDb');
var League = DB.getLeagueModel();
var LeagueMember = DB.getLeagueMemberModel();

module.exports =
    function createLeagueMember(req , res){
        var leagueId = req.params.id;

        var leagueMember = new LeagueMember({
            leagueMemberName: req.body.leagueMemberName,
            leagueId: leagueId
        })

        leagueMember.save(function(err, member){
            if(err) {
                console.log(err);
            }
            res.redirect('/draftPicksView/'+member._id);
        });

    };