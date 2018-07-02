/*

// function constructor (blueprint)
var Person = function(name, yearOfBirth, job) {
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
};

// prototype property of constructor (inheritance)
// lends methods to instances of that constructor
Person.prototype.calculateAge = function() {
	console.log(2018 - this.yearOfBirth);
};

var john = new Person('John', 1990, 'teacher');

// Object.create style -- why use this???
var personProto = {
	calculateAge: function() {
		console.log(2018 - this.yearOfBirth);
	}
};

// second arg is obj containing properties
var joe = Object.create(personProto, {
	// note the weird property syntax
	name: { value: 'Joe' },
	yearOfBirth: { value: 1969 },
	job: { value: 'designer' }
});


// primitives vs. objects

// primivites create a copy of data on creation, so to speak
// in this example, 'a' will become 25 and 'b' will stay 23
var a = 23;
var b = a;
var a = 25;

// objects can reference changing data (state)
var obj1 = {
	name: 'John'
}
var obj2 = obj1;
obj1.name = 'Tim';
// here obj2 will dynamically change its name to Tim as well
// obj2 here is just a dynamic reference to obj1

// functions
var age = 29;
var obj = {
	city: 'Miami'
};

function change(a, b) {
	a = 30;
	b.city = 'New York';
}

change(age, obj);
// in this example, a will stay 29 as primitives cannot be mutated by functions
// the primitive is *copied* to the function scope and can be changed therein only. 
// obj.city becomes New York.


// passing functions as args
var years = [1995, 2000, 2005, 2010, 2015];

// fn here is a CALLBACK FUNC
function arrayCalc(arr, fn) {
	// result arr to avoid mutation
	var arrRes = [];

	// incremental for loop
	for (var i = 0; i < arr.length; i++) {
		// apply callback to [i] element of arr
		// push to new arr
		arrRes.push( fn(arr[i]) );
	}

	return arrRes;
}

// callback function
function calculateAge(el) {
	return 2016 - el;
}

var ages = arrayCalc(years, calculateAge);


// IIFE (immediately-invoked function expressions)

function game() {
	var score = Math.random() * 10;
	console.log(score > 5);
}
game();

// OR, wrap in parentheses and execute as an exp

(function() {
	var score = Math.random() * 10;
	console.log(score > 5);
})();

*/
// CLOSURES
/*
function retirement(retirementAge) {

	var a = ' years left until retirement.';

	return function(yearOfBirth) {
		var age = 2018 - yearOfBirth;
		console.log( (retirementAge - age) + a );
	}
}

var retirementUS = retirement(1966);

retirementUS(66)(1990);
*/

// REWRITE INTERVIEW FUNCTIONS W/ CLOSURES


/*
function interviewQuestion(job) {
	if (job === 'designer') {
		return function(name) {
			console.log(name + ', design something.');
		}

	} else if (job === 'teacher') {
		return function(name) {
			console.log(name + ', teach me something.');
		}

	} else {
		return function(name) {
			console.log(name + ', do something.');
		}
	}
}

// this function becomes...
*/
/*
function interviewQuestion(job) {
	return function(name) {
		if (job === 'designer') {
			console.log(name + ', design something.');
		} else if (job === 'teacher') {
			console.log(name + ', teach me something.');
		} else {
			console.log(name + ', do something.');
		}
	}
}

interviewQuestion('teacher')('Bobbert');
*/

/*
// BIND, CALL & APPLY

var john = {

	name: 'John',
	age: 26,
	job: 'teacher',

	presentation: function(style, timeOfDay) {

		name = this.name;
		age = this.age;
		job = this.job;

		if (style === 'formal') {
			console.log(
				'Good ' + timeOfDay + ', ladies & gents. I\'m ' 
				+ name + ', I\'m ' + age + ', and I\'m a ' + job + '.'
			);

		} else if (style === 'friendly') {
			console.log(
				'Wut up playaz? It\'s fuckin\' ' + timeOfDay + '. My name be ' 
				+ name + ', I\'m ' + age + ' yearz young, and I yeet at ' + job + 'ing.'
			);

		}
	}
}

john.presentation('formal', 'morning');

var emily = {
	name: 'Emily',
	age: 39,
	job: 'designer'
}

john.presentation.call(emily, 'friendly', 'evening');


var friendlyJohn = john.presentation.bind(john, 'friendly');

friendlyJohn('morning');
friendlyJohn('evening');

var formalEmily = john.presentation.bind(emily, 'formal');

formalEmily('evening');
*/

// wrapped the whole thing in anon func for privacy/namespacing
// creates scope where vars exist and can't escape. SPOOKY
(function() {

	// function constructor (blueprint)
	function Question(question, answers, correctAnswer) {
		this.question = question;
		this.answers = answers;
		this.correctAnswer = correctAnswer;

	}

	Question.prototype.poseQuestion = function() {
		console.log(this.question);

		this.answers.forEach( function(answer) {
	  	console.log(answer);
		});
	}

	Question.prototype.checkAnswer = function(answer, callback) {
		var sc;

		if (answer === this.correctAnswer) {
			console.log("You got it dude.");
			sc = callback(true);

		} else {
			console.log("*trumpvoice* WRONG.");
			sc = callback(false);
		}

		this.showScore(sc);

	}

	Question.prototype.showScore = function(score) {
		console.log("Current score: " + score);
		console.log("--------------------");
	}

	// create questions
	var question1 = new Question(
		"What is my dog's name?",
		["A) Spot", "B) Dingus", "C) Bingo", "D) Bingus"],
		"C"
	);

	var question2 = new Question(
		"Why is Michelle smelly?",
		["A) Lacks deodorant", "B) It's bespoke B.O. worth millions", "C) Lost my nose in a bad accident"],
		"B"
	);

	var question3 = new Question(
		"How can you best describe coding?",
		["A) Boring", "B) Fun", "C) Tedious", "D) Kill me"],
		"B"
	);

	// assemble question array
	var questions = [question1, question2, question3];

	function score() {

		var currentScore = 0;

		return function(correct) {
			if (correct) {
				currentScore++;
			}

			return currentScore;
		}

	}

	var keepScore = score();

	function nextQuestion() {
		// roll random number from 0 to questions.length
		var rand = Math.floor(Math.random() * questions.length);

		// pose a random question
		questions[rand].poseQuestion();

		// pose answer prompt
		var answer = prompt("Select the right answer or else.").toUpperCase();

		if (answer !== "EXIT") { 				
			// check answer
			questions[rand].checkAnswer(answer, keepScore);

			nextQuestion(); 
		}
	}

	nextQuestion();

})();



