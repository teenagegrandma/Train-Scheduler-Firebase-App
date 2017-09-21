// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBVNP3vvd6uIBOC9u4bzLEMVWo8wIXROsg",
    authDomain: "train-scheduler-d36de.firebaseapp.com",
    databaseURL: "https://train-scheduler-d36de.firebaseio.com",
    projectId: "train-scheduler-d36de",
    storageBucket: "train-scheduler-d36de.appspot.com",
    messagingSenderId: "86956385493"
  };

  firebase.initializeApp(config);

  var trainFire = firebase.database();

  //add train
  $("#add-train-btn").on("click", function() {
  	
  	//user input for train data
  	var trainName = $("#train-name-input").val().trim();
  	var destination = $("#destination-input").val().trim();
  	var firstTrainTime = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  	var frequency = $("#frequency-input").val().trim();

  	//new train data object
  	var newTrain = {

  		name: trainName,
  		destination: destination,
  		firstTrain: firstTrainTime,
  		frequency: frequency
  	};

  	//train data pushed to firebase database
  	trainFire.ref().push(newTrain);

  	//console.log it, baby
  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(firstTrainTime);
  	console.log(newTrain.frequency);

  	//don't block pop ups, because your train has been added!
  	alert("Your train can now be viewed in the table.");

  	//clearing the form
  	$("#train-name-input").val("");
  	$("#destination-input").val("");
  	$("#first-train-input").val("");
  	$("#frequency-input").val("");

  	return false;
  });

  //removing train
  $("body").on("click", ".remove-train", function() {
  	$(this).closest ('tr').remove();
  	getKey = $(this).parent().parent().attr('id');
  	dataRef.child(getKey).remove();
  });

  //firebase interaction
  trainFire.ref().on("child_added", function(childSnapshot, prevChildKey) {

  	console.log(childSnapshot.val());

  	//store information in variables
  	var tName = childSnapshot.val().name;
  	var tDest = childSnapshot.val().destination;
  	var tFreq = childSnapshot.val().frequency;
  	var tFirstTrain = childSnapshot.val().firstTrain;

  	//determining the arrival times
  	var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  	var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFreq;
  	var tMinutes = tFreq = tRemainder;

  	//adding the minutes to the current time
  	var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  	//log it
  	console.log(tMinutes);
  	console.log(tArrival);
  	console.log(moment().format("hh:mm A"));
  	console.log(tArrival);
  	console.log(moment().format("X"));

  	var freq = parseInt(freq);
  	var currentTime = moment();
  		console.log("Current time: " + moment().format("HH:mm"));
  	var dConverted = moment(childSnapshot.val().time, "HH:mm").subtract(1, "years");
  		console.log("Date converted: " + dConverted);
  	var trainTime = moment(dConverted).format("HH:mm");
  		console.log("Train time: " + trainTime);

  	//current time display
  	$("#currentTime").text(currentTime);
  	//log train data into the table
  	$("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" + tFreq + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  });

  