const HTML = document.querySelector("html");
const form = document.querySelector("#form");
const question = document.querySelector("#question");
const password = document.querySelector("#password");
const submit = document.querySelector("#submit");
const answer = document.querySelector("#answer");

answer.id = "";

submit.addEventListener("click", () => {
	HTML.classList.add("loading");
	submit.classList.add("loading");
	setTimeout(() => {
		HTML.classList.remove("loading");
		form.classList.add("hidden");
		answer.id = "answer"
		answer.classList.remove("hidden");

		let string;
		if (password.value === "") string = "NO PASSWORD ENTERED, ACCESS DENIED";
		else if (password.value.charAt(0) !== "~") string = "INCORRECT PASSWORD ENTERED, ACCESS DENIED";
		else if (question.value === "") string = "NO QUESTION ENTERED, ACCESS DENIED";
		else {
			string = password.value.split("")
			string.shift();
			string = string.join("");
		}

		answer.innerHTML = string;
	}, Math.random() * 1000 + 500);
});