// this module will return the createLeagueRulesView for
// the admin to enter league rules and points for their created league

module.exports =
    function findLeague(req , res){
        res.render('createLeagueRulesView', {
            user: req.user
        });
    };
