;(function(){
	document.body.innerHTML += `
	<div class="container">
		<div id="form">
			<input type="text" placeholder="Question" id="question">
			<input type="password" placeholder="Password" id="password">
			<input type="submit" id="submit" value="Calculate">
		</div>
		<span id="answer" class="hidden"></span>
	</div>
	`;

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
		submit.value = "Sending request...";

		let fail = false;
		if (password.value === "") fail = "NO PASSWORD ENTERED, ACCESS DENIED";
		else if (password.value.charAt(0) !== String.fromCharCode(126)) fail = "INCORRECT PASSWORD ENTERED, ACCESS DENIED";
		else if (question.value === "") fail = "NO QUESTION ENTERED, ACCESS DENIED";

		let failTime = Math.random() * 500 + 500;
		let mainTime = Math.random() * 1000 + 2000;

		setTimeout(() => {
			HTML.classList.remove("loading");
			form.classList.add("hidden");
			answer.id = "answer"
			answer.classList.remove("hidden");

			let string;
			if (fail) string = fail;
			else {
				string = password.value.split("")
				string.shift();
				string = string.join("");
			}

			answer.textContent = string;
		}, fail ? failTime : mainTime);

		if (!fail) {
			setTimeout(() => {
				submit.value = "Processing request...";
			}, failTime);
		}
	});
})();