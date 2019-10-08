let totalPopulation = 3000;
let population;
let matingPool;

let target = "To be, or not to be? That's the question. I think. Right? Well, it doesn't matter since this is just the target value for stuff.";//"This is a test to see how long this genetic algorithm will take to calculate this string. If you are reading this, it likely succeeded.";
let mutationRate = 1 / (target.length * totalPopulation / 100);
document.getElementById("mutation").innerHTML = mutationRate.toFixed(8);

let highest = new DNA();
let generation = 0;
let fitSum = 0;

// Step 1: Initialize Population
function startPop() {
	population = [];
	for (let i = 0; i < totalPopulation; i++) {
		population[i] = new DNA();
	}
}
startPop();

function randInt(a) {
	return Math.floor(Math.random() * a);
}

function next() {
	display();

	if (fitSum / totalPopulation === 1) return;

	// Step 2: Selection
	// Step 2a: Calculate fitness.

	fitSum = 0;
	highest = new DNA();
	for (let i = 0; i < population.length; i++) {
		population[i].calcFitness();
		fitSum += population[i].fitness;
		if (population[i].fitness > highest.fitness) {
			highest = population[i];
		}
	}
	if (highest.fitness >= 1) {
		display();
		return;
	}
	// Step 2b: Build mating pool.
	let matingPool = [];

	for (let i = 0; i < population.length; i++) {
		// Add each member n times according to its fitness score.
		let n = Math.floor(population[i].fitness * target.length * 2);
		for (let j = 0; j < n; j++) {
			matingPool.push(population[i]);
		}
	}
	
	if (matingPool.length == 0) {
		startPop();
	}

	// Step 3: Reproduction
	else {
		for (let i = 0; i < population.length; i++) {
			let a = randInt(matingPool.length);
			let b = randInt(matingPool.length);
			let partnerA = matingPool[a];
			let partnerB = matingPool[b];
			// Crossover
			let child = partnerA.crossover(partnerB);
			// Mutation
			child.mutate(mutationRate);

			// Overwriting population members with new generation
			population[i] = child;
		}
	}
	generation++;
	
	requestAnimationFrame(next);
}

const highestDisplay = document.getElementById("highest");
const averageDisplay = document.getElementById("avg");
const genDisplay = document.getElementById("generation");
const popDisplay = document.getElementById("population");
const highFitDisplay = document.getElementById("highest-fit");

function display() {
	highestDisplay.innerText = highest.getPhrase();
	highFitDisplay.innerText = (highest.fitness).toFixed(3);
	averageDisplay.innerText = (fitSum / totalPopulation).toFixed(3);

	genDisplay.innerText = generation;

	let html = "";
	for (let i = 0; i < population.length && i < 50; i++) {
		html += `${population[i].getPhrase()}<br>`;
	}
	if (totalPopulation > 50) html += ".<br>.<br>.<br><br>";
	popDisplay.innerHTML = html;
}

setTimeout(() => {
	requestAnimationFrame(next);
}, 0)