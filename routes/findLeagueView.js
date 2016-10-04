/**
 * Created by jackie on 10/2/16.
 */
module.exports =
    function findLeague(req , res){
        res.render('findLeagueView', {
            user: req.user});
    };