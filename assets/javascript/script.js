// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCSFyEkZBZxMwwRIhYdzy5iUj0csBkZG7c",
    authDomain: "traintime-5f52d.firebaseapp.com",
    databaseURL: "https://traintime-5f52d.firebaseio.com",
    projectId: "traintime-5f52d",
    storageBucket: "traintime-5f52d.appspot.com",
    messagingSenderId: "752797005431",
    appId: "1:752797005431:web:703dc14d47da4e45"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    var currentTime = moment().format('LT');

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainTime = $("#first-train-time-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();

  console.log(trainTime);

  // Uploads train data to the database
  database.ref().push({
    trainName: trainName,
    trainDest: trainDest,
    trainTime: trainTime,
    trainFreq: trainFreq
  });

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(snapshot) {
  if(snapshot.val() != null){

  var currentTrain = snapshot.val();
  var trainTimeMoment = moment(currentTrain.trainTime, "HH:mm");
  var trainFreq = Number(currentTrain.trainFreq);
  var trainArrival = trainTimeMoment.clone();

  for(var i = 1; trainArrival.isBefore(moment()); i++){
    trainArrival.add(trainFreq, "m")
  };

  var timeAway = trainArrival.fromNow();
  

  // Create the new row
  var row = $("<tr>");
    row.append("<td>" + snapshot.val().trainName + "</td>");
    row.append("<td>" + snapshot.val().trainDest + "</td>");
    row.append("<td>" + trainFreq + "</td>");
    row.append("<td>" + trainArrival.format("h:mm a") + "</td>")
    row.append("<td>" + timeAway + "</td>");
    $("tbody").append(row);
  }

});