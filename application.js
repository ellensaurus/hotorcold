$(document).ready(function(){

	// Variable Declarations //
	var randomNumber;
	var guessFlag;
	var guessCount;
	var userChoice;
	var found = false;

	// Creating a New Game
	newGame();

	//On Submit
	$("form").submit(function(event){

		event.preventDefault();

		if (!found) {
			userChoice = $('#userGuess').val();
			console.log("User Choice = "+ userChoice);
			clearText();
			setFocus();
			guessFlag = checkChoice(userChoice);
			if (!guessFlag) {
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + userChoice + "</li>");
				guessFlag = checkTemperature(Math.abs(randomNumber - userChoice));
			};
		} else {
			setFeedback("You Won already! Let's play again!");
		};
	});

	// Create new game on click
	$(".newGame").click(function(event){
		event.preventDefault();
		newGame();
	});

	//Create a New Game
	function newGame () {
		guessFlag = true;
		guessCount = 0;
		found = false;
		$("ul#guessList li").remove();
		setFeedback("Take a guess!");
		setCount(guessCount);
		randomNumber = generateNumber();
		setFocus();
		clearText();
	}

	// Generate Random Number
	function generateNumber() {

		var generatedNumber = Math.floor((Math.random()*100)+1);
		console.log("Generated Random Number = "+ generatedNumber);

		return generatedNumber;
	}

	// Set focus to the inputbox
	function setFocus() {
		document.getElementById("userGuess").focus();
	}

	// Clear text box
	function clearText() {
		$('#userGuess').val('');
	}

	// Set guess count
	function setCount(count) {
		$('#count').text(guessCount);
	}

	// Prompt for User's Guess
	function getChoice() {
		var userChoice = prompt("Guess the Number","Your Guess");
		console.log("User Choice = "+ userChoice);
		return userChoice;
	}

	// Check if User's Guess meets the rules
	function checkChoice(userChoice) {
		if (isNaN(userChoice)) {
			setFeedback("Only numbers please!");
			return true;
		} else if (userChoice < 1 || userChoice > 100) {
			setFeedback("Please guess a number between 1 through 100!");
			return true;
		} else if ($.trim(userChoice) == '') {
			setFeedback("Please enter your guess!");
			return true;
		} else {
			return false;
		};
	}

	// Check the temperature for feedback
	function checkTemperature(guessDifference) {
		if (guessDifference == 0) {
			setFeedback("You got my number! Whoo!");
			found = true;
			return false;
		} else if (guessDifference <= 5) {
			setFeedback("You're molten lava hot!");
			return true;
		} else if (guessDifference <= 10) {
			setFeedback("Your're boiling now!");
			return true;
		} else if (guessDifference <= 10 && guessDifference <= 20) {
			setFeedback("You're warming up!");
			return true;
		} else if (guessDifference <= 20 && guessDifference <= 30) {
			setFeedback("You're getting chilly...");
			return true;
		} else if (guessDifference <= 30 && guessDifference <= 40) {
			setFeedback("You're starting to freeze...");
			return true;
		} else {
			setFeedback("You're in the artic cold now!");
			return true;
		};
	}

	// Set the feedback
	function setFeedback(feedback) {
		$('#feedback').text(feedback);
	}

});
