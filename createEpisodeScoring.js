/**
 * Created by jackie on 10/12/16.
 */
/**
 * Created by jackie on 10/4/16.
 */
var DB = require('./schemaDb');
var EpisodeScoring = DB.getEpisodeScoringModel();

var episodeScoring;

episodeScoring = new EpisodeScoring({
    episodeId: '57fd8c1fdae1307aecac7e3a',
    leagueRule: '57fd8c2cdae1307aecac7e3f',
    contestant: '57fda0e5c540392e2a87a763'
});
episodeScoring.save();

episodeScoring = new EpisodeScoring({
    episodeId: '57fd8c1fdae1307aecac7e3a',
    leagueRule: '57fd8c2cdae1307aecac7e3f',
    contestant: '57fda0e5c540392e2a87a768'
});
episodeScoring.save();

episodeScoring = new EpisodeScoring({
    episodeId: '57fd8c1fdae1307aecac7e3a',
    leagueRule: '57fd8c2cdae1307aecac7e40',
    contestant: '57fda0e5c540392e2a87a766'
});
episodeScoring.save();
