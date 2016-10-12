// this module saves the contestants that the league
// member has drafted. the league member should draft 5 picks

var DB = require('../schemaDb');
var Contestant = DB.getBachelorContestantModel();
var DraftPick = DB.getDraftPickModel();


var saveDraftPick = function(draftPick, index, length, callback) {
    draftPick.save(function (err) {
        if (index == length - 1) {
            callback();
        }
    });
}

module.exports = function saveDraftPicks(req , res){
    var leagueMemberId = req.params.memberId;
    console.log(leagueMemberId);

    for(var i in req.body.selectBox) {
        var draftPick = new DraftPick({
            leagueMemberId : leagueMemberId,
            contestantId : req.body.selectBox[i]
        });

        saveDraftPick(draftPick, i, req.body.selectBox.length, function() {
            res.render("homeView", {user: req.user});
        });
    }
};