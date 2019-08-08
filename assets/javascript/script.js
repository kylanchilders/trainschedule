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

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainTime = moment($("first-train-time-input").val().trim(), "HH:mm");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: trainTime,
    frequency: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;

  // Prettify the train time
  var trainTimePretty = moment(trainTime).format("HH:mm");

  // To calculate the next arrival
  var trainArrival = moment().diff(moment(trainTime), "minutes");

  // Calculate the Minutes Away
  var trainMinutesAway = trainArrival * trainFreq;

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainTimePretty),
    $("<td>").text(trainArrival),
    $("<td>").text(trainArrival),
    $("<td>").text(trainMinutesAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
