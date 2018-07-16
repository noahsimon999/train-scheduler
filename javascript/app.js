
// Initialize Firebase and change the values of the config values with your own Firebase config values.
var config = {
    apiKey: "AIzaSyDyOw4ErjQao7BZlzRHjXPpcBKOUKN0QNs",
    authDomain: "train-scheduler-d9a6c.firebaseapp.com",
    databaseURL: "https://train-scheduler-d9a6c.firebaseio.com",
    projectId: "train-scheduler-d9a6c",
    storageBucket: "train-scheduler-d9a6c.appspot.com",
    messagingSenderId: "666674586878"
  };
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Variables (SET the first set IN FIREBASE FIRST)
// Note remember to create these same variables in Firebase!
var trainName = "";
var destination = "";
var frequency = "";
var arrival = "";
var minsAway = "";
var trainTime = "";


$("#btn-add").click(function(){
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    var addTrain = $(".form-control").val().trim();
    if (addTrain === "") {
        return false;
    }
    else {
        document.forms["inputForm"].reset();
    }

});

$(document).keydown(function (e) {
    var key_one = 13;
   
    if (e.keyCode == key_one) {
      event.preventDefault();
   
      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      trainTime = $("#trainTime").val().trim();
      frequency = $("#frequency").val().trim();
    
      database.ref().push({
        name: trainName,
        destination: destination,
        time: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    
      var addTrain = $(".form-control").val().trim();
        if (addTrain === "") {
            return false;
        }
        else {
            document.forms["inputForm"].reset();
        }
    }
});

database.ref().on("child_added", function(childSnapshot) {
    var trainName  = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;
    
    var timeConverted = moment(time, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    console.log("The current time is: " + moment(currentTime).format("hh:mm"));
    var difference = moment().diff(moment(timeConverted), "minutes");
    var remainder = difference % frequency;
    var minutesAway = frequency - remainder;
    console.log(minutesAway);
    var arrivalTime = moment().add(minutesAway, "minutes");

    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().trainTime);
    console.log(childSnapshot.val().frequency);

    $(".table-data").prepend(
        "<tr><td>" + childSnapshot.val().trainName + "</td>" +
        "<td>" + childSnapshot.val().destination + "</td>" +
        "<td>" + childSnapshot.val().frequency + "</td>" +
        "<td>" + moment(arrivalTime).format("HH:mm") + "</td>" +
        "<td>" + minutesAway + "</td></tr>"
    );

});