/**
 * Created by jackie on 10/4/16.
 */
/**
 * Created by jackie on 10/4/16.
 */
var DB = require('../schemaDb');
var Contestant = DB.getBachelorContestantModel();

module.exports =
    function displayLeagues(req , res){

            res.render('draftPicksView');


    };