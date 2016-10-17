// this module will display the episode list for the league for the manage view page
// the admin clicks the episode from the view to enter details about the episode score

var async = require('async');
var DB = require('../schemaDb');
var League = DB.getLeagueModel();
var Episode = DB.getEpisodeModel();

module.exports = function displayEpisodeList(req, res) {

    var leagueId;
    var leagueName;
    var episodesModel = [];

    async.series([
            // get the league of the current user
            function (callback) {
                League.findOne({leagueOwner: req.user._id}, function (err, league) {
                    if (err) {
                        return callback(err);
                    }

                    // if admin clicks manage league and they haven't created one yet, display a view that indicates that
                    if(league == null) {
                        res.render('leagueNotCreatedView', {
                            user: req.user
                        });
                        return;
                    }

                    leagueId = league._id;
                    leagueName = league.leagueName;

                    callback();
                });
            },
        // get the episodes associated to the league
        function (callback) {
                Episode.find({leagueId: leagueId}, function (err, episodes) {
                    if (err) return callback(err);

                    episodesModel = episodes.map(function (episode) {
                        return {
                            id: episode._id,
                            episodeNumber: episode.episodeNumber
                        };
                    });

                    callback();
                }).sort({episodeNumber: 'ascending'});
            }], function (err) {
            // return the manageLeagueView displaying the episodes associated to the league
            if(leagueId) {
                res.render('manageLeagueView', {
                    episodes: episodesModel,
                    leagueId: leagueId,
                    leagueName: leagueName,
                    user: req.user
                });
            }


        }
    );
}; 