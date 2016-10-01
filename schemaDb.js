/**
 * Created by jackie on 10/1/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dbUrl = 'mongodb://127.0.0.1:27017/bachFantasyLeagueDB';
var connection = null;
var model = null;

mongoose.Promise = global.Promise;

var leagueSchema = new Schema({
    leagueName: String,
    leagueOwner: String,
});

module.exports = {
    getModel: function getModel() {
        if (connection == null) {
            console.log("Creating connection and model...");
            connection = mongoose.createConnection(dbUrl);
            model = connection.model("LeagueModel",
                leagueSchema);
        };
        return model;
    }
}
