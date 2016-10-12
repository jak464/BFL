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
    description: "Whitney is a nurse at a great hospital"
})
bachelorContestant.save();

bachelorContestant = new BachelorContestant({
    name: "Lauren Hussey",
    occupation: "Programmer",
    age: 30,
    description: "Lauren Hussey is the world's greatest programmer"
})
bachelorContestant.save();

bachelorContestant = new BachelorContestant({
    name: "Leila Pari",
    occupation: "Politican",
    age: 23,
    description: "Leila Pari is going to make america average again"
})
bachelorContestant.save();

bachelorContestant = new BachelorContestant({
    name: "Kristina Schulman",
    occupation: "Olympic Swimmer",
    age: 24,
    description: "Kristina is going to be the first woman to medal in doggy paddle"
})
bachelorContestant.save();

bachelorContestant = new BachelorContestant({
    name: "Elizabeth Whitelaw",
    occupation: "Teacher",
    age: 28,
    description: "Elizabeth is a former Astrophysicist teaching English to 1st graders"
})
bachelorContestant.save();

bachelorContestant = new BachelorContestant({
    name: "Jasmine Goode",
    occupation: "Cheerleader",
    age: 23,
    description: "Jasmine Goode is a cheerleader for the Dallas Cowboys. She can do the splits"
})
bachelorContestant.save();

bachelorContestant = new BachelorContestant({
    name: "Tommi Lou",
    occupation: "Youtuber",
    age: 21,
    description: "Tommi Lou has her own reality web series on Youtube"
})
bachelorContestant.save();

bachelorContestant = new BachelorContestant({
    name: "Regina Pham",
    occupation: "Stuffed Animal",
    age: 2,
    description: "Regina likes to be the cutest stuffed animal that ever lived"
})
bachelorContestant.save();

bachelorContestant = new BachelorContestant({
    name: "Emma Smith",
    occupation: "Mother",
    age: 57,
    description: "Emma is recently divorced trying to get back into the dating game"
})
bachelorContestant.save();