/**
 * Created by jackie on 10/4/16.
 */
var DB = require('./schemaDb');
var BachelorContestant = DB.getBachelorContestantModel();

var bachelorContestant;

bachelorContestant = new BachelorContestant({
    name: "Whitney Fransway",
    occupation: "Nurse",
    age: 25,
    description: "Unknown"
})
bachelorContestant.save();

bachelorContestant = new BachelorContestant({
    name: "Lauren Hussey",
    occupation: "Nurse",
    age: 30,
    description: "Unknown"
})
bachelorContestant.save();

bachelorContestant = new BachelorContestant({
    name: "Leila Pari",
    occupation: "Nurse",
    age: 23,
    description: "Unknown"
})
bachelorContestant.save();

bachelorContestant = new BachelorContestant({
    name: "Kristina Schulman",
    occupation: "Nurse",
    age: 24,
    description: "Unknown"
})
bachelorContestant.save();

bachelorContestant = new BachelorContestant({
    name: "Elizabeth Whitelaw",
    occupation: "Nurse",
    age: 24,
    description: "Unknown"
})
bachelorContestant.save();


bachelorContestant = new BachelorContestant({
    name: "Jasmine Goode",
    occupation: "Cheerleader",
    age: 24,
    description: "Unknown"
})
bachelorContestant.save();