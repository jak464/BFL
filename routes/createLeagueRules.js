/**
 * Created by jackie on 10/2/16.
 */
var DB = require('../schemaDb');
var League = DB.getLeagueModel();
var LeagueRules = DB.getLeagueRulesModel();

module.exports =
    function createLeagueRules(req , res) {
        var name = req.body;

        League.findOne({"leagueOwner" : req.user._id},function (err, league) {
            if (err) return handleError(err);
            console.log(league._id);
        });

    }
// run through all the parameters and get them 2 at a time

/**
 * var arr = // array of objects;
 res = [];

 arr.forEach(function (item) {
    item.save(function (err) {
        res.push(err);
        if (res.length === arr.length)
        {
            // Done
        }
    });
});
 */
