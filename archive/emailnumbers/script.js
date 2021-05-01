// ----------- constants to adjust values

// total amount of emails
const TOTAL_EMAILS = 1000;
// element to place in
const EMAIL_EL = document.getElementById("emails")
// seperator
const SEPERATOR = "\n";
// number names
const NUMBER_NAMES = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

// ------------- variables and functions

// current number
let currentNumber = 0;
// array of emails
let emailList = [];

// string generator
function numToWord(n) {
	// number to string
	let nStr = n.toString();
	let wStr = "";
	for (let i = 0; i < nStr.length; i++) {
		// adds word to string based on number
		wStr += NUMBER_NAMES[parseInt(nStr[i])];
	}
	return wStr;
}

// --------------- GENERATOR

// add emails to array
for (let i = 0; i < TOTAL_EMAILS; i++) {
	let word = numToWord(i);
	emailList.push(`${word}@${word}.com`);
}

// join and apply to element
EMAIL_EL.innerText = emailList.join(SEPERATOR);