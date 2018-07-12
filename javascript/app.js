
// Initialize Firebase and change the values of the config values with your own Firebase config values.
var config = {
    apiKey: "AIzaSyDjxLo-PPsSsfcCfLx2CHs8oc_Gmo92SzM",
    authDomain: "chatapp-8abc7.firebaseapp.com",
    databaseURL: "https://chatapp-8abc7.firebaseio.com",
    projectId: "chatapp-8abc7",
    storageBucket: "chatapp-8abc7.appspot.com",
    messagingSenderId: "106645640951"
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

    database.ref().set({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
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
    
      database.ref().set({
        name: trainName,
        destination: destination,
        time: trainTime,
        frequency: frequency
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

database.ref().on("value", function(snapshot) {
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().trainTime);
    console.log(snapshot.val().frequency);

    $(".table-data").append(
        "<tr><td>" + snapshot.val().trainName + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        "<td>" + snapshot.val().trainTime + "</td>" +
        "<td>" + snapshot.val().frequency + "</td></tr>"
    );

});