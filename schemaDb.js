/**
 * Created by jackie on 10/1/16.
 */
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
var Schema = mongoose.Schema;
var dbUrl = 'mongodb://127.0.0.1:27017/bachFantasyLeagueDB';
var connection = null;

mongoose.Promise = global.Promise;

var ownerUserSchema = new Schema({
    emailAddress: String,
});

ownerUserSchema.plugin(findOrCreate);

var leagueSchema = new Schema({
    leagueName: String,
    leagueOwner: String
});

var leagueMemberSchema = new Schema({
    leagueMemberName: String,
    leagueId: String,
    leagueMemberScore: Number
});

var leagueRulesSchema = new Schema({
    leagueRule: String,
    leagueId: String,
    rulePoints: Number
});

var bachelorContestantSchema = new Schema({
    name: String,
    occupation: String,
    age: Number,
    description: String
});

var draftPickSchema = new Schema({
    contestant: String,
    leagueMemberName: String
});

var episodeSchema = new Schema({
    leagueId: String,
    episodeNumber: Number
});

var episodeScoringSchema = new Schema({
    episodeId: String,
    leagueRule: String,
    contestant: String
});

var contestantScoreSchema = new Schema({
    //i'm unsure of the whole scoring schema
    contestantScore: String,
    episodeId: String
});


var ownerModel = null;
var leagueModel = null;
var leagueMemberModel = null;
var leagueRulesModel = null;
var bachelorContestantModel = null;
var draftPickModel = null;
var episodeModel = null;
var episodeScoringModel = null;
var contestantScoreModel = null;

module.exports = {
    getOwnerModel: function getModel() {
        if (connection == null) {
            console.log("Creating connection and owner model...");
            connection = mongoose.createConnection(dbUrl);
        }
        ownerModel = connection.model("OwnerModel", ownerUserSchema);
        return ownerModel;
    },
    getLeagueModel: function getModel() {
        if (connection == null) {
            console.log("Creating connection and league model...");
            connection = mongoose.createConnection(dbUrl);
        }
        leagueModel = connection.model("LeagueModel", leagueSchema);
        return leagueModel;
    },
    getLeagueMemberModel: function getModel() {
        if (connection == null) {
            console.log("Creating connection and league player model...");
            connection = mongoose.createConnection(dbUrl);
        }
        leagueMemberModel = connection.model("LeagueMemberModel", leagueMemberSchema);
        return leagueMemberModel;
    },
    getLeagueRulesModel: function getModel() {
        if (connection == null) {
            console.log("Creating connection and league rules model...");
            connection = mongoose.createConnection(dbUrl);
        }
        leagueRulesModel = connection.model("LeagueRulesModel", leagueRulesSchema);
        return leagueRulesModel;
    },
    getBachelorContestantModel: function getModel() {
        if (connection == null) {
            console.log("Creating connection and bachelor contestants model...");
            connection = mongoose.createConnection(dbUrl);
        }
        bachelorContestantModel = connection.model("BachelorContestantModel", bachelorContestantSchema);
        return bachelorContestantModel;
    },
    getDraftPickModel: function getModel() {
        if (connection == null) {
            console.log("Creating connection and draft pick model...");
            connection = mongoose.createConnection(dbUrl);
        }
        draftPickModel = connection.model("DraftPickModel", draftPickSchema);
        return draftPickModel;
    },
    getEpisodeModel: function getModel() {
        if (connection == null) {
            console.log("Creating connection and episode model...");
            connection = mongoose.createConnection(dbUrl);
        }
        episodeModel = connection.model("EpisodeModel", episodeSchema);
        return episodeModel;
    },
    getEpisodeScoringModel: function getModel() {
        if (connection == null) {
            console.log("Creating connection and episode scoring model...");
            connection = mongoose.createConnection(dbUrl);
        }
        episodeScoringModel = connection.model("EpisodeScoringModel", episodeScoringSchema);
        return episodeScoringModel;
    },
    getContesantScoreModel: function getModel() {
        if (connection == null) {
            console.log("Creating connection and episode scoring model...");
            connection = mongoose.createConnection(dbUrl);
        }
        contestantScoreModel = connection.model("ContestantScoreModel", contestantScoreSchema);
        return contestantScoreModel;
    }

}
