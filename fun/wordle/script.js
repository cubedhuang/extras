/**
 * @type {HTMLInputElement[]}
 */
const $letters = [...document.getElementsByClassName("letter")];

/**
 * @type {HTMLInputElement}
 */
const $unknown = document.getElementById("unknown");

/**
 * @type {HTMLInputElement}
 */
const $eliminated = document.getElementById("eliminated");

const $go = document.getElementById("go");

const $result = document.getElementById("result");

const $h1 = document.getElementsByTagName("h1")[0];

$letters.forEach($letter => {
	$letter.addEventListener("input", () => {
		if ($letter.value.length > 1) $letter.value = $letter.value.slice(0, 1);

		if ($letter.value.length === 0) $letter.classList.remove("used");
		else $letter.classList.add("used");
	});
});

$unknown.addEventListener("input", () => {
	if ($unknown.value.length === 0) $unknown.classList.remove("used");
	else $unknown.classList.add("used");
});

async function loadWords() {
	const file = await fetch("./words.txt").then(res => res.text());
	return file.split("\n").sort();
}

async function start() {
	$h1.textContent = "Wordle Result Narrower (loading words list...)";

	const words = await loadWords();

	$h1.textContent = "Wordle Result Narrower";

	$go.addEventListener("click", () => {
		const good = [
			new RegExp(
				$letters
					.map($letter => $letter.value.toLowerCase() || ".")
					.join("")
			)
		];
		const bad = [new RegExp(`[${$eliminated.value.toLowerCase()}]`)];

		for (const l of $unknown.value.toLowerCase()) {
			good.push(new RegExp(`${l}`));
		}

		$result.innerHTML = words
			.filter(
				word =>
					bad.every(r => !r.test(word)) &&
					good.every(r => r.test(word))
			)
			.join("<br>");
	});
}

start();
