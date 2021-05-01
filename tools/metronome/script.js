// i AM aware that this is very bad code

const slider = document.getElementById("bpm");
const mrange = document.getElementById("mrange");
const display = document.getElementById("display");
const measure = document.getElementById("measure");
const current = document.getElementById("current");

let bpm = 120;
let interval = (60 / bpm) * 1000;
let currentBeat = 1;
let measureLength = 2;
let playing = true;
let stopper;

const kick = new Howl({
	src: ['./audio/kick.wav'],
	volume: 2
});
const hat = new Howl({
	src: ['./audio/hat.wav'],
	volume: 3
});

slider.addEventListener("input", function() {
	bpm = parseInt(this.value);
	display.textContent = bpm;
	interval = (60 / bpm) * 1000;
});
mrange.addEventListener("input", function() {
	clearTimeout(stopper);
	measureLength = parseInt(this.value);
	measure.textContent = measureLength;
	if (currentBeat > measureLength) {
		currentBeat = 1;
	}
	current.textContent = 1;
	if (playing) start();
});

function toggle() {
	playing = !playing;
	if (playing) start();
	else clearTimeout(stopper);
}

function beat() {
	if (currentBeat === 1 && measureLength > 1) {
		kick.play();
		current.textContent = currentBeat;
		currentBeat++;
		return;
	}
	if (currentBeat !== 1 && measureLength > 1) {
		hat.play();
		current.textContent = currentBeat;
		currentBeat++;
		if (currentBeat > measureLength) {
			currentBeat = 1;
		}
		return;
	}
	if (currentBeat === 1 && measureLength === 1) {
		hat.play();
	}
}

function next() {
	beat();
	if (playing) start();
}

function start() {
	stopper = setTimeout(next, interval);
}

start();