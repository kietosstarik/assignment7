$(function() {
    console.log('running');
  });
  
  $( document ).ready(function() {
    var config = {
      apiKey: "AIzaSyDLWW13FMxDVzAxKJkgzK_fZJpszMsboR4",
      authDomain: "abbyproject-fc5a9.firebaseapp.com",
      databaseURL: "https://abbyproject-fc5a9.firebaseio.com",
      projectId: "abbyproject-fc5a9",
      storageBucket: "abbyproject-fc5a9.appspot.com",
      messagingSenderId: "1077332528836"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var platform = "";
    var frequency = "";
    var lineStart = "";

    $("#submit-train").on("click", function(event){
      event.preventDefault();
      trainName = $("#nameInput").val().trim();
      destination = $("#destinationInput").val().trim();
      platform = $("#platformInput").val().trim();
      frequency = $("#freqInput").val().trim();
      lineStart = $("#startInput").val();

      var newTrain = {
        name: trainName,
        destination: destination,
        platform: platform,
        frequency: frequency,
        lineStart: lineStart
      };
  
      database.ref("Trains").push(newTrain);
    });
  
    database.ref("Trains").on("child_added", function(childSnapshot) {
      trainName = (childSnapshot.val().name);
      destination = (childSnapshot.val().destination);
      platform = (childSnapshot.val().platform);
      frequency = (childSnapshot.val().frequency);
      lineStart = (childSnapshot.val().lineStart);
  
    var lineConverted = moment(lineStart, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(lineConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var untilNext = frequency - tRemainder;
    var nextTrain = moment().add(untilNext, "minutes");
    var nextTrainDisp = moment(nextTrain).format("hh:mm a");
  
    $("#nameInput").val('');
    $("#destinationInput").val('');
    $("#platformInput").val('');
    $("#freqInput").val('');
    $("#startInput").val('');
  
    $("#current-trains").append("<tr>" +
      "<td>" + (childSnapshot.val().name) + "</td>" + 
      "<td>" + (childSnapshot.val().destination) + "</td>" + 
      "<td>" + (childSnapshot.val().platform) + "</td>" +
      "<td>" + (childSnapshot.val().frequency) + "</td>" +
      "<td>" + nextTrainDisp + "</td>" + 
      "<td>" + untilNext + "</td></tr>");

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    var hogwartsStart = "1830/09/01 11:00";
    var hogwartsFormat = "YYYY/MM/DD HH:mm";
    var hogwartsConverted = moment(hogwartsStart, hogwartsFormat);
    var hogwartsDiff = moment().diff(moment(hogwartsConverted), "minutes");
    var hogwartsRemainder = hogwartsDiff % 525952.34;
    var hUntilNext = 525952.34 - hogwartsRemainder;
    var nextHogwartsTrain = moment().add(hUntilNext, "minutes");
    var nextHogwartsDisp = moment(nextHogwartsTrain).format("hh:mm a MMM DD, YYYY");
    console.log("Next train to Hogwarts departs at: " + nextHogwartsDisp);
    $("#hogwartsTime").html(Math.round(hUntilNext));
  })