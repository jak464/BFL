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


var ownerModel = null;
var leagueModel = null;
var leagueMemberModel = null;
var leagueRulesModel = null;


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
            console.log("Creating connection and league player model...");
            connection = mongoose.createConnection(dbUrl);

        }
        leagueRulesModel = connection.model("LeagueRulesModel", leagueRulesSchema);
        return leagueRulesModel;
    }
}
